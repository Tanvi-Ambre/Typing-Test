# GCC TBC 30 WPM English Typing Exam - Complete Guide

## 📋 Exam Overview
- **Total Marks**: 100
- **Overall Passing**: 40 marks (40%)
- **Total Time**: ~82 minutes

---

## 📚 Complete Exam Structure

| # | Section | Marks | Time | Passing (40%) | Status |
|---|---------|-------|------|---------------|--------|
| 1 | MCQ | 25 | TBD | 10 | ✅ Done |
| 2 | Speed Passage | 40 | 7 min | 16 | ✅ Done |
| 3 | Email Writing | 5 | 5 min | - | ✅ Done |
| 4 | Letter Writing | 15 | 30 min | - | ❌ Missing |
| 5 | Statement Typing | 15 | 20 min | - | ❌ Missing |
| | **Writing Total** | **35** | **55 min** | **14** | Partial |
| | **GRAND TOTAL** | **100** | **~82 min** | **40** | Partial |

### ⚠️ CRITICAL PASSING RULE
Must achieve ALL of the following:
- MCQ: ≥10/25 (40%)
- Speed Passage: ≥16/40 (40%)
- Writing Combined (Email+Letter+Statement): ≥14/35 (40%)
- Overall Total: ≥40/100 (40%)

---

## 1️⃣ MCQ - Multiple Choice Questions

**Marks**: 25 | **Passing**: 10 | **Status**: ✅ DONE

- 25 questions, 1 mark each
- Must score minimum 10 marks (40%)
- Practice mode implemented with PDF upload
- Question bank storage working

---

## 2️⃣ SPEED PASSAGE - Typing Test

**Marks**: 40 | **Time**: 7 min | **Passing**: 16 | **Status**: ✅ MOSTLY DONE

### Current Implementation:
✅ 7-minute timer
✅ Word-based error counting
✅ Real-time and Exam modes
✅ Pass/fail with statistics

### Missing Features:
❌ 3-minute trial passage (practice before actual test)
❌ 30-second countdown before test starts

### Requirements:
- Target: 30 WPM (~210 words in 7 minutes)
- Maximum 14 errors allowed (15+ = FAIL)
- 1 mark deducted per error
- One Tab at paragraph start
- Word Wrap enabled (no Enter mid-paragraph)

---

## 3️⃣ EMAIL WRITING

**Marks**: 5 | **Time**: 5 min | **Status**: ✅ MOSTLY DONE

### Current Implementation:
✅ Mail To field (0.5 marks)
✅ Subject field (0.5 marks)
✅ Body field (1 mark)
✅ Attachment selection (1 mark)
✅ Send button (1 mark)
✅ 5-minute timer
✅ Random email templates

### Missing Features:
❌ CC field (0.5 marks)
❌ BCC field (0.5 marks)

### Marking Breakdown:
- To: 0.5 marks
- CC: 0.5 marks ← MISSING
- BCC: 0.5 marks ← MISSING
- Subject: 0.5 marks
- Body: 1 mark
- Attachments (2 files): 1 mark
- Send Button: 1 mark
- **Total: 5 marks**

---

## 4️⃣ LETTER WRITING

**Marks**: 15 | **Time**: 30 min | **Status**: ❌ NOT IMPLEMENTED

### Requirements (30 WPM - Simpler than 40 WPM):

#### Typing (7.5 marks):
- 1 mark deducted per error
- 8+ errors = 0 marks
- Errors: spelling, missing/extra words, incomplete typing

#### Presentation (7.5 marks):
- Proper letter format
- Correct spacing and alignment
- Paragraph formatting
- Salutation and closing
- Date and address placement

### What to Build:
- Letter typing interface
- Template/format guidelines
- Error checking system
- Formatting validation
- Sample letters for practice

**Note**: 30 WPM likely does NOT require Mail Merge (that's for 40 WPM)

---

## 5️⃣ STATEMENT TYPING

**Marks**: 15 | **Time**: 20 min | **Status**: ❌ NOT IMPLEMENTED

### Requirements:

#### Typing (7.5 marks):
- 1 mark deducted per error
- 8+ errors = 0 marks
- Errors: spelling, missing/extra words, wrong numbers, incomplete

#### Presentation (7.5 marks):
1. Heading (Bold, Underline, Merge & Center): 2 marks
2. Column Headings (Bold, Center): 2 marks
3. Cell alignment: 1 mark
4. Column width: 1 mark
5. Borders: 1 mark
6. Vertical Middle alignment: 0.5 mark

### Statement Format:
- Table-based data (like Excel)
- Main heading: Bold, Underline, Merged across table
- Column headings: Bold, Centered
- Serial numbers with Auto Fill
- Numbers with thousand separators (1,510.00)
- Proper borders and alignment

### Formatting Process:
1. Type all content first
2. Then apply formatting
3. Adjust column widths
4. Apply borders
5. Set alignments
6. Set row height to 25

### What to Build:
- Table/spreadsheet interface
- Formatting toolbar (Bold, Underline, Merge, Borders)
- Alignment tools
- Number formatting with commas
- Sample statements for practice

---

## 🎯 IMPLEMENTATION ROADMAP

### Phase 1: Quick Fixes (Priority: HIGH)
1. **Speed Passage Updates**:
   - Add 3-minute trial passage screen
   - Add 30-second countdown timer
   - Test flow: Trial → Countdown → Actual Test

2. **Email Writing Updates**:
   - Add CC field
   - Add BCC field
   - Update marking to match 5 marks exactly

### Phase 2: Letter Writing (Priority: HIGH)
1. Create letter typing interface
2. Add letter format templates
3. Implement error checking
4. Add sample letters
5. Implement marking system

### Phase 3: Statement Typing (Priority: MEDIUM)
1. Create table/grid interface
2. Add formatting toolbar
3. Implement cell editing
4. Add border and alignment tools
5. Implement number formatting
6. Add sample statements
7. Implement marking system

### Phase 4: Integration (Priority: LOW)
1. Main dashboard with all 5 modules
2. Overall score tracking
3. Progress monitoring
4. Combined results display

---

## 📝 GENERAL EXAM RULES

### Screen Layout:
- Left: Question/Reference
- Right: Answer area (where you type)

### Allowed:
✅ UNDO button (available in toolbar)
✅ Correcting mistakes
✅ Reviewing work if time permits

### NOT Allowed:
❌ Keyboard shortcuts
❌ More than 1 extra space
❌ More than 1 extra Enter
❌ Changing font settings (except where specified)

### Spacing Rules:
- 1 space after sentence
- 1 space after comma/colon/semicolon
- NO space before punctuation
- 1 blank line between paragraphs

---

## 🎓 SUCCESS TIPS

1. **MCQ**: Read carefully, minimum 40% required
2. **Speed**: Keep pace at 30 WPM, max 14 errors
3. **Email**: Type EXACTLY as shown, check all fields
4. **Letter**: Follow format, proper spacing
5. **Statement**: Accurate numbers, proper formatting
6. **Time**: Don't spend too long on one section
7. **Proofread**: Review if time permits
8. **Stay Calm**: Use UNDO to fix mistakes

---

## 📊 WHAT WE HAVE vs WHAT WE NEED

### ✅ Completed Modules:
- MCQ Practice (25 marks)
- Speed Passage (40 marks) - needs trial + countdown
- Email Writing (5 marks) - needs CC/BCC

### ❌ Missing Modules:
- Letter Writing (15 marks) - COMPLETE MODULE
- Statement Typing (15 marks) - COMPLETE MODULE

### 🔧 Updates Needed:
- Speed: Add trial passage + countdown
- Email: Add CC and BCC fields

---

**Next Action**: Should we:
1. Fix Speed Passage (add trial + countdown)?
2. Fix Email Writing (add CC/BCC)?
3. Build Letter Writing module?
4. Build Statement Typing module?

Let me know which one to tackle first!
