#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MCQ Extraction using OCR (Tesseract)
Properly reads Marathi text from PDFs using image recognition
"""

import sys
import json
import io
import re
from pdf2image import convert_from_path
import pytesseract
from PIL import Image, ImageEnhance

# Force UTF-8 encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def preprocess_image(image):
    """Enhance image for better OCR accuracy"""
    # Convert to grayscale
    image = image.convert('L')
    
    # Increase contrast
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(2.0)
    
    # Increase sharpness
    enhancer = ImageEnhance.Sharpness(image)
    image = enhancer.enhance(2.0)
    
    return image

def extract_with_ocr(pdf_path):
    """Extract text from PDF using OCR"""
    try:
        print(f"Converting PDF to images (300 DPI)...", file=sys.stderr)
        images = convert_from_path(pdf_path, dpi=300)
        
        all_text = ""
        for i, image in enumerate(images, 1):
            print(f"OCR processing page {i}/{len(images)}...", file=sys.stderr)
            
            # Preprocess image
            processed = preprocess_image(image)
            
            # Use Tesseract with Marathi + English
            # PSM 6 = Assume a single uniform block of text
            text = pytesseract.image_to_string(
                processed,
                lang='mar+eng',
                config='--psm 6 --oem 3'
            )
            all_text += text + "\n\n"
        
        return all_text
        
    except Exception as e:
        raise Exception(f"OCR extraction failed: {str(e)}")

def parse_mcq_table(text):
    """Parse OCR text to extract MCQ questions in table format"""
    questions = []
    lines = text.split('\n')
    
    current_q = None
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        # Try to match question number at start of line
        q_match = re.match(r'^(\d+)[\s\.\)]+(.+)', line)
        if q_match:
            q_num = int(q_match.group(1))
            if 1 <= q_num <= 25:
                # Save previous question
                if current_q and current_q['question']:
                    questions.append(current_q)
                
                # Start new question
                current_q = {
                    'id': q_num,
                    'question': q_match.group(2).strip(),
                    'options': {'A': '', 'B': '', 'C': '', 'D': ''},
                    'correctAnswer': None,
                    'userAnswer': None
                }
                continue
        
        # Try to match options (A), (B), (C), (D) or A), B), C), D)
        opt_match = re.match(r'^([A-D])[\)\.]?\s+(.+)', line)
        if opt_match and current_q:
            opt_letter = opt_match.group(1)
            opt_text = opt_match.group(2).strip()
            current_q['options'][opt_letter] = opt_text
            continue
        
        # Try to match answer (Ans: A or Answer: B, etc.)
        ans_match = re.search(r'(?:Ans|Answer|Correct)[\s:]+([A-D])', line, re.IGNORECASE)
        if ans_match and current_q:
            current_q['correctAnswer'] = ans_match.group(1)
            continue
        
        # If we have a current question and this line doesn't match anything,
        # it might be continuation of question text
        if current_q and not opt_match and not ans_match:
            current_q['question'] += ' ' + line
    
    # Add last question
    if current_q and current_q['question']:
        questions.append(current_q)
    
    return questions

def extract_questions_from_pdf_ocr(pdf_path):
    """Main extraction function using OCR"""
    print(f"Starting OCR extraction for: {pdf_path}", file=sys.stderr)
    
    # Extract text using OCR
    ocr_text = extract_with_ocr(pdf_path)
    
    print(f"OCR complete. Parsing questions...", file=sys.stderr)
    
    # Parse the OCR text
    questions = parse_mcq_table(ocr_text)
    
    print(f"Extracted {len(questions)} questions", file=sys.stderr)
    
    return questions

def main():
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'No PDF path provided'}), file=sys.stderr)
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    
    try:
        questions = extract_questions_from_pdf_ocr(pdf_path)
        
        # Output JSON to stdout
        print(json.dumps({
            'success': True,
            'questions': questions,
            'count': len(questions),
            'method': 'OCR'
        }, ensure_ascii=False))
        
    except Exception as e:
        print(json.dumps({
            'success': False,
            'error': str(e)
        }), file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
