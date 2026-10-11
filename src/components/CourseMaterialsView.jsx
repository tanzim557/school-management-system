import React, { useState, useEffect } from 'react';
import { 
  Video, 
  FileText, 
  BookOpen, 
  Download, 
  Play, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  User, 
  Folder, 
  Eye, 
  Bookmark, 
  Sparkles, 
  X, 
  ExternalLink,
  BookMarked,
  Layers,
  GraduationCap,
  Trash2,
  Share2,
  FileDown
} from 'lucide-react';
import { USER_ROLES } from '../data/mockData';

// Initial Curated Academic Course Materials
const INITIAL_MATERIALS = [
  {
    id: 'mat-1',
    title: '১০ম শ্রেণি পদার্থবিজ্ঞান: গতি ও নিউটনের সূত্রাবলী (পূর্ণাঙ্গ মাস্টারক্লাস)',
    type: 'video',
    classLevel: 'Class 10',
    subject: 'পদার্থবিজ্ঞান (Physics)',
    chapter: 'অধ্যায় ২: গতি ও বল',
    teacher: 'ড. মিজানুর রহমান',
    teacherRole: 'সিনিয়র শিক্ষক, পদার্থবিজ্ঞান',
    duration: '৪৫ মিনিট',
    date: '১৯ সেপ্টেম্বর ২০২৬',
    fileSize: '1080p HD',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Embeddable fallback
    description: 'ত্বরণ, বেগ, রৈখিক গতি এবং নিউটনের গতির তিনটি মৌলিক সূত্রের বাস্তব পরীক্ষাভিত্তিক ব্যাখ্যা ও গাণিতিক সমস্যা সমাধান।',
    downloadUrl: '#',
    isBookmarked: false,
    views: 1420
  },
  {
    id: 'mat-2',
    title: '১০ম শ্রেণি উচ্চতর গণিত: ত্রিকোণমিতি ও স্থানাঙ্ক জ্যামিতি স্পেশাল নোটস',
    type: 'pdf',
    classLevel: 'Class 10',
    subject: 'উচ্চতর গণিত (Higher Math)',
    chapter: 'অধ্যায় ৮ ও ১১: ত্রিকোণমিতি ও জ্যামিতি',
    teacher: 'সাইদুর রহমান',
    teacherRole: 'বিভাগীয় প্রধান, গণিত',
    duration: '২৪ পৃষ্ঠা',
    date: '১৮ সেপ্টেম্বর ২০২৬',
    fileSize: '4.8 MB (PDF)',
    description: 'বোর্ড পরীক্ষার বিগত ১০ বছরের সৃজনশীল প্রশ্ন ও উত্তর, শর্টকাট সূত্রাবলী এবং গুরুত্বপূর্ণ উপপাদ্য প্রমাণ শিট।',
    downloadUrl: '#',
    isBookmarked: true,
    views: 2150
  },
  {
    id: 'mat-3',
    title: 'NCTB জাতীয় শিক্ষাক্রম: ৯ম ও ১০ম শ্রেণি পদার্থবিজ্ঞান অফিসিয়াল ই-বুক',
    type: 'book',
    classLevel: 'Class 10',
    subject: 'পদার্থবিজ্ঞান (Physics)',
    chapter: 'সম্পূর্ণ পাঠ্যপুস্তক (Full Book)',
    teacher: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)',
    teacherRole: 'অফিসিয়াল প্রকাশনা',
    duration: '৩১২ পৃষ্ঠা',
    date: '১৫ সেপ্টেম্বর ২০২৬',
    fileSize: '18.2 MB (E-Book)',
    description: '২০২৬ শিক্ষাবর্ষের নতুন শিক্ষাক্রম অনুযায়ী সম্পূর্ণ পরিমার্জিত রঙিন ই-বুক। সকল চিত্র, অনুশীলন ও সূত্রাবলী অন্তর্ভুক্ত।',
    downloadUrl: '#',
    isBookmarked: false,
    views: 3400
  },
  {
    id: 'mat-4',
    title: '১০ম শ্রেণি রসায়ন: পর্যায় সারণি ও রাসায়নিক বন্ধন হ্যান্ডরিটেন রিভিশন নোট',
    type: 'note',
    classLevel: 'Class 10',
    subject: 'রসায়ন (Chemistry)',
    chapter: 'অধ্যায় ৪ ও ৫: পর্যায় সারণি',
    teacher: 'নাসরিন আক্তার',
    teacherRole: 'সহকারী শিক্ষক, রসায়ন',
    duration: '১৬ পৃষ্ঠা',
    date: '১৭ সেপ্টেম্বর ২০২৬',
    fileSize: '3.2 MB (Color Notes)',
    description: 'যোজ্যতা ইলেকট্রন, বন্ধন শক্তি, আয়নীয় ও সমযোজী বন্ধন গঠনের হ্যান্ডরিটেন চার্ট এবং শর্টকাট ট্রিক্স।',
    downloadUrl: '#',
    isBookmarked: false,
    views: 1890
  },
  {
    id: 'mat-5',
    title: '৯ম শ্রেণি ইংরেজি ১ম ও ২য় পত্র: Complete Right Forms of Verbs & Grammar',
    type: 'video',
    classLevel: 'Class 9',
    subject: 'ইংরেজি (English)',
    chapter: 'Grammar Unit 4: Verbs & Tenses',
    teacher: 'তানিয়া সুলতানা',
    teacherRole: 'সিনিয়র ইংরেজি প্রভাষক',
    duration: '৩৮ মিনিট',
    date: '১৪ সেপ্টেম্বর ২০২৬',
    fileSize: '720p HD',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'বোর্ড পরীক্ষায় বারবার আসা ৫০টি Right Forms of Verbs রুলস এবং সহজে মনে রাখার আধুনিক শর্টকাট মেথড।',
    downloadUrl: '#',
    isBookmarked: true,
    views: 1650
  },
  {
    id: 'mat-6',
    title: '৮ম শ্রেণি বিজ্ঞান: পরমাণুর গঠন ও রাসায়নিক বিক্রিয়া লেকচার স্লাইডস',
    type: 'pdf',
    classLevel: 'Class 8',
    subject: 'সাধারণ বিজ্ঞান (Science)',
    chapter: 'অধ্যায় ৬: পরমাণুর গঠন',
    teacher: 'ড. আবুল কাশেম',
    teacherRole: 'প্রধান বিজ্ঞান শিক্ষক',
    duration: '৩২ স্লাইড',
    date: '১২ সেপ্টেম্বর ২০২৬',
    fileSize: '5.6 MB (PDF)',
    description: 'ইলেকট্রন বিন্যাস, আইসোটোপ এবং প্রতীক-সংকেত যোজনীর পূর্ণাঙ্গ সচিত্র প্রেজেন্টেশন স্লাইড।',
    downloadUrl: '#',
    isBookmarked: false,
    views: 1200
  },
  {
    id: 'mat-7',
    title: 'একাদশ ও দ্বাদশ শ্রেণি: ICT প্রোগ্রামিং সি (C Programming) ও ওয়েব ডিজাইন বুক',
    type: 'book',
    classLevel: 'Class 11',
    subject: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)',
    chapter: 'অধ্যায় ৪ ও ৫: HTML & C Language',
    teacher: 'ইঞ্জিনিয়ার তানভীর আলম',
    teacherRole: 'আইসিটি কো-অর্ডিনেটর',
    duration: '২২০ পৃষ্ঠা',
    date: '১০ সেপ্টেম্বর ২০২৬',
    fileSize: '14.5 MB (E-Book)',
    description: 'লুপ, কন্ডিশন, অ্যারে এবং এইচটিএমএল টেবিল-ফর্ম কোডিংসহ প্র্যাকটিক্যাল প্রজেক্ট হ্যান্ডবুক।',
    downloadUrl: '#',
    isBookmarked: false,
    views: 2900
  },
  {
    id: 'mat-8',
    title: '১০ম শ্রেণি জীববিজ্ঞান: কোষ বিভাজন ও বংশগতিবিদ্যা (Genetics) স্পেশাল চিটশিট',
    type: 'note',
    classLevel: 'Class 10',
    subject: 'জীববিজ্ঞান (Biology)',
    chapter: 'অধ্যায় ৩ ও ১২: বংশগতি',
    teacher: 'ফারহানা ইসলাম',
    teacherRole: 'সিনিয়র শিক্ষক, জীববিজ্ঞান',
    duration: '১২ পৃষ্ঠা',
    date: '০৮ সেপ্টেম্বর ২০২৬',
    fileSize: '2.8 MB (PDF)',
    description: 'মাইটোসিস ও মিয়োসিস কোষ বিভাজনের তুলনামূলক চিত্র এবং মেন্ডেলের বংশগতি সূত্রের বিস্তারিত নোট।',
    downloadUrl: '#',
    isBookmarked: false,
    views: 1540
  }
];

export function CourseMaterialsView({ currentRole, currentUser, onTriggerNotification }) {
  // Load from local storage or fallback to initial
  const [materials, setMaterials] = useState(() => {
    try {
      const saved = localStorage.getItem('schoolpulse_course_materials');
      return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
    } catch (e) {
      return INITIAL_MATERIALS;
    }
  });

  const [selectedType, setSelectedType] = useState('all'); // all, video, pdf, book, note
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeViewerModal, setActiveViewerModal] = useState(null); // material object

  // Form State for uploading new material
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    type: 'video',
    classLevel: 'Class 10',
    subject: 'পদার্থবিজ্ঞান (Physics)',
    chapter: '',
    teacher: currentUser?.name || 'শ্রদ্ধেয় শিক্ষক',
    teacherRole: 'শিক্ষক',
    duration: '',
    fileSize: '',
    videoUrl: '',
    description: ''
  });

  // Save materials on change
  useEffect(() => {
    try {
      localStorage.setItem('schoolpulse_course_materials', JSON.stringify(materials));
    } catch (e) {
      console.error('Failed to save materials to localStorage', e);
    }
  }, [materials]);

  const canManage = currentRole === USER_ROLES.ADMIN || 
                    currentRole === USER_ROLES.SUPER_ADMIN || 
                    currentRole === USER_ROLES.TEACHER;

  // Filtered List
  const filteredMaterials = materials.filter(item => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesClass = selectedClass === 'all' || item.classLevel === selectedClass;
    const matchesSubject = selectedSubject === 'all' || item.subject.toLowerCase().includes(selectedSubject.toLowerCase());
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesClass && matchesSubject && matchesSearch;
  });

  // Handle Adding New Material
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newMaterial.title.trim()) {
      alert('দয়া করে কোর্সের টাইটেল প্রদান করুন');
      return;
    }

    const createdItem = {
      id: `mat-${Date.now()}`,
      title: newMaterial.title.trim(),
      type: newMaterial.type,
      classLevel: newMaterial.classLevel,
      subject: newMaterial.subject,
      chapter: newMaterial.chapter.trim() || 'সাধারণ পাঠ্য',
      teacher: newMaterial.teacher.trim() || 'শিক্ষক মণ্ডলী',
      teacherRole: newMaterial.teacherRole || 'বিষয়ভিত্তিক শিক্ষক',
      duration: newMaterial.duration.trim() || (newMaterial.type === 'video' ? '৩০ মিনিট' : '২০ পৃষ্ঠা'),
      date: 'আজকে প্রকাশিত',
      fileSize: newMaterial.fileSize.trim() || (newMaterial.type === 'video' ? '1080p Full HD' : 'PDF Document'),
      videoUrl: newMaterial.videoUrl.trim() || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: newMaterial.description.trim() || 'নতুন শিক্ষাক্রমের আলোকে প্রস্তুতকৃত কোর্স উপাদান।',
      downloadUrl: '#',
      isBookmarked: false,
      views: 1
    };

    setMaterials([createdItem, ...materials]);
    setIsAddModalOpen(false);
    
    // Reset Form
    setNewMaterial({
      title: '',
      type: 'video',
      classLevel: 'Class 10',
      subject: 'পদার্থবিজ্ঞান (Physics)',
      chapter: '',
      teacher: currentUser?.name || 'শ্রদ্ধেয় শিক্ষক',
      teacherRole: 'শিক্ষক',
      duration: '',
      fileSize: '',
      videoUrl: '',
      description: ''
    });

    if (onTriggerNotification) {
      onTriggerNotification(`নতুন কোর্স ম্যাটেরিয়াল "${createdItem.title}" সফলভাবে আপলোড করা হয়েছে!`);
    } else {
      alert('নতুন কোর্স ম্যাটেরিয়াল সফলভাবে যুক্ত করা হয়েছে!');
    }
  };

  // Handle Delete
  const handleDelete = (id, title) => {
    if (window.confirm(`আপনি কি "${title}" ম্যাটেরিয়ালটি মুছে ফেলতে চান?`)) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  // Toggle Bookmark
  const handleToggleBookmark = (id) => {
    setMaterials(materials.map(m => m.id === id ? { ...m, isBookmarked: !m.isBookmarked } : m));
  };

  // Type styling helper
  const getTypeStyle = (type) => {
    switch (type) {
      case 'video':
        return {
          label: 'ভিডিও ক্লাস (Video)',
          icon: Video,
          accentGradient: 'linear-gradient(90deg, #e11d48, #f43f5e)',
          badgeBg: '#fff1f2',
          badgeColor: '#be123c',
          badgeBorder: '#fecdd3',
          cardBg: 'linear-gradient(180deg, #ffffff 0%, #fff5f7 100%)',
          cardBorder: '#ffe4e6',
          btnText: 'ভিডিও দেখুন',
          btnIcon: Play,
          pillIcon: 'file'
        };
      case 'pdf':
        return {
          label: 'লেকচার শিট (PDF)',
          icon: FileText,
          accentGradient: 'linear-gradient(90deg, #2563eb, #3b82f6)',
          badgeBg: '#eff6ff',
          badgeColor: '#1d4ed8',
          badgeBorder: '#bfdbfe',
          cardBg: 'linear-gradient(180deg, #ffffff 0%, #f0f7ff 100%)',
          cardBorder: '#dbeafe',
          btnText: 'PDF পড়ুন',
          btnIcon: FileText,
          pillIcon: 'file'
        };
      case 'book':
        return {
          label: 'পাঠ্যপুস্তক (E-Book)',
          icon: BookOpen,
          accentGradient: 'linear-gradient(90deg, #059669, #10b981)',
          badgeBg: '#ecfdf5',
          badgeColor: '#047857',
          badgeBorder: '#a7f3d0',
          cardBg: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)',
          cardBorder: '#dcfce7',
          btnText: 'বই পড়ুন',
          btnIcon: BookOpen,
          pillIcon: 'file'
        };
      case 'note':
      default:
        return {
          label: 'ক্লাস নোট (Notes)',
          icon: Sparkles,
          accentGradient: 'linear-gradient(90deg, #7c3aed, #a855f7)',
          badgeBg: '#f5f3ff',
          badgeColor: '#6d28d9',
          badgeBorder: '#ddd6fe',
          cardBg: 'linear-gradient(180deg, #ffffff 0%, #faf5ff 100%)',
          cardBorder: '#f3e8ff',
          btnText: 'নোট দেখুন',
          btnIcon: Sparkles,
          pillIcon: 'file'
        };
    }
  };

  return (
    <div style={{ animation: 'slideUpFade 0.3s ease' }}>
      
      {/* Top Banner & Control Area */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
        borderRadius: '24px',
        padding: '32px 30px',
        color: '#ffffff',
        marginBottom: '28px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 36px -8px rgba(49, 46, 129, 0.25)'
      }}>
        {/* Soft Background Orbs */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-40px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(129, 140, 248, 0.25) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '20%',
          width: '350px', height: '250px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%)',
          filter: 'blur(50px)', pointerEvents: 'none'
        }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          position: 'relative',
          zIndex: 2
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 14px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.78rem',
              fontWeight: 700,
              marginBottom: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <GraduationCap size={14} color="#38bdf8" />
              <span>ডিজিটাল পাঠাগার ও কোর্স কন্টেন্ট পোর্টাল</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 0 8px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-display)'
            }}>
              কোর্স ম্যাটেরিয়াল ও ডিজিটাল লাইব্রেরি (Course Materials)
            </h1>

            <p style={{
              fontSize: '0.94rem',
              color: '#c7d2fe',
              margin: 0,
              maxWidth: '680px',
              lineHeight: 1.6
            }}>
              অনলাইন ভিডিও লেকচার, অফিসিয়াল পিডিএফ স্লাইড, এনসিটিবি ই-বুক এবং শিক্ষকদের প্রস্তুতকৃত হ্যান্ডরিটেন রিভিশন নোটস—সকল শ্রেণির শিক্ষার্থীদের জন্য এক ক্লিকেই উন্মুক্ত।
            </p>
          </div>

          {/* Teacher/Admin Action: Add Material Button */}
          {canManage && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '13px 24px',
                borderRadius: '14px',
                fontSize: '0.94rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(16, 185, 129, 0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.4)'; }}
            >
              <Plus size={18} strokeWidth={3} />
              <span>নতুন ম্যাটেরিয়াল যুক্ত করুন (Upload)</span>
            </button>
          )}
        </div>

        {/* Quick Material Stats Summary Pills */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          marginTop: '26px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          position: 'relative',
          zIndex: 2
        }}>
          {[
            { label: 'মোট ম্যাটেরিয়াল', count: materials.length, icon: BookOpen },
            { label: 'ভিডিও ক্লাস', count: materials.filter(m => m.type === 'video').length, icon: Video },
            { label: 'পিডিএফ লেকচার শিট', count: materials.filter(m => m.type === 'pdf').length, icon: FileText },
            { label: 'এনসিটিবি পাঠ্যবই', count: materials.filter(m => m.type === 'book').length, icon: BookOpen },
            { label: 'রিভিশন নোটস', count: materials.filter(m => m.type === 'note').length, icon: Sparkles }
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '10px 14px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>{(() => { const Icon = stat.icon; return Icon ? (typeof Icon === 'string' ? Icon : <Icon size={20} color="#93c5fd" />) : null; })()}</span>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.1 }}>{stat.count}</div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 600 }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar Section */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        padding: '20px 22px',
        border: '1.5px solid #e2e8f0',
        boxShadow: '0 4px 18px -2px rgba(15, 23, 42, 0.05)',
        marginBottom: '26px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '16px'
        }}>
          {/* Type Filter Buttons */}
          <div style={{
            display: 'inline-flex',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            flexWrap: 'wrap',
            gap: '4px'
          }}>
            {[
              { id: 'all', label: 'সকল কন্টেন্ট', icon: Layers },
              { id: 'video', label: 'ভিডিও ক্লাস', icon: Video },
              { id: 'pdf', label: 'পিডিএফ শিট', icon: FileText },
              { id: 'book', label: 'পাঠ্যবই (E-Books)', icon: BookOpen },
              { id: 'note', label: 'ক্লাস নোটস', icon: Sparkles }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = selectedType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedType(tab.id)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.84rem',
                    fontWeight: isActive ? 800 : 600,
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: isActive ? '#4338ca' : 'transparent',
                    color: isActive ? '#ffffff' : '#475569',
                    boxShadow: isActive ? '0 4px 12px rgba(67, 56, 202, 0.25)' : 'none',
                    transition: 'all 0.18s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div style={{
            position: 'relative',
            minWidth: 'min(100%, 240px)',
            flex: '1',
            maxWidth: '420px'
          }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="পাঠ্যক্রম, অধ্যায় বা শিক্ষকের নাম খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                borderRadius: '10px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.88rem',
                outline: 'none',
                transition: 'border 0.2s ease',
                backgroundColor: '#f8fafc'
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#4338ca'; e.currentTarget.style.backgroundColor = '#ffffff'; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}
            />
            {searchQuery && (
              <X
                size={14}
                color="#94a3b8"
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            )}
          </div>
        </div>

        {/* Dropdowns for Class and Subject Filtering */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          paddingTop: '14px',
          borderTop: '1px solid #f1f5f9'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={14} color="#64748b" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>ফিল্টার করুন:</span>
          </div>

          {/* Class Selector */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.82rem',
              fontWeight: 600,
              backgroundColor: '#ffffff',
              color: '#334155',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="all">সকল শ্রেণি (All Classes)</option>
            <option value="Class 1">১ম শ্রেণি (Class 1)</option>
            <option value="Class 2">২য় শ্রেণি (Class 2)</option>
            <option value="Class 3">৩য় শ্রেণি (Class 3)</option>
            <option value="Class 4">৪র্থ শ্রেণি (Class 4)</option>
            <option value="Class 5">৫ম শ্রেণি (Class 5)</option>
            <option value="Class 6">৬ষ্ঠ শ্রেণি (Class 6)</option>
            <option value="Class 7">৭ম শ্রেণি (Class 7)</option>
            <option value="Class 8">৮ম শ্রেণি (Class 8)</option>
            <option value="Class 9">৯ম শ্রেণি (Class 9)</option>
            <option value="Class 10">১০ম শ্রেণি (SSC 10)</option>
            <option value="Class 11">একাদশ শ্রেণি (Class 11)</option>
            <option value="Class 12">দ্বাদশ শ্রেণি (HSC 12)</option>
          </select>

          {/* Subject Selector */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.82rem',
              fontWeight: 600,
              backgroundColor: '#ffffff',
              color: '#334155',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="all">সকল বিষয় (All Subjects)</option>
            <option value="পদার্থবিজ্ঞান">পদার্থবিজ্ঞান (Physics)</option>
            <option value="রসায়ন">রসায়ন (Chemistry)</option>
            <option value="গণিত">উচ্চতর গণিত (Higher Math)</option>
            <option value="জীববিজ্ঞান">জীববিজ্ঞান (Biology)</option>
            <option value="ইংরেজি">ইংরেজি (English)</option>
            <option value="বিজ্ঞান">সাধারণ বিজ্ঞান (Science)</option>
            <option value="তথ্য ও যোগাযোগ">তথ্য ও যোগাযোগ প্রযুক্তি (ICT)</option>
            <option value="বাংলা">বাংলা (Bangla)</option>
          </select>

          {(selectedClass !== 'all' || selectedSubject !== 'all' || searchQuery !== '' || selectedType !== 'all') && (
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedClass('all');
                setSelectedSubject('all');
                setSearchQuery('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#e11d48',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginLeft: 'auto'
              }}
            >
              <X size={12} /> রিসেট ফিল্টার
            </button>
          )}
        </div>
      </div>

      {/* Materials Cards Grid */}
      {filteredMaterials.length === 0 ? (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '60px 24px',
          textAlign: 'center',
          border: '1.5px dashed #cbd5e1',
          color: '#64748b'
        }}>
          <BookOpen size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>
            কোনো ম্যাটেরিয়াল পাওয়া যায়নি
          </h3>
          <p style={{ fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 18px' }}>
            আপনার ফিল্টারকৃত শ্রেণি বা বিষয়ের জন্য এই মুহূর্তে কোনো কন্টেন্ট খুঁজে পাওয়া যায়নি। ফিল্টার রিসেট করে পুনরায় চেষ্টা করুন।
          </p>
          <button
            onClick={() => {
              setSelectedType('all');
              setSelectedClass('all');
              setSelectedSubject('all');
              setSearchQuery('');
            }}
            className="btn btn-secondary"
            style={{ fontSize: '0.84rem' }}
          >
            সকল কন্টেন্ট দেখুন
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 310px), 1fr))',
          gap: '20px'
        }}>
          {filteredMaterials.map(item => {
            const typeStyle = getTypeStyle(item.type);
            const TypeIcon = typeStyle.icon;

            return (
              <div
                key={item.id}
                style={{
                  position: 'relative',
                  backgroundColor: '#ffffff',
                  background: typeStyle.cardBg,
                  borderRadius: '18px',
                  padding: '24px',
                  border: `1.5px solid ${typeStyle.cardBorder}`,
                  boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  overflow: 'hidden'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px -4px rgba(15, 23, 42, 0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px -2px rgba(15, 23, 42, 0.05)';
                }}
              >
                {/* Top Accent Gradient Bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '4px', background: typeStyle.accentGradient
                }} />

                <div>
                  {/* Top Badge Row */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                    marginBottom: '14px'
                  }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.76rem',
                      fontWeight: 800,
                      color: typeStyle.badgeColor,
                      backgroundColor: typeStyle.badgeBg,
                      border: `1px solid ${typeStyle.badgeBorder}`,
                      padding: '4px 12px',
                      borderRadius: '9999px'
                    }}>
                      <span>{typeStyle.pillEmoji}</span>
                      <span>{typeStyle.label}</span>
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: '#475569',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}>
                        {item.classLevel}
                      </span>
                      <button
                        onClick={() => handleToggleBookmark(item.id)}
                        title={item.isBookmarked ? 'বুকমার্ক সরানো হয়েছে' : 'বুকমার্ক করুন'}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: item.isBookmarked ? '#f59e0b' : '#94a3b8',
                          padding: '2px'
                        }}
                      >
                        <Bookmark size={16} fill={item.isBookmarked ? '#f59e0b' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* Chapter & Subject Pill */}
                  <div style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#4338ca',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Folder size={13} />
                    <span>{item.subject}</span>
                    <span>•</span>
                    <span style={{ color: '#64748b', fontWeight: 600 }}>{item.chapter}</span>
                  </div>

                  {/* Material Title */}
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    marginBottom: '10px',
                    lineHeight: 1.45,
                    letterSpacing: '-0.01em',
                    cursor: 'pointer'
                  }}
                  onClick={() => setActiveViewerModal(item)}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.86rem',
                    color: '#475569',
                    lineHeight: 1.6,
                    marginBottom: '18px'
                  }}>
                    {item.description}
                  </p>

                  {/* Teacher & Metadata Info */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '10px 12px',
                    marginBottom: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '26px', height: '26px', borderRadius: '50%',
                        background: '#eef2ff', color: '#4338ca',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <User size={14} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: '#1e293b' }}>{item.teacher}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{item.teacherRole}</div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', color: '#64748b', fontWeight: 600, fontSize: '0.72rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                        <Clock size={11} /> {item.duration}
                      </div>
                      <div>{item.fileSize}</div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div style={{
                  paddingTop: '14px',
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px'
                }}>
                  {/* Primary View / Play Button */}
                  <button
                    onClick={() => setActiveViewerModal(item)}
                    style={{
                      background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '9px 16px',
                      borderRadius: '10px',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(67, 56, 202, 0.25)',
                      transition: 'all 0.18s ease',
                      flex: '1',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#3730a3'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#4338ca'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <typeStyle.btnIcon size={14} />
                    <span>{typeStyle.btnText}</span>
                  </button>

                  {/* Download / Offline Save Button */}
                  <button
                    onClick={() => {
                      alert(`"${item.title}" ডাউনলোড শুরু হয়েছে।\nফাইল সাইজ: ${item.fileSize}\nঅফলাইনে পড়ার জন্য শিক্ষার্থীর ড্যাশবোর্ডে সংরক্ষিত হয়েছে।`);
                    }}
                    style={{
                      background: '#ffffff',
                      border: '1.5px solid #cbd5e1',
                      color: '#334155',
                      padding: '9px 14px',
                      borderRadius: '10px',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.18s ease'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#4338ca'; e.currentTarget.style.color = '#4338ca'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#334155'; }}
                    title="ডাউনলোড করুন"
                  >
                    <Download size={14} />
                    <span>ডাউনলোড</span>
                  </button>

                  {/* Delete Button (For Teacher/Admin) */}
                  {canManage && (
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      style={{
                        background: 'none',
                        border: '1px solid #fee2e2',
                        color: '#ef4444',
                        padding: '9px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="মুছে ফেলুন"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================
          MODAL 1: STUDENT MATERIAL VIEWER MODAL
          ========================================================= */}
      {activeViewerModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 9999,
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            maxWidth: '850px',
            width: '100%',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
            border: '1px solid #cbd5e1'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#f8fafc'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    color: '#4338ca',
                    background: '#eef2ff',
                    padding: '3px 10px',
                    borderRadius: '9999px'
                  }}>
                    {activeViewerModal.classLevel} • {activeViewerModal.subject}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                    {activeViewerModal.chapter}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {activeViewerModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveViewerModal(null)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
              {activeViewerModal.type === 'video' ? (
                <div>
                  {/* Video Player Box */}
                  <div style={{
                    width: '100%',
                    height: '380px',
                    borderRadius: '16px',
                    backgroundColor: '#0f172a',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    marginBottom: '20px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                  }}>
                    {/* Simulated Clean Video Player with Controls */}
                    <div style={{ textAlign: 'center', color: '#ffffff', padding: '20px' }}>
                      <div style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #e11d48, #f43f5e)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        boxShadow: '0 0 30px rgba(225, 29, 72, 0.6)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease'
                      }}
                      onClick={() => alert(`ভিডিও ক্লাস প্লে হচ্ছে: ${activeViewerModal.title}\nশিক্ষক: ${activeViewerModal.teacher}`)}
                      >
                        <Play size={32} fill="#ffffff" style={{ marginLeft: '4px' }} />
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px' }}>
                        {activeViewerModal.title}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                        শিক্ষক: {activeViewerModal.teacher} • সময়কাল: {activeViewerModal.duration} • কোয়ালিটি: {activeViewerModal.fileSize}
                      </div>
                      <div style={{
                        marginTop: '16px',
                        display: 'inline-block',
                        background: 'rgba(255,255,255,0.15)',
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        fontSize: '0.78rem',
                        fontWeight: 600
                      }}>
                        ▶ সম্পূর্ণ ভিডিও ক্লাস দেখতে প্লে বাটনে ক্লিক করুন
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* PDF & Document Reader Preview */}
                  <div style={{
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '30px 24px',
                    backgroundColor: '#f8fafc',
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      background: activeViewerModal.type === 'book' ? '#dcfce7' : '#e0e7ff',
                      color: activeViewerModal.type === 'book' ? '#059669' : '#4338ca',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      fontSize: '1.8rem'
                    }}>
                      {activeViewerModal.type === 'book' ? <BookOpen size={30} /> : <FileText size={30} />}
                    </div>

                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                      {activeViewerModal.title}
                    </h4>

                    <p style={{ fontSize: '0.88rem', color: '#475569', maxWidth: '540px', margin: '0 auto 16px', lineHeight: 1.6 }}>
                      {activeViewerModal.description}
                    </p>

                    <div style={{
                      display: 'inline-flex',
                      gap: '12px',
                      background: '#ffffff',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#334155',
                      marginBottom: '16px'
                    }}>
                      <span>পৃষ্ঠা সংখ্যা: {activeViewerModal.duration}</span>
                      <span>•</span>
                      <span>ফাইল সাইজ: {activeViewerModal.fileSize}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button
                        onClick={() => alert(`ডকুমেন্ট রিডার ওপেন করা হয়েছে:\n${activeViewerModal.title}\n\nশিক্ষার্থী প্যানেল থেকে সফলভাবে ব্রাউজ করা যাচ্ছে।`)}
                        style={{
                          padding: '10px 20px',
                          borderRadius: '10px',
                          border: 'none',
                          background: '#4338ca',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Eye size={15} /> অনলাইন রিডারে সম্পূর্ণ পড়ুন
                      </button>

                      <button
                        onClick={() => alert(`"${activeViewerModal.title}" ফাইলটি আপনার ডিভাইসে ডাউনলোড সম্পন্ন হয়েছে।`)}
                        style={{
                          padding: '10px 20px',
                          borderRadius: '10px',
                          border: '1.5px solid #cbd5e1',
                          background: '#ffffff',
                          color: '#1e293b',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Download size={15} /> অফলাইন PDF ডাউনলোড
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Learning Objectives & Teacher Details */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '18px 20px'
              }}>
                <h5 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  পাঠ্যক্রমের বিবরণ ও নির্দেশনাবলী:
                </h5>
                <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.7, margin: '0 0 12px' }}>
                  {activeViewerModal.description} এই পাঠ্য উপাদানটি জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) ২০২৬ সালের সর্বশেষ সিলেবাসের ওপর ভিত্তি করে প্রণয়ন করা হয়েছে। ক্লাসের যেকোনো সংশয়ের জন্য সরাসরি বিষয়ভিত্তিক শিক্ষকের সাথে যোগাযোগ করা যাবে।
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid #f1f5f9',
                  fontSize: '0.8rem',
                  color: '#64748b'
                }}>
                  <span>প্রস্তুতকারক: <strong>{activeViewerModal.teacher}</strong> ({activeViewerModal.teacherRole})</span>
                  <span>আপলোড তারিখ: {activeViewerModal.date}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '14px 24px',
              borderTop: '1px solid #e2e8f0',
              background: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} /> সকল শিক্ষার্থীর জন্য বিনামূল্যে উন্মুক্ত
              </div>
              <button
                onClick={() => setActiveViewerModal(null)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#334155',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                বন্ধ করুন (Close)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 2: TEACHER / ADMIN UPLOAD MATERIAL MODAL
          ========================================================= */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            maxWidth: '650px',
            width: '100%',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
            border: '1px solid #cbd5e1'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, #eef2ff 0%, #ffffff 100%)'
            }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 4px' }}>
                  নতুন কোর্স ম্যাটেরিয়াল আপলোড (Upload Material)
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                  ভিডিও লেকচার, পিডিএফ স্লাইড, পাঠ্যবই বা হ্যান্ডরিটেন নোট যুক্ত করুন
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddSubmit} style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
              <div style={{ display: 'grid', gap: '16px' }}>
                
                {/* Material Title */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                    ম্যাটেরিয়ালের শিরোনাম (Title) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ১০ম শ্রেণি পদার্থবিজ্ঞান: আলোর প্রতিফলন ও প্রতিসরণ ক্লাস"
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Type & Class Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                      কন্টেন্টের ধরন (Material Type) *
                    </label>
                    <select
                      value={newMaterial.type}
                      onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <option value="video">অনলাইন ভিডিও লেকচার (Video)</option>
                      <option value="pdf">পিডিএফ লেকচার শিট (PDF)</option>
                      <option value="book">এনসিটিবি পাঠ্যবই (E-Book)</option>
                      <option value="note">হ্যান্ডরিটেন ক্লাস নোটস (Notes)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                      শ্রেণি (Class Level) *
                    </label>
                    <select
                      value={newMaterial.classLevel}
                      onChange={(e) => setNewMaterial({ ...newMaterial, classLevel: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <option value="Class 1">১ম শ্রেণি (Class 1)</option>
                      <option value="Class 2">২য় শ্রেণি (Class 2)</option>
                      <option value="Class 3">৩য় শ্রেণি (Class 3)</option>
                      <option value="Class 4">৪র্থ শ্রেণি (Class 4)</option>
                      <option value="Class 5">৫ম শ্রেণি (Class 5)</option>
                      <option value="Class 6">৬ষ্ঠ শ্রেণি (Class 6)</option>
                      <option value="Class 7">৭ম শ্রেণি (Class 7)</option>
                      <option value="Class 8">৮ম শ্রেণি (Class 8)</option>
                      <option value="Class 9">৯ম শ্রেণি (Class 9)</option>
                      <option value="Class 10">১০ম শ্রেণি (Class 10 SSC)</option>
                      <option value="Class 11">একাদশ শ্রেণি (Class 11)</option>
                      <option value="Class 12">দ্বাদশ শ্রেণি (Class 12 HSC)</option>
                    </select>
                  </div>
                </div>

                {/* Subject & Chapter Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                      বিষয় (Subject) *
                    </label>
                    <select
                      value={newMaterial.subject}
                      onChange={(e) => setNewMaterial({ ...newMaterial, subject: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <option value="পদার্থবিজ্ঞান (Physics)">পদার্থবিজ্ঞান (Physics)</option>
                      <option value="রসায়ন (Chemistry)">রসায়ন (Chemistry)</option>
                      <option value="উচ্চতর গণিত (Higher Math)">উচ্চতর গণিত (Higher Math)</option>
                      <option value="জীববিজ্ঞান (Biology)">জীববিজ্ঞান (Biology)</option>
                      <option value="ইংরেজি (English)">ইংরেজি (English)</option>
                      <option value="বাংলা (Bangla)">বাংলা (Bangla)</option>
                      <option value="তথ্য ও যোগাযোগ প্রযুক্তি (ICT)">তথ্য ও যোগাযোগ প্রযুক্তি (ICT)</option>
                      <option value="সাধারণ বিজ্ঞান (Science)">সাধারণ বিজ্ঞান (Science)</option>
                      <option value="গণিত (General Math)">সাধারণ গণিত (General Math)</option>
                      <option value="বাংলাদেশ ও বিশ্বপরিচয়">বাংলাদেশ ও বিশ্বপরিচয়</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                      অধ্যায় / ইউনিট (Chapter)
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: অধ্যায় ৫: আলোর প্রতিসরণ"
                      value={newMaterial.chapter}
                      onChange={(e) => setNewMaterial({ ...newMaterial, chapter: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Teacher / Author & Duration */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                      শিক্ষক / প্রস্তুতকারক (Teacher)
                    </label>
                    <input
                      type="text"
                      value={newMaterial.teacher}
                      onChange={(e) => setNewMaterial({ ...newMaterial, teacher: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                      সময়কাল / পৃষ্ঠা সংখ্যা (Duration/Pages)
                    </label>
                    <input
                      type="text"
                      placeholder={newMaterial.type === 'video' ? 'যেমন: ৪৫ মিনিট' : 'যেমন: ২০ পৃষ্ঠা'}
                      value={newMaterial.duration}
                      onChange={(e) => setNewMaterial({ ...newMaterial, duration: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Video URL or File URL */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                    {newMaterial.type === 'video' ? 'ভিডিও লিঙ্ক (YouTube / Google Drive / Embed URL)' : 'পিডিএফ / ফাইল ড্রাইভ ডাউনলোড লিঙ্ক'}
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=... বা ফাইল লিঙ্ক"
                    value={newMaterial.videoUrl}
                    onChange={(e) => setNewMaterial({ ...newMaterial, videoUrl: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                    কোর্স উপাদানের সংক্ষিপ্ত বর্ণনা (Description)
                  </label>
                  <textarea
                    rows="3"
                    placeholder="পাঠ্যক্রমের মূল বিষয়বস্তু, সৃজনশীল প্রশ্ন ও সূত্রের সংক্ষিপ্ত বিবরণ..."
                    value={newMaterial.description}
                    onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.88rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '12px'
              }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#475569',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  বাতিল করুন
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 24px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>ম্যাটেরিয়াল প্রকাশ করুন (Publish)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
