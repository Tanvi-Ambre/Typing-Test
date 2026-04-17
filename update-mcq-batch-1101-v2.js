const fs = require('fs');

// Read the corrected batch 1101
const correctedData = JSON.parse(fs.readFileSync('mcq-batch-1101-corrected.json', 'utf8'));
const correctedBatch = correctedData['BATCH 1101'];

// Read current mcq-data.js
let mcqDataContent = fs.readFileSync('mcq-data.js', 'utf8');

// Find the start and end of BATCH 1101
const batchStart = mcqDataContent.indexOf('"BATCH 1101": [');
const batchEnd = mcqDataContent.indexOf('],\n  "BATCH 1102":', batchStart);

if (batchStart === -1 || batchEnd === -1) {
    console.error('❌ Could not find BATCH 1101 in mcq-data.js');
    process.exit(1);
}

// Create the new batch string
const newBatchStr = `"BATCH 1101": ${JSON.stringify(correctedBatch, null, 4)}`;

// Replace the old batch with the new one
const before = mcqDataContent.substring(0, batchStart);
const after = mcqDataContent.substring(batchEnd);
const newContent = before + newBatchStr + after;

// Write back
fs.writeFileSync('mcq-data.js', newContent, 'utf8');

console.log('✅ Updated mcq-data.js with corrected Batch 1101');
console.log(`   Total questions in batch: ${correctedBatch.length}`);
