# MCQ Testing Instructions

## Current Setup

### Pre-loaded Batch (in mcq-data.js)
- ✅ **BATCH 1601** - 25 questions (pre-loaded in dropdown)

### Test Upload Batch (for browser upload testing)
- 📄 **BATCH 1303** - Located at: `exam-materials/mcq-questions/BATCH - (1303).pdf.backup`
- Temporarily renamed to `.backup` so it's not pre-loaded
- Use this file to test browser upload functionality

## Testing Steps

### Step 1: Test Pre-loaded Batch

1. **Start local server:**
   ```bash
   python3 -m http.server 8000
   ```

2. **Open in browser:**
   ```
   http://localhost:8000/mcq-practice.html
   ```

3. **Verify pre-loaded batch:**
   - [ ] Dropdown shows: "BATCH 1601 (25 questions)"
   - [ ] Select "BATCH 1601"
   - [ ] Choose "Practice Mode" or "Test Mode"
   - [ ] Click "Start"
   - [ ] Verify: All 25 questions load
   - [ ] Verify: Marathi text displays correctly
   - [ ] Verify: Options are complete and readable
   - [ ] Test answering questions
   - [ ] Verify: Correct answers are validated properly

### Step 2: Test Browser Upload

1. **Rename the backup file back:**
   ```bash
   mv "exam-materials/mcq-questions/BATCH - (1303).pdf.backup" "exam-materials/mcq-questions/BATCH - (1303).pdf"
   ```

2. **In the browser (mcq-practice.html):**
   - [ ] Click "📄 Upload PDF" button
   - [ ] Select: `exam-materials/mcq-questions/BATCH - (1303).pdf`
   - [ ] Wait for processing message
   - [ ] Verify: Success message appears
   - [ ] Verify: Dropdown now shows TWO batches:
     - "BATCH 1601 (25 questions)" - pre-loaded
     - "BATCH 1303 (25 questions)" - uploaded
   - [ ] Select "BATCH 1303" (the uploaded one)
   - [ ] Click "Start"
   - [ ] Verify: All 25 questions load correctly
   - [ ] Verify: Questions are different from BATCH 1601

### Step 3: Test Both Modes

**Practice Mode:**
- [ ] Select any batch
- [ ] Choose "Practice Mode"
- [ ] Click "Start"
- [ ] Select an answer
- [ ] Verify: Immediate feedback (green/red)
- [ ] Verify: Correct answer shown if wrong
- [ ] Verify: Score updates in real-time
- [ ] Verify: Cannot change answer after selection

**Test Mode:**
- [ ] Select any batch
- [ ] Choose "Test Mode"
- [ ] Click "Start"
- [ ] Select answers for multiple questions
- [ ] Verify: No immediate feedback
- [ ] Verify: Can change answers before submit
- [ ] Verify: Score is hidden
- [ ] Click "📝 Submit Test" (floating button)
- [ ] Verify: Results shown with percentage
- [ ] Verify: Pass/Fail indicator (40% threshold)
- [ ] Click "Review Answers"
- [ ] Verify: All questions shown with correct/incorrect status

## Expected Results

### Pre-loaded Batch (BATCH 1601)
```
✅ Appears in dropdown immediately on page load
✅ No upload needed
✅ 25 questions available
✅ Marathi text displays correctly
✅ All options are complete
```

### Browser Upload (BATCH 1303)
```
✅ Upload button works
✅ PDF is processed in browser
✅ Questions extracted correctly
✅ Added to dropdown dynamically
✅ Stored in localStorage
✅ Persists across page reloads
```

## Troubleshooting

### Dropdown shows "No question sets available"
- Check browser console (F12) for errors
- Verify `mcq-data.js` is loaded
- Check if `allMCQBatches` is defined: Type in console: `allMCQBatches`

### Upload doesn't work
- Check browser console for errors
- Verify PDF is in table format
- Check if PDF.js library is loaded
- Try with BATCH 1303 file (known working format)

### Questions display incorrectly
- Check browser console for parsing errors
- Verify question structure in console: `console.log(questionBank)`
- Check if options are properly separated

## After Testing

### If Everything Works:
1. Regenerate `mcq-data.js` with both batches:
   ```bash
   # Make sure both PDFs are in the folder (remove .backup extension)
   python3 extract-mcq-pdfplumber.py
   ```

2. Commit the working solution:
   ```bash
   git add extract-mcq-pdfplumber.py mcq-data.js mcq-script.js mcq-practice.html
   git commit -m "Implement MCQ extraction with pdfplumber"
   ```

### If Issues Found:
- Note the specific error messages
- Check browser console for details
- Report back with screenshots/error logs

## Quick Test Checklist

- [ ] Pre-loaded batch appears in dropdown
- [ ] Can select and start practice with pre-loaded batch
- [ ] Can upload PDF via browser
- [ ] Uploaded batch appears in dropdown
- [ ] Can practice with uploaded batch
- [ ] Practice mode shows immediate feedback
- [ ] Test mode hides feedback until submit
- [ ] Results show correct score and pass/fail
- [ ] Review shows all questions with answers
- [ ] Marathi text displays correctly in all scenarios

## Current File Status

```
exam-materials/mcq-questions/
├── BATCH - (1601).pdf          ← Active (pre-loaded)
└── BATCH - (1303).pdf.backup   ← Backup (for upload testing)
```

**Note:** After testing, rename `.backup` back to `.pdf` and regenerate `mcq-data.js` to include both batches.
