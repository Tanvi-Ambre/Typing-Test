#!/usr/bin/env node
/**
 * Apply Marathi OCR corrections to mcq-data.js
 * Run this whenever new batches are extracted or corrections are updated.
 * Usage: node fix-mcq-corrections.js
 */

const fs = require('fs');
const { correctMarathiText } = require('./marathi-corrections');
const fixGarbledMatras = correctMarathiText;

const MCQ_FILE = 'mcq-data.js';

// Read file
let content = fs.readFileSync(MCQ_FILE, 'utf8');

// Step 1: Fix Unicode smart/curly quotes -> straight ASCII quotes
const beforeCurly = (content.match(/\u201C|\u201D/g) || []).length;
content = content.replace(/\u201C|\u201D/g, '"');
console.log(`✓ Fixed ${beforeCurly} curly/smart quotes`);

// Step 2: Parse the batch data and apply Marathi corrections to all question/option text
// We operate on the raw string with regex to avoid re-serializing the whole file

let fixCount = 0;

// Extract and fix all string values in the JSON using fixGarbledMatras
content = content.replace(/"question":\s*"((?:[^"\\]|\\.)*)"/g, (match, value) => {
    const fixed = fixGarbledMatras(value.replace(/\\n/g, '\n')).replace(/\n/g, '\\n');
    if (fixed !== value) fixCount++;
    return `"question": "${fixed}"`;
});

content = content.replace(/"[ABCD]":\s*"((?:[^"\\]|\\.)*)"/g, (match, key, value) => {
    // key is captured by the [ABCD] group - re-extract from match
    const keyMatch = match.match(/"([ABCD])":/);
    if (!keyMatch) return match;
    const k = keyMatch[1];
    const valMatch = match.match(/"([ABCD])":\s*"((?:[^"\\]|\\.)*)"/);
    if (!valMatch) return match;
    const val = valMatch[2];
    const fixed = fixGarbledMatras(val.replace(/\\n/g, '\n')).replace(/\n/g, '\\n');
    if (fixed !== val) fixCount++;
    return `"${k}": "${fixed}"`;
});

console.log(`✓ Applied Marathi corrections to ${fixCount} fields`);

// Step 3: Verify syntax before writing
try {
    // Write to temp and try to require it
    const tmpFile = MCQ_FILE + '.tmp';
    fs.writeFileSync(tmpFile, content, 'utf8');
    // Quick syntax check via eval in a sandboxed way
    const src = content
        .replace(/^const /, 'var ')
        .replace(/^var allMCQBatches/, 'var allMCQBatches')
        .replace(/module\.exports.*$/, '');
    new Function(src); // throws SyntaxError if invalid
    fs.unlinkSync(tmpFile);
    console.log('✓ Syntax check passed');
} catch (e) {
    console.error('❌ Syntax error detected — file NOT written:', e.message);
    process.exit(1);
}

// Step 4: Write corrected file
fs.writeFileSync(MCQ_FILE, content, 'utf8');
console.log(`\n✅ Done! ${MCQ_FILE} updated.`);
console.log('Next: run "git add mcq-data.js && git commit -m \'Apply Marathi OCR corrections\' && git push"');
