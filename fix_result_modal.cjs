const fs = require('fs');
let content = fs.readFileSync('src/components/SchoolPublicWebsite.jsx', 'utf8');
let lines = content.split('\n');

// ============================================================
// STEP 1: Add getAccounts + STUDENT_REPORT_CARD imports
// ============================================================
lines = lines.map(line => {
  if (line.includes("import { submitAdmissionApplication } from '../data/authManager'")) {
    return "import { submitAdmissionApplication, getAccounts } from '../data/authManager';";
  }
  if (line.includes("import { INSTITUTION, NOTICES } from '../data/mockData'")) {
    return "import { INSTITUTION, NOTICES, STUDENT_REPORT_CARD } from '../data/mockData';";
  }
  return line;
});

// ============================================================
// STEP 2: Replace old state declarations (searchRoll, hasSearchedResult)
// ============================================================
const newStates = [
  "  const [resultSearchForm, setResultSearchForm] = useState({ studentId: '', roll: '', phone: '', classGroup: '' });",
  "  const [foundStudent, setFoundStudent] = useState(null);",
  "  const [resultNotFound, setResultNotFound] = useState(false);",
  "  const [hasSearchedResult, setHasSearchedResult] = useState(false);",
  "",
  "  // Get saved report card from localStorage or fallback",
  "  const getSavedReportCard = () => {",
  "    try {",
  "      const saved = localStorage.getItem('schoolpulse_student_report_card');",
  "      if (saved) return JSON.parse(saved);",
  "    } catch(e) {}",
  "    return STUDENT_REPORT_CARD;",
  "  };",
  "",
  "  // Search student by ID / Roll / Phone / Class",
  "  const handleResultSearch = () => {",
  "    const { studentId, roll, phone, classGroup } = resultSearchForm;",
  "    if (!studentId.trim() && !roll.trim() && !phone.trim() && !classGroup.trim()) return;",
  "    const accounts = getAccounts();",
  "    const students = accounts.filter(a => a.role === 'Student');",
  "    const found = students.find(s => {",
  "      const sid = studentId.trim().toLowerCase();",
  "      const r = roll.trim();",
  "      const ph = phone.trim().replace(/[^0-9]/g, '');",
  "      const cl = classGroup.trim().toLowerCase();",
  "      const matchId = sid && s.studentId && s.studentId.toLowerCase().includes(sid);",
  "      const matchRoll = r && s.roll && String(s.roll).includes(r);",
  "      const matchPhone = ph && s.phone && s.phone.replace(/[^0-9]/g, '').includes(ph);",
  "      const matchClass = cl && s.class && s.class.toLowerCase().includes(cl);",
  "      return matchId || matchRoll || matchPhone || matchClass;",
  "    });",
  "    setFoundStudent(found || null);",
  "    setResultNotFound(!found);",
  "    setHasSearchedResult(true);",
  "  };"
];

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("const [searchRoll, setSearchRoll] = useState('14')")) {
    // Replace this line and the next (hasSearchedResult)
    lines.splice(i, 2, ...newStates);
    console.log('SUCCESS: State declarations replaced at line', i + 1);
    break;
  }
}

// ============================================================
// STEP 3: Replace the search bar + result section (lines 2232-2314)
// But line numbers may have shifted. Re-find them.
// ============================================================

let rollSearchBarLine = -1;
let resultEndLine = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Roll Search Bar')) {
    rollSearchBarLine = i;
  }
  if (lines[i].includes('Result Card Preview')) {
    // Find the closing )} of hasSearchedResult
    let depth = 0;
    let started = false;
    for (let j = i; j < lines.length; j++) {
      if (!started && lines[j].includes('{hasSearchedResult &&')) {
        started = true;
      }
      if (started) {
        const o = (lines[j].match(/\{/g) || []).length;
        const c = (lines[j].match(/\}/g) || []).length;
        depth += o - c;
        if (depth <= 0 && j > i) {
          resultEndLine = j;
          break;
        }
      }
    }
    break;
  }
}

console.log('Roll Search Bar at line:', rollSearchBarLine + 1);
console.log('Result end at line:', resultEndLine + 1);

if (rollSearchBarLine === -1 || resultEndLine === -1) {
  console.log('ERROR: Could not locate lines!');
  process.exit(1);
}

// Build the new section
const newSection = [
  "            {/* Multi-Field Result Search Form */}",
  "            <div style={{ marginBottom: '16px' }}>",
  "              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>",
  "                <div>",
  "                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>",
  "                    \u09b8\u09cd\u099f\u09c1\u09a1\u09c7\u09a8\u09cd\u099f \u0986\u0987\u09a1\u09bf (Student ID)",
  "                  </label>",
  "                  <input",
  "                    type=\"text\"",
  "                    value={resultSearchForm.studentId}",
  "                    onChange={e => setResultSearchForm(f => ({ ...f, studentId: e.target.value }))}",
  "                    placeholder=\"\u09af\u09c7\u09ae\u09a8: ISC-2026-1014\"",
  "                    className=\"input-control\"",
  "                    style={{ width: '100%', padding: '9px 12px', fontSize: '0.85rem', fontFamily: 'monospace', boxSizing: 'border-box' }}",
  "                    onKeyDown={e => e.key === 'Enter' && handleResultSearch()}",
  "                  />",
  "                </div>",
  "                <div>",
  "                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>",
  "                    \u09b0\u09cb\u09b2 \u09a8\u09ae\u09cd\u09ac\u09b0 (Roll Number)",
  "                  </label>",
  "                  <input",
  "                    type=\"text\"",
  "                    value={resultSearchForm.roll}",
  "                    onChange={e => setResultSearchForm(f => ({ ...f, roll: e.target.value }))}",
  "                    placeholder=\"\u09af\u09c7\u09ae\u09a8: 101\"",
  "                    className=\"input-control\"",
  "                    style={{ width: '100%', padding: '9px 12px', fontSize: '0.85rem', boxSizing: 'border-box' }}",
  "                    onKeyDown={e => e.key === 'Enter' && handleResultSearch()}",
  "                  />",
  "                </div>",
  "                <div>",
  "                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>",
  "                    \u09ae\u09cb\u09ac\u09be\u0987\u09b2 \u09a8\u09ae\u09cd\u09ac\u09b0 (Phone)",
  "                  </label>",
  "                  <input",
  "                    type=\"text\"",
  "                    value={resultSearchForm.phone}",
  "                    onChange={e => setResultSearchForm(f => ({ ...f, phone: e.target.value }))}",
  "                    placeholder=\"\u09af\u09c7\u09ae\u09a8: 01711-489201\"",
  "                    className=\"input-control\"",
  "                    style={{ width: '100%', padding: '9px 12px', fontSize: '0.85rem', boxSizing: 'border-box' }}",
  "                    onKeyDown={e => e.key === 'Enter' && handleResultSearch()}",
  "                  />",
  "                </div>",
  "                <div>",
  "                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>",
  "                    \u09b6\u09cd\u09b0\u09c7\u09a3\u09bf (Class / Group)",
  "                  </label>",
  "                  <input",
  "                    type=\"text\"",
  "                    value={resultSearchForm.classGroup}",
  "                    onChange={e => setResultSearchForm(f => ({ ...f, classGroup: e.target.value }))}",
  "                    placeholder=\"\u09af\u09c7\u09ae\u09a8: \u09e7\u09e6\u09ae \u09ac\u09bf\u099c\u09cd\u099e\u09be\u09a8\"",
  "                    className=\"input-control\"",
  "                    style={{ width: '100%', padding: '9px 12px', fontSize: '0.85rem', boxSizing: 'border-box' }}",
  "                    onKeyDown={e => e.key === 'Enter' && handleResultSearch()}",
  "                  />",
  "                </div>",
  "              </div>",
  "              <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: '0 0 10px' }}>",
  "                \u09af\u09c7\u0995\u09cb\u09a8\u09cb \u098f\u0995\u099f\u09bf \u09a4\u09a5\u09cd\u09af \u09a6\u09bf\u09af\u09bc\u09c7 \u09b8\u09be\u09b0\u09cd\u099a \u0995\u09b0\u09be \u09af\u09be\u09ac\u09c7",
  "              </p>",
  "              <button",
  "                onClick={handleResultSearch}",
  "                className=\"btn btn-primary\"",
  "                style={{ width: '100%', padding: '11px', fontWeight: 700, fontSize: '0.9rem' }}",
  "              >",
  "                \u09ab\u09b2\u09be\u09ab\u09b2 \u09a6\u09c7\u0996\u09c1\u09a8",
  "              </button>",
  "            </div>",
  "",
  "            {/* Not Found Message */}",
  "            {hasSearchedResult && resultNotFound && (",
  "              <div style={{ backgroundColor: '#fff1f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>",
  "                <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>\u26a0\ufe0f</div>",
  "                <div style={{ fontWeight: 700, color: '#be123c', fontSize: '0.9rem' }}>",
  "                  \u09b6\u09bf\u0995\u09cd\u09b7\u09be\u09b0\u09cd\u09a5\u09c0 \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf",
  "                </div>",
  "                <div style={{ fontSize: '0.78rem', color: '#9f1239', marginTop: '4px' }}>",
  "                  \u09b8\u09a0\u09bf\u0995 \u09a4\u09a5\u09cd\u09af \u09a6\u09bf\u09a8 \u0985\u09a5\u09ac\u09be \u09b8\u09cd\u0995\u09c1\u09b2 \u0985\u09ab\u09bf\u09b8\u09c7 \u09af\u09cb\u0997\u09be\u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8",
  "                </div>",
  "              </div>",
  "            )}",
  "",
  "            {/* Dynamic Result Card */}",
  "            {hasSearchedResult && foundStudent && (() => {",
  "              const reportCard = getSavedReportCard();",
  "              const isMain = foundStudent.studentId === (reportCard && reportCard.student && reportCard.student.studentId);",
  "              const gpa = isMain && reportCard && reportCard.summary ? reportCard.summary.cumulativeGPA : '5.00';",
  "              const subjects = isMain && reportCard && reportCard.subjects ? reportCard.subjects : [];",
  "              return (",
  "                <div style={{ backgroundColor: '#f8fafc', borderRadius: 'var(--radius-xl)', padding: '20px', border: '1px solid #e2e8f0', animation: 'cardEnter 0.2s ease' }}>",
  "                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>",
  "                    <div>",
  "                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{foundStudent.name}</div>",
  "                      <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '3px' }}>",
  "                        \u09b0\u09cb\u09b2: <strong>{foundStudent.roll || '\u09a8\u09be\u0987'}</strong>",
  "                        {foundStudent.class ? <> \u2022 {foundStudent.class}</> : ''}",
  "                      </div>",
  "                      <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>",
  "                        \u0986\u0987\u09a1\u09bf: <strong style={{ fontFamily: 'monospace', color: '#1d4ed8' }}>{foundStudent.studentId}</strong>",
  "                        {foundStudent.phone ? <> \u2022 {foundStudent.phone}</> : ''}",
  "                      </div>",
  "                      {foundStudent.guardianName && (",
  "                        <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>",
  "                          \u0985\u09ad\u09bf\u09ad\u09be\u09ac\u0995: {foundStudent.guardianName}",
  "                        </div>",
  "                      )}",
  "                    </div>",
  "                    <div style={{ textAlign: 'right', flexShrink: 0 }}>",
  "                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#059669', lineHeight: 1 }}>",
  "                        {parseFloat(gpa) >= 5 ? '\u09eb.\u09e6\u09e6' : gpa}",
  "                      </div>",
  "                      <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>GPA {gpa} / 5.00</div>",
  "                      <span className=\"badge badge-success\" style={{ marginTop: '4px', display: 'inline-block' }}>",
  "                        {parseFloat(gpa) >= 5 ? '\u0997\u09cb\u09b2\u09cd\u09a1\u09c7\u09a8 A+' : parseFloat(gpa) >= 4 ? 'A+' : 'A'}",
  "                      </span>",
  "                    </div>",
  "                  </div>",
  "                  {subjects.length > 0 ? (",
  "                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.82rem', maxHeight: '220px', overflowY: 'auto' }}>",
  "                      {subjects.map((s, i) => (",
  "                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 10px', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #edf2f7' }}>",
  "                          <span style={{ color: '#334155' }}>{s.name}</span>",
  "                          <strong style={{ color: s.gradePoint >= 5 ? '#059669' : '#1e3a8a' }}>",
  "                            {s.totalMark} ({s.grade} / {s.gradePoint}.00)",
  "                          </strong>",
  "                        </div>",
  "                      ))}",
  "                    </div>",
  "                  ) : (",
  "                    <div style={{ textAlign: 'center', padding: '12px', color: '#94a3b8', fontSize: '0.82rem' }}>",
  "                      \u09ab\u09b2\u09be\u09ab\u09b2\u09c7\u09b0 \u09ac\u09bf\u09b8\u09cd\u09a4\u09be\u09b0\u09bf\u09a4 \u09a4\u09a5\u09cd\u09af \u098f\u0996\u09a8\u09cb \u09af\u09c1\u0995\u09cd\u09a4 \u09b9\u09af\u09bc\u09a8\u09bf\u0964",
  "                    </div>",
  "                  )}",
  "                  <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>",
  "                    <span style={{ fontSize: '0.74rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '5px' }}>",
  "                      <ShieldCheck size={15} /> \u09a2\u09be\u0995\u09be \u09b6\u09bf\u0995\u09cd\u09b7\u09be \u09ac\u09cb\u09b0\u09cd\u09a1 \u09a1\u09bf\u099c\u09bf\u099f\u09be\u09b2 \u09af\u09be\u099a\u09be\u0987\u0995\u09c3\u09a4",
  "                    </span>",
  "                    <button",
  "                      onClick={() => alert('\u0985\u09ab\u09bf\u09b8\u09bf\u09af\u09bc\u09be\u09b2 \u09ae\u09be\u09b0\u09cd\u0995\u09b6\u09bf\u099f (PDF) \u09a1\u09be\u0989\u09a8\u09b2\u09cb\u09a1 \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964')}",
  "                      style={{ padding: '6px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #c7d2fe', backgroundColor: '#ffffff', color: '#1e3a8a', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}",
  "                    >",
  "                      \u09ae\u09be\u09b0\u09cd\u0995\u09b6\u09bf\u099f \u09a1\u09be\u0989\u09a8\u09b2\u09cb\u09a1 (PDF)",
  "                    </button>",
  "                  </div>",
  "                </div>",
  "              );",
  "            })()}"
];

// Replace lines from rollSearchBarLine to resultEndLine (inclusive)
lines.splice(rollSearchBarLine, resultEndLine - rollSearchBarLine + 1, ...newSection);
console.log('SUCCESS: Modal search section replaced!');

// Write back
fs.writeFileSync('src/components/SchoolPublicWebsite.jsx', lines.join('\n'), 'utf8');
console.log('File written successfully!');
