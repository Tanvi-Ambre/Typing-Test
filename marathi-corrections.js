/**
 * Marathi Text Correction Mapping
 * Maps garbled Devanagari characters to correct ones
 */

/**
 * Fix garbled Devanagari text
 * The PDF extraction is replacing matras (vowel signs) with consonants
 */
function fixGarbledMatras(text) {
    if (!text || typeof text !== 'string') {
        return text;
    }
    
    // Common garbled patterns - these need to be fixed
    const patterns = {
        // Most common patterns from BATCH 1201-1605
        'मधध': 'मध्ये',
        'मधयध': 'मध्ये', 
        'उपययग': 'उपयोग',
        'पकचरचच': 'पूर्वीचे',
        'करणयसचठठ': 'करण्यासाठी',
        'करतचत': 'करतात',
        'असतचत': 'असतात',
        'कयणतयचवठ': 'कोणत्याही',
        'पकचरचठ': 'पूर्वी',
        'करणयचसचठठ': 'करण्यासाठी',
        'कयणतध': 'कोणता',
        'पकचरचध': 'पूर्वी',
        'असत.ध': 'असते',
        'चचच': 'चा',
        'पपटर': 'पेपर',
        'लच': 'ला',
        'असस': 'असा',
        'ससबबध': 'संबंध',
        'ससबबधलतस': 'संबंधित',
        'जचत': 'जातो',
        'जचत.स': 'जातो',
        'हहतह': 'होते',
        'यलपपकक': 'यापैकी',
        'ससबबधलस': 'संबंधित',
        'एकच': 'एकाच',
        'ककम': 'काम',
        'करतकत': 'करतात',
        'करणततक': 'कोणत्या',
        'णपढढ': 'पिढी',
        'मधतध': 'मध्ये',
        'वकपरलध': 'वापरला',
        'गधलध': 'गेला',
        'पणहलढ': 'पहिली',
        'दसद रढ': 'दुसरी',
        'णतसरढ': 'तिसरी',
        'चचथढ': 'चौथी',
        'चच ': 'चा ',
        'चच\n': 'चा\n',
        'चचल': 'चाल',
        'मचगहल': 'मागील',
        'लच': 'ला',
        'जचणचचसचठह': 'जाण्यासाठी',
        'करचवह': 'करावे',
        'मधचस': 'मध्ये',
        'नवहन': 'नवीन',
        'करणचचसचठह': 'करण्यासाठी',
        'वचपर': 'वापर',
        'कसला': 'केला',
        'जातोब': 'जातो',
        
        // Patterns from BATCH 1104-1203 (identified via review)
        'वापुन्हाात': 'वापरतात',
        'वतपुन्हातत': 'वापरतात',
        'वलपुन्हात': 'वापरतात',
        'वतपुन्हाताे': 'वापरले',
        'मधते': 'मध्ये',
        'मधचल': 'मधील',
        'मधवल': 'मधील',
        'मधध,ध': 'मध्ये',
        'मधे ': 'मध्ये ',
        'बरकबर': 'बरोबर',
        'नतहच': 'नाही',
        'आह.ध': 'आहे',
        'जतत.ध': 'जातो',
        'यधत.ध': 'येते',
        'ह धअसत.ध': 'हे असते',
        'ह ध': 'हे',
        'करठध': 'कोठे',
        'तययतनय': 'त्यांना',
        'जधववा': 'जेव्हा',
        'मरत.ध': 'होते',
        'मततलत': 'होतात',
        'सलठव': 'साठी',
        'करण्यासलठव': 'करण्यासाठी',
        'करणयासाठी': 'करण्यासाठी',
        'करणयसाठी': 'करण्यासाठी',
        'करणयचसाठी': 'करण्यासाठी',
        'जगभरतताल': 'जगभरातील',
        'नतव ': 'नाव ',
        'नतव\n': 'नाव\n',
        'बदलना ': 'बदलणे ',
        'अरकध': 'अशक्य',
        'दयखरलय': 'दाखवला',
        'दशरहवला': 'दर्शविला',
        'वरठल': 'वरील',
        'वरचलपैकी': 'वरीलपैकी',
        'एकहच': 'एकही',
        'पचवणयासाठी': 'पाहण्यासाठी',
        'जतसतात': 'जास्तीत',
        'असततत': 'असतात',
        'जतसत ': 'जास्त ',
        'करतत ': 'करत ',
        'करततनत': 'करताना',
        'मधसन': 'मधून',
        'वतपर': 'वापर',
        'पकतरचेत': 'प्रकारच्या',
        'तेतर ': 'तयार ',
        'हकत.ध': 'होते',
        'टतईप': 'टाईप',
        'धत फ': 'हा फ',
        'जतते': 'जाते',
        'ततलत': 'त्याला',
        'मेणततत': 'म्हणतात',

        // From BATCH 1101-1105
        'बररबर': 'बरोबर',
        'चचक': 'चूक',
        'बबईट': 'बाईट',
        'ममणजज': 'म्हणजे',
        'बबट': 'बिट',
        'सबठब': 'साठी',
        'करणधबसबठब': 'करण्यासाठी',
        'वबपर': 'वापर',
        'मरतर': 'करतो',
        'दरनमब': 'दोन्ही',
        'आणण': 'आणि',
        'वरबलपपकक': 'वरीलपैकी',
        'एकमब': 'एकही',
        'नबमब': 'नाही',
        'धबपपकक': 'यापैकी',
        'बरहबर': 'बरोबर',
        'चचत': 'चित्र',
        'महणजक': 'म्हणजे',
        'मलधयमलनक': 'मल्टीमीडिया',
        'तयलर': 'तयार',
        'हहतक': 'होते',
        'वरहलपपकक': 'वरीलपैकी',
        'एकहह': 'एकही',
        'नलहह': 'नाही',
        'ककठक': 'काटे',
        'ककलकलल': 'कॅल्क्युलेटर',
        'आधलरलवर': 'आधारावर',
        'ससपकणरपणक': 'संपूर्णपणे',
        'ककमपधमटरचध': 'कॉम्प्युटरच्या',
        'बनहरणधकसकठर': 'बनविण्यासाठी',
        'पकठहरणधकसकठर': 'पाठविण्यासाठी',
        'वचपरणचचसचठलचध': 'वापरण्यासाठीच्या',
        'मधयक': 'मध्ये',
        'धकसकठर': 'यासाठी',
        'करणयासाठी': 'करण्यासाठी'
    };
    
    let corrected = text;
    
    // Apply all pattern corrections
    for (const [garbled, correct] of Object.entries(patterns)) {
        const regex = new RegExp(garbled, 'g');
        corrected = corrected.replace(regex, correct);
    }
    
    return corrected;
}

// Legacy exports for compatibility
const marathiWordMap = {};
const marathiCharMap = {};

/**
 * Correct garbled Marathi text
 * @param {string} text - Text that may contain garbled Marathi
 * @returns {string} - Corrected text
 */
function correctMarathiText(text) {
    return fixGarbledMatras(text);
}

/**
 * Correct Marathi text in a question object
 * @param {Object} question - Question object with text fields
 * @returns {Object} - Question with corrected text
 */
function correctQuestionMarathi(question) {
    return {
        ...question,
        question: correctMarathiText(question.question),
        options: {
            A: correctMarathiText(question.options.A),
            B: correctMarathiText(question.options.B),
            C: correctMarathiText(question.options.C),
            D: correctMarathiText(question.options.D)
        }
    };
}

/**
 * Correct Marathi text in all questions
 * @param {Array} questions - Array of question objects
 * @returns {Array} - Questions with corrected text
 */
function correctAllQuestions(questions) {
    if (!Array.isArray(questions)) {
        return questions;
    }
    return questions.map(correctQuestionMarathi);
}

module.exports = {
    correctMarathiText,
    correctQuestionMarathi,
    correctAllQuestions,
    marathiCharMap,
    marathiWordMap
};
