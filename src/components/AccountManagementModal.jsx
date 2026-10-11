import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  CheckCircle2, 
  Clock, 
  Send, 
  Sparkles, 
  Key, 
  BookOpen, 
  GraduationCap, 
  Heart, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Copy, 
  Check, 
  X, 
  AlertCircle,
  ExternalLink,
  Search,
  RefreshCw,
  Smartphone
} from 'lucide-react';
import { 
  getAccounts, 
  getAdmissions, 
  approveAdmissionApplication, 
  createTeacherAccount, 
  createParentAccount, 
  resetAuthToDefaults 
} from '../data/authManager';

export function AccountManagementModal({ isOpen, onClose, onQuickLogin }) {
  const [activeTab, setActiveTab] = useState('admissions'); // 'admissions' | 'teacher' | 'parent' | 'directory'
  const [admissions, setAdmissions] = useState(getAdmissions);
  const [accounts, setAccounts] = useState(getAccounts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // 'All' | 'Pending' | 'Approved'

  // SMS Modal / Alert State after Approval
  const [approvedResult, setApprovedResult] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  // New Teacher Form State
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    subject: 'পদার্থবিজ্ঞান (Physics)',
    designation: 'সিনিয়র শিক্ষক',
    assignedClass: '১০ম শ্রেণি (বিজ্ঞান বিভাগ - দিবা শাখা)',
    phone: '01712-',
    email: '',
    username: '',
    password: '123'
  });
  const [teacherSuccess, setTeacherSuccess] = useState(false);

  // New Parent Form State
  const [parentForm, setParentForm] = useState({
    name: '',
    studentLinked: 'তানভীর আহমেদ (ISC-2026-1014)',
    phone: '01711-',
    email: '',
    username: '',
    password: '123'
  });
  const [parentSuccess, setParentSuccess] = useState(false);

  if (!isOpen) return null;

  // Refresh lists
  const reloadData = () => {
    setAdmissions(getAdmissions());
    setAccounts(getAccounts());
  };

  // 1. Approve Admission & Trigger SMS
  const handleApprove = (appId) => {
    const res = approveAdmissionApplication(appId);
    if (res) {
      setApprovedResult(res);
      reloadData();
    }
  };

  // 2. Create Teacher Account
  const handleCreateTeacher = (e) => {
    e.preventDefault();
    if (!teacherForm.name || !teacherForm.subject || !teacherForm.username) return;

    createTeacherAccount(teacherForm);
    reloadData();
    setTeacherSuccess(true);
    setTimeout(() => {
      setTeacherSuccess(false);
      setTeacherForm({
        name: '',
        subject: 'পদার্থবিজ্ঞান (Physics)',
        designation: 'সিনিয়র শিক্ষক',
        assignedClass: '১০ম শ্রেণি (বিজ্ঞান বিভাগ - দিবা শাখা)',
        phone: '01712-',
        email: '',
        username: '',
        password: '123'
      });
      setActiveTab('directory');
    }, 1200);
  };

  // 3. Create Parent Account
  const handleCreateParent = (e) => {
    e.preventDefault();
    if (!parentForm.name || !parentForm.username) return;

    createParentAccount(parentForm);
    reloadData();
    setParentSuccess(true);
    setTimeout(() => {
      setParentSuccess(false);
      setParentForm({
        name: '',
        studentLinked: 'তানভীর আহমেদ (ISC-2026-1014)',
        phone: '01711-',
        email: '',
        username: '',
        password: '123'
      });
      setActiveTab('directory');
    }, 1200);
  };

  // Copy helper
  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 1800);
  };

  // Filtered Admissions
  const filteredAdmissions = admissions.filter(app => {
    const matchesFilter = filterStatus === 'All' ? true : app.status === filterStatus;
    const matchesSearch = !searchQuery ? true : 
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const pendingCount = admissions.filter(a => a.status === 'Pending').length;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="animate-fade-in"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '920px',
          width: '100%',
          maxHeight: '90vh',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.35)',
          border: '1px solid #cbd5e1',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users size={22} color="#60a5fa" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>
                আইডি ও ভর্তি অনুমোদন ম্যানেজমেন্ট হাব
              </h2>
              {pendingCount > 0 && (
                <span style={{ 
                  backgroundColor: '#f43f5e', 
                  color: '#ffffff', 
                  fontSize: '0.72rem', 
                  fontWeight: 800, 
                  padding: '2px 8px', 
                  borderRadius: '12px' 
                }}>
                  {pendingCount} টি অপেক্ষমাণ আবেদন
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.8rem', color: '#93c5fd', margin: '4px 0 0' }}>
              শিক্ষক আইডি তৈরি (বিষয়ভিত্তিক), অনলাইন ভর্তি আবেদন অনুমোদন (SMS সিঙ্ক) ও ইউজার লগইন পাসওয়ার্ড ব্যবস্থাপনা।
            </p>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation Ribbon */}
        <div style={{
          display: 'flex',
          gap: '6px',
          padding: '12px 24px',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setActiveTab('admissions')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: activeTab === 'admissions' ? '2px solid #1e3a8a' : '1px solid #cbd5e1',
              backgroundColor: activeTab === 'admissions' ? '#eff6ff' : '#ffffff',
              color: activeTab === 'admissions' ? '#1e3a8a' : '#475569'
            }}
          >
            <GraduationCap size={16} />
            <span>১. ভর্তি আবেদন ও অনুমোদন</span>
            {pendingCount > 0 && (
              <span style={{ backgroundColor: '#ef4444', color: '#fff', fontSize: '0.65rem', padding: '1px 6px', borderRadius: '10px' }}>
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('teacher')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: activeTab === 'teacher' ? '2px solid #1e3a8a' : '1px solid #cbd5e1',
              backgroundColor: activeTab === 'teacher' ? '#eff6ff' : '#ffffff',
              color: activeTab === 'teacher' ? '#1e3a8a' : '#475569'
            }}
          >
            <BookOpen size={16} />
            <span>২. শিক্ষক আইডি তৈরি (বিষয়ভিত্তিক)</span>
          </button>

          <button
            onClick={() => setActiveTab('parent')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: activeTab === 'parent' ? '2px solid #1e3a8a' : '1px solid #cbd5e1',
              backgroundColor: activeTab === 'parent' ? '#eff6ff' : '#ffffff',
              color: activeTab === 'parent' ? '#1e3a8a' : '#475569'
            }}
          >
            <Heart size={16} />
            <span>৩. অভিভাবক আইডি তৈরি</span>
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: activeTab === 'directory' ? '2px solid #1e3a8a' : '1px solid #cbd5e1',
              backgroundColor: activeTab === 'directory' ? '#eff6ff' : '#ffffff',
              color: activeTab === 'directory' ? '#1e3a8a' : '#475569'
            }}
          >
            <Key size={16} />
            <span>৪. সক্রিয় ইউজার ও পাসওয়ার্ড তালিকা</span>
          </button>
        </div>

        {/* Modal Body Container */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          
          {/* TAB 1: Online Admissions & Instant SMS Approval */}
          {activeTab === 'admissions' && (
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    অনলাইন ভর্তি আবেদন অনুমোদন ডেস্ক
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>
                    অধ্যক্ষ বা অ্যাডমিন আবেদন অনুমোদন (Approve) করলে শিক্ষার্থীর আইডি ও পাসওয়ার্ড স্বয়ংক্রিয়ভাবে তৈরি হয়ে অভিভাবকের মোবাইলে এসএমএস যাবে।
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '4px', backgroundColor: '#f1f5f9', padding: '3px', borderRadius: '6px' }}>
                    {['All', 'Pending', 'Approved'].map(st => (
                      <button
                        key={st}
                        onClick={() => setFilterStatus(st)}
                        style={{
                          border: 'none',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          backgroundColor: filterStatus === st ? '#1e3a8a' : 'transparent',
                          color: filterStatus === st ? '#ffffff' : '#64748b'
                        }}
                      >
                        {st === 'All' ? 'সকল' : st === 'Pending' ? `অপেক্ষমাণ (${pendingCount})` : 'অনুমোদিত'}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => { resetAuthToDefaults(); reloadData(); }}
                    style={{ background: 'none', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '5px 10px', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#475569' }}
                    title="আগের ডিফল্ট টেস্ট ডাটা ফিরিয়ে আনুন"
                  >
                    <RefreshCw size={12} /> টেস্ট ডাটা রিসেট
                  </button>
                </div>
              </div>

              {/* Admissions Table */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #cbd5e1', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '10px 14px' }}>ট্র্যাকিং নং</th>
                      <th style={{ padding: '10px 14px' }}>শিক্ষার্থীর নাম ও কাঙ্ক্ষিত শ্রেণি</th>
                      <th style={{ padding: '10px 14px' }}>অভিভাবক ও মোবাইল</th>
                      <th style={{ padding: '10px 14px' }}>আবেদনের তারিখ</th>
                      <th style={{ padding: '10px 14px' }}>স্ট্যাটাস</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right' }}>অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdmissions.map(app => {
                      const isPending = app.status === 'Pending';
                      return (
                        <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#1e3a8a' }}>
                            {app.id}
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            <div style={{ fontWeight: 800, color: '#0f172a' }}>{app.studentName}</div>
                            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{app.grade}</div>
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            <div style={{ fontWeight: 600, color: '#334155' }}>{app.parentName}</div>
                            <div style={{ fontSize: '0.74rem', color: '#2563eb', fontFamily: 'monospace' }}>
                              {app.phone}
                            </div>
                          </td>
                          <td style={{ padding: '12px 14px', color: '#64748b' }}>
                            {app.appliedDate}
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            {isPending ? (
                              <span style={{ backgroundColor: '#fffbeb', color: '#d97706', border: '1px solid #fde68a', padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <Clock size={11} /> অপেক্ষমাণ
                              </span>
                            ) : (
                              <span style={{ backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <CheckCircle2 size={11} /> অনুমোদিত (SMS প্রেরিত)
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                            {isPending ? (
                              <button
                                onClick={() => handleApprove(app.id)}
                                className="btn btn-primary"
                                style={{
                                  padding: '6px 12px',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  gap: '4px',
                                  backgroundColor: '#059669',
                                  backgroundImage: 'none'
                                }}
                              >
                                <CheckCircle2 size={13} /> অনুমোদন ও আইডি তৈরি
                              </button>
                            ) : (
                              <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <span style={{ fontSize: '0.78rem', fontWeight: 800, fontFamily: 'monospace', color: '#1e3a8a' }}>
                                  ID: {app.generatedId}
                                </span>
                                <span style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 600 }}>
                                  লগইন সক্রিয়
                                </span>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Create Teacher Account (with Subject) */}
          {activeTab === 'teacher' && (
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  নতুন শিক্ষক আইডি তৈরি (বিষয়ভিত্তিক শিক্ষক পদায়ন)
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>
                  শিক্ষকের নির্দিষ্ট বিষয় (Subject), পদবি এবং দায়িত্বপ্রাপ্ত শ্রেণি নির্ধারণ করে দিন।
                </p>
              </div>

              {teacherSuccess && (
                <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', padding: '12px', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <CheckCircle2 size={18} color="#059669" />
                  <span>শিক্ষক আইডি সফলভাবে তৈরি হয়েছে! তিনি ইউজারনেম ও পাসওয়ার্ড দিয়ে লগইন করতে পারবেন।</span>
                </div>
              )}

              <form onSubmit={handleCreateTeacher} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      শিক্ষকের পূর্ণ নাম *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="যেমন: ড. সাইফুল ইসলাম"
                      value={teacherForm.name}
                      onChange={e => setTeacherForm({ ...teacherForm, name: e.target.value })}
                      className="input-control"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      কোন বিষয়ের শিক্ষক (Teaching Subject) *
                    </label>
                    <select
                      value={teacherForm.subject}
                      onChange={e => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                      className="input-control"
                      style={{ backgroundColor: '#ffffff' }}
                    >
                      <option value="পদার্থবিজ্ঞান (Physics)">পদার্থবিজ্ঞান (Physics)</option>
                      <option value="উচ্চতর গণিত ও জ্যামিতি (Higher Mathematics)">উচ্চতর গণিত ও জ্যামিতি (Higher Math)</option>
                      <option value="রসায়ন বিজ্ঞান (Chemistry)">রসায়ন বিজ্ঞান (Chemistry)</option>
                      <option value="জীববিজ্ঞান (Biology)">জীববিজ্ঞান (Biology)</option>
                      <option value="তথ্য ও যোগাযোগ প্রযুক্তি (ICT)">তথ্য ও যোগাযোগ প্রযুক্তি (ICT)</option>
                      <option value="বাংলা ১ম ও ২য় পত্র (Bangla)">বাংলা ১ম ও ২য় পত্র (Bangla)</option>
                      <option value="ইংরেজি ১ম ও ২য় পত্র (English)">ইংরেজি ১ম ও ২য় পত্র (English)</option>
                      <option value="বাংলাদেশ ও বিশ্বপরিচয়">বাংলাদেশ ও বিশ্বপরিচয়</option>
                      <option value="ইসলাম ও নৈতিক শিক্ষা">ইসলাম ও নৈতিক শিক্ষা</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      শিক্ষক পদবি (Designation) *
                    </label>
                    <select
                      value={teacherForm.designation}
                      onChange={e => setTeacherForm({ ...teacherForm, designation: e.target.value })}
                      className="input-control"
                      style={{ backgroundColor: '#ffffff' }}
                    >
                      <option value="সিনিয়র শিক্ষক">সিনিয়র শিক্ষক (Senior Teacher)</option>
                      <option value="সহকারী শিক্ষক">সহকারী শিক্ষক (Assistant Teacher)</option>
                      <option value="সহকারী প্রধান শিক্ষক">সহকারী প্রধান শিক্ষক</option>
                      <option value="প্রভাষক">প্রভাষক (Lecturer - কলেজ শাখা)</option>
                      <option value="বিভাগীয় প্রধান">বিভাগীয় প্রধান (Head of Department)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      দায়িত্বপ্রাপ্ত শ্রেণি ও শাখা *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="যেমন: ১০ম শ্রেণি (বিজ্ঞান বিভাগ - দিবা শাখা)"
                      value={teacherForm.assignedClass}
                      onChange={e => setTeacherForm({ ...teacherForm, assignedClass: e.target.value })}
                      className="input-control"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      মোবাইল নম্বর *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="01712-XXXXXX"
                      value={teacherForm.phone}
                      onChange={e => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                      className="input-control"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      অফিসিয়াল ইমেইল
                    </label>
                    <input 
                      type="email"
                      placeholder="saiful.physics@idealschool.edu.bd"
                      value={teacherForm.email}
                      onChange={e => setTeacherForm({ ...teacherForm, email: e.target.value })}
                      className="input-control"
                    />
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#f1f5f9',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1'
                }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '10px' }}>
                    শিক্ষকের লগইন ক্রেডেনশিয়াল নির্ধারণ:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                        ইউজারনেম (Login Username) *
                      </label>
                      <input 
                        type="text"
                        required
                        placeholder="যেমন: saiful.physics"
                        value={teacherForm.username}
                        onChange={e => setTeacherForm({ ...teacherForm, username: e.target.value })}
                        className="input-control"
                        style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                        লগইন পাসওয়ার্ড *
                      </label>
                      <input 
                        type="text"
                        required
                        placeholder="পাসওয়ার্ড দিন"
                        value={teacherForm.password}
                        onChange={e => setTeacherForm({ ...teacherForm, password: e.target.value })}
                        className="input-control"
                        style={{ fontWeight: 700 }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '12px', fontSize: '0.92rem', fontWeight: 700, marginTop: '8px', gap: '8px' }}
                >
                  <UserPlus size={16} /> শিক্ষক আইডি তৈরি ও সক্রিয় করুন
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: Create Parent Account */}
          {activeTab === 'parent' && (
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  নতুন অভিভাবক আইডি তৈরি
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>
                  অভিভাবকের একাউন্ট তৈরি করে শিক্ষার্থীর সাথে লিংক করে দিন।
                </p>
              </div>

              {parentSuccess && (
                <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', padding: '12px', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <CheckCircle2 size={18} color="#059669" />
                  <span>অভিভাবক আইডি সফলভাবে তৈরি হয়েছে!</span>
                </div>
              )}

              <form onSubmit={handleCreateParent} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    অভিভাবকের পূর্ণ নাম *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="যেমন: জনাব মোঃ রিয়াজ উদ্দিন"
                    value={parentForm.name}
                    onChange={e => setParentForm({ ...parentForm, name: e.target.value })}
                    className="input-control"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      সংযুক্ত শিক্ষার্থী ও আইডি *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="যেমন: তানভীর আহমেদ (ISC-2026-1014)"
                      value={parentForm.studentLinked}
                      onChange={e => setParentForm({ ...parentForm, studentLinked: e.target.value })}
                      className="input-control"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      মোবাইল নম্বর *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="01711-XXXXXX"
                      value={parentForm.phone}
                      onChange={e => setParentForm({ ...parentForm, phone: e.target.value })}
                      className="input-control"
                    />
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#f1f5f9',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1'
                }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '10px' }}>
                    অভিভাবক লগইন ক্রেডেনশিয়াল:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                        ইউজারনেম / আইডি *
                      </label>
                      <input 
                        type="text"
                        required
                        placeholder="যেমন: riaz.parent"
                        value={parentForm.username}
                        onChange={e => setParentForm({ ...parentForm, username: e.target.value })}
                        className="input-control"
                        style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                        লগইন পাসওয়ার্ড *
                      </label>
                      <input 
                        type="text"
                        required
                        placeholder="পাসওয়ার্ড দিন"
                        value={parentForm.password}
                        onChange={e => setParentForm({ ...parentForm, password: e.target.value })}
                        className="input-control"
                        style={{ fontWeight: 700 }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '12px', fontSize: '0.92rem', fontWeight: 700, marginTop: '8px', gap: '8px' }}
                >
                  <UserPlus size={16} /> অভিভাবক আইডি তৈরি করুন
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: Active Users & Credentials Directory */}
          {activeTab === 'directory' && (
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    সক্রিয় আইডি ও লগইন ক্রেডেনশিয়াল ডিরেক্টরি
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>
                    এখানে তৈরি হওয়া সমস্ত শিক্ষক, অনুমোদিত শিক্ষার্থী ও অভিভাবকদের লগইন তথ্য রয়েছে।
                  </p>
                </div>

                <div style={{ position: 'relative', minWidth: '220px' }}>
                  <input 
                    type="text"
                    placeholder="নাম বা আইডি খুঁজুন..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="input-control"
                    style={{ paddingLeft: '32px', fontSize: '0.8rem' }}
                  />
                  <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #cbd5e1', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '10px 14px' }}>ব্যবহারকারী ও পদবি</th>
                      <th style={{ padding: '10px 14px' }}>রোল (Role)</th>
                      <th style={{ padding: '10px 14px' }}>বিষয় / শ্রেণি</th>
                      <th style={{ padding: '10px 14px' }}>ইউজারনেম (Login ID)</th>
                      <th style={{ padding: '10px 14px' }}>পাসওয়ার্ড</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right' }}>লগইন অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.filter(a => !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.username.toLowerCase().includes(searchQuery.toLowerCase())).map(acc => {
                      return (
                        <tr key={acc.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '12px 14px' }}>
                            <div style={{ fontWeight: 800, color: '#0f172a' }}>{acc.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                              {acc.designation || (acc.role === 'Student' ? `রোল: ${acc.roll}` : 'অভিভাবক')}
                            </div>
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            {acc.role === 'Teacher' && (
                              <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                                শিক্ষক/অধ্যক্ষ
                              </span>
                            )}
                            {acc.role === 'Student' && (
                              <span style={{ backgroundColor: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                                শিক্ষার্থী
                              </span>
                            )}
                            {acc.role === 'Parent' && (
                              <span style={{ backgroundColor: '#fff1f2', color: '#be123c', border: '1px solid #fecdd3', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                                অভিভাবক
                              </span>
                            )}
                            {acc.role === 'Super Admin' && (
                              <span style={{ backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                                সভাপতি
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            {acc.role === 'Teacher' && (
                              <strong style={{ color: '#1e3a8a' }}>{acc.subject}</strong>
                            )}
                            {acc.role === 'Student' && (
                              <span style={{ color: '#475569' }}>{acc.class}</span>
                            )}
                            {acc.role === 'Parent' && (
                              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{acc.studentLinked}</span>
                            )}
                            {acc.role === 'Super Admin' && (
                              <span style={{ color: '#64748b' }}>প্রশাসন</span>
                            )}
                          </td>
                          <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0f172a' }}>
                            {acc.username}
                          </td>
                          <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#64748b' }}>
                            {acc.password}
                          </td>
                          <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                            <button
                              onClick={() => {
                                if (onQuickLogin) {
                                  onQuickLogin(acc);
                                } else {
                                  onClose();
                                  window.location.hash = '#login';
                                }
                              }}
                              style={{
                                border: '1px solid #cbd5e1',
                                backgroundColor: '#ffffff',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: '#1e3a8a',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <span>লগইন টেস্ট</span> <ExternalLink size={12} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* 5. Realistic Simulated SMS Dispatch Alert Modal */}
        {approvedResult && (
          <div 
            className="modal-overlay" 
            onClick={() => setApprovedResult(null)}
            style={{ zIndex: 1200 }}
          >
            <div 
              className="animate-fade-in"
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '480px',
                width: '100%',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
                border: '2px solid #10b981'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#ecfdf5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}>
                  <Smartphone size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                  ভর্তি অনুমোদন ও এসএমএস প্রেরণ সম্পন্ন!
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                  টেলিটক / বিটিসিএল বাল্ক এসএমএস গেটওয়ে দিয়ে শিক্ষার্থীর নম্বরে আইডি ও পাসওয়ার্ড পাঠানো হয়েছে।
                </p>
              </div>

              {/* SMS Bubble */}
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px',
                fontSize: '0.82rem',
                lineHeight: 1.6,
                color: '#1e293b',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '8px', fontSize: '0.72rem', color: '#64748b' }}>
                  <span>প্রাপক: <strong>{approvedResult.phone}</strong> ({approvedResult.parentName})</span>
                  <span>আজ {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div style={{ fontWeight: 500 }}>
                  {approvedResult.smsMessage}
                </div>
              </div>

              {/* Quick Credential Copy Box */}
              <div style={{
                backgroundColor: '#eff6ff',
                borderRadius: '8px',
                padding: '12px',
                border: '1px solid #bfdbfe',
                marginBottom: '18px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                fontSize: '0.8rem'
              }}>
                <div>
                  <span style={{ color: '#1e40af', fontSize: '0.72rem', fontWeight: 600 }}>স্টুডেন্ট আইডি:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <strong style={{ fontFamily: 'monospace', color: '#0f172a' }}>{approvedResult.studentId}</strong>
                    <button 
                      onClick={() => handleCopy(approvedResult.studentId, 'id')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#2563eb' }}
                    >
                      {copiedField === 'id' ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>

                <div>
                  <span style={{ color: '#1e40af', fontSize: '0.72rem', fontWeight: 600 }}>পাসওয়ার্ড:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <strong style={{ fontFamily: 'monospace', color: '#0f172a' }}>{approvedResult.password}</strong>
                    <button 
                      onClick={() => handleCopy(approvedResult.password, 'pass')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#2563eb' }}
                    >
                      {copiedField === 'pass' ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setApprovedResult(null)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  ঠিক আছে
                </button>
                <button
                  onClick={() => {
                    setApprovedResult(null);
                    onClose();
                    window.location.hash = '#login';
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1, fontWeight: 700, gap: '6px' }}
                >
                  লগইন পেজে যান <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
