const fs = require('fs');
let content = fs.readFileSync('src/components/SchoolPublicWebsite.jsx', 'utf8');
const lines = content.split('\n');

// Find hero section start and end
let heroStart = -1;
let heroEnd = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('{/* Hero Section */}')) {
    heroStart = i;
  }
  // Find the end: the section ends before the next section (Campus Showcase starts a new block)
  if (heroStart > 0 && i > heroStart && lines[i].includes('{/* Campus Showcase')) {
    heroEnd = i - 1;
    break;
  }
}

console.log('Hero start:', heroStart + 1);
console.log('Hero end (before Campus Showcase):', heroEnd + 1);

// Also include the CTA closing tags until the Campus Showcase div
// Actually let's find: after the CTA buttons section ends
// Let's find specifically where the two buttons block ends (before Campus Showcase comment)
// That should be just before line with {/* Campus Showcase

const newHero = [
  "      {/* ===== HERO SECTION — PREMIUM REDESIGN ===== */}",
  "      <section style={{",
  "        position: 'relative',",
  "        padding: '80px 24px 90px',",
  "        background: 'linear-gradient(135deg, #0a0f2c 0%, #0d1b4b 25%, #0f1f5c 50%, #0c1645 75%, #070d2a 100%)',",
  "        overflow: 'hidden'",
  "      }}>",
  "",
  "        {/* Animated Background Gradient Orbs */}",
  "        <div style={{",
  "          position: 'absolute', top: '-150px', left: '-100px',",
  "          width: '700px', height: '700px', borderRadius: '50%',",
  "          background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)',",
  "          filter: 'blur(60px)', animation: 'floatOrb 8s ease-in-out infinite', pointerEvents: 'none'",
  "        }} />",
  "        <div style={{",
  "          position: 'absolute', top: '60px', right: '-80px',",
  "          width: '500px', height: '500px', borderRadius: '50%',",
  "          background: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)',",
  "          filter: 'blur(60px)', animation: 'floatOrb 11s ease-in-out infinite reverse', pointerEvents: 'none'",
  "        }} />",
  "        <div style={{",
  "          position: 'absolute', bottom: '-80px', left: '35%',",
  "          width: '600px', height: '400px', borderRadius: '50%',",
  "          background: 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)',",
  "          filter: 'blur(70px)', animation: 'floatOrb 13s ease-in-out infinite 2s', pointerEvents: 'none'",
  "        }} />",
  "        <div style={{",
  "          position: 'absolute', top: '40%', left: '60%',",
  "          width: '350px', height: '350px', borderRadius: '50%',",
  "          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',",
  "          filter: 'blur(50px)', animation: 'floatOrb 9s ease-in-out infinite 1s', pointerEvents: 'none'",
  "        }} />",
  "",
  "        {/* Subtle Grid Pattern Overlay */}",
  "        <div style={{",
  "          position: 'absolute', inset: 0, pointerEvents: 'none',",
  "          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,",
  "          backgroundSize: '60px 60px'",
  "        }} />",
  "",
  "        {/* Diagonal Shimmer Line */}",
  "        <div style={{",
  "          position: 'absolute', top: 0, left: '-100%', width: '60%', height: '100%',",
  "          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)',",
  "          animation: 'shimmerSlide 6s linear infinite', pointerEvents: 'none'",
  "        }} />",
  "",
  "        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>",
  "",
  "          {/* Glowing Top Badge */}",
  "          <div style={{",
  "            display: 'inline-flex', alignItems: 'center', gap: '10px',",
  "            padding: '8px 22px', borderRadius: '9999px',",
  "            background: 'rgba(99,102,241,0.15)',",
  "            border: '1px solid rgba(165,180,252,0.35)',",
  "            color: '#a5b4fc', fontSize: '0.82rem', fontWeight: 700,",
  "            marginBottom: '28px',",
  "            boxShadow: '0 0 24px rgba(99,102,241,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',",
  "            backdropFilter: 'blur(8px)'",
  "          }}>",
  "            <span style={{ animation: 'pulse 2s infinite', display: 'inline-block' }}>✦</span>",
  "            <span>জ্ঞানই আলো • ঢাকা শিক্ষা বোর্ড ও NCTB অনুমোদিত শ্রেষ্ঠ বিদ্যাপীঠ</span>",
  "            <span style={{ animation: 'pulse 2s infinite 0.5s', display: 'inline-block' }}>✦</span>",
  "          </div>",
  "",
  "          {/* Main Heading */}",
  "          <h1 style={{",
  "            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 4rem)',",
  "            fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.03em',",
  "            color: '#ffffff', maxWidth: '1000px', margin: '0 auto 12px'",
  "          }}>",
  "            সুশিক্ষা, শৃঙ্খলা ও নৈতিকতায় গড়া,",
  "            <br />",
  "            <span style={{",
  "              background: 'linear-gradient(90deg, #818cf8 0%, #38bdf8 35%, #34d399 65%, #818cf8 100%)',",
  "              backgroundSize: '200% auto',",
  "              WebkitBackgroundClip: 'text',",
  "              WebkitTextFillColor: 'transparent',",
  "              animation: 'gradientShift 4s linear infinite'",
  "            }}>মেধাবী ভবিষ্যতের আদর্শ বিদ্যাপীঠ।</span>",
  "          </h1>",
  "",
  "          {/* Sub-Heading */}",
  "          <p style={{",
  "            fontSize: '1.05rem', color: 'rgba(203,213,225,0.85)',",
  "            maxWidth: '760px', margin: '0 auto 36px', lineHeight: 1.75",
  "          }}>",
  "            স্বাগতম <strong style={{ color: '#a5b4fc' }}>{INSTITUTION.name}</strong>-এ। ১৯৬৫ সাল থেকে প্রতিষ্ঠিত এই বিদ্যাপীঠে জাতীয় শিক্ষাক্রম ও ঢাকা শিক্ষা বোর্ডের অধীনে প্রাক-প্রাথমিক থেকে দ্বাদশ শ্রেণি পর্যন্ত শ্রেষ্ঠ ফলাফল নিশ্চিতকারী পাঠদান পরিচালিত হচ্ছে।",
  "          </p>",
  "",
  "          {/* CTA Buttons */}",
  "          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}>",
  "            <a",
  "              href=\"#facilities\"",
  "              style={{",
  "                textDecoration: 'none', padding: '14px 28px', borderRadius: '12px',",
  "                backgroundColor: 'rgba(255,255,255,0.08)',",
  "                border: '1.5px solid rgba(255,255,255,0.2)',",
  "                color: '#e2e8f0', fontSize: '0.92rem', fontWeight: 700,",
  "                backdropFilter: 'blur(10px)',",
  "                transition: 'all 0.2s ease',",
  "                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'",
  "              }}",
  "              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}",
  "              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}",
  "            >",
  "              🏛️ ক্যাম্পাস সুযোগ-সুবিধা দেখুন",
  "            </a>",
  "            <button",
  "              onClick={onNavigateLogin}",
  "              style={{",
  "                padding: '14px 30px', borderRadius: '12px', border: 'none', cursor: 'pointer',",
  "                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #7c3aed 100%)',",
  "                color: '#ffffff', fontSize: '0.92rem', fontWeight: 700,",
  "                display: 'inline-flex', alignItems: 'center', gap: '10px',",
  "                boxShadow: '0 8px 30px rgba(99,102,241,0.5), 0 0 0 1px rgba(255,255,255,0.1)',",
  "                transition: 'all 0.2s ease',",
  "                animation: 'glowPulse 3s ease-in-out infinite'",
  "              }}",
  "              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.65), 0 0 0 1px rgba(255,255,255,0.15)'; }}",
  "              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(99,102,241,0.5), 0 0 0 1px rgba(255,255,255,0.1)'; }}",
  "            >",
  "              <Lock size={16} />",
  "              <span>শিক্ষক ও শিক্ষার্থী পোর্টাল লগইন</span>",
  "              <ArrowRight size={16} />",
  "            </button>",
  "          </div>",
  "",
  "          {/* Achievement Stats Strip */}",
  "          <div style={{",
  "            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',",
  "            gap: '16px', marginBottom: '50px',",
  "            maxWidth: '900px', margin: '0 auto 50px'",
  "          }}>",
  "            {[",
  "              { value: '৬০+', label: 'বছরের ঐতিহ্য', icon: '🏛️', color: '#818cf8' },",
  "              { value: '৩০,০০০+', label: 'মোট শিক্ষার্থী', icon: '🎓', color: '#38bdf8' },",
  "              { value: '১০০%', label: 'পাসের হার', icon: '🏆', color: '#34d399' },",
  "              { value: '৫০০+', label: 'দক্ষ শিক্ষক', icon: '👨‍🏫', color: '#fb923c' },",
  "              { value: 'A+', label: 'বোর্ড র‍্যাংকিং', icon: '⭐', color: '#f472b6' },",
  "            ].map((stat, i) => (",
  "              <div key={i} style={{",
  "                background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',",
  "                border: '1px solid rgba(255,255,255,0.1)',",
  "                borderRadius: '16px', padding: '20px 16px', textAlign: 'center',",
  "                transition: 'all 0.2s ease',",
  "                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'",
  "              }}",
  "              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}",
  "              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}>",
  "                <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{stat.icon}</div>",
  "                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: stat.color, lineHeight: 1, marginBottom: '4px' }}>{stat.value}</div>",
  "                <div style={{ fontSize: '0.75rem', color: 'rgba(203,213,225,0.75)', fontWeight: 600 }}>{stat.label}</div>",
  "              </div>",
  "            ))}",
  "          </div>",
  "",
];

if (heroStart === -1) {
  console.log('ERROR: Hero section not found!');
  process.exit(1);
}
if (heroEnd === -1) {
  console.log('ERROR: Hero end not found! Let me try another approach...');
  // Try to find where the closing CTA block ends (before Campus Showcase comment)
  for (let i = heroStart; i < lines.length; i++) {
    if (lines[i].includes('Campus Showcase')) {
      heroEnd = i - 1;
      break;
    }
  }
  if (heroEnd === -1) {
    console.log('Could not find end. Searching for CTA closing...');
    process.exit(1);
  }
}

// Replace hero lines heroStart through heroEnd with newHero
lines.splice(heroStart, heroEnd - heroStart + 1, ...newHero);
console.log('SUCCESS: Hero section replaced!');

fs.writeFileSync('src/components/SchoolPublicWebsite.jsx', lines.join('\n'), 'utf8');
console.log('File written!');
