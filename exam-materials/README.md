# Exam Materials

This folder contains the source exam materials used by the application.

## Folder Structure

### 📁 speed-passages/
Contains all speed passage .docx files from previous exams.
- Files: `Eng30 Speed 101.docx` through `Eng30 Speed 605.docx`
- Total: 30 passages
- Word count: 158-196 words per passage
- Used for: 30 WPM typing test (7 minutes)

### 📁 mcq-questions/
Contains all MCQ question PDFs from previous exams.
- Files: `BATCH - (1303).pdf`, etc.
- Format: PDF with questions in table format
- Questions: 25 MCQs per batch
- Used for: MCQ Practice and Test modes

## Usage

These files are processed by extraction scripts:
- `extract-passages.js` - Extracts passages from .docx files
- `extract-mcq-simple.js` - Extracts MCQ questions from PDFs

The extracted data is embedded in:
- `passages-data.js` - For speed passages
- `mcq-data.js` - For MCQ questions

## Adding New Materials

### To add new speed passages:
1. Place .docx files in `exam-materials/speed-passages/`
2. Run: `node extract-passages.js`
3. New passages will be added to `passages-data.js`

### To add new MCQ questions:
1. Place PDF files in `exam-materials/mcq-questions/`
2. Run: `node extract-mcq-simple.js`
3. New questions will be added to `mcq-data.js`

## Note

This folder is git-ignored to keep the repository size small. The extracted data files (`passages-data.js` and `mcq-data.js`) are committed instead, so the app works without these source files.
