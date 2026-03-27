// Node.js script to extract MCQ questions from PDF files
// Run: node extract-mcq.js

const fs = require('fs');
const path = require('path');

// Check if pdf-parse is installed
let pdfParse;
try {
    const pdfModule = require('pdf-parse');
    pdfParse = pdfModule.PDFParse || pdfModule;
} catch (e) {
    console.error('❌ Error: pdf-parse not installed');
    console.log('\n📦 Please install it first:');
    console.log('   npm install pdf-parse');
    console.log('\nThen run this script again.');
    process.exit(1);
}

// Marathi character mapping to fix encoding issues
const marathiFixMap = {
    'वररल': 'वरील',
    'फफईल': 'फाईल',
    'ययतफत': 'येतात',
    'पपकक': 'पैकी',
    'सवर': 'सर्व',
    'यफपपकक': 'यापैकी',
    'मधयय': 'मध्ये',
    'ररप': 'रॅप',
    'ससटसस': 'सॉफ्ट',
    'मरर': 'मर्ज',
    'नयप': 'न्यू',
    'लफईन': 'लाईन',
    'पपढरल': 'पुढील',
    'हरतर': 'होतो',
    'तयफलफ': 'त्याला',
    'महणतफत': 'म्हणतात',
    'ददसतर': 'दिसतो',
    'मधरल': 'मधील',
    'यफ': 'या',
    'आहय': 'आहे',
    'यफयसफरखर': 'यासारखी',
    'मफहहतर': 'माहिती',
    'सफधफरणपणय': 'साधारणपणे',
    'मधयय': 'मध्ये',
    'पफहफयलफ': 'पाहायला',
    'हमळतय': 'मिळते',
    'नवरन': 'नवीन',
    'लफ': 'ला',
    'करणयफसफठर': 'करण्यासाठी',
    'हर': 'हे',
    'वफपरतफत': 'वापरतात',
    'चय': 'चे',
    'तपमहर': 'तुम्ही',
    'कफय': 'काय',
    'शकतफ': 'शकता',
    'चफ': 'चा',
    'कफढचन': 'काढून',
    'टफकणयफसफठर': 'टाकण्यासाठी',
    'हफ': 'हा',
    'हसलयकट': 'सिलेक्ट',
    'करफवफ': 'करावा',
    'वररलपपकक': 'वरीलपैकी',
    'एकहर': 'एकही',
    'नफहर': 'नाही',
    'करतफत': 'करतात',
    'लफईर': 'लाईर',
    'शर': 'शो',
    'सपर': 'सुरू',
    'शशटरकट': 'शॉर्टकट',
    'कक': 'की',
    'हय': 'हे',
    'असतर': 'असतो',
    'असतय': 'असते',
    'बररबर': 'बरोबर',
    'चचक': 'चूक',
    'तयफर': 'तयार',
    'रगफतरल': 'जगातील',
    'सवफरत': 'सर्वात',
    'मरठय': 'मोठे',
    'छरटय': 'छोटे',
    'महणरयच': 'म्हणजेच',
    'हरय': 'होय',
    'रफळय': 'जाळे',
    'हवहवध': 'विविध',
    'पकफरचयफ': 'प्रकारच्या',
    'नय': 'ने',
    'बनलयलय': 'बनलेले',
    'सलफईर': 'स्लाईड'
};

function fixMarathiText(text) {
    let fixed = text;
    
    // Apply all mappings
    for (const [wrong, correct] of Object.entries(marathiFixMap)) {
        fixed = fixed.replace(new RegExp(wrong, 'g'), correct);
    }
    
    return fixed;
}

function parseTableFormat(text) {
    const questions = [];
    
    console.log('=== PARSING TABLE FORMAT ===\n');
    
    // Remove headers
    text = text.replace(/MAHARASHTRA STATE COUNCIL.*?BATCH - \d+/s, '');
    text = text.replace(/Sr\.No\s+Question\s+Option A\s+Option B\s+Option C\s+Option D\s+Provisional Ans\./g, '');
    
    const allLines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    let i = 0;
    while (i < allLines.length) {
        const line = allLines[i];
        
        // Check if line starts with a number (question row)
        const numberMatch = line.match(/^(\d{1,2})\s+(.+)/);
        
        if (!numberMatch) {
            i++;
            continue;
        }
        
        const questionNumber = parseInt(numberMatch[1]);
        let restOfLine = numberMatch[2];
        
        // Check for continuation line
        if (i + 1 < allLines.length) {
            const nextLine = allLines[i + 1];
            if (!/^\d{1,2}\s/.test(nextLine) && !nextLine.includes('Sr.No')) {
                restOfLine += ' ' + nextLine;
                i++; // Skip continuation
            }
        }
        
        // Extract answer from end (single letter A-D)
        const answerMatch = restOfLine.match(/\s+([A-D])\s*$/);
        
        if (!answerMatch) {
            console.log(`❌ Q${questionNumber}: No answer found`);
            i++;
            continue;
        }
        
        const correctAnswer = answerMatch[1].toUpperCase();
        const answerPos = restOfLine.lastIndexOf(answerMatch[1]);
        
        // Content before answer
        const contentBeforeAnswer = restOfLine.substring(0, answerPos).trim();
        
        // Content after answer (part of option D)
        const contentAfterAnswer = restOfLine.substring(answerPos + 1).trim();
        
        // Split by 2+ spaces to get columns
        const parts = contentBeforeAnswer.split(/\s{2,}/);
        
        if (parts.length < 5) {
            console.log(`❌ Q${questionNumber}: Not enough parts (${parts.length})`);
            i++;
            continue;
        }
        
        // Last 4 parts are options
        let optionD = parts[parts.length - 1].trim();
        const optionC = parts[parts.length - 2].trim();
        const optionB = parts[parts.length - 3].trim();
        const optionA = parts[parts.length - 4].trim();
        
        // Add content after answer to option D
        if (contentAfterAnswer) {
            optionD += ' ' + contentAfterAnswer;
        }
        
        // Everything else is question
        const questionText = parts.slice(0, parts.length - 4).join(' ').trim();
        
        if (!questionText) {
            console.log(`❌ Q${questionNumber}: Empty question`);
            i++;
            continue;
        }
        
        // Fix Marathi text
        const fixedQuestion = fixMarathiText(questionText);
        const fixedA = fixMarathiText(optionA);
        const fixedB = fixMarathiText(optionB);
        const fixedC = fixMarathiText(optionC);
        const fixedD = fixMarathiText(optionD.trim());
        
        questions.push({
            id: questionNumber,
            question: fixedQuestion,
            options: {
                A: fixedA,
                B: fixedB,
                C: fixedC,
                D: fixedD
            },
            correctAnswer: correctAnswer
        });
        
        console.log(`✅ Q${questionNumber}: "${fixedQuestion.substring(0, 40)}..."`);
        
        i++;
    }
    
    console.log(`\n=== RESULT: ${questions.length} questions ===`);
    return questions;
}

async function extractQuestionsFromPDF(filePath) {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const parser = new pdfParse();
        const data = await parser.parse(dataBuffer);
        
        console.log(`\n📄 Processing: ${path.basename(filePath)}`);
        console.log(`   Pages: ${data.numpages}`);
        console.log(`   Text length: ${data.text.length} chars\n`);
        
        const questions = parseTableFormat(data.text);
        
        return {
            filename: path.basename(filePath),
            batchNumber: path.basename(filePath).match(/\d+/)?.[0] || 'unknown',
            questions: questions,
            extractedAt: new Date().toISOString()
        };
        
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return null;
    }
}

// Main execution
async function main() {
    console.log('🔍 Scanning for MCQ PDF files...\n');
    
    // Look in exam-materials/mcq-questions/ folder
    const mcqFolder = path.join(__dirname, 'exam-materials', 'mcq-questions');
    
    if (!fs.existsSync(mcqFolder)) {
        console.error(`❌ Folder not found: ${mcqFolder}`);
        console.log('\n📁 Please create the folder or update the path in this script.');
        process.exit(1);
    }
    
    const pdfFiles = fs.readdirSync(mcqFolder)
        .filter(file => file.endsWith('.pdf') && file.includes('BATCH'))
        .map(file => path.join(mcqFolder, file));
    
    console.log(`Found ${pdfFiles.length} PDF file(s)\n`);
    
    const allSets = [];
    
    for (const file of pdfFiles) {
        const result = await extractQuestionsFromPDF(file);
        if (result && result.questions.length > 0) {
            allSets.push(result);
        }
    }
    
    console.log(`\n✅ Successfully extracted ${allSets.length} question set(s)`);
    console.log(`   Total questions: ${allSets.reduce((sum, set) => sum + set.questions.length, 0)}`);
    
    // Write to JSON file
    const outputPath = 'extracted-mcq.json';
    fs.writeFileSync(outputPath, JSON.stringify(allSets, null, 2));
    console.log(`\n📝 Saved to: ${outputPath}`);
    
    // Generate JavaScript file
    const jsContent = `// Auto-generated from PDF files
// Generated on: ${new Date().toISOString()}

const extractedMCQSets = ${JSON.stringify(allSets, null, 2)};

// Export for use in mcq-script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = extractedMCQSets;
}
`;
    
    const jsOutputPath = 'mcq-data.js';
    fs.writeFileSync(jsOutputPath, jsContent);
    console.log(`📦 Generated: ${jsOutputPath}`);
    
    console.log('\n🎉 Done! Include mcq-data.js in your HTML before mcq-script.js');
}

main().catch(console.error);
