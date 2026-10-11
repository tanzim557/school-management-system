// AI Professor Academic Knowledge Base & Pedagogical Engine
// Designed for Ideal School & College - SchoolPulse SaaS
import { getTwentyQuestionsForSubject, SUBJECT_QUIZ_BANKS } from './quizDatabase.js';

export { getTwentyQuestionsForSubject, SUBJECT_QUIZ_BANKS };

export const PROFESSOR_PROFILE = {
  name: "প্রফেসর ড. শাহরিয়ার রহমান",
  title: "চিফ একাডেমিক এআই ফেলো ও ভার্চুয়াল অধ্যাপক",
  degrees: "Ph.D. in Educational Science & STEM Pedagogy",
  avatar: "‍",
  tagline: "সহজ ভাষায় বিজ্ঞান, গণিত, আইসিটি ও ভাষা শিক্ষার বিশ্বস্ত ডিজিটাল শিক্ষক",
  welcomeMessage: "নমস্কার ও আসসালামু আলাইকুম! আমি প্রফেসর ড. শাহরিয়ার রহমান। জাতীয় শিক্ষাক্রম (NCTB) অনুযায়ী গণিত, পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান, আইসিটি, ইংরেজি ও বাংলা বিষয়ে যেকোনো জটিল ধারণা সহজে বুঝতে আমি তোমাকে সাহায্য করব। কোন বিষয়টি নিয়ে আজ পড়তে চাও?"
};

export const ACADEMIC_SUBJECTS = [
  { id: 'all', name: 'সকল বিষয়', icon: '', color: '#4f46e5' },
  { id: 'math', name: 'গণিত (Mathematics)', icon: '', color: '#0284c7' },
  { id: 'physics', name: 'পদার্থবিজ্ঞান (Physics)', icon: '️', color: '#7c3aed' },
  { id: 'chemistry', name: 'রসায়ন (Chemistry)', icon: '', color: '#059669' },
  { id: 'biology', name: 'জীববিজ্ঞান (Biology)', icon: '', color: '#16a34a' },
  { id: 'ict', name: 'আইসিটি ও কোডিং (ICT)', icon: '', color: '#d97706' },
  { id: 'english', name: 'ইংরেজি (English)', icon: '', color: '#dc2626' },
  { id: 'bangla', name: 'বাংলা ব্যাকরণ (Bangla)', icon: '', color: '#0d9488' },
  { id: 'school', name: 'স্কুল নির্দেশিকা (Campus)', icon: '', color: '#6366f1' }
];

export const TEACHING_MODES = [
  { id: 'concept', label: 'সহজ লেকচার', icon: 'BookOpen', desc: 'বাস্তব উপমা দিয়ে গভীর ও সহজ ব্যাখ্যা' },
  { id: 'solver', label: 'ধাপে ধাপে সমাধান', icon: 'Calculator', desc: 'অঙ্ক ও সমীকরণের লাইন-বাই-লাইন বিশ্লেষণ' },
  { id: 'quiz', label: 'কুইজ ও পরীক্ষা', icon: 'Brain', desc: 'MCQ প্রশ্ন ও তাৎক্ষণিক মেধা মূল্যায়ন' },
  { id: 'exam', label: 'পরীক্ষার টিপস ও সূত্র', icon: 'Award', desc: 'বোর্ড পরীক্ষার সাজেশন ও ফর্মুলা চিটশিট' }
];

// Interactive Quiz Bank
export const QUIZ_BANK = [
  {
    id: 'q-math-1',
    subject: 'math',
    subjectName: 'গণিত',
    question: 'একটি সমকোণী ত্রিভুজের লম্ব ৩ সেমি এবং ভূমি ৪ সেমি হলে, অতিভুজের দৈর্ঘ্য কত?',
    options: ['৫ সেমি', '৬ সেমি', '৭ সেমি', '২৫ সেমি'],
    correctIndex: 0,
    explanation: 'পীথাগোরাসের উপপাদ্য অনুসারে: অতিভুজ² = লম্ব² + ভূমি² = ৩² + ৪² = ৯ + ১৬ = ২৫। সুতরাং অতিভুজ = √২৫ = ৫ সেমি।'
  },
  {
    id: 'q-phy-1',
    subject: 'physics',
    subjectName: 'পদার্থবিজ্ঞান',
    question: 'নিউটনের গতির দ্বিতীয় সূত্র থেকে আমরা কোন ভৌত রাশির পরিমাপ পাই?',
    options: ['বল (Force)', 'জড়তা (Inertia)', 'কাজ (Work)', 'ত্বরণবিহীন বেগ'],
    correctIndex: 0,
    explanation: 'নিউটনের দ্বিতীয় সূত্র বলে: বস্তুর ভরবেগের পরিবর্তনের হার তার উপর প্রযুক্ত বলের সমানুপাতিক (F = ma)। এখান থেকে বলের পরিমাপ ও সমীকরণ পাওয়া যায়।'
  },
  {
    id: 'q-chem-1',
    subject: 'chemistry',
    subjectName: 'রসায়ন',
    question: 'সোডিয়াম (Na, পারমাণবিক সংখ্যা ১১) ক্লোরিন (Cl, ১৭) এর সাথে যুক্ত হয়ে কোন ধরনের রাসায়নিক বন্ধন তৈরি করে?',
    options: ['আয়ন বা তড়িৎযোজী বন্ধন', 'সমযোজী বন্ধন', 'ধাতব বন্ধন', 'হাইড্রোজেন বন্ধন'],
    correctIndex: 0,
    explanation: 'সোডিয়াম তার সর্ববহিঃস্থ স্তরের ১টি ইলেকট্রন ত্যাগ করে Na⁺ ক্যাটায়নে পরিণত হয় এবং ক্লোরিন সেই ইলেকট্রন গ্রহণ করে Cl⁻ অ্যানায়নে পরিণত হয়। বিপরীত আধানযুক্ত আয়নের আকর্ষণে তড়িৎযোজী/আয়ন বন্ধন গঠিত হয়।'
  },
  {
    id: 'q-bio-1',
    subject: 'biology',
    subjectName: 'জীববিজ্ঞান',
    question: 'উদ্ভিদের সালোকসংশ্লেষণ প্রক্রিয়ায় উপজাত (By-product) হিসেবে কোন গ্যাসটি নির্গত হয়?',
    options: ['অক্সিজেন (O₂)', 'কার্বন ডাই অক্সাইড (CO₂)', 'নাইট্রোজেন (N₂)', 'মিথেন (CH₄)'],
    correctIndex: 0,
    explanation: 'সালোকসংশ্লেষণের আলোক পর্যায়ে পানির সালোক-বিভাজন (Photolysis of water) ঘটে এবং উপজাত হিসেবে অক্সিজেন (O₂) নির্গত হয়, যা প্রাণিকুল শ্বাসকার্যে ব্যবহার করে।'
  },
  {
    id: 'q-ict-1',
    subject: 'ict',
    subjectName: 'আইসিটি',
    question: 'Python প্রোগ্রামিং ভাষায় একটি ভেরিয়েবলের ডাটা টাইপ জানতে কোন বিল্ট-ইন ফাংশন ব্যবহৃত হয়?',
    options: ['type()', 'typeof()', 'datatype()', 'printType()'],
    correctIndex: 0,
    explanation: 'Python-এ যেকোনো চলক বা অবজেক্টের শ্রেণি বা টাইপ নির্ধারণের জন্য type(variable_name) ফাংশনটি ব্যবহৃত হয়।'
  },
  {
    id: 'q-eng-1',
    subject: 'english',
    subjectName: 'ইংরেজি',
    question: 'Which sentence is grammatically correct according to the rules of "Right form of verbs"?',
    options: [
      'Neither of the students was present.',
      'Neither of the students were present.',
      'Neither of the students are present.',
      'Neither of the student were present.'
    ],
    correctIndex: 0,
    explanation: '"Neither of" এর পর প্লুরাল নাউন বা প্রোনাউন বসলেও ভার্ব সবসময় সিঙ্গুলার (was/is) হয়। তাই "Neither of the students was present" সঠিক।'
  },
  {
    id: 'q-bang-1',
    subject: 'bangla',
    subjectName: 'বাংলা ব্যাকরণ',
    question: '‘সিংহ চিহ্নিত আসন = সিংহাসন’ — এটি কোন সমাসের উদাহরণ?',
    options: ['মধ্যপদলোপী কর্মধারয়', 'দ্বিগু সমাস', 'দ্বন্দ্ব সমাস', 'বহুব্রীহি সমাস'],
    correctIndex: 0,
    explanation: 'যে কর্মধারয় সমাসে ব্যাসবাক্যের মধ্যস্থিত পদ ‘চিহ্নিত’ লোপ পেয়ে সমস্তপদ গঠিত হয়েছে, তাকে মধ্যপদলোপী কর্মধারয় সমাস বলে।'
  }
];

// Curated Academic Lessons, Problem Solutions, and Suggestions
export const ACADEMIC_KNOWLEDGE_TOPICS = [
  // --- MATHEMATICS ---
  {
    keywords: ['পীথাগোরাস', 'পিথাগোরাস', 'pythagoras', 'অতিভুজ', 'সমকোণী ত্রিভুজ', 'ত্রিভুজ'],
    subject: 'math',
    title: 'পীথাগোরাসের উপপাদ্য ও প্রয়োগ (Pythagoras Theorem)',
    concept: `পীথাগোরাসের উপপাদ্য শুধুমাত্র সমকোণী ত্রিভুজের জন্য প্রযোজ্য। উপপাদ্যটি হলো: 
"একটি সমকোণী ত্রিভুজের অতিভুজের ওপর অঙ্কিত বর্গক্ষেত্রের ক্ষেত্রফল অপর দুই বাহুর ওপর অঙ্কিত বর্গক্ষেত্রদ্বয়ের ক্ষেত্রফলের সমষ্টির সমান।"`,
    formula: `অতিভুজ² = লম্ব² + ভূমি²
(Hypotenuse² = Perpendicular² + Base²)
c² = a² + b²`,
    analogy: ` বাস্তব উদাহরণ: একটি মইকে যদি দেয়ালের সাথে হেলান দিয়ে রাখা হয়, তবে মেঝে থেকে দেয়ালের দূরত্ব হলো ভূমি, দেয়ালের উচ্চতা লম্ব, এবং মইটির দৈর্ঘ্য হলো অতিভুজ। মইটির দৈর্ঘ্য কত হবে তা এই সূত্র দিয়ে সরাসরি বের করা যায়।`,
    stepByStep: `ধাপ ১: প্রদত্ত বাহু দুটি শনাক্ত করুন (যেমন লম্ব a = 3, ভূমি b = 4)।
ধাপ ২: সূত্রে মান বসান: c² = 3² + 4² = 9 + 16 = 25।
ধাপ ৩: উভয় পাশে বর্গমূল নিন: c = √25 = 5 একক।
সুতরাং অতিভুজের দৈর্ঘ্য 5 একক।`,
    proTip: ` প্রফেসরের শর্টকাট টিপ: প্রায়শই পরীক্ষায় পীথাগোরাস ট্রিপলেট (Pythagorean Triplets) আসে: (3, 4, 5), (5, 12, 13), (6, 8, 10), (8, 15, 17)। এগুলো মুখস্থ থাকলে ১ সেকেন্ডে MCQ উত্তর দেওয়া সম্ভব!`,
    practiceQuiz: 'যদি সমকোণী ত্রিভুজের ভূমি ৬ এবং অতিভুজ ১০ হয়, তবে লম্ব কত? (উত্তর: ৮, কারণ ১০² - ৬² = ১০০ - ৩৬ = ৬৪, √৬৪ = ৮)।'
  },
  {
    keywords: ['দ্বিঘাত সমীকরণ', 'quadratic equation', 'ax2+bx+c', 'ঘাত', 'নিশ্চায়ক'],
    subject: 'math',
    title: 'দ্বিঘাত সমীকরণ ও এর সমাধান পদ্ধতি (Quadratic Equations)',
    concept: `দ্বিঘাত সমীকরণের সাধারণ রূপ হলো: ax² + bx + c = 0 (যেখানে a ≠ 0)। এই সমীকরণে অজ্ঞাত রাশির সর্বোচ্চ ঘাত ২, তাই এর সমাধান বা মূল সবসময় দুটি হয়।`,
    formula: `x = [-b ± √(b² - 4ac)] / (2a)
এখানে (b² - 4ac) কে 'নিশ্চায়ক' বা Discriminant (D) বলা হয়।`,
    analogy: ` বাস্তব উদাহরণ: যখন আকাশে একটি ক্রিকেট বল ব্যাট দিয়ে আঘাত করা হয়, বলটির উড্ডয়ন পথ (Trajectory) একটি প্যারাবোলা তৈরি করে যা দ্বিঘাত সমীকরণ মেনে চলে।`,
    stepByStep: `সমস্যা: x² - 5x + 6 = 0 সমাধান করো।
ধাপ ১: সমীকরণের সহগ চিহ্নিত করো: a = 1, b = -5, c = 6।
ধাপ ২: নিশ্চায়ক বের করো: D = (-5)² - 4(1)(6) = 25 - 24 = 1।
ধাপ ৩: সূত্রে মান বসাও: x = [ -(-5) ± √1 ] / (2×1) = [5 ± 1] / 2
x₁ = (5 + 1)/2 = 3 এবং x₂ = (5 - 1)/2 = 2।
নির্ণেয় মূল: x = 2, 3।`,
    proTip: ` প্রফেসরের পরামর্শ: যদি নিশ্চায়ক D > 0 এবং পূর্ণবর্গ হয়, তবে মূলগুলো বাস্তব, অসমান ও মূলদ হবে। D = 0 হলে মূলগুলো বাস্তব ও সমান হবে।`,
    practiceQuiz: 'x² - 4x + 4 = 0 সমীকরণের মূলগুলো কেমন হবে? (উত্তর: সমান এবং বাস্তব, কারণ D = 16 - 16 = 0, মূল x = 2, 2)।'
  },
  {
    keywords: ['ত্রিকোণমিতি', 'trigonometry', 'sin', 'cos', 'tan', 'সাইন', 'কস'],
    subject: 'math',
    title: 'ত্রিকোণমিতির মৌলিক সূত্র ও মান মনে রাখার কৌশল',
    concept: `ত্রিকোণমিতি হলো ত্রিভুজের কোণ ও বাহুর মধ্যকার সম্পর্কের বিজ্ঞান। সমকোণী ত্রিভুজের তিন বাহুকে সূক্ষ্মকোণের সাপেক্ষে অনুপাত দিয়ে প্রকাশ করা হয়।`,
    formula: `• sin θ = লম্ব / অতিভুজ
• cos θ = ভূমি / অতিভুজ
• tan θ = লম্ব / ভূমি
• sin²θ + cos²θ = 1
• sec²θ - tan²θ = 1
• cosec²θ - cot²θ = 1`,
    analogy: ` মনে রাখার জাদুকরি ছন্দ:
- "সাগরে লবণ অনেক" (sin = লম্ব / অতিভুজ)
- "কবরে ভূত অনেক" (cos = ভূমি / অতিভুজ)
- "ট্যারা লম্বা ভূত" (tan = লম্ব / ভূমি)`,
    stepByStep: `ত্রিকোণমিতিক কোণের সাধারণ মান:
• sin 0° = 0, sin 30° = 1/2, sin 45° = 1/√2, sin 60° = √3/2, sin 90° = 1
• cos হলো sin এর বিপরীত অনুক্রম (cos 0° = 1, cos 30° = √3/2...)
• tan θ = sin θ / cos θ।`,
    proTip: ` প্রফেসরের টিপ: পরীক্ষার হলে হাতের ৫ আঙুল দিয়ে 0°, 30°, 45°, 60°, 90° এর sin এবং cos এর মান নিমেষেই বের করে নেওয়া যায়।`,
    practiceQuiz: 'tan 45° এর মান কত? (উত্তর: ১)।'
  },

  // --- PHYSICS ---
  {
    keywords: ['নিউটনের সূত্র', 'newton', 'গতির সূত্র', 'মহাকর্ষ', 'ভরবেগ', 'f=ma'],
    subject: 'physics',
    title: 'নিউটনের গতিসূত্র ও গাণিতিক বিশ্লেষণ (Newton\'s Laws of Motion)',
    concept: `স্যার আইজ্যাক নিউটন ১৬৮৭ সালে তার অমর গ্রন্থ "Philosophiae Naturalis Principia Mathematica"-তে গতির তিনটি মৌলিক সূত্র প্রদান করেন যা ক্লাসিক্যাল বলবিদ্যার ভিত্তি।`,
    formula: `• ১ম সূত্র: বাহ্যিক বল প্রয়োগ না করলে স্থির বস্তু স্থির থাকবে এবং গতিশীল বস্তু সুষম দ্রুতিতে সরলপথে চলতে থাকবে।
• ২য় সূত্র: F = ma (বল = ভর × ত্বরণ)
• ৩য় সূত্র: F₁ = - F₂ (প্রত্যেক ক্রিয়ারই একটি সমান ও বিপরীত প্রতিক্রিয়া আছে)`,
    analogy: ` বাস্তব উদাহরণ:
- ১ম সূত্র: চলন্ত বাস হঠাৎ ব্রেক করলে যাত্রীরা সামনের দিকে ঝুঁকে পড়ে (গতির জড়তা)।
- ৩য় সূত্র: বন্দুক থেকে গুলি ছুড়লে বন্দুক পেছনে ধাক্কা দেয়, অথবা রকেট যখন নিচের দিকে গ্যাস নির্গমন করে তখন রকেট উপরের দিকে ওঠে।`,
    stepByStep: `গাণিতিক সমস্যা: ৫ কেজি ভরের একটি স্থির বস্তুর ওপর ২০ নিউটন বল ৪ সেকেন্ড ধরে প্রয়োগ করা হলো। বস্তুটির ত্বরণ ও ৪ সেকেন্ড পর বেগ কত?
১. ত্বরণ a = F / m = 20 N / 5 kg = 4 m/s²।
২. বেগ v = u + at = 0 + (4 × 4) = 16 m/s।
উত্তর: ত্বরণ 4 m/s² এবং অন্তিম বেগ 16 m/s।`,
    proTip: ` প্রফেসরের নোট: মহাকর্ষ বল (Gravitational force) সবসময় আকর্ষণধর্মী: F = G(m₁m₂)/d²। এখানে মহাকর্ষীয় ধ্রুবক G = 6.673 × 10⁻¹¹ N m² kg⁻²।`,
    practiceQuiz: '১০ কেজি ভরের একটি বস্তুর ওপর বল প্রয়োগে যদি ২ m/s² ত্বরণ সৃষ্টি হয়, তবে প্রযুক্ত বলের মান কত? (উত্তর: ২০ নিউটন, F = ma = 10 × 2)।'
  },
  {
    keywords: ['ওহমের সূত্র', 'বিদ্যুৎ', 'রোধ', 'current', 'voltage', 'ohm', 'v=ir'],
    subject: 'physics',
    title: 'ওহমের সূত্র ও তড়িৎ বর্তনী (Ohm\'s Law & Circuits)',
    concept: `স্থির তাপমাত্রায় কোনো পরিবাহীর মধ্য দিয়ে প্রবাহিত তড়িৎ প্রবাহ (I) পরিবাহীর দুই প্রান্তের বিভব পার্থক্যের (V) সমানুপাতিক।`,
    formula: `V = I × R
বা, I = V / R
যেখানে V = ভোল্টেজ (Volt), I = তড়িৎ প্রবাহ (Ampere), R = রোধ (Ohm, Ω)।`,
    analogy: ` পানির পাইপের সাথে তুলনা: ভোল্টেজ হলো পানির ট্যাংকের চাপ (Water pressure), তড়িৎ প্রবাহ হলো পাইপের পানির ধারা (Water flow), আর রোধ হলো পাইপের মধ্যে থাকা কোনো বাধা বা সরু অংশ যা পানি প্রবাহে বিঘ্ন ঘটায়।`,
    stepByStep: `তুল্য রোধ নির্ণয়:
• শ্রেণি সমবায় (Series): R_s = R₁ + R₂ + R₃ + ...
• সমান্তরাল সমবায় (Parallel): 1/R_p = 1/R₁ + 1/R₂ + 1/R₃ + ...`,
    proTip: ` প্রফেসরের টিপ: আমাদের বাসাবাড়ির বৈদ্যুতিক লাইনে সকল যন্ত্রপাতি সমান্তরাল সমবায়ে (Parallel) যুক্ত থাকে, যাতে প্রতিটি যন্ত্র সম্পূর্ণ ২২০ ভোল্ট পায় এবং এক সুইচে অন্যটি বন্ধ না হয়!`,
    practiceQuiz: '২২০ ভোল্টের একটি লাইনে ৫ অ্যাম্পিয়ার কারেন্ট প্রবাহিত হলে বর্তনীর রোধ কত? (উত্তর: ৪৪ ওহম, R = 220 / 5 = 44 Ω)।'
  },

  // --- CHEMISTRY ---
  {
    keywords: ['পর্যায় সারণি', 'পর্যায়', 'গ্রুপ', 'periodic table', 'মৌল', 'যোজ্যতা'],
    subject: 'chemistry',
    title: 'আধুনিক পর্যায় সারণি ও মৌলসমূহের ধর্ম (Periodic Table)',
    concept: `আধুনিক পর্যায় সারণি মৌলসমূহের পারমাণবিক সংখ্যার ক্রমানুসারে সাজানো হয়েছে। এতে ৭টি পর্যায় (Period) এবং ১৮টি গ্রুপ (Group) রয়েছে।`,
    formula: `পর্যাবৃত্ত ধর্মসমূহের পরিবর্তন:
• একই পর্যায়ে বাম থেকে ডানে গেলে: পারমাণবিক ব্যাসার্ধ হ্রাস পায়, আয়নীকরণ শক্তি বৃদ্ধি পায়, তড়িৎ ঋণাত্মকতা বৃদ্ধি পায়।
• একই গ্রুপে উপর থেকে নিচে নামলে: নতুন শক্তিস্তর যুক্ত হওয়ায় পারমাণবিক আকার বৃদ্ধি পায়, কিন্তু ধাতব ধর্ম বৃদ্ধি পায়।`,
    analogy: ` সহজ উপমা: পর্যায় সারণি যেন একটি মেগা শপিং মলের তাক। একই গ্রুপের মৌলগুলোর আচরণ একই রকম (যেমন গ্রুপ-১ এর ক্ষার ধাতুগুলো সবাই পানির সাথে দ্রুত বিক্রিয়া করে হাইড্রোজেন গ্যাস দেয়)।`,
    stepByStep: `ইলেকট্রন বিন্যাসের নীতি (Aufbau Principle):
ইলেকট্রন প্রথমে সর্বনিম্ন শক্তিস্তরে প্রবেশ করে। শক্তির ক্রম: 1s < 2s < 2p < 3s < 3p < 4s < 3d...
উদাহরণ: Fe(26) = 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶।`,
    proTip: ` প্রফেসরের টিপ: নিষ্ক্রিয় গ্যাসগুলো গ্রুপ ১৮-তে অবস্থিত (He, Ne, Ar, Kr, Xe, Rn)। এদের অষ্টক পূর্ণ থাকায় এরা রাসায়নিকভাবে নিষ্ক্রিয়।`,
    practiceQuiz: 'পর্যায় সারণির সবচেয়ে বেশি তড়িৎ ঋণাত্মক (Electronegative) মৌল কোনটি? (উত্তর: ফ্লোরিন, Fluorine - ৪.০)।'
  },
  {
    keywords: ['রাসায়নিক বন্ধন', 'সমযোজী', 'আয়ন', 'bonding', 'covalent', 'ionic'],
    subject: 'chemistry',
    title: 'রাসায়নিক বন্ধন: আয়ন বনাম সমযোজী বন্ধন (Chemical Bonding)',
    concept: `পরমাণুসমূহ স্থিতিশীল ইলেকট্রন বিন্যাস (নিষ্ক্রিয় গ্যাসের অষ্টক বা দ্বিত্ব) অর্জনের জন্য নিজেদের মধ্যে ইলেকট্রন আদান-প্রদান বা শেয়ারের মাধ্যমে যে আকর্ষণে আবদ্ধ হয়, তাকে রাসায়নিক বন্ধন বলে।`,
    formula: `• আয়ন বন্ধন = ধাতু + অধাতু (ইলেকট্রন দান ও গ্রহণের মাধ্যমে গঠিত)। যেমন: NaCl, MgO।
• সমযোজী বন্ধন = অধাতু + অধাতু (ইলেকট্রন জোড় শেয়ারের মাধ্যমে গঠিত)। যেমন: H₂O, CH₄, CO₂।`,
    analogy: ` বাস্তব উপমা: আয়ন বন্ধন হলো একজন সম্পূর্ণভাবে কিছু দান করে দেওয়া এবং অপরজন তা গ্রহণ করা। আর সমযোজী বন্ধন হলো দুজন অংশীদার মিলে সমান অর্থ দিয়ে যৌথ ব্যবসা (Partnership) করার মতো!`,
    stepByStep: `পানি (H₂O) এর সমযোজী বন্ধন গঠন:
১. অক্সিজেন পরমাণুর শেষ স্তরে ৬টি ইলেকট্রন আছে (অষ্টক পূরণে ২টি প্রয়োজন)।
২. দুটি হাইড্রোজেন পরমাণু তাদের ১টি করে ইলেকট্রন শেয়ার করে।
৩. ফলে অক্সিজেন ও হাইড্রোজেনের মধ্যে দুটি একক সমযোজী বন্ধন (O-H) গঠিত হয়।`,
    proTip: ` প্রফেসরের টিপ: আয়ন যৌগসমূহ সাধারণত পানিতে দ্রবণীয় এবং জলীয় দ্রবণে বিদ্যুৎ পরিবহন করে, কিন্তু সমযোজী যৌগসমূহ অপোলার দ্রাবকে দ্রবীভূত হয় এবং বিদ্যুৎ পরিবহন করে না।`,
    practiceQuiz: 'মিথেন (CH₄) গ্যাসে কতটি সমযোজী বন্ধন রয়েছে? (উত্তর: ৪টি एकल সমযোজী বন্ধন)।'
  },

  // --- BIOLOGY ---
  {
    keywords: ['সালোকসংশ্লেষণ', 'photosynthesis', 'ক্লোরোফিল', 'সূর্যালোক', 'গ্লুকোজ'],
    subject: 'biology',
    title: 'সালোকসংশ্লেষণ প্রক্রিয়া ও উদ্ভিদের খাদ্য তৈরি (Photosynthesis)',
    concept: `যে জৈব-রাসায়নিক প্রক্রিয়ায় সবুজ উদ্ভিদ ক্লোরোফিলের সহায়তায় সূর্যালোকের ফোটন শক্তি ব্যবহার করে পরিবেশের পানি (H₂O) এবং কার্বন ডাই-অক্সাইড (CO₂) থেকে শর্করা বা গ্লুকোজ তৈরি করে এবং উপজাত হিসেবে অক্সিজেন নির্গত করে, তাকে সালোকসংশ্লেষণ বলে।`,
    formula: `6CO₂ + 12H₂O + [সূর্যালোক ও ক্লোরোফিল]  C₆H₁₂O₆ + 6H₂O + 6O₂ ↑
(কার্বন ডাই অক্সাইড + পানি  গ্লুকোজ + পানি + অক্সিজেন)`,
    analogy: ` রান্নাঘরের সাথে তুলনা: উদ্ভিদের পাতা হলো তাদের 'রান্নাঘর' (Kitchen), ক্লোরোপ্লাস্ট হলো চুলার মতো, সূর্যালোক হলো রান্নার তাপশক্তি, পানি ও বাতাস হলো কাঁচামাল, আর সুস্বাদু খাবার হলো গ্লুকোজ!`,
    stepByStep: `প্রক্রিয়াটির দুটি প্রধান পর্যায়:
১. আলোক-নির্ভর পর্যায় (Light Reaction): থাইলাকয়েডে সংঘটিত হয়। পানির ফটোলাইসিস ঘটে এবং ATP ও NADPH₂ উৎপন্ন হয়।
২. আলোক-নিরপেক্ষ পর্যায় (Dark Reaction / Calvin Cycle): স্ট্রোমাতে সংঘটিত হয়। এখানে কার্বন ডাই-অক্সাইড বিজারণের মাধ্যমে প্রকৃত গ্লুকোজ উৎপন্ন হয়।`,
    proTip: ` পরীক্ষার কমন প্রশ্ন: লাল ও নীল আলোতে সালোকসংশ্লেষণের হার সর্বোচ্চ হয়, কিন্তু সবুজ আলোতে সবচেয়ে কম হয় কারণ ক্লোরোফিল সবুজ আলো প্রতিফলিত করে দেয়।`,
    practiceQuiz: 'সালোকসংশ্লেষণের আলোক পর্যায়ে উৎপন্ন রাসায়নিক শক্তি কোন অণুতে সঞ্চিত থাকে? (উত্তর: ATP এবং NADPH₂)।'
  },
  {
    keywords: ['কোষ বিভাজন', 'মাইটোসিস', 'মিয়োসিস', 'mitosis', 'meiosis', 'cell division'],
    subject: 'biology',
    title: 'কোষ বিভাজন: মাইটোসিস ও মিয়োসিস এর তুলনামূলক বিশ্লেষণ',
    concept: `জীবদেহের বৃদ্ধি ও প্রজননের জন্য কোষ বিভাজন অত্যন্ত জরুরি। জীবদেহে প্রধানত দুই ধরণের কোষ বিভাজন দেখা যায়: মাইটোসিস (সমীকরণিক বিভাজন) এবং মিয়োসিস (হ্রাসমূলক বিভাজন)।`,
    formula: `• মাইটোসিস: ১টি মাতৃকোষ  ২টি অপত্য কোষ (ক্রোমোজোম সংখ্যা অপরিবর্তিত থাকে: 2n  2n)।
• মিয়োসিস: ১টি মাতৃকোষ  ৪টি অপত্য কোষ (ক্রোমোজোম সংখ্যা অর্ধেক হয়ে যায়: 2n  n)।`,
    analogy: ` বাস্তব উপমা: মাইটোসিস যেন একটি কাগজের হুবহু ফটোকপি (Photocopy), আর মিয়োসিস হলো লটারির প্যাকেজ যেখানে পিতা ও মাতার বৈশিষ্ট্যের মিশ্রণ (Crossing over) ঘটিয়ে নতুন বৈচিত্র্য তৈরি হয়।`,
    stepByStep: `মাইটোসিসের ৫টি পর্যায়:
১. প্রোফেজ (Prophase) - ক্রোমাটিন জালিকা ঘনীভূত হয়।
২. প্রো-মেটাফেজ (Prometaphase) - স্পিন্ডল যন্ত্রের সৃষ্টি।
৩. মেটাফেজ (Metaphase) - ক্রোমোজোম বিষুবীয় অঞ্চলে অবস্থান নেয় (সবচেয়ে খাটো ও মোটা)।
৪. অ্যানাফেজ (Anaphase) - সেন্ট্রোমিয়ার বিভক্ত হয়ে ক্রোমাটিড দুটি বিপরীত মেরুতে ধাবিত হয়।
৫. টেলোফেজ (Telophase) - অপত্য নিউক্লিয়াসের পুনর্গঠন ঘটে।`,
    proTip: ` মনে রাখার দারুণ ট্রিক: PMAT (Prophase, Metaphase, Anaphase, Telophase)! মিয়োসিসের প্যাকাইটিন উপ-পর্যায়ে ক্রসিং ওভার ঘটে বলেই সন্তানের চেহারা হুবহু মা বা বাবার মতো না হয়ে কিছুটা ভিন্ন হয়।`,
    practiceQuiz: 'মানবদেহের জনন মাতৃকোষে কোন ধরনের বিভাজন ঘটে? (উত্তর: মিয়োসিস বিভাজন)।'
  },

  // --- ICT ---
  {
    keywords: ['পাইথন', 'python', 'loop', 'লুপ', 'ফাংশন', 'কোডিং', 'প্রোগ্রামিং'],
    subject: 'ict',
    title: 'Python প্রোগ্রামিং: লুপ (For/While) ও ফাংশন তৈরি',
    concept: `পাইথন একটি অত্যন্ত জনপ্রিয়, সহজে পঠনযোগ্য উচ্চস্তরের প্রোগ্রামিং ভাষা। একই কাজ বারবার করার জন্য লুপ (Loops) এবং কোডকে পুনঃব্যবহারযোগ্য করতে ফাংশন (Functions) ব্যবহার করা হয়।`,
    formula: `def function_name(parameter):
    # কোড ব্লক
    return result`,
    analogy: ` বাস্তব উপমা: লুপ হলো ওয়াশিং মেশিনের টাইমারের মতো—যতক্ষণ নির্ধারিত চক্কর শেষ না হচ্ছে, ততক্ষণ মেশিন কাপড় ধোয়ার কাজ পুনরাবৃত্তি করতে থাকে।`,
    stepByStep: `উদাহরণ ১: ১ থেকে ৫ পর্যন্ত যোগফল নির্ণয়ের পাইথন কোড:
\`\`\`python
total = 0
for i in range(1, 6):
    total += i
print("মোট যোগফল:", total) # আউটপুট: ১৫
\`\`\`

উদাহরণ ২: একটি সংখ্যার বর্গ নির্ণয়ের ফাংশন:
\`\`\`python
def square(number):
    return number * number

print(square(7)) # আউটপুট: 49
\`\`\``,
    proTip: ` প্রফেসরের কোডিং টিপ: পাইথনে ইনডেন্টেশন (Indentation/৪টি স্পেস) অত্যন্ত গুরুত্বপূর্ণ। সঠিক ইনডেন্টেশন না দিলে IndentationError দেখাবে।`,
    practiceQuiz: 'range(1, 10, 2) এর আউটপুটে কোন সংখ্যাগুলো আসবে? (উত্তর: 1, 3, 5, 7, 9 - কারণ স্টেপ সাইজ ২)।'
  },
  {
    keywords: ['লজিক গেট', 'logic gate', 'and gate', 'or gate', 'not gate', 'বাইনারি'],
    subject: 'ict',
    title: 'মৌলিক লজিক গেট ও ট্রুথ টেবিল (Logic Gates & Truth Tables)',
    concept: `ডিজিটাল ইলেকট্রনিক্সের মূল ভিত্তি হলো লজিক গেট। এগুলো বুলিয়ান অ্যালজেবরার ওপর ভিত্তি করে শূন্য (0) ও এক (1) লজিকে কাজ করে।`,
    formula: `• AND Gate (গুণ): Y = A · B (সব ইনপুট ১ হলে আউটপুট ১ হবে)
• OR Gate (যোগ): Y = A + B (যেকোনো একটি ইনপুট ১ হলে আউটপুট ১ হবে)
• NOT Gate (বিপরীতকরণ): Y = Ā (ইনপুট ১ হলে আউটপুট ০, ইনপুট ০ হলে আউটপুট ১)
• সার্বজনীন গেট: NAND এবং NOR গেট।`,
    analogy: ` সুইচের সার্কিট উপমা: 
- AND গেট হলো সিরিজে যুক্ত দুটি সুইচ (দুটি সুইচই অন করলে বাতি জ্বলবে)।
- OR গেট হলো প্যারালালে যুক্ত দুটি সুইচ (যেকোনো একটি সুইচ অন করলেই বাতি জ্বলবে)।`,
    stepByStep: `NAND গেট ট্রুথ টেবিল:
A | B | A·B | NAND (Ā·B)
0 | 0 |  0  |  1
0 | 1 |  0  |  1
1 | 0 |  0  |  1
1 | 1 |  1  |  0`,
    proTip: ` ডি মরগ্যানের সূত্র (De Morgan's Theorem) প্রায়শই বোর্ড পরীক্ষায় আসে:
1) (A + B)' = A' · B'
2) (A · B)' = A' + B'`,
    practiceQuiz: 'কোন দুটি গেটকে ডিজিটাল সার্কিটের সার্বজনীন গেট (Universal Gate) বলা হয়? (উত্তর: NAND এবং NOR গেট)।'
  },

  // --- ENGLISH ---
  {
    keywords: ['right form of verbs', 'verb', 'grammar', 'ইংরেজি গ্রামার', 'tense'],
    subject: 'english',
    title: 'Right Form of Verbs: শীর্ষ ৫টি স্বর্ণালী নিয়ম (Golden Rules)',
    concept: `Subject-Verb Agreement এবং বাক্যের সময়কাল (Tense) অনুসারে সঠিক ভার্ব নির্বাচন করাকে Right Form of Verbs বলে।`,
    formula: `Rule 1: Subject Singular  Verb Singular; Subject Plural  Verb Plural.
Rule 2: As well as, along with, together with থাকলে ১ম Subject অনুসারে Verb বসে।
Rule 3: One of the / Each of / Neither of + Plural Noun + Singular Verb।
Rule 4: By the time / Before / After এর ক্ষেত্রে Past Perfect এর ব্যবহার।
Rule 5: It is high time / Wish থাকলে মূল Verb এর Past Form (V2) বসে।`,
    analogy: ` মনে রাখার দারুণ ট্রিক: "ডাক্তার আসিবার পূর্বে রোগীটি মারা গেল"  The patient had died before the doctor came. 
(বিফোর এর পূর্বে Had + V3, আফটার এর পরে Had + V3)।`,
    stepByStep: `বাস্তব উদাহরণ ও শুদ্ধ রূপ:
১. ভুল: One of my friends are going abroad.
   শুদ্ধ: One of my friends IS going abroad. (One of এর কারণে singular)।
২. ভুল: It is high time we stop corruption.
   শুদ্ধ: It is high time we STOPPED corruption.
৩. ভুল: He as well as his brothers are responsible.
   শুদ্ধ: He as well as his brothers IS responsible. (He অনুসারে verb)।`,
    proTip: ` প্রফেসরের নোট: Lest শব্দটি থাকলে পরবর্তী Clause-এ Subject-এর পর "should" বসে এবং negative word ব্যবহার করা যায় না। যেমন: Walk fast lest you should miss the train.`,
    practiceQuiz: 'Neither of the proposals (was / were) accepted — কোনটি সঠিক? (উত্তর: was সঠিক)।'
  },

  // --- BANGLA ---
  {
    keywords: ['সমাস', 'সমাসের নিয়ম', 'দ্বন্দ্ব', 'দ্বিগু', 'কর্মধারয়', 'বহুব্রীহি'],
    subject: 'bangla',
    title: 'বাংলা ব্যাকরণ: সমাস চেনার সহজ ও নির্ভুল টেকনিক',
    concept: `অর্থের দিক দিয়ে পরস্পর সম্পর্কযুক্ত দুই বা ততোধিক পদ এক পদে পরিণত হওয়াকে সমাস বলে। সমাস প্রধানত ৬ প্রকার।`,
    formula: `সমাস চেনার গোপন ট্রিক:
• দ্বন্দ্ব সমাস: উভয় পদের অর্থ প্রাধান্য পায় (মা ও বাবা = মা-বাবা)।
• দ্বিগু সমাস: শুরুতে সংখ্যাবাচক শব্দ থাকে এবং সমাহার বোঝায় (তিন কালের সমাহার = ত্রিকাল)।
• তৎপুরুষ সমাস: পূর্বপদের বিভক্তি লোপ পায় (দুঃখকে প্রাপ্ত = দুঃখপ্রাপ্ত)।
• কর্মধারয় সমাস: পরপদের অর্থ প্রধান থাকে এবং তুলনা বোঝায় (নীল যে পদ্ম = নীলপদ্ম)।
• বহুব্রীহি সমাস: পূর্ব বা পরপদ কোনোটির অর্থ না বুঝিয়ে ভিন্ন ব্যক্তি/বস্তু বোঝায় (দশ আনন যার = দশানন/রাবণ)।
• অব্যয়ীভাব সমাস: পূর্বপদে অব্যয় বসে এবং অব্যয়ের অর্থ প্রধান হয় (কণ্ঠের সমীপে = উপকণ্ঠ)।`,
    analogy: ` সহজ ছন্দ: 
"দ্বন্দ্ব-তে উভয় পদ, দিগুতে সংখ্যা সমাহার;
তৎপুরুষে বিভক্তি লোপ, কর্মধারয়ে পরপদ সার;
অন্য পদ বহুব্রীহিতে, অব্যয়ে অব্যয়ই অবতার!"`,
    stepByStep: `অনুশীলন উদাহরণ:
১. নদীমাতৃক  নদী মাতা যার (বহুব্রীহি সমাস — নদী বা মাতা নয়, দেশকে বোঝাচ্ছে)।
২. পলান্ন  পল মিশ্রিত অন্ন (মধ্যপদলোপী কর্মধারয়)।
৩. হাতাহাতি  হাতে হাতে যে যুদ্ধ (ব্যতিহার বহুব্রীহি)।`,
    proTip: ` প্রফেসরের পরামর্শ: বহুব্রীহি ও দ্বিগু সমাসের মধ্যে প্রায়ই ভুল হয়। যেমন: 'চৌরাস্তা' চার রাস্তার সমাহার বোঝায় বলে দ্বিগু, কিন্তু 'চৌচালা' চার চাল বিশিষ্ট ঘরকে বোঝায় বলে বহুব্রীহি সমাস!`,
    practiceQuiz: '‘গায়ে হলুদ দেওয়া হয় যে অনুষ্ঠানে = গায়ে-হলুদ’ — এটি কোন সমাস? (উত্তর: অলুক বহুব্রীহি সমাস)।'
  }
];

// Quick Prompts categorized by subjects
export const PROFESSOR_QUICK_PROMPTS = [
  { text: "পীথাগোরাসের উপপاد্য বুঝিয়ে দিন ও অঙ্ক সমাধান করুন", subject: "math" },
  { text: "নিউটনের ৩য় সূত্র ও বাস্তব জীবনের উপমা", subject: "physics" },
  { text: "সালোকসংশ্লেষণ প্রক্রিয়ার আলোক ও অন্ধকার পর্যায়", subject: "biology" },
  { text: "আয়ন বন্ধন ও সমযোজী বন্ধনের মূল পার্থক্য", subject: "chemistry" },
  { text: "Right form of verbs-এর সবচেয়ে গুরুত্বপূর্ণ ৫টি নিয়ম", subject: "english" },
  { text: "পাইথনে লুপ এবং ফাংশন কীভাবে লিখতে হয়?", subject: "ict" },
  { text: "সমাস চেনার সবচেয়ে সহজ শর্টকাট টেকনিক কী?", subject: "bangla" },
  { text: "২০২৬ শিক্ষাবর্ষে ডিজিটাল লটারি ও ভর্তি নির্দেশিকা", subject: "school" }
];

// Professor Intelligent Query Engine
export function generateProfessorResponse(query, subject = 'all', mode = 'concept') {
  const normalized = query.trim().toLowerCase();

  // Mode: QUIZ explicitly requested - always provide 20 questions together
  if (mode === 'quiz' || normalized.includes('কুইজ') || normalized.includes('quiz') || normalized.includes('mcq') || normalized.includes('পরীক্ষা')) {
    let targetSubject = subject;
    if (targetSubject === 'all') {
      for (const s of ACADEMIC_SUBJECTS) {
        if (s.id !== 'all' && (normalized.includes(s.id) || normalized.includes(s.name.toLowerCase()))) {
          targetSubject = s.id;
          break;
        }
      }
    }
    const questions20 = getTwentyQuestionsForSubject(targetSubject);
    const subjObj = ACADEMIC_SUBJECTS.find(s => s.id === targetSubject) || ACADEMIC_SUBJECTS[0];

    return {
      type: 'quiz_set_20',
      title: ` ২০টি বহুনির্বাচনী কুইজ মডেল টেস্ট: ${subjObj.name}`,
      subject: targetSubject,
      subjectName: subjObj.name,
      quizSet: questions20,
      totalCount: questions20.length,
      professorNote: `চমৎকার চ্যালেঞ্জ! তোমার অনুরোধ অনুযায়ী এক সাথে ২০টি বহুনির্বাচনী প্রশ্ন (MCQ) প্রস্তুত করা হয়েছে। প্রতিটি প্রশ্ন সমাধান করে সাবমিট করো, সাথে সাথে সম্পূর্ণ ফলাফল, গ্রেড এবং প্রতিটি প্রশ্নের বিশদ ব্যাখ্যা পেয়ে যাবে!`
    };
  }

  // Find best matched topic in Knowledge Base
  let matchedTopic = ACADEMIC_KNOWLEDGE_TOPICS.find(topic => {
    return topic.keywords.some(kw => {
      const kwLower = kw.toLowerCase();
      if (normalized.includes(kwLower)) return true;
      const tokens = kwLower.split(/\s+/).filter(t => t.length >= 2);
      if (tokens.length > 1) {
        return tokens.every(t => normalized.includes(t));
      }
      return false;
    });
  });

  // Also match by subject if user is focused on a subject and asks a related question
  if (!matchedTopic && subject !== 'all') {
    const subjectTopics = ACADEMIC_KNOWLEDGE_TOPICS.filter(t => t.subject === subject);
    if (subjectTopics.length > 0) {
      matchedTopic = subjectTopics.find(st => {
        return st.keywords.some(kw => {
          const parts = kw.split(/\s+/);
          return parts.some(p => p.length >= 3 && normalized.includes(p.toLowerCase()));
        });
      }) || subjectTopics[0];
    }
  }

  // If found matching curated topic
  if (matchedTopic) {
    if (mode === 'solver' && matchedTopic.stepByStep) {
      return {
        type: 'solver',
        title: ` গাণিতিক ও ধাপভিত্তিক বিশ্লেষণ: ${matchedTopic.title}`,
        subject: matchedTopic.subject,
        content: matchedTopic.stepByStep,
        formula: matchedTopic.formula,
        proTip: matchedTopic.proTip,
        followUp: `আরও অনুশীলনের জন্য তুমি এই বিষয়ের একটি কুইজ সমাধান করতে পারো!`
      };
    }

    if (mode === 'exam') {
      return {
        type: 'exam',
        title: ` বোর্ড পরীক্ষার প্রস্তুতি ও টিপস: ${matchedTopic.title}`,
        subject: matchedTopic.subject,
        content: matchedTopic.proTip,
        formula: matchedTopic.formula,
        proTip: `বোর্ড পরীক্ষার সৃজনশীল ও MCQ অংশে এই টপিক থেকে নিয়মিত প্রশ্ন আসে। বিশেষ করে সূত্র এবং এককগুলো ভালো করে রিভিশন দাও।`,
        followUp: `তোমার কি এই টপিকের কোনো নির্দিষ্ট অঙ্কে সমস্যা হচ্ছে? প্রশ্ন লিখে পাঠাও!`
      };
    }

    // Default concept mode
    return {
      type: 'concept',
      title: ` প্রফেসরের লেকচার: ${matchedTopic.title}`,
      subject: matchedTopic.subject,
      content: matchedTopic.concept,
      analogy: matchedTopic.analogy,
      formula: matchedTopic.formula,
      stepByStep: matchedTopic.stepByStep,
      proTip: matchedTopic.proTip,
      practiceQuiz: matchedTopic.practiceQuiz,
      followUp: `তুমি কি এই বিষয়ের ওপর একটি তাৎক্ষণিক কুইজ দিতে চাও? নিচের 'কুইজ ও পরীক্ষা' ট্যাবে ক্লিক করো!`
    };
  }

  // Check School Pulse Campus inquiries
  if (normalized.includes('ভর্তি') || normalized.includes('admission') || normalized.includes('লটারি')) {
    return {
      type: 'school',
      title: ' ২০২৬ শিক্ষাবর্ষে ডিজিটাল ভর্তি নির্দেশিকা',
      subject: 'school',
      content: `আইডিয়াল স্কুল অ্যান্ড কলেজে ১লা হতে ৯ম শ্রেণি পর্যন্ত শিক্ষা মন্ত্রণালয়ের কেন্দ্রীয় ডিজিটাল লটারির মাধ্যমে ভর্তি পরিচালিত হয়। আর একাদশ শ্রেণিতে এসএসসি পরীক্ষার জিপিএ-র ভিত্তিতে সরকারি কেন্দ্রীয় মেধা তালিকায় শিক্ষার্থী নির্বাচিত হয়।`,
      proTip: `ভর্তির যাবতীয় ফরম পূরণ ও অনলাইনে আবেদন করতে উপরের 'অনলাইন ভর্তি' বাটনে ক্লিক করতে পারো। হেল্পলাইন: +৮৮০ ১৭১১-০৫৮৮৮৮।`
    };
  }

  if (normalized.includes('ফি') || normalized.includes('বেতন') || normalized.includes('টাকা') || normalized.includes('payment') || normalized.includes('bkash')) {
    return {
      type: 'school',
      title: ' অনলাইন বেতন ও ফি পরিশোধ পদ্ধতি',
      subject: 'school',
      content: `শিক্ষার্থীদের মাসিক বেতন ও পরীক্ষার ফি ঘরে বসেই বিকাশ (bKash), নগদ (Nagad) অথবা রকেটের মাধ্যমে সরাসরি পরিশোধ করা যায়। প্রতি মাসের ১০ তারিখের মধ্যে বেতন পরিশোধ করার নিয়ম রয়েছে।`,
      proTip: `ওয়েবসাইটের 'Student Portal'-এ লগইন করে তোমার স্টুডেন্ট আইডি দিয়ে ডিজিটাল ইনভয়েস ডাউনলোড ও কিউআর পেমেন্ট করতে পারবে।`
    };
  }

  if (normalized.includes('রুটিন') || normalized.includes('সময়') || normalized.includes('ক্লাস') || normalized.includes('routine')) {
    return {
      type: 'school',
      title: '⏰ ক্লাস রুটিন ও সমাবেশ সময়সূচি',
      subject: 'school',
      content: `আমাদের বিদ্যালয়ে দুই শিফটে ক্লাস পরিচালিত হয়: প্রভাতী শাখা সকাল ০৭:১৫ থেকে ১১:৩০ পর্যন্ত এবং দিবা শাখা দুপুর ১২:০০ থেকে বিকাল ০৫:১৫ পর্যন্ত।`,
      proTip: `শিক্ষক ও শিক্ষার্থীদের বিষয়ভিত্তিক পূর্ণাঙ্গ পিরিয়ড রুটিনের জন্য পোর্টালে 'Academic Routine Builder' ব্যবহার করতে পারো।`
    };
  }

  // Free-form intelligent pedagogical synthesis
  return {
    type: 'general',
    title: ` প্রফেসর ড. শাহরিয়ার রহমানের বিশ্লেষণ ও পাঠদান`,
    subject: subject !== 'all' ? subject : 'academic',
    content: `চমৎকার প্রশ্ন! "${query}" সম্পর্কে একাডেমিক দৃষ্টিকোণ থেকে গুরুত্বপূর্ণ কয়েকটি বিষয় লক্ষ্য করো:

১. **মূল ধারণা:** যেকোনো বিষয় শেখার সময় প্রথমে তার বুনিয়াদি সংজ্ঞা ও উদ্দেশ্য পরিষ্কার করে নিতে হয়। পাঠ্যপুস্তকের প্রতিটি অধ্যায়ের সাথে বাস্তব জীবনের সংযোগ স্থাপন করাই প্রকৃত শিক্ষার উদ্দেশ্য।

২. **পদ্ধতিগত অধ্যয়ন:** প্রথমে মূল তত্ত্বটি মনোযোগ দিয়ে পড়ো, এরপর উদাহরণগুলো নিজে খাতায় লিখে প্র্যাকটিস করো। 

৩. **প্রফেসরের বিশেষ পরামর্শ:** মুখস্থবিদ্যার চেয়ে অনুধাবনমূলক পড়ালেখায় মনোযোগ দাও।`,
    analogy: ` মনে রাখবে: জ্ঞানের চর্চা একটি ইমারত নির্মাণের মতো—ভিত্তি যত মজবুত হবে, মেধার বিস্তার তত সুউচ্চ হবে!`,
    proTip: `তোমার এই প্রশ্নের সুনির্দিষ্ট কোনো সমীকরণ, অঙ্ক বা সূত্রের ব্যাখ্যা চাইলে উপরে বিষয় নির্বাচন করো এবং আরও সুনির্দিষ্টভাবে প্রশ্নটি লেখো। আমি তোমাকে ধাপে ধাপে সমাধান করে বুঝিয়ে দেব।`,
    followUp: `তুমি কি এই বিষয়ের ওপর কোনো কুইজ বা প্র্যাকটিস প্রবলেম করতে চাও?`
  };
}
