import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SchoolPublicWebsite } from './components/SchoolPublicWebsite';
import { LoginPortal } from './components/LoginPortal';
import { CommandPalette } from './components/CommandPalette';
import { RealTimeNotificationToast } from './components/RealTimeNotificationToast';
import { AIChatDrawer } from './components/AIChatDrawer';
import { AcademicRoutineBuilder } from './components/AcademicRoutineBuilder';
import { ReportCardGenerator } from './components/ReportCardGenerator';
import { FinanceBillingView } from './components/FinanceBillingView';
import { EmailTrackerView } from './components/EmailTrackerView';
import { DesignSystemShowcase } from './components/DesignSystemShowcase';
import { CourseMaterialsView } from './components/CourseMaterialsView';

// Role Dashboards
import { SuperAdminDashboard } from './components/dashboards/SuperAdminDashboard';
import { TeacherDashboard } from './components/dashboards/TeacherDashboard';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { ParentDashboard } from './components/dashboards/ParentDashboard';
import { AccountantDashboard } from './components/dashboards/AccountantDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';

import { USER_ROLES, INSTITUTION, STUDENT_REPORT_CARD, INVOICES_DATA } from './data/mockData';
import { Radio, Zap, Sparkles, Building2, CheckCircle2, ShieldCheck, Heart, Receipt } from 'lucide-react';

export function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('schoolpulse_authenticated') === 'true';
  });
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('schoolpulse_role') || USER_ROLES.SUPER_ADMIN;
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('schoolpulse_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return null;
  });

  // Client Routing State: 'home' (Public School Site), 'login' (Dedicated Auth Page), 'dashboard' (Authenticated Console)
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash;
    if (hash === '#login') return 'login';
    if (hash === '#dashboard' && localStorage.getItem('schoolpulse_authenticated') === 'true') return 'dashboard';
    return 'home';
  });

  // Centralized Student Results & Marksheet State (Persisted in localStorage)
  const [studentReportCard, setStudentReportCard] = useState(() => {
    const saved = localStorage.getItem('schoolpulse_student_report_card');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return STUDENT_REPORT_CARD;
  });

  const handleUpdateStudentResults = (updatedReportCard) => {
    setStudentReportCard(updatedReportCard);
    localStorage.setItem('schoolpulse_student_report_card', JSON.stringify(updatedReportCard));
    
    // Broadcast live notification
    handleAddToast({
      id: `result-${Date.now()}`,
      type: 'marks',
      channel: 'লাইভ সিঙ্ক (Reverb)',
      time: 'এইমাত্র',
      title: 'ফলাফল স্টুডেন্ট পোর্টালে সিঙ্ক হয়েছে',
      message: `${updatedReportCard.student.name}-এর পরীক্ষার সম্পূর্ণ ফলাফল সফলভাবে হালনাগাদ ও সিঙ্ক করা হয়েছে (জিপিএ: ${updatedReportCard.summary.cumulativeGPA})।`
    });
  };

  // Centralized Invoices & Billing State (Persisted in localStorage)
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('schoolpulse_invoices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INVOICES_DATA;
  });

  const handleUpdateInvoices = (updatedInvoices) => {
    setInvoices(updatedInvoices);
    localStorage.setItem('schoolpulse_invoices', JSON.stringify(updatedInvoices));
  };

  // Pristine Light Theme by default
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchOpen, setSearchOpen] = useState(false);
  const [toasts, setToasts] = useState([
    {
      id: 'init-toast-1',
      type: 'marks',
      channel: 'WebSocket Push',
      time: 'Just now',
      title: 'Real-Time Sync Activated',
      message: 'Connected to Laravel Reverb WebSocket gateway at wss://oakridge.schoolpulse.io/reverb'
    }
  ]);

  // Synchronize hash routing across the application
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#login') {
        setCurrentRoute('login');
      } else if (hash === '#dashboard') {
        if (isAuthenticated) {
          setCurrentRoute('dashboard');
        } else {
          window.location.hash = '#login';
          setCurrentRoute('login');
        }
      } else if (!hash || hash === '#' || hash.startsWith('#about') || hash.startsWith('#notices') || hash.startsWith('#facilities') || hash.startsWith('#academics') || hash.startsWith('#contact')) {
        if (!isAuthenticated) {
          setCurrentRoute('home');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated]);

  // Force reset to light theme and clear any lingering dark theme in user browser
  useEffect(() => {
    localStorage.setItem('schoolpulse_theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  // Apply theme attribute to html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('schoolpulse_theme', theme);
  }, [theme]);

  // Listen for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleAddToast = (toast) => {
    setToasts(prev => [toast, ...prev.slice(0, 3)]);
  };

  const handleDismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateToLogin = () => {
    window.location.hash = '#login';
    setCurrentRoute('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (role, userObj) => {
    setCurrentRole(role);
    if (userObj) {
      setCurrentUser(userObj);
      localStorage.setItem('schoolpulse_current_user', JSON.stringify(userObj));
    }
    setIsAuthenticated(true);
    setActiveTab('dashboard');
    localStorage.setItem('schoolpulse_authenticated', 'true');
    localStorage.setItem('schoolpulse_role', role);
    window.location.hash = '#dashboard';
    setCurrentRoute('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('schoolpulse_authenticated');
    localStorage.removeItem('schoolpulse_role');
    localStorage.removeItem('schoolpulse_current_user');
    setActiveTab('dashboard');
    window.location.hash = '';
    setCurrentRoute('home');
  };

  const handleSimulateSync = () => {
    handleAddToast({
      id: `sim-${Date.now()}`,
      type: 'marks',
      channel: 'Reverb Event',
      time: 'Just now',
      title: 'Teacher Autosave Broadcast',
      message: 'Dr. Marcus Sterling updated Grade 10-A AP Physics continuous scores.'
    });
  };

  // Render main content area based on activeTab and currentRole
  const renderContent = () => {
    if (activeTab === 'courseMaterials') {
      return (
        <CourseMaterialsView 
          currentRole={currentRole}
          currentUser={currentUser}
          onTriggerNotification={handleAddToast}
        />
      );
    }
    if (activeTab === 'routine') {
      return <AcademicRoutineBuilder />;
    }
    if (activeTab === 'reportCard') {
      return <ReportCardGenerator reportData={studentReportCard} />;
    }
    if (activeTab === 'finance') {
      return (
        <FinanceBillingView 
          invoices={invoices}
          onUpdateInvoices={handleUpdateInvoices}
          onTriggerNotification={handleAddToast}
        />
      );
    }
    if (activeTab === 'emailTracker') {
      return <EmailTrackerView />;
    }
    if (activeTab === 'designSystem' || currentRole === USER_ROLES.DESIGN_SYSTEM) {
      return <DesignSystemShowcase theme={theme} toggleTheme={toggleTheme} />;
    }

    // Default 'dashboard' tab renders the active Role Dashboard
    switch (currentRole) {
      case USER_ROLES.ADMIN:
        return (
          <AdminDashboard
            currentUser={currentUser}
            onTriggerNotification={handleAddToast}
            studentReportCard={studentReportCard}
            onUpdateStudentResults={handleUpdateStudentResults}
            invoices={invoices}
            onUpdateInvoices={handleUpdateInvoices}
          />
        );
      case USER_ROLES.SUPER_ADMIN:
        return (
          <SuperAdminDashboard 
            onOpenRoutine={() => setActiveTab('routine')}
            onOpenReportCard={() => setActiveTab('reportCard')}
          />
        );
      case USER_ROLES.TEACHER:
        return (
          <TeacherDashboard 
            onTriggerNotification={handleAddToast}
            onNavigateRoutine={() => setActiveTab('routine')}
            studentReportCard={studentReportCard}
            onUpdateStudentResults={handleUpdateStudentResults}
            currentUser={currentUser}
          />
        );
      case USER_ROLES.STUDENT:
        return (
          <StudentDashboard 
            onOpenReportCard={() => setActiveTab('reportCard')}
            onOpenRoutine={() => setActiveTab('routine')}
            studentReportCard={studentReportCard}
            currentUser={currentUser}
          />
        );
      case USER_ROLES.PARENT:
        return (
          <ParentDashboard 
            onNavigateFinance={() => setActiveTab('finance')}
            onNavigateReportCard={() => setActiveTab('reportCard')}
            studentReportCard={studentReportCard}
            invoices={invoices}
            currentUser={currentUser}
          />
        );
      case USER_ROLES.ACCOUNTANT:
        return (
          <AccountantDashboard 
            onNavigateFinance={() => setActiveTab('finance')}
            invoices={invoices}
          />
        );
      default:
        return <SuperAdminDashboard />;
    }
  };

  // 1. Dedicated Login Route (#login)
  if (currentRoute === 'login') {
    return (
      <LoginPortal 
        onLogin={handleLogin} 
        onBackToHome={navigateToHome} 
      />
    );
  }

  // 2. Default Public School Website (First screen any visitor/user sees)
  if (currentRoute === 'home' || !isAuthenticated) {
    return (
      <SchoolPublicWebsite 
        onNavigateLogin={navigateToLogin} 
      />
    );
  }

  // 3. Authenticated SchoolPulse Management Console (#dashboard)
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Main Navigation (Single Sleek 64px Header) */}
      <Navbar
        currentRole={currentRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setSearchOpen(true)}
        notificationCount={toasts.length}
        onOpenNotifications={handleSimulateSync}
        onLogout={handleLogout}
        onNavigateHome={navigateToHome}
        currentUser={currentUser}
      />

      {/* Main App Workspace */}
      <main className="main-portal-content" style={{
        flex: 1,
        maxWidth: '1600px',
        width: '100%',
        margin: '0 auto',
        padding: '24px 24px 70px'
      }}>
        {/* Sleek Page Title & Authenticated Session Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          <div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
              {activeTab === 'courseMaterials' ? 'Course Materials & Academic E-Library' :
               activeTab === 'routine' ? 'Class Routine & Timetable Builder' :
               activeTab === 'reportCard' ? 'Automated PDF Report Cards' :
               activeTab === 'finance' ? 'Finance, Tuition & Payment Gateway' :
               activeTab === 'emailTracker' ? 'Notice Board & 1x1 Pixel Telemetry' :
               activeTab === 'designSystem' ? 'Figma Design System Token Lab' :
               `${currentRole} Portal Console`}
            </h1>
            <p style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '3px' }}>
              {INSTITUTION.name} • Academic Year {INSTITUTION.academicYear} • Term 2 Active Session
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Authenticated Role Status Badge (No public switching buttons) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-full)',
              border: '1px solid #e2e8f0',
              fontSize: '0.78rem',
              color: '#334155',
              boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
              <span>Signed In: <strong>{currentRole}</strong></span>
            </div>

            <button
              onClick={handleSimulateSync}
              className="btn btn-secondary"
              style={{
                padding: '6px 14px',
                fontSize: '0.78rem',
                gap: '6px',
                color: '#059669',
                borderColor: '#a7f3d0',
                backgroundColor: '#ecfdf5',
                fontWeight: 700
              }}
              title="Simulate incoming WebSocket push from teacher/system"
            >
              <Radio size={14} /> Live Sync
            </button>
          </div>
        </div>

        {/* Dynamic Content View */}
        {renderContent()}
      </main>

      {/* Global Spotlight Search Modal (Ctrl+K) */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
        onSelectRole={(role) => setCurrentRole(role)}
      />

      {/* Real-Time WebSocket Toast Notifications */}
      <RealTimeNotificationToast
        toasts={toasts}
        onDismissToast={handleDismissToast}
        onSimulateEvent={handleSimulateSync}
      />

      {/* Floating AI Chat Assistant */}
      <AIChatDrawer />

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-surface)',
        padding: '24px',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <strong>SchoolPulse SaaS v2.0</strong> — Engineered for <strong>{INSTITUTION.name}</strong>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem' }}>
            <span>Architecture: React Edge (Vercel) + Laravel 11 Multi-Tenant</span>
            <span>Database: PostgreSQL 16 (Schema-Isolated)</span>
            <span>Real-time: Laravel Reverb WebSockets</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
            100% Web-Based • Zero Hardware Lock-In • PWA Offline Ready
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
