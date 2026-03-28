# Server Restart Guide - Fix Marathi Encoding

## What Was Fixed

1. **Added missing imports** to `server.js`:
   - express, multer, fs, path, child_process
   - These were missing, causing the server to not work properly

2. **UTF-8 encoding configured**:
   - Environment variable: `PYTHONIOENCODING=utf-8`
   - Python stdout: UTF-8 wrapper
   - Node.js reading: `data.toString('utf8')`

## How to Restart Server

### Step 1: Stop Current Server
If the server is running, stop it:
- Press `Ctrl+C` in the terminal where server is running
- Or close that terminal window

### Step 2: Start Server with New Changes
```bash
node server.js
```

You should see:
```
🚀 Server running at http://localhost:3001
📝 MCQ Practice: http://localhost:3001/mcq-practice.html
⌨️  Speed Passage: http://localhost:3001/index.html
```

### Step 3: Test MCQ Upload

1. Open: http://localhost:3001/mcq-practice.html
2. Click "📄 Upload PDF" button
3. Select your MCQ PDF file
4. After upload, check the questions

### Step 4: Verify Marathi Text

Look for proper Devanagari characters:
- ✅ **Correct**: बरोबर, चूक, म्हणजे, बाईट, मध्ये
- ❌ **Wrong**: बररबर, चचक, ममणजज, बबईट, मधधज

## If Text is Still Garbled

### Quick Fix
1. Tell me: "Marathi text in BATCH XXXX is still garbled"
2. I'll read the localStorage data
3. I'll correct all Marathi text manually
4. You verify before pushing to GitHub

### Why It Might Still Happen

Some PDFs have special encoding that pdfplumber can't handle:
- Custom embedded fonts
- Non-standard Unicode encoding
- Image-based text (needs OCR)

### Alternative: Manual Correction

If a specific PDF always has issues:
1. Upload it anyway (gets the structure right)
2. Tell me which batch has garbled text
3. I'll fix it in 2-3 minutes
4. Future uploads of similar PDFs will need same fix

## Testing Checklist

After restarting server and uploading a PDF:

- [ ] Server starts without errors
- [ ] Upload completes successfully
- [ ] Questions appear in dropdown
- [ ] Marathi text displays correctly (बरोबर not बररबर)
- [ ] All 25 questions are present
- [ ] Options A, B, C, D are correct
- [ ] Can start practice/test mode

## Current Status

✅ Server code fixed with all imports
✅ UTF-8 encoding configured
✅ Python script has UTF-8 output
✅ BATCH 1601 manually corrected (reference)

## Next Steps

1. Restart the server
2. Upload a test PDF
3. Check if Marathi displays correctly
4. If not, let me know which batch needs correction
