// Passage generator for variety
const passageTemplates = {
    sentences: {
        technology: [
            "Technology has transformed the way we live and work.",
            "Digital innovation continues to shape our daily experiences.",
            "Artificial intelligence is revolutionizing various industries.",
            "The internet connects billions of people worldwide.",
            "Smart devices have become essential in modern life.",
            "Cloud computing enables seamless data access.",
            "Cybersecurity remains a critical concern for organizations.",
            "Mobile applications simplify everyday tasks.",
            "Virtual reality opens new possibilities for entertainment.",
            "Automation increases efficiency in manufacturing.",
            "Software development drives technological progress.",
            "Data analytics provides valuable business insights.",
            "Blockchain technology ensures secure transactions.",
            "Machine learning algorithms improve over time.",
            "Remote work tools enable global collaboration.",
            "Digital transformation reshapes traditional business models.",
            "Internet of things connects everyday objects.",
            "Quantum computing promises unprecedented processing power.",
            "Augmented reality enhances user experiences.",
            "Robotics advances manufacturing and healthcare sectors.",
            "Five generation networks deliver faster connectivity.",
            "Biometric authentication improves security measures.",
            "Edge computing reduces latency in applications.",
            "Open source software fosters innovation and collaboration.",
            "Technology education prepares students for future careers.",
            "Digital literacy becomes increasingly important for everyone.",
            "Innovation drives economic growth and competitiveness.",
            "Technology bridges geographical and cultural divides.",
            "Sustainable technology solutions address environmental challenges.",
            "Emerging technologies create new career opportunities."
        ],
        education: [
            "Education is the foundation of personal growth.",
            "Learning opens doors to countless opportunities.",
            "Teachers inspire students to reach their potential.",
            "Online courses make education more accessible.",
            "Critical thinking skills are essential for success.",
            "Libraries provide valuable resources for research.",
            "Collaborative learning enhances understanding.",
            "Lifelong learning keeps minds active and engaged.",
            "Educational technology transforms traditional classrooms.",
            "Practical experience complements theoretical knowledge.",
            "Student engagement improves learning outcomes.",
            "Diverse perspectives enrich classroom discussions.",
            "Assessment methods should measure true understanding.",
            "Mentorship programs guide career development.",
            "Curiosity drives the pursuit of knowledge.",
            "Interactive learning methods increase retention.",
            "Project based learning develops practical skills.",
            "Personalized education addresses individual needs.",
            "Study groups foster peer learning.",
            "Educational equity ensures equal opportunities.",
            "Continuous feedback helps students improve.",
            "Creative teaching methods inspire student interest.",
            "Research skills enable independent learning.",
            "Global education promotes cultural awareness.",
            "Vocational training prepares students for careers.",
            "Educational partnerships strengthen community connections.",
            "Learning environments should be safe and inclusive.",
            "Academic excellence requires dedication and effort.",
            "Knowledge sharing benefits entire communities.",
            "Education empowers individuals to create positive change."
        ],
        health: [
            "Regular exercise strengthens both body and mind.",
            "A balanced diet provides essential nutrients.",
            "Adequate sleep is crucial for recovery.",
            "Mental health deserves as much attention as physical health.",
            "Preventive care helps catch issues early.",
            "Stress management techniques improve wellbeing.",
            "Staying hydrated supports all bodily functions.",
            "Social connections contribute to overall happiness.",
            "Mindfulness practices reduce anxiety and tension.",
            "Healthy habits lead to a better quality of life.",
            "Meditation promotes mental clarity and focus.",
            "Yoga combines physical and mental exercise.",
            "Nutrition education empowers better food choices.",
            "Regular checkups maintain optimal health.",
            "Achieving balance prevents burnout and fatigue.",
            "Physical activity boosts energy and mood.",
            "Fresh air and sunlight benefit overall wellness.",
            "Limiting processed foods improves health outcomes.",
            "Consistent sleep schedules regulate body rhythms.",
            "Deep breathing exercises calm the nervous system.",
            "Stretching prevents injuries and improves flexibility.",
            "Positive relationships support emotional wellbeing.",
            "Setting boundaries protects mental health.",
            "Gratitude practices enhance life satisfaction.",
            "Regular movement prevents chronic diseases.",
            "Healthy cooking methods preserve nutritional value.",
            "Outdoor activities connect us with nature.",
            "Self care routines promote overall wellness.",
            "Community support strengthens health initiatives.",
            "Wellness programs encourage healthy lifestyle choices."
        ],
        environment: [
            "Environmental conservation protects our planet.",
            "Climate change affects ecosystems worldwide.",
            "Renewable energy offers sustainable alternatives.",
            "Recycling reduces waste and conserves resources.",
            "Pollution threatens both wildlife and human health.",
            "Sustainable practices benefit future generations.",
            "Deforestation destroys vital habitats.",
            "Clean water is essential for all life.",
            "Individual actions make a collective difference.",
            "Green technology helps reduce carbon emissions.",
            "Biodiversity maintains ecological balance.",
            "Ocean conservation protects marine ecosystems.",
            "Solar power provides clean energy solutions.",
            "Composting enriches soil naturally.",
            "Wildlife preservation ensures species survival.",
            "Reducing plastic use protects marine life.",
            "Energy efficiency lowers environmental impact.",
            "Sustainable agriculture preserves soil health.",
            "Forest restoration combats climate change.",
            "Water conservation addresses scarcity issues.",
            "Eco friendly transportation reduces air pollution.",
            "Green building practices minimize resource consumption.",
            "Environmental education raises awareness.",
            "Carbon footprint reduction benefits the planet.",
            "Habitat protection maintains ecosystem services.",
            "Sustainable fishing preserves ocean resources.",
            "Wetland conservation filters water naturally.",
            "Native plant species support local wildlife.",
            "Environmental policies guide sustainable development.",
            "Community gardens promote urban greening."
        ],
        communication: [
            "Effective communication builds strong relationships.",
            "Active listening shows respect and understanding.",
            "Clear expression prevents misunderstandings.",
            "Body language conveys important messages.",
            "Written communication requires clarity and precision.",
            "Empathy enhances interpersonal connections.",
            "Feedback helps improve performance and skills.",
            "Cultural awareness promotes better dialogue.",
            "Digital tools facilitate global communication.",
            "Honest conversation resolves conflicts effectively.",
            "Nonverbal cues complement spoken words.",
            "Public speaking builds confidence and influence.",
            "Storytelling engages and inspires audiences.",
            "Collaboration requires open communication.",
            "Respectful discourse fosters mutual understanding.",
            "Asking questions demonstrates genuine interest.",
            "Paraphrasing confirms accurate understanding.",
            "Tone of voice affects message reception.",
            "Eye contact establishes connection and trust.",
            "Patience allows for thoughtful responses.",
            "Constructive criticism promotes growth.",
            "Transparency builds credibility and trust.",
            "Adapting communication styles improves effectiveness.",
            "Conflict resolution requires diplomatic skills.",
            "Persuasive communication influences decisions.",
            "Networking expands professional opportunities.",
            "Team communication ensures project success.",
            "Presentation skills convey ideas powerfully.",
            "Interpersonal skills strengthen workplace relationships.",
            "Communication training develops essential competencies."
        ],
        business: [
            "Strategic planning guides organizational success.",
            "Innovation drives competitive advantage.",
            "Customer satisfaction builds brand loyalty.",
            "Teamwork achieves goals more effectively.",
            "Leadership inspires and motivates others.",
            "Quality control ensures product excellence.",
            "Market research identifies consumer needs.",
            "Financial management maintains business stability.",
            "Networking creates valuable professional connections.",
            "Adaptability helps businesses thrive in change.",
            "Ethical practices build trust and reputation.",
            "Efficiency improvements reduce operational costs.",
            "Employee development strengthens organizations.",
            "Risk management protects business interests.",
            "Customer feedback drives continuous improvement.",
            "Brand identity differentiates from competitors.",
            "Supply chain optimization improves delivery.",
            "Digital marketing reaches target audiences.",
            "Sales strategies increase revenue growth.",
            "Performance metrics guide decision making.",
            "Workplace culture affects employee satisfaction.",
            "Business partnerships create mutual benefits.",
            "Process automation streamlines operations.",
            "Competitive analysis informs strategy.",
            "Stakeholder engagement ensures alignment.",
            "Corporate responsibility enhances public image.",
            "Change management facilitates smooth transitions.",
            "Resource allocation maximizes productivity.",
            "Business intelligence supports informed decisions.",
            "Entrepreneurship fosters economic development."
        ]
    }
};

function generateRandomPassage() {
    // Select random topic
    const topics = Object.keys(passageTemplates.sentences);
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const sentences = passageTemplates.sentences[topic];
    
    // Shuffle all sentences
    const shuffled = [...sentences].sort(() => Math.random() - 0.5);
    
    // Calculate how many sentences we need for ~210 words (avg 7 words per sentence = 30 sentences)
    const targetSentences = 28 + Math.floor(Math.random() * 5); // 28-32 sentences
    const selectedSentences = shuffled.slice(0, Math.min(targetSentences, shuffled.length));
    
    // Divide into 2-3 paragraphs
    const numParagraphs = 2 + Math.floor(Math.random() * 2); // 2 or 3 paragraphs
    const sentencesPerParagraph = Math.floor(selectedSentences.length / numParagraphs);
    
    const paragraphs = [];
    for (let i = 0; i < numParagraphs; i++) {
        const start = i * sentencesPerParagraph;
        const end = i === numParagraphs - 1 ? selectedSentences.length : (i + 1) * sentencesPerParagraph;
        paragraphs.push(selectedSentences.slice(start, end).join(' '));
    }
    
    // Format with indentation
    return paragraphs.map(p => '     ' + p).join('\n');
}

// Sample passages for 30 WPM test (EXACTLY 210 words for 7 minutes)
// Each paragraph starts with 5 spaces for proper indentation (standard typing format)
const passages = [
    "     The art of communication is the language of leadership. Effective leaders know that their words have power and impact. They choose their words carefully and speak with clarity and purpose. Good communication builds trust and creates strong relationships (both personal and professional). It helps teams work together towards common goals. When people understand each other well, they can solve problems more easily.\n     Clear communication reduces confusion and prevents mistakes; it saves time and improves productivity. In the workplace, good communication skills are essential for success. They help in presenting ideas, giving feedback, and resolving conflicts. Active listening is just as important as speaking clearly. When we listen carefully to others, we show respect and build rapport. As the saying goes, \"Communication works for those who work at it.\"\n     Communication is not just about words. Body language, tone of voice, and facial expressions also convey important messages. Being aware of these non-verbal cues (gestures, posture, eye contact) helps us communicate more effectively. In today's digital age, written communication has become increasingly important. Taking time to improve communication skills is a worthwhile investment. Practice makes perfect, and anyone can become a better communicator with effort and dedication. Remember: effective communication is a two-way street that requires both speaking and listening skills to create meaningful connections.",
    
    "     Technology has transformed the way we live and work in remarkable ways. From smartphones to artificial intelligence (AI), innovations continue to shape our daily lives. The internet has connected people across the globe, making information accessible to everyone. Social media platforms allow us to share experiences and stay in touch with friends and family. Online shopping has revolutionized retail, offering convenience and variety.\n     Digital payment systems have made transactions faster and more secure; cloud computing enables businesses to store and access data from anywhere. Remote work has become common, giving employees flexibility and balance. Video conferencing tools help teams collaborate effectively across distances. Educational technology has opened new learning opportunities for students worldwide. As experts say, \"Technology is best when it brings people together.\" These innovations have changed how we learn.\n     Healthcare has benefited from technological advances with telemedicine and electronic health records (EHR). Wearable devices track fitness and health metrics, encouraging healthier lifestyles. However, with these benefits come challenges: privacy concerns and cybersecurity threats require constant attention. As technology evolves, we must adapt and learn continuously. The future promises even more exciting innovations (quantum computing, biotechnology, renewable energy) that will further change our world. Embracing technology while maintaining human connections is key to progress and happiness.",
    
    "     Education is the foundation of personal and societal growth in every community. It empowers individuals with knowledge and skills needed to succeed in life. Learning begins in childhood and continues throughout our lives (lifelong learning). Schools provide structured environments where students acquire fundamental abilities in reading, writing, and mathematics. Teachers play a crucial role in shaping young minds and inspiring curiosity. They guide students through challenges and celebrate achievements.\n     Education extends beyond academic subjects to include critical thinking and problem solving; it teaches us how to analyze information and make informed decisions. Social skills developed in educational settings help us interact effectively with others. Teamwork and collaboration are essential skills learned through group projects and activities. Education opens doors to career opportunities and economic advancement. As Nelson Mandela said, \"Education is the most powerful weapon which you can use to change the world.\" This truth remains relevant.\n     Access to quality education should be a right for everyone, regardless of background or circumstances. Libraries and educational resources make learning accessible to all. Online courses and digital tools have expanded educational opportunities globally. Lifelong learning keeps our minds active and helps us adapt to changing world. Investing in education creates a brighter future for generations to come. Quality education (formal and informal) remains the cornerstone of human development and social progress in modern society.",
    
    "     Health and wellness are essential components of a fulfilling life for everyone. Taking care of our physical and mental wellbeing requires conscious effort and dedication. Regular exercise strengthens our bodies and improves cardiovascular health; it boosts energy levels and enhances mood through the release of endorphins. A balanced diet provides the nutrients our bodies need to function optimally. Fresh fruits and vegetables supply vitamins and minerals that support immune system.\n     Adequate sleep is crucial for physical recovery and mental clarity every day. Most adults need seven to nine hours of quality sleep each night. Stress management techniques help us cope with daily challenges and pressures. Meditation and deep breathing exercises promote relaxation and reduce anxiety effectively. Staying hydrated by drinking plenty of water (at least eight glasses daily) supports all bodily functions. Regular health checkups and preventive care catch potential issues early. As the proverb states, \"Health is wealth.\"\n     Mental health is just as important as physical health and deserves attention. Talking to friends, family, or professionals helps us process emotions and experiences. Building strong social connections contributes to overall happiness and longevity. Avoiding harmful habits like smoking and excessive alcohol consumption protects our health. Small positive changes in daily routines can lead to significant improvements over time. Remember: taking care of yourself is not selfish; it is essential for living a balanced and productive life.",
    
    "     Environmental conservation is one of the most pressing challenges of our time today. Climate change affects weather patterns and threatens ecosystems worldwide. Rising temperatures cause glaciers to melt and sea levels to rise dramatically. Extreme weather events (hurricanes, droughts, floods) are becoming more frequent and severe. Deforestation destroys habitats and reduces biodiversity on our planet at alarming rates.\n     Pollution contaminates air, water, and soil, harming both wildlife and human health; plastic waste accumulates in oceans, endangering marine life and ecosystems. Sustainable practices help reduce our environmental footprint and preserve natural resources. Recycling and composting minimize waste sent to landfills. Renewable energy sources like solar and wind power offer clean alternatives to fossil fuels. Energy efficient appliances and vehicles reduce consumption and emissions. As environmentalists remind us, \"We do not inherit the earth from our ancestors; we borrow it from our children.\"\n     Conservation efforts protect endangered species and their habitats around the world. Planting trees helps absorb carbon dioxide and produces oxygen we breathe. Individual actions collectively make a significant difference in environmental protection. Choosing reusable products over single use items reduces waste generation. Supporting environmentally responsible companies encourages sustainable business practices. Working together, we can create a healthier and more sustainable world for future generations. Every small action (reducing plastic use, conserving water, using public transport) contributes to positive impact.",
    
    "     Time management is a valuable skill that improves productivity and reduces stress significantly. Planning your day helps you prioritize important tasks and meet deadlines effectively. Making a to-do list keeps you organized and focused on what needs to be done. Breaking large projects into smaller steps makes them more manageable and less overwhelming. As Benjamin Franklin said, \"Time is money.\" This wisdom applies to both personal and professional life.\n     Setting realistic goals gives you direction and motivation to achieve success; avoiding procrastination saves time and prevents last-minute rushes. Learning to say no to unnecessary commitments protects your time and energy. Taking regular breaks actually improves concentration and prevents burnout. Using tools like calendars and reminders helps you stay on track with your schedule. The key is to work smarter, not harder. Effective planning makes all the difference.\n     Eliminating distractions creates a better environment for focused work and productivity. Delegating tasks when possible allows you to concentrate on high-priority activities. Reviewing your progress regularly helps you adjust your plans and improve efficiency. Good time management creates more opportunities for personal growth and leisure activities. Mastering this skill leads to greater achievement and a more balanced life. Remember: time is the one resource we cannot renew or replace. Managing it wisely (through planning, prioritization, and discipline) is essential for success in both personal and professional endeavors every day.",
    
    "     Reading is a gateway to knowledge and imagination for people everywhere. Books transport us to different worlds and introduce us to diverse perspectives. Through reading, we expand our vocabulary and improve our language skills significantly. It enhances our ability to think critically and analyze complex ideas. Regular reading strengthens concentration and improves memory retention. As Dr. Seuss wrote, \"The more that you read, the more things you will know.\" This simple truth inspires readers.\n     Fiction allows us to experience emotions and situations beyond our daily lives; it develops empathy by helping us understand characters from various backgrounds. Non-fiction provides factual information and insights into real-world topics. Biographies inspire us with stories of remarkable people and their achievements. Reading news and articles keeps us informed about current events and global issues. Different genres (mystery, romance, science fiction, history) offer unique benefits and entertainment. Each book opens new doors.\n     Establishing a daily reading habit enriches our lives in countless ways every day. Libraries offer free access to millions of books and resources. Digital platforms make reading more convenient with e-books and audiobooks. Joining book clubs creates opportunities for discussion and social connection. Whether for education or entertainment, reading remains one of the most rewarding activities we can pursue. Reading not only improves our knowledge but also reduces stress and enhances creativity significantly. Make time for reading every day, even if just for fifteen minutes."
];

let currentPassage = '';
let testStarted = false;
let testEnded = false;
let timeRemaining = 420; // 7 minutes in seconds
let timerInterval = null;
let errorCount = 0;
let startTime = null;
let realtimeMode = true; // Toggle for real-time feedback

// DOM elements
const passageEl = document.getElementById('passage');
const typingArea = document.getElementById('typingArea');
const startBtn = document.getElementById('startBtn');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const timerEl = document.getElementById('timer');
const wordCountEl = document.getElementById('wordCount');
const errorCountEl = document.getElementById('errorCount');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const resultsEl = document.getElementById('results');
const realtimeModeToggle = document.getElementById('realtimeMode');

// Initialize
function init() {
    // 50% chance to use generated passage, 50% chance to use static passage
    if (Math.random() < 0.5 && passages.length > 0) {
        currentPassage = passages[Math.floor(Math.random() * passages.length)];
    } else {
        currentPassage = generateRandomPassage();
    }
    
    // Use textContent to preserve spaces with pre-wrap
    passageEl.textContent = currentPassage;
    
    resetStats();
    
    // Calculate and display word count (after resetStats)
    const wordCount = currentPassage.trim().split(/\s+/).length;
    if (wordCountEl) {
        wordCountEl.textContent = wordCount;
    }
}

function resetStats() {
    testStarted = false;
    testEnded = false;
    timeRemaining = 420;
    errorCount = 0;
    startTime = null;
    
    typingArea.value = '';
    typingArea.disabled = true;
    typingArea.style.display = 'block';
    
    // Remove any highlight divs
    const highlightDiv = document.querySelector('.typing-area-highlight');
    if (highlightDiv) {
        highlightDiv.remove();
    }
    
    updateTimer();
    errorCountEl.textContent = '0';
    wpmEl.textContent = '0';
    accuracyEl.textContent = '100%';
    
    // Word count will be set by init() function
    
    resultsEl.classList.add('hidden');
    startBtn.disabled = false;
    submitBtn.classList.add('hidden');
    realtimeModeToggle.disabled = false;
    
    // Use textContent to preserve spaces
    passageEl.textContent = currentPassage;
}

function startTest() {
    testStarted = true;
    testEnded = false;
    startTime = Date.now();
    
    typingArea.disabled = false;
    typingArea.focus();
    startBtn.disabled = true;
    submitBtn.classList.remove('hidden');
    realtimeModeToggle.disabled = true;
    
    timerInterval = setInterval(updateTimer, 1000);
}

function endTest() {
    testEnded = true;
    testStarted = false;
    
    clearInterval(timerInterval);
    typingArea.disabled = true;
    submitBtn.classList.add('hidden');
    
    // If not in realtime mode, show errors in typing area
    if (!realtimeMode) {
        highlightTypingAreaErrors();
    }
    
    showResults();
}

function updateTimer() {
    if (testStarted && !testEnded) {
        timeRemaining--;
        
        if (timeRemaining <= 0) {
            timeRemaining = 0;
            endTest();
        }
    }
    
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeRemaining <= 60) {
        timerEl.style.color = '#dc3545';
    } else {
        timerEl.style.color = '#667eea';
    }
}

function calculateErrors(typedText, passageText) {
    // Standard typing test error counting:
    // Compare word by word, count errors per word
    // This way "imaginationnk" vs "imagination" = 1 error (wrong word)
    // Not cascading character errors
    
    const typedWords = typedText.trim().split(/\s+/);
    const passageWords = passageText.trim().split(/\s+/);
    
    let errors = 0;
    let correctChars = 0;
    
    const maxWords = Math.max(typedWords.length, passageWords.length);
    
    for (let i = 0; i < maxWords; i++) {
        const typedWord = typedWords[i] || '';
        const passageWord = passageWords[i] || '';
        
        if (typedWord === passageWord) {
            // Word is completely correct
            correctChars += typedWord.length;
            if (i < maxWords - 1) correctChars++; // Count space
        } else if (typedWord && passageWord) {
            // Word has errors - count as 1 error per word
            errors++;
            // But still count correct characters within the word
            const minLen = Math.min(typedWord.length, passageWord.length);
            for (let j = 0; j < minLen; j++) {
                if (typedWord[j] === passageWord[j]) {
                    correctChars++;
                }
            }
        } else if (typedWord && !passageWord) {
            // Extra word typed
            errors++;
        } else if (!typedWord && passageWord) {
            // Word not typed yet - not an error
        }
    }
    
    return { errors, correctChars };
}

function highlightText() {
    const typedText = typingArea.value;
    const passageText = currentPassage;
    
    const { errors, correctChars } = calculateErrors(typedText, passageText);
    
    // Update stats
    errorCount = errors;
    errorCountEl.textContent = errors;
    
    const totalTyped = typedText.length;
    const accuracy = totalTyped > 0 ? ((correctChars / totalTyped) * 100).toFixed(1) : 100;
    accuracyEl.textContent = `${accuracy}%`;
    
    if (startTime) {
        const timeElapsed = (Date.now() - startTime) / 1000 / 60;
        const wordsTyped = correctChars / 5;
        const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        wpmEl.textContent = wpm;
    }
    
    // Only highlight in real-time mode
    if (!realtimeMode) {
        return;
    }
    
    // Real-time mode: highlight passage word by word
    // Split by spaces but keep track of complete vs incomplete words
    const typedWords = typedText.trim().split(/\s+/);
    const passageWords = passageText.trim().split(/\s+/);
    
    // Check if last typed word is complete (followed by space)
    const lastCharIsSpace = typedText.length > 0 && /\s$/.test(typedText);
    const completeTypedWords = lastCharIsSpace ? typedWords.length : typedWords.length - 1;
    
    let html = '';
    
    // Handle leading spaces
    const leadingSpaces = passageText.match(/^\s+/);
    if (leadingSpaces) {
        const typedLeading = typedText.match(/^\s+/);
        const leadingMatch = typedLeading && typedLeading[0] === leadingSpaces[0];
        const spaces = leadingSpaces[0].replace(/ /g, '&nbsp;');
        
        if (typedText.length === 0) {
            html += spaces;
        } else if (leadingMatch) {
            html += `<span class="correct">${spaces}</span>`;
        } else {
            html += `<span class="incorrect">${spaces}</span>`;
        }
    }
    
    // Highlight words
    for (let i = 0; i < passageWords.length; i++) {
        const passageWord = passageWords[i];
        const typedWord = typedWords[i] || '';
        
        if (i < completeTypedWords) {
            // User has completed typing this word (pressed space after it)
            if (typedWord === passageWord) {
                // Perfect match
                html += `<span class="correct">${escapeHtml(passageWord)}</span>`;
            } else {
                // Word has errors
                html += `<span class="incorrect">${escapeHtml(passageWord)}</span>`;
            }
            
            // Add space after word
            if (i < passageWords.length - 1) {
                html += '&nbsp;';
            }
        } else if (i === completeTypedWords && !lastCharIsSpace) {
            // Currently typing this word - show as current (yellow), not error
            html += `<span class="current">${escapeHtml(passageWord)}</span>`;
            if (i < passageWords.length - 1) {
                html += '&nbsp;';
            }
        } else {
            // Not yet typed
            html += escapeHtml(passageWord);
            if (i < passageWords.length - 1) {
                html += '&nbsp;';
            }
        }
    }
    
    passageEl.innerHTML = html;
    
    // Check if passage is completed
    if (completeTypedWords >= passageWords.length && testStarted) {
        endTest();
    }
}

function highlightTypingAreaErrors() {
    const typedText = typingArea.value;
    const passageText = currentPassage;
    const typingSection = document.querySelector('.typing-section');
    
    // Word-by-word highlighting - same logic as left side
    const typedWords = typedText.trim().split(/\s+/);
    const passageWords = passageText.trim().split(/\s+/);
    
    let html = '';
    
    // Handle leading spaces
    const leadingSpaces = typedText.match(/^\s+/);
    if (leadingSpaces) {
        const passageLeading = passageText.match(/^\s+/);
        const leadingMatch = passageLeading && leadingSpaces[0] === passageLeading[0];
        const spaces = leadingSpaces[0].replace(/ /g, '&nbsp;');
        
        if (leadingMatch) {
            html += `<span class="correct-char">${spaces}</span>`;
        } else {
            html += `<span class="error-char">${spaces}</span>`;
        }
    }
    
    // Highlight each word - green for correct, red for wrong
    for (let i = 0; i < typedWords.length; i++) {
        const typedWord = typedWords[i];
        const passageWord = passageWords[i] || '';
        
        if (typedWord === passageWord) {
            // Word is correct - green
            html += `<span class="correct-char">${escapeHtml(typedWord)}</span>`;
        } else {
            // Word has errors - red
            html += `<span class="error-char">${escapeHtml(typedWord)}</span>`;
        }
        
        // Add space after word (except last)
        if (i < typedWords.length - 1) {
            html += '&nbsp;';
        }
    }
    
    // Replace textarea with highlighted div
    typingArea.style.display = 'none';
    
    const highlightDiv = document.createElement('div');
    highlightDiv.className = 'typing-area-highlight';
    highlightDiv.innerHTML = html;
    typingSection.appendChild(highlightDiv);
}

function showResults() {
    const typedText = typingArea.value;
    const passageText = currentPassage;
    
    const { errors, correctChars, totalCharsChecked } = calculateErrors(typedText, passageText);
    
    const totalTyped = typedText.length;
    const accuracy = totalTyped > 0 ? ((correctChars / totalTyped) * 100).toFixed(1) : 0;
    
    const timeElapsed = (420 - timeRemaining) / 60; // in minutes
    const wordsTyped = correctChars / 5;
    const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    
    const passed = errors <= 14 && typedText.length >= passageText.length;
    
    const statusEl = resultsEl.querySelector('.result-status');
    const detailsEl = resultsEl.querySelector('.result-details');
    
    statusEl.className = `result-status ${passed ? 'pass' : 'fail'}`;
    statusEl.textContent = passed ? '✓ PASSED' : '✗ FAILED';
    
    const timeUsed = 420 - timeRemaining;
    const minutesUsed = Math.floor(timeUsed / 60);
    const secondsUsed = timeUsed % 60;
    
    detailsEl.innerHTML = `
        <p><strong>Result:</strong> ${passed ? 'Congratulations! You passed the test.' : 'You did not pass this time. Keep practicing!'}</p>
        <p><strong>Errors:</strong> ${errors} / 14 allowed</p>
        <p><strong>Accuracy:</strong> ${accuracy}%</p>
        <p><strong>Words Per Minute:</strong> ${wpm} WPM</p>
        <p><strong>Time Used:</strong> ${minutesUsed}:${secondsUsed.toString().padStart(2, '0')} / 7:00</p>
        <p><strong>Characters Typed:</strong> ${totalTyped} / ${passageText.length}</p>
        <p><strong>Correct Characters:</strong> ${correctChars}</p>
        ${!passed && errors > 14 ? '<p style="color: #dc3545; margin-top: 15px;">⚠ Too many errors. Maximum 14 errors allowed.</p>' : ''}
        ${!passed && typedText.length < passageText.length ? '<p style="color: #dc3545; margin-top: 15px;">⚠ Passage not completed.</p>' : ''}
        <p style="margin-top: 20px; color: #666; font-style: italic;">
            ${passed ? 'Great job! Your typing accuracy and speed meet the requirements.' : 'Keep practicing to improve your accuracy and speed. Focus on typing each character exactly as shown.'}
        </p>
        <p style="margin-top: 15px; color: #667eea; font-weight: 500;">
            ${!realtimeMode ? '💡 Close this popup to review your errors highlighted in the typing area.' : ''}
        </p>
        <div style="margin-top: 25px; display: flex; gap: 10px; justify-content: center;">
            <button id="closeResultsBtn" class="btn btn-secondary">Close & Review</button>
            <button id="newTestBtn" class="btn btn-primary">Start New Test</button>
        </div>
    `;
    
    resultsEl.classList.remove('hidden');
    
    // Add event listeners
    document.getElementById('closeResultsBtn').addEventListener('click', closeResults);
    document.getElementById('newTestBtn').addEventListener('click', startNewTest);
}

function closeResults() {
    resultsEl.classList.add('hidden');
    // Keep the error highlighting visible in the typing area
}

function startNewTest() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    // Generate new passage - mix of static and generated
    if (Math.random() < 0.5 && passages.length > 0) {
        currentPassage = passages[Math.floor(Math.random() * passages.length)];
    } else {
        currentPassage = generateRandomPassage();
    }
    passageEl.textContent = currentPassage;
    resetStats();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event listeners
startBtn.addEventListener('click', startTest);

submitBtn.addEventListener('click', () => {
    if (testStarted && !testEnded) {
        endTest();
    }
});

resetBtn.addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    init();
});

realtimeModeToggle.addEventListener('change', (e) => {
    realtimeMode = e.target.checked;
    if (!testStarted) {
        // Reset passage display when mode changes - use textContent to preserve spaces
        passageEl.textContent = currentPassage;
    }
});

typingArea.addEventListener('input', () => {
    if (testStarted && !testEnded) {
        highlightText();
    }
});

// Prevent Tab key from leaving textarea - insert spaces instead
typingArea.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !typingArea.disabled) {
        e.preventDefault();
        
        // Insert 5 spaces at cursor position (standard indentation)
        const start = typingArea.selectionStart;
        const end = typingArea.selectionEnd;
        const value = typingArea.value;
        
        typingArea.value = value.substring(0, start) + '     ' + value.substring(end);
        
        // Move cursor after the inserted spaces
        typingArea.selectionStart = typingArea.selectionEnd = start + 5;
        
        // Trigger input event to update highlighting
        const inputEvent = new Event('input', { bubbles: true });
        typingArea.dispatchEvent(inputEvent);
    }
});

// Prevent paste
typingArea.addEventListener('paste', (e) => {
    e.preventDefault();
    alert('Pasting is not allowed in the typing test!');
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    init();
});
