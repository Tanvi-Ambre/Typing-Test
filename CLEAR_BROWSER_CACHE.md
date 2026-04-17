# Clear Browser Cache for MCQ Updates

The MCQ data has been updated with corrected Marathi text, but your browser is showing old cached data.

## How to Clear Cache and See Updated MCQs:

### Method 1: Hard Refresh (Recommended)
1. Open http://localhost:3001/mcq-practice.html
2. Press **Ctrl + Shift + R** (Windows/Linux) or **Cmd + Shift + R** (Mac)
3. This will force reload without cache

### Method 2: Clear Browser Storage
1. Open http://localhost:3001/mcq-practice.html
2. Press **F12** to open Developer Tools
3. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
4. Click **Local Storage** → **http://localhost:3001**
5. Right-click and select **Clear**
6. Refresh the page (F5)

### Method 3: Clear All Browser Data
1. Chrome: Settings → Privacy and Security → Clear browsing data
2. Select "Cached images and files" and "Cookies and other site data"
3. Click "Clear data"
4. Reload the page

## Verify the Fix:
After clearing cache, batch 1101 should show:
- ✅ "मध्ये" instead of "मधहल"
- ✅ "पेपर" instead of "पकपर"  
- ✅ "नाही" instead of "नलहह"
- ✅ "बरोबर" instead of "बरहबर"
- ✅ "चूक" instead of "चचक"

All 25 questions in Batch 1101 now have perfect Marathi spelling!
