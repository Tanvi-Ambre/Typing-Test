#!/usr/bin/env node
/**
 * Extract Specific Range of MCQ Batches
 * Usage: node extract-mcq-batch-range.js 1101 1105
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const MCQ_DIR = 'exam-materials/mcq-questions';

// Get range from command line arguments
const startBatch = parseInt(process.argv[2]) || 1101;
const endBatch = parseInt(process.argv[3]) || 1105;

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
async function extractBatchRange() {
    console.log('🚀 MCQ Batch Range Extraction');
    console.log('='.repeat(70));
    console.log(`Extracting batches ${startBatch} to ${endBatch}\n`);
    
    try {
        // Get all PDF files in range
        const pdfFiles = fs.readdirSync(MCQ_DIR)
            .filter(f => f.endsWith('.pdf'))
            .filter(f => {
                const match = f.match(/BATCH\s*-?\s*\((\d+)\)/i);
                if (!match) return false;
                const batchNum = parseInt(match[1]);
                return batchNum >= startBatch && batchNum <= endBatch;
            })
            .sort();
        
        console.log(`📄 Found ${pdfFiles.length} PDF files in range\n`);
        
        const extractedBatches = {};
        let successCount = 0;
        let failCount = 0;
        
        // Extract each batch
        for (let i = 0; i < pdfFiles.length; i++) {
            const file = pdfFiles[i];
            const batchMatch = file.match(/BATCH\s*-?\s*\((\d+)\)/i);
            const batchName = `BATCH ${batchMatch[1]}`;
            const pdfPath = path.join(MCQ_DIR, file);
            
            console.log(`[${i + 1}/${pdfFiles.length}] Extracting ${batchName}...`);
            
            try {
                const questions = await extractBatch(pdfPath);
                
                if (questions.length === 25) {
                    extractedBatches[batchName] = questions;
                    successCount++;
                    console.log(`   ✅ Success: ${questions.length} questions\n`);
                } else {
                    console.log(`   ⚠️  Warning: Only ${questions.length} questions (expected 25)\n`);
                    extractedBatches[batchName] = questions;
                    successCount++;
                }
            } catch (error) {
                console.log(`   ❌ Error: ${error.message}\n`);
                failCount++;
            }
        }
        
        // Save to file
        const outputFile = `mcq-batches-${startBatch}-${endBatch}.json`;
        fs.writeFileSync(outputFile, JSON.stringify(extractedBatches, null, 2), 'utf8');
        
        console.log('='.repeat(70));
        console.log('📊 EXTRACTION SUMMARY');
        console.log('='.repeat(70));
        console.log(`\nRange: ${startBatch} - ${endBatch}`);
        console.log(`✅ Successful: ${successCount}`);
        console.log(`❌ Failed: ${failCount}`);
        console.log(`\n📄 Output: ${outputFile}`);
        console.log(`   Size: ${(fs.statSync(outputFile).size / 1024).toFixed(2)} KB\n`);
        
        // Show sample Marathi text from first batch
        const firstBatch = Object.values(extractedBatches)[0];
        if (firstBatch && firstBatch.length > 0) {
            console.log('📝 Sample Marathi Text (First Question):');
            console.log(`   Question: ${firstBatch[0].question.substring(0, 80)}...`);
            console.log(`   Option A: ${firstBatch[0].options.A}`);
            console.log(`   Option B: ${firstBatch[0].options.B}\n`);
        }
        
        console.log('='.repeat(70));
        console.log('✅ EXTRACTION COMPLETE!');
        console.log('='.repeat(70));
        console.log('\nNext steps:');
        console.log(`1. Review ${outputFile} for Marathi accuracy`);
        console.log('2. Verify all 25 questions per batch');
        console.log('3. Check for any garbled text\n');
        
        process.exit(failCount > 0 ? 1 : 0);
        
    } catch (error) {
        console.error('\n❌ Fatal error:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// Run extraction
extractBatchRange();
