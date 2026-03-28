# MCQ Upload Handling - Marathi Text Encoding

## What Was Fixed

### Problem
When uploading MCQ PDFs containing Marathi (Devanagari) text, the characters were getting corrupted during extraction, showing garbled text like "बबईट ममणजज" instead of "बाईट म्हणजे".

### Root Cause
The encoding was not properly specified when:
1. Python script outputs JSON to stdout
2. Node.js server reads the Python script output

### Solution Implemented

#### 1. Python Script (`extract-single-pdf.py`)
```python
# Added UTF-8 encoding declaration
# -*- coding: utf-8 -*-

# Force UTF-8 for stdout
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Already had ensure_ascii=False in json.dumps()
```

#### 2. Node.js Server (`server.js`)
```javascript
// Set environment variable for Python
process.env.PYTHONIOENCODING = 'utf-8';

// Explicitly specify UTF-8 when reading Python output
python.stdout.on('data', (data) => {
    stdout += data.toString('utf8');  // Changed from toString()
});
```

## How It Works Now

When you upload a new MCQ PDF:

1. **Upload**: Browser sends PDF to `/api/upload-mcq-pdf`
2. **Extract**: Server calls `extract-single-pdf.py` with UTF-8 encoding
3. **Parse**: Python extracts questions using pdfplumber
4. **Output**: Python outputs JSON with `ensure_ascii=False` and UTF-8 encoding
5. **Receive**: Node.js reads output as UTF-8
6. **Store**: Browser saves to localStorage with proper Unicode
7. **Display**: MCQ interface shows correct Devanagari characters

## Testing

After uploading a new PDF:
1. Open MCQ Practice page
2. Select the newly uploaded batch
3. Check if Marathi text displays correctly:
   - ✅ बरोबर (Correct)
   - ✅ चूक (Wrong)
   - ✅ म्हणजे (means)
   - ❌ बररबर (garbled)
   - ❌ चचक (garbled)

## If Text is Still Garbled

### Immediate Fix
Tell me: "The Marathi text in BATCH XXXX is garbled"
- I'll read the uploaded data
- Correct all Marathi text manually
- You verify before pushing to GitHub

### Why It Might Still Happen
1. **PDF Font Encoding**: Some PDFs use custom font encodings that pdfplumber can't decode properly
2. **Embedded Fonts**: PDFs with embedded fonts may not extract correctly
3. **Image-based Text**: If the PDF has text as images, OCR would be needed

### Alternative Solutions
If encoding fixes don't work for a specific PDF:
1. **Re-save PDF**: Open in Adobe Acrobat, save with "Optimize for accessibility"
2. **Different Tool**: Try a different PDF extraction library
3. **Manual Entry**: For small batches, manually type questions
4. **OCR**: Use Tesseract OCR with Marathi language pack

## Files Modified

1. `server.js` - Added UTF-8 encoding for Python process
2. `extract-single-pdf.py` - Added UTF-8 stdout wrapper
3. `mcq-data.js` - Manually corrected BATCH 1601 (25 questions)

## Current Status

✅ BATCH 1601 - All 25 questions corrected with proper Marathi text
✅ Server configured for UTF-8 encoding
✅ Python script configured for UTF-8 output
✅ Future uploads should work correctly

## Maintenance

If you encounter garbled text in future uploads:
1. Check `MCQ_MARATHI_FIX_GUIDE.md` for troubleshooting
2. Ask me to correct the specific batch
3. Consider the PDF source quality
