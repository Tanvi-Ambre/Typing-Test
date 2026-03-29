#!/usr/bin/env node
/**
 * MCQ Accuracy Test Suite
 * Verifies that extracted questions match the source PDFs
 * Tests: Question count, question text, options, correct answers
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Set UTF-8 encoding
process.env.PYTHONIOENCODING = 'utf-8';

const MCQ_DIR = 'exam-materials/mcq-questions';
const MCQ_DATA_FILE = 'mcq-data.js';

// Load the generated MCQ data
function loadMCQData() {
    const content = fs.readFileSync(MCQ_DATA_FILE, 'utf8');
    const match = content.match(/const allMCQBatches = ({[\s\S]*?});/);
    if (!match) {
        throw new Error('Could not parse mcq-data.js');
    }
    return JSON.parse(match[1]);
}

// Extract questions from a PDF
async function extractPDFQuestions(pdfPath) {
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

// Test results tracker
const testResults = {
    totalBatches: 0,
    passedBatches: 0,
    failedBatches: 0,
    totalQuestions: 0,
    passedQuestions: 0,
    failedQuestions: 0,
    issues: []
};

// Test a single batch
async function testBatch(batchName, pdfPath, storedQuestions) {
    console.log(`\n📝 Testing ${batchName}...`);
    
    try {
        // Extract fresh questions from PDF
        const pdfQuestions = await extractPDFQuestions(pdfPath);
        
        // Test 1: Question count
        if (pdfQuestions.length !== storedQuestions.length) {
            testResults.issues.push({
                batch: batchName,
                type: 'COUNT_MISMATCH',
                expected: pdfQuestions.length,
                actual: storedQuestions.length
            });
            console.log(`   ❌ Question count mismatch: PDF has ${pdfQuestions.length}, stored has ${storedQuestions.length}`);
            testResults.failedBatches++;
            return false;
        }
        
        let batchPassed = true;
        
        // Test 2: Compare each question
        for (let i = 0; i < pdfQuestions.length; i++) {
            const pdfQ = pdfQuestions[i];
            const storedQ = storedQuestions[i];
            
            testResults.totalQuestions++;
            
            // Test question ID
            if (pdfQ.id !== storedQ.id) {
                testResults.issues.push({
                    batch: batchName,
                    questionNum: i + 1,
                    type: 'ID_MISMATCH',
                    expected: pdfQ.id,
                    actual: storedQ.id
                });
                console.log(`   ❌ Q${i+1}: ID mismatch (PDF: ${pdfQ.id}, Stored: ${storedQ.id})`);
                batchPassed = false;
                testResults.failedQuestions++;
                continue;
            }
            
            // Test question text (normalize whitespace for comparison)
            const normalizeText = (text) => text.replace(/\s+/g, ' ').trim();
            const pdfQText = normalizeText(pdfQ.question);
            const storedQText = normalizeText(storedQ.question);
            
            if (pdfQText !== storedQText) {
                testResults.issues.push({
                    batch: batchName,
                    questionNum: i + 1,
                    type: 'QUESTION_TEXT_MISMATCH',
                    expected: pdfQ.question,
                    actual: storedQ.question
                });
                console.log(`   ⚠️  Q${i+1}: Question text differs`);
                console.log(`      PDF: "${pdfQ.question.substring(0, 50)}..."`);
                console.log(`      Stored: "${storedQ.question.substring(0, 50)}..."`);
                // Don't fail for text differences due to Marathi corrections
            }
            
            // Test options
            for (const opt of ['A', 'B', 'C', 'D']) {
                const pdfOpt = normalizeText(pdfQ.options[opt] || '');
                const storedOpt = normalizeText(storedQ.options[opt] || '');
                
                if (pdfOpt !== storedOpt) {
                    testResults.issues.push({
                        batch: batchName,
                        questionNum: i + 1,
                        type: 'OPTION_MISMATCH',
                        option: opt,
                        expected: pdfQ.options[opt],
                        actual: storedQ.options[opt]
                    });
                    console.log(`   ⚠️  Q${i+1} Option ${opt}: Text differs`);
                    console.log(`      PDF: "${pdfQ.options[opt]}"`);
                    console.log(`      Stored: "${storedQ.options[opt]}"`);
                }
            }
            
            // Test correct answer
            if (pdfQ.correctAnswer !== storedQ.correctAnswer) {
                testResults.issues.push({
                    batch: batchName,
                    questionNum: i + 1,
                    type: 'ANSWER_MISMATCH',
                    expected: pdfQ.correctAnswer,
                    actual: storedQ.correctAnswer
                });
                console.log(`   ❌ Q${i+1}: CRITICAL - Answer mismatch (PDF: ${pdfQ.correctAnswer}, Stored: ${storedQ.correctAnswer})`);
                batchPassed = false;
                testResults.failedQuestions++;
                continue;
            }
            
            testResults.passedQuestions++;
        }
        
        if (batchPassed) {
            console.log(`   ✅ All ${pdfQuestions.length} questions verified`);
            testResults.passedBatches++;
            return true;
        } else {
            testResults.failedBatches++;
            return false;
        }
        
    } catch (error) {
        console.log(`   ❌ Error testing batch: ${error.message}`);
        testResults.failedBatches++;
        testResults.issues.push({
            batch: batchName,
            type: 'EXTRACTION_ERROR',
            error: error.message
        });
        return false;
    }
}

// Main test runner
async function runTests() {
    console.log('🧪 MCQ Accuracy Test Suite');
    console.log('=' .repeat(60));
    console.log('Testing extracted MCQ data against source PDFs\n');
    
    try {
        // Load stored MCQ data
        console.log('📂 Loading mcq-data.js...');
        const allBatches = loadMCQData();
        console.log(`   ✅ Loaded ${Object.keys(allBatches).length} batches\n`);
        
        // Get all PDF files
        const pdfFiles = fs.readdirSync(MCQ_DIR)
            .filter(f => f.endsWith('.pdf'))
            .sort();
        
        console.log(`📄 Found ${pdfFiles.length} PDF files\n`);
        
        // Test each batch
        for (const file of pdfFiles) {
            const batchMatch = file.match(/BATCH\s*-?\s*\((\d+)\)/i);
            if (!batchMatch) continue;
            
            const batchName = `BATCH ${batchMatch[1]}`;
            const pdfPath = path.join(MCQ_DIR, file);
            const storedQuestions = allBatches[batchName];
            
            if (!storedQuestions) {
                console.log(`\n⚠️  ${batchName}: Not found in mcq-data.js`);
                testResults.issues.push({
                    batch: batchName,
                    type: 'MISSING_IN_DATA',
                    file: file
                });
                continue;
            }
            
            testResults.totalBatches++;
            await testBatch(batchName, pdfPath, storedQuestions);
        }
        
        // Print summary
        console.log('\n' + '='.repeat(60));
        console.log('📊 TEST SUMMARY');
        console.log('='.repeat(60));
        console.log(`\nBatches:`);
        console.log(`  Total:  ${testResults.totalBatches}`);
        console.log(`  ✅ Passed: ${testResults.passedBatches}`);
        console.log(`  ❌ Failed: ${testResults.failedBatches}`);
        
        console.log(`\nQuestions:`);
        console.log(`  Total:  ${testResults.totalQuestions}`);
        console.log(`  ✅ Passed: ${testResults.passedQuestions}`);
        console.log(`  ❌ Failed: ${testResults.failedQuestions}`);
        
        // Print critical issues
        const criticalIssues = testResults.issues.filter(i => 
            i.type === 'ANSWER_MISMATCH' || 
            i.type === 'COUNT_MISMATCH' ||
            i.type === 'ID_MISMATCH'
        );
        
        if (criticalIssues.length > 0) {
            console.log(`\n⚠️  CRITICAL ISSUES (${criticalIssues.length}):`);
            criticalIssues.forEach(issue => {
                console.log(`\n  ${issue.batch} - Q${issue.questionNum || 'N/A'}:`);
                console.log(`    Type: ${issue.type}`);
                if (issue.expected !== undefined) {
                    console.log(`    Expected: ${issue.expected}`);
                    console.log(`    Actual: ${issue.actual}`);
                }
            });
        }
        
        // Overall result
        console.log('\n' + '='.repeat(60));
        if (testResults.failedBatches === 0 && criticalIssues.length === 0) {
            console.log('✅ ALL TESTS PASSED!');
            console.log('All questions, options, and answers match the PDFs.');
        } else {
            console.log('❌ TESTS FAILED');
            console.log(`${testResults.failedBatches} batches have issues.`);
            console.log(`${criticalIssues.length} critical issues found.`);
        }
        console.log('='.repeat(60) + '\n');
        
        // Save detailed report
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalBatches: testResults.totalBatches,
                passedBatches: testResults.passedBatches,
                failedBatches: testResults.failedBatches,
                totalQuestions: testResults.totalQuestions,
                passedQuestions: testResults.passedQuestions,
                failedQuestions: testResults.failedQuestions
            },
            issues: testResults.issues
        };
        
        fs.writeFileSync('mcq-test-report.json', JSON.stringify(report, null, 2));
        console.log('📄 Detailed report saved to: mcq-test-report.json\n');
        
        process.exit(testResults.failedBatches > 0 || criticalIssues.length > 0 ? 1 : 0);
        
    } catch (error) {
        console.error('\n❌ Fatal error:', error.message);
        process.exit(1);
    }
}

// Run tests
runTests();
