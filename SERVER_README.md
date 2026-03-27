# Server Setup for MCQ PDF Upload & Speed Passage Upload

## Overview

This application includes a Node.js Express server that handles:
1. **MCQ PDF uploads** - Extracts questions from tabular PDFs using Python's pdfplumber
2. **Speed Passage DOCX uploads** - Extracts passages from .docx files using adm-zip

Both provide reliable, scalable extraction for the exam practice application.

## Architecture

### MCQ Upload Flow
```
Browser → Upload PDF → Node.js Server → Python (pdfplumber) → Extract Tables → JSON → Browser
```

### Speed Passage Upload Flow
```
Browser → Upload DOCX → Node.js Server → adm-zip → Extract Text → Format → JSON → Browser
```

## Prerequisites

1. **Node.js** (v14 or higher)
2. **Python 3** with pdfplumber installed:
   ```bash
   pip3 install pdfplumber
   ```

## Installation

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Verify Python dependencies:
   ```bash
   python3 -c "import pdfplumber; print('pdfplumber installed')"
   ```

## Running the Server

Start the server:
```bash
npm start
```

Or directly:
```bash
node server.js
```

The server will start on http://localhost:8000

## Usage

1. Open http://localhost:8000/mcq-practice.html
2. **Pre-loaded batches**: Select from dropdown (currently BATCH 1601)
3. **Upload new batch**: Click "📄 Upload PDF" and select a PDF file
4. Server extracts questions and returns them to the browser
5. Start practice or test mode

## API Endpoints

### POST /api/upload-mcq-pdf
Upload a PDF file for MCQ extraction

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: PDF file with field name 'pdf'

**Response:**
```json
{
  "success": true,
  "batchName": "BATCH 1303",
  "questions": [...],
  "count": 25
}
```

### POST /api/upload-passage-docx
Upload a DOCX file for speed passage extraction

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: DOCX file with field name 'docx'

**Response:**
```json
{
  "success": true,
  "filename": "Eng30 Speed 101.docx",
  "text": "     Formatted passage text...",
  "wordCount": 177
}
```

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## File Structure

```
├── server.js                    # Express server
├── extract-single-pdf.py        # Python extraction script
├── mcq-script.js                # Client-side JavaScript
├── mcq-practice.html            # MCQ practice page
├── mcq-data.js                  # Pre-loaded questions
├── uploads/                     # Temporary upload directory
└── exam-materials/
    └── mcq-questions/           # Source PDF files
```

## Scalability

This solution is production-ready and can handle:
- 20+ PDF files
- Multiple concurrent uploads
- Large PDF files (up to 10MB)
- Reliable table extraction from complex PDFs

## Error Handling

The server handles:
- Invalid file types (only PDFs allowed)
- Extraction failures (malformed PDFs)
- Missing dependencies (Python/pdfplumber)
- File size limits (10MB max)

## Development

To modify extraction logic:
1. Edit `extract-single-pdf.py` for Python-side changes
2. Edit `server.js` for server-side changes
3. Edit `mcq-script.js` for client-side changes

## Troubleshooting

**Server won't start:**
- Check if port 8000 is available
- Verify Node.js is installed: `node --version`

**Upload fails:**
- Check Python is installed: `python3 --version`
- Verify pdfplumber: `pip3 list | grep pdfplumber`
- Check server logs in terminal

**No questions extracted:**
- Verify PDF has proper table structure
- Check Python script output: `python3 extract-single-pdf.py path/to/file.pdf`
