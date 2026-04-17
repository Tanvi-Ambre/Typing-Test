const fs = require('fs');

// Read the corrected batches
const correctedData = JSON.parse(fs.readFileSync('mcq-batch-1102-1103-corrected.json', 'utf8'));
const batch1102 = correctedData['BATCH 1102'];
const batch1103 = correctedData['BATCH 1103'];

// Read current mcq-data.js
let mcqDataContent = fs.readFileSync('mcq-data.js', 'utf8');

// Replace BATCH 1102
const batch1102Start = mcqDataContent.indexOf('"BATCH 1102": [');
const batch1102End = mcqDataContent.indexOf('],\n  "BATCH 1103":', batch1102Start);
const newBatch1102Str = `"BATCH 1102": ${JSON.stringify(batch1102, null, 4)}`;
const before1102 = mcqDataContent.substring(0, batch1102Start);
const after1102 = mcqDataContent.substring(batch1102End);
mcqDataContent = before1102 + newBatch1102Str + after1102;

// Replace BATCH 1103
const batch1103Start = mcqDataContent.indexOf('"BATCH 1103": [');
const batch1103End = mcqDataContent.indexOf('],\n  "BATCH 1104":', batch1103Start);
const newBatch1103Str = `"BATCH 1103": ${JSON.stringify(batch1103, null, 4)}`;
const before1103 = mcqDataContent.substring(0, batch1103Start);
const after1103 = mcqDataContent.substring(batch1103End);
mcqDataContent = before1103 + newBatch1103Str + after1103;

// Write back
fs.writeFileSync('mcq-data.js', mcqDataContent, 'utf8');

console.log('✅ Updated mcq-data.js with corrected Batches 1102 and 1103');
console.log(`   Batch 1102: ${batch1102.length} questions`);
console.log(`   Batch 1103: ${batch1103.length} questions`);
