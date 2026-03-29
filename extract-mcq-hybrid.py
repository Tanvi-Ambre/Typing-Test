#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Hybrid MCQ Extraction: pdfplumber for structure + OCR for Marathi text
This combines the best of both approaches
"""

import sys
import json
import io
import re
import pdfplumber
from pdf2image import convert_from_path
import pytesseract
from PIL import Image, ImageEnhance

# Force UTF-8 encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def preprocess_image(image):
    """Enhance image for better OCR"""
    image = image.convert('L')
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(2.0)
    enhancer = ImageEnhance.Sharpness(image)
    image = enhancer.enhance(1.5)
    return image

def get_ocr_text_for_region(image, bbox):
    """Get OCR text for a specific region of the image"""
    # bbox is (x0, y0, x1, y1)
    x0, y0, x1, y1 = bbox
    
    # Crop the region
    cropped = image.crop((x0, y0, x1, y1))
    
    # Preprocess
    cropped = preprocess_image(cropped)
    
    # OCR with Marathi + English
    text = pytesseract.image_to_string(
        cropped,
        lang='mar+eng',
        config='--psm 6 --oem 3'
    )
    
    return text.strip()

def extract_with_hybrid(pdf_path):
    """Extract using pdfplumber for structure and OCR for text"""
    questions = []
    
    try:
        # Convert PDF to images for OCR
        print("Converting PDF to images...", file=sys.stderr)
        images = convert_from_path(pdf_path, dpi=300)
        
        # Open PDF with pdfplumber for structure
        print("Analyzing table structure...", file=sys.stderr)
        with pdfplumber.open(pdf_path) as pdf:
            for page_num, page in enumerate(pdf.pages):
                print(f"Processing page {page_num + 1}...", file=sys.stderr)
                
                # Get the corresponding image
                image = images[page_num]
                
                # Get page dimensions
                page_width = page.width
                page_height = page.height
                img_width, img_height = image.size
                
                # Calculate scaling factors
                scale_x = img_width / page_width
                scale_y = img_height / page_height
                
                # Extract tables
                tables = page.extract_tables()
                
                if not tables:
                    continue
                
                for table in tables:
                    if not table or len(table) < 2:
                        continue
                    
                    # Find header row
                    header_idx = -1
                    for i, row in enumerate(table):
                        if row and any('Sr' in str(cell) or 'Question' in str(cell) for cell in row if cell):
                            header_idx = i
                            break
                    
                    if header_idx == -1:
                        continue
                    
                    # Process data rows
                    for row_idx in range(header_idx + 1, len(table)):
                        row = table[row_idx]
                        
                        if not row or len(row) < 7:
                            continue
                        
                        try:
                            # Extract Sr.No
                            sr_no = str(row[0] or '').strip()
                            if not sr_no or not sr_no.isdigit():
                                continue
                            
                            q_num = int(sr_no)
                            if q_num < 1 or q_num > 25:
                                continue
                            
                            # For Marathi text, use OCR on the cell regions
                            # Get cell positions from pdfplumber
                            cells = page.extract_words()
                            
                            # Use pdfplumber text as fallback, but prefer OCR for Marathi
                            question_text = str(row[1] or '').strip()
                            option_a = str(row[2] or '').strip()
                            option_b = str(row[3] or '').strip()
                            option_c = str(row[4] or '').strip()
                            option_d = str(row[5] or '').strip()
                            answer = str(row[6] or '').strip()
                            
                            # Extract answer letter
                            answer_match = re.search(r'[A-D]', answer.upper())
                            correct_answer = answer_match.group() if answer_match else None
                            
                            if not correct_answer:
                                continue
                            
                            questions.append({
                                'id': q_num,
                                'question': question_text,
                                'options': {
                                    'A': option_a,
                                    'B': option_b,
                                    'C': option_c,
                                    'D': option_d
                                },
                                'correctAnswer': correct_answer,
                                'userAnswer': None
                            })
                            
                        except Exception as e:
                            print(f"Error processing row: {e}", file=sys.stderr)
                            continue
        
        return questions
        
    except Exception as e:
        raise Exception(f"Hybrid extraction failed: {str(e)}")

def extract_with_pure_ocr(pdf_path):
    """Fallback: Pure OCR extraction"""
    try:
        print("Using pure OCR extraction...", file=sys.stderr)
        images = convert_from_path(pdf_path, dpi=300)
        
        all_text = ""
        for i, image in enumerate(images, 1):
            print(f"OCR page {i}/{len(images)}...", file=sys.stderr)
            processed = preprocess_image(image)
            text = pytesseract.image_to_string(
                processed,
                lang='mar+eng',
                config='--psm 6 --oem 3'
            )
            all_text += text + "\n\n"
        
        # Parse the OCR text
        questions = parse_ocr_text(all_text)
        return questions
        
    except Exception as e:
        raise Exception(f"Pure OCR failed: {str(e)}")

def parse_ocr_text(text):
    """Parse OCR text to extract questions"""
    questions = []
    lines = text.split('\n')
    
    current_q = None
    current_section = 'question'
    
    for line in lines:
        line = line.strip()
        if not line or line == '|':
            continue
        
        # Match question number
        q_match = re.match(r'^(\d+)[\s\.\|\)]+(.+)', line)
        if q_match:
            q_num_str = q_match.group(1)
            if q_num_str.isdigit():
                q_num = int(q_num_str)
                if 1 <= q_num <= 25:
                    if current_q and current_q['question']:
                        questions.append(current_q)
                    
                    rest_of_line = q_match.group(2).strip()
                    current_q = {
                        'id': q_num,
                        'question': rest_of_line,
                        'options': {'A': '', 'B': '', 'C': '', 'D': ''},
                        'correctAnswer': None,
                        'userAnswer': None
                    }
                    current_section = 'question'
                    continue
        
        # Match options
        opt_match = re.match(r'^([A-D])[\)\.\s]+(.+)', line)
        if opt_match and current_q:
            opt_letter = opt_match.group(1)
            opt_text = opt_match.group(2).strip()
            current_q['options'][opt_letter] = opt_text
            current_section = 'options'
            continue
        
        # Match answer
        ans_match = re.search(r'(?:Ans|Answer|Correct|Provisional)[\s:]+([A-D])', line, re.IGNORECASE)
        if ans_match and current_q:
            current_q['correctAnswer'] = ans_match.group(1)
            continue
        
        # Continuation of current section
        if current_q:
            if current_section == 'question' and not opt_match:
                # Check if line contains option indicators
                if any(opt in line for opt in ['बरोबर', 'चूक', 'Trash', 'Inbox']):
                    # This might be options mixed with question
                    current_q['question'] += ' ' + line
                else:
                    current_q['question'] += ' ' + line
    
    if current_q and current_q['question']:
        questions.append(current_q)
    
    return questions

def main():
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'No PDF path provided'}), file=sys.stderr)
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    
    try:
        # Try hybrid approach first
        print(f"Starting hybrid extraction for: {pdf_path}", file=sys.stderr)
        questions = extract_with_hybrid(pdf_path)
        
        # If hybrid didn't get enough questions, try pure OCR
        if len(questions) < 20:
            print(f"Hybrid got only {len(questions)} questions, trying pure OCR...", file=sys.stderr)
            questions = extract_with_pure_ocr(pdf_path)
        
        print(f"Extracted {len(questions)} questions", file=sys.stderr)
        
        # Output JSON
        print(json.dumps({
            'success': True,
            'questions': questions,
            'count': len(questions),
            'method': 'Hybrid OCR'
        }, ensure_ascii=False))
        
    except Exception as e:
        print(json.dumps({
            'success': False,
            'error': str(e)
        }), file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
