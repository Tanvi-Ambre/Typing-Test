# GCC TBC English Exam - Complete Requirements

## Exam Overview
**Total Marks:** 100  
**Overall Passing Marks:** 40 (40%)

---

## Module Breakdown

### 1. Objective (Multiple Choice Questions)
- **Total Questions:** 25
- **Total Marks:** 25 (1 mark per question)
- **Passing Marks:** 10 (40%)
- **Time Limit:** TBD (to be confirmed)

#### Features Required:
- **Practice Mode:**
  - Upload PDF containing questions, options, and answer keys
  - Extract questions automatically from PDF
  - Display questions one by one or all at once
  - Hide correct answers during practice
  - Allow user to select answers
  - Show results after submission with correct/incorrect marking
  - Display correct answers for review
  
- **Test Mode:**
  - Randomly select 25 questions from uploaded question bank
  - Timer-based test
  - No answer reveal until submission
  - Final score display
  - Review mode showing user's answers vs correct answers

---

### 2. Speed Passage (Typing Test)
- **Total Marks:** 40
- **Passing Marks:** 16 (40%)
- **Duration:** 7 minutes
- **Target Speed:** 30 WPM
- **Maximum Errors:** 14
- **Word Count:** ~210 words

#### Current Status: ✅ IMPLEMENTED
- Real-time and Exam modes
- Word-based error counting
- Timer and statistics display
- Multiple passages with special characters
- Pass/fail criteria

---

### 3. Email Writing
- **Total Marks:** 5
- **Combined Passing Marks:** 14 (40% of Email + Letter + Statement combined)
- **Time Limit:** TBD

#### Features Required:
- Email template/format guidelines
- Text editor for composition
- Word count display
- Format validation
- Sample emails for reference
- Evaluation criteria display

---

### 4. Letter Writing
- **Total Marks:** 15
- **Combined Passing Marks:** 14 (40% of Email + Letter + Statement combined)
- **Time Limit:** TBD

#### Features Required:
- Letter format templates (formal/informal)
- Text editor for composition
- Word count display
- Format validation
- Sample letters for reference
- Evaluation criteria display

---

### 5. Statement Writing
- **Total Marks:** 15
- **Combined Passing Marks:** 14 (40% of Email + Letter + Statement combined)
- **Time Limit:** TBD

#### Features Required:
- Statement format guidelines
- Text editor for composition
- Word count display
- Format validation
- Sample statements for reference
- Evaluation criteria display

---

## Exam Structure Summary

| Section | Components | Total Marks | Passing Marks (40%) | Pass Criteria |
|---------|-----------|-------------|---------------------|---------------|
| **Section 1: Objective** | MCQs (25 questions) | 25 | 10 | Must score ≥10 |
| **Section 2: Speed Passage** | Typing Test | 40 | 16 | Must score ≥16 |
| **Section 3: Writing Tasks** | Email (5) + Letter (15) + Statement (15) | 35 | 14 | Must score ≥14 |
| **TOTAL** | All sections combined | **100** | **40** | Must pass ALL sections |

---

## Critical Passing Criteria

### ⚠️ IMPORTANT: All conditions must be met to pass

1. **Objective Section:** Minimum 10/25 marks (40%)
2. **Speed Passage Section:** Minimum 16/40 marks (40%)
3. **Writing Tasks Section:** Minimum 14/35 marks (40%)
4. **Overall Total:** Minimum 40/100 marks (40%)

### Example Scenarios:

#### ✅ PASS Example:
- Objective: 12/25 (48%) ✓
- Speed Passage: 20/40 (50%) ✓
- Writing Tasks: 16/35 (46%) ✓
- **Total: 48/100 (48%)** - PASS (all sections ≥40%)

#### ✗ FAIL Example 1:
- Objective: 8/25 (32%) ✗ (below 40%)
- Speed Passage: 25/40 (63%) ✓
- Writing Tasks: 20/35 (57%) ✓
- **Total: 53/100 (53%)** - FAIL (Objective section below 40%)

#### ✗ FAIL Example 2:
- Objective: 15/25 (60%) ✓
- Speed Passage: 12/40 (30%) ✗ (below 40%)
- Writing Tasks: 18/35 (51%) ✓
- **Total: 45/100 (45%)** - FAIL (Speed Passage below 40%)

#### ✗ FAIL Example 3:
- Objective: 12/25 (48%) ✓
- Speed Passage: 18/40 (45%) ✓
- Writing Tasks: 10/35 (29%) ✗ (below 40%)
- **Total: 40/100 (40%)** - FAIL (Writing Tasks below 40%)

---

## Implementation Priority

### Phase 1: MCQs (Current Focus)
1. ✅ Create requirements document
2. 🔄 Implement Practice Mode
   - PDF upload interface
   - PDF text extraction
   - Question parsing (questions, options, answers)
   - Question display UI
   - Answer selection
   - Submit and review functionality
3. ⏳ Implement Test Mode
   - Random question selection (25 questions)
   - Timer implementation
   - Score calculation
   - Results display

### Phase 2: Speed Passage
- ✅ Already implemented

### Phase 3: Writing Tasks
- ⏳ Email Writing module
- ⏳ Letter Writing module
- ⏳ Statement Writing module

### Phase 4: Integration
- ⏳ Main dashboard with all modules
- ⏳ Overall score tracking
- ⏳ Progress monitoring
- ⏳ Practice history

---

## Technical Requirements

### MCQ PDF Format Expected:
```
Question 1: What is the capital of France?
A) London
B) Paris
C) Berlin
D) Madrid
Answer: B

Question 2: Which planet is known as the Red Planet?
A) Venus
B) Mars
C) Jupiter
D) Saturn
Answer: B
```

### Data Storage:
- LocalStorage for question bank
- Session storage for current test
- JSON format for questions

### Question Object Structure:
```json
{
  "id": 1,
  "question": "What is the capital of France?",
  "options": {
    "A": "London",
    "B": "Paris",
    "C": "Berlin",
    "D": "Madrid"
  },
  "correctAnswer": "B",
  "userAnswer": null,
  "category": "Geography"
}
```

---

## UI/UX Requirements

### Navigation:
- Home/Dashboard
- MCQ Practice
- MCQ Test
- Speed Passage
- Email Writing
- Letter Writing
- Statement Writing
- Results/History

### Design Consistency:
- Same color scheme across all modules
- Responsive design
- Clear instructions
- Progress indicators
- Timer displays where applicable
- Accessibility compliant

---

## Future Enhancements
- Question categorization by topic
- Difficulty levels
- Performance analytics
- Export results as PDF
- Timed practice sessions
- Bookmarking questions
- Notes/comments on questions
- Mobile app version

---

**Document Version:** 1.0  
**Last Updated:** Current Date  
**Status:** In Development
