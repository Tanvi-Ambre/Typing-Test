#!/usr/bin/env node
/**
 * Extract all MCQ batches from PDF files
 * Applies Marathi text corrections automatically
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { correctAllQuestions } = require('./marathi-corrections');

// Set UTF-8 encoding
process.env.PYTHONIOENCODING = 'utf-8';

const MCQ_DIR = 'exam-materials/mcq-questions';
const OUTPUT_FILE = 'mcq-data.js';

async function extractPDF(pdfPath) {
    return new Promise((resolve, reject) => {
        const python = spawn('python3', [
            path.join(__dirname, 'extract-single-pdf.py'),
            pdfPath
        ]);

        let stdout = '';
        let stderr = '';

        python.stdout.on('data', (data) => {
            stdout += data.toString('utf8');
        });

        python.stderr.on('data', (data) => {
            stderr += data.toString('utf8');
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

async function extractAllBatches() {
    console.log('🔍 Scanning for MCQ PDF files...\n');

    // Get all PDF files
    const files = fs.readdirSync(MCQ_DIR)
        .filter(f => f.endsWith('.pdf'))
        .sort();

    console.log(`📄 Found ${files.length} PDF files\n`);

    const allBatches = {};
    let successCount = 0;
    let failCount = 0;

    for (const file of files) {
        const pdfPath = path.join(MCQ_DIR, file);
        const batchMatch = file.match(/BATCH\s*-?\s*\((\d+)\)/i);
        
        if (!batchMatch) {
            console.log(`⚠️  Skipping ${file} - doesn't match batch pattern`);
            continue;
        }

        const batchName = `BATCH ${batchMatch[1]}`;

        try {
            console.log(`📝 Extracting ${batchName}...`);
            const questions = await extractPDF(pdfPath);
            
            if (!questions || questions.length === 0) {
                console.log(`   ❌ No questions found`);
                failCount++;
                continue;
            }

            // Apply Marathi corrections
            const correctedQuestions = correctAllQuestions(questions);
            
            allBatches[batchName] = correctedQuestions;
            console.log(`   ✅ Extracted ${correctedQuestions.length} questions (Marathi corrected)`);
            successCount++;

        } catch (error) {
            console.log(`   ❌ Error: ${error.message}`);
            failCount++;
        }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Success: ${successCount} batches`);
    console.log(`   ❌ Failed: ${failCount} batches`);
    console.log(`   📦 Total questions: ${Object.values(allBatches).reduce((sum, q) => sum + q.length, 0)}`);

    return allBatches;
}

function generateMCQDataFile(allBatches) {
    const timestamp = new Date().toISOString();
    const batchCount = Object.keys(allBatches).length;
    const totalQuestions = Object.values(allBatches).reduce((sum, q) => sum + q.length, 0);

    let content = `// MCQ Questions - Auto-generated from PDFs with Marathi corrections
// Generated: ${timestamp}
// Total batches: ${batchCount}
// Total questions: ${totalQuestions}

const allMCQBatches = ${JSON.stringify(allBatches, null, 2)};

// Auto-load into localStorage when page loads
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
        const existingSets = JSON.parse(localStorage.getItem('mcqQuestionSets') || '[]');
        
        Object.keys(allMCQBatches).forEach(batchName => {
            const exists = existingSets.some(set => set.name === batchName);
            
            if (!exists) {
                const questions = allMCQBatches[batchName].map((q, index) => ({
                    ...q,
                    id: Date.now() + index + Math.random()
                }));
                
                existingSets.push({
                    name: batchName,
                    questions: questions,
                    uploadDate: new Date().toISOString()
                });
                
                console.log(\`✓ Loaded \${batchName} (\${questions.length} questions)\`);
            }
        });
        
        localStorage.setItem('mcqQuestionSets', JSON.stringify(existingSets));
        console.log(\`✓ Total batches: \${Object.keys(allMCQBatches).length}\`);
    } catch (e) {
        console.error('Error loading MCQ batches:', e);
    }
}
`;

    fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
    console.log(`\n✅ Generated ${OUTPUT_FILE}`);
    console.log(`   📦 ${batchCount} batches`);
    console.log(`   📝 ${totalQuestions} total questions`);
}

async function main() {
    console.log('🚀 MCQ Batch Extraction with Marathi Correction\n');
    console.log('=' .repeat(60) + '\n');

    try {
        const allBatches = await extractAllBatches();
        
        if (Object.keys(allBatches).length === 0) {
            console.log('\n❌ No batches extracted. Exiting.');
            process.exit(1);
        }

        generateMCQDataFile(allBatches);
        
        console.log('\n' + '='.repeat(60));
        console.log('✅ Extraction complete!\n');

    } catch (error) {
        console.error('\n❌ Fatal error:', error.message);
        process.exit(1);
    }
}

main();
