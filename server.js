The speed pass it doesn't seem like it's working.
const PORT = 3001;

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/octet-stream' // Sometimes .docx files are sent as this
        ];
        const isDocx = file.originalname.toLowerCase().endsWith('.docx');
        const isPdf = file.originalname.toLowerCase().endsWith('.pdf');
        
        if (allowedTypes.includes(file.mimetype) || isDocx || isPdf) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and DOCX files are allowed'));
        }
    }
});

// Serve static files
app.use(express.static('.'));

// PDF upload and extraction endpoint
app.post('/api/upload-mcq-pdf', upload.single('pdf'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const uploadedPath = req.file.path;
    const originalName = req.file.originalname;

    console.log(`📄 Received: ${originalName}`);

    try {
        // Call Python script to extract questions
        const questions = await extractQuestionsFromPDF(uploadedPath, originalName);

        // Clean up uploaded file
        fs.unlinkSync(uploadedPath);

        if (!questions || questions.length === 0) {
            return res.status(400).json({ 
                error: 'No valid questions found in PDF',
                details: 'The PDF structure may not match the expected format'
            });
        }

        // Extract batch name
        const batchMatch = originalName.match(/BATCH\s*-?\s*\((\d+)\)/i);
        const batchName = batchMatch ? `BATCH ${batchMatch[1]}` : originalName.replace('.pdf', '');

        console.log(`✅ Extracted ${questions.length} questions from ${batchName}`);

        res.json({
            success: true,
            batchName: batchName,
            questions: questions,
            count: questions.length
        });

    } catch (error) {
        console.error('❌ Extraction error:', error.message);
        
        // Clean up uploaded file
        if (fs.existsSync(uploadedPath)) {
            fs.unlinkSync(uploadedPath);
        }

        res.status(500).json({ 
            error: 'Failed to extract questions from PDF',
            details: error.message
        });
    }
});

// Extract questions using Python pdfplumber
function extractQuestionsFromPDF(pdfPath, originalName) {
    return new Promise((resolve, reject) => {
        const python = spawn('python3', [
            path.join(__dirname, 'extract-single-pdf.py'),
            pdfPath
        ]);

        let stdout = '';
        let stderr = '';

        python.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        python.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        python.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Python script failed: ${stderr}`));
                return;
            }

            try {
                const result = JSON.parse(stdout);
                resolve(result.questions || []);
            } catch (e) {
                reject(new Error(`Failed to parse extraction result: ${e.message}`));
            }
        });

        python.on('error', (err) => {
            reject(new Error(`Failed to start Python: ${err.message}`));
        });
    });
}

// Extract passage from DOCX using adm-zip
function extractPassageFromDocx(docxPath) {
    return new Promise((resolve, reject) => {
        try {
            const AdmZip = require('adm-zip');
            const zip = new AdmZip(docxPath);
            const documentXml = zip.readAsText('word/document.xml');
            
            // Extract paragraphs from <w:p> tags
            const paragraphs = documentXml.match(/<w:p\s[^>]*>.*?<\/w:p>/gs) || 
                              documentXml.match(/<w:p>.*?<\/w:p>/gs) || [];
            
            const paragraphTexts = paragraphs.map(para => {
                // Extract text from <w:t> tags within this paragraph
                const textMatches = para.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
                const texts = textMatches.map(match => {
                    const text = match.replace(/<w:t[^>]*>/, '').replace(/<\/w:t>/, '');
                    // Remove line breaks within text elements
                    return text.replace(/\r?\n/g, '');
                });
                // Join and normalize spaces
                return texts.join('').replace(/\s+/g, ' ').trim();
            }).filter(p => p.length > 10); // Filter out very short paragraphs
            
            // Format with 5-space indents and single newlines between paragraphs
            const formatted = paragraphTexts.map(p => '     ' + p).join('\n');
            
            resolve(formatted);
        } catch (error) {
            reject(error);
        }
    });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Speed passage upload and extraction endpoint
app.post('/api/upload-passage-docx', upload.single('docx'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No DOCX file uploaded' });
    }

    const uploadedPath = req.file.path;
    const originalName = req.file.originalname;

    console.log(`📄 Received: ${originalName}`);

    try {
        // Call Node.js extraction (using adm-zip)
        const passageText = await extractPassageFromDocx(uploadedPath);

        // Clean up uploaded file
        fs.unlinkSync(uploadedPath);

        if (!passageText || passageText.length < 50) {
            return res.status(400).json({ 
                error: 'No valid passage found in DOCX',
                details: 'The file may be empty or too short'
            });
        }

        const wordCount = passageText.trim().split(/\s+/).length;

        console.log(`✅ Extracted passage from ${originalName}: ${wordCount} words`);

        res.json({
            success: true,
            filename: originalName,
            text: passageText,
            wordCount: wordCount
        });

    } catch (error) {
        console.error('❌ Extraction error:', error.message);
        
        // Clean up uploaded file
        if (fs.existsSync(uploadedPath)) {
            fs.unlinkSync(uploadedPath);
        }

        res.status(500).json({ 
            error: 'Failed to extract passage from DOCX',
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`📝 MCQ Practice: http://localhost:${PORT}/mcq-practice.html`);
    console.log(`⌨️  Speed Passage: http://localhost:${PORT}/index.html\n`);
});
