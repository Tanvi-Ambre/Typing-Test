# MCQ Practice Mode - User Guide

## Overview
The MCQ Practice Mode allows you to upload PDF files containing multiple-choice questions and practice them interactively. The system automatically extracts questions, options, and answers from your PDF.

## Features

### ✅ Current Features (Practice Mode)
- **PDF Upload**: Drag and drop or click to upload PDF files
- **Automatic Extraction**: Extracts questions, options, and correct answers
- **Question Bank**: Stores all uploaded questions in browser storage
- **Interactive Practice**: Click to select answers
- **Navigation**: Move between questions easily
- **Score Tracking**: Real-time score display
- **Results Summary**: See your performance percentage
- **Answer Review**: Review all questions with correct answers highlighted
- **Persistent Storage**: Questions saved in browser (LocalStorage)

### 🔄 Coming Soon (Test Mode)
- Random selection of 25 questions
- Timer (countdown)
- Test simulation
- Performance analytics
- Question categories
- Difficulty levels

## How to Use

### Step 1: Upload Questions
1. Open `mcq-practice.html` in your browser
2. Click the upload area or drag and drop a PDF file
3. Wait for the extraction to complete
4. You'll see a confirmation with the number of questions extracted

### Step 2: Start Practice
1. Click "Start Practice" button
2. Questions will be displayed one at a time
3. Click on an option to select your answer
4. Use "Previous" and "Next" buttons to navigate
5. Click "Submit Answers" when done

### Step 3: Review Results
1. See your score percentage
2. Click "Review Answers" to see detailed results
3. Green = Correct, Red = Incorrect
4. See both your answer and the correct answer

### Step 4: Practice Again
- Click "Try Again" to practice the same questions
- Click "Upload New Questions" to add more questions
- Click "Clear All Questions" to start fresh

## PDF Format Requirements

Your PDF must follow this format:

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

### Key Points:
- Start each question with "Question" followed by number
- Use A), B), C), D) for options
- Include "Answer:" followed by the correct letter
- Separate questions with blank lines

See `SAMPLE_MCQ_FORMAT.md` for detailed format guidelines and examples.

## Technical Details

### Storage
- Questions are stored in browser's LocalStorage
- Data persists across sessions
- Maximum storage: ~5-10MB (browser dependent)
- Clear storage using "Clear All Questions" button

### Supported Formats
- PDF files only
- Text-based PDFs (not scanned images)
- Standard question formats (see format guide)

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Requires JavaScript enabled

## Troubleshooting

### Questions not extracted?
- Check PDF format matches the guidelines
- Ensure PDF is text-based, not scanned image
- Try a smaller sample first
- Check browser console for errors

### Options not displaying correctly?
- Verify options use A), B), C), D) format
- Check for special characters
- Ensure proper spacing

### Answers not matching?
- Verify "Answer:" keyword is present
- Check answer letter matches an option
- Ensure no typos in answer key

### Storage full?
- Clear old questions
- Use "Clear All Questions" button
- Browser storage limit reached

## Tips for Best Results

1. **Start Small**: Upload 10-20 questions first to test
2. **Check Format**: Verify PDF follows the format guidelines
3. **Review Extraction**: Check if all questions extracted correctly
4. **Practice Regularly**: Use practice mode frequently
5. **Track Progress**: Note your scores over time

## Keyboard Shortcuts

- **Arrow Keys**: Navigate between questions (coming soon)
- **1-4 Keys**: Select options A-D (coming soon)
- **Enter**: Submit/Next (coming soon)
- **Esc**: Exit review (coming soon)

## Data Privacy

- All data stored locally in your browser
- No data sent to external servers
- Questions remain on your device only
- Clear data anytime using "Clear All Questions"

## Future Enhancements

### Planned Features:
- [ ] Test mode with 25 random questions
- [ ] Timer for timed tests
- [ ] Question categories/tags
- [ ] Difficulty levels
- [ ] Performance analytics
- [ ] Export results as PDF
- [ ] Import/Export question banks
- [ ] Bookmarking questions
- [ ] Notes on questions
- [ ] Search functionality
- [ ] Mobile app version

## Support

For issues or questions:
1. Check `SAMPLE_MCQ_FORMAT.md` for format guidelines
2. Review `EXAM_REQUIREMENTS.md` for exam details
3. Check browser console for error messages
4. Ensure JavaScript is enabled
5. Try a different browser

## Version History

### v1.0.0 (Current)
- Initial release
- PDF upload and extraction
- Practice mode
- Results and review
- LocalStorage persistence

---

**Last Updated:** Current Date  
**Status:** Active Development  
**Module:** MCQ Practice Mode
