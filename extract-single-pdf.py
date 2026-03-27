#!/usr/bin/env python3
"""
Single PDF Extraction Script
Extracts MCQ questions from a single PDF file and outputs JSON
Used by server.js for upload processing
"""

import pdfplumber
import json
import sys
import re

def extract_questions_from_pdf(pdf_path):
    """Extract MCQ questions from PDF using pdfplumber table extraction"""
    questions = []
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page_num, page in enumerate(pdf.pages, 1):
                tables = page.extract_tables()
                
                if not tables:
                    continue
                
                for table in tables:
                    if not table or len(table) < 2:
                        continue
                    
                    parsed = parse_table_rows(table)
                    questions.extend(parsed)
        
        return questions
        
    except Exception as e:
        print(json.dumps({'error': str(e)}), file=sys.stderr)
        sys.exit(1)

def parse_table_rows(table):
    """Parse table rows into question objects"""
    questions = []
    
    for row in table:
        try:
            if not row or len(row) < 7:
                continue
            
            # Skip header rows
            if row[0] and ('Sr.No' in str(row[0]) or 'Sr. No' in str(row[0])):
                continue
            
            # Extract values
            sr_no = str(row[0] or '').strip()
            question = str(row[1] or '').strip()
            option_a = str(row[2] or '').strip()
            option_b = str(row[3] or '').strip()
            option_c = str(row[4] or '').strip()
            option_d = str(row[5] or '').strip()
            answer = str(row[6] or '').strip()
            
            # Validate question number
            if not sr_no or not sr_no.isdigit():
                continue
            
            q_num = int(sr_no)
            if q_num < 1 or q_num > 25:
                continue
            
            # Validate question text
            if not question or len(question) < 3:
                continue
            
            # Extract answer letter
            answer_match = re.search(r'[A-D]', answer.upper())
            if not answer_match:
                continue
            
            correct_answer = answer_match.group()
            
            questions.append({
                'id': q_num,
                'question': question,
                'options': {
                    'A': option_a,
                    'B': option_b,
                    'C': option_c,
                    'D': option_d
                },
                'correctAnswer': correct_answer,
                'userAnswer': None
            })
            
        except Exception:
            continue
    
    return questions

def main():
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'No PDF path provided'}), file=sys.stderr)
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    questions = extract_questions_from_pdf(pdf_path)
    
    # Output JSON to stdout
    print(json.dumps({
        'success': True,
        'questions': questions,
        'count': len(questions)
    }, ensure_ascii=False))

if __name__ == '__main__':
    main()
