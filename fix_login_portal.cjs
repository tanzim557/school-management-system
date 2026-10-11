const fs = require('fs');
let content = fs.readFileSync('src/components/LoginPortal.jsx', 'utf8');

// 1. Fix placeholder text for admin: 'chairman' -> 'admin'
content = content.replace("'যেমন: chairman'", "'যেমন: admin'");

// 2. Fix badge/panel label for admin role (the 4th else branch)
content = content.replace(
  "'🏛️ গভর্নিং বডি ও প্রশাসন'",
  "'⚙️ সিস্টেম অ্যাডমিন প্যানেল (Full Control)'"
);

// 3. Fix background color for admin tab (4th else in ternary chain)
// Replace: '#f8fafc' (the admin bg at line 681) - this is the fallback color
// We want to keep it as-is since Admin gets the default

// 4. Remove the entire "Administrative Hub Banner" block (lines 990-1048)
// We need to find the start comment and remove to the closing div
const hubStart = '          {/* Administrative Hub Banner: Admission Approval & ID Creation */}';
const hubEndMarker = '          {/* Bottom Link Back to School Public Site */}';

const hubStartIdx = content.indexOf(hubStart);
const hubEndIdx = content.indexOf(hubEndMarker);

if (hubStartIdx !== -1 && hubEndIdx !== -1) {
  content = content.slice(0, hubStartIdx) + '\n' + content.slice(hubEndIdx);
  console.log('SUCCESS: Removed Hub Banner block');
} else {
  console.log('Hub banner block not found. startIdx=' + hubStartIdx + ' endIdx=' + hubEndIdx);
}

// 5. Fix label for admin in: 'প্রশাসনিক ইউজারনেম *' -> 'অ্যাডমিন ইউজারনেম *'
content = content.replace("'প্রশাসনিক ইউজারনেম *'", "'অ্যাডমিন ইউজারনেম (admin) *'");

// 6. Remove unused imports: UserPlus (if still needed elsewhere check)
// Actually let's keep UserPlus - we may want it in admin dashboard

fs.writeFileSync('src/components/LoginPortal.jsx', content, 'utf8');
console.log('SUCCESS: LoginPortal updated successfully!');
