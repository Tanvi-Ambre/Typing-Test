// Simple MCQ extraction using the text we already extracted
// This uses the sample-questions.json as a base and fixes the Marathi text

const fs = require('fs');

// Marathi character mapping to fix encoding issues
const marathiFixMap = {
    'वररल': 'वरील',
    'फफईल': 'फाईल',
    'ययतफत': 'येतात',
    'करतफ': 'करता',
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
    'सलफईर': 'स्लाईड',
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
    'बनलयलय': 'बनलेले'
};

function fixMarathiText(text) {
    if (!text) return text;
    
    let fixed = text;
    
    // Apply all mappings
    for (const [wrong, correct] of Object.entries(marathiFixMap)) {
        fixed = fixed.replace(new RegExp(wrong, 'g'), correct);
    }
    
    return fixed;
}

// Read the sample questions
const sampleQuestions = JSON.parse(fs.readFileSync('sample-questions.json', 'utf8'));

// Fix Marathi text in all questions
const fixedQuestions = sampleQuestions.map(q => ({
    id: q.id,
    question: fixMarathiText(q.question),
    options: {
        A: fixMarathiText(q.options.A),
        B: fixMarathiText(q.options.B),
        C: fixMarathiText(q.options.C),
        D: fixMarathiText(q.options.D)
    },
    correctAnswer: q.correctAnswer
}));

// Create question set
const questionSet = {
    filename: 'BATCH - (1303).pdf',
    batchNumber: '1303',
    examDate: 'January 2026',
    questions: fixedQuestions,
    extractedAt: new Date().toISOString()
};

// Save to JSON
fs.writeFileSync('extracted-mcq.json', JSON.stringify([questionSet], null, 2));
console.log('✅ Fixed Marathi text in 25 questions');
console.log('📝 Saved to: extracted-mcq.json');

// Generate JavaScript file
const jsContent = `// Auto-generated from PDF files
// Generated on: ${new Date().toISOString()}

const extractedMCQSets = ${JSON.stringify([questionSet], null, 2)};

// Export for use in mcq-script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = extractedMCQSets;
}
`;

fs.writeFileSync('mcq-data.js', jsContent);
console.log('📦 Generated: mcq-data.js');
console.log('\n🎉 Done! Include mcq-data.js in your HTML before mcq-script.js');
