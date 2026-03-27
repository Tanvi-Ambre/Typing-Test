# Email Writing Module

## Overview
The Email Writing module tests the user's ability to compose an email exactly as shown in a reference example. This is part of the GCC TBC English Exam practice system.

## Features

### Split-Screen Interface
- **Left Panel**: Reference email showing the correct format
- **Right Panel**: User input fields for composing the email

### Email Fields (5 marks total)
1. **Mail To** (1 mark) - Email address field
2. **Subject** (1 mark) - Subject line
3. **Body** (1 mark) - Email body (3 lines)
4. **Attachment** (1 mark) - Dropdown selection
5. **Send Button** (1 mark) - Clicking send

### Scoring System
- **Total Marks**: 5
- **Passing Marks**: 2.5
- **Marking Scheme**: 1 mark per field (exact match required)

### Validation
- Exact string matching for all fields
- Case-sensitive comparison
- Whitespace-sensitive for body text
- Real-time visual feedback (optional)

### Results Display
Shows:
- Individual field results (✓ Correct / ✗ Incorrect)
- Marks obtained for each field
- Total marks: X / 5
- Pass/Fail status
- Areas to improve (if failed)

## Reference Email Example

```
Mail To: manager@company.com
Subject: Request for Leave
Body: Dear Sir,
I am writing to request leave from 15th to 20th January for personal reasons.
I will ensure all pending work is completed before my leave.
Attachment: Leave_Application.pdf
```

## User Interface

### Input Fields
- Text input for Mail To
- Text input for Subject
- Textarea for Body (5 rows)
- Dropdown for Attachment selection

### Buttons
- **Send Email**: Validates and shows results
- **Reset**: Clears all fields
- **Try Again**: Resets form after viewing results

### Visual Feedback
- Green border/background for correct fields
- Red border/background for incorrect fields
- Status indicators (✓/✗) next to each field

## Technical Implementation

### Files
- `email-writing.html` - Main HTML structure
- `email-style.css` - Email-specific styles
- `email-script.js` - Validation and scoring logic

### Key Functions
- `validateField(fieldName)` - Validates individual field
- `calculateMarks()` - Calculates marks for all fields
- `sendEmail()` - Processes submission and shows results
- `showResults(results)` - Displays results modal
- `resetForm()` - Clears all inputs

### Validation Logic
```javascript
// Exact match required
userValue === referenceValue ? 1 mark : 0 marks
```

## Usage

1. **View Reference**: Read the reference email on the left
2. **Type Email**: Enter exact values in right panel fields
3. **Select Attachment**: Choose correct file from dropdown
4. **Send**: Click "Send Email" button
5. **View Results**: See marks obtained and pass/fail status
6. **Try Again**: Reset and practice again if needed

## Responsive Design
- Desktop: Side-by-side panels
- Tablet: Stacked panels with scrolling
- Mobile: Full-width stacked layout

## Integration
- Integrated with sidebar navigation
- Consistent styling with other modules
- Accessible from main menu

## Future Enhancements
- Multiple email templates
- Real-time validation feedback
- Spell-check suggestions
- Time limit option
- Practice history tracking
