const fs = require('fs');
let content = fs.readFileSync('src/components/SchoolPublicWebsite.jsx', 'utf8');
const lines = content.split('\n');

// Find the classGroup input section
let classGroupLabelLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Class / Group') && lines[i].includes('label')) {
    classGroupLabelLine = i;
    break;
  }
}

if (classGroupLabelLine === -1) {
  console.log('ERROR: classGroup label not found!');
  process.exit(1);
}

console.log('Found classGroup label at line:', classGroupLabelLine + 1);

// Find the end of the classGroup <div> block (the closing </div> after the input)
// We need to find: <div> ... <label> ... </label> ... <input .../> ... </div>
// The block starts at classGroupLabelLine - 1 (the <div>)
let blockStart = classGroupLabelLine - 1;
let blockEnd = -1;

// Find closing </div> - track depth
let depth = 0;
for (let i = blockStart; i < lines.length; i++) {
  const openDivs = (lines[i].match(/<div/g) || []).length;
  const closeDivs = (lines[i].match(/<\/div>/g) || []).length;
  depth += openDivs - closeDivs;
  if (depth <= 0 && i > blockStart) {
    blockEnd = i;
    break;
  }
}

console.log('Block start:', blockStart + 1, 'Block end:', blockEnd + 1);
console.log('Content being replaced:');
for (let i = blockStart; i <= blockEnd; i++) {
  console.log(`  ${i+1}: ${lines[i]}`);
}

// Build the new dropdown block
const newBlock = [
  "                <div>",
  "                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>",
  "                    \u09b6\u09cd\u09b0\u09c7\u09a3\u09bf (Class / Group)",
  "                  </label>",
  "                  <select",
  "                    value={resultSearchForm.classGroup}",
  "                    onChange={e => setResultSearchForm(f => ({ ...f, classGroup: e.target.value }))}",
  "                    className=\"input-control\"",
  "                    style={{ width: '100%', padding: '9px 12px', fontSize: '0.85rem', boxSizing: 'border-box', cursor: 'pointer' }}",
  "                  >",
  "                    <option value=\"\">\u2014 \u09b6\u09cd\u09b0\u09c7\u09a3\u09bf \u09ac\u09be\u099b\u09be\u0987 \u0995\u09b0\u09c1\u09a8 \u2014</option>",
  "                    <option value=\"\u09e7\u09ae\">\u09e7\u09ae \u09b6\u09cd\u09b0\u09c7\u09a3\u09bf</option>",
  "                    <option value=\"\u09e8\u09af\u09bc\">\u09e8\u09af\u09bc \u09b6\u09cd\u09b0\u09c7\u09a3\u09bf</option>",
  "                    <option value=\"\u09e9\u09af\u09bc\">\u09e9\u09af\u09bc \u09b6\u09cd\u09b0\u09c7\u09a3\u09bf</option>",
  "                    <option value=\"\u09ea\u09b0\u09cd\u09a5\">\u09ea\u09b0\u09cd\u09a5 \u09b6\u09cd\u09b0\u09c7\u09a3\u09bf</option>",
  "                    <option value=\"\u09eb\u09ae\">\u09eb\u09ae \u09b6\u09cd\u09b0\u09c7\u09a3\u09bf</option>",
  "                    <option value=\"\u09ec\u09b7\u09cd\u09a0\">\u09ec\u09b7\u09cd\u09a0 \u09b6\u09cd\u09b0\u09c7\u09a3\u09bf</option>",
  "                    <option value=\"\u09ed\u09ae\">\u09ed\u09ae \u09b6\u09cd\u09b0\u09c7\u09a3\u09bf</option>",
  "                    <option value=\"\u09ee\u09ae\">\u09ee\u09ae \u09b6\u09cd\u09b0\u09c7\u09a3\u09bf</option>",
  "                    <option value=\"\u09ef\u09ae\">\u09ef\u09ae \u09b6\u09cd\u09b0\u09c7\u09a3\u09bf</option>",
  "                    <option value=\"\u09e7\u09e6\u09ae\">\u09e7\u09e6\u09ae \u09b6\u09cd\u09b0\u09c7\u09a3\u09bf (SSC)</option>",
  "                    <option value=\"\u098f\u0995\u09be\u09a6\u09b6\">\u098f\u0995\u09be\u09a6\u09b6 \u09b6\u09cd\u09b0\u09c7\u09a3\u09bf (HSC \u09e7\u09ae \u09ac\u09b0\u09cd\u09b7)</option>",
  "                    <option value=\"\u09a6\u09cd\u09ac\u09be\u09a6\u09b6\">\u09a6\u09cd\u09ac\u09be\u09a6\u09b6 \u09b6\u09cd\u09b0\u09c7\u09a3\u09bf (HSC \u09e8\u09af\u09bc \u09ac\u09b0\u09cd\u09b7)</option>",
  "                  </select>",
  "                </div>"
];

lines.splice(blockStart, blockEnd - blockStart + 1, ...newBlock);
console.log('SUCCESS: classGroup field replaced with dropdown!');

fs.writeFileSync('src/components/SchoolPublicWebsite.jsx', lines.join('\n'), 'utf8');
console.log('File written!');
