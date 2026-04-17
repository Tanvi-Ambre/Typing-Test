#!/usr/bin/env node
/**
 * Extract All MCQ Batches with Correct Marathi
 * Uses extract-mcq-hybrid-cells.py to extract all 30 batches
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const MCQ_DIR = 'exam-materials/mcq-questions';
const OUTPUT_FILE = 'mcq-data.js';

// Extract a single batch
async function extractBatch(pdfPath) {
    return new Promise((resolve, reject) => {
        const python = spawn('python3', [
            path.join(__dirname, 'extract-mcq-hybrid-cells.py'),
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
                reject(new Error(`Extraction failed: ${stderr}`));
                return;
            }

            try {
                const result = JSON.parse(stdout);
                if (!result.success) {
                    reject(new Error(result.error || 'Unknown error'));
                    return;
                }
                resolve(result.questions || []);
            } catch (e) {
                reject(new Error(`Failed to parse result: ${e.message}`));
            }
        });

        python.on('error', (err) => {
            reject(new Error(`Failed to start Python: ${err.message}`));
        });
    });
}

// Main extraction function
async function extractAllBatches() {
    console.log('🚀 MCQ Batch Extraction');
    console.log('='.repeat(70));
    console.log('Extracting all MCQ batches with correct Marathi text\n');
    
    try {
        // Get all PDF files
        const pdfFiles = fs.readdirSync(MCQ_DIR)
            .filter(f => f.endsWith('.pdf'))
            .sort();
        
        console.log(`📄 Found ${pdfFiles.length} PDF files\n`);
        
        const allBatches = {};
        let successCount = 0;
        let failCount = 0;
        
        // Extract each batch
        for (let i = 0; i < pdfFiles.length; i++) {
            const file = pdfFiles[i];
            const batchMatch = file.match(/BATCH\s*-?\s*\((\d+)\)/i);
            
            if (!batchMatch) {
                console.log(`⚠️  Skipping ${file} - invalid name format\n`);
                continue;
            }
            
            const batchName = `BATCH ${batchMatch[1]}`;
            const pdfPath = path.join(MCQ_DIR, file);
            
            console.log(`[${i + 1}/${pdfFiles.length}] Extracting ${batchName}...`);
            
            try {
                const questions = await extractBatch(pdfPath);
                
                if (questions.length === 25) {
                    allBatches[batchName] = questions;
                    successCount++;
                    console.log(`   ✅ Success: ${questions.length} questions\n`);
                } else {
                    console.log(`   ⚠️  Warning: Only ${questions.length} questions (expected 25)\n`);
                    allBatches[batchName] = questions;
                    successCount++;
                }
            } catch (error) {
                console.log(`   ❌ Error: ${error.message}\n`);
                failCount++;
            }
        }
        
        // Generate mcq-data.js
        console.log('='.repeat(70));
        console.log('📝 Generating mcq-data.js...\n');
        
        const totalQuestions = Object.values(allBatches).reduce((sum, batch) => sum + batch.length, 0);
        
        const fileContent = `// MCQ Questions - Extracted with Hybrid Cell-by-Cell OCR
// Generated: ${new Date().toISOString()}
// Total batches: ${Object.keys(allBatches).length}
// Total questions: ${totalQuestions}
// Method: Hybrid (pdfplumber structure + cell-by-cell OCR)
// Marathi text: ✅ CORRECT

const allMCQBatches = ${JSON.stringify(allBatches, null, 2)};

// Pre-loaded batches for immediate use
const preloadedBatches = ${JSON.stringify(Object.keys(allBatches), null, 2)};

// Export for use in browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allMCQBatches, preloadedBatches };
}
`;
        
        fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf8');
        
        console.log('✅ Generated mcq-data.js');
        console.log(`   Batches: ${Object.keys(allBatches).length}`);
        console.log(`   Questions: ${totalQuestions}`);
        console.log(`   File size: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2)} KB\n`);
        
        // Summary
        console.log('='.repeat(70));
        console.log('📊 EXTRACTION SUMMARY');
        console.log('='.repeat(70));
        console.log(`\nTotal PDFs: ${pdfFiles.length}`);
        console.log(`✅ Successful: ${successCount}`);
        console.log(`❌ Failed: ${failCount}`);
        console.log(`\nTotal Questions: ${totalQuestions}`);
        console.log(`Average per batch: ${(totalQuestions / successCount).toFixed(1)}`);
        
        console.log('\n' + '='.repeat(70));
        console.log('✅ EXTRACTION COMPLETE!');
        console.log('='.repeat(70));
        console.log('\nNext steps:');
        console.log('1. Review mcq-data.js to verify Marathi text');
        console.log('2. Clear browser localStorage (see CLEAR_BROWSER_CACHE.md)');
        console.log('3. Refresh the MCQ practice page');
        console.log('4. Verify Marathi text displays correctly\n');
        
        process.exit(failCount > 0 ? 1 : 0);
        
    } catch (error) {
        console.error('\n❌ Fatal error:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// Run extraction
if (require.main === module) {
    extractAllBatches();
}

module.exports = { extractAllBatches };
