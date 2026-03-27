// Email Writing Module
// Total Marks: 5 (1 mark per field)
// Passing Marks: 2.5
// Time Limit: 5 minutes (300 seconds)

// Email templates bank (10 samples)
const emailTemplates = [
    {
        mailTo: 'manager@company.com',
        subject: 'Request for Leave',
        body: `Dear Sir,
I am writing to request leave from 15th to 20th January for personal reasons.
I will ensure all pending work is completed before my leave.`,
        attachment: 'Leave_Application.pdf'
    },
    {
        mailTo: 'hr@organization.com',
        subject: 'Sick Leave Application',
        body: `Dear HR Team,
I am unwell and unable to attend office today.
Please grant me sick leave for 22nd January.`,
        attachment: 'Medical_Certificate.pdf'
    },
    {
        mailTo: 'supervisor@office.com',
        subject: 'Project Status Update',
        body: `Dear Supervisor,
The project is progressing as per schedule.
I will submit the final report by end of this week.`,
        attachment: 'Project_Report.pdf'
    },
    {
        mailTo: 'admin@company.com',
        subject: 'Meeting Request',
        body: `Dear Admin,
I would like to schedule a meeting to discuss the new policy.
Please let me know your available time slots.`,
        attachment: 'Meeting_Agenda.pdf'
    },
    {
        mailTo: 'director@firm.com',
        subject: 'Resignation Letter',
        body: `Dear Director,
I am writing to formally resign from my position.
My last working day will be 31st January.`,
        attachment: 'Resignation_Letter.pdf'
    },
    {
        mailTo: 'accounts@company.com',
        subject: 'Expense Reimbursement',
        body: `Dear Accounts Team,
Please find attached my expense report for this month.
Kindly process the reimbursement at the earliest.`,
        attachment: 'Expense_Report.pdf'
    },
    {
        mailTo: 'training@institute.com',
        subject: 'Training Registration',
        body: `Dear Training Coordinator,
I would like to register for the upcoming workshop.
Please confirm my enrollment and send the details.`,
        attachment: 'Registration_Form.pdf'
    },
    {
        mailTo: 'support@helpdesk.com',
        subject: 'Technical Issue Report',
        body: `Dear Support Team,
I am facing technical issues with my system.
Please assign a technician to resolve this urgently.`,
        attachment: 'Issue_Screenshot.pdf'
    },
    {
        mailTo: 'principal@college.edu',
        subject: 'Permission for Event',
        body: `Dear Principal,
We request permission to organize a cultural event.
The event is planned for 5th February in the auditorium.`,
        attachment: 'Event_Proposal.pdf'
    },
    {
        mailTo: 'client@business.com',
        subject: 'Quotation for Services',
        body: `Dear Client,
Thank you for your inquiry about our services.
Please find attached the detailed quotation as requested.`,
        attachment: 'Service_Quotation.pdf'
    }
];

// Current email (randomly selected)
let currentEmail = null;

// Timer state
let timeRemaining = 300; // 5 minutes in seconds
let timerInterval = null;
let timerDisplay = null;
let testStarted = false;

// DOM elements
let startScreen, emailSection, startTestBtn;
let userMailTo, userSubject, userBody, userAttachment;
let statusMailTo, statusSubject, statusBody, statusAttachment;
let sendBtn, resultsModal, closeModalX;
let refMailTo, refSubject, refBody, refAttachment;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('📧 Email Writing Module Loaded');
    
    // Get DOM elements
    startScreen = document.getElementById('startScreen');
    emailSection = document.getElementById('emailSection');
    startTestBtn = document.getElementById('startTestBtn');
    
    userMailTo = document.getElementById('userMailTo');
    userSubject = document.getElementById('userSubject');
    userBody = document.getElementById('userBody');
    userAttachment = document.getElementById('userAttachment');
    
    statusMailTo = document.getElementById('statusMailTo');
    statusSubject = document.getElementById('statusSubject');
    statusBody = document.getElementById('statusBody');
    statusAttachment = document.getElementById('statusAttachment');
    
    sendBtn = document.getElementById('sendBtn');
    resultsModal = document.getElementById('resultsModal');
    closeModalX = document.getElementById('closeModalX');
    
    refMailTo = document.getElementById('refMailTo');
    refSubject = document.getElementById('refSubject');
    refBody = document.getElementById('refBody');
    refAttachment = document.getElementById('refAttachment');
    
    timerDisplay = document.getElementById('timerDisplay');
    
    // Load random email (but don't show it yet)
    loadRandomEmail();
    
    // Disable inputs initially
    disableInputs();
    
    // Event listeners
    startTestBtn.addEventListener('click', startTest);
    sendBtn.addEventListener('click', sendEmail);
    closeModalX.addEventListener('click', closeModal);
    
    // Sidebar functionality
    setupSidebar();
    
    console.log('✓ Email Writing initialized');
});

// Start test function
function startTest() {
    console.log('🚀 Starting email writing test...');
    
    testStarted = true;
    
    // Hide start screen, show email section
    startScreen.classList.add('hidden');
    emailSection.classList.remove('hidden');
    
    // Enable inputs
    enableInputs();
    
    // Start timer
    startTimer();
    
    // Focus on first input
    userMailTo.focus();
}

// Enable/disable inputs
function disableInputs() {
    userMailTo.disabled = true;
    userSubject.disabled = true;
    userBody.disabled = true;
    userAttachment.disabled = true;
    sendBtn.disabled = true;
}

function enableInputs() {
    userMailTo.disabled = false;
    userSubject.disabled = false;
    userBody.disabled = false;
    userAttachment.disabled = false;
    sendBtn.disabled = false;
}

// Timer functions
function startTimer() {
    console.log('⏱️ Timer started: 5 minutes');
    
    // Update display immediately
    updateTimerDisplay();
    
    // Start countdown
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        // Check if time is up
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
    
    // Add warning class when less than 60 seconds
    if (timeRemaining <= 60 && timeRemaining > 0) {
        timerDisplay.classList.add('warning');
    } else {
        timerDisplay.classList.remove('warning');
    }
    
    // Time's up
    if (timeRemaining <= 0) {
        timerDisplay.textContent = '⏱️ Time\'s Up!';
        timerDisplay.classList.add('warning');
    }
}

function autoSubmit() {
    console.log('⏰ Time expired - Auto-submitting...');
    
    // Disable all inputs
    userMailTo.disabled = true;
    userSubject.disabled = true;
    userBody.disabled = true;
    userAttachment.disabled = true;
    sendBtn.disabled = true;
    
    // Auto-submit after 1 second
    setTimeout(() => {
        sendEmail(true); // Pass true to indicate auto-submit
    }, 1000);
}

// Load random email template
function loadRandomEmail() {
    // Select random email
    const randomIndex = Math.floor(Math.random() * emailTemplates.length);
    currentEmail = emailTemplates[randomIndex];
    
    console.log(`📧 Loaded email template ${randomIndex + 1}`);
    
    // Update reference display
    refMailTo.textContent = currentEmail.mailTo;
    refSubject.textContent = currentEmail.subject;
    refBody.textContent = currentEmail.body;
    refAttachment.textContent = currentEmail.attachment;
    
    // Populate attachment dropdown with all possible attachments
    const allAttachments = [...new Set(emailTemplates.map(e => e.attachment))];
    userAttachment.innerHTML = '<option value="">-- Select Attachment --</option>';
    allAttachments.forEach(att => {
        const option = document.createElement('option');
        option.value = att;
        option.textContent = att;
        userAttachment.appendChild(option);
    });
}

// Validate individual field
function validateField(fieldName) {
    let userValue, refValue, statusEl, inputEl;
    
    switch(fieldName) {
        case 'mailTo':
            userValue = userMailTo.value.trim();
            refValue = currentEmail.mailTo;
            statusEl = statusMailTo;
            inputEl = userMailTo;
            break;
        case 'subject':
            userValue = userSubject.value.trim();
            refValue = currentEmail.subject;
            statusEl = statusSubject;
            inputEl = userSubject;
            break;
        case 'body':
            userValue = userBody.value.trim();
            refValue = currentEmail.body.trim();
            statusEl = statusBody;
            inputEl = userBody;
            break;
        case 'attachment':
            userValue = userAttachment.value;
            refValue = currentEmail.attachment;
            statusEl = statusAttachment;
            inputEl = userAttachment;
            break;
    }
    
    // Check if values match exactly
    const isCorrect = userValue === refValue;
    
    // Update status
    if (userValue === '') {
        statusEl.textContent = '';
        statusEl.className = 'field-status';
        inputEl.className = inputEl.className.replace(/\s*(correct|incorrect)/g, '');
    } else if (isCorrect) {
        statusEl.textContent = 'Correct';
        statusEl.className = 'field-status correct';
        inputEl.classList.remove('incorrect');
        inputEl.classList.add('correct');
    } else {
        statusEl.textContent = 'Incorrect';
        statusEl.className = 'field-status incorrect';
        inputEl.classList.remove('correct');
        inputEl.classList.add('incorrect');
    }
    
    return isCorrect;
}

// Calculate marks for each field
function calculateMarks() {
    const results = {
        mailTo: {
            correct: validateField('mailTo'),
            marks: 0,
            userValue: userMailTo.value.trim(),
            refValue: currentEmail.mailTo
        },
        subject: {
            correct: validateField('subject'),
            marks: 0,
            userValue: userSubject.value.trim(),
            refValue: currentEmail.subject
        },
        body: {
            correct: validateField('body'),
            marks: 0,
            userValue: userBody.value.trim(),
            refValue: currentEmail.body.trim()
        },
        attachment: {
            correct: validateField('attachment'),
            marks: 0,
            userValue: userAttachment.value,
            refValue: currentEmail.attachment
        },
        sendButton: {
            correct: true, // User clicked send button
            marks: 1,
            userValue: 'Clicked',
            refValue: 'Send'
        }
    };
    
    // Assign marks (1 mark per field)
    results.mailTo.marks = results.mailTo.correct ? 1 : 0;
    results.subject.marks = results.subject.correct ? 1 : 0;
    results.body.marks = results.body.correct ? 1 : 0;
    results.attachment.marks = results.attachment.correct ? 1 : 0;
    
    // Calculate total
    const totalMarks = 5;
    const passingMarks = 2.5;
    const marksObtained = results.mailTo.marks + results.subject.marks + 
                          results.body.marks + results.attachment.marks + 
                          results.sendButton.marks;
    
    const passed = marksObtained >= passingMarks;
    
    return {
        fields: results,
        totalMarks,
        passingMarks,
        marksObtained,
        passed
    };
}

// Send email and show results
function sendEmail(isAutoSubmit = false) {
    console.log(isAutoSubmit ? '⏰ Auto-submitting email...' : '📤 Sending email...');
    
    // Stop timer
    stopTimer();
    
    // Check if all fields are filled (only if not auto-submit)
    if (!isAutoSubmit) {
        if (!userMailTo.value.trim() || !userSubject.value.trim() || 
            !userBody.value.trim() || !userAttachment.value) {
            alert('Please fill in all fields before sending!');
            // Restart timer if user cancels
            startTimer();
            return;
        }
    }
    
    // Calculate marks
    const results = calculateMarks();
    
    // Show results modal
    showResults(results, isAutoSubmit);
}

// Show results modal
function showResults(results, isAutoSubmit = false) {
    const { fields, totalMarks, passingMarks, marksObtained, passed } = results;
    
    const resultsContent = document.getElementById('resultsContent');
    
    resultsContent.innerHTML = `
        ${isAutoSubmit ? `
            <div style="margin-bottom: 20px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 6px;">
                <strong>⏰ Time Expired!</strong>
                <p style="margin: 5px 0 0 0;">Your email has been auto-submitted.</p>
            </div>
        ` : ''}
        
        <div class="results-grid">
            <div class="result-item ${fields.mailTo.correct ? 'correct' : 'incorrect'}">
                <label>Mail To:</label>
                <div class="value">${fields.mailTo.correct ? '✓ Correct' : '✗ Incorrect'}</div>
                <div style="font-size: 0.85em; color: #666; margin-top: 5px;">
                    ${fields.mailTo.marks} / 1 mark
                </div>
            </div>
            
            <div class="result-item ${fields.subject.correct ? 'correct' : 'incorrect'}">
                <label>Subject:</label>
                <div class="value">${fields.subject.correct ? '✓ Correct' : '✗ Incorrect'}</div>
                <div style="font-size: 0.85em; color: #666; margin-top: 5px;">
                    ${fields.subject.marks} / 1 mark
                </div>
            </div>
            
            <div class="result-item ${fields.body.correct ? 'correct' : 'incorrect'}">
                <label>Body:</label>
                <div class="value">${fields.body.correct ? '✓ Correct' : '✗ Incorrect'}</div>
                <div style="font-size: 0.85em; color: #666; margin-top: 5px;">
                    ${fields.body.marks} / 1 mark
                </div>
            </div>
            
            <div class="result-item ${fields.attachment.correct ? 'correct' : 'incorrect'}">
                <label>Attachment:</label>
                <div class="value">${fields.attachment.correct ? '✓ Correct' : '✗ Incorrect'}</div>
                <div style="font-size: 0.85em; color: #666; margin-top: 5px;">
                    ${fields.attachment.marks} / 1 mark
                </div>
            </div>
            
            <div class="result-item correct" style="grid-column: 1 / -1;">
                <label>Send Button:</label>
                <div class="value">✓ Clicked</div>
                <div style="font-size: 0.85em; color: #666; margin-top: 5px;">
                    ${fields.sendButton.marks} / 1 mark
                </div>
            </div>
        </div>
        
        <div class="marks-summary">
            <h3>📊 Final Score</h3>
            <div class="marks-display">${marksObtained} / ${totalMarks}</div>
            <div style="font-size: 0.9em; margin: 5px 0;">Passing Marks: ${passingMarks}</div>
            <div class="result-status ${passed ? 'pass' : 'fail'}">
                ${passed ? '✓ PASS' : '✗ FAIL'}
            </div>
        </div>
        
        ${!passed ? `
            <div style="margin: 20px 0; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 6px;">
                <strong>⚠️ Areas to improve:</strong>
                <ul style="margin: 10px 0 0 20px; text-align: left;">
                    ${!fields.mailTo.correct ? '<li>Check the email address spelling</li>' : ''}
                    ${!fields.subject.correct ? '<li>Verify the subject line matches exactly</li>' : ''}
                    ${!fields.body.correct ? '<li>Review the email body content</li>' : ''}
                    ${!fields.attachment.correct ? '<li>Select the correct attachment</li>' : ''}
                </ul>
            </div>
        ` : ''}
        
        <div class="modal-actions">
            <button id="tryAgainBtn" class="btn btn-primary">Try Again</button>
            <button id="closeResultsBtn" class="btn btn-secondary">Close</button>
        </div>
    `;
    
    // Show modal
    resultsModal.classList.remove('hidden');
    
    // Add event listeners to new buttons
    document.getElementById('tryAgainBtn').addEventListener('click', () => {
        closeModal();
        resetAndLoadNew();
    });
    
    document.getElementById('closeResultsBtn').addEventListener('click', closeModal);
}

// Close modal
function closeModal() {
    resultsModal.classList.add('hidden');
}

// Reset form and load new email
function resetAndLoadNew() {
    // Stop any existing timer
    stopTimer();
    
    // Reset test state
    testStarted = false;
    
    // Show start screen, hide email section
    startScreen.classList.remove('hidden');
    emailSection.classList.add('hidden');
    
    // Disable inputs
    disableInputs();
    
    // Clear form
    userMailTo.value = '';
    userSubject.value = '';
    userBody.value = '';
    userAttachment.value = '';
    
    // Clear status indicators
    [statusMailTo, statusSubject, statusBody, statusAttachment].forEach(el => {
        el.textContent = '';
        el.className = 'field-status';
    });
    
    // Clear input classes
    [userMailTo, userSubject, userBody, userAttachment].forEach(el => {
        el.className = el.className.replace(/\s*(correct|incorrect)/g, '');
    });
    
    // Load new random email
    loadRandomEmail();
    
    // Reset timer
    timeRemaining = 300;
    timerDisplay.textContent = '⏱️ Time Remaining: 5:00';
    timerDisplay.classList.remove('warning');
    
    console.log('🔄 Form reset with new email');
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
