# Speed Passage Implementation

## What's New

The Speed Passage module now uses **real exam passages** extracted from your .docx files instead of static content.

## Features

✅ **30 Real Exam Passages** - Extracted from all Eng30 Speed .docx files (101-605)
✅ **Automatic Loading** - Passages load automatically from `passages-data.js`
✅ **Random Selection** - Each test picks a random passage from the collection
✅ **Optional Upload** - Users can upload additional .docx files for more variety
✅ **Proper Formatting** - All passages have 5-space indents and single newlines

## How It Works

### Built-in Passages
- 30 passages extracted from your .docx files
- Stored in `passages-data.js` (auto-generated)
- Word counts range from 158-196 words
- All properly formatted with 5-space paragraph indents

### Upload Additional Passages
1. Click the upload area on the Speed Passage page
2. Select one or more .docx files
3. Passages are extracted and stored in browser localStorage
4. Future tests will randomly pick from all available passages

## Files

- `passages-data.js` - Auto-generated file with 30 exam passages
- `extract-passages.js` - Node.js script to regenerate passages from .docx files
- `extracted-passages.json` - JSON backup of all extracted passages

## Regenerating Passages

If you add new .docx files or need to update:

```bash
node extract-passages.js
```

This will scan all `Eng30 Speed *.docx` files and regenerate `passages-data.js`.

## Requirements

- `adm-zip` package (already installed)
- `mammoth.js` CDN (for browser .docx upload)

## Next Steps

Test the application by opening `index.html` in a browser. The passages from your exam files will load automatically!
