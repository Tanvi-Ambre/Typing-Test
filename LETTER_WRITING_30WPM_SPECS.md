# Letter Writing Module - 30 WPM Specifications

## Overview
- **Marks**: 15
- **Type**: Business Letter ONLY (no personal letter/resume)
- **Duration**: Estimated 30 minutes
- **Passing**: Part of Section B (14/35 marks combined)

---

## Marking Scheme (15 Marks Total)

### Typing (7.5 marks):
- 1 mark deducted per error
- 8 or more errors = 0 marks (0/7.5)
- Errors include:
  - Spelling mistakes
  - Missing/omitted words
  - Extra words typed
  - Incomplete typing
  - Wrong punctuation

### Presentation (7.5 marks):

1. **Heading (Company Name & Address)**: 1 mark
   - Company name: Bold, Font Size 24, Center Alignment
   - Company address: Center Alignment
   - Email/Website: Bold, Center Alignment
   - Bottom Border after email/website

2. **Reference No. & Date**: 0.5 mark
   - Ref.No. on left side
   - Date on right side (minimum 4 Tabs)
   - One blank line after

3. **Recipient Address (To:)**: 1 mark
   - "To:" or "प्रति:" at margin
   - Recipient name and address
   - Apply style as specified (Block or Indent)
   - One blank line after address

4. **Subject & Reference**: 0.5 mark
   - Bold the label "Subject:" or "विषय:"
   - Underline the subject content
   - Bold the label "Reference:" or "संदर्भ:" (if present)
   - Underline the reference content
   - One blank line after

5. **Salutation**: 0.5 mark
   - "Dear Sir/Madam" or "महोदय/महोदया" at margin
   - Justified Alignment
   - One blank line after

6. **Paragraph + Style**: 2 marks
   - **Block Style**: All paragraphs start from margin (no tab)
   - **Indent Style**: First line of each paragraph has one Tab
   - Apply Justified Alignment to all paragraphs
   - One blank line between paragraphs
   - Proper paragraph structure

7. **Complementary Close**: 0.5 mark
   - "Yours faithfully" or "आपला विश्वासू"
   - Followed by designation/name
   - **If Left Side**: Keep at margin
   - **If Right Side**: Select text, use Ruler to set Left Indent 3.5, apply Center Alignment
   - Must have 2 blank lines for signature space

8. **Enclosure**: 0.5 mark
   - "Encl:" or "सोबत:" at margin
   - Left alignment

---

## Formatting Rules

### Font Settings:
- **Default font** for everything
- **EXCEPTION**: Company name = Font Size 24, Bold
- **DO NOT** change any other font sizes (marks will be deducted)

### Spacing Rules:
- One space after each sentence
- One space after comma, colon, semicolon
- No space before punctuation
- One blank line between paragraphs (one Enter key)
- Maximum ONE extra space allowed
- Maximum ONE extra Enter allowed
- More than this = errors and marks deducted

### Paragraph Styles:
- **Block Style**: 
  - All text starts from left margin
  - No indentation
  - Used for: To/प्रति address, Subject/विषय, Salutation, Enclosure
  
- **Indent Style**:
  - First line of paragraph starts with one Tab
  - Rest of lines at margin
  - Used for: Paragraph content (if specified)

### Alignment Rules:
- **Company Name & Address**: Center Alignment
- **Reference No.**: Left (at margin)
- **Date**: Right (use Tabs, not alignment)
- **To/प्रति**: As per style specified
- **Subject/विषय**: Bold label, underlined content
- **Paragraphs**: Justified Alignment
- **Complementary Close**: Left or Right (as specified)
- **Enclosure**: Left (at margin)

### Border Rules:
- After company email/website: One Enter, then Bottom Border
- No other borders in letter

---

## Letter Structure Template

```
[Company Name - Bold, Size 24, Center]
[Company Address - Center]
[Email: xxx@xxx.com - Bold, Center]
[Website: www.xxx.com - Bold, Center]
[Bottom Border]

Ref.No.: XXX/2024                                    Date: DD Month YYYY

To:
[Recipient Name]
[Recipient Address Line 1]
[Recipient Address Line 2]

Subject: [Subject text - underlined]

Reference: [Reference text - underlined] (if applicable)

Dear Sir/Madam,

    [First paragraph with indent if Indent Style, or at margin if Block Style]

    [Second paragraph]

    [Third paragraph]

[Closing line like "Thanking you" or "कृपया"]

Yours faithfully,


[Designation]
[Name]

Encl: [Enclosure details]
```

---

## Implementation Approach

### Interface Design:

**Split Screen Layout:**
- **Left Side (40%)**: Reference Letter
  - Shows the letter to be typed
  - Read-only
  - Scrollable
  
- **Right Side (60%)**: Rich Text Editor
  - User types here
  - Formatting toolbar
  - Real-time typing

### Toolbar Features:
- Bold button
- Underline button
- Font size selector (default + 24 for company name)
- Alignment buttons (Left, Center, Right, Justify)
- Border button (for bottom border)
- Tab button (for indentation)

### Validation System:

**Typing Errors (7.5 marks):**
- Compare typed text with reference letter
- Count: spelling errors, missing words, extra words
- Deduct 1 mark per error
- 8+ errors = 0 marks

**Presentation Errors (7.5 marks):**
- Check company name: Bold? Size 24? Centered?
- Check date position: Right side?
- Check subject: Label bold? Content underlined?
- Check paragraphs: Justified? Proper style?
- Check complementary close: Correct position?
- Check enclosure: Present? Left aligned?

### Sample Letters:
Create 10 sample business letters:
1. Leave application
2. Job application
3. Complaint letter
4. Inquiry letter
5. Order letter
6. Quotation request
7. Payment reminder
8. Meeting invitation
9. Resignation letter
10. Recommendation request

---

## Technical Implementation

### Technology Stack:
- **Editor**: Quill.js or TinyMCE (rich text editor)
- **Validation**: JavaScript text comparison
- **Styling**: CSS for split-screen layout
- **Storage**: LocalStorage for practice letters

### Files to Create:
1. `letter-writing.html` - Main interface
2. `letter-script.js` - Logic and validation
3. `letter-style.css` - Styling
4. `letter-data.js` - Sample letters

### Features:
- Timer (optional for practice)
- Auto-save (prevent data loss)
- Submit button
- Results modal with detailed feedback
- Try Again with new letter
- Print/Export option

---

## User Flow

1. **Start Screen**:
   - Instructions
   - "Start Typing" button

2. **Typing Screen**:
   - Left: Reference letter
   - Right: Rich text editor with toolbar
   - Timer (optional)
   - Submit button

3. **Results Screen**:
   - Typing errors: X/7.5 marks
   - Presentation errors: X/7.5 marks
   - Total: X/15 marks
   - Detailed feedback on each error
   - Try Again button

---

## Validation Checklist

### Typing (7.5 marks):
- [ ] Spelling accuracy
- [ ] All words present
- [ ] No extra words
- [ ] Complete typing
- [ ] Correct punctuation

### Presentation (7.5 marks):
- [ ] Company name: Bold, Size 24, Centered
- [ ] Company address: Centered
- [ ] Email/Website: Bold, Centered
- [ ] Bottom border present
- [ ] Ref.No. on left, Date on right
- [ ] One blank line after date
- [ ] To: address formatted correctly
- [ ] Subject label bold, content underlined
- [ ] Salutation present with blank line
- [ ] Paragraphs: Correct style (Block/Indent)
- [ ] Paragraphs: Justified alignment
- [ ] Blank lines between paragraphs
- [ ] Complementary close: Correct position
- [ ] 2 blank lines for signature
- [ ] Enclosure present and left-aligned

---

## Next Steps

1. Create basic HTML structure with split layout
2. Integrate rich text editor (Quill.js)
3. Add formatting toolbar
4. Create 10 sample business letters
5. Implement validation logic
6. Add scoring system
7. Create results display
8. Test with sample letters
9. Refine based on feedback

---

**Ready to start building?**
