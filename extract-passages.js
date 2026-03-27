// Node.js script to extract passages from .docx files
// Run: npm install adm-zip (first time only)
// Then: node extract-passages.js

const fs = require('fs');
const path = require('path');

// Check if adm-zip is installed
let AdmZip;
try {
    AdmZip = require('adm-zip');
} catch (e) {
    console.error('❌ Error: adm-zip not installed');
    console.log('\n📦 Please install it first:');
    console.log('   npm install adm-zip');
    console.log('\nThen run this script again.');
    process.exit(1);
}

function extractTextFromDocx(filePath) {
    try {
        const zip = new AdmZip(filePath);
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
        }).filter(p => p.length > 10); // Filter out very short paragraphs (likely headers/footers)
        
        // Format with 5-space indents and single newlines between paragraphs
        const formatted = paragraphTexts.map(p => '     ' + p).join('\n');
        
        return formatted;
    } catch (error) {
        console.error(`Error extracting ${filePath}:`, error.message);
        return null;
    }
}

// Main execution
console.log('🔍 Scanning for .docx files...\n');

const docxFiles = fs.readdirSync('.')
    .filter(file => file.endsWith('.docx') && file.startsWith('Eng30 Speed'));

console.log(`Found ${docxFiles.length} .docx files:\n`);

const passages = [];

docxFiles.forEach((file, index) => {
    console.log(`${index + 1}. Processing: ${file}`);
    const text = extractTextFromDocx(file);
    
    if (text) {
        const wordCount = text.trim().split(/\s+/).length;
        console.log(`   ✓ Extracted ${wordCount} words`);
        
        passages.push({
            filename: file,
            text: text,
            wordCount: wordCount
        });
    } else {
        console.log(`   ✗ Failed to extract`);
    }
});

console.log(`\n✅ Successfully extracted ${passages.length} passages`);

// Write to JSON file
const outputPath = 'extracted-passages.json';
fs.writeFileSync(outputPath, JSON.stringify(passages, null, 2));
console.log(`\n📝 Saved to: ${outputPath}`);

// Generate JavaScript file to embed in app
const jsContent = `// Auto-generated from .docx files
// Generated on: ${new Date().toISOString()}

const extractedPassages = ${JSON.stringify(passages.map(p => p.text), null, 2)};

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = extractedPassages;
}
`;

const jsOutputPath = 'passages-data.js';
fs.writeFileSync(jsOutputPath, jsContent);
console.log(`📦 Generated: ${jsOutputPath}`);

console.log('\n🎉 Done! Include passages-data.js in your HTML before script.js');
