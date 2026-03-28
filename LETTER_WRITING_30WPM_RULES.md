# Letter Writing 30 WPM - Official Rules (from GCC PDF Pages 3-6)

## Overview
- **Marks**: 15 (7.5 Typing + 7.5 Presentation)
- **Time**: 30 minutes
- **Type**: Business Letter ONLY

---

## Marking Scheme

### Typing (7.5 marks):
- **0.5 marks deducted per error**
- **15 or more errors = 0 marks** (0/7.5)
- Errors include:
  - Spelling mistakes
  - Missing/omitted words
  - Extra words typed
  - Incomplete typing

### Presentation (7.5 marks):

1. **Heading** (Company Name & Address): **1 mark**
2. **Reference No. & Date**: **0.5 mark**
3. **Address of Recipient**: **1 mark**
4. **Subject & Reference**: **1 mark**
5. **Salutation**: **0.5 mark**
6. **Paragraph**: **2 marks**
7. **Sign your name**: **1 mark**
8. **Enclosure (attachments)**: **0.5 mark**

---

## Detailed Formatting Rules

### 1. Company Name & Address (1 mark)
- Type company name
- **DO NOT add space after company name**
- Apply: **Bold, Underline, Center Alignment**
- Select company name and address together (using mouse or keyboard)
- Apply **Center Alignment** to selection
- **Note**: Extra space will be selected - this is from Enter key, not Space Bar
- **One blank line** after company name/address (before Ref.No.)

### 2. Reference No. & Date (0.5 mark)
- Reference number: Type at **Left Margin**
- After typing Ref.No., **do NOT add space**
- Press **Tab Key minimum 4 times** to move date to right
- Type date
- **One blank line** after date (before To:)

### 3. Recipient Address - To: (1 mark)
- Type "To:" or "प्रति:"
- Type recipient address
- **One blank line** after address (before Subject)
- **DO NOT add extra Enter after To:**

### 4. Subject & Reference (1 mark)
- After typing Subject/विषय, **do NOT add space**, press **Enter key**
- Subject/विषय - Press **Tab Key twice** to move forward
- Select "Subject" using mouse or keyboard
- Apply **Font Bold**
- Similarly for Reference/संदर्भ - Press **Tab Key twice**
- Select "Reference" and apply **Font Bold**
- **DO NOT add space after last character**
- **One blank line** after Subject/Reference (before Salutation)

### 5. Salutation (0.5 mark)
- "Dear Sir" or "महोदय/महोदया" at **Left Margin**
- **Only ONE Enter** after salutation
- **NO blank line** between Dear Sir and Paragraph

### 6. Paragraphs (2 marks)
- Press **Tab Key once** at start of each paragraph
- **Only ONE Enter** after each paragraph
- **NO blank line** between paragraphs
- Select from paragraph start to "Thanking you/धन्यवाद"
- Apply **Justified Alignment**
- **Only ONE Enter** after Thanking you
- **NO blank line** after Thanking you

### 7. Sign Your Name (1 mark)
- "Yours faithfully" or "आपला विश्वासू"
- **TWO Blank Line Spaces** before designation (for signature)
- Select from "Yours Faithfully" to "Designation"
- Use **Ruler** to set **Left Indent**
  - Click on Left Indent square in Ruler
  - Drag to position (e.g., 3.5 as shown in question)
  - Indent will move forward as per question
- Apply **Center Alignment** to selection
- **DO NOT add extra Enter** after

**How to set 3.5 Indent using Ruler:**
[Ruler diagram would be shown in exam]

### 8. Enclosure (0.5 mark)
- "Encl:" or "सोबत:" at **Left Margin**
- **Left alignment**
- **DO NOT add space or Enter after last character**

---

## Important Rules

### Spacing:
- **NO space** after company name before formatting
- **NO space** after Ref.No. before Tab
- **NO space** after Subject/Reference before Enter
- **NO space** after last character in each section
- **ONE blank line** = ONE Enter key
- **NO blank lines** between paragraphs
- **NO blank line** after Dear Sir
- **NO blank line** after Thanking you
- **TWO blank lines** for signature space

### Formatting Order:
1. **Type complete letter first**
2. **Then apply formatting**
3. Add Enter keys where needed
4. Apply Bold, Underline, Center, Justified as specified

### Selection:
- Use mouse OR keyboard to select text
- When selecting with Enter key, extra space will be selected (this is normal)
- Space Bar does NOT create selection space

### Corrections:
- Students can correct mistakes while typing
- Use available editing tools

---

## Sample Letter (Page 6 - Marathi)

**Translation:**

```
Rajat Stationers Industries
Gurudeo Road, Mumbai 400063

Ref.No.: Rajat/27/2016                    Date: 10 August 2016

To:
Messrs Pankaj Stationers Mart,
18, Bhavani Shankar Road,
Santacruz, Mumbai 400005

Subject: Regarding Order of Goods and Advance Payment

Reference: Our Ref.No. Rajat/514 dated 22/06/2010 letter

Dear Sir,

    We received your order number 220, dated 5 August 2016. Regarding this, you must have received our above reference letter.
    
    We request you that upon receiving this letter, please confirm your order and send an advance payment of Rs. 25,000/-, so that we can prepare the goods as per order and deliver complete supply to you within 1 month.

Thanking you,

Yours faithfully,


Proprietor

Encl: None
```

---

## Key Differences from 40 WPM

### 30 WPM (Simpler):
- NO Mail Merge
- Single recipient address
- Simpler formatting
- 0.5 marks per error (vs 1 mark in 40 WPM)
- 15 errors = fail (vs 8 errors in 40 WPM)

### 40 WPM (Complex):
- Mail Merge with 2 recipients
- More complex formatting
- Font size changes (24 for company name)
- Bottom borders
- More strict error counting

---

## Implementation Notes

For our Letter Writing module, we need to:

1. ✅ Use rich text editor (Quill.js)
2. ✅ 30-minute timer
3. ✅ Split screen (reference left, editor right)
4. ❌ Update sample letter to match exact format
5. ❌ Implement exact validation rules:
   - 0.5 marks per error
   - 15+ errors = 0/7.5
   - Check all 8 presentation criteria
6. ❌ Add Ruler tool for Left Indent setting
7. ❌ Ensure proper spacing validation
8. ❌ Create multiple sample letters in correct format

---

**Next Steps:**
1. Update sample letter to match official format
2. Implement detailed validation
3. Add Ruler functionality for indent
4. Test with actual exam-style letters
