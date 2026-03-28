# MCQ Marathi Text Correction Guide

## Problem
When uploading MCQ PDFs with Marathi text, the Devanagari characters may appear garbled due to encoding issues during PDF extraction.

## Solution Applied

### 1. Server-Side Encoding Fix (DONE)
The server has been updated to properly handle UTF-8 encoding:
- `server.js`: Added `PYTHONIOENCODING=utf-8` environment variable
- `server.js`: Changed `data.toString()` to `data.toString('utf8')`
- `extract-single-pdf.py`: Added UTF-8 encoding declaration and forced UTF-8 stdout

### 2. Testing the Fix
After uploading a new MCQ PDF:
1. Open `mcq-practice.html` in browser
2. Check if Marathi text displays correctly
3. Look for proper Devanagari characters like: बरोबर, चूक, म्हणजे, etc.

### 3. If Text is Still Garbled

If you still see garbled text like "बबईट", "ममणजज", "चचक" instead of proper Marathi:

**Option A: Manual Correction in Browser**
1. Open browser console (F12)
2. Run this to see current questions:
```javascript
const sets = JSON.parse(localStorage.getItem('mcqQuestionSets'));
console.log(sets);
```
3. You'll need to manually edit `mcq-data.js` or ask me to correct specific questions

**Option B: Ask for Correction**
Simply tell me:
- "The Marathi text in BATCH XXXX is garbled"
- I'll read the file and correct all Marathi text
- You can verify the corrections before pushing to GitHub

## Common Marathi Words Reference

For quick verification, here are common words that should appear correctly:

| Correct | Garbled (old) |
|---------|---------------|
| बरोबर | बररबर |
| चूक | चचक |
| म्हणजे | ममणजज |
| बाईट | बबईट |
| बिट | बबट |
| मध्ये | मधधज |
| साठी | सबठब |
| करण्यासाठी | करणधबसबठब |
| वापर | वबपर |
| माहिती | मबणमतब |
| यापैकी नाही | धबपपकक नबमब |
| वरीलपैकी एकही नाही | वरबलपपकक एकमब नबमब |

## Prevention

The encoding fixes should prevent future issues, but if problems persist:
1. Check the source PDF - it may have embedded fonts or non-standard encoding
2. Try re-saving the PDF with proper Unicode encoding
3. Use a different PDF extraction tool if pdfplumber can't handle the specific PDF format

## Quick Test Command

To test if a newly uploaded batch has correct Marathi:
```bash
# Check the localStorage in browser console
localStorage.getItem('mcqQuestionSets')
```

Look for proper Devanagari Unicode characters (U+0900 to U+097F range).
