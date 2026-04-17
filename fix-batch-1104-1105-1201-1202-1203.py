#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix Marathi text in MCQ Batches 1104, 1105, 1201, 1202, 1203
Applies systematic corrections to OCR errors
"""

import json
import re

# Common Marathi OCR corrections
CORRECTIONS = {
    # Common patterns
    'मधयध': 'मध्ये',
    'मधधध': 'मध्ये',
    'मधठल': 'मधील',
    'मधहल': 'मधील',
    'ममणजध': 'म्हणजे',
    'ममणतयत': 'म्हणतात',
    'ममणतलत': 'म्हणतात',
    'बररबर': 'बरोबर',
    'बरहबर': 'बरोबर',
    'बरयबर': 'बरोबर',
    'बरतबर': 'बरोबर',
    'चचक': 'चूक',
    'चबक': 'चूक',
    'पकयरचध': 'पेजचे',
    'करणधलस': 'करण्यास',
    'करणधलसलठव': 'करण्यासाठी',
    'करणयचसचठठ': 'करण्यासाठी',
    'वलपरतलत': 'वापरतात',
    'वचपरतचत': 'वापरतात',
    'वलपरलल': 'वापरला',
    'वचपर': 'वापर',
    'उपलबध': 'उपलब्ध',
    'उपलबब': 'उपलब्ध',
    'उपलबध': 'उपलब्ध',
    'उपधतग': 'उपयोग',
    'उपयरग': 'उपयोग',
    'असतयत': 'असतात',
    'असतर': 'असतो',
    'आमतध': 'आहेत',
    'आम.ध': 'आहे',
    'आम ध': 'आहे',
    'ददलध': 'दिला',
    'ददसत': 'दिसते',
    'ददसतलत': 'दिसतात',
    'दलखवलल': 'दाखवला',
    'दचखवतध': 'दाखवतो',
    'दलखवतत': 'दाखवतो',
    'जलतत': 'जातो',
    'जलतध': 'जाते',
    'जयतयत': 'जातात',
    'जयतर': 'जातो',
    'कधलल': 'केला',
    'कधलधलध': 'केलेला',
    'कधलधलच': 'केलेले',
    'कधलधलयच': 'केलेल्या',
    'करतकत': 'करतात',
    'करततत': 'करतात',
    'शकतय': 'शकतो',
    'शकतध': 'शकते',
    'ममळतध': 'मिळतो',
    'ममळवतय': 'मिळवतो',
    'चमळत.क': 'मिळते',
    'सलपडत': 'सापडते',
    'सचठठ': 'साठी',
    'सयठह': 'साठी',
    'लललमणधलसलठव': 'लिहिण्यासाठी',
    'नववन': 'नवीन',
    'नलमव': 'नाही',
    'नचवठ': 'नाही',
    'नचव': 'नाव',
    'नलव': 'नाव',
    'ततमवठ': 'तुम्ही',
    'ततममललल': 'तुमचाला',
    'तयचर': 'टेबल',
    'कयणतयच': 'कोणत्या',
    'कयणतठ': 'कोणत्या',
    'कयणतध': 'कोणता',
    'ककणतध': 'कोणता',
    'खचलठलपपकक': 'खालीलपैकी',
    'धतपपकक': 'यापैकी',
    'धलपपकक': 'यापैकी',
    'ययपपकक': 'यापैकी',
    'यचपपकक': 'यापैकी',
    'सवर': 'सर्व',
    'सरर': 'सर्व',
    'पवचयलच': 'पाहायला',
    'पचवणयचसचठठ': 'पाहण्यासाठी',
    'ररर': 'वर्ड',
    'वरर': 'वर्ड',
    'करणतधक': 'कोणत्या',
    'मलरजन': 'मार्जिन',
    'पकपर': 'पेपर',
    'नलहह': 'नाही',
    'ससखयलसचह': 'संख्यांची',
    'बकरहज': 'बेरीज',
    'हहत.क': 'होते',
    'पकलर': 'प्रकार',
    'चयल': 'च्या',
    'चठ': 'ची',
    'चच': 'चा',
    'चध': 'चे',
    'वच': 'वा',
    'वठ': 'वी',
    'यच': 'या',
    'यठ': 'यी',
    'तठ': 'ती',
    'तच': 'ता',
    'नध': 'ना',
    'लध': 'ला',
    'सअबधच': 'संबंधी',
    'अवललबबन': 'अवलंबून',
    'कश्यासाठी': 'कशासाठी',
    'जधववच': 'जेव्हा',
    'ककमपधमटरचध': 'कॉम्प्युटरचे',
    'कफममधकनर': 'कॉम्प्युटर',
    'जजवमय': 'जेव्हा',
    'मदतठनध': 'मदतीने',
    'मदतह': 'मदत',
    'रयपरतयत': 'वापरतात',
    'रयपरलध': 'वापरला',
    'रकपर': 'वापर',
    'रकतकत': 'शकतात',
    'दररहरलध': 'दिसतात',
    'दकतर': 'किती',
    'पधरत': 'पर्यंत',
    'कमरत': 'कमीत',
    'झचम': 'झूम',
    'कमलमड': 'कमांड',
    'गतप': 'ग्रुप',
    'आलण': 'आणि',
    'आहण': 'आणि',
    'दरनमर': 'दोन्ही',
    'रररल': 'वरील',
    'पपकक': 'पैकी',
    'एकमर': 'एकही',
    'नकमर': 'नाही',
    'कक': 'की',
    'तध': 'ते',
    'मठ': 'मी',
    'मह': 'मे',
    'वर': 'वर',
    'परत': 'पुन्हा',
    'कसच': 'कसे',
    'जधववच': 'जेव्हा',
    'पकचरचत': 'पॅटर्नमध्ये',
    'मधठल': 'मधील',
    'सअबधच': 'संबंधी'
}

def correct_marathi_text(text):
    """Apply corrections to Marathi text"""
    if not text or not isinstance(text, str):
        return text
    
    corrected = text
    for wrong, right in CORRECTIONS.items():
        corrected = corrected.replace(wrong, right)
    
    return corrected

def correct_batch(batch_data):
    """Correct all questions in a batch"""
    corrected = []
    for q in batch_data:
        corrected_q = {
            "id": q["id"],
            "question": correct_marathi_text(q["question"]),
            "options": {},
            "correctAnswer": q["correctAnswer"],
            "userAnswer": q.get("userAnswer")
        }
        
        # Correct options
        for key, value in q["options"].items():
            corrected_q["options"][key] = correct_marathi_text(value)
        
        # Clean up option values - replace garbled text with proper values
        for key in corrected_q["options"]:
            val = corrected_q["options"][key]
            if val in ["x", "शा", "शं", "पन", "पन्ना", "पग,", "पिना.", "|", "क", "w=", "7.", "हा", "712", "का", "rs"]:
                corrected_q["options"][key] = "चूक" if key == "B" and corrected_q["correctAnswer"] != "B" else ""
        
        corrected.append(corrected_q)
    
    return corrected

# Read extracted batches
with open('mcq-batches-1101-1105.json', 'r', encoding='utf-8') as f:
    data1 = json.load(f)

with open('mcq-batches-1201-1205.json', 'r', encoding='utf-8') as f:
    data2 = json.load(f)

# Correct batches
output = {
    "BATCH 1104": correct_batch(data1["BATCH 1104"]),
    "BATCH 1105": correct_batch(data1["BATCH 1105"]),
    "BATCH 1201": correct_batch(data2["BATCH 1201"]),
    "BATCH 1202": correct_batch(data2["BATCH 1202"]),
    "BATCH 1203": correct_batch(data2["BATCH 1203"])
}

# Save corrected batches
with open('mcq-batch-1104-1105-1201-1202-1203-corrected.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("✅ Batches 1104, 1105, 1201, 1202, 1203 corrected")
for batch_name, batch_data in output.items():
    print(f"   {batch_name}: {len(batch_data)} questions")
print(f"\n📊 Total: {sum(len(b) for b in output.values())} questions corrected")
