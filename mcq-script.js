// Initialize PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// State management
let questionBank = [];
let currentQuestionIndex = 0;
let userAnswers = {};
let practiceMode = true; // true = practice mode, false = test mode
let isAnswerLocked = false; // Lock answer after selection in practice mode

// DOM elements
const uploadSection = document.getElementById('uploadSection');
const practiceSection = document.getElementById('practiceSection');
const resultsSection = document.getElementById('resultsSection');
const reviewSection = document.getElementById('reviewSection');
const pdfInput = document.getElementById('pdfInput');
const questionCount = document.getElementById('questionCount');
const clearBtn = document.getElementById('clearBtn');

// Load saved questions from localStorage
function loadSavedQuestions() {
    const saved = localStorage.getItem('mcqQuestionBank');
    if (saved) {
        questionBank = JSON.parse(saved);
        updateQuestionCount();
        if (questionBank.length > 0) {
            document.getElementById('storedQuestions').classList.remove('hidden');
        }
    }
}

// Save questions to localStorage
function saveQuestions() {
    localStorage.setItem('mcqQuestionBank', JSON.stringify(questionBank));
    updateQuestionCount();
}

// Update question count display
function updateQuestionCount() {
    if (questionBank.length > 0) {
        questionCount.textContent = `${questionBank.length} questions available`;
        clearBtn.classList.remove('hidden');
        
        // Show start practice button
        if (!document.getElementById('startPracticeBtn')) {
            const btn = document.createElement('button');
            btn.id = 'startPracticeBtn';
            btn.className = 'btn btn-primary';
            btn.textContent = 'Start Practice';
            btn.style.marginTop = '15px';
            btn.onclick = startPractice;
            document.getElementById('storedQuestions').appendChild(btn);
        }
    } else {
        questionCount.textContent = 'No questions uploaded yet';
        clearBtn.classList.add('hidden');
        const startBtn = document.getElementById('startPracticeBtn');
        if (startBtn) startBtn.remove();
    }
}

// File input change handler
pdfInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.type === 'application/pdf') {
            handlePDFUpload(file);
        } else {
            showUploadFeedback('Please upload a PDF file', 'error');
        }
    }
});

// Handle PDF upload and extraction (server-side)
async function handlePDFUpload(file) {
    showUploadFeedback('Uploading PDF to server...', 'info');
    
    try {
        // Extract batch name from filename
        const batchMatch = file.name.match(/BATCH\s*-?\s*\((\d+)\)/i);
        const batchName = batchMatch ? `BATCH ${batchMatch[1]}` : file.name.replace('.pdf', '');
        
        // Check if batch already exists in pre-loaded data
        if (typeof allMCQBatches !== 'undefined' && allMCQBatches[batchName]) {
            showUploadFeedback(`${batchName} is already pre-loaded. Please select it from the dropdown.`, 'info');
            console.log(`ℹ️ ${batchName} already exists in pre-loaded data`);
            return;
        }
        
        // Create FormData for upload
        const formData = new FormData();
        formData.append('pdf', file);
        
        console.log(`📤 Uploading ${file.name} to server...`);
        
        // Upload to server
        const response = await fetch('/api/upload-mcq-pdf', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (!response.ok || !result.success) {
            throw new Error(result.error || 'Upload failed');
        }
        
        console.log(`✅ Server extracted ${result.count} questions from ${result.batchName}`);
        
        // Add to allMCQBatches object for dropdown
        if (typeof allMCQBatches === 'undefined') {
            window.allMCQBatches = {};
        }
        allMCQBatches[result.batchName] = result.questions;
        
        // Refresh dropdown to include newly uploaded batch
        populateQuestionSets();
        
        // Auto-select the uploaded batch in dropdown
        const questionSetSelect = document.getElementById('questionSetSelect');
        if (questionSetSelect) {
            questionSetSelect.value = result.batchName;
            console.log(`✓ Auto-selected uploaded batch: ${result.batchName}`);
        }
        
        showUploadFeedback(`✓ Successfully loaded ${result.count} questions from ${result.batchName}. Selected in dropdown.`, 'success');
        
    } catch (error) {
        console.error('❌ Upload error:', error.message);
        showUploadFeedback(`Error: ${error.message}`, 'error');
    }
}


// Start practice
function startPractice() {
    if (questionBank.length === 0) {
        alert('Please upload questions first');
        return;
    }
    
    // Reset state
    currentQuestionIndex = 0;
    userAnswers = {};
    isAnswerLocked = false;
    
    // Shuffle questions for practice
    questionBank = questionBank.sort(() => Math.random() - 0.5);
    
    // Update UI based on mode
    const modeIndicator = document.getElementById('modeIndicator');
    const practiceTitle = document.getElementById('practiceTitle');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const floatingSubmit = document.getElementById('floatingSubmit');
    
    if (practiceMode) {
        modeIndicator.textContent = '📚 Practice Mode';
        modeIndicator.className = 'mode-indicator practice';
        practiceTitle.textContent = 'Practice Questions';
        scoreDisplay.style.display = 'inline';
        floatingSubmit.classList.add('hidden');
    } else {
        modeIndicator.textContent = '📝 Test Mode';
        modeIndicator.className = 'mode-indicator test';
        practiceTitle.textContent = 'Test Questions';
        scoreDisplay.style.display = 'none'; // Hide score in test mode
        floatingSubmit.classList.remove('hidden'); // Show floating submit in test mode
    }
    
    // Show practice section
    uploadSection.classList.add('hidden');
    practiceSection.classList.remove('hidden');
    
    // Display first question
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const question = questionBank[currentQuestionIndex];
    isAnswerLocked = false; // Reset lock for new question
    
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = questionBank.length;
    document.getElementById('qNumber').textContent = currentQuestionIndex + 1;
    document.getElementById('questionText').textContent = question.question;
    
    // Hide feedback
    document.getElementById('answerFeedback').classList.add('hidden');
    
    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    Object.entries(question.options).forEach(([letter, text]) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.dataset.option = letter;
        
        // Show previous selection
        if (userAnswers[question.id] === letter) {
            optionDiv.classList.add('selected');
            
            // In practice mode, show correct/incorrect for already answered questions
            if (practiceMode) {
                isAnswerLocked = true;
                if (letter === question.correctAnswer) {
                    optionDiv.classList.add('correct');
                } else {
                    optionDiv.classList.add('incorrect');
                }
                
                // Show feedback
                showAnswerFeedback(letter === question.correctAnswer, question.correctAnswer, question.options[question.correctAnswer]);
            }
        }
        
        // In practice mode, highlight correct answer if already answered
        if (practiceMode && userAnswers[question.id] && letter === question.correctAnswer) {
            optionDiv.classList.add('correct');
        }
        
        optionDiv.innerHTML = `
            <span class="option-label">${letter})</span>
            <span class="option-text">${text}</span>
        `;
        
        optionDiv.addEventListener('click', () => selectOption(letter));
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').style.display = 
        currentQuestionIndex === questionBank.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submitBtn').style.display = 
        currentQuestionIndex === questionBank.length - 1 ? 'inline-block' : 'none';
    
    updateScore();
}

// Select an option
function selectOption(letter) {
    // In practice mode, don't allow changing answer after selection
    if (practiceMode && isAnswerLocked) {
        return;
    }
    
    const question = questionBank[currentQuestionIndex];
    userAnswers[question.id] = letter;
    
    // Update UI
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });
    
    const selectedOption = document.querySelector(`[data-option="${letter}"]`);
    selectedOption.classList.add('selected');
    
    // In practice mode, show immediate feedback
    if (practiceMode) {
        isAnswerLocked = true;
        const isCorrect = letter === question.correctAnswer;
        
        if (isCorrect) {
            selectedOption.classList.add('correct');
        } else {
            selectedOption.classList.add('incorrect');
            // Also highlight the correct answer
            const correctOption = document.querySelector(`[data-option="${question.correctAnswer}"]`);
            correctOption.classList.add('correct');
        }
        
        // Show feedback message
        showAnswerFeedback(isCorrect, question.correctAnswer, question.options[question.correctAnswer]);
    }
    
    updateScore();
}

// Show answer feedback (Practice mode only)
function showAnswerFeedback(isCorrect, correctAnswer, correctAnswerText) {
    const feedback = document.getElementById('answerFeedback');
    feedback.classList.remove('hidden', 'correct', 'incorrect');
    
    if (isCorrect) {
        feedback.classList.add('correct');
        feedback.innerHTML = `
            <strong>✓ Correct!</strong>
            <div>Great job! You selected the right answer.</div>
        `;
    } else {
        feedback.classList.add('incorrect');
        feedback.innerHTML = `
            <strong>✗ Incorrect</strong>
            <div>The correct answer is:</div>
            <div class="correct-answer-text"><strong>${correctAnswer})</strong> ${correctAnswerText}</div>
        `;
    }
}

// Update score display
function updateScore() {
    let correct = 0;
    questionBank.forEach(q => {
        if (userAnswers[q.id] === q.correctAnswer) {
            correct++;
        }
    });
    
    // Only show score in practice mode or after submission
    if (practiceMode) {
        document.getElementById('currentScore').textContent = correct;
    }
}

// Navigation handlers
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentQuestionIndex < questionBank.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
});

document.getElementById('submitBtn').addEventListener('click', () => {
    // Check if all questions are answered
    const unanswered = questionBank.filter(q => !userAnswers[q.id]);
    if (unanswered.length > 0) {
        if (!confirm(`You have ${unanswered.length} unanswered questions. Submit anyway?`)) {
            return;
        }
    }
    
    showResults();
});

// Floating submit button handler (for test mode)
document.getElementById('floatingSubmitBtn').addEventListener('click', () => {
    // Check if all questions are answered
    const unanswered = questionBank.filter(q => !userAnswers[q.id]);
    if (unanswered.length > 0) {
        if (!confirm(`You have ${unanswered.length} unanswered questions. Submit anyway?`)) {
            return;
        }
    }
    
    showResults();
});

// Exit button handler
document.getElementById('exitPracticeBtn').addEventListener('click', () => {
    const answeredCount = Object.keys(userAnswers).length;
    
    if (answeredCount > 0) {
        const confirmExit = confirm(
            `Are you sure you want to exit?\n\n` +
            `You have answered ${answeredCount} out of ${questionBank.length} questions.\n` +
            `Your progress will be lost.`
        );
        
        if (!confirmExit) {
            return;
        }
    }
    
    // Reset and go back to upload section
    practiceSection.classList.add('hidden');
    uploadSection.classList.remove('hidden');
    
    // Reset state
    currentQuestionIndex = 0;
    userAnswers = {};
    isAnswerLocked = false;
});

// Show results
function showResults() {
    let correct = 0;
    questionBank.forEach(q => {
        if (userAnswers[q.id] === q.correctAnswer) {
            correct++;
        }
    });
    
    const total = questionBank.length;
    const percentage = Math.round((correct / total) * 100);
    const passed = percentage >= 40; // 40% pass mark
    
    practiceSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    
    // Update results title based on mode
    const resultsTitle = resultsSection.querySelector('h2');
    if (practiceMode) {
        resultsTitle.textContent = '📊 Practice Results';
    } else {
        resultsTitle.textContent = '📊 Test Results';
    }
    
    const scorePercentageEl = document.getElementById('scorePercentage');
    scorePercentageEl.textContent = percentage + '%';
    
    // Color code based on pass/fail
    const scoreCircle = document.querySelector('.score-circle');
    if (passed) {
        scoreCircle.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
    } else {
        scoreCircle.style.background = 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)';
    }
    
    document.getElementById('correctCount').textContent = correct;
    document.getElementById('totalCount').textContent = total;
    
    // Add pass/fail message
    const scoreText = document.querySelector('.score-text');
    const passFailMsg = document.createElement('p');
    passFailMsg.style.marginTop = '15px';
    passFailMsg.style.fontSize = '1.3em';
    passFailMsg.style.fontWeight = 'bold';
    
    if (passed) {
        passFailMsg.style.color = '#28a745';
        passFailMsg.textContent = '✓ PASSED';
    } else {
        passFailMsg.style.color = '#dc3545';
        passFailMsg.textContent = '✗ FAILED (Need 40% to pass)';
    }
    
    // Remove old pass/fail message if exists
    const oldMsg = scoreText.querySelector('p');
    if (oldMsg && oldMsg !== scoreText.firstElementChild) {
        oldMsg.remove();
    }
    
    scoreText.appendChild(passFailMsg);
}

// Results button handlers
document.getElementById('reviewBtn').addEventListener('click', showReview);
document.getElementById('retryBtn').addEventListener('click', () => {
    // Go back to upload section to select mode again
    resultsSection.classList.add('hidden');
    uploadSection.classList.remove('hidden');
});
document.getElementById('newUploadBtn').addEventListener('click', () => {
    resultsSection.classList.add('hidden');
    uploadSection.classList.remove('hidden');
});

// Show review
function showReview() {
    resultsSection.classList.add('hidden');
    reviewSection.classList.remove('hidden');
    
    const reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = '';
    
    questionBank.forEach((q, index) => {
        const isCorrect = userAnswers[q.id] === q.correctAnswer;
        const reviewDiv = document.createElement('div');
        reviewDiv.className = `review-question ${isCorrect ? 'correct' : 'incorrect'}`;
        
        reviewDiv.innerHTML = `
            <div class="review-question-header">
                <span class="review-question-number">Question ${index + 1}</span>
                <span class="review-status ${isCorrect ? 'correct' : 'incorrect'}">
                    ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </span>
            </div>
            <div class="review-question-text">${q.question}</div>
            <div class="review-answer user">
                <strong>Your Answer:</strong> ${userAnswers[q.id] ? `${userAnswers[q.id]}) ${q.options[userAnswers[q.id]]}` : 'Not answered'}
            </div>
            <div class="review-answer correct-answer">
                <strong>Correct Answer:</strong> ${q.correctAnswer}) ${q.options[q.correctAnswer]}
            </div>
        `;
        
        reviewContainer.appendChild(reviewDiv);
    });
}

document.getElementById('backToResultsBtn').addEventListener('click', () => {
    reviewSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
});

// Clear all questions
clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all questions? This cannot be undone.')) {
        questionBank = [];
        localStorage.removeItem('mcqQuestionBank');
        updateQuestionCount();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSavedQuestions();
    populateQuestionSets();
    
    // Load sample questions button
    const loadSampleBtn = document.getElementById('loadSampleBtn');
    if (loadSampleBtn) {
        loadSampleBtn.addEventListener('click', async () => {
            try {
                const response = await fetch('sample-questions.json');
                const sampleQuestions = await response.json();
                
                questionBank = [...questionBank, ...sampleQuestions];
                saveQuestions();
                
                alert(`✓ Loaded ${sampleQuestions.length} sample questions successfully!`);
                document.getElementById('storedQuestions').classList.remove('hidden');
            } catch (error) {
                console.error('Error loading sample questions:', error);
                alert('Error loading sample questions. Make sure sample-questions.json exists.');
            }
        });
    }
});

// Populate question set dropdown
function populateQuestionSets() {
    const questionSetSelect = document.getElementById('questionSetSelect');
    
    // Check if allMCQBatches is available (from mcq-data.js)
    if (typeof allMCQBatches === 'undefined' || !allMCQBatches || Object.keys(allMCQBatches).length === 0) {
        questionSetSelect.innerHTML = '<option value="">No question sets available</option>';
        document.getElementById('startPracticeFromSetBtn').disabled = true;
        return;
    }
    
    // Clear loading message
    questionSetSelect.innerHTML = '<option value="">-- Select a question set --</option>';
    
    // Add each batch as an option
    Object.keys(allMCQBatches).forEach((batchName) => {
        const questions = allMCQBatches[batchName];
        const option = document.createElement('option');
        option.value = batchName;
        option.textContent = `${batchName} (${questions.length} questions)`;
        questionSetSelect.appendChild(option);
    });
    
    console.log(`✓ Loaded ${Object.keys(allMCQBatches).length} pre-loaded batch(es)`);
}

// Start practice from selected question set
document.getElementById('startPracticeFromSetBtn').addEventListener('click', () => {
    const questionSetSelect = document.getElementById('questionSetSelect');
    const selectedBatchName = questionSetSelect.value;
    
    if (!selectedBatchName || selectedBatchName === '') {
        showUploadFeedback('Please select a question set first', 'error');
        return;
    }
    
    // Get selected mode
    const selectedMode = document.querySelector('input[name="practiceMode"]:checked').value;
    practiceMode = (selectedMode === 'practice');
    
    // Get questions from selected batch
    const questions = allMCQBatches[selectedBatchName];
    
    // Convert questions to the format expected by the app
    questionBank = questions.map(q => ({
        id: Date.now() + q.id + Math.random(),
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        userAnswer: null
    }));
    
    console.log(`✓ Loaded ${questionBank.length} questions from ${selectedBatchName}`);
    console.log(`✓ Mode: ${practiceMode ? 'Practice' : 'Test'}`);
    
    // Start practice immediately
    startPractice();
});

// Handle PDF upload button
document.getElementById('uploadPdfBtn').addEventListener('click', () => {
    pdfInput.click();
});

// Show upload feedback
function showUploadFeedback(message, type) {
    const feedback = document.getElementById('uploadFeedback');
    feedback.textContent = message;
    feedback.className = `upload-feedback ${type}`;
    feedback.classList.remove('hidden');
    
    setTimeout(() => {
        feedback.classList.add('hidden');
    }, 3000);
}

// Sidebar toggle functionality
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainContent = document.querySelector('.main-content');

// Desktop toggle (collapse/expand)
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('sidebar-collapsed');
    });
}

// Mobile toggle (open/close)
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('open');
    });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !e.target.closest('.mobile-menu-btn')) {
            sidebar.classList.remove('open');
        }
    }
});

// Prevent clicks inside sidebar from closing it
sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
});
