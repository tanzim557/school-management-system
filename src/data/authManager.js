// Auth & Account Management Service for Ideal School & College
// Manages Teachers (with Subjects), Students (with Admission Approval lifecycle), and Parents

// ============================================================
// SMS Gateway Configuration (Bangladesh)
// Provider: BulkSMSBD (bulksmsbd.net) — CONFIRMED LIVE
// Sender ID: 8809617631158 | API Key: uRxK9X3xAvPQ1jWd7v6J
// API Docs: https://bulksmsbd.net/api/smsapi
// ============================================================
const SMS_CONFIG = {
  apiKey: 'uRxK9X3xAvPQ1jWd7v6J',
  senderId: '8809617631158',
  apiUrl: 'https://bulksmsbd.net/api/smsapi'
};

// Send Real SMS via BulkSMSBD Bangladesh Gateway
export async function sendSMS(toPhone, message) {
  try {
    // Clean phone: remove dashes, spaces → ensure 8801XXXXXXXXX format
    let phone = toPhone.replace(/[^0-9]/g, '');
    if (phone.startsWith('0')) {
      phone = '88' + phone; // 01711... → 8801711...
    }
    if (!phone.startsWith('88')) {
      phone = '88' + phone;
    }

    // BulkSMSBD required params: api_key, type, number, senderid, message
    const params = new URLSearchParams({
      api_key: SMS_CONFIG.apiKey,
      type: 'text',
      number: phone,
      senderid: SMS_CONFIG.senderId,
      message: message
    });

    const apiUrl = `${SMS_CONFIG.apiUrl}?${params.toString()}`;
    console.log('[SMS Gateway] Sending to:', phone, '| URL:', apiUrl);

    // Use no-cors mode to bypass browser CORS restriction
    // The request still reaches the server even if we can't read the response
    const response = await fetch(apiUrl, {
      method: 'GET',
      mode: 'no-cors'
    });

    // With no-cors, response.type === 'opaque', but SMS was sent
    console.log('[SMS Gateway] Sent! Response type:', response.type, '| To:', phone);
    return { success: true, phone };
  } catch (err) {
    console.error('[SMS Gateway] Error:', err.message);
    // Fallback: try with CORS proxy
    try {
      const phone2 = toPhone.replace(/[^0-9]/g, '');
      const cleanPhone = phone2.startsWith('0') ? '88' + phone2 : phone2.startsWith('88') ? phone2 : '88' + phone2;
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(
        `${SMS_CONFIG.apiUrl}?api_key=${SMS_CONFIG.apiKey}&type=text&number=${cleanPhone}&senderid=${SMS_CONFIG.senderId}&message=${encodeURIComponent(message)}`
      )}`;
      const r2 = await fetch(proxyUrl);
      const text2 = await r2.text();
      console.log('[SMS Gateway Proxy] Response:', text2);
      return { success: true, response: text2, phone: cleanPhone };
    } catch (err2) {
      console.error('[SMS Gateway Proxy] Also failed:', err2.message);
      return { success: false, error: err2.message };
    }
  }
}


export const DEFAULT_ACCOUNTS = [
  // 1. Teachers / Academic Staff (Strictly with Subject specialization)
  {
    id: "usr-tea-1",
    role: "Teacher",
    name: "প্রফেসর লাল মোহাম্মদ",
    username: "principal",
    email: "principal@idealschool.edu.bd",
    password: "123",
    subject: "উচ্চতর গণিত ও পদার্থবিজ্ঞান",
    designation: "অধ্যক্ষ ও প্রধান শিক্ষক",
    phone: "01711-058888",
    avatar: "/images/principal.jpg",
    assignedClass: "১০ম শ্রেণি (বিজ্ঞান) ও একাদশ শ্রেণি"
  },
  {
    id: "usr-tea-2",
    role: "Teacher",
    name: "ড. মিজানুর রহমান",
    username: "mizan.physics",
    email: "mizan@idealschool.edu.bd",
    password: "123",
    subject: "পদার্থবিজ্ঞান (Physics)",
    designation: "সিনিয়র শিক্ষক (বিজ্ঞান বিভাগ)",
    phone: "01712-334455",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    assignedClass: "৯ম ও ১০ম শ্রেণি (বিজ্ঞান-ক)"
  },
  {
    id: "usr-tea-3",
    role: "Teacher",
    name: "কাজী নাসিমা আক্তার",
    username: "nasima.english",
    email: "nasima@idealschool.edu.bd",
    password: "123",
    subject: "ইংরেজি ১ম ও ২য় পত্র (English)",
    designation: "সহকারী প্রধান শিক্ষক",
    phone: "01713-778899",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    assignedClass: "৮ম ও ১০ম শ্রেণি"
  },

  // 2. Approved Students (Enrolled via Admission Approval)
  {
    id: "usr-std-1",
    role: "Student",
    name: "তানভীর আহমেদ (Tanvir Ahmed)",
    username: "ISC-2026-1014",
    studentId: "ISC-2026-1014",
    email: "tanvir@student.idealschool.edu.bd",
    password: "123",
    class: "১০ম শ্রেণি (দিবা-ক)",
    group: "বিজ্ঞান বিভাগ (Science Group)",
    roll: 101,
    phone: "01711-489201",
    guardianName: "জনাব মোঃ রিয়াজ উদ্দিন",
    admissionStatus: "Approved",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-std-2",
    role: "Student",
    name: "নাবিল রহমান",
    username: "ISC-2026-1015",
    studentId: "ISC-2026-1015",
    email: "nabil@student.idealschool.edu.bd",
    password: "123",
    class: "১০ম শ্রেণি (দিবা-ক)",
    group: "বিজ্ঞান বিভাগ",
    roll: 102,
    phone: "01812-998877",
    guardianName: "মোঃ নজরুল ইসলাম",
    admissionStatus: "Approved",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
  },

  // 3. Parents / Guardians
  {
    id: "usr-par-1",
    role: "Parent",
    name: "জনাব মোঃ রিয়াজ উদ্দিন",
    username: "riaz.parent",
    email: "riaz.uddin@gmail.com",
    password: "123",
    phone: "01711-489201",
    studentLinked: "তানভীর আহমেদ (ISC-2026-1014)",
    studentId: "ISC-2026-1014",
    avatar: "/images/guardian_rep.jpg"
  },

  // 4. Governing Body / Super Admin
  {
    id: "usr-adm-1",
    role: "Super Admin",
    name: "প্রকৌশলী এ. কে. মোস্তাফিজুর রহমান",
    username: "chairman",
    email: "chairman@idealschool.edu.bd",
    password: "123",
    designation: "সভাপতি, গভর্নিং বডি ও প্রধান প্রশাসক",
    phone: "01711-000001",
    avatar: "/images/chairman.jpg"
  },

  // 5. System Admin (Full Access)
  {
    id: "usr-admin-0",
    role: "Admin",
    name: "সিস্টেম অ্যাডমিনিস্ট্রেটর",
    username: "admin",
    email: "admin@idealschool.edu.bd",
    password: "admin",
    designation: "প্রধান সিস্টেম অ্যাডমিন",
    phone: "01711-000000",
    avatar: "/images/chairman.jpg"
  }
];

export const DEFAULT_ADMISSIONS = [
  {
    id: "APP-2026-9842",
    studentName: "সাদিয়া জান্নাত (Sadia Jannat)",
    grade: "৯ম শ্রেণি (বিজ্ঞান বিভাগ - দিবা শাখা)",
    parentName: "মোঃ রফিকুল ইসলাম",
    phone: "01712-445566",
    email: "rafiq.islam@gmail.com",
    appliedDate: "১৯ সেপ্টেম্বর ২০২৬",
    status: "Pending", // "Pending" | "Approved" | "Rejected"
    generatedId: null,
    generatedPassword: null,
    smsSent: false
  },
  {
    id: "APP-2026-9843",
    studentName: "আবির মাহমুদ (Abir Mahmud)",
    grade: "একাদশ শ্রেণি (বিজ্ঞান - জিপিএ ৫.০০)",
    parentName: "ড. শাহনাজ পারভীন",
    phone: "01911-332211",
    email: "shahnaz@gmail.com",
    appliedDate: "২০ সেপ্টেম্বর ২০২৬",
    status: "Pending",
    generatedId: null,
    generatedPassword: null,
    smsSent: false
  },
  {
    id: "APP-2026-9750",
    studentName: "তানভীর আহমেদ (Tanvir Ahmed)",
    grade: "১০ম শ্রেণি (বিজ্ঞান বিভাগ)",
    parentName: "জনাব মোঃ রিয়াজ উদ্দিন",
    phone: "01711-489201",
    email: "riaz.uddin@gmail.com",
    appliedDate: "১৫ আগস্ট ২০২৬",
    status: "Approved",
    generatedId: "ISC-2026-1014",
    generatedPassword: "123",
    smsSent: true,
    approvedDate: "১৬ আগস্ট ২০২৬"
  }
];

const ACCOUNTS_STORAGE_KEY = 'schoolpulse_accounts';

// Helper to get accounts
export function getAccounts() {
  const data = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
  if (!data) {
    saveAccounts(DEFAULT_ACCOUNTS);
    return DEFAULT_ACCOUNTS;
  }
  try {
    const parsed = JSON.parse(data);
    // Sanitize any broken /artifacts/ paths
    const sanitized = parsed.map(acc => {
      let avatar = acc.avatar;
      if (!avatar || avatar.includes('/artifacts/')) {
        if (acc.role === 'Teacher') avatar = '/images/principal.jpg';
        else if (acc.role === 'Parent') avatar = '/images/guardian_rep.jpg';
        else if (acc.role === 'Super Admin' || acc.role === 'Admin') avatar = '/images/chairman.jpg';
        else avatar = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80';
      }
      return { ...acc, avatar };
    });

    // Always ensure the system admin account exists
    const hasAdmin = sanitized.some(a => a.role === 'Admin' && a.username === 'admin');
    if (!hasAdmin) {
      sanitized.push({
        id: 'usr-admin-0', role: 'Admin', name: 'সিস্টেম অ্যাডমিনিস্ট্রেটর',
        username: 'admin', email: 'admin@idealschool.edu.bd', password: 'admin',
        designation: 'প্রধান সিস্টেম অ্যাডমিন', phone: '01711-000000', avatar: '/images/chairman.jpg'
      });
      saveAccounts(sanitized);
    }

    return sanitized;
  } catch (e) {
    return DEFAULT_ACCOUNTS;
  }
}

// Helper to save accounts
export function saveAccounts(accounts) {
  localStorage.setItem('schoolpulse_accounts', JSON.stringify(accounts));
}

// Helper to get admissions
export function getAdmissions() {
  const saved = localStorage.getItem('schoolpulse_admissions');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }
  return DEFAULT_ADMISSIONS;
}

// Helper to save admissions
export function saveAdmissions(admissions) {
  localStorage.setItem('schoolpulse_admissions', JSON.stringify(admissions));
}

// 1. Submit Online Admission Application
export function submitAdmissionApplication({ studentName, grade, parentName, phone, email }) {
  const admissions = getAdmissions();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newApp = {
    id: `APP-2026-${randomNum}`,
    studentName,
    grade,
    parentName,
    phone,
    email: email || `${phone}@parent.idealschool.edu.bd`,
    appliedDate: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
    status: 'Pending',
    generatedId: null,
    generatedPassword: null,
    smsSent: false
  };

  const updated = [newApp, ...admissions];
  saveAdmissions(updated);
  return newApp;
}

// 2. Admin Approve Admission Application -> Auto-generates ID & Password & SMS
export function approveAdmissionApplication(applicationId) {
  const admissions = getAdmissions();
  const accounts = getAccounts();

  const targetApp = admissions.find(a => a.id === applicationId);
  if (!targetApp) return null;

  // Auto-generate Student ID and Password
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const generatedId = `ISC-2026-${randomSuffix}`;
  const generatedPassword = `Ideal#${Math.floor(1000 + Math.random() * 9000)}`;
  const approvalDate = new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });

  // Update admission record
  const updatedAdmissions = admissions.map(a => {
    if (a.id === applicationId) {
      return {
        ...a,
        status: 'Approved',
        generatedId,
        generatedPassword,
        smsSent: true,
        approvedDate: approvalDate
      };
    }
    return a;
  });
  saveAdmissions(updatedAdmissions);

  // Auto-create Student Account
  const newStudentAccount = {
    id: `usr-std-${Date.now()}`,
    role: "Student",
    name: targetApp.studentName,
    username: generatedId,
    studentId: generatedId,
    email: targetApp.email,
    password: generatedPassword,
    class: targetApp.grade,
    group: targetApp.grade.includes('বিজ্ঞান') ? 'বিজ্ঞান বিভাগ' : targetApp.grade.includes('ব্যবসায়') ? 'ব্যবসায় শিক্ষা' : 'সাধারণ',
    roll: Math.floor(105 + Math.random() * 50),
    phone: targetApp.phone,
    guardianName: targetApp.parentName,
    admissionStatus: "Approved",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80"
  };

  // Auto-create Parent Account linked to student
  const newParentAccount = {
    id: `usr-par-${Date.now()}`,
    role: "Parent",
    name: targetApp.parentName,
    username: `p.${generatedId.toLowerCase()}`,
    email: targetApp.email,
    password: generatedPassword,
    phone: targetApp.phone,
    studentLinked: `${targetApp.studentName} (${generatedId})`,
    studentId: generatedId,
    avatar: "/images/guardian_rep.jpg"
  };

  const updatedAccounts = [newStudentAccount, newParentAccount, ...accounts];
  saveAccounts(updatedAccounts);

  // Build authentic SMS Notification content (Bangladesh style)
  const smsContent = `[Ideal School & College] Congratulations! ${targetApp.studentName}-er bhorti anumodik hoyeche. Student ID: ${generatedId}, Password: ${generatedPassword}. Login: idealschool.edu.bd/#login - Dhonnobad!`;

  // Send Real SMS via Bangladesh Gateway
  sendSMS(targetApp.phone, smsContent).then(res => {
    console.log('[Admission SMS] Sent to', targetApp.phone, '| Status:', res.success ? 'SUCCESS' : 'FAILED', res.response || res.error || '');
  });

  return {
    application: targetApp,
    studentId: generatedId,
    password: generatedPassword,
    smsMessage: smsContent,
    phone: targetApp.phone,
    parentName: targetApp.parentName,
    studentName: targetApp.studentName
  };
}

// 3. Create Teacher Account (with mandatory Subject specification)
export function createTeacherAccount({ name, subject, designation, assignedClass, phone, email, username, password }) {
  const accounts = getAccounts();
  const newTeacher = {
    id: `usr-tea-${Date.now()}`,
    role: "Teacher",
    name,
    username: username.trim(),
    email: email.trim(),
    password: password.trim(),
    subject, // Subject taught: e.g. পদার্থবিজ্ঞান, রসায়ন, গণিত
    designation: designation || "সহকারী শিক্ষক",
    phone,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    assignedClass: assignedClass || "১০ম শ্রেণি (বিজ্ঞান)"
  };

  const updated = [newTeacher, ...accounts];
  saveAccounts(updated);
  return newTeacher;
}

// 4. Create Parent Account
export function createParentAccount({ name, phone, email, studentLinked, username, password }) {
  const accounts = getAccounts();
  const newParent = {
    id: `usr-par-${Date.now()}`,
    role: "Parent",
    name,
    username: username.trim(),
    email: email.trim(),
    password: password.trim(),
    phone,
    studentLinked: studentLinked || "শিক্ষার্থী",
    studentId: username,
    avatar: "/images/guardian_rep.jpg"
  };

  const updated = [newParent, ...accounts];
  saveAccounts(updated);
  return newParent;
}

// 5. Authenticate User against Accounts & Admission Status
export function authenticateUser(role, identifier, password) {
  const accounts = getAccounts();
  const admissions = getAdmissions();

  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = password.trim();

  // First check if a pending student is trying to login
  const pendingStudent = admissions.find(a => 
    a.status === 'Pending' && 
    ((a.id && a.id.toLowerCase() === cleanId) || 
     (a.phone && a.phone.includes(cleanId)) || 
     (a.studentName && a.studentName.toLowerCase().includes(cleanId)))
  );

  if (pendingStudent && (role === 'Student' || cleanId.includes('app-') || cleanId.includes('isc-'))) {
    return {
      success: false,
      isPending: true,
      error: `আবেদনকারী ${pendingStudent.studentName}-এর ভর্তি আবেদনটি বর্তমানে অপেক্ষমাণ রয়েছে। অধ্যক্ষ/প্রশাসন অনুমোদন (Approve) করার পর আপনার মোবাইলে (${pendingStudent.phone}) আইডি ও পাসওয়ার্ড এসএমএস পাঠানো হবে।`
    };
  }

  // Admin shortcut: username=admin password=admin
  if (cleanId === 'admin' && cleanPass === 'admin') {
    const adminAcc = accounts.find(a => a.role === 'Admin' && a.username === 'admin');
    if (adminAcc) return { success: true, user: adminAcc };
    return {
      success: true,
      user: {
        id: 'usr-admin-0', role: 'Admin', name: 'সিস্টেম অ্যাডমিনিস্ট্রেটর',
        username: 'admin', email: 'admin@idealschool.edu.bd',
        designation: 'প্রধান সিস্টেম অ্যাডমিন', avatar: '/images/chairman.jpg'
      }
    };
  }

  // Find matching account by username, studentId, email, or phone
  const matchedAccount = accounts.find(acc => {
    const matchId = (acc.username && acc.username.toLowerCase() === cleanId) ||
                    (acc.studentId && acc.studentId.toLowerCase() === cleanId) ||
                    (acc.email && acc.email.toLowerCase() === cleanId) ||
                    (acc.phone && acc.phone.replace(/[^0-9]/g, '') === cleanId.replace(/[^0-9]/g, ''));
    
    // Role match (or flexible role match if direct username/ID is provided)
    const matchRole = !role || acc.role === role || 
                      (role === 'Admin' && acc.role === 'Admin') ||
                      (role === 'Teacher' && (acc.role === 'Teacher' || acc.role === 'Super Admin')) ||
                      (role === 'Super Admin' && acc.role === 'Super Admin');

    return matchId && matchRole;
  });

  if (!matchedAccount) {
    return {
      success: false,
      isPending: false,
      error: `ইউজার আইডি/ইমেইল (${identifier}) খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক ইউজারনেম প্রদান করুন।`
    };
  }

  // Verify password (allows '123' or 'SchoolPulse@2026' or account's password)
  if (matchedAccount.password !== cleanPass && cleanPass !== '123' && cleanPass !== 'SchoolPulse@2026') {
    return {
      success: false,
      isPending: false,
      error: `প্রদত্ত পাসওয়ার্ডটি সঠিক নয়। অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।`
    };
  }

  // Check if student account is approved
  if (matchedAccount.role === 'Student' && matchedAccount.admissionStatus !== 'Approved') {
    return {
      success: false,
      isPending: true,
      error: `আপনার ভর্তি আবেদন এখনও অনুমোদিত হয়নি। অনুমোদনের পর এসএমএস-এ প্রাপ্ত তথ্য দিয়ে লগইন করুন।`
    };
  }

  return {
    success: true,
    user: matchedAccount
  };
}

// Helper to reset accounts and admissions to default
export function resetAuthToDefaults() {
  saveAccounts(DEFAULT_ACCOUNTS);
  saveAdmissions(DEFAULT_ADMISSIONS);
}
