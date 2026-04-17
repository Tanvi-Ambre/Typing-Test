#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MCQ Extraction - Hybrid Cell Approach
Uses pdfplumber for structure (Sr.No, Answer), OCR for text (Question, Options)
"""

import sys
import json
import io
import re
from pdf2image import convert_from_path
import pytesseract
from PIL import Image, ImageEnhance
import pdfplumber

# Force UTF-8 encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def preprocess_image(image):
    """Enhance image for better OCR"""
    image = image.convert('L')
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(2.5)
    enhancer = ImageEnhance.Sharpness(image)
    image = enhancer.enhance(2.0)
    return image

def ocr_cell(image, bbox, dpi=300):
    """OCR a specific cell region from the image"""
    try:
        x0, top, x1, bottom = bbox
        scale = dpi / 72.0
        
        px0 = int(x0 * scale)
        py0 = int(top * scale)
        px1 = int(x1 * scale)
        py1 = int(bottom * scale)
        
        cell_img = image.crop((px0, py0, px1, py1))
        cell_img = preprocess_image(cell_img)
        
        text = pytesseract.image_to_string(
            cell_img,
            lang='mar+eng',
            config='--psm 6 --oem 3'
        )
        
        return text.strip()
    except Exception as e:
        return ""

def extract_questions(pdf_path):
    """Extract questions using hybrid approach"""
    questions = []
    
    try:
        print(f"Starting extraction: {pdf_path}", file=sys.stderr)
        
        # Convert PDF to images
        print("Converting PDF to images (300 DPI)...", file=sys.stderr)
        images = convert_from_path(pdf_path, dpi=300)
        
        # Open PDF with pdfplumber
        with pdfplumber.open(pdf_path) as pdf:
            for page_num, page in enumerate(pdf.pages):
                print(f"Processing page {page_num + 1}/{len(pdf.pages)}...", file=sys.stderr)
                
                if page_num >= len(images):
                    continue
                image = images[page_num]
                
                # Extract table with pdfplumber (for structure)
                tables = page.extract_tables()
                if not tables:
                    continue
                
                for table in tables:
                    for row in table:
                        if not row or len(row) < 7:
                            continue
                        
                        # Get Sr.No and Answer from pdfplumber (reliable)
                        sr_no = str(row[0] or '').strip()
                        if not sr_no.isdigit():
                            continue
                        
                        q_num = int(sr_no)
                        if not (1 <= q_num <= 25):
                            continue
                        
                        # Skip duplicates
                        if any(q['id'] == q_num for q in questions):
                            continue
                        
                        # Get answer from pdfplumber
                        answer_cell = str(row[6] or '').strip()
                        answer_match = re.search(r'[A-D]', answer_cell.upper())
                        answer = answer_match.group() if answer_match else None
                        
                        # Now get cell bounding boxes for OCR
                        # Find the table in find_tables() to get cell coordinates
                        found_tables = page.find_tables()
                        if not found_tables:
                            continue
                        
                        # Use the first table
                        table_obj = found_tables[0]
                        cells = table_obj.cells
                        
                        # Find cells for this row
                        # Group cells by y-coordinate to find matching row
                        row_cells = []
                        for cell in cells:
                            x0, y0, x1, y1 = cell
                            # Check if this cell could be in our row
                            # We need to match based on content or position
                            # For now, collect all cells and sort by y
                            row_cells.append(cell)
                        
                        # Sort by y position
                        row_cells.sort(key=lambda c: c[1])
                        
                        # Group into rows
                        rows_by_y = {}
                        for cell in row_cells:
                            x0, y0, x1, y1 = cell
                            row_key = round(y0 * 2) / 2
                            if row_key not in rows_by_y:
                                rows_by_y[row_key] = []
                            rows_by_y[row_key].append(cell)
                        
                        # Find the row that matches our question number
                        # OCR the first cell of each row to find matching Sr.No
                        target_row_cells = None
                        for row_y, cells_in_row in sorted(rows_by_y.items()):
                            cells_in_row.sort(key=lambda c: c[0])
                            if len(cells_in_row) >= 7:
                                # OCR first cell to check Sr.No
                                first_cell_text = ocr_cell(image, cells_in_row[0], dpi=300)
                                if str(q_num) in first_cell_text:
                                    target_row_cells = cells_in_row
                                    break
                        
                        if not target_row_cells or len(target_row_cells) < 7:
                            # Fallback: use pdfplumber text
                            print(f"  ⚠ Q{q_num}: Using pdfplumber text (no cell match)", file=sys.stderr)
                            questions.append({
                                'id': q_num,
                                'question': str(row[1] or '').strip(),
                                'options': {
                                    'A': str(row[2] or '').strip(),
                                    'B': str(row[3] or '').strip(),
                                    'C': str(row[4] or '').strip(),
                                    'D': str(row[5] or '').strip()
                                },
                                'correctAnswer': answer,
                                'userAnswer': None
                            })
                            continue
                        
                        # OCR columns 1-5 (Question and Options)
                        question_text = ocr_cell(image, target_row_cells[1], dpi=300)
                        opt_a = ocr_cell(image, target_row_cells[2], dpi=300)
                        opt_b = ocr_cell(image, target_row_cells[3], dpi=300)
                        opt_c = ocr_cell(image, target_row_cells[4], dpi=300)
                        opt_d = ocr_cell(image, target_row_cells[5], dpi=300)
                        
                        questions.append({
                            'id': q_num,
                            'question': question_text,
                            'options': {
                                'A': opt_a,
                                'B': opt_b,
                                'C': opt_c,
                                'D': opt_d
                            },
                            'correctAnswer': answer,
                            'userAnswer': None
                        })
                        
                        print(f"  ✓ Q{q_num}: {question_text[:40]}... [Ans: {answer}]", file=sys.stderr)
        
        # Sort by question ID
        questions.sort(key=lambda q: q['id'])
        
        print(f"Extracted {len(questions)} questions", file=sys.stderr)
        return questions
        
    except Exception as e:
        import traceback
        traceback.print_exc(file=sys.stderr)
        raise Exception(f"Extraction failed: {str(e)}")

def main():
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'No PDF path provided'}), file=sys.stderr)
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    
    try:
        questions = extract_questions(pdf_path)
        
        print(json.dumps({
            'success': True,
            'questions': questions,
            'count': len(questions),
            'method': 'Hybrid (pdfplumber structure + cell OCR)'
        }, ensure_ascii=False))
        
    except Exception as e:
        print(json.dumps({
            'success': False,
            'error': str(e)
        }), file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
