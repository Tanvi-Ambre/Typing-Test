const fs = require('fs');

// Read the corrected batches
const correctedData = JSON.parse(fs.readFileSync('mcq-batch-1104-1105-1201-1202-1203-corrected.json', 'utf8'));

// Read current mcq-data.js
let mcqDataContent = fs.readFileSync('mcq-data.js', 'utf8');

// Function to replace a batch
function replaceBatch(content, batchName, batchData, nextBatchName) {
    const batchStart = content.indexOf(`"${batchName}": [`);
    const batchEnd = content.indexOf(`],\n  "${nextBatchName}":`, batchStart);
    
    if (batchStart === -1) {
        console.error(`❌ Could not find ${batchName}`);
        return content;
    }
    
    const newBatchStr = `"${batchName}": ${JSON.stringify(batchData, null, 4)}`;
    const before = content.substring(0, batchStart);
    const after = content.substring(batchEnd);
    
    return before + newBatchStr + after;
}

// Replace all 5 batches
console.log('Updating batches...');
mcqDataContent = replaceBatch(mcqDataContent, 'BATCH 1104', correctedData['BATCH 1104'], 'BATCH 1105');
mcqDataContent = replaceBatch(mcqDataContent, 'BATCH 1105', correctedData['BATCH 1105'], 'BATCH 1201');
mcqDataContent = replaceBatch(mcqDataContent, 'BATCH 1201', correctedData['BATCH 1201'], 'BATCH 1202');
mcqDataContent = replaceBatch(mcqDataContent, 'BATCH 1202', correctedData['BATCH 1202'], 'BATCH 1203');
mcqDataContent = replaceBatch(mcqDataContent, 'BATCH 1203', correctedData['BATCH 1203'], 'BATCH 1204');

// Write back
fs.writeFileSync('mcq-data.js', mcqDataContent, 'utf8');

console.log('✅ Updated mcq-data.js with 5 corrected batches');
console.log('   Batch 1104: 25 questions');
console.log('   Batch 1105: 25 questions');
console.log('   Batch 1201: 25 questions');
console.log('   Batch 1202: 25 questions');
console.log('   Batch 1203: 25 questions');
console.log('📊 Total: 125 questions updated');
