const fs = require('fs');
let content = fs.readFileSync('src/components/SchoolPublicWebsite.jsx', 'utf8');
const lines = content.split('\n');

console.log('Total lines:', lines.length);

// Find key marker lines
let rollSearchBarLine = -1;
let hasSearchedResultLine = -1;
let resultEndLine = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Roll Search Bar')) {
    rollSearchBarLine = i;
    console.log('Found Roll Search Bar at line:', i + 1);
  }
  if (lines[i].includes('Result Card Preview')) {
    hasSearchedResultLine = i;
    console.log('Found Result Card Preview at line:', i + 1);
  }
}

// Find the end: look for the closing after "Result Card Preview"
if (hasSearchedResultLine > 0) {
  // The section ends with: )}\n          </div>\n        </div>\n      )}\n
  // Let's find where hasSearchedResult block ends by tracking braces
  let braceDepth = 0;
  let foundStart = false;
  for (let i = hasSearchedResultLine; i < lines.length; i++) {
    if (!foundStart && lines[i].includes('{hasSearchedResult &&')) {
      foundStart = true;
    }
    if (foundStart) {
      const opens = (lines[i].match(/\{/g) || []).length;
      const closes = (lines[i].match(/\}/g) || []).length;
      braceDepth += opens - closes;
      if (foundStart && braceDepth <= 0 && i > hasSearchedResultLine) {
        resultEndLine = i;
        console.log('Found result end at line:', i + 1, '| content:', lines[i].trim());
        break;
      }
    }
  }
}

if (rollSearchBarLine === -1) {
  console.log('ERROR: Could not find Roll Search Bar');
  process.exit(1);
}

// Print a few lines around the area for debugging
console.log('\n--- Lines around Roll Search Bar ---');
for (let i = rollSearchBarLine - 1; i <= rollSearchBarLine + 5; i++) {
  console.log(`${i+1}: ${JSON.stringify(lines[i])}`);
}

console.log('\n--- Lines around result end ---');
if (resultEndLine > 0) {
  for (let i = resultEndLine - 2; i <= resultEndLine + 2; i++) {
    console.log(`${i+1}: ${JSON.stringify(lines[i])}`);
  }
}
