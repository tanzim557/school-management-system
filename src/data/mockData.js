// Comprehensive Mock Data for Ideal School & College — Bangladesh National Curriculum System
// Strictly tailored for Bangladesh Education System (NCTB / BISE Dhaka)

export const INSTITUTION = {
  name: "আইডিয়াল স্কুল অ্যান্ড কলেজ",
  nameEn: "Ideal School and College, Motijheel, Dhaka",
  motto: "জ্ঞানই আলো • শৃঙ্খলা, চরিত্র ও আদর্শ শিক্ষা",
  mottoEn: "Knowledge is Light • Character & Academic Excellence",
  subdomain: "idealschool.edu.bd",
  customDomain: "portal.idealschool.edu.bd",
  logo: "/favicon.svg",
  eiin: "108275",
  boardCode: "1102",
  collegeCode: "1058",
  board: "মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড, ঢাকা (BISE Dhaka)",
  curriculum: "জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)",
  established: "1965",
  campus: "মতিঝিল মূল শাখা, বনশ্রী ও মুগদা ক্যাম্পাস",
  academicYear: "২০২৬ - ২০২৭",
  currentTerm: "অর্ধ-বার্ষিক মূল্যায়ন পরীক্ষা ২০২৬ (Half-Yearly 2026)",
  totalStudents: 18450,
  totalTeachers: 340,
  attendanceRate: "98.2%",
  feeCollectionRate: "96.4%",
};

export const USER_ROLES = {
  ADMIN: "Admin",
  SUPER_ADMIN: "Super Admin",
  TEACHER: "Teacher",
  STUDENT: "Student",
  PARENT: "Parent",
  ACCOUNTANT: "Accountant",
  DESIGN_SYSTEM: "Design System & Lab"
};

export const CURRENT_USERS = {
  "Super Admin": {
    name: "প্রকৌশলী এ. কে. মোস্তাফিজুর রহমান",
    role: "Super Admin",
    designation: "সভাপতি, গভর্নিং বডি ও প্রধান প্রশাসক",
    email: "chairman@idealschool.edu.bd",
    avatar: "/images/chairman.jpg",
    badge: "গভর্নিং বডি",
  },
  "Teacher": {
    name: "প্রফেসর লাল মোহাম্মদ",
    role: "Teacher",
    designation: "অধ্যক্ষ ও প্রধান শিক্ষক",
    subject: "উচ্চতর গণিত ও পদার্থবিজ্ঞান",
    email: "principal@idealschool.edu.bd",
    avatar: "/images/principal.jpg",
    badge: "অধ্যক্ষ",
    assignedClasses: ["১০ম শ্রেণি (বিজ্ঞান-ক)", "একাদশ শ্রেণি (বিজ্ঞান)", "দ্বাদশ শ্রেণি"]
  },
  "Student": {
    name: "তানভীর আহমেদ (Tanvir Ahmed)",
    role: "Student",
    studentId: "ISC-2026-1014",
    grade: "১০ম শ্রেণি (বিজ্ঞান বিভাগ) • দিবা শাখা - ক",
    rollNumber: 101,
    regNo: "1810948291",
    session: "2025-2026",
    email: "tanvir.ahmed@student.idealschool.edu.bd",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    gpa: "GPA 5.00 (Golden A+)",
    rank: "১ম স্থান (মেধা তালিকা)",
  },
  "Parent": {
    name: "জনাব মোঃ রিয়াজ উদ্দিন",
    role: "Parent",
    designation: "অভিভাবক সদস্য, গভর্নিং বডি",
    email: "riaz.guardian@gmail.com",
    avatar: "/images/guardian_rep.jpg",
    phone: "+880 1711-894210",
    children: [
      { id: "c1", name: "তানভীর আহমেদ", grade: "১০ম শ্রেণি (বিজ্ঞান-ক)", roll: 101, gpa: "5.00" },
      { id: "c2", name: "তাসমিয়া আহমেদ", grade: "৭ম শ্রেণি (প্রভাতী-খ)", roll: 12, gpa: "5.00" }
    ]
  },
  "Accountant": {
    name: "জনাব মোঃ শাহেদুল ইসলাম",
    role: "Accountant",
    designation: "প্রধান হিসাবরক্ষক ও ক্যাশিয়ার",
    email: "accounts@idealschool.edu.bd",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    badge: "হিসাব শাখা",
  }
};

export const SUPER_ADMIN_DATA = {
  totalTenants: 12,
  activeSchools: 12,
  totalMRR: "৳ ৩,৮৪,০০০",
  activeStudentsAcrossTenants: 18450,
  serverUptime: "99.99%",
  avgApiLatency: "24ms",
  tenants: [
    { id: "t1", name: "মতিঝিল মূল প্রভাতী শাখা (বালিকা)", domain: "motijheel-girls.idealschool.edu.bd", students: 4850, plan: "Main Campus", status: "Active", dbHealth: "Optimal" },
    { id: "t2", name: "মতিঝিল মূল দিবা শাখা (বালক)", domain: "motijheel-boys.idealschool.edu.bd", students: 5120, plan: "Main Campus", status: "Active", dbHealth: "Optimal" },
    { id: "t3", name: "বনশ্রী শাখা (বাংলা ও ইংলিশ ভার্সন)", domain: "banasree.idealschool.edu.bd", students: 4680, plan: "Branch Campus", status: "Active", dbHealth: "Optimal" },
    { id: "t4", name: "মুগদা শাখা", domain: "mugda.idealschool.edu.bd", students: 3800, plan: "Branch Campus", status: "Active", dbHealth: "Optimal" }
  ]
};

// Routine: Saturday to Thursday (Traditional Bangladesh School Week)
export const TIMETABLE_DAYS = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
export const TIMETABLE_PERIODS = [
  { id: "p0", time: "07:45 - 08:00", label: "সমাবেশ ও জাতীয় সংগীত", isBreak: true },
  { id: "p1", time: "08:00 - 08:45", label: "১ম পিরিয়ড" },
  { id: "p2", time: "08:45 - 09:30", label: "২য় পিরিয়ড" },
  { id: "p3", time: "09:30 - 10:15", label: "৩য় পিরিয়ড" },
  { id: "p4", time: "10:15 - 11:00", label: "৪র্থ পিরিয়ড" },
  { id: "p5", time: "11:00 - 11:35", label: "টিফিন ও নামাযের বিরতি", isBreak: true },
  { id: "p6", time: "11:35 - 12:20", label: "৫ম পিরিয়ড" },
  { id: "p7", time: "12:20 - 01:05", label: "৬ষ্ঠ পিরিয়ড" },
  { id: "p8", time: "01:05 - 01:45", label: "৭ম পিরিয়ড" }
];

export const INITIAL_TIMETABLE = {
  "Saturday-p1": { subject: "উচ্চতর গণিত", teacher: "প্রফেসর লাল মোহাম্মদ", room: "কক্ষ ৪০১", color: "#4338ca" },
  "Saturday-p2": { subject: "পদার্থবিজ্ঞান", teacher: "ড. মিজানুর রহমান", room: "বিজ্ঞান ল্যাব", color: "#2563eb" },
  "Saturday-p3": { subject: "বাংলা ১ম পত্র", teacher: "জনাব শরীফ সামছুদ্দোহা", room: "কক্ষ ৪০১", color: "#059669" },
  "Saturday-p4": { subject: "ইংরেজি ১ম পত্র", teacher: "কাজী নাসিমা আক্তার", room: "কক্ষ ৪০১", color: "#7c3aed" },
  "Saturday-p6": { subject: "রসায়ন ব্যবহারিক", teacher: "ল্যাব প্রশিক্ষক", room: "রসায়ন ল্যাব", color: "#d97706" },
  "Saturday-p7": { subject: "আইসিটি ও কম্পিউটার", teacher: "প্রকৌশলী সাজ্জাদ", room: "কম্পিউটার ল্যাব", color: "#0284c7" },

  "Sunday-p1": { subject: "সাধারণ গণিত", teacher: "জনাব আলমগীর হোসেন", room: "কক্ষ ৪০১", color: "#4338ca" },
  "Sunday-p2": { subject: "রসায়ন বিজ্ঞান", teacher: "ড. মিজানুর রহমান", room: "কক্ষ ৪০১", color: "#2563eb" },
  "Sunday-p3": { subject: "ইংরেজি ২য় পত্র", teacher: "কাজী নাসিমা আক্তার", room: "কক্ষ ৪০১", color: "#7c3aed" },
  "Sunday-p4": { subject: "বাংলা ২য় পত্র", teacher: "জনাব শরীফ সামছুদ্দোহা", room: "কক্ষ ৪০১", color: "#059669" },
  "Sunday-p6": { subject: "জীববিজ্ঞান তত্ত্বীয়", teacher: "ড. ফাতেমা বেগম", room: "কক্ষ ৪০১", color: "#10b981" },
  "Sunday-p7": { subject: "বাংলাদেশ ও বিশ্বপরিচয়", teacher: "জনাব আবদুর রাজ্জাক", room: "কক্ষ ৪০১", color: "#e11d48" },

  "Monday-p1": { subject: "পদার্থবিজ্ঞান তত্ত্বীয়", teacher: "ড. মিজানুর রহমান", room: "কক্ষ ৪০১", color: "#2563eb" },
  "Monday-p2": { subject: "উচ্চতর গণিত", teacher: "প্রফেসর লাল মোহাম্মদ", room: "কক্ষ ৪০১", color: "#4338ca" },
  "Monday-p3": { subject: "ইসলাম ও নৈতিক শিক্ষা", teacher: "মাওলানা আবদুল করিম", room: "কক্ষ ৪০১", color: "#059669" },
  "Monday-p4": { subject: "ইংরেজি ১ম পত্র", teacher: "কাজী নাসিমা আক্তার", room: "কক্ষ ৪০১", color: "#7c3aed" },
  "Monday-p6": { subject: "জীববিজ্ঞান ব্যবহারিক", teacher: "ড. ফাতেমা বেগম", room: "বায়োলজি ল্যাব", color: "#10b981" },
  "Monday-p7": { subject: "শারীরিক শিক্ষা ও স্বাস্থ্য", teacher: "ক্রীড়া শিক্ষক মোজাম্মেল", room: "খেলার মাঠ", color: "#d97706" },

  "Tuesday-p1": { subject: "সাধারণ গণিত", teacher: "জনাব আলমগীর হোসেন", room: "কক্ষ ৪০১", color: "#4338ca" },
  "Tuesday-p2": { subject: "রসায়ন বিজ্ঞান", teacher: "ড. মিজানুর রহমান", room: "কক্ষ ৪০১", color: "#2563eb" },
  "Tuesday-p3": { subject: "বাংলা ১ম পত্র", teacher: "জনাব শরীফ সামছুদ্দোহা", room: "কক্ষ ৪০১", color: "#059669" },
  "Tuesday-p4": { subject: "বাংলাদেশ ও বিশ্বপরিচয়", teacher: "জনাব আবদুর রাজ্জাক", room: "কক্ষ ৪০১", color: "#e11d48" },
  "Tuesday-p6": { subject: "আইসিটি প্রোগ্রামিং", teacher: "প্রকৌশলী সাজ্জাদ", room: "কম্পিউটার ল্যাব", color: "#0284c7" },
  "Tuesday-p7": { subject: "পদার্থবিজ্ঞান প্র্যাকটিক্যাল", teacher: "ল্যাব ইনচার্জ", room: "পদার্থ ল্যাব", color: "#2563eb" },

  "Wednesday-p1": { subject: "উচ্চতর গণিত", teacher: "প্রফেসর লাল মোহাম্মদ", room: "কক্ষ ৪০১", color: "#4338ca" },
  "Wednesday-p2": { subject: "ইংরেজি ২য় পত্র", teacher: "কাজী নাসিমা আক্তার", room: "কক্ষ ৪০১", color: "#7c3aed" },
  "Wednesday-p3": { subject: "জীববিজ্ঞান", teacher: "ড. ফাতেমা বেগম", room: "কক্ষ ৪০১", color: "#10b981" },
  "Wednesday-p4": { subject: "বাংলা ২য় পত্র", teacher: "জনাব শরীফ সামছুদ্দোহা", room: "কক্ষ ৪০১", color: "#059669" },
  "Wednesday-p6": { subject: "চারু ও কারুকলা / ক্যালিগ্রাফি", teacher: "শিল্পকলা শিক্ষক", room: "আর্ট রুম", color: "#ec4899" },
  "Wednesday-p7": { subject: "বিতর্ক ও সাধারণ জ্ঞান", teacher: "মডারেটর মণ্ডলী", room: "অডিটোরিয়াম", color: "#059669" },

  "Thursday-p1": { subject: "সাধারণ গণিত", teacher: "জনাব আলমগীর হোসেন", room: "কক্ষ ৪০১", color: "#4338ca" },
  "Thursday-p2": { subject: "পদার্থবিজ্ঞান", teacher: "ড. মিজানুর রহমান", room: "কক্ষ ৪০১", color: "#2563eb" },
  "Thursday-p3": { subject: "ইংরেজি ১ম পত্র", teacher: "কাজী নাসিমা আক্তার", room: "কক্ষ ৪০১", color: "#7c3aed" },
  "Thursday-p4": { subject: "ইসলাম ও নৈতিক শিক্ষা", teacher: "মাওলানা আবদুল করিম", room: "কক্ষ ৪০১", color: "#059669" },
  "Thursday-p6": { subject: "রসায়ন তত্ত্বীয়", teacher: "ড. মিজানুর রহমান", room: "কক্ষ ৪০১", color: "#d97706" },
  "Thursday-p7": { subject: "সাপ্তাহিক মূল্যায়ন ও টিউটোরিয়াল", teacher: "শ্রেণি শিক্ষক", room: "কক্ষ ৪০১", color: "#4338ca" }
};

export const SYLLABUS_MODULES = [
  {
    id: "s1",
    subject: "পদার্থবিজ্ঞান (NCTB পাঠ্যক্রম - ১০ম শ্রেণি)",
    instructor: "ড. মিজানুর রহমান",
    progress: 82,
    chapters: [
      { name: "অধ্যায় ১: ভৌত রাশি এবং পরিমাপ", status: "Completed", lectures: 6 },
      { name: "অধ্যায় ২: গতি ও গতির সমীকরণ", status: "Completed", lectures: 8 },
      { name: "অধ্যায় ৩: বল ও নিউটনের গতিসূত্র", status: "Completed", lectures: 9 },
      { name: "অধ্যায় ৪: কাজ, ক্ষমতা ও শক্তি", status: "In Progress", lectures: 8 },
      { name: "অধ্যায় ৫: পদার্থের অবস্থা ও চাপ", status: "Upcoming", lectures: 7 }
    ]
  },
  {
    id: "s2",
    subject: "উচ্চতর গণিত (বীজগণিত, ত্রিকোণমিতি ও জ্যামিতি)",
    instructor: "প্রফেসর লাল মোহাম্মদ",
    progress: 88,
    chapters: [
      { name: "অধ্যায় ১: সেট ও ফাংশন", status: "Completed", lectures: 7 },
      { name: "অধ্যায় ২: বীজগণিতীয় রাশি ও আংশিক ভগ্নাংশ", status: "Completed", lectures: 10 },
      { name: "অধ্যায় ৩: জ্যামিতি ও অ্যাপোলোনিয়াসের উপপাদ্য", status: "Completed", lectures: 8 },
      { name: "অধ্যায় ৮: ত্রিকোণমিতিক অনুপাত ও কোণ", status: "In Progress", lectures: 9 }
    ]
  },
  {
    id: "s3",
    subject: "তথ্য ও যোগাযোগ প্রযুক্তি (ICT)",
    instructor: "প্রকৌশলী সাজ্জাদ হোসেন",
    progress: 92,
    chapters: [
      { name: "অধ্যায় ১: তথ্য ও যোগাযোগ প্রযুক্তি এবং আমাদের বাংলাদেশ", status: "Completed", lectures: 5 },
      { name: "অধ্যায় ২: কম্পিউটার ও ব্যবহারকারীর নিরাপত্তা", status: "Completed", lectures: 6 },
      { name: "অধ্যায় ৩: আমার শিক্ষায় ইন্টারনেট ও ডিজিটাল কনটেন্ট", status: "Completed", lectures: 7 },
      { name: "অধ্যায় ৪: ওয়ার্ড প্রসেসর ও স্প্রেডশিটের ব্যবহার", status: "In Progress", lectures: 8 }
    ]
  }
];

export const GRADEBOOK_STUDENTS = [
  { id: "std-1", name: "তানভীর আহমেদ (Tanvir Ahmed)", roll: 101, attendance: "99%", marks: { physics: 96, math: 98, cs: 98, bangla: 94, english: 95 }, gpa: "5.00", status: "Golden A+" },
  { id: "std-2", name: "নাবিল রহমান", roll: 102, attendance: "98%", marks: { physics: 94, math: 95, cs: 96, bangla: 91, english: 92 }, gpa: "5.00", status: "Golden A+" },
  { id: "std-3", name: "তাসনিম জাহান", roll: 103, attendance: "96%", marks: { physics: 90, math: 92, cs: 94, bangla: 89, english: 90 }, gpa: "5.00", status: "A+" },
  { id: "std-4", name: "সাদিয়া আফরোজ", roll: 104, attendance: "95%", marks: { physics: 88, math: 89, cs: 90, bangla: 86, english: 88 }, gpa: "4.85", status: "A" },
  { id: "std-5", name: "ফারহান কবির", roll: 105, attendance: "92%", marks: { physics: 82, math: 84, cs: 85, bangla: 80, english: 82 }, gpa: "4.50", status: "A" }
];

export const STUDENT_REPORT_CARD = {
  institution: "আইডিয়াল স্কুল অ্যান্ড কলেজ, মতিঝিল, ঢাকা",
  board: "মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড, ঢাকা",
  session: "শিক্ষাবর্ষ ২০২৫ - ২০২৬",
  examination: "এসএসসি প্রি-টেস্ট ও বার্ষিক মূল্যায়ন পরীক্ষা ২০২৬",
  student: {
    name: "তানভীর আহমেদ (Tanvir Ahmed)",
    id: "ISC-2026-1014",
    class: "১০ম শ্রেণি (Class 10) • দিবা শাখা - ক",
    group: "বিজ্ঞান বিভাগ (Science Group)",
    rollNumber: 101,
    regNo: "1810948291",
    dob: "১৪ অক্টোবর ২০১০",
    guardian: "জনাব মোঃ রিয়াজ উদ্দিন",
    attendancePercentage: "98.8%"
  },
  scores: [
    { subject: "বাংলা (১ম ও ২য় পত্র)", maxScore: 200, score: 184, grade: "A+", gpa: "5.00", remarks: "অনবদ্য সাহিত্য বিশ্লেষণ ও ব্যাকরণ দক্ষতা" },
    { subject: "ইংরেজি (১ম ও ২য় পত্র)", maxScore: 200, score: 182, grade: "A+", gpa: "5.00", remarks: "চমৎকার ব্যাকরণ ও মুক্ত লিখন নৈপুণ্য" },
    { subject: "সাধারণ গণিত", maxScore: 100, score: 98, grade: "A+", gpa: "5.00", remarks: "জ্যামিতি ও পাটিগণিতে পূর্ণ দক্ষতা" },
    { subject: "উচ্চতর গণিত", maxScore: 100, score: 96, grade: "A+", gpa: "5.00", remarks: "ত্রিকোণমিতি ও স্থানাঙ্ক জ্যামিতিতে সেরা" },
    { subject: "পদার্থবিজ্ঞান (তত্ত্বীয় + ব্যবহারিক)", maxScore: 100, score: 94, grade: "A+", gpa: "5.00", remarks: "ব্যবহারিক পরীক্ষণ ও গাণিতিক পদার্থে নিখুঁত" },
    { subject: "রসায়ন বিজ্ঞান (তত্ত্বীয় + ব্যবহারিক)", maxScore: 100, score: 92, grade: "A+", gpa: "5.00", remarks: "রাসায়নিক বিক্রিয়া ও ল্যাব দক্ষতায় পারদর্শী" },
    { subject: "জীববিজ্ঞান (তত্ত্বীয় + ব্যবহারিক)", maxScore: 100, score: 95, grade: "A+", gpa: "5.00", remarks: "কোষ তত্ত্ব ও শারীরবিদ্যায় চমৎকার" },
    { subject: "তথ্য ও যোগাযোগ প্রযুক্তি (ICT)", maxScore: 50, score: 49, grade: "A+", gpa: "5.00", remarks: "প্রোগ্রামিং ও ডিজিটাল দক্ষতা প্রশংসনীয়" },
    { subject: "বাংলাদেশ ও বিশ্বপরিচয়", maxScore: 100, score: 91, grade: "A+", gpa: "5.00", remarks: "বাংলাদেশের ইতিহাস ও সংবিধান জ্ঞান সমৃদ্ধ" },
    { subject: "ইসলাম ও নৈতিক শিক্ষা", maxScore: 100, score: 96, grade: "A+", gpa: "5.00", remarks: "উচ্চ নৈতিকতা ও সঠিক অনুধাবন" }
  ],
  summary: {
    totalMarks: 1147,
    maxPossible: 1200,
    percentage: "95.58%",
    cumulativeGPA: "5.00",
    performanceStatus: "GPA 5.00 (Golden A+)",
    rankInClass: "১ম স্থান (মেধা তালিকায় শীর্ষস্থান)",
    boardStatus: "ঢাকা শিক্ষা বোর্ডে মেধা তালিকায় অন্তর্ভুক্তির যোগ্য"
  },
  principalRemarks: "তানভীর একজন অত্যন্ত মেধাবী, চরিত্রবান ও নিয়মানুবর্তী শিক্ষার্থী। প্রাতিষ্ঠানিক ও জাতীয় পাঠ্যক্রমে তার সার্বিক ফলাফল অতুলনীয়। শুভকামনা রইল।",
  verificationQR: "https://idealschool.edu.bd/verify/transcript/ISC-2026-1014",
  issueDate: "১৮ সেপ্টেম্বর ২০২৬"
};

export const INVOICES_DATA = [
  {
    id: "FEE-2026-0941",
    studentName: "তানভীর আহমেদ (Tanvir Ahmed)",
    studentId: "ISC-2026-1014",
    category: "অর্ধ-বার্ষিক সেশন ফি ও বিজ্ঞান ল্যাব চার্জ",
    amount: 3200,
    dueDate: "১০ অক্টোবর ২০২৬",
    status: "Pending",
    lateFinePerDay: 20,
    daysOverdue: 0
  },
  {
    id: "FEE-2026-0812",
    studentName: "তানভীর আহমেদ (Tanvir Ahmed)",
    studentId: "ISC-2026-1014",
    category: "মাসিক টিউশন ফি (আগস্ট ২০২৬) ও ক্রীড়া ফান্ড",
    amount: 1850,
    dueDate: "১৫ সেপ্টেম্বর ২০২৬",
    status: "Paid",
    paidDate: "১২ সেপ্টেম্বর ২০২৬",
    method: "বিকাশ পে (bKash) • TrxID: BK928401",
    receiptUrl: "#"
  },
  {
    id: "FEE-2026-0701",
    studentName: "তাসমিয়া আহমেদ",
    studentId: "ISC-2026-1104",
    category: "৭ম শ্রেণি মাসিক বেতন ও আইসিটি ল্যাব ফি",
    amount: 1650,
    dueDate: "১০ অক্টোবর ২০২৬",
    status: "Pending",
    lateFinePerDay: 20,
    daysOverdue: 0
  },
  {
    id: "FEE-2026-0610",
    studentName: "ফারহান কবির",
    studentId: "ISC-2026-0911",
    category: "স্কুল বাস পরিবহন ফি ও লাইব্রেরি বকেয়া",
    amount: 1200,
    dueDate: "০৫ সেপ্টেম্বর ২০২৬",
    status: "Overdue",
    lateFinePerDay: 20,
    daysOverdue: 15,
    fineAmount: 300
  }
];

export const EMAIL_TRACKING_DATA = [
  {
    id: "NOTIF-101",
    subject: "জরুরি বিজ্ঞপ্তি: এসএসসি নির্বাচনী পরীক্ষা ও অভিভাবক মতবিনিময় সভা",
    recipientsCount: 18450,
    deliveredCount: 18410,
    openedCount: 17290,
    openRate: "93.9%",
    dispatchedAt: "১৮ সেপ্টেম্বর ২০২৬, সকাল ০৯:০০",
    trackingStatus: "সক্রিয় এসএমএস ও নোটিফিকেশন সিঙ্ক",
    readLogs: [
      { parentName: "জনাব মোঃ রিয়াজ উদ্দিন", student: "তানভীর আহমেদ (১০ম-ক)", status: "Read", openedAt: "১৮ সেপ্টেম্বর, ০৯:১৪ AM", client: "বিকাশ অ্যাপ / এসএমএস লিংক", opensCount: 3 },
      { parentName: "মোঃ নজরুল ইসলাম", student: "নাবিল রহমান (১০ম-ক)", status: "Read", openedAt: "১৮ সেপ্টেম্বর, ০৯:২২ AM", client: "Gmail Web", opensCount: 2 },
      { parentName: "ড. শায়লা পারভীন", student: "তাসনিম জাহান (১০ম-ক)", status: "Read", openedAt: "১৮ সেপ্টেম্বর, ১০:০৫ AM", client: "Android Mobile", opensCount: 1 },
      { parentName: "মোঃ কবির হোসেন", student: "ফারহান কবির (১০ম-ক)", status: "Unread", openedAt: "—", client: "—", opensCount: 0 }
    ]
  },
  {
    id: "NOTIF-102",
    subject: "মাসিক বেতন ও পরীক্ষার ফি পরিশোধের সময়সূচি (বিকাশ/নগদ গেটওয়ে)",
    recipientsCount: 18450,
    deliveredCount: 18430,
    openedCount: 17850,
    openRate: "96.8%",
    dispatchedAt: "১৫ সেপ্টেম্বর ২০২৬, সকাল ১০:৩০",
    trackingStatus: "সম্পন্ন",
    readLogs: [
      { parentName: "জনাব মোঃ রিয়াজ উদ্দিন", student: "তানভীর আহমেদ", status: "Read", openedAt: "১৫ সেপ্টেম্বর, ১০:৪৫ AM", client: "মোবাইল পোর্টাল", opensCount: 4 }
    ]
  }
];

export const NOTICES = [
  {
    id: "n1",
    title: "২০২৬ শিক্ষাবর্ষে ডিজিটাল লটারির মাধ্যমে ১ম-৯ম শ্রেণিতে ভর্তি বিজ্ঞপ্তি",
    category: "Admission",
    badge: "জরুরি ভর্তি",
    date: "১৯ সেপ্টেম্বর ২০২৬",
    content: "মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর (মাউশি) এর নির্দেশনা মোতাবেক আইডিয়াল স্কুল অ্যান্ড কলেজের মতিঝিল, বনশ্রী ও মুগদা শাখায় ১ম থেকে ৯ম শ্রেণিতে অনলাইনে আবেদন গ্রহণ শুরু হয়েছে। টেলিটক ও স্কুল ওয়েবসাইটের মাধ্যমে আবেদন করা যাবে।"
  },
  {
    id: "n2",
    title: "১০ম শ্রেণির নির্বাচনী (SSC Pre-Test) পরীক্ষার চূড়ান্ত সময়সূচী ও প্রবেশপত্র বিতরণ",
    category: "Academic",
    badge: "পরীক্ষা",
    date: "১৮ সেপ্টেম্বর ২০২৬",
    content: "আগামী ২৫ সেপ্টেম্বর থেকে ১০ম শ্রেণির নির্বাচনী পরীক্ষা শুরু হবে। সকল শিক্ষার্থীকে আগামী ২৩ সেপ্টেম্বরের মধ্যে যাবতীয় বকেয়া বেতন পরিশোধপূর্বক স্ব-স্ব শ্রেণি শিক্ষকের নিকট থেকে রঙিন প্রবেশপত্র (Admit Card) সংগ্রহ করতে নির্দেশ দেওয়া হচ্ছে।"
  },
  {
    id: "n3",
    title: "জাতীয় গণিত ও পদার্থবিজ্ঞান অলিম্পিয়াড প্রস্তুতি ক্যাম্প ২০২৬",
    category: "Academic",
    badge: "অলিম্পিয়াড",
    date: "১৬ সেপ্টেম্বর ২০২৬",
    content: "বাংলাদেশ গণিত অলিম্পিয়াড ও ফিজিক্স অলিম্পিয়াডের প্রস্তুতিমূলক বিশেষ ওয়ার্কশপ আগামী শনিবার কলেজ অডিটোরিয়ামে অনুষ্ঠিত হবে। আগ্রহী শিক্ষার্থীদের দ্রুত রেজিস্ট্রেশন করার জন্য বলা হচ্ছে।"
  },
  {
    id: "n4",
    title: "বার্ষিক ক্রীড়া প্রতিযোগিতা ও সাংস্কৃতিক সপ্তাহ ২০২৬ এর তারিখ ঘোষণা",
    category: "Sports",
    badge: "ক্রীড়া ও সংস্কৃতি",
    date: "১৪ সেপ্টেম্বর ২০২৬",
    content: "মতিঝিল মূল খেলার মাঠে ৩ দিনব্যাপী বার্ষিক ক্রীড়া প্রতিযোগিতা ও শহীদ মিনার প্রাঙ্গণে সাংস্কৃতিক উৎসব আগামী ৫ নভেম্বর থেকে শুরু হবে। ইভেন্টে অংশগ্রহণে ইচ্ছুক ছাত্র-ছাত্রীদের পিটি শিক্ষকদের সাথে যোগাযোগ করতে হবে।"
  }
];

export const SPOTLIGHT_ITEMS = [
  { id: "sp-1", title: "তানভীর আহমেদ (Tanvir Ahmed)", category: "শিক্ষার্থী", detail: "১০ম শ্রেণি (বিজ্ঞান-ক) | রোল ১০১ | GPA 5.00 (Golden A+)", linkRole: "Student" },
  { id: "sp-2", title: "নাবিল রহমান", category: "শিক্ষার্থী", detail: "১০ম শ্রেণি (বিজ্ঞান-ক) | রোল ১০২ | GPA 5.00", linkRole: "Student" },
  { id: "sp-3", title: "প্রফেসর লাল মোহাম্মদ (অধ্যক্ষ)", category: "প্রশাসন ও শিক্ষক", detail: "অধ্যক্ষ ও প্রধান শিক্ষক | আইডিয়াল স্কুল অ্যান্ড কলেজ", linkRole: "Teacher" },
  { id: "sp-4", title: "ড. মিজানুর রহমান", category: "শিক্ষক মণ্ডলী", detail: "সিনিয়র শিক্ষক (পদার্থবিজ্ঞান বিভাগ)", linkRole: "Teacher" },
  { id: "sp-course-mat", title: "কোর্স ম্যাটেরিয়ালস ও ই-লাইব্রেরি (Course Materials)", category: "একাডেমিক টুলস", detail: "ভিডিও লেকচার, পিডিএফ নোট, বোর্ড বই ও হ্যান্ডনোট", linkTab: "courseMaterials" },
  { id: "sp-5", title: "ক্লাস রুটিন ও সময়সূচী বিল্ডার", category: "একাডেমিক টুলস", detail: "শনিবার-বৃহস্পতিবার NCTB রুটিন জেনারেটর", linkTab: "routine" },
  { id: "sp-6", title: "অফিসিয়াল মার্কশিট ও রেজাল্ট কার্ড", category: "একাডেমিক টুলস", detail: "GPA 5.00 ও QR কোড ভেরিফাইড ট্রান্সক্রিপ্ট", linkTab: "reportCard" },
  { id: "sp-7", title: "টিউশন ফি ও বকেয়া বেতন (৳ ৩,২০০)", category: "হিসাব ও ফিন্যান্স", detail: "বিকাশ ও নগদ গেটওয়ে পেমেন্ট স্লিপ", linkTab: "finance" },
  { id: "sp-8", title: "নোটিশ ও এসএমএস ট্র্যাকিং ইঞ্জিন", category: "যোগাযোগ", detail: "অভিভাবকদের লাইভ ডেলিভারি ও ওপেন রেট", linkTab: "emailTracker" },
  { id: "sp-9", title: "আইডিয়াল স্কুল এআই চ্যাট হেল্পডেস্ক", category: "এআই সহকারী", detail: "ভর্তি, ফি ও পরীক্ষার তথ্য অনুসন্ধান", linkTab: "aiAssistant" }
];

export const AI_KNOWLEDGE_BASE = [
  {
    keywords: ["কোর্স", "ম্যাটেরিয়াল", "ভিডিও", "নোট", "বই", "pdf", "video", "note", "book", "material"],
    response: "আইডিয়াল স্কুল অ্যান্ড কলেজের শিক্ষার্থীদের জন্য 'Course Materials' সেকশনে সকল বিষয়ের ভিডিও লেকচার, অধ্যায়ভিত্তিক পিডিএফ শিট, ডিজিটাল পাঠ্যবই এবং শিক্ষকদের তৈরি হ্যান্ডনোট সংরক্ষিত আছে। শিক্ষার্থীরা যেকোনো সময় তা দেখতে এবং ডাউনলোড করতে পারবে।"
  },
  {
    keywords: ["ফি", "বেতন", "টাকা", "payment", "fee", "bKash", "বিকাশ", "নগদ"],
    response: "আইডিয়াল স্কুল অ্যান্ড কলেজের যাবতীয় মাসিক বেতন ও পরীক্ষার ফি বিকাশ (bKash), নগদ (Nagad) অথবা সোনালী ব্যাংক ই-সেবার মাধ্যমে নিরাপদে অনলাইনে পরিশোধ করা যায়। চলতি মাসের বেতন প্রতি মাসের ১০ তারিখের মধ্যে পরিশোধ করতে হয়।"
  },
  {
    keywords: ["রুটিন", "সময়সূচী", "ক্লাস", "routine", "period", "class"],
    response: "আমাদের স্কুলে শনিবার থেকে বৃহস্পতিবার ক্লাস পরিচালিত হয়। প্রভাতী শাখা সকাল ০৭:১৫ থেকে ১১:৩০ পর্যন্ত এবং দিবা শাখা দুপুর ১২:০০ থেকে বিকাল ০৫:১৫ পর্যন্ত চলে। বিস্তারিত বিষয়ভিত্তিক রুটিন 'Routine Builder' ট্যাবে রয়েছে।"
  },
  {
    keywords: ["রেজাল্ট", "ফলাফল", "gpa", "মার্কশিট", "ssc", "result"],
    response: "আমাদের প্রতিষ্ঠান ঢাকা শিক্ষা বোর্ডের NCTB গ্রেডিং পদ্ধতি (GPA 5.00 স্কেল) অনুসরণ করে। অর্ধ-বার্ষিক ও বার্ষিক পরীক্ষার রেজাল্ট ডিজিটালভাবে প্রস্তুত করা হয় এবং অভিভাবকরা কিউআর কোড ভেরিফাইড মার্কশিট সরাসরি ডাউনলোড করতে পারেন।"
  },
  {
    keywords: ["ভর্তি", "লটারি", "admission", "আবেদন", "ফর্ম"],
    response: "১ম থেকে ৯ম শ্রেণিতে সরকারি নীতিমালা অনুযায়ী কেন্দ্রীয় ডিজিটাল লটারির মাধ্যমে ভর্তি নেওয়া হয়। একাদশ শ্রেণিতে এসএসসি পরীক্ষার জিপিএ-র ভিত্তিতে অনলাইন চয়েসের মাধ্যমে শিক্ষার্থী ভর্তি করা হয়।"
  }
];
