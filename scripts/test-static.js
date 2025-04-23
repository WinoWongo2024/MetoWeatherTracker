// A simple script to test the GitHub Pages static setup locally
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the dist/public directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist', 'public');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create the data directory in dist/public
const dataDir = path.join(distDir, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Copy the JSON files from data/ to dist/public/data/
const sourceDataDir = path.join(__dirname, '..', 'data');
fs.readdirSync(sourceDataDir).forEach(file => {
  if (file.endsWith('.json')) {
    const sourceFile = path.join(sourceDataDir, file);
    const destFile = path.join(dataDir, file);
    fs.copyFileSync(sourceFile, destFile);
    console.log(`Copied ${file} to dist/public/data/`);
  }
});

// Create a .env file in dist/public to use static data
fs.writeFileSync(path.join(distDir, '.env'), 'useStaticData=true');
console.log('Created .env file in dist/public/');

console.log('Static test setup complete. Run "npm run build" to build the frontend.');