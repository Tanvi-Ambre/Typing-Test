# Project Files Overview

## Active Application Files

### Speed Passage Test
- `index.html` - Speed passage typing test (30 WPM, 7 minutes)
- `script.js` - Speed passage logic
- `style.css` - Speed passage styling
- `passages-data.js` - Pre-loaded passages (30 passages)
- `extract-passages.js` - Script to extract passages from .docx files

### MCQ Practice/Test
- `mcq-practice.html` - MCQ practice and test modes
- `mcq-script.js` - MCQ application logic
- `mcq-style.css` - MCQ styling
- `mcq-data.js` - Pre-loaded MCQ batches (generated)
- `extract-mcq-pdfplumber.py` - Script to extract MCQ from PDFs

### Exam Materials
- `exam-materials/speed-passages/*.docx` - 30 speed passage files
- `exam-materials/mcq-questions/*.pdf` - MCQ batch PDF files
- `exam-materials/README.md` - Folder structure documentation

### Documentation
- `README.md` - Main project documentation
- `EXAM_REQUIREMENTS.md` - Exam structure and requirements
- `EXAM_SCORING_GUIDE.md` - Scoring criteria
- `DEPLOYMENT.md` - Deployment instructions
- `IMPLEMENTATION_SUMMARY.md` - Implementation details
- `SPEED_PASSAGE_README.md` - Speed passage documentation
- `MCQ_EXTRACTION_README.md` - MCQ extraction guide
- `MCQ_IMPLEMENTATION_SUMMARY.md` - MCQ implementation details
- `MCQ_TEST_INSTRUCTIONS.md` - Testing instructions

### Configuration
- `package.json` - Node.js dependencies
- `package-lock.json` - Dependency lock file
- `.gitignore` - Git ignore rules

### Other
- `sample-questions.json` - Sample MCQ questions (25 questions)
- `extracted-passages.json` - Extracted passages JSON
- `~$g30 Speed 101.docx` - Temp file (can be deleted)

## Removed Files (Cleanup)

### Old Extraction Scripts
- ❌ `extract-all-mcq-final.js` - Old Node.js extraction (didn't work)
- ❌ `extract-all-mcq.js` - Old extraction attempt
- ❌ `extract-mcq-batch1601.js` - Old batch-specific extraction
- ❌ `extract-mcq-simple.js` - Old simple extraction
- ❌ `extract-mcq-tables.py` - Old Python extraction (camelot)
- ❌ `extract-mcq.js` - Old extraction script
- ❌ `mcq-batch1601.js` - Manually created batch (no longer needed)

### Test Files
- ❌ `test-mcq-regex.js` - Regex testing
- ❌ `test-pdf-node.js` - PDF testing
- ❌ `test-pdf-real.js` - PDF testing
- ❌ `test-simple.js` - Simple testing
- ❌ `test-spacing.js` - Spacing testing
- ❌ `test-pdf-debug.html` - HTML testing

### Old Documentation
- ❌ `MCQ_FINAL_STATUS.md` - Outdated status
- ❌ `MCQ_MODES_COMPARISON.md` - Outdated comparison
- ❌ `MCQ_PARSING_FIX.md` - Outdated fix notes
- ❌ `MCQ_README.md` - Outdated readme
- ❌ `MCQ_SETUP_INSTRUCTIONS.md` - Outdated setup
- ❌ `SAMPLE_MCQ_FORMAT.md` - Outdated format
- ❌ `UPDATE_MCQ_README.md` - Outdated update notes

### Old Data Files
- ❌ `extracted-mcq.json` - Old extracted data (replaced by mcq-data.js)

## File Structure

```
.
├── index.html                          # Speed passage test
├── script.js                           # Speed passage logic
├── style.css                           # Speed passage styling
├── passages-data.js                    # Pre-loaded passages
├── extract-passages.js                 # Passage extraction script
│
├── mcq-practice.html                   # MCQ practice/test
├── mcq-script.js                       # MCQ logic
├── mcq-style.css                       # MCQ styling
├── mcq-data.js                         # Pre-loaded MCQ batches
├── extract-mcq-pdfplumber.py          # MCQ extraction script
│
├── exam-materials/
│   ├── speed-passages/                 # 30 .docx files
│   ├── mcq-questions/                  # PDF files
│   └── README.md
│
├── sample-questions.json               # Sample MCQ data
├── extracted-passages.json             # Extracted passages
│
├── README.md                           # Main docs
├── EXAM_REQUIREMENTS.md
├── EXAM_SCORING_GUIDE.md
├── DEPLOYMENT.md
├── IMPLEMENTATION_SUMMARY.md
├── SPEED_PASSAGE_README.md
├── MCQ_EXTRACTION_README.md
├── MCQ_IMPLEMENTATION_SUMMARY.md
├── MCQ_TEST_INSTRUCTIONS.md
│
├── package.json
├── package-lock.json
└── .gitignore
```

## Current Status

### Working Features
✅ Speed Passage Test (30 WPM, 7 minutes, 14 errors max)
✅ MCQ Practice Mode (immediate feedback)
✅ MCQ Test Mode (results at end)
✅ Pre-loaded passages (30 passages)
✅ Pre-loaded MCQ batches (BATCH 1601)
✅ Passage extraction from .docx files
✅ MCQ extraction from PDF files (pdfplumber)

### Known Issues
⚠️ Browser PDF upload parsing needs fixing (answer detection issue)

### Next Steps
1. Fix browser PDF upload parsing in mcq-script.js
2. Test with both batches (1303 and 1601)
3. Commit working solution
