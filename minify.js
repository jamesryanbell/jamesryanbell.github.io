const fs = require('fs');
const { minify } = require('html-minifier');

const inputFile = 'index.html';
// In CI, overwrite for deployment. Locally, you can test with a separate file
const outputFile = process.env.CI ? 'index.html' : 'index.html';

const html = fs.readFileSync(inputFile, 'utf8');

const minified = minify(html, {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeTagWhitespace: true,
  sortAttributes: true,
  sortClassName: true
});

fs.writeFileSync(outputFile, minified);
console.log(`✓ Minified ${inputFile} (${html.length} → ${minified.length} bytes, ${Math.round((1 - minified.length/html.length) * 100)}% reduction)`);
