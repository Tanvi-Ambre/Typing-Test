/**
 * Marathi Text Correction Mapping
 * Maps garbled Devanagari characters to correct ones
 */

// Character-level corrections for garbled Devanagari
const marathiCharMap = {
    // Common garbled patterns to correct Devanagari
    'ब': 'ब', 'र': 'र', 'ो': 'ो', 'म': 'म', 'ध': 'ध', 'ज': 'ज',
    'ण': 'ण', 'त': 'त', 'स': 'स', 'ठ': 'ठ', 'क': 'क', 'न': 'न',
    'प': 'प', 'ल': 'ल', 'व': 'व', 'श': 'श', 'ह': 'ह', 'य': 'य',
    'च': 'च', 'ू': 'ू', 'ी': 'ी', 'े': 'े', 'ै': 'ै', 'ं': 'ं',
    'ा': 'ा', 'ि': 'ि', 'ु': 'ु', '्': '्', 'ँ': 'ँ', 'ः': 'ः',
    
    // Garbled to correct mappings
    'बबईट': 'बाईट',
    'ममणजज': 'म्हणजे',
    'बररबर': 'बरोबर',
    'चचक': 'चूक',
    'मधधज': 'मध्ये',
    'सबठब': 'साठी',
    'करणधबसबठब': 'करण्यासाठी',
    'वबपर': 'वापर',
    'मरतर': 'करतो',
    'मबणमतब': 'माहिती',
    'धबपपकक': 'यापैकी',
    'नबमब': 'नाही',
    'वरबलपपकक': 'वरीलपैकी',
    'एकमब': 'एकही',
    'भबरतबध': 'भारतीय',
    'भबषजमधधज': 'भाषेमध्ये',
    'टबईप': 'टाईप',
    'दरनमब': 'दोन्ही',
    'आणण': 'आणि',
    'वबपरबपचवर': 'वापरापूर्वी',
    'गरजजचज': 'गरजेचे',
    'असतज': 'असते',
    'फबईल': 'फाईल',
    'समज': 'सहज',
    'धजऊ': 'येऊ',
    'शकतबत': 'शकतात',
    'चधब': 'च्या',
    'मबगबल': 'मागील',
    'लब': 'ला',
    'असज': 'असे',
    'ममणतबत': 'म्हणतात',
    'धबयसबरखब': 'यासारख्या',
    'सबधबरणपणज': 'सामान्यपणे',
    'पबमबधलब': 'पाहायला',
    'णमळतज': 'मिळते',
    'खबलब': 'खाली',
    'जब': 'जी',
    'ददलब': 'दिली',
    'जबतज': 'जाते',
    'णतलब': 'तिला',
    'मब': 'हा',
    'करणतब': 'कोणता',
    'वबपरतबत': 'वापरतात',
    'शबद': 'शब्द',
    'शरधणधबसबठब': 'शोधण्यासाठी',
    'कमबत': 'कमीत',
    'कमब': 'कमी',
    'दकतब': 'किती',
    'असतज': 'असते',
    'कबध': 'काय',
    'दतज': 'देते',
    'वरबल': 'वरील',
    'सवर': 'सर्व',
    'चब': 'चा',
    'बदलणधबसबठब': 'बदलण्यासाठी',
    'उपधरग': 'उपयोग',
    'मरतर': 'करतो',
    'चज': 'चे',
    'मधबल': 'मधील',
    'जबवज': 'जावे',
    'लबगतज': 'लागते',
    'उपलबध': 'उपलब्ध',
    'मधबल': 'मधील',
    'पपढबलपपकक': 'पुढीलपैकी',
    'करणतधब': 'कोणत्या',
    'करबवब': 'करावा',
    'लबगतर': 'लागतो',
    'णसलजकट': 'सिलेक्ट',
    'धजतर': 'येतो',
    'नवबन': 'नवीन',
    'तधबर': 'तयार',
    'आपण': 'आपण',
    'वबपरतर': 'वापरतो',
    'कबधर': 'काम',
    'करतज': 'करते',
    'धब': 'हा',
    'असतबत': 'असतात',
    'ममणजज': 'म्हणजे',
    'जईमजल': 'ईमेल',
    'परगबम': 'प्रोग्राम',
    'आमज': 'आहे',
    'मरध': 'होय',
    'बबट': 'बिट',
    'उदबमरण': 'उदाहरण',
    'आम': 'आहे'
};

// Word-level corrections (complete words)
const marathiWordMap = {
    'बररबर': 'बरोबर',
    'चचक': 'चूक',
    'बबईट': 'बाईट',
    'ममणजज': 'म्हणजे',
    'बबट': 'बिट',
    'मधधज': 'मध्ये',
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
    
    // New patterns from recent extraction
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
    'धकसकठर': 'यासाठी'
};

/**
 * Correct garbled Marathi text
 * @param {string} text - Text that may contain garbled Marathi
 * @returns {string} - Corrected text
 */
function correctMarathiText(text) {
    if (!text || typeof text !== 'string') {
        return text;
    }

    let corrected = text;

    // Apply word-level corrections first (more accurate)
    Object.keys(marathiWordMap).forEach(garbled => {
        const correct = marathiWordMap[garbled];
        const regex = new RegExp(garbled, 'g');
        corrected = corrected.replace(regex, correct);
    });

    // Apply character-level corrections for remaining issues
    Object.keys(marathiCharMap).forEach(garbled => {
        const correct = marathiCharMap[garbled];
        if (garbled !== correct) {
            const regex = new RegExp(garbled, 'g');
            corrected = corrected.replace(regex, correct);
        }
    });

    return corrected;
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
