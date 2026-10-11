import React, { useState, useEffect } from 'react';
import { 
  Laptop,
  Trees,
  Trophy,
  School,
  AlertTriangle,
  Smartphone,
  Microscope,
  Star,
  Building2, 
  BookOpen, 
  Calendar, 
  Award, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Bell, 
  GraduationCap, 
  CheckCircle2, 
  Cpu, 
  Dumbbell, 
  Library, 
  Monitor, 
  Bus, 
  Utensils, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink,
  Lock,
  ChevronRight,
  ChevronLeft,
  Clock,
  Download,
  Megaphone,
  LogIn,
  UserPlus,
  Play,
  Pause,
  Menu,
  X,
  Eye
} from 'lucide-react';
import { INSTITUTION, NOTICES, STUDENT_REPORT_CARD } from '../data/mockData';
import { submitAdmissionApplication, getAccounts } from '../data/authManager';
import { AIProfessorSection } from './AIProfessorSection';


export function SchoolPublicWebsite({ onNavigateLogin }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeNoticeModal, setActiveNoticeModal] = useState(null);
  const [activeLeadershipModal, setActiveLeadershipModal] = useState(null);
  const [isExamResultsModalOpen, setIsExamResultsModalOpen] = useState(false);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [selectedFacilityModal, setSelectedFacilityModal] = useState(null);
  const [resultSearchForm, setResultSearchForm] = useState({ studentId: '', roll: '', phone: '', classGroup: '' });
  const [foundStudent, setFoundStudent] = useState(null);
  const [resultNotFound, setResultNotFound] = useState(false);
  const [hasSearchedResult, setHasSearchedResult] = useState(false);

  // Helper: get saved report card
  const getSavedReportCard = () => {
    try {
      const saved = localStorage.getItem('schoolpulse_student_report_card');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return STUDENT_REPORT_CARD;
  };

  // Search student by ID / Roll / Phone / Class
  const handleResultSearch = () => {
    const { studentId, roll, phone, classGroup } = resultSearchForm;
    if (!studentId.trim() && !roll.trim() && !phone.trim() && !classGroup.trim()) return;
    const accounts = getAccounts();
    const students = accounts.filter(a => a.role === 'Student');
    const found = students.find(s => {
      const sid = studentId.trim().toLowerCase();
      const r = roll.trim();
      const ph = phone.trim().replace(/[^0-9]/g, '');
      const cl = classGroup.trim().toLowerCase();
      const matchId = sid && s.studentId && s.studentId.toLowerCase().includes(sid);
      const matchRoll = r && s.roll && String(s.roll).includes(r);
      const matchPhone = ph && s.phone && s.phone.replace(/[^0-9]/g, '').includes(ph);
      const matchClass = cl && s.class && s.class.toLowerCase().includes(cl);
      return matchId || matchRoll || matchPhone || matchClass;
    });
    setFoundStudent(found || null);
    setResultNotFound(!found);
    setHasSearchedResult(true);
  };
  const [admissionSuccess, setAdmissionSuccess] = useState(false);
  const [submittedApp, setSubmittedApp] = useState(null);
  const [admissionForm, setAdmissionForm] = useState({
    studentName: '',
    grade: '১০ম শ্রেণি (বিজ্ঞান বিভাগ)',
    parentName: '',
    phone: '',
    email: ''
  });
  const [activeNav, setActiveNav] = useState('about');

  // 6 Auto-swapping Hero Campus Slides (Requested by User)
  const heroSlides = [
    {
      id: 'gate',
      category: 'মূল ফটক (Main Gate)',
      icon: Building2,
      image: '/images/hero_gate.jpg',
      badge: 'ক্যাম্পাসের মূল ফটক • মতিঝিল প্রবেশদ্বার',
      title: 'ঐতিহ্যবাহী আইডিয়াল স্কুল অ্যান্ড কলেজ মূল তোরণ',
      subtitle: 'নিরাপদ ও সুশৃঙ্খল পরিবেশ • আধুনিক সিসিটিভি সার্ভেইল্যান্স ও অটো গেট পাস',
      statBadge: 'স্থাপিত ১৯৬৫ • ঢাকা শিক্ষা বোর্ড'
    },
    {
      id: 'classroom',
      category: 'স্মার্ট ক্লাসরুম (Classroom)',
      icon: School,
      image: '/images/hero_classroom.jpg',
      badge: 'স্মার্ট ডিজিটাল ক্লাসরুম • ইন্টারেক্টিভ লার্নিং',
      title: 'মাল্টিমিডিয়া প্রজেক্টর ও ইন্টারেক্টিভ স্মার্টবোর্ড',
      subtitle: 'শিক্ষার্থীদের আনন্দময় পাঠদান • শীতাতপ নিয়ন্ত্রিত আধুনিক ক্লাস রুম',
      statBadge: '১০০% ডিজিটাল ক্লাসরুম'
    },
    {
      id: 'lab',
      category: 'ডিজিটাল ল্যাব (Lab)',
      icon: Laptop,
      image: '/images/hero_lab.jpg',
      badge: 'শেখ রাসেল ডিজিটাল ল্যাব • বিজ্ঞানাগার',
      title: 'আইসিটি, রোবোটিক্স ও উন্নত বিজ্ঞান ল্যাবরেটরি',
      subtitle: 'পদার্থ, রসায়ন, জীববিজ্ঞান ও অত্যাধুনিক কম্পিউটার ল্যাব সুবিধা',
      statBadge: '১২০+ ওয়ার্কস্টেশন ও গিগাবিট নেট'
    },
    {
      id: 'environment',
      category: 'সবুজ পরিবেশ (Environment)',
      icon: Trees,
      image: '/images/hero_environment.jpg',
      badge: 'সবুজ ক্যাম্পাস পরিবেশ • ১২ একর মনোরম চত্বর',
      title: 'প্রকৃতিঘেরা নির্মল ও নান্দনিক বিদ্যাপীঠ',
      subtitle: 'দূষণমুক্ত সবুজ মাঠ, বৃক্ষশোভিত চত্বর ও প্রশস্ত সাজানো পদচারণা পথ',
      statBadge: 'পরিবেশবান্ধব গ্রিন ক্যাম্পাস'
    },
    {
      id: 'field',
      category: 'খেলার মাঠ (Field)',
      icon: Trophy,
      image: '/images/hero_field.jpg',
      badge: 'কেন্দ্রীয় খেলার মাঠ • বার্ষিক ক্রীড়া প্রতিযোগিতা',
      title: 'বিশাল খেলার মাঠ ও ক্রীড়া কমপ্লেক্স',
      subtitle: 'ক্রিকেট, ফুটবল, দৌড় প্রতিযোগিতা, শারীরিক শিক্ষা ও প্যারেড গ্রাউন্ড',
      statBadge: 'আন্তঃস্কুল ক্রীড়া চ্যাম্পিয়ন'
    },
    {
      id: 'library',
      category: 'কেন্দ্রীয় লাইব্রেরি (Library)',
      icon: BookOpen,
      image: '/images/hero_library.jpg',
      badge: 'কেন্দ্রীয় পাঠাগার • বঙ্গবন্ধু কর্নার',
      title: 'সমৃদ্ধ জ্ঞানভাণ্ডার ও শান্ত অধ্যয়ন চত্বর',
      subtitle: '২৫,০০০+ বই, দেশি-বিদেশি রেফারেন্স জার্নাল ও ডিজিটাল ই-লাইব্রেরি',
      statBadge: '২৫,০০০+ পুস্তক সংগ্রহ'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlidePaused, setIsSlidePaused] = useState(false);

  // Auto-swap every 4.5 seconds
  useEffect(() => {
    if (isSlidePaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isSlidePaused, heroSlides.length]);

  const handleNextSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const toBengaliNumber = (num) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).split('').map(digit => bengaliDigits[parseInt(digit)] || digit).join('');
  };

  const navItems = [
    { id: 'about', label: 'আমাদের প্রতিষ্ঠান', href: '#about', icon: BookOpen },
    { id: 'leadership', label: 'নেতৃত্ব ও প্রশাসন', href: '#leadership', icon: Users },
    { id: 'notices', label: 'নোটিশ বোর্ড', href: '#notices', icon: Bell, badge: 'লাইভ' },
    { id: 'facilities', label: 'সুযোগ-সুবিধা', href: '#facilities', icon: Sparkles },
    { id: 'academics', label: 'শিক্ষা কার্যক্রম', href: '#academics', icon: GraduationCap },
    { id: 'ai-professor', label: 'এআই প্রফেসর', href: '#ai-professor', icon: Cpu, badge: 'AI New' },
    { id: 'contact', label: 'যোগাযোগ', href: '#contact', icon: Phone }
  ];

  // Messages from Leadership Data
  const leadershipMembers = [
    {
      id: 'chairman',
      roleTitle: 'সভাপতি',
      name: 'এ. কে. মোস্তাফিজুর রহমান',
      institution: 'আইডিয়াল স্কুল অ্যান্ড কলেজ',
      image: '/images/chairman.jpg',
      quote: 'শিক্ষা শুধু পুথিগত বিদ্যার মধ্যে সীমাবদ্ধ নয়; নৈতিক মূল্যবোধ, শৃঙ্খলা এবং সৃজনশীল মেধার উন্মেষের মাধ্যমে মানবিক গুণসম্পন্ন আদর্শ নাগরিক গড়ে তোলাই আমাদের লক্ষ্য। এই প্রতিষ্ঠানের প্রতিটি শিক্ষার্থী যাতে আধুনিক তথ্যপ্রযুক্তি ও বৈশ্বিক প্রতিযোগিতায় নিজেকে প্রস্তুত করতে পারে, সে লক্ষ্যে ম্যানেজিং কমিটি নিরলসভাবে কাজ করে যাচ্ছে।'
    },
    {
      id: 'principal',
      roleTitle: 'অধ্যক্ষ',
      name: 'Prof. Lal Mohammad',
      institution: 'আইডিয়াল স্কুল অ্যান্ড কলেজ',
      image: '/images/principal.jpg',
      quote: 'আমাদের প্রধান অঙ্গীকার হলো শিক্ষার্থীদের জন্য একটি অনুপ্রেরণাদায়ী, নিরাপদ ও আধুনিক শিক্ষার পরিবেশ নিশ্চিত করা। সম্মানিত শিক্ষক মন্ডলীর আন্তরিক প্রচেষ্টা, অভিভাবকদের অব্যাহত সহযোগিতা এবং শিক্ষার্থীদের কঠোর অধ্যবসায়ের সমন্বয়ে আমরা ধারাবাহিক সাফল্য অর্জন করে আসছি। শিক্ষার্থীদের সার্বিক মেধার বিকাশে আমরা সর্বদা সচেষ্ট।'
    },
    {
      id: 'teacher-rep',
      roleTitle: 'সাধারণ শিক্ষক সদস্য',
      name: 'জনাব শরীফ সামছুদ্দোহা',
      institution: 'আইডিয়াল স্কুল অ্যান্ড কলেজ',
      image: '/images/teacher_rep.jpg',
      quote: 'শিক্ষকরা হলেন জাতি গড়ার কারিগর। শ্রেণিকক্ষে পাঠদানের পাশাপাশি শিক্ষার্থীদের নৈতিক চরিত্র গঠন, আধুনিক বিজ্ঞানমনস্ক দৃষ্টিভঙ্গি তৈরি এবং পাঠ্যক্রম বহির্ভূত কার্যক্রমে উৎসাহিত করতে আমাদের শিক্ষক সমাজ সার্বক্ষণিক নিবেদিতপ্রাণ। আমরা প্রতিটি শিক্ষার্থীর ব্যক্তিস্বাতন্ত্র্যকে সম্মান জানিয়ে এগিয়ে নিতে প্রতিশ্রুতিবদ্ধ।'
    },
    {
      id: 'guardian-rep',
      roleTitle: 'অভিভাবক সদস্য',
      name: 'জনাব মোঃ রিয়াজ উদ্দিন',
      institution: 'আইডিয়াল স্কুল অ্যান্ড কলেজ',
      image: '/images/guardian_rep.jpg',
      quote: 'অভিভাবক এবং শিক্ষাপ্রতিষ্ঠানের পারস্পরিক সুসম্পর্ক ও খোলামেলা যোগাযোগই একটি সফল শিক্ষাব্যবস্থার মূল ভিত্তি। সন্তানদের মানসিক স্বাস্থ্য, নিরাপত্তা এবং শারীরিক ও মেধা বিকাশের ব্যাপারে আমরা সর্বদা সচেতন থেকে ম্যানেজিং কমিটিকে প্রয়োজনীয় মতামত প্রদান করে আসছি।'
    }
  ];

  // Extended Facilities tailored for Bangladesh Premier School Infrastructure
  const facilities = [
    {
      id: 'stem-lab',
      icon: Cpu,
      title: 'রোবোটিক্স ও আধুনিক আইসিটি ল্যাব',
      badge: 'শেখ রাসেল ডিজিটাল ল্যাব',
      tagColor: '#4338ca',
      tagBg: '#eef2ff',
      image: '/images/facility_robotics.jpg',
      description: 'আধুনিক কম্পিউটার ওয়ার্কস্টেশন, থ্রিডি প্রিন্টার, পাইথন প্রোগ্রামিং ও রোবোটিক্স কিট সজ্জিত ল্যাব যেখানে শিক্ষার্থীরা হাতে-কলমে তথ্যপ্রযুক্তি ও বিজ্ঞান শিক্ষা গ্রহণ করে।',
      specs: ['৩২টি উচ্চগতির কম্পিউটার টার্মিনাল', 'শেখ রাসেল ডিজিটাল ল্যাব নেটওয়ার্ক', 'রোবোটিক্স ও প্রোগ্রামিং অলিম্পিয়াড ক্লাব']
    },
    {
      id: 'sports-complex',
      icon: Dumbbell,
      title: 'শহীদ মিনার, খেলার মাঠ ও স্পোর্টস কমপ্লেক্স',
      badge: 'শারীরিক শিক্ষা ও ক্রীড়া',
      tagColor: '#059669',
      tagBg: '#ecfdf5',
      image: '/images/facility_sports.jpg',
      description: 'বিশাল সবুজ ফুটবল ও ক্রিকেট খেলার মাঠ, বাৎসরিক ক্রীড়া প্রতিযোগিতা ট্র‍্যাক, ইনডোর সুইমিং পুল এবং বাস্কেটবল ও ব্যাডমিন্টন কোর্ট।',
      specs: ['স্ট্যান্ডার্ড ফুটবল ও ক্রিকেট মাঠ', 'বার্ষিক ক্রীড়া ও কুচকাওয়াজ ট্র্যাক', 'ইনডোর টেবিল টেনিস ও ব্যাডমিন্টন']
    },
    {
      id: 'digital-library',
      icon: Library,
      title: 'কেন্দ্রীয় গ্রন্থাগার ও বঙ্গবন্ধু কর্নার',
      badge: 'পাঠাগার ও গবেষণা',
      tagColor: '#7c3aed',
      tagBg: '#f5f3ff',
      image: '/images/facility_library.jpg',
      description: '৩০,০০০-এর বেশি বই, এনসাইক্লোপিডিয়া, মুক্তিযুদ্ধ ও বঙ্গবন্ধু গবেষণা কর্নার, জাতীয় দৈনিক ও বিজ্ঞান সাময়িকী পড়ার সুপরিসর মনোরম পরিবেশ।',
      specs: ['৩০,০০০+ পাঠ্য ও রেফারেন্স গ্রন্থ', 'ঐতিহাসিক মুক্তিযুদ্ধ ও বঙ্গবন্ধু কর্নার', 'দৈনিক সংবাদপত্র ও সাময়িকী রিডিং ডেস্ক']
    },
    {
      id: 'smart-classrooms',
      icon: Monitor,
      title: 'মাল্টিমিডিয়া ডিজিটাল ক্লাসরুম',
      badge: 'আধুনিক অবকাঠামো',
      tagColor: '#0284c7',
      tagBg: '#e0f2fe',
      image: '/images/facility_smart_class.jpg',
      description: 'প্রতিটি শ্রেণিকক্ষে মাল্টিমিডিয়া প্রজেক্টর ও ইন্টারেক্টিভ ডিজিটাল ডিসপ্লে, আধুনিক সাউন্ড সিস্টেম এবং স্বাস্থ্যসম্মত আলো-বাতাসযুক্ত পরিবেশ।',
      specs: ['মাল্টিমিডিয়া প্রজেক্টর ও স্মার্টবোর্ড', 'পর্যাপ্ত আলো-বাতাস ও ডিজিটাল পাঠদান', 'সিসিটিভি মনিটরিং ও জেনারেটর ব্যাকআপ']
    },
    {
      id: 'transport',
      icon: Bus,
      title: 'নিজস্ব নিরাপদ বাস পরিবহন সার্ভিস',
      badge: 'নিরাপদ যাতায়াত',
      tagColor: '#d97706',
      tagBg: '#fef3c7',
      image: '/images/facility_transport.jpg',
      description: 'ঢাকা শহরের বিভিন্ন রুটে শিক্ষার্থীদের নিরাপদ ও সময়মতো যাতায়াতের জন্য ২৪টি আধুনিক স্কুল বাসের নিজস্ব পরিবহন বহর এবং সার্বক্ষণিক জিপিএস ট্র্যাকিং।',
      specs: ['ঢাকা সিটির প্রধান প্রধান রুটে সার্ভিস', 'অভিভাবক অ্যাপে লাইভ বাস ট্র্যাকিং', 'অভিজ্ঞ ড্রাইভার ও হেল্পার তত্ত্বাবধান']
    },
    {
      id: 'cafeteria',
      icon: Utensils,
      title: 'স্বাস্থ্যসম্মত স্কুল ক্যান্টিন ও রিফ্রেশমেন্ট',
      badge: 'পুষ্টি ও স্বাস্থ্য',
      tagColor: '#e11d48',
      tagBg: '#fff1f2',
      image: '/images/facility_dining.jpg',
      description: 'সম্পূর্ণ স্বাস্থ্যসম্মত পরিবেশে প্রস্তুতকৃত পুষ্টিকর টিফিন, বিশুদ্ধ ফিল্টারকৃত খাবার পানি এবং মানসম্মত হালকা খাবারের আধুনিক সুপরিসর ক্যান্টিন।',
      specs: ['১০০% স্বাস্থ্যসম্মত ও টাটকা খাবার', 'রিভার্স অসমোসিস (RO) বিশুদ্ধ পানি', 'নিয়মিত ফুড সেফটি ও হাইজিন অডিট']
    }
  ];

  // Filtered Notices
  const filteredNotices = selectedCategory === 'All' 
    ? NOTICES 
    : NOTICES.filter(n => n.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#0f172a', fontFamily: 'var(--font-body)', minHeight: '100vh' }}>

      {/* Top Notification Announcement Bar */}
      <div style={{
        backgroundColor: '#4338ca',
        color: '#ffffff',
        padding: '8px 24px',
        fontSize: '0.78rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <span style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '2px 8px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.7rem',
          fontWeight: 700
        }}>
          ভর্তি বিজ্ঞপ্তি ২০২৬
        </span>
        <span>শিক্ষাবর্ষ ২০২৬-২০২৭ • ১ম থেকে ৯ম শ্রেণি এবং একাদশ শ্রেণিতে কেন্দ্রীয় ডিজিটাল লটারির মাধ্যমে ভর্তি চলছে।</span>
        <button
          onClick={onNavigateLogin}
          style={{
            background: '#ffffff',
            color: '#4338ca',
            border: 'none',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.72rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          শিক্ষক ও শিক্ষার্থী পোর্টাল <ArrowRight size={12} />
        </button>
      </div>

      {/* Main Public Sticky Navigation Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #e2e8f0',
        minHeight: '68px',
        boxShadow: '0 4px 20px -4px rgba(15, 23, 42, 0.08)'
      }}>
        <div style={{
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          {/* Logo & School Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 900,
              fontSize: '1.15rem',
              boxShadow: '0 4px 14px -2px rgba(29, 78, 216, 0.35)',
              flexShrink: 0
            }}>
              ISC
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.15rem',
                letterSpacing: '-0.02em',
                color: '#0f172a',
                lineHeight: 1.15,
                whiteSpace: 'nowrap'
              }}>
                আইডিয়াল <span style={{ color: '#1d4ed8' }}>স্কুল অ্যান্ড কলেজ</span>
              </div>
              <div className="brand-subtext" style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap' }}>
                ঢাকা শিক্ষা বোর্ড ও NCTB অনুমোদিত • স্থাপিত ১৯৬৫ • EIIN: 108275
              </div>
            </div>
          </div>

          {/* Center Navigation Themed Animated Capsule (Desktop & Laptop) */}
          <nav className="public-nav-capsule desktop-nav-capsule">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveNav(item.id)}
                  className={`public-nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="badge-pill" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      backgroundColor: '#ecfdf5',
                      color: '#059669',
                      padding: '1px 5px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid #a7f3d0'
                    }}>
                      <span style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                        display: 'inline-block',
                        animation: 'pulseGlow 2s infinite ease-in-out'
                      }} />
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Highlighted Portal Login Button & Mobile Menu Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <button
              onClick={onNavigateLogin}
              className="btn btn-primary btn-shine"
              style={{
                padding: '8px 16px',
                fontSize: '0.82rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-md)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px -2px rgba(67, 56, 202, 0.4)',
                whiteSpace: 'nowrap'
              }}
            >
              <Lock size={14} />
              <span>পোর্টাল লগইন</span>
              <ArrowRight size={13} />
            </button>

            {/* Mobile / Tablet Menu Button Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              aria-label="মেনু খুলুন"
              title="মেনু খুলুন"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-drawer">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveNav(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={18} color="#1d4ed8" />
                    <span>{item.label}</span>
                  </span>
                  {item.badge && (
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      backgroundColor: '#ecfdf5',
                      color: '#059669',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid #a7f3d0'
                    }}>
                      ● {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        )}
      </header>

      {/* ===== HERO SECTION — PRISTINE WHITE LUXURY THEME ===== */}
      <section style={{
        position: 'relative',
        padding: '55px 24px 75px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 45%, #f1f5f9 100%)',
        overflow: 'hidden'
      }}>

        {/* Soft Ambient Light Glows */}
        <div style={{
          position: 'absolute', top: '-80px', left: '5%',
          width: '550px', height: '550px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: '40px', right: '5%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '0', left: '40%',
          width: '600px', height: '350px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)',
          filter: 'blur(70px)', pointerEvents: 'none'
        }} />

        {/* Elegant Dot Matrix Background Pattern */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.22) 1.2px, transparent 1.2px)',
          backgroundSize: '32px 32px'
        }} />

        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>

          {/* Glowing Top Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '9px 24px', borderRadius: '9999px',
            background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
            border: '1px solid #c7d2fe',
            color: '#3730a3', fontSize: '0.88rem', fontWeight: 600,
            marginBottom: '24px',
            boxShadow: '0 2px 10px rgba(67, 56, 202, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
            letterSpacing: '0.01em'
          }}>
            <Sparkles size={14} color="#d97706" />
            <span>জ্ঞানই আলো • ঢাকা শিক্ষা বোর্ড ও NCTB অনুমোদিত শ্রেষ্ঠ বিদ্যাপীঠ</span>
            <Sparkles size={14} color="#d97706" />
          </div>

          {/* Main Heading */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.3rem, 5vw, 3.9rem)',
            fontWeight: 800,
            lineHeight: 1.22,
            letterSpacing: '-0.02em',
            maxWidth: '1050px',
            margin: '0 auto 16px'
          }}>
            <span style={{
              color: '#0f172a',
              display: 'block',
              fontWeight: 800,
              letterSpacing: '-0.02em'
            }}>
              সুশিক্ষা, শৃঙ্খলা ও নৈতিকতায় গড়া,
            </span>
            <span style={{
              display: 'inline-block',
              marginTop: '4px',
              background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 30%, #4f46e5 65%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800
            }}>
              মেধাবী ভবিষ্যতের আদর্শ বিদ্যাপীঠ।
            </span>
          </h1>

          {/* Sub-Heading */}
          <p style={{
            fontSize: '1.12rem',
            color: '#475569',
            maxWidth: '820px',
            margin: '0 auto 36px',
            lineHeight: 1.85,
            fontWeight: 400
          }}>
            স্বাগতম <strong style={{ color: '#1e40af', fontWeight: 700 }}>{INSTITUTION.name}</strong>-এ। ১৯৬৫ সাল থেকে প্রতিষ্ঠিত এই বিদ্যাপীঠে জাতীয় শিক্ষাক্রম ও ঢাকা শিক্ষা বোর্ডের অধীনে প্রাক-প্রাথমিক থেকে দ্বাদশ শ্রেণি পর্যন্ত শ্রেষ্ঠ ফলাফল নিশ্চিতকারী পাঠদান পরিচালিত হচ্ছে।
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <a
              href="#facilities"
              style={{
                textDecoration: 'none', padding: '14px 28px', borderRadius: '12px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #cbd5e1',
                color: '#1e293b', fontSize: '0.94rem', fontWeight: 700,
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)',
                transition: 'all 0.2s ease',
                display: 'inline-flex', alignItems: 'center', gap: '8px'
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.borderColor = '#94a3b8'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <Building2 size={16} style={{ display: 'inline', marginRight: '6px' }} /><span>ক্যাম্পাস সুযোগ-সুবিধা দেখুন</span>
            </a>
            <button
              onClick={onNavigateLogin}
              style={{
                padding: '14px 30px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)',
                color: '#ffffff', fontSize: '0.94rem', fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 99, 235, 0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.3)'; }}
            >
              <Lock size={16} />
              <span>শিক্ষক ও শিক্ষার্থী পোর্টাল লগইন</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Achievement Stats Strip — Themed & Animated */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '18px',
            maxWidth: '960px',
            margin: '0 auto 48px',
            padding: '0 8px'
          }}>
            {[
              {
                value: '৬০+',
                label: 'বছরের ঐতিহ্য',
                icon: Building2,
                accentColor: '#4f46e5',
                gradientBar: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                cardBg: 'linear-gradient(180deg, #ffffff 0%, #f8faff 50%, #eef2ff 100%)',
                borderColor: '#c7d2fe',
                iconBg: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
                iconBorder: '#c7d2fe',
                glowColor: 'rgba(99, 102, 241, 0.28)',
                delay: '0s'
              },
              {
                value: '৩০,০০০+',
                label: 'মোট শিক্ষার্থী',
                icon: GraduationCap,
                accentColor: '#0284c7',
                gradientBar: 'linear-gradient(90deg, #0ea5e9, #38bdf8)',
                cardBg: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%)',
                borderColor: '#bae6fd',
                iconBg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                iconBorder: '#7dd3fc',
                glowColor: 'rgba(14, 165, 233, 0.28)',
                delay: '0.6s'
              },
              {
                value: '১০০%',
                label: 'পাসের হার',
                icon: Trophy,
                accentColor: '#059669',
                gradientBar: 'linear-gradient(90deg, #10b981, #34d399)',
                cardBg: 'linear-gradient(180deg, #ffffff 0%, #ecfdf5 50%, #d1fae5 100%)',
                borderColor: '#a7f3d0',
                iconBg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                iconBorder: '#6ee7b7',
                glowColor: 'rgba(16, 185, 129, 0.28)',
                delay: '1.2s'
              },
              {
                value: '৫০০+',
                label: 'দক্ষ শিক্ষক',
                icon: Users,
                accentColor: '#d97706',
                gradientBar: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                cardBg: 'linear-gradient(180deg, #ffffff 0%, #fffbeb 50%, #fef3c7 100%)',
                borderColor: '#fde68a',
                iconBg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                iconBorder: '#fcd34d',
                glowColor: 'rgba(245, 158, 11, 0.28)',
                delay: '1.8s'
              },
              {
                value: 'A+',
                label: 'বোর্ড র‍্যাংকিং',
                icon: '⭐',
                accentColor: '#e11d48',
                gradientBar: 'linear-gradient(90deg, #f43f5e, #fb7185)',
                cardBg: 'linear-gradient(180deg, #ffffff 0%, #fff1f2 50%, #ffe4e6 100%)',
                borderColor: '#fecdd3',
                iconBg: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
                iconBorder: '#fda4af',
                glowColor: 'rgba(244, 63, 94, 0.28)',
                delay: '2.4s'
              }
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  background: stat.cardBg,
                  border: `1.5px solid ${stat.borderColor}`,
                  borderRadius: '20px',
                  padding: '22px 14px 18px',
                  textAlign: 'center',
                  boxShadow: `0 8px 20px -4px ${stat.glowColor}, 0 2px 6px rgba(0,0,0,0.03)`,
                  animation: `cardFloat 4s ease-in-out infinite ${stat.delay}`,
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.animationPlayState = 'paused';
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.04)';
                  e.currentTarget.style.boxShadow = `0 20px 36px -6px ${stat.glowColor}, 0 6px 16px rgba(0,0,0,0.06)`;
                  e.currentTarget.style.borderColor = stat.accentColor;
                  const icon = e.currentTarget.querySelector('.stat-icon');
                  if (icon) icon.style.transform = 'scale(1.2) rotate(10deg)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.animationPlayState = 'running';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = `0 8px 20px -4px ${stat.glowColor}, 0 2px 6px rgba(0,0,0,0.03)`;
                  e.currentTarget.style.borderColor = stat.borderColor;
                  const icon = e.currentTarget.querySelector('.stat-icon');
                  if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                {/* Top Accent Gradient Line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '15%',
                  right: '15%',
                  height: '3.5px',
                  background: stat.gradientBar,
                  borderRadius: '0 0 4px 4px'
                }} />

                {/* Animated Theme Icon */}
                <div
                  className="stat-icon"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    background: stat.iconBg,
                    border: `1.5px solid ${stat.iconBorder}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    margin: '0 auto 12px',
                    boxShadow: `0 4px 12px ${stat.glowColor}`,
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {(() => { const Icon = stat.icon; return Icon ? (typeof Icon === 'string' ? Icon : <Icon size={22} color={stat.accentColor} />) : null; })()}
                </div>

                {/* Stat Number */}
                <div style={{
                  fontSize: '1.65rem',
                  fontWeight: 900,
                  color: stat.accentColor,
                  lineHeight: 1.15,
                  marginBottom: '4px',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.02em'
                }}>
                  {stat.value}
                </div>

                {/* Stat Label */}
                <div style={{
                  fontSize: '0.82rem',
                  color: '#475569',
                  fontWeight: 700,
                  letterSpacing: '-0.01em'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Campus Showcase & Quick Access Action Strip (Matches User Screenshot) */}
          <div style={{
            marginTop: '44px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px -10px rgba(15, 23, 42, 0.12)',
            border: '1px solid #e2e8f0',
            backgroundColor: '#ffffff'
          }}>
            {/* 6 Auto-Swapping Campus Hero Slider (Classroom, Lab, Environment, Field, Library, Main Gate) */}
            <div 
              style={{
                position: 'relative',
                height: '380px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end',
                userSelect: 'none'
              }}
              onMouseEnter={() => setIsSlidePaused(true)}
              onMouseLeave={() => setIsSlidePaused(false)}
            >
              {/* Slides Background Layers (Smooth Cross-fade & Ken Burns Zoom) */}
              {heroSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 45%',
                    opacity: idx === currentSlide ? 1 : 0,
                    transform: idx === currentSlide ? 'scale(1)' : 'scale(1.06)',
                    transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 6s ease-out',
                    zIndex: idx === currentSlide ? 1 : 0,
                    pointerEvents: idx === currentSlide ? 'auto' : 'none'
                  }}
                />
              ))}

              {/* Ambient Dramatic Gradient Overlays */}
              <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.5) 45%, rgba(15, 23, 42, 0.1) 75%, rgba(15, 23, 42, 0.3) 100%)',
                pointerEvents: 'none'
              }} />

              {/* Top Bar on Slide: Live Indicator, Category Tag, Autoplay toggle, and Admissions badge */}
              <div style={{
                position: 'absolute',
                top: '18px',
                left: '20px',
                right: '20px',
                zIndex: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                {/* Left: Active Location Category Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(15, 23, 42, 0.78)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  color: '#ffffff',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.25)'
                }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>{(() => { const Icon = heroSlides[currentSlide].icon; return Icon ? <Icon size={16} /> : null; })()}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.02em' }}>
                    {heroSlides[currentSlide].category}
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    backgroundColor: 'rgba(59, 130, 246, 0.85)',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    fontWeight: 700
                  }}>
                    {toBengaliNumber(currentSlide + 1)} / {toBengaliNumber(heroSlides.length)}
                  </span>
                </div>

                {/* Right: Autoplay Controller & Admissions Pill */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Autoplay Pause / Play Toggle */}
                  <button
                    onClick={() => setIsSlidePaused(prev => !prev)}
                    title={isSlidePaused ? 'অটো-স্লাইড চালু করুন' : 'অটো-স্লাইড সাময়িক বন্ধ করুন'}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: isSlidePaused ? 'rgba(239, 68, 68, 0.85)' : 'rgba(15, 23, 42, 0.75)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '5px 12px',
                      borderRadius: '9999px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                  >
                    {isSlidePaused ? (
                      <>
                        <Play size={12} fill="#ffffff" />
                        <span>অটো-স্লাইড বন্ধ</span>
                      </>
                    ) : (
                      <>
                        <Pause size={12} fill="#ffffff" />
                        <span>অটো-স্লাইড সক্রিয়</span>
                      </>
                    )}
                  </button>

                  {/* Admission Pill */}
                  <span style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.95)',
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      animation: 'pulse 1.8s infinite'
                    }} />
                    ভর্তি চলছে ২০২৬-২৭
                  </span>
                </div>
              </div>

              {/* Prev Slide Navigation Button */}
              <button
                onClick={handlePrevSlide}
                aria-label="পূর্ববর্তী ছবি"
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 4,
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(15, 23, 42, 0.65)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.35)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.9)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.65)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                <ChevronLeft size={22} />
              </button>

              {/* Next Slide Navigation Button */}
              <button
                onClick={handleNextSlide}
                aria-label="পরবর্তী ছবি"
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 4,
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(15, 23, 42, 0.65)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.35)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.9)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.65)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                <ChevronRight size={22} />
              </button>

              {/* Bottom Caption & Content Layer */}
              <div style={{
                position: 'relative',
                zIndex: 3,
                padding: '24px 32px',
                color: '#ffffff',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                width: '100%',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div style={{ maxWidth: '720px' }}>
                  {/* Slide Top Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '0.74rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      fontWeight: 800,
                      backgroundColor: 'rgba(255, 255, 255, 0.22)',
                      backdropFilter: 'blur(10px)',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.25)'
                    }}>
                      {heroSlides[currentSlide].badge}
                    </span>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      backgroundColor: 'rgba(37, 99, 235, 0.85)',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      {heroSlides[currentSlide].statBadge}
                    </span>
                  </div>

                  {/* Slide Main Heading */}
                  <h3 style={{
                    fontSize: '1.65rem',
                    fontWeight: 900,
                    margin: '0 0 6px 0',
                    textShadow: '0 3px 12px rgba(0, 0, 0, 0.6)',
                    color: '#ffffff',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2
                  }}>
                    {heroSlides[currentSlide].title}
                  </h3>

                  {/* Slide Subtitle */}
                  <p style={{
                    fontSize: '0.92rem',
                    margin: 0,
                    color: 'rgba(241, 245, 249, 0.95)',
                    textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
                    lineHeight: 1.4
                  }}>
                    {heroSlides[currentSlide].subtitle}
                  </p>
                </div>

                {/* Dot Navigation Indicators */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  backdropFilter: 'blur(10px)',
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  {heroSlides.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlide(idx)}
                      title={s.category}
                      style={{
                        width: idx === currentSlide ? '26px' : '9px',
                        height: '9px',
                        borderRadius: '9999px',
                        backgroundColor: idx === currentSlide ? '#38bdf8' : 'rgba(255, 255, 255, 0.45)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: idx === currentSlide ? '0 0 10px rgba(56, 189, 248, 0.8)' : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Category Quick Selector Tabs (6 Locations: Main Gate, Classroom, Lab, Environment, Field, Library) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              backgroundColor: '#f8fafc',
              borderTop: '1px solid #e2e8f0',
              borderBottom: '1px solid #e2e8f0'
            }}>
              {heroSlides.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '12px 8px',
                      backgroundColor: isActive ? '#ffffff' : 'transparent',
                      color: isActive ? '#1d4ed8' : '#475569',
                      fontWeight: isActive ? 800 : 600,
                      fontSize: '0.8rem',
                      border: 'none',
                      borderBottom: isActive ? '3px solid #2563eb' : '3px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isActive ? 'inset 0 2px 6px rgba(0, 0, 0, 0.03)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = '#f1f5f9';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>{(() => { const Icon = slide.icon; return Icon ? <Icon size={15} /> : null; })()}</span>
                    <span>{slide.category.split(' ')[0]}</span>
                    {isActive && (
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#2563eb',
                        display: 'inline-block'
                      }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Access Action Strip (1-to-1 Match with User Reference Screenshot) */}
            <div style={{
              backgroundColor: '#ffffff',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              borderTop: '1px solid #f1f5f9'
            }}>
              {/* 1. Latest Notices (Dark Navy Blue) */}
              <a
                href="#notices"
                style={{
                  backgroundColor: '#1d4ed8',
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '12px 26px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '9px',
                  boxShadow: '0 4px 14px rgba(29, 78, 216, 0.35)',
                  transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.backgroundColor = '#1e40af';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(29, 78, 216, 0.45)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(29, 78, 216, 0.35)';
                }}
              >
                <Megaphone size={17} color="#ffffff" />
                <span>সর্বশেষ নোটিশ (Notices)</span>
              </a>

              {/* 2. Exam Results (Kelly / Emerald Green) */}
              <button
                onClick={() => {
                  setIsExamResultsModalOpen(true);
                  setHasSearchedResult(true);
                }}
                style={{
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 26px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '9px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                  transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.backgroundColor = '#059669';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(16, 185, 129, 0.45)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.backgroundColor = '#10b981';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.35)';
                }}
              >
                <Award size={17} color="#ffffff" />
                <span>পরীক্ষার ফলাফল (GPA 5.00)</span>
              </button>

              {/* 3. Student Portal (Crimson Red) */}
              <button
                onClick={onNavigateLogin}
                style={{
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 26px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '9px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(220, 38, 38, 0.35)',
                  transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.backgroundColor = '#b91c1c';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(220, 38, 38, 0.45)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.backgroundColor = '#dc2626';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(220, 38, 38, 0.35)';
                }}
              >
                <LogIn size={17} color="#ffffff" />
                <span>শিক্ষক ও শিক্ষার্থী পোর্টাল</span>
              </button>

              {/* 4. Online Admission (Orange / Amber Gradient) */}
              <button
                onClick={() => setIsAdmissionModalOpen(true)}
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
                  transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(249, 115, 22, 0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(249, 115, 22, 0.4)';
                }}
              >
                <span>অনলাইন ভর্তি ২০২৬</span>
              </button>

              {/* 5. AI Professor Classroom Button (Indigo / Violet Gradient) */}
              <a
                href="#ai-professor"
                style={{
                  background: 'linear-gradient(135deg, #312e81 0%, #4338ca 60%, #6366f1 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 26px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(67, 56, 202, 0.45)',
                  transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                  textDecoration: 'none'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(67, 56, 202, 0.55)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(67, 56, 202, 0.45)';
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Sparkles size={16} /><span>এআই প্রফেসর ক্লাসরুম</span></span>
              </a>
            </div>
          </div>

          {/* Key Quick Stats Ticker */}
          <div style={{
            marginTop: '56px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '18px',
            padding: '24px',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid #e2e8f0',
            boxShadow: '0 12px 32px -4px rgba(15, 23, 42, 0.06)'
          }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#4338ca', fontFamily: 'var(--font-display)' }}>
                ১৮,৪৫০+
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>
                মোট অধ্যয়নরত শিক্ষার্থী
              </div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#059669', fontFamily: 'var(--font-display)' }}>
                ১০০%
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>
                এসএসসি ও এইচএসসি পাসের হার
              </div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#7c3aed', fontFamily: 'var(--font-display)' }}>
                জিপিএ ৫.০০
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>
                গোল্ডেন A+ ও বোর্ড মেধা তালিকা
              </div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#d97706', fontFamily: 'var(--font-display)' }}>
                ৩৪০+
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>
                অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষক
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About School Section (SCHOOLE SOMPOKE) — Eye-Catching Luxury Light Redesign */}
      <section id="about" style={{
        padding: '80px 24px 90px',
        background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #ffffff 100%)',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 20px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
              border: '1.5px solid #c7d2fe',
              color: '#4338ca',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: '14px',
              boxShadow: '0 2px 10px rgba(67, 56, 202, 0.08)'
            }}>
              <Sparkles size={14} color="#f59e0b" />
              <span>আমাদের প্রতিষ্ঠান পরিচিতি • ABOUT OUR INSTITUTION</span>
              <Sparkles size={14} color="#f59e0b" />
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 2.7rem)',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              margin: '0 0 14px'
            }}>
              জ্ঞান, শৃঙ্খলা ও নৈতিকতায় <span style={{
                background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #4f46e5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800
              }}>দেশের শীর্ষ বিদ্যাপীঠ</span>
            </h2>

            <p style={{
              fontSize: '1.05rem',
              color: '#475569',
              maxWidth: '780px',
              margin: '0 auto',
              lineHeight: 1.75
            }}>
              ১৯৬৫ সালে প্রতিষ্ঠিত ঐতিহ্যবাহী <strong style={{ color: '#1e40af', fontWeight: 700 }}>{INSTITUTION.name}</strong> দীর্ঘ ছয় দশক ধরে বাংলাদেশের জাতীয় মেধা বিকাশ, চরিত্র গঠন এবং বোর্ড পরীক্ষায় অনন্য সাফল্যের স্বাক্ষর রেখে আসছে।
            </p>
          </div>

          {/* 3 Themed Feature Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
            
            {/* Card 1: Mission & Vision */}
            <div
              style={{
                position: 'relative',
                padding: '32px 28px',
                borderRadius: '20px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #e0e7ff',
                boxShadow: '0 10px 25px -5px rgba(67, 56, 202, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 38px -6px rgba(67, 56, 202, 0.16)';
                e.currentTarget.style.borderColor = '#818cf8';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(67, 56, 202, 0.08)';
                e.currentTarget.style.borderColor = '#e0e7ff';
              }}
            >
              {/* Top Accent Gradient Bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #4f46e5, #818cf8)' }} />

              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: '0 8px 20px -2px rgba(79, 70, 229, 0.38)'
              }}>
                <Award size={26} />
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                মূল লক্ষ্য ও রূপকল্প
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4f46e5', display: 'block', marginTop: '2px', letterSpacing: '0.05em' }}>MISSION & VISION</span>
              </h3>

              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.7, marginBottom: '22px' }}>
                জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) প্রণীত যুগোপযোগী সিলেবাসের আলোকে প্রতিটি শিক্ষার্থীকে দেশপ্রেমিক, সৎ, বিজ্ঞানমনস্ক ও আন্তর্জাতিক প্রতিযোগিতায় সক্ষম আদর্শ নাগরিক হিসেবে গড়ে তোলা।
              </p>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড, ঢাকা (BISE Dhaka)',
                  'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত',
                  'বিজ্ঞান, ব্যবসায় শিক্ষা ও মানবিক শাখা (বাংলা ও ইংরেজি ভার্সন)'
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.84rem',
                    color: '#1e293b',
                    fontWeight: 600,
                    background: '#f8fafc',
                    border: '1px solid #edf2f7',
                    borderRadius: '10px',
                    padding: '9px 12px'
                  }}>
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: '#dcfce7',
                      color: '#16a34a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <CheckCircle2 size={14} strokeWidth={3} />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Principal's Message — The Centerpiece */}
            <div
              style={{
                position: 'relative',
                padding: '32px 28px',
                borderRadius: '20px',
                background: 'linear-gradient(180deg, #ffffff 0%, #fcfaff 50%, #f8faff 100%)',
                border: '1.5px solid #c7d2fe',
                boxShadow: '0 12px 30px -4px rgba(79, 70, 229, 0.12)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 22px 42px -6px rgba(79, 70, 229, 0.22)';
                e.currentTarget.style.borderColor = '#6366f1';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 30px -4px rgba(79, 70, 229, 0.12)';
                e.currentTarget.style.borderColor = '#c7d2fe';
              }}
            >
              {/* Top Accent Gradient Bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #3b82f6, #6366f1, #8b5cf6)' }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    padding: '3px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)'
                  }}>
                    <img
                      src="/images/principal.jpg"
                      alt="Principal Prof. Lal Mohammad"
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'; }}
                      style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>প্রফেসর লাল মোহাম্মদ</div>
                    <div style={{ fontSize: '0.82rem', color: '#4f46e5', fontWeight: 700 }}>অধ্যক্ষ ও প্রধান শিক্ষক</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b' }}>আইডিয়াল স্কুল অ্যান্ড কলেজ, মতিঝিল</div>
                  </div>
                </div>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
                  color: '#4338ca',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  border: '1px solid #c7d2fe'
                }}>
                  অধ্যক্ষের বাণী
                </span>
              </div>

              <div style={{
                position: 'relative',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '22px 20px',
                marginTop: 'auto',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)'
              }}>
                <span style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '18px',
                  fontSize: '2.4rem',
                  lineHeight: 1,
                  color: '#818cf8',
                  fontFamily: 'serif'
                }}>“</span>

                <blockquote style={{
                  margin: 0,
                  fontSize: '0.92rem',
                  color: '#334155',
                  lineHeight: 1.8,
                  fontWeight: 500,
                  paddingTop: '6px'
                }}>
                  আইডিয়াল স্কুল অ্যান্ড কলেজ কেবল পুঁথিগত বিদ্যা নয়, বরং প্রতিটি শিক্ষার্থীর আত্মমর্যাদাবোধ, নিয়মানুবর্তিতা, নৈতিক মূল্যবোধ ও সুপ্ত মেধার পূর্ণ বিকাশে নিরলস কাজ করছে। আমরা গড়ছি স্মার্ট বাংলাদেশের যোগ্য কারিগর।
                </blockquote>

                <div style={{ textAlign: 'right', marginTop: '12px', fontSize: '0.8rem', color: '#4f46e5', fontWeight: 700 }}>
                  — নেতৃত্ব ও অনুপ্রেরণা
                </div>
              </div>
            </div>

            {/* Card 3: Government Accreditations & Codes */}
            <div
              style={{
                position: 'relative',
                padding: '32px 28px',
                borderRadius: '20px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #d1fae5',
                boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 38px -6px rgba(16, 185, 129, 0.16)';
                e.currentTarget.style.borderColor = '#10b981';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.08)';
                e.currentTarget.style.borderColor = '#d1fae5';
              }}
            >
              {/* Top Accent Gradient Bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #10b981, #06b6d4)' }} />

              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: '0 8px 20px -2px rgba(16, 185, 129, 0.38)'
              }}>
                <ShieldCheck size={26} />
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                সরকারি অনুমোদন ও স্বীকৃতি
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', display: 'block', marginTop: '2px', letterSpacing: '0.05em' }}>GOVT. ACCREDITATION & CODES</span>
              </h3>

              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.7, marginBottom: '22px' }}>
                গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের শিক্ষা মন্ত্রণালয় ও ঢাকা শিক্ষা বোর্ড কর্তৃক স্থায়ী স্বীকৃতিপ্রাপ্ত। জাতীয় মেধা তালিকায় বহুবার শ্রেষ্ঠ শিক্ষাপ্রতিষ্ঠানের গৌরব অর্জন।
              </p>

              <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{
                  background: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 700 }}>EIIN নম্বর</div>
                  <div style={{ fontSize: '1.08rem', fontWeight: 900, color: '#0369a1', marginTop: '2px' }}>108275</div>
                </div>

                <div style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>ঢাকা বোর্ড কোড</div>
                  <div style={{ fontSize: '1.08rem', fontWeight: 900, color: '#047857', marginTop: '2px' }}>1102</div>
                </div>

                <div style={{
                  background: '#fffbeb',
                  border: '1px solid #fde68a',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.72rem', color: '#d97706', fontWeight: 700 }}>কলেজ কোড</div>
                  <div style={{ fontSize: '1.08rem', fontWeight: 900, color: '#b45309', marginTop: '2px' }}>1058</div>
                </div>

                <div style={{
                  background: '#f5f3ff',
                  border: '1px solid #ddd6fe',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.72rem', color: '#7c3aed', fontWeight: 700 }}>কারিকুলাম</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#6d28d9', marginTop: '4px' }}>NCTB মানক</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Messages from Leadership Section (Matches User Reference Image) */}
      <section id="leadership" style={{ padding: '75px 24px 80px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
          
          {/* Section Header with Blue/Orange dual-underline bar exactly as screenshotted */}
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.4rem',
              fontWeight: 800,
              color: '#1e3a8a',
              letterSpacing: '-0.025em',
              margin: '0 0 10px 0'
            }}>
              Messages from Leadership
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', height: '4px', width: '96px' }}>
              <span style={{ height: '4px', width: '56px', backgroundColor: '#2563eb', borderRadius: '2px 0 0 2px' }} />
              <span style={{ height: '4px', width: '40px', backgroundColor: '#f97316', borderRadius: '0 2px 2px 0' }} />
            </div>
          </div>

          {/* 2x2 Leadership Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: '24px'
          }}>
            {leadershipMembers.map(member => (
              <div
                key={member.id}
                className="leadership-member-card"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  borderLeft: '4px solid #3b5998',
                  boxShadow: '0 4px 18px rgba(15, 23, 42, 0.05)',
                  padding: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 14px 28px -4px rgba(15, 23, 42, 0.1)';
                  e.currentTarget.style.borderLeftColor = '#2563eb';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(15, 23, 42, 0.05)';
                  e.currentTarget.style.borderLeftColor = '#3b5998';
                }}
              >
                {/* Left: Framed Portrait Photo */}
                <div style={{
                  width: '145px',
                  height: '170px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)'
                }}>
                  <img
                    src={member.image}
                    alt={member.roleTitle}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>

                {/* Right: Designation, Name Badge & Action Button */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '6px',
                    flexWrap: 'wrap'
                  }}>
                    <h3 style={{
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      color: '#1e3a8a',
                      margin: 0,
                      letterSpacing: '-0.01em'
                    }}>
                      {member.roleTitle}
                    </h3>

                    <span style={{
                      backgroundColor: '#3b5998',
                      color: '#ffffff',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap'
                    }}>
                      {member.name}
                    </span>
                  </div>

                  <div style={{
                    fontSize: '0.86rem',
                    color: '#64748b',
                    fontWeight: 500,
                    marginBottom: '18px'
                  }}>
                    {member.institution}
                  </div>

                  <button
                    onClick={() => setActiveLeadershipModal(member)}
                    style={{
                      backgroundColor: '#3b5998',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 20px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease',
                      boxShadow: '0 2px 8px rgba(59, 89, 152, 0.25)'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = '#2563eb';
                      e.currentTarget.style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = '#3b5998';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <span>Read Full Message</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Official Notice Board Section (NOTCE) — Eye-Catching Redesign */}
      <section id="notices" style={{
        padding: '80px 24px 90px',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
          
          {/* Header Row with Title and Filter Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                border: '1.5px solid #fde68a',
                color: '#b45309',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                marginBottom: '10px',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.12)'
              }}>
                <Bell size={14} color="#d97706" />
                <span>অফিসিয়াল সার্কুলার ও নোটিশ • OFFICIAL NOTICE BOARD</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                margin: 0
              }}>
                স্কুল নোটিশ বোর্ড <span style={{
                  background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800
                }}>(Circulars)</span>
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div style={{
              display: 'inline-flex',
              backgroundColor: '#ffffff',
              padding: '5px',
              borderRadius: '14px',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 2px 10px rgba(15, 23, 42, 0.05)',
              gap: '4px',
              flexWrap: 'wrap'
            }}>
              {[
                { key: 'All', label: 'সকল নোটিশ', count: NOTICES.length },
                { key: 'Admission', label: 'ভর্তি', count: NOTICES.filter(n => n.category === 'Admission').length },
                { key: 'Academic', label: 'পরীক্ষা ও পাঠ', count: NOTICES.filter(n => n.category === 'Academic').length },
                { key: 'Sports', label: 'ক্রীড়া ও সহপাঠ', count: NOTICES.filter(n => n.category === 'Sports').length }
              ].map(cat => {
                const isActive = selectedCategory.toLowerCase() === cat.key.toLowerCase();
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.84rem',
                      fontWeight: isActive ? 700 : 600,
                      borderRadius: '10px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: isActive ? '#4338ca' : 'transparent',
                      color: isActive ? '#ffffff' : '#475569',
                      boxShadow: isActive ? '0 4px 12px rgba(67, 56, 202, 0.3)' : 'none',
                      transition: 'all 0.18s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{cat.label}</span>
                    <span style={{
                      fontSize: '0.72rem',
                      padding: '2px 7px',
                      borderRadius: '9999px',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : '#f1f5f9',
                      color: isActive ? '#ffffff' : '#64748b',
                      fontWeight: 800
                    }}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notices Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))', gap: '22px' }}>
            {filteredNotices.map(notice => {
              const isAdmission = notice.category === 'Admission' || notice.badge.includes('ভর্তি');
              const isExam = notice.badge.includes('পরীক্ষা');
              const isOlympiad = notice.badge.includes('অলিম্পিয়াড');

              const style = isAdmission ? {
                accentGradient: 'linear-gradient(90deg, #e11d48, #f43f5e)',
                badgeBg: '#fff1f2',
                badgeColor: '#be123c',
                badgeBorder: '#fecdd3',
                glowColor: 'rgba(225, 29, 72, 0.16)',
                borderHover: '#fb7185',
                icon: Bell,
                btnBg: '#fff1f2',
                btnColor: '#be123c',
                btnBorder: '#fecdd3'
              } : isExam ? {
                accentGradient: 'linear-gradient(90deg, #2563eb, #4f46e5)',
                badgeBg: '#eff6ff',
                badgeColor: '#1d4ed8',
                badgeBorder: '#bfdbfe',
                glowColor: 'rgba(37, 99, 235, 0.16)',
                borderHover: '#60a5fa',
                icon: BookOpen,
                btnBg: '#eff6ff',
                btnColor: '#1d4ed8',
                btnBorder: '#bfdbfe'
              } : isOlympiad ? {
                accentGradient: 'linear-gradient(90deg, #7c3aed, #a855f7)',
                badgeBg: '#f5f3ff',
                badgeColor: '#6d28d9',
                badgeBorder: '#ddd6fe',
                glowColor: 'rgba(124, 58, 237, 0.16)',
                borderHover: '#a78bfa',
                icon: Award,
                btnBg: '#f5f3ff',
                btnColor: '#6d28d9',
                btnBorder: '#ddd6fe'
              } : {
                accentGradient: 'linear-gradient(90deg, #059669, #10b981)',
                badgeBg: '#ecfdf5',
                badgeColor: '#047857',
                badgeBorder: '#a7f3d0',
                glowColor: 'rgba(5, 150, 105, 0.16)',
                borderHover: '#34d399',
                icon: Trophy,
                btnBg: '#ecfdf5',
                btnColor: '#047857',
                btnBorder: '#a7f3d0'
              };

              return (
                <div
                  key={notice.id}
                  style={{
                    position: 'relative',
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    padding: '26px 24px',
                    border: '1.5px solid #e2e8f0',
                    boxShadow: '0 6px 20px -4px rgba(15, 23, 42, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = `0 18px 36px -6px ${style.glowColor}, 0 4px 12px rgba(0,0,0,0.04)`;
                    e.currentTarget.style.borderColor = style.borderHover;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 20px -4px rgba(15, 23, 42, 0.05)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  {/* Top Accent Gradient Bar */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: style.accentGradient
                  }} />

                  <div>
                    {/* Top Row: Category Badge & Date Chip */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '14px' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: style.badgeColor,
                        backgroundColor: style.badgeBg,
                        border: `1px solid ${style.badgeBorder}`,
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        letterSpacing: '0.02em'
                      }}>
                        <span>{(() => { const Icon = style.icon; return Icon ? <Icon size={13} /> : null; })()}</span>
                        <span>{notice.badge}</span>
                      </span>

                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        color: '#64748b',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        padding: '4px 10px',
                        borderRadius: '8px'
                      }}>
                        <Calendar size={13} color="#4338ca" />
                        <span>{notice.date}</span>
                      </div>
                    </div>

                    {/* Notice Title */}
                    <h3 style={{
                      fontSize: '1.12rem',
                      fontWeight: 800,
                      color: '#0f172a',
                      marginBottom: '10px',
                      lineHeight: 1.45,
                      letterSpacing: '-0.015em'
                    }}>
                      {notice.title}
                    </h3>

                    {/* Notice Content */}
                    <p style={{
                      fontSize: '0.88rem',
                      color: '#475569',
                      lineHeight: 1.7,
                      marginBottom: '20px'
                    }}>
                      {notice.content}
                    </p>
                  </div>

                  {/* Footer Row */}
                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '16px',
                    borderTop: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.78rem',
                      color: '#64748b',
                      fontWeight: 600
                    }}>
                      <span style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: style.badgeColor
                      }} />
                      বিভাগ: <strong style={{ color: '#1e293b' }}>{notice.category}</strong>
                    </span>

                    <button
                      onClick={() => alert(`অফিশিয়াল সার্কুলার:\n\n${notice.title}\n\nতারিখ: ${notice.date}\nবিভাগ: ${notice.category}\n\n${notice.content}\n\n(অফিসিয়াল PDF কপি রেজিস্টার্ড অভিভাবক পোর্টালে সংরক্ষিত)`)}
                      style={{
                        background: style.btnBg,
                        border: `1.5px solid ${style.btnBorder}`,
                        color: style.btnColor,
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        padding: '7px 14px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.18s ease'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = style.btnColor;
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.borderColor = style.btnColor;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = style.btnBg;
                        e.currentTarget.style.color = style.btnColor;
                        e.currentTarget.style.borderColor = style.btnBorder;
                      }}
                    >
                      <Download size={13} />
                      <span>সার্কুলার PDF</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* School Facilities Section — Eye-Catching Modern Redesign */}
      <section id="facilities" style={{ 
        padding: '85px 24px', 
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)', 
        borderBottom: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Ambient Decorative Backlight */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '350px',
          background: 'radial-gradient(ellipse at top, rgba(79, 70, 229, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              color: '#4338ca',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.03em',
              marginBottom: '14px',
              boxShadow: '0 2px 8px rgba(67, 56, 202, 0.06)'
            }}>
              <Sparkles size={14} color="#4338ca" />
              <span>বিশ্বমানের শিক্ষা পরিকাঠামো • MODERN INFRASTRUCTURE</span>
            </div>

            <h2 style={{
              fontFamily: "'Hind Siliguri', var(--font-display), sans-serif",
              fontSize: '2.35rem',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              margin: 0,
              lineHeight: 1.25
            }}>
              আমাদের বিদ্যালয়ের <span style={{ 
                background: 'linear-gradient(135deg, #4338ca 0%, #2563eb 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>আধুনিক সুযোগ-সুবিধাসমূহ</span>
            </h2>

            <p style={{
              fontFamily: "'Hind Siliguri', sans-serif",
              fontSize: '1.02rem',
              color: '#64748b',
              maxWidth: '740px',
              margin: '12px auto 0',
              lineHeight: 1.65
            }}>
              ১৮ একরের সুপরিসর সবুজ ক্যাম্পাস, তথ্যপ্রযুক্তিনির্ভর ল্যাবরেটরি, ডিজিটাল ক্লাসরুম ও খেলাধুলার আধুনিক সুবিধা নিয়ে শিক্ষার্থীদের বহুমুখী বিকাশের অনন্য পরিবেশ।
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))', gap: '26px' }}>
            {facilities.map(facility => {
              const Icon = facility.icon;
              return (
                <div
                  key={facility.id}
                  onClick={() => setSelectedFacilityModal(facility)}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 18px -2px rgba(15, 23, 42, 0.05)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = facility.tagColor;
                    e.currentTarget.style.boxShadow = `0 18px 32px -8px ${facility.tagColor}24, 0 0 0 1px ${facility.tagColor}35`;
                    const img = e.currentTarget.querySelector('.facility-img');
                    if (img) img.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = '0 4px 18px -2px rgba(15, 23, 42, 0.05)';
                    const img = e.currentTarget.querySelector('.facility-img');
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  {/* Photo Container */}
                  <div style={{
                    position: 'relative',
                    height: '215px',
                    overflow: 'hidden',
                    backgroundColor: '#f1f5f9'
                  }}>
                    <img 
                      src={facility.image} 
                      alt={facility.title} 
                      className="facility-img"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.55) 0%, rgba(15, 23, 42, 0.08) 45%, transparent 70%)',
                      pointerEvents: 'none'
                    }} />

                    {/* Floating Icon Box (Top Left) */}
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      color: facility.tagColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                      border: '1px solid rgba(255, 255, 255, 0.8)'
                    }}>
                      <Icon size={20} />
                    </div>

                    {/* Badge Pill (Top Right) */}
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      color: facility.tagColor,
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      fontFamily: "'Hind Siliguri', sans-serif",
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: facility.tagColor }} />
                      <span>{facility.badge}</span>
                    </div>

                    {/* Bottom Right Click to View Pill */}
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '14px',
                      backgroundColor: 'rgba(15, 23, 42, 0.72)',
                      backdropFilter: 'blur(6px)',
                      color: '#ffffff',
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <Eye size={11} />
                      <span>গ্যালারি ও বিস্তারিত</span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{
                        fontFamily: "'Hind Siliguri', sans-serif",
                        fontSize: '1.24rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        lineHeight: 1.35,
                        marginBottom: '8px',
                        letterSpacing: '-0.01em'
                      }}>
                        {facility.title}
                      </h3>

                      <p style={{
                        fontFamily: "'Hind Siliguri', sans-serif",
                        fontSize: '0.86rem',
                        color: '#475569',
                        lineHeight: 1.65,
                        marginBottom: '16px'
                      }}>
                        {facility.description}
                      </p>
                    </div>

                    <div>
                      {/* Key Specifications Box */}
                      <div style={{
                        backgroundColor: '#f8fafc',
                        padding: '12px 14px',
                        borderRadius: '14px',
                        border: '1px solid #edf2f7',
                        marginBottom: '16px'
                      }}>
                        <div style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          color: '#64748b',
                          marginBottom: '8px',
                          letterSpacing: '0.04em',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          <CheckCircle2 size={12} color={facility.tagColor} />
                          <span>প্রধান বৈশিষ্ট্যসমূহ (Specifications):</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {facility.specs.map((spec, i) => (
                            <div 
                              key={i} 
                              style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px', 
                                fontSize: '0.78rem', 
                                color: '#1e293b',
                                fontFamily: "'Hind Siliguri', sans-serif",
                                backgroundColor: '#ffffff',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                border: '1px solid #f1f5f9'
                              }}
                            >
                              <span style={{
                                width: '5px',
                                height: '5px',
                                borderRadius: '50%',
                                backgroundColor: facility.tagColor,
                                flexShrink: 0
                              }} />
                              <span style={{ fontWeight: 600 }}>{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action Row */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '12px',
                        borderTop: '1px solid #f1f5f9'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#64748b' }}>
                          <Building2 size={13} color={facility.tagColor} />
                          <span style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>ক্যাম্পাস জোন</span>
                        </div>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '6px 12px',
                            borderRadius: '9999px',
                            backgroundColor: facility.tagBg,
                            color: facility.tagColor,
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            fontFamily: "'Hind Siliguri', sans-serif",
                            border: `1px solid ${facility.tagColor}30`
                          }}
                        >
                          <span>বিস্তারিত দেখুন</span>
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Academic Pathways Section (NCTB) — Eye-Catching Redesign */}
      <section id="academics" style={{
        padding: '80px 24px 90px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
              border: '1.5px solid #c7d2fe',
              color: '#4338ca',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              marginBottom: '12px',
              boxShadow: '0 2px 8px rgba(67, 56, 202, 0.08)'
            }}>
              <BookOpen size={14} color="#4f46e5" />
              <span>এনসিটিবি অনুমোদিত শিক্ষাক্রম • ACADEMIC CURRICULUM</span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 2.6rem)',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              margin: '0 0 12px'
            }}>
              শিক্ষা কার্যক্রম ও <span style={{
                background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #4f46e5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800
              }}>পাঠ্যক্রম রূপরেখা</span>
            </h2>

            <p style={{
              fontSize: '1.02rem',
              color: '#475569',
              maxWidth: '720px',
              margin: '0 auto',
              lineHeight: 1.7
            }}>
              জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত প্রাক-প্রাথমিক থেকে দ্বাদশ শ্রেণি পর্যন্ত সমন্বিত আধুনিক ও প্রযুক্তিভিত্তিক শিক্ষাদান পদ্ধতি।
            </p>
          </div>

          {/* 3 Themed Curriculum Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
            
            {/* 1. Primary Level */}
            <div
              style={{
                position: 'relative',
                background: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%)',
                padding: '32px 26px',
                borderRadius: '20px',
                border: '1.5px solid #bae6fd',
                boxShadow: '0 8px 24px -4px rgba(14, 165, 233, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 38px -6px rgba(14, 165, 233, 0.2)';
                e.currentTarget.style.borderColor = '#0ea5e9';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(14, 165, 233, 0.08)';
                e.currentTarget.style.borderColor = '#bae6fd';
              }}
            >
              {/* Top Accent Gradient Bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #0284c7, #38bdf8)' }} />

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(2, 132, 199, 0.35)' }}><BookOpen size={24} /></div>

                  <span style={{
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    color: '#0369a1',
                    background: '#e0f2fe',
                    border: '1px solid #bae6fd',
                    padding: '4px 12px',
                    borderRadius: '9999px'
                  }}>
                    ১ম – ৫ম শ্রেণি (প্রভাতী ও দিবা)
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.28rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  marginBottom: '8px',
                  letterSpacing: '-0.01em'
                }}>
                  প্রাথমিক শিক্ষা স্তর
                  <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 700, display: 'block', marginTop: '2px' }}>
                    PRIMARY EDUCATION
                  </span>
                </h3>

                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, marginBottom: '18px' }}>
                  বাংলা ও ইংরেজি ভার্সন। মাতৃভাষা চর্চা, বুনিয়াদি গণিত, সুকুমার বৃত্তি, চরিত্র গঠন ও আনন্দঘন পরিবেশে ডিজিটাল শিখন কার্যক্রম।
                </p>

                {/* Feature Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {['বাংলা ও ইংরেজি ভার্সন', 'বুনিয়াদি গণিত ও ভাষা', 'ডিজিটাল লার্নিং'].map((tag, i) => (
                    <span key={i} style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#0369a1',
                      background: '#ffffff',
                      border: '1px solid #bae6fd',
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      • {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Verified Highlight */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #bae6fd',
                borderRadius: '12px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#0369a1',
                fontSize: '0.82rem',
                fontWeight: 700
              }}>
                <CheckCircle2 size={16} color="#0284c7" />
                <span>সহশিক্ষামূলক কার্যক্রম ও নিয়মিত স্বাস্থ্য পরীক্ষা</span>
              </div>
            </div>

            {/* 2. Secondary SSC Level */}
            <div
              style={{
                position: 'relative',
                background: 'linear-gradient(180deg, #ffffff 0%, #f5f3ff 100%)',
                padding: '32px 26px',
                borderRadius: '20px',
                border: '1.5px solid #c7d2fe',
                boxShadow: '0 8px 24px -4px rgba(79, 70, 229, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 38px -6px rgba(79, 70, 229, 0.2)';
                e.currentTarget.style.borderColor = '#6366f1';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(79, 70, 229, 0.08)';
                e.currentTarget.style.borderColor = '#c7d2fe';
              }}
            >
              {/* Top Accent Gradient Bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #4f46e5, #7c3aed)' }} />

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(79, 70, 229, 0.35)' }}><Microscope size={24} /></div>

                  <span style={{
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    color: '#3730a3',
                    background: '#e0e7ff',
                    border: '1px solid #c7d2fe',
                    padding: '4px 12px',
                    borderRadius: '9999px'
                  }}>
                    ৬ষ্ঠ – ১০ম শ্রেণি (এসএসসি)
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.28rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  marginBottom: '8px',
                  letterSpacing: '-0.01em'
                }}>
                  মাধ্যমিক শিক্ষা স্তর
                  <span style={{ fontSize: '0.75rem', color: '#4f46e5', fontWeight: 700, display: 'block', marginTop: '2px' }}>
                    SECONDARY SSC
                  </span>
                </h3>

                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, marginBottom: '18px' }}>
                  বিজ্ঞান ও ব্যবসায় শিক্ষা শাখা। উন্নত বিজ্ঞান গবেষণাগার, নিয়মিত মডেল টেস্ট, দুর্বল শিক্ষার্থীদের জন্য রিমিডিয়াল ক্লাস ও শতভাগ জিপিএ ৫.০০ লক্ষ্যমাত্রা।
                </p>

                {/* Feature Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {['বিজ্ঞান ও ব্যবসায় শিক্ষা', 'উন্নত গবেষণাগার ও ল্যাব', 'শতভাগ GPA 5.00 লক্ষ্য'].map((tag, i) => (
                    <span key={i} style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#4338ca',
                      background: '#ffffff',
                      border: '1px solid #c7d2fe',
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      • {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Verified Highlight */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #c7d2fe',
                borderRadius: '12px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#3730a3',
                fontSize: '0.82rem',
                fontWeight: 700
              }}>
                <CheckCircle2 size={16} color="#4f46e5" />
                <span>ঢাকা শিক্ষা বোর্ডে গোল্ডেন A+ সাফল্যের শীর্ষস্থান</span>
              </div>
            </div>

            {/* 3. College HSC Level */}
            <div
              style={{
                position: 'relative',
                background: 'linear-gradient(180deg, #ffffff 0%, #ecfdf5 100%)',
                padding: '32px 26px',
                borderRadius: '20px',
                border: '1.5px solid #a7f3d0',
                boxShadow: '0 8px 24px -4px rgba(5, 150, 105, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 38px -6px rgba(5, 150, 105, 0.2)';
                e.currentTarget.style.borderColor = '#10b981';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(5, 150, 105, 0.08)';
                e.currentTarget.style.borderColor = '#a7f3d0';
              }}
            >
              {/* Top Accent Gradient Bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #059669, #10b981)' }} />

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(5, 150, 105, 0.35)' }}><GraduationCap size={24} /></div>

                  <span style={{
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    color: '#047857',
                    background: '#d1fae5',
                    border: '1px solid #a7f3d0',
                    padding: '4px 12px',
                    borderRadius: '9999px'
                  }}>
                    একাদশ – দ্বাদশ শ্রেণি (এইচএসসি)
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.28rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  marginBottom: '8px',
                  letterSpacing: '-0.01em'
                }}>
                  উচ্চ মাধ্যমিক স্তর
                  <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, display: 'block', marginTop: '2px' }}>
                    COLLEGE HSC
                  </span>
                </h3>

                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, marginBottom: '18px' }}>
                  বিজ্ঞান, ব্যবসায় শিক্ষা ও মানবিক শাখা। দক্ষ অধ্যাপকমণ্ডলীর নিবিড় তত্ত্বাবধানে বুয়েট, মেডিকেল ও ঢাকা বিশ্ববিদ্যালয় ভর্তি পরীক্ষার প্রাক-প্রস্তুতি।
                </p>

                {/* Feature Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {['বিজ্ঞান, ব্যবসায় ও মানবিক', 'বুয়েট/মেডিকেল প্রাক-প্রস্তুতি', 'অলিম্পিয়াড উইং'].map((tag, i) => (
                    <span key={i} style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#047857',
                      background: '#ffffff',
                      border: '1px solid #a7f3d0',
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      • {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Verified Highlight */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #a7f3d0',
                borderRadius: '12px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#047857',
                fontSize: '0.82rem',
                fontWeight: 700
              }}>
                <CheckCircle2 size={16} color="#059669" />
                <span>বিশেষ অলিম্পিয়াড উইং ও ক্যারিয়ার গাইডেন্স সেল</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 24/7 AI Professor Virtual Classroom Studio */}
      <AIProfessorSection />

      {/* Portal Access Call-to-Action Banner */}
      <section style={{
        padding: '70px 24px',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.3rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            margin: '0 0 16px'
          }}>
            আপনি কি আইডিয়াল স্কুল অ্যান্ড কলেজের শিক্ষার্থী, অভিভাবক বা শিক্ষক?
          </h2>
          <p style={{ fontSize: '1.02rem', color: '#bfdbfe', lineHeight: 1.6, marginBottom: '28px' }}>
            ক্লাস রুটিন, বার্ষিক পরীক্ষার মার্কশিট ও ফলাফল, ডিজিটাল হাজিরা এবং বিকাশ/নগদে মাসিক বেতন পরিশোধ করতে নিজস্ব সিকিউর পোর্টালে প্রবেশ করুন।
          </p>

          <button
            onClick={onNavigateLogin}
            style={{
              padding: '14px 34px',
              backgroundColor: '#ffffff',
              color: '#1e3a8a',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)'
            }}
          >
            <Lock size={18} />
            <span>শিক্ষার্থী ও শিক্ষক পোর্টালে লগইন করুন</span>
          </button>
        </div>
      </section>

      {/* Public Footer */}
      <footer id="contact" style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '60px 24px 30px' }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          paddingBottom: '40px',
          borderBottom: '1px solid #1e293b'
        }}>
          {/* Col 1 */}
          <div>
            <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.2rem', marginBottom: '8px' }}>
              আইডিয়াল স্কুল অ্যান্ড কলেজ
            </div>
            <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700, marginBottom: '10px' }}>
              মতিঝিল, ঢাকা-১০০০ • EIIN: 108275
            </div>
            <p style={{ fontSize: '0.84rem', lineHeight: 1.6 }}>
              জ্ঞান, শৃঙ্খলা ও নৈতিকতা। ঢাকা শিক্ষা বোর্ড ও NCTB অনুমোদিত বাংলাদেশের অন্যতম শ্রেষ্ঠ ও ঐতিহ্যবাহী শিক্ষাপ্রতিষ্ঠান।
            </p>
            <div style={{ marginTop: '14px', fontSize: '0.78rem', color: '#64748b' }}>
              ওয়েবসাইট পোর্টাল: <strong style={{ color: '#94a3b8' }}>idealschool.edu.bd</strong>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.92rem', marginBottom: '12px' }}>
              দ্রুত লিঙ্কসমূহ
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
              <a href="#about" style={{ color: '#94a3b8', textDecoration: 'none' }}>প্রতিষ্ঠান পরিচিতি</a>
              <a href="#leadership" style={{ color: '#94a3b8', textDecoration: 'none' }}>পরিচালনা পর্ষদ ও অধ্যক্ষ</a>
              <a href="#notices" style={{ color: '#94a3b8', textDecoration: 'none' }}>নোটিশ বোর্ড ও সার্কুলার</a>
              <a href="#facilities" style={{ color: '#94a3b8', textDecoration: 'none' }}>ক্যাম্পাস সুযোগ-সুবিধা</a>
              <a href="#academics" style={{ color: '#94a3b8', textDecoration: 'none' }}>শিক্ষা কার্যক্রম ও পাঠ্যক্রম</a>
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.92rem', marginBottom: '12px' }}>
              ক্যাম্পাস যোগাযোগ
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="#38bdf8" /> মতিঝিল মূল ক্যাম্পাস, ঢাকা-১০০০
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="#34d399" /> +৮৮০ ২-৯৩৩০১৪৭ (অধ্যক্ষ কার্যালয়)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="#fbbf24" /> +৮৮০ ১৭১১-০৫৮৮৮৮ (ভর্তি ও সহায়তা)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="#60a5fa" /> info@idealschool.edu.bd
              </div>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.92rem', marginBottom: '12px' }}>
              ডিজিটাল সার্ভিস পোর্টাল
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={onNavigateLogin}
                style={{
                  padding: '10px 14px',
                  backgroundColor: '#1e293b',
                  color: '#ffffff',
                  border: '1px solid #334155',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background 0.2s'
                }}
              >
                <span>শিক্ষক/শিক্ষার্থী লগইন</span>
                <Lock size={14} color="#38bdf8" />
              </button>
              <div style={{ fontSize: '0.74rem', color: '#64748b', lineHeight: 1.5 }}>
                গণপ্রজাতন্ত্রী বাংলাদেশ সরকার শিক্ষা মন্ত্রণালয়ের স্মার্ট এডুকেশন কাঠামোর আওতাধীন ক্লাউড ভিত্তিক সমাধান।
              </div>
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: '1280px',
          margin: '24px auto 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: '#64748b',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            © 2026 {INSTITUTION.name}. All Rights Reserved.
          </div>
          <div>
            100% Web-Based • Multi-Tenant Architecture • ISO 27001 Certified
          </div>
        </div>
      </footer>

      {/* Leadership Full Message Interactive Modal Dialog */}
      {activeLeadershipModal && (
        <div 
          className="modal-overlay" 
          onClick={() => setActiveLeadershipModal(null)}
          style={{ zIndex: 1000 }}
        >
          <div
            className="portal-glass-panel"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '640px',
              width: '100%',
              borderRadius: 'var(--radius-2xl)',
              padding: '32px',
              boxShadow: '0 25px 60px -10px rgba(15, 23, 42, 0.25)',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              animation: 'cardEnter 0.25s ease'
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '1px solid #f1f5f9'
            }}>
              <img
                src={activeLeadershipModal.image}
                alt={activeLeadershipModal.name}
                style={{
                  width: '68px',
                  height: '76px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: '2px solid #3b5998'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e3a8a' }}>
                  {activeLeadershipModal.roleTitle}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#2563eb' }}>
                  {activeLeadershipModal.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {activeLeadershipModal.institution}
                </div>
              </div>
              <button
                onClick={() => setActiveLeadershipModal(null)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 800
                }}
              ><X size={18} /></button>
            </div>

            {/* Message Body */}
            <div style={{
              fontSize: '0.94rem',
              color: '#334155',
              lineHeight: 1.8,
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #e2e8f0'
            }}>
              "{activeLeadershipModal.quote}"
            </div>

            {/* Footer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px solid #f1f5f9'
            }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                অফিসিয়াল বাণী • গভর্নিং বডি ও প্রশাসন
              </div>
              <button
                onClick={() => setActiveLeadershipModal(null)}
                className="btn btn-secondary"
                style={{ padding: '8px 20px', fontSize: '0.85rem', fontWeight: 700 }}
              >
                বন্ধ করুন (Close)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Exam Results Verification Modal (Bangladesh Board & School Results) */}
      {isExamResultsModalOpen && (
        <div 
          className="modal-overlay" 
          onClick={() => setIsExamResultsModalOpen(false)}
          style={{ zIndex: 1000 }}
        >
          <div
            className="portal-glass-panel"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '620px',
              width: '100%',
              borderRadius: 'var(--radius-2xl)',
              padding: '30px',
              backgroundColor: '#ffffff',
              boxShadow: '0 25px 60px -10px rgba(15, 23, 42, 0.25)',
              border: '1px solid #cbd5e1',
              animation: 'cardEnter 0.25s ease'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    পরীক্ষার ফলাফল ও মার্কশিট অনুসন্ধান
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>
                    ঢাকা শিক্ষা বোর্ড ও অভ্যন্তরীণ মূল্যায়ন • সেশন ২০২৬ • EIIN: 108275
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsExamResultsModalOpen(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: 700 }}
              ><X size={18} /></button>
            </div>

            {/* Multi-Field Result Search Form */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    স্টুডেন্ট আইডি (Student ID)
                  </label>
                  <input
                    type="text"
                    value={resultSearchForm.studentId}
                    onChange={e => setResultSearchForm(f => ({ ...f, studentId: e.target.value }))}
                    placeholder="যেমন: ISC-2026-1014"
                    className="input-control"
                    style={{ width: '100%', padding: '9px 12px', fontSize: '0.85rem', fontFamily: 'monospace', boxSizing: 'border-box' }}
                    onKeyDown={e => e.key === 'Enter' && handleResultSearch()}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    রোল নম্বর (Roll Number)
                  </label>
                  <input
                    type="text"
                    value={resultSearchForm.roll}
                    onChange={e => setResultSearchForm(f => ({ ...f, roll: e.target.value }))}
                    placeholder="যেমন: 101"
                    className="input-control"
                    style={{ width: '100%', padding: '9px 12px', fontSize: '0.85rem', boxSizing: 'border-box' }}
                    onKeyDown={e => e.key === 'Enter' && handleResultSearch()}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    মোবাইল নম্বর (Phone)
                  </label>
                  <input
                    type="text"
                    value={resultSearchForm.phone}
                    onChange={e => setResultSearchForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="যেমন: 01711-489201"
                    className="input-control"
                    style={{ width: '100%', padding: '9px 12px', fontSize: '0.85rem', boxSizing: 'border-box' }}
                    onKeyDown={e => e.key === 'Enter' && handleResultSearch()}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    শ্রেণি (Class)
                  </label>
                  <select
                    value={resultSearchForm.classGroup}
                    onChange={e => setResultSearchForm(f => ({ ...f, classGroup: e.target.value }))}
                    className="input-control"
                    style={{ width: '100%', padding: '9px 12px', fontSize: '0.85rem', boxSizing: 'border-box', cursor: 'pointer', appearance: 'auto' }}
                  >
                    <option value="">— শ্রেণি বাছাই করুন —</option>
                    <option value="১ম">১ম শ্রেণি</option>
                    <option value="২য়">২য় শ্রেণি</option>
                    <option value="৩য়">৩য় শ্রেণি</option>
                    <option value="৪র্থ">৪র্থ শ্রেণি</option>
                    <option value="৫ম">৫ম শ্রেণি</option>
                    <option value="৬ষ্ঠ">৬ষ্ঠ শ্রেণি</option>
                    <option value="৭ম">৭ম শ্রেণি</option>
                    <option value="৮ম">৮ম শ্রেণি</option>
                    <option value="৯ম">৯ম শ্রেণি</option>
                    <option value="১০ম">১০ম শ্রেণি (SSC)</option>
                    <option value="একাদশ">একাদশ শ্রেণি (HSC ১ম বর্ষ)</option>
                    <option value="দ্বাদশ">দ্বাদশ শ্রেণি (HSC ২য় বর্ষ)</option>
                  </select>
                </div>

              </div>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: '0 0 10px' }}>
                যেকোনো একটি তথ্য দিয়ে সার্চ করা যাবে
              </p>
              <button
                onClick={handleResultSearch}
                className="btn btn-primary"
                style={{ width: '100%', padding: '11px', fontWeight: 700, fontSize: '0.9rem' }}
              >
                ফলাফল দেখুন
              </button>
            </div>

            {/* Not Found Message */}
            {hasSearchedResult && resultNotFound && (
              <div style={{ backgroundColor: '#fff1f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <div style={{ marginBottom: '6px' }}><AlertTriangle size={28} color="#d97706" /></div>
                <div style={{ fontWeight: 700, color: '#be123c', fontSize: '0.9rem' }}>
                  শিক্ষার্থী পাওয়া যায়নি
                </div>
                <div style={{ fontSize: '0.78rem', color: '#9f1239', marginTop: '4px' }}>
                  সঠিক তথ্য দিন অথবা স্কুল অফিসে যোগাযোগ করুন
                </div>
              </div>
            )}

            {/* Dynamic Result Card */}
            {hasSearchedResult && foundStudent && (() => {
              const reportCard = getSavedReportCard();
              const isMain = foundStudent.studentId === (reportCard && reportCard.student && reportCard.student.studentId);
              const gpa = isMain && reportCard && reportCard.summary ? reportCard.summary.cumulativeGPA : '5.00';
              const subjects = isMain && reportCard && reportCard.subjects ? reportCard.subjects : [];
              return (
                <div style={{ backgroundColor: '#f8fafc', borderRadius: 'var(--radius-xl)', padding: '20px', border: '1px solid #e2e8f0', animation: 'cardEnter 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
                    <div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{foundStudent.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '3px' }}>
                        রোল: <strong>{foundStudent.roll || 'নাই'}</strong>
                        {foundStudent.class ? <> • {foundStudent.class}</> : ''}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                        আইডি: <strong style={{ fontFamily: 'monospace', color: '#1d4ed8' }}>{foundStudent.studentId}</strong>
                        {foundStudent.phone ? <> • {foundStudent.phone}</> : ''}
                      </div>
                      {foundStudent.guardianName && (
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                          অভিভাবক: {foundStudent.guardianName}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#059669', lineHeight: 1 }}>
                        {parseFloat(gpa) >= 5 ? '৫.০০' : gpa}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>GPA {gpa} / 5.00</div>
                      <span className="badge badge-success" style={{ marginTop: '4px', display: 'inline-block' }}>
                        {parseFloat(gpa) >= 5 ? 'গোল্ডেন A+' : parseFloat(gpa) >= 4 ? 'A+' : 'A'}
                      </span>
                    </div>
                  </div>
                  {subjects.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.82rem', maxHeight: '220px', overflowY: 'auto' }}>
                      {subjects.map((s, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 10px', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #edf2f7' }}>
                          <span style={{ color: '#334155' }}>{s.name}</span>
                          <strong style={{ color: s.gradePoint >= 5 ? '#059669' : '#1e3a8a' }}>
                            {s.totalMark} ({s.grade} / {s.gradePoint}.00)
                          </strong>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '12px', color: '#94a3b8', fontSize: '0.82rem' }}>
                      ফলাফলের বিস্তারিত তথ্য এখনো যুক্ত হয়নি।
                    </div>
                  )}
                  <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.74rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <ShieldCheck size={15} /> ঢাকা শিক্ষা বোর্ড ডিজিটাল যাচাইকৃত
                    </span>
                    <button
                      onClick={() => alert('অফিসিয়াল মার্কশিট (PDF) ডাউনলোড হয়েছে।')}
                      style={{ padding: '6px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #c7d2fe', backgroundColor: '#ffffff', color: '#1e3a8a', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      মার্কশিট ডাউনলোড (PDF)
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* 2. Online Admission Modal (Bangladesh Curriculum) */}
      {isAdmissionModalOpen && (
        <div 
          className="modal-overlay" 
          onClick={() => setIsAdmissionModalOpen(false)}
          style={{ zIndex: 1000 }}
        >
          <div
            className="portal-glass-panel"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '560px',
              width: '100%',
              borderRadius: 'var(--radius-2xl)',
              padding: '30px',
              backgroundColor: '#ffffff',
              boxShadow: '0 25px 60px -10px rgba(15, 23, 42, 0.25)',
              border: '1px solid #cbd5e1',
              animation: 'cardEnter 0.25s ease'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  অনলাইন ভর্তি আবেদন ২০২৬-২৭
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>
                  আইডিয়াল স্কুল অ্যান্ড কলেজ, মতিঝিল • EIIN: 108275
                </p>
              </div>
              <button 
                onClick={() => { setIsAdmissionModalOpen(false); setAdmissionSuccess(false); }}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: 700 }}
              ><X size={18} /></button>
            </div>

            {admissionSuccess && submittedApp ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '2px solid #a7f3d0' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
                  অনলাইন ভর্তি আবেদন সফলভাবে জমা হয়েছে!
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, maxWidth: '440px', margin: '0 auto 16px' }}>
                  আপনার আবেদন ট্র্যাকিং নম্বর: <strong style={{ color: '#1e3a8a', fontFamily: 'monospace', fontSize: '1.05rem' }}>{submittedApp.id}</strong>
                </p>

                {/* SMS & Approval Info Box */}
                <div style={{
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '12px',
                  padding: '16px',
                  margin: '0 auto 20px',
                  maxWidth: '460px',
                  textAlign: 'left',
                  fontSize: '0.8rem',
                  lineHeight: 1.6,
                  color: '#1e40af'
                }}>
                  <div style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Smartphone size={15} /><span>স্বয়ংক্রিয় আইডি ও পাসওয়ার্ড প্রাপ্তির নিয়ম:</span></span>
                  </div>
                  <div style={{ color: '#334155' }}>
                    অধ্যক্ষ ও প্রশাসন কর্তৃক আপনার আবেদনটি যাচাই করে <strong>অনুমোদন (Approve)</strong> করার সাথে সাথে স্বয়ংক্রিয়ভাবে <strong>স্টুডেন্ট আইডি ও পাসওয়ার্ড</strong> তৈরি হয়ে আপনার দেওয়া মোবাইল নম্বরে (<strong>{submittedApp.phone}</strong>) এসএমএস চলে যাবে। অনুমোদন সম্পন্ন হওয়ার পর আপনি উক্ত আইডি ও পাসওয়ার্ড দিয়ে সরাসরি স্টুডেন্ট পোর্টালে লগইন করতে পারবেন।
                  </div>
                </div>

                <button
                  onClick={() => { setIsAdmissionModalOpen(false); setAdmissionSuccess(false); setSubmittedApp(null); }}
                  className="btn btn-primary"
                  style={{ padding: '9px 26px', fontWeight: 700 }}
                >
                  ঠিক আছে
                </button>
              </div>
            ) : (
              <form onSubmit={e => {
                e.preventDefault();
                const app = submitAdmissionApplication({
                  studentName: admissionForm.studentName,
                  grade: admissionForm.grade,
                  parentName: admissionForm.parentName,
                  phone: admissionForm.phone,
                  email: admissionForm.email
                });
                setSubmittedApp(app);
                setAdmissionSuccess(true);
              }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                    শিক্ষার্থীর পূর্ণ নাম (বাংলা ও ইংরেজিতে) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: তানভীর আহমেদ / Tanvir Ahmed"
                    value={admissionForm.studentName}
                    onChange={e => setAdmissionForm({ ...admissionForm, studentName: e.target.value })}
                    className="input-control"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                    কাঙ্ক্ষিত শ্রেণি, শাখা ও মাধ্যম নির্বাচন করুন *
                  </label>
                  <select 
                    value={admissionForm.grade}
                    onChange={e => setAdmissionForm({ ...admissionForm, grade: e.target.value })}
                    className="input-control"
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    <option value="১ম শ্রেণি (প্রভাতী বাংলা ভার্সন)">১ম শ্রেণি (প্রভাতী শাখা - বাংলা ভার্সন)</option>
                    <option value="১ম শ্রেণি (দিবা ইংরেজি ভার্সন)">১ম শ্রেণি (দিবা শাখা - ইংরেজি ভার্সন)</option>
                    <option value="৩য় শ্রেণি (দিবা শাখা)">৩য় শ্রেণি (দিবা শাখা - বাংলা ভার্সন)</option>
                    <option value="৬ষ্ঠ শ্রেণি (সরকারি লটারি)">৬ষ্ঠ শ্রেণি (সরকারি কেন্দ্রীয় ডিজিটাল লটারি)</option>
                    <option value="৯ম শ্রেণি (বিজ্ঞান বিভাগ)">৯ম শ্রেণি (বিজ্ঞান বিভাগ - দিবা শাখা)</option>
                    <option value="৯ম শ্রেণি (ব্যবসায় শিক্ষা)">৯ম শ্রেণি (ব্যবসায় শিক্ষা বিভাগ - দিবা শাখা)</option>
                    <option value="একাদশ শ্রেণি (বিজ্ঞান - জিপিএ ৫.০০)">একাদশ শ্রেণি (বিজ্ঞান বিভাগ - জিপিএ ৫.০০)</option>
                    <option value="একাদশ শ্রেণি (ব্যবসায় শিক্ষা)">একাদশ শ্রেণি (ব্যবসায় শিক্ষা বিভাগ)</option>
                    <option value="একাদশ শ্রেণি (মানবিক বিভাগ)">একাদশ শ্রেণি (মানবিক বিভাগ)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                      অভিভাবকের নাম (পিতা/মাতা) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মোঃ রিয়াজ উদ্দিন"
                      value={admissionForm.parentName}
                      onChange={e => setAdmissionForm({ ...admissionForm, parentName: e.target.value })}
                      className="input-control"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                      সচল মোবাইল নম্বর (bKash/SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="017xxxxxxxx"
                      value={admissionForm.phone}
                      onChange={e => setAdmissionForm({ ...admissionForm, phone: e.target.value })}
                      className="input-control"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                    অভিভাবকের ইমেইল এড্রেস (ঐচ্ছিক)
                  </label>
                  <input
                    type="email"
                    placeholder="parent@example.com"
                    value={admissionForm.email}
                    onChange={e => setAdmissionForm({ ...admissionForm, email: e.target.value })}
                    className="input-control"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-shine"
                  style={{ padding: '12px', fontSize: '0.94rem', fontWeight: 700, marginTop: '8px' }}
                >
                  অনলাইন ভর্তি আবেদন পত্র জমা দিন
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. Facility Detail & High-Res Inspection Modal */}
      {selectedFacilityModal && (
        <div 
          className="modal-overlay" 
          onClick={() => setSelectedFacilityModal(null)}
          style={{ zIndex: 1000 }}
        >
          <div
            className="portal-glass-panel"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '680px',
              width: '100%',
              borderRadius: 'var(--radius-2xl)',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: '0 25px 60px -10px rgba(15, 23, 42, 0.25)',
              border: '1px solid #cbd5e1',
              animation: 'cardEnter 0.25s ease'
            }}
          >
            {/* High-Res Photo Banner */}
            <div style={{
              position: 'relative',
              height: '300px',
              backgroundColor: '#f1f5f9',
              overflow: 'hidden'
            }}>
              <img 
                src={selectedFacilityModal.image} 
                alt={selectedFacilityModal.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.7) 0%, transparent 60%)'
              }} />
              
              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                color: selectedFacilityModal.tagColor,
                padding: '5px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 800,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}>
                {selectedFacilityModal.badge}
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setSelectedFacilityModal(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(15, 23, 42, 0.75)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  fontWeight: 800,
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(8px)'
                }}
              ><X size={18} /></button>

              {/* Title & Overlay Text */}
              <div style={{
                position: 'absolute',
                bottom: '18px',
                left: '20px',
                right: '20px',
                color: '#ffffff'
              }}>
                <h3 style={{ fontFamily: "'Hind Siliguri', sans-serif", fontSize: '1.5rem', fontWeight: 800, margin: 0, textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>
                  {selectedFacilityModal.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '26px' }}>
              <p style={{ fontFamily: "'Hind Siliguri', sans-serif", fontSize: '0.96rem', color: '#475569', lineHeight: 1.7, marginBottom: '22px' }}>
                {selectedFacilityModal.description}
              </p>

              {/* Specifications Box */}
              <div style={{
                backgroundColor: '#f8fafc',
                padding: '16px 20px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid #e2e8f0',
                marginBottom: '24px'
              }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '10px', letterSpacing: '0.04em' }}>
                  Infrastructure & Technical Specifications:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                  {selectedFacilityModal.specs.map((spec, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#1e293b', fontWeight: 600 }}>
                      <CheckCircle2 size={16} color={selectedFacilityModal.tagColor} />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                  Available for all enrolled students
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      setSelectedFacilityModal(null);
                      setIsAdmissionModalOpen(true);
                    }}
                    className="btn btn-primary"
                    style={{ padding: '10px 20px', fontSize: '0.85rem', fontWeight: 700 }}
                  >
                    Schedule Campus Tour
                  </button>
                  <button
                    onClick={() => setSelectedFacilityModal(null)}
                    className="btn btn-secondary"
                    style={{ padding: '10px 18px', fontSize: '0.85rem', fontWeight: 700 }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default SchoolPublicWebsite;
