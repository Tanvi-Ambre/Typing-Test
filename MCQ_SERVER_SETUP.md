# MCQ PDF Upload - Server Setup Complete ✅

## What Changed

The application now uses **server-side PDF extraction** for reliable, scalable MCQ question extraction from tabular PDFs.

## Why Server-Side?

Browser-based PDF.js cannot preserve table structure when extracting text. Server-side extraction using Python's `pdfplumber` library maintains the tabular format and extracts questions accurately.

## Current Setup

### Pre-loaded Batches
- **BATCH 1601**: 25 questions (pre-loaded in `mcq-data.js`)

### Available for Upload
- **BATCH 1303**: 25 questions (test browser upload)
- Any additional PDF files you add to `exam-materials/mcq-questions/`

## How to Use

### 1. Start the Server

```bash
npm start
```

Server runs on: **http://localhost:3001**

### 2. Open MCQ Practice

Navigate to: **http://localhost:3001/mcq-practice.html**

### 3. Use Pre-loaded Batch

1. Select "BATCH 1601" from dropdown
2. Choose Practice or Test mode
3. Click "Start"

### 4. Upload New Batch

1. Click "📄 Upload PDF" button
2. Select BATCH 1303 (or any other PDF)
3. Server extracts questions automatically
4. Questions appear in question bank
5. Click "Start Practice" to begin

## Technical Details

### Server Architecture

```
Client (Browser)
    ↓ Upload PDF via FormData
Express Server (Node.js)
    ↓ Save to uploads/ directory
    ↓ Call Python script
Python Script (pdfplumber)
    ↓ Extract table data
    ↓ Parse questions, options, answers
    ↓ Return JSON
Express Server
    ↓ Send JSON response
Client
    ↓ Display questions
```

### Files

- `server.js` - Express server with upload endpoint
- `extract-single-pdf.py` - Python extraction script
- `mcq-script.js` - Client-side JavaScript (updated for server upload)
- `mcq-data.js` - Pre-loaded questions (BATCH 1601 only)

### API Endpoint

**POST /api/upload-mcq-pdf**

Request:
- Content-Type: multipart/form-data
- Field: 'pdf' (PDF file)

Response:
```json
{
  "success": true,
  "batchName": "BATCH 1303",
  "questions": [...],
  "count": 25
}
```

## Scalability

This solution handles:
- ✅ 20+ PDF files
- ✅ Multiple concurrent uploads
- ✅ Complex tabular PDFs
- ✅ Marathi text (Unicode)
- ✅ Files up to 10MB

## Testing

### Test Pre-loaded Batch
1. Open http://localhost:3001/mcq-practice.html
2. Select "BATCH 1601" from dropdown
3. Verify 25 questions load correctly

### Test Upload
1. Click "📄 Upload PDF"
2. Select `exam-materials/mcq-questions/BATCH - (1303).pdf`
3. Wait for "Successfully loaded 25 questions" message
4. Verify questions appear in question bank

### Test via Command Line
```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Test upload endpoint
curl -X POST -F "pdf=@exam-materials/mcq-questions/BATCH - (1303).pdf" \
  http://localhost:3001/api/upload-mcq-pdf
```

## Console Logs

The application now shows minimal, useful logs:

**Pre-loaded batches:**
```
✓ Total batches: 1
✓ Loaded 1 pre-loaded batch(es)
```

**Upload process:**
```
📤 Uploading BATCH - (1303).pdf to server...
✅ Server extracted 25 questions from BATCH 1303
```

## Adding More Batches

### To Pre-load More Batches

1. Add PDF files to `exam-materials/mcq-questions/`
2. Edit `extract-mcq-pdfplumber.py`:
   ```python
   # Change this line to include more batches
   pdf_files = [f for f in pdf_files if '1601' in f or '1303' in f]
   ```
3. Run: `python3 extract-mcq-pdfplumber.py`
4. Restart server

### To Allow Upload of More Batches

Just add PDF files to `exam-materials/mcq-questions/` - they'll be available for upload automatically!

## Troubleshooting

**Port already in use:**
```bash
# Change PORT in server.js (line 7)
const PORT = 3001; // Change to 3002, 3003, etc.
```

**Python not found:**
```bash
# Install Python 3
# macOS: brew install python3
# Verify: python3 --version
```

**pdfplumber not installed:**
```bash
pip3 install pdfplumber
```

**Upload fails:**
- Check server logs in terminal
- Verify PDF is in correct format (tabular structure)
- Test extraction manually: `python3 extract-single-pdf.py path/to/file.pdf`

## Next Steps

1. ✅ Server running on port 3001
2. ✅ BATCH 1601 pre-loaded
3. ✅ BATCH 1303 ready for upload testing
4. 🎯 Test the upload feature in browser
5. 🎯 Add more PDF files as needed
