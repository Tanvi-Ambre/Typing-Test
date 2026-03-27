# MCQ Practice Mode - User Guide

## Overview
The MCQ Practice Mode allows you to practice multiple-choice questions from previous GCC TBC English exams with two different modes: Practice Mode and Test Mode.

## Features

### 1. Two Learning Modes

#### 📚 Practice Mode (Recommended for Learning)
- **Immediate Feedback**: See if your answer is correct or incorrect right away
- **Learn from Mistakes**: Correct answer is shown immediately when you select wrong option
- **Score Tracking**: Real-time score updates as you progress
- **Answer Locked**: Once you select an answer, you can't change it (encourages careful thinking)
- **Visual Feedback**: Green for correct, red for incorrect answers

#### 📝 Test Mode (Exam Simulation)
- **No Immediate Feedback**: Answers are not revealed during the test
- **Exam-like Experience**: Simulates real exam conditions
- **Results at End**: See all correct/incorrect answers only after submission
- **Score Hidden**: Your score is calculated but not shown until the end
- **Change Answers**: You can change your answers before final submission

### 2. Pre-loaded Question Sets
- Question sets are automatically extracted from PDF files and embedded in the app
- Currently available: **BATCH 1303 - January 2026** (25 questions)
- All Marathi text is correctly displayed with proper encoding

### 3. How to Use

#### Starting Practice/Test:
1. Open `mcq-practice.html` in your browser
2. Select a question set from the dropdown menu
3. Choose your mode:
   - **Practice Mode**: For learning and understanding
   - **Test Mode**: For exam preparation and self-assessment
4. Click "Start" to begin

#### During Practice Mode:
- Read the question carefully
- Click on your answer choice
- Immediate feedback appears:
  - ✓ Green = Correct answer
  - ✗ Red = Incorrect (correct answer shown in green)
- Use Next/Previous buttons to navigate
- Your answer is locked once selected (can't change)

#### During Test Mode:
- Read the question carefully
- Click on your answer choice (no feedback shown)
- You can change your answer by clicking another option
- Use Next/Previous buttons to navigate
- Click "Submit Answers" when finished
- Review all answers with correct/incorrect indicators

### 4. Upload Custom PDFs
- Click the "📄 Upload PDF" button to add more question sets
- Supports PDF files with questions in table format
- Automatically parses questions, options, and correct answers

### 5. Results & Review
- View your score as a percentage
- **Pass/Fail Indicator**: 40% required to pass (10 out of 25 questions)
- See how many questions you got correct
- Review all answers with:
  - Your selected answer
  - Correct answer highlighted
  - Question-by-question breakdown
- Options to retry or upload new questions

## Technical Details

### Files
- `mcq-practice.html` - Main HTML page
- `mcq-script.js` - JavaScript logic for question handling
- `mcq-style.css` - Styling for the interface
- `mcq-data.js` - Pre-extracted question sets (auto-generated)
- `extract-mcq-simple.js` - Node.js script to extract questions from PDFs

### Adding More Question Sets

To add more question sets from PDF files:

1. Place your PDF file in the project directory
2. Run the extraction script:
   ```bash
   node extract-mcq-simple.js
   ```
3. The script will:
   - Extract questions from all PDF files
   - Fix Marathi text encoding
   - Generate updated `mcq-data.js` file
4. Refresh the browser to see new question sets

### Marathi Text Encoding
The extraction script includes a comprehensive character mapping to fix Marathi text encoding issues:
- Converts garbled text like "वररल" to correct "वरील"
- Handles 50+ common character mappings
- Ensures proper display of Marathi questions and options

## Exam Requirements

### MCQ Section Scoring
- Total marks: 25
- Pass marks: 10 (40%)
- Must pass this section AND overall exam at 40%

### Question Format
- 25 multiple-choice questions
- 4 options (A, B, C, D) per question
- Single correct answer per question

## Recommended Study Approach

1. **Start with Practice Mode**
   - Learn the material and understand concepts
   - See immediate feedback on your answers
   - Review correct answers for questions you got wrong

2. **Move to Test Mode**
   - Once comfortable with the material
   - Simulate real exam conditions
   - Test your knowledge without immediate feedback
   - Build exam-taking confidence

3. **Review Your Results**
   - Analyze which questions you got wrong
   - Understand why the correct answer is right
   - Retry until you consistently score above 40%

## Tips for Success

### Practice Mode Tips:
- Don't rush - read each question carefully before selecting
- Once you select an answer, you can't change it (like real exam)
- Learn from incorrect answers - read the correct answer explanation
- Take notes on questions you find difficult

### Test Mode Tips:
- Manage your time - don't spend too long on one question
- You can change answers before submitting
- Review all questions before final submission
- Aim for at least 40% (10 correct answers) to pass
