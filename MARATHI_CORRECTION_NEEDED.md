# Marathi Text Correction - Manual Verification Needed

## The Problem

The PDF extraction tool (pdfplumber) **cannot correctly read Marathi text** from these PDFs because:

1. **Font Encoding Issues**: The PDFs use embedded fonts with custom encoding
2. **Devanagari Matras**: Vowel signs (matras) are being replaced with consonants
3. **Character Mapping**: The font maps characters differently than Unicode standard

## Current Status

We have applied **50+ correction patterns**, but there are still many garbled words because:
- Each PDF may have different font encoding
- New garbled patterns appear in different batches
- Automated correction cannot cover all cases

## The Real Solution

### Option 1: OCR (Optical Character Recognition) - RECOMMENDED
Use Tesseract OCR with Marathi language support to read text as images:

**Requirements:**
```bash
# Install Tesseract with Marathi support
brew install tesseract tesseract-lang  # macOS
# or
sudo apt-get install tesseract-ocr tesseract-ocr-mar  # Linux

# Install Python packages
pip3 install pytesseract pdf2image pillow
```

**Pros:**
- Reads actual visual text, not font encoding
- Works with any PDF regardless of font
- Properly recognizes Marathi characters

**Cons:**
- Slower than text extraction
- Requires additional software installation
- May have OCR errors that need correction

### Option 2: Manual Correction (Current Approach)
Continue adding correction patterns as we find garbled text:

**Process:**
1. You identify garbled text in browser
2. Tell me the garbled text and correct text
3. I add pattern to marathi-corrections.js
4. Re-extract all batches
5. Repeat for each new garbled pattern

**Pros:**
- No additional software needed
- Fast extraction once patterns are added
- Corrections are permanent

**Cons:**
- Time-consuming to find all patterns
- Need to manually verify each question
- May miss some patterns

### Option 3: Re-create PDFs with Proper Fonts
If you have the source files, re-export PDFs with standard Unicode fonts:

**Steps:**
1. Open original documents
2. Change font to standard Unicode font (like Noto Sans Devanagari)
3. Export as PDF
4. Re-extract questions

**Pros:**
- Fixes the root cause
- Clean extraction without corrections needed

**Cons:**
- Requires access to source files
- Time to re-create all PDFs

## What I Need From You

To fix the remaining garbled text, I need you to:

### For Each Garbled Question:

1. **Take a screenshot** or **copy the garbled text**
2. **Tell me the correct Marathi text**
3. **Specify which batch** (e.g., BATCH 1201)

### Example:

```
Garbled: "नस invented कॅलाच जातोचत"
Correct: "ने invented केलाच जातोचत"  (or whatever it should be)
Batch: BATCH 1201
Question: 1
```

## Current Garbled Patterns Found

From your screenshots, I can see these need fixing:

1. **Question 1 (your first screenshot)**:
   - Garbled: "पपटर चचच Output लच ____________ असस ससबबध ससबबधलतस जचत.स"
   - Needs: Correct Marathi text

2. **Question 2 (your second screenshot)**:
   - Garbled: "मचगचहल slide लच जणणयचससठठ _______ key press करयचह"
   - Partially fixed: "मागील slide ला जाण्यासाठी _______ key press करावे"
   - Status: ✅ FIXED

3. **Question 1 (your third screenshot)**:
   - Garbled: "PDF file format ____________ नस invented कॅलाच जातोचत"
   - Needs: Correct Marathi text

## Immediate Action Required

Please provide the correct Marathi text for these questions:

### Question Format:
```
Batch: BATCH XXXX
Question Number: X
Garbled Text: [paste garbled text]
Correct Text: [type correct Marathi text]
```

## Alternative: Provide One Clean PDF

If you have **one PDF with correct Marathi text**, I can:
1. Extract it successfully
2. Use it as a reference
3. Apply the same patterns to other batches

## My Recommendation

**Best approach for your situation:**

1. **Short term**: Tell me the correct text for the most common questions (top 10-20 patterns)
2. **Long term**: Consider using OCR or re-creating PDFs with proper fonts

I apologize for the frustration. The PDF font encoding issue is a technical limitation of the extraction tool, not something I can fix automatically without knowing what the correct Marathi text should be.

**I'm ready to fix any garbled text you identify - just tell me what it should say!**
