#!/usr/bin/env python3
"""
MCQ Extraction Script using pdfplumber
Extracts MCQ questions from PDF tables and generates mcq-data.js
"""

import pdfplumber
import json
import os
import glob
import re
from datetime import datetime

def extract_questions_from_pdf(pdf_path):
    """Extract MCQ questions from PDF using pdfplumber table extraction"""
    print(f"\n📄 Processing: {os.path.basename(pdf_path)}")
    
    questions = []
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            print(f"   Pages: {len(pdf.pages)}")
            
            for page_num, page in enumerate(pdf.pages, 1):
                # Extract tables from page
                tables = page.extract_tables()
                
                if not tables:
                    print(f"   Page {page_num}: No tables found")
                    continue
                
                print(f"   Page {page_num}: Found {len(tables)} table(s)")
                
                for table_idx, table in enumerate(tables, 1):
                    if not table or len(table) < 2:
                        continue
                    
                    print(f"   Table {table_idx}: {len(table)} rows, {len(table[0]) if table else 0} columns")
                    
                    # Parse table rows
                    parsed = parse_table_rows(table)
                    questions.extend(parsed)
                    print(f"   Extracted {len(parsed)} questions from this table")
        
        print(f"   ✅ Total extracted: {len(questions)} questions")
        return questions
        
    except Exception as e:
        print(f"   ❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return []

def parse_table_rows(table):
    """Parse table rows into question objects"""
    questions = []
    
    # Expected columns: Sr.No | Question | Option A | Option B | Option C | Option D | Provisional Ans.
    
    for row_idx, row in enumerate(table):
        try:
            # Skip if row doesn't have enough columns
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
            
            # Extract answer letter (A, B, C, or D)
            answer_match = re.search(r'[A-D]', answer.upper())
            if not answer_match:
                print(f"   ⚠ Q{q_num}: No valid answer found (got: '{answer}')")
                continue
            
            correct_answer = answer_match.group()
            
            # Create question object
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
            
        except Exception as e:
            print(f"   ⚠ Error parsing row {row_idx}: {e}")
            continue
    
    return questions

def main():
    """Main extraction function"""
    mcq_dir = './exam-materials/mcq-questions'
    
    if not os.path.exists(mcq_dir):
        print(f"❌ Directory not found: {mcq_dir}")
        return
    
    # Find all PDF files
    pdf_files = sorted(glob.glob(os.path.join(mcq_dir, '*.pdf')))
    
    # ONLY process BATCH 1601 for pre-loading (keep 1303 for browser upload testing)
    pdf_files = [f for f in pdf_files if '1601' in f]
    
    if not pdf_files:
        print(f"❌ No PDF files found in {mcq_dir}")
        return
    
    print(f"\n🔍 Found {len(pdf_files)} PDF file(s)")
    
    all_batches = {}
    
    # Process each PDF
    for pdf_path in pdf_files:
        questions = extract_questions_from_pdf(pdf_path)
        
        if questions:
            # Extract batch name from filename
            filename = os.path.basename(pdf_path)
            batch_match = re.search(r'BATCH\s*-?\s*\((\d+)\)', filename, re.IGNORECASE)
            
            if batch_match:
                batch_name = f"BATCH {batch_match.group(1)}"
            else:
                batch_name = filename.replace('.pdf', '')
            
            all_batches[batch_name] = questions
    
    if not all_batches:
        print("\n❌ No questions extracted from any PDF")
        return
    
    # Generate mcq-data.js
    timestamp = datetime.now().isoformat()
    
    js_content = f"""// MCQ Questions - Auto-generated from PDFs
// Generated: {timestamp}
// Total batches: {len(all_batches)}

const allMCQBatches = {json.dumps(all_batches, indent=2, ensure_ascii=False)};

// Auto-load into localStorage when page loads
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {{
    try {{
        const existingSets = JSON.parse(localStorage.getItem('mcqQuestionSets') || '[]');
        
        Object.keys(allMCQBatches).forEach(batchName => {{
            const exists = existingSets.some(set => set.name === batchName);
            
            if (!exists) {{
                const questions = allMCQBatches[batchName].map((q, index) => ({{
                    ...q,
                    id: Date.now() + index + Math.random()
                }}));
                
                existingSets.push({{
                    name: batchName,
                    questions: questions,
                    uploadDate: new Date().toISOString()
                }});
                
                console.log(`✓ Loaded ${{batchName}} (${{questions.length}} questions)`);
            }}
        }});
        
        localStorage.setItem('mcqQuestionSets', JSON.stringify(existingSets));
        console.log(`✓ Total batches: ${{Object.keys(allMCQBatches).length}}`);
    }} catch (e) {{
        console.error('Error loading MCQ batches:', e);
    }}
}}
"""
    
    # Write to file
    with open('mcq-data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    # Print summary
    print(f"\n✅ SUCCESS!")
    print(f"   Generated: mcq-data.js")
    print(f"   Total batches: {len(all_batches)}")
    for batch_name, questions in all_batches.items():
        print(f"   - {batch_name}: {len(questions)} questions")
    print(f"\n📝 Reload mcq-practice.html to see all batches!\n")

if __name__ == '__main__':
    main()
