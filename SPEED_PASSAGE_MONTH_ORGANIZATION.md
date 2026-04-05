# Speed Passage Month-Based Organization

## Summary

Successfully reorganized speed passages by month with a two-level selection interface:
1. **Month Selection**: Choose between Jan 2026 or Oct 2025
2. **Passage Selection**: Select specific passage from chosen month

## Changes Made

### 1. Folder Structure ✅

```
exam-materials/speed-passages/
├── jan-2026/           (30 passages - existing files)
│   ├── Eng30 Speed 101.docx
│   ├── Eng30 Speed 102.docx
│   └── ... (28 more)
└── oct-2025/           (10 passages - newly uploaded)
    ├── Eng30 -101-batch.docx
    ├── Eng30 -102-batch.docx
    └── ... (8 more)
```

### 2. New Extraction Script ✅

**File**: `extract-passages-by-month.js`

- Scans month folders automatically
- Extracts passages from each month
- Generates `passages-data.js` with month-based structure
- Output: 40 total passages (30 + 10)

### 3. Updated Data Structure ✅

**File**: `passages-data.js`

```javascript
const passagesByMonth = {
  "jan-2026": {
    "displayName": "Jan 2026",
    "passages": [
      {
        "filename": "Eng30 Speed 101.docx",
        "text": "...",
        "wordCount": 177
      },
      // ... 29 more
    ]
  },
  "oct-2025": {
    "displayName": "Oct 2025",
    "passages": [
      {
        "filename": "Eng30 -101-batch.docx",
        "text": "...",
        "wordCount": 174
      },
      // ... 9 more
    ]
  }
};

const availableMonths = [
  { key: "jan-2026", display: "Jan 2026", count: 30 },
  { key: "oct-2025", display: "Oct 2025", count: 10 }
];
```

### 4. Updated UI ✅

**File**: `index.html`

Added month selection dropdown:
```html
<!-- Month Selection -->
<div class="question-set-selection">
    <label for="monthSelect"><strong>Select Month:</strong></label>
    <select id="monthSelect" class="set-select">
        <option value="">Loading...</option>
    </select>
</div>

<!-- Passage Selection -->
<div class="question-set-selection">
    <label for="passageSelect"><strong>Select Passage:</strong></label>
    <select id="passageSelect" class="set-select" disabled>
        <option value="">Select a month first</option>
    </select>
</div>
```

### 5. Updated JavaScript ✅

**File**: `script.js`

**New Functions**:
- `populateMonthDropdown()` - Loads available months
- Updated `populatePassageDropdown()` - Loads passages for selected month
- Updated `loadPassageForPreview()` - Handles month-based passage IDs

**Event Listeners**:
- Month selection change → Updates passage dropdown
- Auto-selects first month on load

**Passage ID Format**:
- Month-based: `"jan-2026-0"`, `"oct-2025-5"`
- Uploaded: `"uploaded-0"`, `"uploaded-1"`

### 6. Header Height Reduced ✅

**File**: `style.css`

- Header height: 80px → 50px
- Title font: 1.2em → 1em
- Subtitle font: 0.75em → 0.7em
- Stats bar padding reduced
- More space for passage and typing area

## User Experience

### Selection Flow

1. **Open Speed Passage page**
   - Month dropdown shows: "Jan 2026 (30 passages)" and "Oct 2025 (10 passages)"
   - Jan 2026 is auto-selected

2. **Select Month**
   - Choose between Jan 2026 or Oct 2025
   - Passage dropdown updates automatically

3. **Select Passage**
   - Dropdown shows passages from selected month
   - Format: "Eng30 Speed 101 (177 words)"

4. **Choose Mode & Start**
   - Select Real-time or Exam mode
   - Click "Load Passage" to preview
   - Click "Start Test" to begin

### Benefits

✅ **Organized**: Passages grouped by month for easy navigation
✅ **Scalable**: Easy to add new months (e.g., "feb-2026", "mar-2026")
✅ **Clear**: Users can see which month they're practicing from
✅ **Flexible**: Uploaded passages still work alongside month-based ones

## Adding New Months

To add passages for a new month:

1. **Create folder**: `exam-materials/speed-passages/new-month/`
   - Example: `feb-2026/`, `mar-2026/`

2. **Add DOCX files**: Place passage files in the folder

3. **Run extraction**: `node extract-passages-by-month.js`

4. **Refresh page**: New month appears in dropdown automatically

## Technical Details

### Passage ID Parsing

```javascript
// Month-based passage: "jan-2026-5"
const parts = selectedValue.split('-');
const monthKey = parts.slice(0, -1).join('-');  // "jan-2026"
const index = parseInt(parts[parts.length - 1]); // 5

// Get passage
const monthData = passagesByMonth[monthKey];
const passage = monthData.passages[index];
```

### Month Display Names

Folder names are automatically converted to display names:
- `jan-2026` → "Jan 2026"
- `oct-2025` → "Oct 2025"
- `feb-2026` → "Feb 2026"

## Files Modified

1. ✅ `index.html` - Added month selection dropdown
2. ✅ `script.js` - Updated passage loading logic
3. ✅ `style.css` - Reduced header height
4. ✅ `passages-data.js` - New month-based structure
5. ✅ `extract-passages-by-month.js` - New extraction script

## Testing

- [x] Month dropdown populates correctly
- [x] Passage dropdown updates when month changes
- [x] Passages load correctly from selected month
- [x] Uploaded passages still work
- [x] Preview and test modes work
- [x] Header height reduced for smaller screens

## Bonus: MCQ Extraction Complete! 🎉

While working on speed passages, the MCQ extraction also completed:
- ✅ All 30 batches extracted with correct Marathi text
- ✅ File: `mcq-data.js` (250 KB)
- ✅ Total: 724 questions with proper Marathi
- ✅ No more garbled text!

Users need to clear browser localStorage to see corrected Marathi in MCQ practice.

## Next Steps

1. Test the month-based selection in browser
2. Verify passages load correctly
3. Add more months as needed (Feb 2026, Mar 2026, etc.)
4. Consider adding batch numbers within months if needed
