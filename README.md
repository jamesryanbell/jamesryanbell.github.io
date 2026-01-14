# GitHub Pages Site

This repository contains the source files for the GitHub Pages site.

## Development

The `index.html` file is kept in a readable, formatted state for easy editing.

## Building for Production

The site is automatically minified and deployed via GitHub Actions when you push to the `main` or `master` branch.

### Manual Build (Optional)

To test the minification locally:

```bash
npm install
npm run build
```

This will minify `index.html` in place. **Note:** Make sure to restore the readable version before committing if you test locally.

## Deployment

### Option 1: Deploy to gh-pages branch (Default)

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:
1. Checkout the code
2. Install dependencies
3. Minify the HTML
4. Deploy to the `gh-pages` branch

**Setup:** Configure GitHub Pages to serve from the `gh-pages` branch in your repository settings (Settings → Pages → Source: Deploy from a branch → Branch: gh-pages).

### Option 2: Serve from root branch

If you prefer to serve from the root of your main/master branch, use the alternative workflow:
1. Rename `.github/workflows/deploy-root.yml.example` to `.github/workflows/deploy.yml`
2. Delete the current `deploy.yml`
3. The workflow will commit the minified version back to your branch

**Note:** With Option 2, your readable source will be in git history, but the working tree will have the minified version after deployment.
