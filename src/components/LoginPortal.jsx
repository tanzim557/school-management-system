import React, { useState } from 'react';
import { 
  Building2, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  Heart, 
  Landmark,
  CheckCircle2,
  Sparkles,
  Calendar,
  FileCheck,
  Zap,
  Shield,
  User,
  Radio,
  KeyRound,
  ArrowLeft
} from 'lucide-react';
import { INSTITUTION, CURRENT_USERS, USER_ROLES } from '../data/mockData';
import { AccountManagementModal } from './AccountManagementModal';
import { authenticateUser, getAccounts, getAdmissions } from '../data/authManager';
import { UserPlus } from 'lucide-react';

export function LoginPortal({ onLogin, onBackToHome }) {
  const [showAccountDeskModal, setShowAccountDeskModal] = useState(false);

  // 3 Primary Roles matching user screenshot + Admin
  const roles = [
    {
      id: USER_ROLES.TEACHER,
      label: 'অধ্যক্ষ / শিক্ষক',
      fullName: 'অধ্যক্ষ ও বিষয়ভিত্তিক শিক্ষক',
      name: 'প্রফেসর লাল মোহাম্মদ',
      email: 'principal',
      password: '123',
      icon: BookOpen,
      avatar: '/images/principal.jpg',
      tag: 'অধ্যক্ষ • বিষয়: উচ্চতর গণিত ও পদার্থবিজ্ঞান',
      greeting: 'শ্রেণিভিত্তিক রুটিন, বিষয়ভিত্তিক মূল্যায়ন ও শিক্ষক হাজিরা।'
    },
    {
      id: USER_ROLES.STUDENT,
      label: 'শিক্ষার্থী',
      fullName: 'অনুমোদিত শিক্ষার্থী',
      name: 'তানভীর আহমেদ',
      email: 'ISC-2026-1014',
      password: '123',
      icon: GraduationCap,
      avatar: CURRENT_USERS[USER_ROLES.STUDENT]?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      tag: '১০ম শ্রেণি (বিজ্ঞান) • রোল ১০১ • ভর্তি অনুমোদিত',
      greeting: 'এসএসসি প্রি-টেস্ট ও বার্ষিক পরীক্ষার মার্কশিট ও ফলাফল।'
    },
    {
      id: USER_ROLES.PARENT,
      label: 'অভিভাবক',
      fullName: 'শিক্ষার্থীর অভিভাবক',
      name: 'জনাব মোঃ রিয়াজ উদ্দিন',
      email: 'riaz.parent',
      password: '123',
      icon: Heart,
      avatar: '/images/guardian_rep.jpg',
      tag: 'অভিভাবক (তানভীর আহমেদ)',
      greeting: 'সেশন ফি ও মাসিক বেতন বিকাশ/নগদে পরিশোধ এবং শিক্ষক চ্যাট।'
    },
    {
      id: USER_ROLES.ADMIN,
      label: 'অ্যাডমিন',
      fullName: 'সিস্টেম অ্যাডমিনিস্ট্রেটর',
      name: 'সিস্টেম অ্যাডমিন',
      email: 'admin',
      password: 'admin',
      icon: ShieldCheck,
      avatar: '/images/chairman.jpg',
      tag: 'পূর্ণ অ্যাক্সেস (Full Control)',
      greeting: 'সকল অ্যাকাউন্ট, ভর্তি, শিক্ষক নিয়োগ ও ফলাফল সম্পাদনা।'
    }
  ];

  const [selectedRole, setSelectedRole] = useState(USER_ROLES.TEACHER);
  const activeRoleData = roles.find(r => r.id === selectedRole) || roles[0];

  const [identifier, setIdentifier] = useState('principal');
  const [password, setPassword] = useState('123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRoleTabClick = (roleObj) => {
    setSelectedRole(roleObj.id);
    setIdentifier(roleObj.email);
    setPassword(roleObj.password || '123');
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMsg('ইউজারনেম অথবা স্টুডেন্ট আইডি প্রদান করুন।');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      const res = authenticateUser(selectedRole, identifier, password);

      if (!res.success) {
        setErrorMsg(res.error);
        return;
      }

      onLogin(res.user.role, res.user);
    }, 450);
  };

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#f8fafc',
      backgroundImage: `
        radial-gradient(#cbd5e1 1.2px, transparent 1.2px),
        radial-gradient(#e2e8f0 1.2px, #f8fafc 1.2px)
      `,
      backgroundSize: '36px 36px',
      backgroundPosition: '0 0, 18px 18px',
      padding: '24px 20px',
      fontFamily: 'var(--font-body)'
    }}>

      {/* Atmospheric Luminous Gradient Orbs (Smooth Ambient Animation) */}
      <div 
        className="ambient-orb"
        style={{
          width: '520px',
          height: '520px',
          backgroundColor: 'rgba(99, 102, 241, 0.18)',
          top: '-120px',
          left: '-80px',
          animation: 'pulseGlow 8s infinite ease-in-out'
        }} 
      />
      <div 
        className="ambient-orb"
        style={{
          width: '460px',
          height: '460px',
          backgroundColor: 'rgba(192, 132, 252, 0.15)',
          top: '20%',
          right: '-100px',
          animation: 'floatSlow 10s infinite ease-in-out'
        }} 
      />
      <div 
        className="ambient-orb"
        style={{
          width: '500px',
          height: '500px',
          backgroundColor: 'rgba(56, 189, 248, 0.14)',
          bottom: '-140px',
          left: '30%',
          animation: 'floatSlower 12s infinite ease-in-out'
        }} 
      />

      {/* Top Floating Institutional Navigation Bar */}
      <header style={{
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Brand Identity & Back to Website */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '7px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#334155',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}
            >
              <ArrowLeft size={15} color="#4338ca" />
              <span>Back to School Website</span>
            </button>
          )}

          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: onBackToHome ? 'pointer' : 'default' }}
            onClick={onBackToHome}
            title={onBackToHome ? "আইডিয়াল স্কুল অ্যান্ড কলেজ ওয়েবসাইটে ফিরে যান" : ""}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 900,
              fontSize: '1.2rem',
              boxShadow: '0 8px 20px -4px rgba(30, 58, 138, 0.4)',
              letterSpacing: '-0.02em'
            }}>
              ISC
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '-0.03em',
                color: '#0f172a',
                lineHeight: 1.1
              }}>
                আইডিয়াল <span style={{ color: '#1e3a8a' }}>পোর্টাল</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                {INSTITUTION.name} • মতিঝিল, ঢাকা
              </div>
            </div>
          </div>
        </div>

        {/* Live System Status Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ffffff',
            padding: '7px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
            fontSize: '0.76rem',
            color: '#334155',
            fontWeight: 600
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)',
              animation: 'pulseGlow 2s infinite ease-in-out'
            }} />
            <span>Tenant: <strong>{INSTITUTION.subdomain}</strong></span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#f1f5f9',
            padding: '7px 12px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid #e2e8f0',
            fontSize: '0.74rem',
            color: '#059669',
            fontWeight: 700
          }}>
            <ShieldCheck size={14} /> 256-Bit SSL
          </div>
        </div>
      </header>

      {/* Main Dual-Pane Panoramic Showcase & Authentication Card */}
      <main style={{
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        gap: '24px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>

        {/* Left Pane: Interactive Feature Showcase & High Vibe Visuals */}
        <div style={{
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px'
        }}>
          {/* Badge */}
          <div style={{
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: '#eef2ff',
            border: '1px solid #c7d2fe',
            color: '#4338ca',
            fontSize: '0.75rem',
            fontWeight: 700,
            boxShadow: '0 2px 8px rgba(67, 56, 202, 0.08)'
          }}>
            <Sparkles size={14} color="#4338ca" />
            <span>Next-Generation Education SaaS v2.4</span>
          </div>

          {/* Heading */}
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.4rem',
              fontWeight: 800,
              lineHeight: 1.18,
              color: '#0f172a',
              letterSpacing: '-0.035em',
              margin: 0
            }}>
              Smart school management, <span style={{
                background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 60%, #0284c7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>pure web speed.</span>
            </h1>
            <p style={{
              fontSize: '0.95rem',
              color: '#475569',
              lineHeight: 1.55,
              marginTop: '12px',
              maxWidth: '490px'
            }}>
              Experience frictionless academic operations — real-time timetable collision detection, automated QR grade transcripts, and instant parent push alerts.
            </p>
          </div>

          {/* Floating Live Telemetry Showcase Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '6px' }}>
            
            {/* Live Routine Card */}
            <div 
              className="floating-badge"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-lg)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
                cursor: 'default'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#eef2ff',
                color: '#4338ca',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Calendar size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a' }}>
                    Visual Timetable Routine Engine
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#059669', fontWeight: 700, backgroundColor: '#ecfdf5', padding: '2px 7px', borderRadius: '4px' }}>
                    Zero Conflict
                  </span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                  Grade 10-A • Physics Lab 301 • Dr. Sterling (Active Slot)
                </div>
              </div>
            </div>

            {/* Cryptographic Report Card Preview */}
            <div 
              className="floating-badge-delayed"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-lg)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
                cursor: 'default'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <FileCheck size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a' }}>
                    যাচাইকৃত ডিজিটাল ট্রান্সক্রিপ্ট ও কিউআর
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#059669', fontWeight: 700, backgroundColor: '#ecfdf5', padding: '2px 7px', borderRadius: '4px' }}>
                    GPA 5.00 (Golden A+)
                  </span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                  তানভীর আহমেদ (রোল ১০১) • এসএসসি প্রি-টেস্ট ও বার্ষিক মূল্যায়ন
                </div>
              </div>
            </div>

            {/* Real-Time WebSocket Telemetry */}
            <div 
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-lg)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
                cursor: 'default'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Zap size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a' }}>
                    Laravel Reverb Real-Time Sync
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#0284c7', fontWeight: 700, backgroundColor: '#e0f2fe', padding: '2px 7px', borderRadius: '4px' }}>
                    14ms Ping
                  </span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                  Instant parent push feed & 1x1 notice board tracking pixel
                </div>
              </div>
            </div>

          </div>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            paddingTop: '8px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>2,450+</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Students Active</div>
            </div>
            <div style={{ width: '1px', height: '24px', backgroundColor: '#e2e8f0' }} />
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>99.98%</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Cloud Uptime</div>
            </div>
            <div style={{ width: '1px', height: '24px', backgroundColor: '#e2e8f0' }} />
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4338ca' }}>100%</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Web-Based (No IoT)</div>
            </div>
          </div>
        </div>

        {/* Right Pane: Elite Glassmorphic Login Console */}
        <div 
          className="portal-glass-panel"
          style={{
            borderRadius: 'var(--radius-2xl)',
            padding: '36px 36px 32px',
            position: 'relative',
            animation: 'cardEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          {/* Top Institutional Header Inside Card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '16px',
            marginBottom: '16px',
            borderBottom: '1px solid #f1f5f9',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
                fontWeight: 900,
                fontSize: '1.15rem'
              }}>
                ISC
              </div>
              <div>
                <h2 style={{
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                  margin: 0,
                  lineHeight: 1.2
                }}>
                  আইডিয়াল সেন্ট্রাল পোর্টাল
                </h2>
                <p style={{
                  fontSize: '0.74rem',
                  color: '#64748b',
                  margin: '2px 0 0',
                  fontWeight: 600
                }}>
                  মতিঝিল মূল ক্যাম্পাস • EIIN: 108275
                </p>
              </div>
            </div>

            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#059669',
              backgroundColor: '#ecfdf5',
              padding: '4px 10px',
              borderRadius: '9999px',
              border: '1px solid #a7f3d0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10b981'
              }} />
              লাইভ ক্লাউড সার্ভার
            </span>
          </div>

          {/* Role Segmented Switcher (Matching 4 Institutional Roles) */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#64748b'
              }}>
                অ্যাকাউন্ট রোল নির্বাচন করুন:
              </span>
              <span style={{ fontSize: '0.7rem', color: '#2563eb', fontWeight: 600 }}>
                ৪টি প্রাতিষ্ঠানিক রোল
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '6px',
              backgroundColor: '#f1f5f9',
              padding: '4px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0'
            }}>
              {roles.map(roleItem => {
                const Icon = roleItem.icon;
                const isSelected = selectedRole === roleItem.id;
                return (
                  <button
                    key={roleItem.id}
                    type="button"
                    onClick={() => handleRoleTabClick(roleItem)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '8px 4px',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#1e3a8a' : 'transparent',
                      color: isSelected ? '#ffffff' : '#475569',
                      border: 'none',
                      boxShadow: isSelected ? '0 4px 12px rgba(30, 58, 138, 0.25)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease'
                    }}
                    title={roleItem.fullName}
                  >
                    <Icon size={16} color={isSelected ? '#ffffff' : '#64748b'} />
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: isSelected ? 800 : 600,
                      letterSpacing: '-0.01em',
                      whiteSpace: 'nowrap'
                    }}>
                      {roleItem.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Role Context Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: selectedRole === USER_ROLES.STUDENT ? '#ecfdf5' : selectedRole === USER_ROLES.TEACHER ? '#eff6ff' : selectedRole === USER_ROLES.PARENT ? '#fdf2f8' : '#f8fafc',
            border: `1px solid ${selectedRole === USER_ROLES.STUDENT ? '#a7f3d0' : selectedRole === USER_ROLES.TEACHER ? '#bfdbfe' : selectedRole === USER_ROLES.PARENT ? '#fbcfe8' : '#e2e8f0'}`,
            borderRadius: '8px',
            padding: '7px 12px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem' }}>
              <span style={{
                fontWeight: 800,
                color: selectedRole === USER_ROLES.STUDENT ? '#065f46' : selectedRole === USER_ROLES.TEACHER ? '#1e40af' : selectedRole === USER_ROLES.PARENT ? '#9d174d' : '#0f172a'
              }}>
                {selectedRole === USER_ROLES.TEACHER ? 'বিষয়ভিত্তিক শিক্ষক ও অধ্যক্ষ প্যানেল' :
                 selectedRole === USER_ROLES.STUDENT ? 'শিক্ষার্থী একাডেমিক পোর্টাল' :
                 selectedRole === USER_ROLES.PARENT ? 'অভিভাবক সেবা ও ফি পোর্টাল' :
                 'সিস্টেম অ্যাডমিন প্যানেল (Full Control)'}
              </span>
              <span style={{ color: '#94a3b8' }}>•</span>
              <span style={{ color: '#64748b', fontSize: '0.72rem' }}>
                {activeRoleData.greeting}
              </span>
            </div>
          </div>

          {/* Form Error Message */}
          {errorMsg && (
            <div style={{
              padding: '10px 14px',
              borderRadius: '8px',
              backgroundColor: '#fff1f2',
              border: '1px solid #fecdd3',
              color: '#e11d48',
              fontSize: '0.8rem',
              lineHeight: 1.4,
              marginBottom: '14px'
            }}>
              {errorMsg}
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Identifier Input */}
            <div>
              <label style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#334155',
                display: 'block',
                marginBottom: '5px'
              }}>
                {selectedRole === USER_ROLES.STUDENT ? 'অনুমোদিত স্টুডেন্ট আইডি (Student ID) *' :
                 selectedRole === USER_ROLES.TEACHER ? 'শিক্ষক ইউজারনেম (Username) বা প্রাতিষ্ঠানিক আইডি *' :
                 selectedRole === USER_ROLES.PARENT ? 'অভিভাবকের ইউজারনেম বা মোবাইল নম্বর *' :
                 'অ্যাডমিন ইউজারনেম (admin) *'}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder={
                    selectedRole === USER_ROLES.STUDENT ? 'যেমন: ISC-2026-1014' :
                    selectedRole === USER_ROLES.TEACHER ? 'যেমন: principal বা mizan.physics' :
                    selectedRole === USER_ROLES.PARENT ? 'যেমন: riaz.parent বা 01711-489201' :
                    'যেমন: admin'
                  }
                  className="input-control"
                  style={{
                    paddingLeft: '38px',
                    backgroundColor: '#ffffff',
                    height: '42px',
                    fontSize: '0.88rem',
                    fontFamily: selectedRole === USER_ROLES.STUDENT ? 'var(--font-mono)' : 'inherit',
                    fontWeight: 600,
                    borderRadius: '8px',
                    borderColor: '#cbd5e1'
                  }}
                  required
                />
                <User 
                  size={16} 
                  color="#94a3b8" 
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
                />
              </div>

              {selectedRole === USER_ROLES.STUDENT && (
                <div style={{ fontSize: '0.72rem', color: '#059669', marginTop: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={12} /> ভর্তি আবেদন অনুমোদনের পর মোবাইলে প্রাপ্ত আইডি ও পাসওয়ার্ড দিয়ে লগইন করুন
                </div>
              )}
              {selectedRole === USER_ROLES.TEACHER && (
                <div style={{ fontSize: '0.72rem', color: '#2563eb', marginTop: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <BookOpen size={12} /> বিষয়ভিত্তিক শিক্ষক: গণিত, পদার্থবিজ্ঞান, রসায়ন, ইংরেজি ইত্যাদি
                </div>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '5px'
              }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                  গোপন পাসওয়ার্ড (Password) *
                </label>
                <a 
                  href="#" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    alert(`পাসওয়ার্ড রিসেট লিংক ${identifier} এর রেজিস্টার্ড মোবাইলে পাঠানো হয়েছে।`); 
                  }} 
                  style={{
                    fontSize: '0.72rem',
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-control"
                  style={{
                    paddingLeft: '38px',
                    paddingRight: '38px',
                    backgroundColor: '#ffffff',
                    height: '42px',
                    fontSize: '0.88rem',
                    borderRadius: '8px',
                    borderColor: '#cbd5e1'
                  }}
                  required
                />
                <Lock 
                  size={16} 
                  color="#94a3b8" 
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer'
                  }}
                  title={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Security Notice & Remember Me */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.76rem',
                color: '#475569',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#1e3a8a', width: '15px', height: '15px' }}
                />
                এই ডিভাইসে মনে রাখুন
              </label>
              <span style={{
                fontSize: '0.72rem',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600
              }}>
                <KeyRound size={13} /> 256-Bit SSL এনক্রিপ্টেড
              </span>
            </div>

            {/* Primary Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary btn-shine"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.92rem',
                fontWeight: 700,
                marginTop: '4px',
                borderRadius: '8px',
                backgroundColor: '#1e3a8a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 6px 18px -3px rgba(30, 58, 138, 0.35)',
                transition: 'all 0.18s ease'
              }}
            >
              {isLoading ? (
                <>
                  <span style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    borderTopColor: '#ffffff',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.6s linear infinite'
                  }} />
                  <span>যাচাই করা হচ্ছে...</span>
                </>
              ) : (
                <>
                  <span>পোর্টালে প্রবেশ করুন ({activeRoleData.label})</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Autofill Pills (Cleanly Filtered by Selected Role) */}
          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#475569',
                textTransform: 'uppercase',
                letterSpacing: '0.03em'
              }}>
                ১-ক্লিক দ্রুত ডেমো লগইন ({activeRoleData.label}):
              </span>
              <span style={{ fontSize: '0.68rem', color: '#64748b' }}>
                পাসওয়ার্ড: 123
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {getAccounts()
                .filter(acc => acc.role === selectedRole)
                .map(acc => {
                  const isSelected = identifier === acc.username;
                  const displayBadge = acc.role === 'Teacher' 
                    ? `${acc.name.split(' ')[0]} • ${acc.subject?.split(' ')[0] || 'শিক্ষক'}`
                    : acc.role === 'Student' 
                    ? `${acc.name.split(' ')[0]} • রোল ${acc.roll || '১০১'}`
                    : acc.role === 'Parent'
                    ? `${acc.name.split(' ')[0]} (অভিভাবক)`
                    : `${acc.name.split(' ')[0]} (সভাপতি)`;

                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => {
                        setIdentifier(acc.username);
                        setPassword(acc.password);
                        setErrorMsg('');
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: isSelected ? '1.5px solid #1e3a8a' : '1px solid #cbd5e1',
                        backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                        color: isSelected ? '#1e3a8a' : '#334155',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected ? '0 2px 6px rgba(30, 58, 138, 0.15)' : 'none'
                      }}
                      title={`${acc.name} (${acc.username})`}
                    >
                      <span>{displayBadge}</span>
                      {isSelected && <CheckCircle2 size={13} color="#1e3a8a" />}
                    </button>
                  );
                })}
            </div>
          </div>


          {/* Bottom Link Back to School Public Site */}
          <div style={{ marginTop: '14px', textAlign: 'center' }}>
            <button
              type="button"
              onClick={onBackToHome}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748b',
                fontSize: '0.76rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontWeight: 600,
                padding: '4px 8px'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#1e3a8a'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
            >
              <ArrowLeft size={13} />
              <span>আইডিয়াল স্কুল অ্যান্ড কলেজের মূল ওয়েবসাইটে ফিরে যান</span>
            </button>
          </div>
        </div>

        {/* Account Management & Admission Approval Modal */}
        <AccountManagementModal 
          isOpen={showAccountDeskModal}
          onClose={() => setShowAccountDeskModal(false)}
          onQuickLogin={(acc) => {
            setShowAccountDeskModal(false);
            setSelectedRole(acc.role);
            setIdentifier(acc.username);
            setPassword(acc.password);
            setErrorMsg('');
          }}
        />

      </main>

      {/* Footer System Specs */}
      <footer style={{
        maxWidth: '1280px',
        width: '100%',
        margin: '20px auto 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 10,
        fontSize: '0.74rem',
        color: '#64748b',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div>
          © 2026 <strong>SchoolPulse Cloud</strong> • Enterprise Grade Multi-Tenant SMS
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>PostgreSQL 16 Schema Isolation</span>
          <span>•</span>
          <span>Laravel Reverb WebSockets</span>
          <span>•</span>
          <span>Zero IoT Lock-In</span>
        </div>
      </footer>

    </div>
  );
}

export default LoginPortal;
