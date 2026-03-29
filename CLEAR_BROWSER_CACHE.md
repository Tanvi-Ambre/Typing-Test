# Clear Browser Cache for MCQ Questions

## Problem
The browser may be showing old garbled Marathi text because it's loading from localStorage cache instead of the new corrected mcq-data.js file.

## Solution: Clear localStorage

### Option 1: Using Browser Console (Recommended)
1. Open http://localhost:3001/mcq-practice.html
2. Press F12 to open Developer Tools
3. Go to "Console" tab
4. Run this command:
```javascript
localStorage.removeItem('mcqQuestionSets');
location.reload();
```

### Option 2: Clear All Site Data
1. Open http://localhost:3001/mcq-practice.html
2. Press F12 to open Developer Tools
3. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
4. Click "Local Storage" → "http://localhost:3001"
5. Right-click → "Clear"
6. Refresh the page (F5 or Cmd+R)

### Option 3: Hard Refresh
1. Open http://localhost:3001/mcq-practice.html
2. Press Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
3. This forces a complete reload

## Verify Corrections

After clearing cache, check if Marathi text is correct:

### Correct Text (✓)
- बरोबर (Correct)
- चूक (Wrong)
- म्हणजे (Means)
- मध्ये (In)
- चा (Of)
- उपयोग (Use)
- पूर्वीचे (Previous)
- करण्यासाठी (For doing)
- करतात (Do)

### Garbled Text (✗ - should NOT see these)
- बररबर
- चचक
- ममणजज
- मधध / मधयध
- चच
- उपययग
- पकचरचच
- करणयसचठठ
- करतचत

## If Still Garbled

If you still see garbled text after clearing cache:

1. Check which batch has the issue
2. Take a screenshot of the garbled text
3. Tell me: "BATCH XXXX still has garbled text: [paste the garbled text]"
4. I'll add those specific patterns to the correction module

## Technical Details

The mcq-data.js file auto-loads batches into localStorage on page load. If localStorage already has data, it won't overwrite it. That's why clearing is necessary after updating the corrections.

## Prevention

To avoid this in future:
- Clear localStorage before testing new corrections
- Or use Incognito/Private browsing mode for testing
- Or add a version number to force reload (future enhancement)
