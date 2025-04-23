const fs = require('fs');
const path = require('path');

// This script prepares the project for GitHub Pages deployment
console.log('Preparing for GitHub Pages deployment...');

// Make sure the dist directory exists
const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Make sure the data directory exists in dist
const distDataDir = path.resolve(distDir, 'data');
if (!fs.existsSync(distDataDir)) {
  fs.mkdirSync(distDataDir, { recursive: true });
}

// Copy all JSON data files from data/ to dist/data/
const dataDir = path.resolve(__dirname, '../data');
const dataFiles = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));

dataFiles.forEach(file => {
  const sourceFile = path.join(dataDir, file);
  const destFile = path.join(distDataDir, file);
  fs.copyFileSync(sourceFile, destFile);
  console.log(`Copied ${file} to dist/data/`);
});

// Create a simple 404.html file that redirects to index.html (for GitHub Pages SPA support)
const notFoundHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Méto ÖestVèl Weather</title>
  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    var pathSegmentsToKeep = 1;

    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>
<body>
  Redirecting...
</body>
</html>
`;

fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);
console.log('Created 404.html for SPA support');

// Modify index.html to support GitHub Pages SPA routing
const indexPath = path.join(distDir, 'index.html');
if (fs.existsSync(indexPath)) {
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  
  // Add script for GitHub Pages SPA routing
  const scriptToAdd = `
  <!-- Start Single Page Apps for GitHub Pages -->
  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    (function(l) {
      if (l.search[1] === '/' ) {
        var decoded = l.search.slice(1).split('&').map(function(s) { 
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>
  <!-- End Single Page Apps for GitHub Pages -->
  `;
  
  // Insert script right before the closing head tag
  indexHtml = indexHtml.replace('</head>', scriptToAdd + '</head>');
  
  fs.writeFileSync(indexPath, indexHtml);
  console.log('Modified index.html for SPA support');
} else {
  console.log('Warning: index.html not found in dist directory');
}

console.log('GitHub Pages preparation complete!');