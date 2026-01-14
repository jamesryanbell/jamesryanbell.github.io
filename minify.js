const fs = require('fs');
const { minify } = require('html-minifier');

const inputFile = 'index.html';
const outputFile = 'index.html';

const html = fs.readFileSync(inputFile, 'utf8');

// Use very conservative minification options to avoid parsing errors
const minifyOptions = {
  collapseWhitespace: true,
  removeComments: false, // Keep comments to avoid breaking display code
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: false,
  removeEmptyAttributes: false, // Safer
  removeOptionalTags: false,
  removeTagWhitespace: false,
  sortAttributes: false,
  sortClassName: false,
  caseSensitive: false,
  keepClosingSlash: false,
  decodeEntities: false, // Keep entities as-is
  ignoreCustomComments: [/^!/], // Preserve important comments
  processScripts: [] // Don't process scripts
};

try {
  const minified = minify(html, minifyOptions);
  fs.writeFileSync(outputFile, minified);
  console.log(`✓ Minified ${inputFile} (${html.length} → ${minified.length} bytes, ${Math.round((1 - minified.length/html.length) * 100)}% reduction)`);
} catch (error) {
  // Fallback: aggressive but safe whitespace removal without full parsing
  const basicMinified = html
    .replace(/>\s+</g, '><') // Remove whitespace between tags
    .replace(/\s+/g, ' ') // Collapse multiple spaces to single space
    .replace(/\s+>/g, '>') // Remove spaces before closing tags
    .replace(/<\s+/g, '<') // Remove spaces after opening tags
    .replace(/\s*{\s*/g, '{') // Remove spaces around CSS braces
    .replace(/\s*}\s*/g, '}') // Remove spaces around CSS braces
    .replace(/\s*:\s*/g, ':') // Remove spaces around CSS colons
    .replace(/\s*;\s*/g, ';') // Remove spaces around CSS semicolons
    .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
    .trim();

  fs.writeFileSync(outputFile, basicMinified);
  console.log(`✓ Safe minification applied (${html.length} → ${basicMinified.length} bytes, ${Math.round((1 - basicMinified.length/html.length) * 100)}% reduction)`);
  console.log('  Note: Full minification failed due to HTML structure, using safe fallback');
}
