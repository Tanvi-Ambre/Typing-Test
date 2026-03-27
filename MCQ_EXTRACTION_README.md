# MCQ Extraction Guide

## Overview
This document explains how to extract MCQ questions from PDF files and make them available in the practice application.

## How It Works

### Pre-loaded Batches (For Repository)
1. PDF files are stored in `exam-materials/mcq-questions/`
2. Run extraction script to generate `mcq-data.js`
3. `mcq-data.js` contains all batches embedded as JavaScript
4. When users open `mcq-practice.html`, all batches appear in dropdown

### Browser Upload (For End Users)
1. Users can upload additional PDF files via the "📄 Upload PDF" button
2. Browser extracts questions using PDF.js
3. Questions are added to localStorage
4. Dropdown updates to show both pre-loaded + uploaded batches

## Extraction Script

### Requirements
```bash
pip3 install pdfplumber
```

### Usage
```bash
python3 extract-mcq-pdfplumber.py
```

### What It Does
1. Scans `exam-materials/mcq-questions/` for PDF files
2. Extracts tables from each PDF using pdfplumber
3. Parses table rows: `[Sr.No, Question, Option A, Option B, Option C, Option D, Answer]`
4. Generates `mcq-data.js` with all batches

### Expected Output
```
🔍 Found 2 PDF file(s)

📄 Processing: BATCH - (1303).pdf
   Pages: 2
   Page 1: Found 1 table(s)
   Table 1: 15 rows, 7 columns
   Extracted 14 questions from this table
   Page 2: Found 1 table(s)
   Table 1: 12 rows, 7 columns
   Extracted 11 questions from this table
   ✅ Total extracted: 25 questions

📄 Processing: BATCH - (1601).pdf
   Pages: 2
   Page 1: Found 1 table(s)
   Table 1: 15 rows, 7 columns
   Extracted 14 questions from this table
   Page 2: Found 1 table(s)
   Table 1: 12 rows, 7 columns
   Extracted 11 questions from this table
   ✅ Total extracted: 25 questions

✅ SUCCESS!
   Generated: mcq-data.js
   Total batches: 2
   - BATCH 1303: 25 questions
   - BATCH 1601: 25 questions

📝 Reload mcq-practice.html to see all batches!
```

## File Structure

### Generated Files
- `mcq-data.js` - Contains all extracted batches (commit to GitHub)

### Source Files
- `extract-mcq-pdfplumber.py` - Extraction script
- `exam-materials/mcq-questions/*.pdf` - Source PDF files

### Application Files
- `mcq-practice.html` - Main application page
- `mcq-script.js` - Application logic
- `mcq-style.css` - Styling

## Data Format

### mcq-data.js Structure
```javascript
const allMCQBatches = {
  "BATCH 1303": [
    {
      id: 1,
      question: "Question text in Marathi",
      options: {
        A: "Option A text",
        B: "Option B text",
        C: "Option C text",
        D: "Option D text"
      },
      correctAnswer: "B",
      userAnswer: null
    },
    // ... 24 more questions
  ],
  "BATCH 1601": [
    // ... 25 questions
  ]
};
```

## Adding New Batches

### Method 1: Pre-load (Recommended for repository)
1. Add PDF file to `exam-materials/mcq-questions/`
2. Run: `python3 extract-mcq-pdfplumber.py`
3. Commit updated `mcq-data.js`
4. Users will see new batch in dropdown

### Method 2: Browser Upload (For end users)
1. Open `mcq-practice.html`
2. Click "📄 Upload PDF"
3. Select PDF file
4. Questions are extracted and added to localStorage
5. New batch appears in dropdown

## PDF Format Requirements

PDFs must have a table structure with these columns:
- Sr.No (1-25)
- Question
- Option A
- Option B
- Option C
- Option D
- Provisional Ans. (A, B, C, or D)

Example:
```
| Sr.No | Question | Option A | Option B | Option C | Option D | Provisional Ans. |
|-------|----------|----------|----------|----------|----------|------------------|
| 1     | Q text   | Opt A    | Opt B    | Opt C    | Opt D    | B                |
```

## Troubleshooting

### No questions extracted
- Check if PDF has proper table structure
- Verify PDF is not scanned image (must be text-based)
- Check console output for specific errors

### Garbled text
- pdfplumber handles Devanagari text properly
- If issues persist, check PDF encoding

### Wrong answers
- Verify "Provisional Ans." column has correct letters (A-D)
- Check if answer column is properly aligned in PDF

## Testing

After extraction:
1. Open `mcq-practice.html` in browser
2. Check dropdown shows all batches
3. Select a batch and verify:
   - All 25 questions load
   - Marathi text displays correctly
   - Options are complete and readable
   - Correct answers are validated properly
4. Test both Practice and Test modes

## Notes

- **No separate files per batch** - All batches in one `mcq-data.js`
- **Scalable** - Works with 2 PDFs or 20+ PDFs
- **Browser upload** - Same parsing logic, stored in localStorage
- **Encoding** - Properly handles Devanagari (Marathi) text
- **Auto-load** - Pre-loaded batches appear automatically in dropdown
