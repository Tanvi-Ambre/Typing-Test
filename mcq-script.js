// Initialize PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// State management
let questionBank = [];
let currentQuestionIndex = 0;
let userAnswers = {};
let practiceMode = true;

// DOM elements
const uploadSection = document.getElementById('uploadSection');
const practiceSection = document.getElementById('practiceSection');
const resultsSection = document.getElementById('resultsSection');
const reviewSection = document.getElementById('reviewSection');
const uploadArea = document.getElementById('uploadArea');
const pdfInput = document.getElementById('pdfInput');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileStatus = document.getElementById('fileStatus');
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

// Upload area click handler
uploadArea.addEventListener('click', () => {
    pdfInput.click();
});

// Drag and drop handlers
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.background = '#e7f3ff';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.background = '#f8f9fa';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.background = '#f8f9fa';
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
        handlePDFUpload(file);
    } else {
        alert('Please upload a PDF file');
    }
});

// File input change handler
pdfInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handlePDFUpload(file);
    }
});

// Handle PDF upload and extraction
async function handlePDFUpload(file) {
    fileName.textContent = file.name;
    fileStatus.textContent = 'Processing...';
    fileInfo.classList.remove('hidden');
    
    try {
        const text = await extractTextFromPDF(file);
        const questions = parseQuestions(text);
        
        if (questions.length === 0) {
            fileStatus.textContent = 'No questions found in PDF';
            fileStatus.style.color = '#dc3545';
            alert('No questions found. Please check the PDF format.');
            return;
        }
        
        // Add to question bank
        questionBank = [...questionBank, ...questions];
        saveQuestions();
        
        fileStatus.textContent = `✓ Extracted ${questions.length} questions successfully`;
        fileStatus.style.color = '#28a745';
        
        setTimeout(() => {
            fileInfo.classList.add('hidden');
            pdfInput.value = '';
        }, 3000);
        
    } catch (error) {
        console.error('Error processing PDF:', error);
        fileStatus.textContent = '✗ Error processing PDF';
        fileStatus.style.color = '#dc3545';
        alert('Error processing PDF. Please check the file format.');
    }
}

// Extract text from PDF using PDF.js
async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
    }
    
    return fullText;
}

// Parse questions from extracted text
function parseQuestions(text) {
    const questions = [];
    
    // Pattern to match questions
    // Supports formats like:
    // Question 1: Text here?
    // A) Option 1
    // B) Option 2
    // C) Option 3
    // D) Option 4
    // Answer: B
    
    const questionPattern = /Question\s+(\d+):\s*(.+?)(?=Question\s+\d+:|$)/gis;
    const matches = text.matchAll(questionPattern);
    
    for (const match of matches) {
        const questionNum = match[1];
        const questionBlock = match[2];
        
        // Extract question text (everything before first option)
        const questionTextMatch = questionBlock.match(/^(.+?)(?=[A-D]\))/s);
        if (!questionTextMatch) continue;
        
        const questionText = questionTextMatch[1].trim();
        
        // Extract options
        const optionPattern = /([A-D])\)\s*(.+?)(?=[A-D]\)|Answer:|$)/gis;
        const optionMatches = [...questionBlock.matchAll(optionPattern)];
        
        if (optionMatches.length < 2) continue; // Need at least 2 options
        
        const options = {};
        optionMatches.forEach(opt => {
            const letter = opt[1].toUpperCase();
            const text = opt[2].trim();
            options[letter] = text;
        });
        
        // Extract answer
        const answerMatch = questionBlock.match(/Answer:\s*([A-D])/i);
        if (!answerMatch) continue;
        
        const correctAnswer = answerMatch[1].toUpperCase();
        
        questions.push({
            id: Date.now() + parseInt(questionNum),
            question: questionText,
            options: options,
            correctAnswer: correctAnswer,
            userAnswer: null
        });
    }
    
    return questions;
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
    
    // Shuffle questions for practice
    questionBank = questionBank.sort(() => Math.random() - 0.5);
    
    // Show practice section
    uploadSection.classList.add('hidden');
    practiceSection.classList.remove('hidden');
    
    // Display first question
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const question = questionBank[currentQuestionIndex];
    
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = questionBank.length;
    document.getElementById('qNumber').textContent = currentQuestionIndex + 1;
    document.getElementById('questionText').textContent = question.question;
    
    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    Object.entries(question.options).forEach(([letter, text]) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.dataset.option = letter;
        
        if (userAnswers[question.id] === letter) {
            optionDiv.classList.add('selected');
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
    const question = questionBank[currentQuestionIndex];
    userAnswers[question.id] = letter;
    
    // Update UI
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
        if (opt.dataset.option === letter) {
            opt.classList.add('selected');
        }
    });
    
    updateScore();
}

// Update score display
function updateScore() {
    let correct = 0;
    questionBank.forEach(q => {
        if (userAnswers[q.id] === q.correctAnswer) {
            correct++;
        }
    });
    document.getElementById('currentScore').textContent = correct;
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
    
    practiceSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    
    document.getElementById('scorePercentage').textContent = percentage + '%';
    document.getElementById('correctCount').textContent = correct;
    document.getElementById('totalCount').textContent = total;
}

// Results button handlers
document.getElementById('reviewBtn').addEventListener('click', showReview);
document.getElementById('retryBtn').addEventListener('click', startPractice);
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
});

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
