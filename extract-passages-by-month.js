#!/usr/bin/env node
/**
 * Extract Speed Passages Organized by Month
 * Extracts passages from month-based folders
 */

const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const PASSAGES_DIR = 'exam-materials/speed-passages';
const OUTPUT_FILE = 'passages-data.js';

// Extract text from DOCX file
function extractTextFromDocx(filePath) {
    try {
        const zip = new AdmZip(filePath);
        const entry = zip.getEntry('word/document.xml');
        
        if (!entry) {
            throw new Error('Invalid DOCX file');
        }
        
        const xml = zip.readAsText(entry);
        
        // Extract text from XML
        let text = xml.replace(/<w:p[^>]*>/g, '\n')
                     .replace(/<[^>]+>/g, '')
                     .replace(/&lt;/g, '<')
                     .replace(/&gt;/g, '>')
                     .replace(/&amp;/g, '&')
                     .replace(/&quot;/g, '"')
                     .replace(/&apos;/g, "'");
        
        // Clean up extra whitespace
        text = text.split('\n')
                   .map(line => line.trim())
                   .filter(line => line.length > 0)
                   .join('\n');
        
        // Add 5-space indents to paragraphs
        text = text.split('\n')
                   .map(line => '     ' + line)
                   .join('\n');
        
        return text;
    } catch (error) {
        console.error(`Error extracting ${filePath}:`, error.message);
        return null;
    }
}

// Count words in text
function countWords(text) {
    return text.split(/\s+/).filter(word => word.length > 0).length;
}

// Extract all passages organized by month
function extractAllPassages() {
    console.log('📚 Extracting Speed Passages by Month');
    console.log('='.repeat(70));
    
    const passagesByMonth = {};
    
    // Get all month folders
    const monthFolders = fs.readdirSync(PASSAGES_DIR)
        .filter(item => {
            const fullPath = path.join(PASSAGES_DIR, item);
            return fs.statSync(fullPath).isDirectory();
        })
        .sort();
    
    console.log(`\n📁 Found ${monthFolders.length} month folders: ${monthFolders.join(', ')}\n`);
    
    for (const monthFolder of monthFolders) {
        const monthPath = path.join(PASSAGES_DIR, monthFolder);
        const docxFiles = fs.readdirSync(monthPath)
            .filter(f => f.endsWith('.docx') && !f.startsWith('~'))
            .sort();
        
        console.log(`\n📅 ${monthFolder.toUpperCase()}`);
        console.log(`   Found ${docxFiles.length} passages`);
        
        const passages = [];
        
        for (const file of docxFiles) {
            const filePath = path.join(monthPath, file);
            const text = extractTextFromDocx(filePath);
            
            if (text) {
                const wordCount = countWords(text);
                
                passages.push({
                    filename: file,
                    text: text,
                    wordCount: wordCount
                });
                
                console.log(`   ✓ ${file} (${wordCount} words)`);
            } else {
                console.log(`   ✗ ${file} (failed)`);
            }
        }
        
        // Format month name for display
        const monthDisplay = monthFolder
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');
        
        passagesByMonth[monthFolder] = {
            displayName: monthDisplay,
            passages: passages
        };
    }
    
    return passagesByMonth;
}

// Generate passages-data.js
function generatePassagesFile(passagesByMonth) {
    console.log('\n' + '='.repeat(70));
    console.log('📝 Generating passages-data.js\n');
    
    const totalPassages = Object.values(passagesByMonth)
        .reduce((sum, month) => sum + month.passages.length, 0);
    
    const fileContent = `// Speed Passages - Organized by Month
// Generated: ${new Date().toISOString()}
// Total months: ${Object.keys(passagesByMonth).length}
// Total passages: ${totalPassages}

const passagesByMonth = ${JSON.stringify(passagesByMonth, null, 2)};

// Get list of available months
const availableMonths = ${JSON.stringify(Object.keys(passagesByMonth).map(key => ({
    key: key,
    display: passagesByMonth[key].displayName,
    count: passagesByMonth[key].passages.length
})), null, 2)};

// Export for use in browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { passagesByMonth, availableMonths };
}
`;
    
    fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf8');
    
    console.log('✅ Generated passages-data.js');
    console.log(`   Months: ${Object.keys(passagesByMonth).length}`);
    console.log(`   Total passages: ${totalPassages}`);
    console.log(`   File size: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2)} KB\n`);
    
    // Show summary by month
    console.log('📊 Summary by Month:');
    for (const [key, data] of Object.entries(passagesByMonth)) {
        console.log(`   ${data.displayName}: ${data.passages.length} passages`);
    }
}

// Main execution
try {
    const passagesByMonth = extractAllPassages();
    generatePassagesFile(passagesByMonth);
    
    console.log('\n' + '='.repeat(70));
    console.log('✅ EXTRACTION COMPLETE!');
    console.log('='.repeat(70));
    console.log('\nNext steps:');
    console.log('1. Review passages-data.js');
    console.log('2. Update UI to show month selection');
    console.log('3. Test passage selection by month\n');
    
} catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
}
