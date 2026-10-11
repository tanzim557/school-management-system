import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Bell, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  CreditCard, 
  Mail, 
  Palette, 
  LayoutDashboard,
  ChevronDown,
  UserCheck,
  Shield,
  GraduationCap,
  BookOpen,
  Heart,
  Landmark,
  LogOut,
  User,
  Globe,
  Video
} from 'lucide-react';
import { INSTITUTION, CURRENT_USERS, USER_ROLES } from '../data/mockData';

export function Navbar({ 
  currentRole, 
  activeTab, 
  setActiveTab, 
  onOpenSearch,
  notificationCount,
  onOpenNotifications,
  onLogout,
  onNavigateHome,
  currentUser
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const defaultUser = CURRENT_USERS[currentRole] || CURRENT_USERS["Super Admin"] || {
    name: 'Authenticated User',
    email: 'user@schoolpulse.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  };
  const user = currentUser ? { ...defaultUser, ...currentUser } : defaultUser;

  // Role-Based dynamic navigation tabs
  const getNavTabsForRole = (role) => {
    switch (role) {
      case USER_ROLES.TEACHER:
        return [
          { id: 'dashboard', label: 'My Classes & Attendance', icon: LayoutDashboard },
          { id: 'courseMaterials', label: 'Course Materials', icon: Video },
          { id: 'routine', label: 'Timetable Routine', icon: Calendar },
          { id: 'reportCard', label: 'Gradebook & Transcripts', icon: FileText }
        ];
      case USER_ROLES.STUDENT:
        return [
          { id: 'dashboard', label: 'My Learning Schedule', icon: LayoutDashboard },
          { id: 'courseMaterials', label: 'Course Materials', icon: Video },
          { id: 'routine', label: 'Weekly Timetable', icon: Calendar },
          { id: 'reportCard', label: 'My Term Report Card', icon: FileText }
        ];
      case USER_ROLES.PARENT:
        return [
          { id: 'dashboard', label: 'Wards Overview', icon: LayoutDashboard },
          { id: 'courseMaterials', label: 'Course Materials', icon: Video },
          { id: 'finance', label: 'Tuition Fee Payments', icon: CreditCard },
          { id: 'reportCard', label: 'Download Report Card', icon: FileText }
        ];
      case USER_ROLES.ACCOUNTANT:
        return [
          { id: 'dashboard', label: 'Bursar Financial Overview', icon: LayoutDashboard },
          { id: 'finance', label: 'Invoices & Settlements', icon: CreditCard }
        ];
      case USER_ROLES.SUPER_ADMIN:
      default:
        return [
          { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
          { id: 'courseMaterials', label: 'Course Materials', icon: Video },
          { id: 'routine', label: 'Routine Builder', icon: Calendar },
          { id: 'reportCard', label: 'Report Cards', icon: FileText },
          { id: 'finance', label: 'Finance & Billing', icon: CreditCard },
          { id: 'emailTracker', label: 'Email Tracker', icon: Mail },
          { id: 'designSystem', label: 'Design Lab', icon: Palette }
        ];
    }
  };

  const navTabs = getNavTabsForRole(currentRole);

  const roleIcons = {
    [USER_ROLES.SUPER_ADMIN]: Shield,
    [USER_ROLES.TEACHER]: BookOpen,
    [USER_ROLES.STUDENT]: GraduationCap,
    [USER_ROLES.PARENT]: Heart,
    [USER_ROLES.ACCOUNTANT]: Landmark,
    [USER_ROLES.DESIGN_SYSTEM]: Palette
  };

  const RoleIcon = roleIcons[currentRole] || Shield;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
      height: '64px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div 
        className="portal-navbar-inner"
        style={{
          maxWidth: '1600px',
          width: '100%',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        {/* Left: Brand + School Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1rem',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)'
            }}>
              SP
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.15rem',
              letterSpacing: '-0.03em',
              color: '#0f172a'
            }}>
              School<span style={{ color: '#4338ca' }}>Pulse</span>
            </div>
          </div>

          <div className="portal-tenant-indicator" style={{ width: '1px', height: '22px', backgroundColor: '#e2e8f0' }} />

          {/* School Tenant Indicator */}
          <div 
            className="portal-tenant-indicator"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#f8fafc',
              padding: '5px 10px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #e2e8f0',
              fontSize: '0.78rem',
              color: '#334155',
              fontWeight: 600
            }}
          >
            <Building2 size={13} color="#4338ca" />
            <span>{INSTITUTION.name}</span>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'inline-block'
            }} />
          </div>
        </div>

        {/* Center: Clean, Minimal Navigation Tabs */}
        <nav 
          className="portal-nav-tabs"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            overflowX: 'auto',
            flex: 1,
            minWidth: 0
          }}
        >
          {navTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.825rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#4338ca' : '#475569',
                  backgroundColor: isActive ? '#eef2ff' : 'transparent',
                  border: isActive ? '1px solid #c7d2fe' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.color = '#0f172a';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#475569';
                  }
                }}
              >
                <Icon size={15} color={isActive ? '#4338ca' : '#64748b'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Search, Notifications, Role Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Spotlight Search */}
          <button
            className="portal-search-btn"
            onClick={onOpenSearch}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #cbd5e1',
              backgroundColor: '#f8fafc',
              color: '#64748b',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title="Search (Ctrl + K)"
          >
            <Search size={15} color="#4338ca" />
            <span className="portal-search-label" style={{ color: '#475569', fontWeight: 500 }}>Search...</span>
            <kbd className="portal-search-label" style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              padding: '1px 5px',
              fontSize: '0.65rem',
              fontFamily: 'var(--font-mono)',
              color: '#64748b'
            }}>
              Ctrl K
            </kbd>
          </button>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              flexShrink: 0
            }}
            title="Real-Time Notifications"
          >
            <Bell size={16} />
            {notificationCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#e11d48'
              }} />
            )}
          </button>

          {/* Authenticated User Account Menu */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 8px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div className="portal-user-text" style={{ textAlign: 'left', lineHeight: 1.2 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>
                  {user.name}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#4338ca', fontWeight: 600 }}>
                  {currentRole}
                </div>
              </div>
              <ChevronDown size={14} color="#64748b" />
            </button>

            {profileDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '260px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 10px 30px -4px rgba(15, 23, 42, 0.15)',
                  padding: '12px',
                  zIndex: 200,
                  animation: 'fadeIn 0.15s ease'
                }}
              >
                {/* User Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #4338ca' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                      {user.email}
                    </div>
                    <span className="badge badge-primary" style={{ fontSize: '0.62rem', marginTop: '3px' }}>
                      {currentRole}
                    </span>
                  </div>
                </div>

                {/* Session Security Indicator */}
                <div style={{ padding: '8px 0', fontSize: '0.72rem', color: '#64748b' }}>
                  <div><strong>Tenant:</strong> {INSTITUTION.subdomain}</div>
                  <div><strong>Session:</strong> Authenticated (SSL)</div>
                </div>

                {/* Visit Public Website Action */}
                {onNavigateHome && (
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onNavigateHome();
                    }}
                    style={{
                      width: '100%',
                      padding: '7px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#f8fafc',
                      color: '#334155',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      marginBottom: '6px',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eef2ff'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  >
                    <Globe size={14} color="#4338ca" />
                    <span>Public School Website</span>
                  </button>
                )}

                {/* Logout Button */}
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    if (typeof onLogout === 'function') onLogout();
                  }}
                  style={{
                    width: '100%',
                    marginTop: '6px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #fecdd3',
                    backgroundColor: '#fff1f2',
                    color: '#e11d48',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ffe4e6'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff1f2'}
                >
                  <LogOut size={15} /> Sign Out of Portal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
