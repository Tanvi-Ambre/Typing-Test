#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix Marathi text in MCQ Batches 1102 and 1103
Manually corrected for perfect Marathi spelling
"""

import json

# Read the original extracted data
with open('mcq-batches-1101-1105.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Corrected Batch 1102
batch_1102_corrected = [
    {
        "id": 1,
        "question": "MS Excel 2019 मध्ये bar\nchart करता येतो.",
        "options": {"A": "बरोबर", "B": "चूक", "C": "", "D": ""},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 2,
        "question": "MS Excel 2019 मध्ये\n\"bubble chart\" हा एक chart\nचा प्रकार आहे.",
        "options": {"A": "बरोबर", "B": "चूक", "C": "", "D": ""},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 3,
        "question": "MS Excel 2019 मध्ये\n\"doughnut chart\" हा प्रकारचा\nchart बनवता येतो.",
        "options": {"A": "बरोबर", "B": "चूक", "C": "", "D": ""},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 4,
        "question": "MS Excel 2019 मध्ये\n\"Radar chart\" हा एक\nप्रकारचा chart आहे.",
        "options": {"A": "बरोबर", "B": "चूक", "C": "", "D": ""},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 5,
        "question": "कॉम्प्युटरचे IPO Cycle म्हणजे\nInput-Process-Output",
        "options": {
            "A": "Input-Process-Output",
            "B": "Input-Output-Process",
            "C": "A आणि B दोन्ही",
            "D": "वरील पैकी एकही नाही"
        },
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 6,
        "question": "एमएस वर्ड मध्ये, कोणत्या\nRibbon मध्ये चार्ट काढता येतो.",
        "options": {"A": "View", "B": "Reference", "C": "Insert", "D": "Page Layout"},
        "correctAnswer": "C",
        "userAnswer": None
    },
    {
        "id": 7,
        "question": "एमएस वर्ड मध्ये, कोणत्या\nRibbon मध्ये दिसते असते,\nकोण-कोणते fonts उपलब्ध\nआहेत की ते आपण वापर\nशकतात.",
        "options": {"A": "View", "B": "Page Layout", "C": "Reference", "D": "Home"},
        "correctAnswer": "D",
        "userAnswer": None
    },
    {
        "id": 8,
        "question": "MS-Word मध्ये Page\nnumbers कोणत्या View मध्ये\nदिसतात जातात.",
        "options": {"A": "Normal", "B": "Web Layout", "C": "Print Layout", "D": "Home"},
        "correctAnswer": "C",
        "userAnswer": None
    },
    {
        "id": 9,
        "question": "MS-Word 2019 मध्ये किती\nchange case options आहेत",
        "options": {"A": "2", "B": "3", "C": "4", "D": "5"},
        "correctAnswer": "D",
        "userAnswer": None
    },
    {
        "id": 10,
        "question": "MS-Word 2019 मध्ये, आपण\nDocument मध्ये 10% ते\n500% पर्यंत\nZoom करू शकतो.",
        "options": {"A": "100", "B": "200", "C": "300", "D": "500"},
        "correctAnswer": "D",
        "userAnswer": None
    },
    {
        "id": 11,
        "question": "MS Excel 2019 मध्ये bar\nchart करता येतो.",
        "options": {"A": "बरोबर", "B": "चूक", "C": "", "D": ""},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 12,
        "question": "MS Excel 2019 मध्ये\n\"bubble chart\" हा एक chart\nचा प्रकार आहे.",
        "options": {"A": "बरोबर", "B": "चूक", "C": "", "D": ""},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 13,
        "question": "MS Excel 2019 मध्ये\n\"doughnut chart\" हा प्रकारचा\nchart बनवता येतो.",
        "options": {"A": "बरोबर", "B": "चूक", "C": "", "D": ""},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 14,
        "question": "MS Excel 2019 मध्ये\n\"Radar chart\" हा एक\nप्रकारचा chart आहे.",
        "options": {"A": "बरोबर", "B": "चूक", "C": "", "D": ""},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 15,
        "question": "Excel मध्ये cells चे\nalignment करण्यासाठी\nHome-->Alignment करतात.",
        "options": {
            "A": "View-->Alignment",
            "B": "Home-->Alignment",
            "C": "Home--> align",
            "D": "यापैकी नाही"
        },
        "correctAnswer": "B",
        "userAnswer": None
    },
    {
        "id": 16,
        "question": "Powerpoint मध्ये कमीत कमी\nकिती % झूम उपलब्ध आहे.",
        "options": {"A": "5", "B": "10", "C": "100", "D": "300"},
        "correctAnswer": "B",
        "userAnswer": None
    },
    {
        "id": 17,
        "question": "Powerpoint मध्ये कमीत कमी\n10% झूम उपलब्ध आहे.",
        "options": {"A": "बरोबर", "B": "चूक", "C": "", "D": ""},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 18,
        "question": "MS-PowerPoint हे कोणत्या\nप्रकार चे\nsoftware आहे.",
        "options": {
            "A": "Word Processor",
            "B": "Spreadsheet",
            "C": "Presentation maker",
            "D": "Image editor"
        },
        "correctAnswer": "C",
        "userAnswer": None
    },
    {
        "id": 19,
        "question": "MS-PowerPoint हे कशासाठी\nसाठी वापरले\nजाते.",
        "options": {"A": "Teaching", "B": "Marketing", "C": "Animation", "D": "यापैकी सर्व"},
        "correctAnswer": "D",
        "userAnswer": None
    },
    {
        "id": 20,
        "question": "MS-PowerPoint हे\nMicrosoft Office folder च्या\nअंतर्गत येते",
        "options": {"A": "बरोबर", "B": "चूक", "C": "", "D": ""},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 21,
        "question": "HTTP चा वापर Webpage\nबनविण्यासाठी करतात.",
        "options": {
            "A": "Machine language Program",
            "B": "High level program",
            "C": "Web Page",
            "D": "Web server"
        },
        "correctAnswer": "C",
        "userAnswer": None
    },
    {
        "id": 22,
        "question": "Text format मध्ये\ndata पाठविण्यासाठी HTTP\nprotocol वापरला जातो.",
        "options": {"A": "Text", "B": "", "C": "", "D": "वरील पैकी एकही नाही"},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 23,
        "question": "HTTP चा अर्थ Hyper Text\nTransfer Protocol असा आहे.",
        "options": {"A": "सत्य", "B": "असत्य", "C": "", "D": ""},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 24,
        "question": "HTTP चा उपयोग फाईल एका\nकॉम्प्युटरमधून दुसऱ्या कॉम्प्युटर\nकडे पाठविणे होय.",
        "options": {"A": "सत्य", "B": "असत्य", "C": "", "D": ""},
        "correctAnswer": "B",
        "userAnswer": None
    },
    {
        "id": 25,
        "question": "Hypertext म्हणजे अक्षरांबरोबर\nअनेक चित्र किंवा ध्वनी होय.",
        "options": {"A": "बरोबर", "B": "चूक", "C": "", "D": ""},
        "correctAnswer": "B",
        "userAnswer": None
    }
]

# Corrected Batch 1103  
batch_1103_corrected = [
    {
        "id": 1,
        "question": "MS-Word मध्ये cut option\nकोणत्या Tab मध्ये उपलब्ध आहे",
        "options": {"A": "Home", "B": "Reference", "C": "Review", "D": "Edit"},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 2,
        "question": "increase Font या button च्या\nखाली Decrease Font हे button\nआहे.",
        "options": {"A": "Decrease Font", "B": "Font Size", "C": "Increase Font", "D": "Colour"},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 3,
        "question": "MS Excel 2019 मध्ये home\ntab मधील clear Data हा\nकाय करू शकतो.",
        "options": {
            "A": "clear comments",
            "B": "clear formats",
            "C": "clear hyperlinks",
            "D": "यापैकी सर्व"
        },
        "correctAnswer": "D",
        "userAnswer": None
    },
    {
        "id": 4,
        "question": "Status Bar वर\nWorksheet चे Current\nStatus पाहता येते.",
        "options": {"A": "Tool Bar", "B": "Title Bar", "C": "Status Bar", "D": "यापैकी नाही"},
        "correctAnswer": "C",
        "userAnswer": None
    },
    {
        "id": 5,
        "question": "Email address,\n\"gcc@gmail.com\" मध्ये\n.com म्हणजे",
        "options": {"A": "username", "B": "domain name", "C": "Domain Address", "D": "domain code"},
        "correctAnswer": "D",
        "userAnswer": None
    },
    {
        "id": 6,
        "question": "MS-Word 2019 मध्ये,\nChange Case Option हा\nHome Tab मधील\nFont या Group\nमध्ये उपलब्ध आहे.",
        "options": {"A": "अक्षर", "B": "क्लिपबोर्ड", "C": "फॉन्ट", "D": "स्लाईड"},
        "correctAnswer": "C",
        "userAnswer": None
    },
    {
        "id": 7,
        "question": "एमएस वर्ड मध्ये, document\nबनवलेल्या नंतर त्याचा default\nextension .docx असतो:",
        "options": {"A": ".dot", "B": ".docx", "C": ".vbp", "D": ".xls"},
        "correctAnswer": "B",
        "userAnswer": None
    },
    {
        "id": 8,
        "question": "In MS-Word\nBold,Italic,Regular यांना\nFont Styles म्हणतात",
        "options": {"A": "special effect", "B": "word art", "C": "text art", "D": "font styles"},
        "correctAnswer": "D",
        "userAnswer": None
    },
    {
        "id": 9,
        "question": "In Ms-Word मध्ये Insert Tab\nचा उपयोग करून Picture\nInsert करू शकतो.",
        "options": {"A": "चूक", "B": "बरोबर", "C": "", "D": ""},
        "correctAnswer": "B",
        "userAnswer": None
    },
    {
        "id": 10,
        "question": "MS-Word मध्ये cut option\nHome Tab मध्ये उपलब्ध आहे",
        "options": {"A": "Home", "B": "Reference", "C": "Review", "D": "Edit"},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 11,
        "question": "Excel मध्ये cells चे\nalignment करण्यासाठी\nHome-->Alignment करतात.",
        "options": {
            "A": "View-->Alignment",
            "B": "Home-->Alignment",
            "C": "Home--> align",
            "D": "कोणतेही नाही"
        },
        "correctAnswer": "B",
        "userAnswer": None
    },
    {
        "id": 12,
        "question": "increase Font या button च्या\nखाली Decrease Font हे button\nआहे.",
        "options": {"A": "Decrease Font", "B": "Font Size", "C": "Increase Font", "D": "Colour"},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 13,
        "question": "MS Excel 2019 मध्ये home\ntab मधील clear Data हा\nकाय करू शकतो.",
        "options": {
            "A": "clear comments",
            "B": "clear formats",
            "C": "clear hyperlinks",
            "D": "यापैकी सर्व"
        },
        "correctAnswer": "D",
        "userAnswer": None
    },
    {
        "id": 14,
        "question": "Status Bar वर\nWorksheet चे Current\nStatus पाहता येते.",
        "options": {"A": "Tool Bar", "B": "Title Bar", "C": "Status Bar", "D": "यापैकी नाही"},
        "correctAnswer": "C",
        "userAnswer": None
    },
    {
        "id": 15,
        "question": "Status Bar वर\nWorksheet चे Current\nStatus पाहता येते.",
        "options": {"A": "Tool Bar", "B": "Title Bar", "C": "Status Bar", "D": "कोणतेही नाही"},
        "correctAnswer": "C",
        "userAnswer": None
    },
    {
        "id": 16,
        "question": "PowerPoint मध्ये New Slide\nहा option Slide या group\nमध्ये असतो.",
        "options": {
            "A": "Transition to this slide",
            "B": "Slide",
            "C": "Presentation Views",
            "D": "Page setup"
        },
        "correctAnswer": "B",
        "userAnswer": None
    },
    {
        "id": 17,
        "question": "Normal, Slide sorter,\nReading view, Slide show\nया buttons status bar वर\nअसतात.",
        "options": {"A": "चूक", "B": "बरोबर", "C": "", "D": ""},
        "correctAnswer": "B",
        "userAnswer": None
    },
    {
        "id": 18,
        "question": "Notes page view कोणत्या\ntab मधून वापरता येते?",
        "options": {"A": "Insert", "B": "File", "C": "Edit", "D": "View"},
        "correctAnswer": "D",
        "userAnswer": None
    },
    {
        "id": 19,
        "question": "PowerPoint मध्ये Notes\npage view कशासाठी\nसाठी वापरले जातात.",
        "options": {
            "A": "Footnote",
            "B": "speech notes",
            "C": "any note with slide",
            "D": "यापैकी सर्व"
        },
        "correctAnswer": "D",
        "userAnswer": None
    },
    {
        "id": 20,
        "question": "Format Tab मधील कोणत्या\noptions मध्ये Objects Rotate\nकरता येतात?",
        "options": {"A": "Rotate", "B": "Auto Shapes", "C": "Oval", "D": "Chart"},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 21,
        "question": "आपण backward arrow\nवापरल्यानंतर, पुढील webpage\nवर जाण्यासाठी Forward Arrow\nवापर करू शकतो.",
        "options": {"A": "Forward Arrow", "B": "Backward Arrow", "C": "Down Arrow", "D": "Up Arrow"},
        "correctAnswer": "A",
        "userAnswer": None
    },
    {
        "id": 22,
        "question": "आपल्याला एखादा E-Mail ला\nउत्तर देण्या यासाठी\nReply बटनवर\nक्लिक करावे लागते.",
        "options": {"A": "Forward", "B": "Compose", "C": "Delete", "D": "Reply"},
        "correctAnswer": "D",
        "userAnswer": None
    },
    {
        "id": 23,
        "question": "Gmail चे कोणतेही\nsettings बदलण्याकरिता\nSettings बटन वर\nclick करावे.",
        "options": {"A": "Spam", "B": "Settings", "C": "Trash", "D": "Draft"},
        "correctAnswer": "B",
        "userAnswer": None
    },
    {
        "id": 24,
        "question": "इंटरनेटवरून एखादी फाईल एका\nकॉम्प्युटर वरून दुसऱ्या\nकॉम्प्युटरवर पाठवला जातो तेव्हा\nखालील पैकी कोणता सेवा\nवापरला जाईल.",
        "options": {"A": "Usenet", "B": "Telnet", "C": "FTP", "D": "Packets"},
        "correctAnswer": "C",
        "userAnswer": None
    },
    {
        "id": 25,
        "question": "Computer Window मध्ये\nMenu Bar हा विविध\nMenus दाखवतो.",
        "options": {"A": "Title Bar", "B": "Tool Bar", "C": "Address Bar", "D": "Menu Bar"},
        "correctAnswer": "D",
        "userAnswer": None
    }
]

# Save corrected batches
output = {
    "BATCH 1102": batch_1102_corrected,
    "BATCH 1103": batch_1103_corrected
}

with open('mcq-batch-1102-1103-corrected.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("✅ Batches 1102 and 1103 corrected")
print(f"   Batch 1102: {len(batch_1102_corrected)} questions")
print(f"   Batch 1103: {len(batch_1103_corrected)} questions")
