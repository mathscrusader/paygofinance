const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = 'project-structure-simple.txt';
const IGNORE_PATTERNS = ['node_modules', '.git', '.next', '.DS_Store'];

function isIgnored(file) {
  return IGNORE_PATTERNS.some(pattern => file.includes(pattern));
}

function scanDirectory(directory, depth = 0) {
  let output = '';
  const prefix = ' '.repeat(depth * 2);
  
  try {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
      if (isIgnored(file)) return;
      
      const fullPath = path.join(directory, file);
      const stats = fs.statSync(fullPath);
      
      output += prefix + (stats.isDirectory() ? '📁 ' : '📄 ') + file + '\n';
      
      if (stats.isDirectory()) {
        output += scanDirectory(fullPath, depth + 1);
      }
    });
  } catch (err) {
    output += prefix + `⚠️ Error reading directory: ${err.message}\n`;
  }
  
  return output;
}

const structure = `
PROJECT STRUCTURE
================
${scanDirectory(process.cwd())}

IMPORTANT FILES
===============
${['package.json', 'next.config.js', 'tailwind.config.js']
  .map(file => {
    try {
      return `\n=== ${file} ===\n${fs.readFileSync(file, 'utf8').split('\n').slice(0, 30).join('\n')}`;
    } catch {
      return `\n=== ${file} ===\n[Not found or error reading]`;
    }
  }).join('\n')}
`;

fs.writeFileSync(OUTPUT_FILE, structure);
console.log(`Project structure saved to ${OUTPUT_FILE}`);