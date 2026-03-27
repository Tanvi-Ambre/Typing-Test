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

// Handle PDF upload and extraction
async function handlePDFUpload(file) {
    showUploadFeedback('Processing PDF...', 'success');
    
    try {
        const text = await extractTextFromPDF(file);
        
        // Show extracted text in console for debugging
        console.log('=== FULL EXTRACTED TEXT ===');
        console.log(text);
        console.log('=== END EXTRACTED TEXT ===');
        
        const questions = parseQuestions(text);
        
        if (questions.length === 0) {
            showUploadFeedback('No questions found in PDF', 'error');
            
            // Show helpful error message with extracted text preview
            const textPreview = text.substring(0, 500);
            const errorMsg = `No questions found in the PDF.\n\n` +
                `Extracted text preview:\n${textPreview}\n\n` +
                `Please check:\n` +
                `1. PDF contains text (not scanned images)\n` +
                `2. Questions are in table format with columns\n` +
                `3. Open browser console (F12) to see full extracted text\n\n` +
                `If the text looks correct in console, the PDF format might be different.\n` +
                `Please share the console output for debugging.`;
            
            alert(errorMsg);
            return;
        }
        
        // Add to question bank
        questionBank = [...questionBank, ...questions];
        saveQuestions();
        
        showUploadFeedback(`✓ Extracted ${questions.length} questions successfully`, 'success');
        
        document.getElementById('storedQuestions').classList.remove('hidden');
        
        setTimeout(() => {
            pdfInput.value = '';
        }, 3000);
        
    } catch (error) {
        console.error('Error processing PDF:', error);
        showUploadFeedback('✗ Error processing PDF', 'error');
        alert(`Error processing PDF: ${error.message}\n\nPlease check:\n1. File is a valid PDF\n2. PDF is not password protected\n3. PDF contains text (not just images)\n\nError details: ${error.stack}`);
    }
}

// Extract text from PDF using PDF.js
async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    console.log('PDF Pages:', pdf.numPages);
    
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Better text extraction - group by Y position (rows in table)
        const rows = {};
        
        textContent.items.forEach((item) => {
            const y = Math.round(item.transform[5]); // Y position
            if (!rows[y]) {
                rows[y] = [];
            }
            rows[y].push({
                text: item.str,
                x: item.transform[4] // X position for sorting
            });
        });
        
        // Sort rows by Y position (top to bottom)
        const sortedYs = Object.keys(rows).map(Number).sort((a, b) => b - a);
        
        // Build text row by row
        sortedYs.forEach(y => {
            // Sort items in row by X position (left to right)
            rows[y].sort((a, b) => a.x - b.x);
            const rowText = rows[y].map(item => item.text).join(' ');
            fullText += rowText + '\n';
        });
        
        fullText += '\n';
    }
    
    console.log('Extracted text preview:', fullText.substring(0, 800));
    
    return fullText;
}

// Parse questions from extracted text
function parseQuestions(text) {
    const questions = [];
    
    console.log('=== PDF TEXT EXTRACTION DEBUG ===');
    console.log('Total text length:', text.length);
    console.log('First 1000 chars:', text.substring(0, 1000));
    
    // Check if this is a table format (like MSCE answer key)
    // Table format has: Sr.No | Question | Option A | Option B | Option C | Option D | Provisional Ans.
    const isTableFormat = text.includes('Sr.No') && text.includes('Option A') && text.includes('Option B');
    
    if (isTableFormat) {
        console.log('✓ Detected TABLE FORMAT (MSCE Answer Key style)');
        return parseTableFormat(text);
    } else {
        console.log('✓ Detected STANDARD FORMAT');
        return parseStandardFormat(text);
    }
}

// Parse table format (MSCE answer key style)
// Parse table format (MSCE answer key style)
function parseTableFormat(text) {
    const questions = [];
    
    console.log('=== PARSING TABLE FORMAT ===');
    
    // Remove headers
    text = text.replace(/MAHARASHTRA STATE COUNCIL.*?BATCH - \d+/s, '');
    text = text.replace(/Sr\.No\s+Question\s+Option A\s+Option B\s+Option C\s+Option D\s+Provisional Ans\./g, '');
    
    const allLines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    console.log('Total lines:', allLines.length);
    
    let i = 0;
    while (i < allLines.length) {
        const line = allLines[i];
        
        // Check if line starts with a number (question row)
        const numberMatch = line.match(/^(\d{1,2})\s+(.+)/);
        
        if (!numberMatch) {
            i++;
            continue;
        }
        
        const questionNumber = parseInt(numberMatch[1]);
        let restOfLine = numberMatch[2];
        
        console.log(`\n--- Q${questionNumber} ---`);
        console.log('Line:', line.substring(0, 100));
        
        // Check for continuation line (doesn't start with number)
        if (i + 1 < allLines.length) {
            const nextLine = allLines[i + 1];
            if (!/^\d{1,2}\s/.test(nextLine) && !nextLine.includes('Sr.No')) {
                restOfLine += ' ' + nextLine;
                i++; // Skip continuation
                console.log('+ Continuation:', nextLine.substring(0, 50));
            }
        }
        
        // Extract answer from end (single letter A-D)
        const answerMatch = restOfLine.match(/\s+([A-D])(?:\s+[^\s]+)*\s*$/);
        
        if (!answerMatch) {
            console.log('❌ No answer');
            i++;
            continue;
        }
        
        const correctAnswer = answerMatch[1].toUpperCase();
        const answerPos = restOfLine.lastIndexOf(answerMatch[1]);
        
        // Content before answer (question + options)
        const contentBeforeAnswer = restOfLine.substring(0, answerPos).trim();
        
        // Content after answer (usually last part of option D or question continuation)
        const contentAfterAnswer = restOfLine.substring(answerPos + 1).trim();
        
        console.log('Answer:', correctAnswer);
        
        // Split by 3+ spaces (table columns)
        const parts = contentBeforeAnswer.split(/\s{3,}/);
        
        console.log('Parts:', parts.length);
        parts.forEach((p, idx) => console.log(`  [${idx}]: "${p.substring(0, 35)}"`));
        
        if (parts.length < 5) {
            console.log('❌ Need 5+ parts');
            i++;
            continue;
        }
        
        // Last 4 parts are options
        let optionD = parts[parts.length - 1].trim();
        const optionC = parts[parts.length - 2].trim();
        const optionB = parts[parts.length - 3].trim();
        const optionA = parts[parts.length - 4].trim();
        
        // Add content after answer to option D
        if (contentAfterAnswer) {
            optionD += ' ' + contentAfterAnswer;
        }
        
        // Everything else is question
        const questionText = parts.slice(0, parts.length - 4).join(' ').trim();
        
        if (!questionText) {
            console.log('❌ Empty question');
            i++;
            continue;
        }
        
        questions.push({
            id: Date.now() + questionNumber + Math.random(),
            question: questionText,
            options: {
                A: optionA,
                B: optionB,
                C: optionC,
                D: optionD.trim()
            },
            correctAnswer: correctAnswer,
            userAnswer: null
        });
        
        console.log(`✅ Q${questionNumber}: "${questionText.substring(0, 35)}"`);
        console.log(`   A:"${optionA}" B:"${optionB}" C:"${optionC}" D:"${optionD.substring(0, 20)}"`);
        
        i++;
    }
    
    console.log('\n=== RESULT: ${questions.length} questions ===');
    return questions;
}

// Alternative parsing for when standard pattern doesn't work
function parseTableFormatAlternative(text) {
    console.log('=== TRYING ALTERNATIVE PARSING ===');
    return [];
}


// Parse standard format (Question 1: ... A) ... B) ... Answer: B)
function parseStandardFormat(text) {
    const questions = [];
    
    const questionPattern = /Question\s+(\d+)[:\.]?\s*(.+?)(?=Question\s+\d+|$)/gis;
    const matches = [...text.matchAll(questionPattern)];
    
    console.log('Standard format - Questions matched:', matches.length);
    
    for (const match of matches) {
        const questionNum = match[1];
        const questionBlock = match[2];
        
        // Extract question text (everything before first option)
        const questionTextMatch = questionBlock.match(/^(.+?)(?=[A-D][\)\.\:])/s);
        if (!questionTextMatch) continue;
        
        const questionText = questionTextMatch[1].trim();
        
        // Extract options
        const optionPattern = /([A-D])[\)\.\:\s]+([^A-D\n]+?)(?=[A-D][\)\.\:]|Answer[\s:]+|$)/gis;
        const optionMatches = [...questionBlock.matchAll(optionPattern)];
        
        if (optionMatches.length < 2) continue;
        
        const options = {};
        optionMatches.forEach(opt => {
            const letter = opt[1].toUpperCase();
            let text = opt[2].trim();
            text = text.replace(/\s+/g, ' ').trim();
            options[letter] = text;
        });
        
        // Extract answer
        const answerMatch = questionBlock.match(/(?:Answer|Ans)[\s:]+([A-D])/i);
        if (!answerMatch) continue;
        
        const correctAnswer = answerMatch[1].toUpperCase();
        
        if (!options[correctAnswer]) continue;
        
        questions.push({
            id: Date.now() + parseInt(questionNum) + Math.random(),
            question: questionText,
            options: options,
            correctAnswer: correctAnswer,
            userAnswer: null
        });
    }
    
    console.log('Standard format parsed:', questions.length, 'questions');
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
    
    // Check if extractedMCQSets is available
    if (typeof extractedMCQSets === 'undefined' || !extractedMCQSets || extractedMCQSets.length === 0) {
        questionSetSelect.innerHTML = '<option value="">No question sets available</option>';
        document.getElementById('startPracticeFromSetBtn').disabled = true;
        return;
    }
    
    // Clear loading message
    questionSetSelect.innerHTML = '<option value="">-- Select a question set --</option>';
    
    // Add each question set as an option
    extractedMCQSets.forEach((set, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `BATCH ${set.batchNumber} - ${set.examDate} (${set.questions.length} questions)`;
        questionSetSelect.appendChild(option);
    });
    
    console.log(`✓ Loaded ${extractedMCQSets.length} question set(s)`);
}

// Start practice from selected question set
document.getElementById('startPracticeFromSetBtn').addEventListener('click', () => {
    const questionSetSelect = document.getElementById('questionSetSelect');
    const selectedIndex = questionSetSelect.value;
    
    if (!selectedIndex || selectedIndex === '') {
        showUploadFeedback('Please select a question set first', 'error');
        return;
    }
    
    // Get selected mode
    const selectedMode = document.querySelector('input[name="practiceMode"]:checked').value;
    practiceMode = (selectedMode === 'practice');
    
    const selectedSet = extractedMCQSets[parseInt(selectedIndex)];
    
    // Convert questions to the format expected by the app
    questionBank = selectedSet.questions.map(q => ({
        id: Date.now() + q.id + Math.random(),
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        userAnswer: null
    }));
    
    console.log(`✓ Loaded ${questionBank.length} questions from ${selectedSet.filename}`);
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
