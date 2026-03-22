# Deployment Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `typing-test` (or any name you prefer)
3. Description: "30 WPM Typing Test - GCC TBC English Exam Practice"
4. Keep it Public (required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Push to GitHub

After creating the repository, run these commands in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/typing-test.git

# Push the code
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Click "Pages" in the left sidebar
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait 1-2 minutes for deployment

## Step 4: Access Your Live Site

Your site will be available at:
```
https://YOUR_USERNAME.github.io/typing-test/
```

## Updating the Site

Whenever you make changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

GitHub Pages will automatically update within 1-2 minutes.

## Custom Domain (Optional)

If you want to use a custom domain:

1. Buy a domain from any registrar
2. In GitHub repository Settings > Pages
3. Add your custom domain
4. Configure DNS records at your domain registrar:
   - Add CNAME record pointing to: YOUR_USERNAME.github.io
   - Or add A records pointing to GitHub's IPs

## Troubleshooting

**Site not loading?**
- Wait 2-3 minutes after enabling Pages
- Check Settings > Pages for deployment status
- Ensure repository is Public

**Changes not showing?**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait 1-2 minutes for GitHub Pages to rebuild
- Check commit was pushed: `git log`

**404 Error?**
- Verify the URL matches: https://YOUR_USERNAME.github.io/REPO_NAME/
- Check that index.html is in the root directory
- Ensure branch is set to "main" in Pages settings
