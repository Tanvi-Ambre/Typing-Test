// Letter Writing Module
// Total Marks: 15 (7.5 typing + 7.5 presentation)
// Time: 25 minutes

// Sample Business Letter
const sampleLetter = {
    companyName: "Maharashtra Trading Company",
    companyAddress: "Bohari Ali, Raviwar Peth,\nPune 411002",
    email: "mtc@gmail.com",
    website: "www.mahatrading.org",
    refNo: "Ref.No.MTC/505/2024",
    date: "Date: 24 October 2024",
    recipientName: "Swapna Stationers",
    recipientAddress: "Deccan Gymkhana,\nPune 411004",
    subject: "Stationery Purchase",
    reference: "Your letter dated 15 October 2024",
    salutation: "Dear Sir/Madam,",
    body: `    Thank you for your interest in purchasing stationery from our company.

    Our company sells various types of school and office stationery items at wholesale prices. We have agreements with various branded companies and purchase large quantities of such items from them and resell them at wholesale prices. We can give you maximum discount on the orders you place with us.

    Enclosed with this letter are our list of stationery items and price list. Please send us your purchase order as per your requirement at the earliest. We assure you of excellent service always.`,
    closing: "Thanking you,",
    signature: "Yours faithfully,\n\n\nProprietor\nMaharashtra Trading Company",
    enclosure: "Encl: Price List"
};

// Timer state
let timeRemaining = 1500; // 25 minutes in seconds
let timerInterval = null;
let testStarted = false;

// Quill editor instance
let quill = null;

// DOM elements
let startScreen, letterSection, timerBar, startTestBtn;
let timerDisplay, submitBtn, resultsModal, closeModalX;
let referenceLetter;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('✉️ Letter Writing Module Loaded');
    
    // Get DOM elements
    startScreen = document.getElementById('startScreen');
    letterSection = document.getElementById('letterSection');
    timerBar = document.getElementById('timerBar');
    startTestBtn = document.getElementById('startTestBtn');
    
    timerDisplay = document.getElementById('timerDisplay');
    submitBtn = document.getElementById('submitBtn');
    resultsModal = document.getElementById('resultsModal');
    closeModalX = document.getElementById('closeModalX');
    
    referenceLetter = document.getElementById('referenceLetter');
    
    // Load reference letter
    loadReferenceLetter();
    
    // Initialize Quill editor
    initializeEditor();
    
    // Event listeners
    startTestBtn.addEventListener('click', startTest);
    submitBtn.addEventListener('click', submitLetter);
    closeModalX.addEventListener('click', closeModal);
    
    // Sidebar functionality
    setupSidebar();
    
    console.log('✓ Letter Writing initialized');
});

// Initialize Quill Rich Text Editor
function initializeEditor() {
    quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'underline'],
                [{ 'align': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['clean']
            ]
        },
        placeholder: 'Start typing your letter here...'
    });
    
    console.log('✓ Quill editor initialized');
}

// Load reference letter
function loadReferenceLetter() {
    const letterHTML = formatReferenceLetter(sampleLetter);
    referenceLetter.innerHTML = letterHTML;
}

// Format reference letter for display
function formatReferenceLetter(letter) {
    return `<div style="text-align: center; font-weight: bold; font-size: 24px; margin-bottom: 5px;">
${letter.companyName}
</div>
<div style="text-align: center; margin-bottom: 5px;">
${letter.companyAddress}
</div>
<div style="text-align: center; font-weight: bold; margin-bottom: 5px;">
Email: ${letter.email}
Website: ${letter.website}
</div>
<div style="border-bottom: 2px solid #000; margin-bottom: 10px;"></div>

<div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
<span>${letter.refNo}</span>
<span>${letter.date}</span>
</div>

<div style="margin-bottom: 15px;">
To:
${letter.recipientName}
${letter.recipientAddress}
</div>

<div style="margin-bottom: 15px;">
<strong>Subject:</strong> <u>${letter.subject}</u>
</div>

<div style="margin-bottom: 15px;">
<strong>Reference:</strong> <u>${letter.reference}</u>
</div>

<div style="margin-bottom: 15px;">
${letter.salutation}
</div>

<div style="text-align: justify; margin-bottom: 15px;">
${letter.body}
</div>

<div style="margin-bottom: 15px;">
${letter.closing}
</div>

<div style="margin-bottom: 15px; white-space: pre-line;">
${letter.signature}
</div>

<div>
${letter.enclosure}
</div>`;
}

// Start test
function startTest() {
    console.log('🚀 Starting letter writing test...');
    
    testStarted = true;
    
    // Hide start screen, show letter section and timer
    startScreen.classList.add('hidden');
    letterSection.classList.remove('hidden');
    timerBar.classList.remove('hidden');
    
    // Start timer
    startTimer();
    
    // Focus on editor
    quill.focus();
}

// Timer functions
function startTimer() {
    console.log('⏱️ Timer started: 25 minutes');
    
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            stopTimer();
            autoSubmit();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        console.log('⏱️ Timer stopped');
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    timerDisplay.textContent = `⏱️ Time Remaining: ${timeString}`;
    
    // Add warning when less than 5 minutes
    if (timeRemaining <= 300 && timeRemaining > 0) {
        timerDisplay.classList.add('warning');
    } else {
        timerDisplay.classList.remove('warning');
    }
    
    if (timeRemaining <= 0) {
        timerDisplay.textContent = '⏱️ Time\'s Up!';
        timerDisplay.classList.add('warning');
    }
}

function autoSubmit() {
    console.log('⏰ Time expired - Auto-submitting...');
    
    quill.enable(false);
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitLetter(true);
    }, 1000);
}

// Submit letter
function submitLetter(isAutoSubmit = false) {
    console.log(isAutoSubmit ? '⏰ Auto-submitting letter...' : '📤 Submitting letter...');
    
    stopTimer();
    
    // Get typed content
    const typedHTML = quill.root.innerHTML;
    const typedText = quill.getText();
    
    // Calculate results
    const results = validateLetter(typedText, typedHTML);
    
    // Show results
    showResults(results, isAutoSubmit);
}

// Validate letter (simplified for now)
function validateLetter(typedText, typedHTML) {
    // This is a simplified validation
    // In production, you'd do detailed checking
    
    const referenceText = getReferenceText();
    
    // Count typing errors (simplified)
    const typingErrors = countTypingErrors(typedText, referenceText);
    const typingMarks = Math.max(0, 7.5 - typingErrors);
    
    // Check presentation (simplified)
    const presentationMarks = 7.5; // Placeholder - would check formatting
    
    const totalMarks = typingMarks + presentationMarks;
    const passed = totalMarks >= 6; // Simplified passing criteria
    
    return {
        typingErrors,
        typingMarks,
        presentationMarks,
        totalMarks,
        passed
    };
}

// Get reference text
function getReferenceText() {
    return `${sampleLetter.companyName}
${sampleLetter.companyAddress}
Email: ${sampleLetter.email}
Website: ${sampleLetter.website}
${sampleLetter.refNo} ${sampleLetter.date}
To:
${sampleLetter.recipientName}
${sampleLetter.recipientAddress}
Subject: ${sampleLetter.subject}
Reference: ${sampleLetter.reference}
${sampleLetter.salutation}
${sampleLetter.body}
${sampleLetter.closing}
${sampleLetter.signature}
${sampleLetter.enclosure}`;
}

// Count typing errors (simplified)
function countTypingErrors(typed, reference) {
    // Very simplified - just count length difference
    const diff = Math.abs(typed.length - reference.length);
    return Math.floor(diff / 50); // Rough estimate
}

// Show results
function showResults(results, isAutoSubmit = false) {
    const resultsContent = document.getElementById('resultsContent');
    
    resultsContent.innerHTML = `
        ${isAutoSubmit ? `
            <div style="margin-bottom: 20px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 6px;">
                <strong>⏰ Time Expired!</strong>
                <p style="margin: 5px 0 0 0;">Your letter has been auto-submitted.</p>
            </div>
        ` : ''}
        
        <div class="results-section">
            <h3>📊 Scoring Breakdown</h3>
            <div style="background: white; padding: 15px; border-radius: 6px; margin: 10px 0;">
                <p><strong>Typing Errors:</strong> ${results.typingErrors}</p>
                <p><strong>Typing Marks:</strong> ${results.typingMarks.toFixed(1)} / 7.5</p>
                <p><strong>Presentation Marks:</strong> ${results.presentationMarks.toFixed(1)} / 7.5</p>
            </div>
        </div>
        
        <div class="marks-summary">
            <h3>📊 Final Score</h3>
            <div class="marks-display">${results.totalMarks.toFixed(1)} / 15</div>
            <div class="result-status ${results.passed ? 'pass' : 'fail'}">
                ${results.passed ? '✓ GOOD WORK' : '✗ NEEDS IMPROVEMENT'}
            </div>
        </div>
        
        <div style="margin: 20px 0; padding: 15px; background: #e7f3ff; border-left: 4px solid #2196F3; border-radius: 6px;">
            <strong>ℹ️ Note:</strong>
            <p style="margin: 5px 0 0 0;">This is a simplified validation. Full validation will check formatting, spacing, and all presentation rules.</p>
        </div>
        
        <div class="modal-actions">
            <button id="tryAgainBtn" class="btn btn-primary">Try Again</button>
            <button id="closeResultsBtn" class="btn btn-secondary">Close</button>
        </div>
    `;
    
    resultsModal.classList.remove('hidden');
    
    document.getElementById('tryAgainBtn').addEventListener('click', () => {
        closeModal();
        resetTest();
    });
    
    document.getElementById('closeResultsBtn').addEventListener('click', closeModal);
}

// Close modal
function closeModal() {
    resultsModal.classList.add('hidden');
}

// Reset test
function resetTest() {
    testStarted = false;
    
    startScreen.classList.remove('hidden');
    letterSection.classList.add('hidden');
    timerBar.classList.add('hidden');
    
    quill.enable(true);
    quill.setText('');
    submitBtn.disabled = false;
    
    timeRemaining = 1500;
    timerDisplay.textContent = '⏱️ Time Remaining: 25:00';
    timerDisplay.classList.remove('warning');
    
    console.log('🔄 Test reset');
}

// Sidebar functionality
function setupSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('sidebar-collapsed');
        });
    }
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('open');
        });
    }
    
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !e.target.closest('.mobile-menu-btn')) {
                sidebar.classList.remove('open');
            }
        }
    });
    
    if (sidebar) {
        sidebar.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}
