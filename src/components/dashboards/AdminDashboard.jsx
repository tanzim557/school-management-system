import React, { useState } from 'react';
import {
  Users, GraduationCap, BookOpen, UserCheck, UserX, Settings,
  Plus, Trash2, Edit3, Save, X, CheckCircle2, Clock, AlertTriangle,
  Phone, Mail, Key, Shield, ChevronDown, ChevronUp, RefreshCw,
  FileText, Database, Activity
} from 'lucide-react';
import {
  getAccounts, saveAccounts, getAdmissions, approveAdmissionApplication,
  createTeacherAccount, saveAdmissions
} from '../../data/authManager';

export function AdminDashboard({ currentUser, onTriggerNotification, studentReportCard, onUpdateStudentResults }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [accounts, setAccounts] = useState(() => getAccounts());
  const [admissions, setAdmissions] = useState(() => getAdmissions());
  const [approvedResult, setApprovedResult] = useState(null);

  // Teacher create form
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [teacherForm, setTeacherForm] = useState({
    name: '', subject: 'পদার্থবিজ্ঞান (Physics)', designation: 'সিনিয়র শিক্ষক',
    assignedClass: '১০ম শ্রেণি (বিজ্ঞান)', phone: '', email: '', username: '', password: '123'
  });

  // Edit account state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Result edit state  
  const [editResultStudentId, setEditResultStudentId] = useState(null);
  const [resultForm, setResultForm] = useState({});
  const [resultSuccess, setResultSuccess] = useState(false);

  const reload = () => {
    setAccounts(getAccounts());
    setAdmissions(getAdmissions());
  };

  const teachers = accounts.filter(a => a.role === 'Teacher');
  const students = accounts.filter(a => a.role === 'Student');
  const parents = accounts.filter(a => a.role === 'Parent');
  const pendingAdmissions = admissions.filter(a => a.status === 'Pending');
  const approvedAdmissions = admissions.filter(a => a.status === 'Approved');

  // Approve admission
  const handleApprove = (appId) => {
    const res = approveAdmissionApplication(appId);
    if (res) {
      setApprovedResult(res);
      reload();
      onTriggerNotification && onTriggerNotification({
        id: `adm-${Date.now()}`,
        type: 'marks',
        channel: 'SMS Gateway',
        time: 'এইমাত্র',
        title: 'ভর্তি অনুমোদন সম্পন্ন!',
        message: `${res.studentName}-এর আইডি: ${res.studentId} — এসএমএস পাঠানো হয়েছে ${res.phone}-এ।`
      });
    }
  };

  // Reject admission
  const handleReject = (appId) => {
    const updated = admissions.map(a => a.id === appId ? { ...a, status: 'Rejected' } : a);
    saveAdmissions(updated);
    reload();
  };

  // Delete account
  const handleDeleteAccount = (id) => {
    const updated = accounts.filter(a => a.id !== id);
    saveAccounts(updated);
    reload();
  };

  // Start edit
  const handleStartEdit = (acc) => {
    setEditingId(acc.id);
    setEditForm({ ...acc });
  };

  // Save edit
  const handleSaveEdit = () => {
    const updated = accounts.map(a => a.id === editingId ? { ...editForm } : a);
    saveAccounts(updated);
    setEditingId(null);
    reload();
    onTriggerNotification && onTriggerNotification({
      id: `edit-${Date.now()}`,
      type: 'marks',
      channel: 'Admin Panel',
      time: 'এইমাত্র',
      title: 'অ্যাকাউন্ট আপডেট',
      message: `${editForm.name}-এর তথ্য সফলভাবে আপডেট করা হয়েছে।`
    });
  };

  // Create teacher
  const handleCreateTeacher = (e) => {
    e.preventDefault();
    if (!teacherForm.name || !teacherForm.username) return;
    createTeacherAccount(teacherForm);
    reload();
    setShowTeacherForm(false);
    setTeacherForm({ name: '', subject: 'পদার্থবিজ্ঞান (Physics)', designation: 'সিনিয়র শিক্ষক', assignedClass: '১০ম শ্রেণি (বিজ্ঞান)', phone: '', email: '', username: '', password: '123' });
    onTriggerNotification && onTriggerNotification({
      id: `tea-${Date.now()}`,
      type: 'marks',
      channel: 'Admin Panel',
      time: 'এইমাত্র',
      title: 'নতুন শিক্ষক তৈরি',
      message: `${teacherForm.name} (${teacherForm.username})-এর অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।`
    });
  };

  // Start result edit
  const handleStartResultEdit = () => {
    if (!studentReportCard) return;
    const subjectMap = {};
    (studentReportCard.subjects || []).forEach(s => {
      subjectMap[s.name] = { theoryMark: s.theoryMark, mcqMark: s.mcqMark || '', practicalMark: s.practicalMark || '' };
    });
    setResultForm(subjectMap);
    setEditResultStudentId(studentReportCard.student && studentReportCard.student.studentId ? studentReportCard.student.studentId : 'main');
  };

  // Save result edits
  const handleSaveResult = () => {
    if (!studentReportCard || !onUpdateStudentResults) return;
    const updatedSubjects = studentReportCard.subjects.map(s => {
      const edit = resultForm[s.name];
      if (!edit) return s;
      const theory = parseFloat(edit.theoryMark) || 0;
      const mcq = parseFloat(edit.mcqMark) || 0;
      const practical = parseFloat(edit.practicalMark) || 0;
      const total = theory + mcq + practical;
      let grade = 'F'; let gp = 0;
      if (total >= 80) { grade = 'A+'; gp = 5; }
      else if (total >= 70) { grade = 'A'; gp = 4; }
      else if (total >= 60) { grade = 'A-'; gp = 3.5; }
      else if (total >= 50) { grade = 'B'; gp = 3; }
      else if (total >= 40) { grade = 'C'; gp = 2; }
      else if (total >= 33) { grade = 'D'; gp = 1; }
      return { ...s, theoryMark: theory, mcqMark: mcq || undefined, practicalMark: practical || undefined, totalMark: total, grade, gradePoint: gp };
    });
    const totalGP = updatedSubjects.reduce((sum, s) => sum + (s.gradePoint || 0), 0);
    const avgGPA = (totalGP / updatedSubjects.length).toFixed(2);
    const updatedCard = { ...studentReportCard, subjects: updatedSubjects, summary: { ...studentReportCard.summary, cumulativeGPA: avgGPA } };
    onUpdateStudentResults(updatedCard);
    setEditResultStudentId(null);
    setResultSuccess(true);
    setTimeout(() => setResultSuccess(false), 3000);
  };

  const sections = [
    { id: 'overview', label: 'ওভারভিউ', icon: Activity },
    { id: 'admissions', label: 'ভর্তি আবেদন', icon: FileText, badge: pendingAdmissions.length },
    { id: 'teachers', label: 'শিক্ষক', icon: BookOpen },
    { id: 'students', label: 'শিক্ষার্থী', icon: GraduationCap },
    { id: 'parents', label: 'অভিভাবক', icon: Users },
    { id: 'results', label: 'ফলাফল সম্পাদনা', icon: Edit3 },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #312e81 100%)',
        padding: '20px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(15,23,42,0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(99,102,241,0.4)'
          }}>
            <Shield size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px' }}>
              অ্যাডমিন কন্ট্রোল প্যানেল
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '1px' }}>
              আইডিয়াল স্কুল অ্যান্ড কলেজ — সম্পূর্ণ প্রশাসনিক নিয়ন্ত্রণ
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '8px', padding: '6px 14px',
            fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 600
          }}>
            {currentUser && currentUser.name ? currentUser.name : 'Admin'} (admin)
          </div>
          <button
            onClick={reload}
            style={{
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#e2e8f0',
              display: 'flex', alignItems: 'center'
            }}
            title="ডেটা রিফ্রেশ করুন"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 84px)' }}>
        {/* Sidebar */}
        <div style={{
          width: '220px', flexShrink: 0,
          background: '#ffffff', borderRight: '1px solid #e2e8f0',
          padding: '16px 12px',
          display: 'flex', flexDirection: 'column', gap: '4px'
        }}>
          {sections.map(sec => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  backgroundColor: isActive ? '#eff6ff' : 'transparent',
                  color: isActive ? '#1d4ed8' : '#475569',
                  fontWeight: isActive ? 700 : 500, fontSize: '0.85rem',
                  transition: 'all 0.15s', textAlign: 'left'
                }}
              >
                <Icon size={16} />
                {sec.label}
                {sec.badge > 0 && (
                  <span style={{
                    marginLeft: 'auto', backgroundColor: '#ef4444',
                    color: '#fff', fontSize: '0.65rem', fontWeight: 800,
                    borderRadius: '10px', padding: '1px 6px', minWidth: '18px', textAlign: 'center'
                  }}>
                    {sec.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>

          {/* OVERVIEW */}
          {activeSection === 'overview' && (
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                সিস্টেম ওভারভিউ
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {[
                  { label: 'মোট শিক্ষক', value: teachers.length, color: '#1d4ed8', bg: '#eff6ff', icon: Users },
                  { label: 'মোট শিক্ষার্থী', value: students.length, color: '#059669', bg: '#ecfdf5', icon: GraduationCap },
                  { label: 'অভিভাবক', value: parents.length, color: '#9333ea', bg: '#faf5ff', icon: Users },
                  { label: 'অপেক্ষমাণ আবেদন', value: pendingAdmissions.length, color: '#d97706', bg: '#fffbeb', icon: Clock },
                  { label: 'অনুমোদিত ভর্তি', value: approvedAdmissions.length, color: '#16a34a', bg: '#f0fdf4', icon: CheckCircle2 },
                  { label: 'মোট অ্যাকাউন্ট', value: accounts.length, color: '#0891b2', bg: '#f0f9ff', icon: Key },
                ].map(stat => (
                  <div key={stat.label} style={{ backgroundColor: stat.bg, borderRadius: '12px', padding: '16px', border: `1px solid ${stat.color}25` }}>
                    <div style={{ marginBottom: '8px', color: stat.color }}>{(() => { const Icon = stat.icon; return Icon ? (typeof Icon === 'string' ? Icon : <Icon size={24} />) : null; })()}</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              {pendingAdmissions.length > 0 && (
                <div style={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px', padding: '14px 16px' }}>
                  <div style={{ fontWeight: 700, color: '#c2410c', fontSize: '0.88rem', marginBottom: '8px' }}>
                    {pendingAdmissions.length}টি ভর্তি আবেদন অনুমোদনের অপেক্ষায়
                  </div>
                  {pendingAdmissions.map(a => (
                    <div key={a.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #fed7aa' }}>
                      <span style={{ fontSize: '0.82rem', color: '#431407' }}>{a.studentName} — {a.grade}</span>
                      <button
                        onClick={() => setActiveSection('admissions')}
                        style={{ backgroundColor: '#ea580c', color: '#fff', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        অনুমোদন দিন →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ADMISSIONS */}
          {activeSection === 'admissions' && (
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                ভর্তি আবেদন তালিকা
              </h2>
              {approvedResult && (
                <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: '10px', padding: '14px 16px', marginBottom: '16px' }}>
                  <div style={{ fontWeight: 800, color: '#166534', fontSize: '0.9rem', marginBottom: '6px' }}>ভর্তি অনুমোদন সম্পন্ন!</div>
                  <div style={{ fontSize: '0.82rem', color: '#166534' }}>
                    <strong>শিক্ষার্থী:</strong> {approvedResult.studentName}<br />
                    <strong>আইডি:</strong> {approvedResult.studentId} | <strong>পাসওয়ার্ড:</strong> {approvedResult.password}<br />
                    <strong>SMS পাঠানো হয়েছে:</strong> {approvedResult.phone}
                  </div>
                  <button onClick={() => setApprovedResult(null)} style={{ marginTop: '8px', fontSize: '0.72rem', background: 'none', border: 'none', color: '#166534', cursor: 'pointer', textDecoration: 'underline' }}>বন্ধ করুন</button>
                </div>
              )}
              {admissions.map(adm => (
                <div key={adm.id} style={{
                  backgroundColor: '#fff', borderRadius: '10px',
                  border: `1px solid ${adm.status === 'Pending' ? '#fed7aa' : adm.status === 'Approved' ? '#bbf7d0' : '#fecaca'}`,
                  padding: '14px 16px', marginBottom: '10px',
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{adm.studentName}</div>
                    <div style={{ fontSize: '0.77rem', color: '#64748b', marginTop: '2px' }}>{adm.grade} • {adm.parentName} • {adm.phone}</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>আবেদন: {adm.id} • {adm.appliedDate}</div>
                    {adm.status === 'Approved' && (
                      <div style={{ marginTop: '4px', fontSize: '0.75rem', color: '#15803d', fontWeight: 700 }}>
                        স্টুডেন্ট ID: {adm.generatedId} | পাস: {adm.generatedPassword}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '20px',
                      backgroundColor: adm.status === 'Pending' ? '#fff7ed' : adm.status === 'Approved' ? '#f0fdf4' : '#fff1f2',
                      color: adm.status === 'Pending' ? '#c2410c' : adm.status === 'Approved' ? '#15803d' : '#be123c'
                    }}>
                      {adm.status === 'Pending' ? 'অপেক্ষমাণ' : adm.status === 'Approved' ? 'অনুমোদিত' : 'বাতিল'}
                    </span>
                    {adm.status === 'Pending' && (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => handleApprove(adm.id)} style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 10px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}>
                          অনুমোদন
                        </button>
                        <button onClick={() => handleReject(adm.id)} style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 10px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}>
                          বাতিল
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TEACHERS */}
          {activeSection === 'teachers' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>শিক্ষক তালিকা ({teachers.length} জন)</h2>
                <button
                  onClick={() => setShowTeacherForm(!showTeacherForm)}
                  style={{ backgroundColor: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 14px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus size={14} /> নতুন শিক্ষক তৈরি
                </button>
              </div>
              {showTeacherForm && (
                <form onSubmit={handleCreateTeacher} style={{ backgroundColor: '#fff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                  <div style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '0.9rem', marginBottom: '14px' }}>নতুন শিক্ষক অ্যাকাউন্ট তৈরি</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {[
                      { key: 'name', label: 'পুরো নাম *', placeholder: 'যেমন: ড. করিম স্যার' },
                      { key: 'subject', label: 'বিষয় *', placeholder: 'যেমন: পদার্থবিজ্ঞান' },
                      { key: 'designation', label: 'পদবি', placeholder: 'যেমন: সিনিয়র শিক্ষক' },
                      { key: 'assignedClass', label: 'শ্রেণি', placeholder: 'যেমন: ১০ম (বিজ্ঞান)' },
                      { key: 'phone', label: 'মোবাইল', placeholder: '01711-' },
                      { key: 'email', label: 'ইমেইল', placeholder: 'teacher@idealschool.edu.bd' },
                      { key: 'username', label: 'ইউজারনেম *', placeholder: 'যেমন: karim.physics' },
                      { key: 'password', label: 'পাসওয়ার্ড', placeholder: '123' },
                    ].map(field => (
                      <div key={field.key}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>{field.label}</label>
                        <input
                          type="text" value={teacherForm[field.key]}
                          onChange={e => setTeacherForm(f => ({ ...f, [field.key]: e.target.value }))}
                          placeholder={field.placeholder}
                          className="input-control"
                          style={{ width: '100%', fontSize: '0.82rem', height: '36px' }}
                          required={field.label.includes('*')}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                    <button type="submit" className="btn btn-primary" style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
                      সংরক্ষণ করুন
                    </button>
                    <button type="button" onClick={() => setShowTeacherForm(false)} className="btn btn-secondary" style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
                      বাতিল
                    </button>
                  </div>
                </form>
              )}
              {teachers.map(acc => (
                <AccountCard key={acc.id} acc={acc} editingId={editingId} editForm={editForm} setEditForm={setEditForm} onEdit={handleStartEdit} onSave={handleSaveEdit} onCancel={() => setEditingId(null)} onDelete={handleDeleteAccount} />
              ))}
            </div>
          )}

          {/* STUDENTS */}
          {activeSection === 'students' && (
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                শিক্ষার্থী তালিকা ({students.length} জন)
              </h2>
              {students.map(acc => (
                <AccountCard key={acc.id} acc={acc} editingId={editingId} editForm={editForm} setEditForm={setEditForm} onEdit={handleStartEdit} onSave={handleSaveEdit} onCancel={() => setEditingId(null)} onDelete={handleDeleteAccount} />
              ))}
            </div>
          )}

          {/* PARENTS */}
          {activeSection === 'parents' && (
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                অভিভাবক তালিকা ({parents.length} জন)
              </h2>
              {parents.map(acc => (
                <AccountCard key={acc.id} acc={acc} editingId={editingId} editForm={editForm} setEditForm={setEditForm} onEdit={handleStartEdit} onSave={handleSaveEdit} onCancel={() => setEditingId(null)} onDelete={handleDeleteAccount} />
              ))}
            </div>
          )}

          {/* RESULTS EDITOR */}
          {activeSection === 'results' && (
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>ফলাফল সম্পাদনা</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '20px' }}>
                সম্পাদিত ফলাফল সরাসরি শিক্ষার্থীর পোর্টালে সিঙ্ক হবে।
              </p>
              {resultSuccess && (
                <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', fontWeight: 700, color: '#166534', fontSize: '0.85rem' }}>
                  ফলাফল সফলভাবে আপডেট ও সিঙ্ক করা হয়েছে!
                </div>
              )}
              {studentReportCard ? (
                <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                  <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #4338ca)', padding: '14px 20px', color: '#fff' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                      {studentReportCard.student && studentReportCard.student.name ? studentReportCard.student.name : 'শিক্ষার্থী'}
                    </div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '2px' }}>
                      আইডি: {studentReportCard.student && studentReportCard.student.studentId} •
                      GPA: {studentReportCard.summary && studentReportCard.summary.cumulativeGPA}
                    </div>
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    {editResultStudentId ? (
                      <>
                        <div style={{ overflowX: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
                            <thead>
                              <tr style={{ backgroundColor: '#f8fafc' }}>
                                {['বিষয়', 'লিখিত', 'MCQ', 'ব্যবহারিক', 'মোট', 'গ্রেড'].map(h => (
                                  <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 700, color: '#334155', fontSize: '0.78rem', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {(studentReportCard.subjects || []).map((s, idx) => {
                                const f = resultForm[s.name] || {};
                                const theory = parseFloat(f.theoryMark) || 0;
                                const mcq = parseFloat(f.mcqMark) || 0;
                                const practical = parseFloat(f.practicalMark) || 0;
                                const total = theory + mcq + practical;
                                let grade = 'F';
                                if (total >= 80) grade = 'A+';
                                else if (total >= 70) grade = 'A';
                                else if (total >= 60) grade = 'A-';
                                else if (total >= 50) grade = 'B';
                                else if (total >= 40) grade = 'C';
                                else if (total >= 33) grade = 'D';
                                return (
                                  <tr key={s.name} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                                    <td style={{ padding: '8px 10px', fontWeight: 600, color: '#1e293b', whiteSpace: 'nowrap' }}>{s.name}</td>
                                    {['theoryMark', 'mcqMark', 'practicalMark'].map(key => (
                                      <td key={key} style={{ padding: '4px 6px' }}>
                                        <input
                                          type="number" min="0" max="100"
                                          value={f[key] !== undefined ? f[key] : ''}
                                          onChange={e => setResultForm(prev => ({ ...prev, [s.name]: { ...prev[s.name], [key]: e.target.value } }))}
                                          style={{ width: '64px', padding: '4px 6px', fontSize: '0.82rem', border: '1px solid #cbd5e1', borderRadius: '6px', textAlign: 'center', fontWeight: 700 }}
                                        />
                                      </td>
                                    ))}
                                    <td style={{ padding: '8px 10px', fontWeight: 800, color: '#1e40af' }}>{total}</td>
                                    <td style={{ padding: '8px 10px' }}>
                                      <span style={{
                                        padding: '2px 8px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 800,
                                        backgroundColor: grade === 'A+' ? '#dcfce7' : grade === 'A' ? '#d1fae5' : grade === 'F' ? '#fee2e2' : '#fff7ed',
                                        color: grade === 'A+' ? '#15803d' : grade === 'A' ? '#047857' : grade === 'F' ? '#dc2626' : '#b45309'
                                      }}>{grade}</span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                          <button
                            onClick={handleSaveResult}
                            style={{ backgroundColor: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 20px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            ফলাফল সেভ ও সিঙ্ক করুন
                          </button>
                          <button
                            onClick={() => setEditResultStudentId(null)}
                            style={{ backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '9px 20px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            বাতিল
                          </button>
                        </div>
                      </>
                    ) : (
                      <div style={{ padding: '12px 0' }}>
                        <button
                          onClick={handleStartResultEdit}
                          style={{ backgroundColor: '#4338ca', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
                        >
                          ফলাফল সম্পাদনা শুরু করুন
                        </button>
                        <div style={{ marginTop: '16px' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
                            <thead>
                              <tr style={{ backgroundColor: '#f8fafc' }}>
                                {['বিষয়', 'মোট নম্বর', 'গ্রেড', 'গ্রেড পয়েন্ট'].map(h => (
                                  <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 700, color: '#334155', fontSize: '0.78rem', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {(studentReportCard.subjects || []).map((s, idx) => (
                                <tr key={s.name} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                                  <td style={{ padding: '8px 10px', fontWeight: 600, color: '#1e293b' }}>{s.name}</td>
                                  <td style={{ padding: '8px 10px', fontWeight: 700 }}>{s.totalMark}</td>
                                  <td style={{ padding: '8px 10px' }}>
                                    <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 800, backgroundColor: s.grade === 'A+' ? '#dcfce7' : '#fffbeb', color: s.grade === 'A+' ? '#15803d' : '#92400e' }}>
                                      {s.grade}
                                    </span>
                                  </td>
                                  <td style={{ padding: '8px 10px', fontWeight: 700, color: '#1d4ed8' }}>{s.gradePoint}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>ফলাফল ডেটা পাওয়া যায়নি।</div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Reusable Account Card Component
function AccountCard({ acc, editingId, editForm, setEditForm, onEdit, onSave, onCancel, onDelete }) {
  const isEditing = editingId === acc.id;
  const [expanded, setExpanded] = useState(false);

  const editFields = [
    { key: 'name', label: 'নাম' },
    { key: 'username', label: 'ইউজারনেম' },
    { key: 'password', label: 'পাসওয়ার্ড' },
    { key: 'phone', label: 'মোবাইল' },
    { key: 'email', label: 'ইমেইল' },
    ...(acc.role === 'Teacher' ? [{ key: 'subject', label: 'বিষয়' }, { key: 'designation', label: 'পদবি' }] : []),
    ...(acc.role === 'Student' ? [{ key: 'class', label: 'শ্রেণি' }] : []),
  ];

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '10px', overflow: 'hidden' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', cursor: 'pointer' }}
        onClick={() => setExpanded(!expanded)}
      >
        <img
          src={acc.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50'}
          alt={acc.name}
          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50'; }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{acc.name}</div>
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '1px' }}>
            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#1d4ed8' }}>{acc.username}</span>
            {acc.subject ? ` • ${acc.subject}` : ''}
            {acc.studentId ? ` • ID: ${acc.studentId}` : ''}
            {acc.phone ? ` • ${acc.phone}` : ''}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={e => { e.stopPropagation(); onEdit(acc); setExpanded(true); }}
            style={{ background: '#eff6ff', border: 'none', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', color: '#1d4ed8' }}
            title="সম্পাদনা"
          >
            <Edit3 size={13} />
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              if (window.confirm(acc.name + '-এর অ্যাকাউন্ট মুছে ফেলবেন?')) onDelete(acc.id);
            }}
            style={{ background: '#fff1f2', border: 'none', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', color: '#dc2626' }}
            title="মুছুন"
          >
            <Trash2 size={13} />
          </button>
          {expanded ? <ChevronUp size={14} color="#94a3b8" /> : <ChevronDown size={14} color="#94a3b8" />}
        </div>
      </div>

      {expanded && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9', backgroundColor: '#fafafa' }}>
          {isEditing ? (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                {editFields.map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '3px' }}>{f.label}</label>
                    <input
                      type="text"
                      value={editForm[f.key] || ''}
                      onChange={e => setEditForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      className="input-control"
                      style={{ width: '100%', fontSize: '0.8rem', height: '32px' }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={onSave} className="btn btn-primary" style={{ fontSize: '0.78rem', padding: '6px 14px' }}>
                  <Save size={12} style={{ display: 'inline', marginRight: '4px' }} /> সেভ
                </button>
                <button onClick={onCancel} className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '6px 14px' }}>বাতিল</button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.78rem' }}>
              {[
                ['পাসওয়ার্ড', acc.password],
                acc.email ? ['ইমেইল', acc.email] : null,
                acc.phone ? ['মোবাইল', acc.phone] : null,
                acc.subject ? ['বিষয়', acc.subject] : null,
                acc.designation ? ['পদবি', acc.designation] : null,
                acc.assignedClass ? ['শ্রেণি দায়িত্ব', acc.assignedClass] : null,
                acc.studentId ? ['স্টুডেন্ট আইডি', acc.studentId] : null,
                acc.class ? ['শ্রেণি', acc.class] : null,
                acc.studentLinked ? ['সন্তান', acc.studentLinked] : null,
              ].filter(Boolean).map(([label, val]) => (
                <div key={label}>
                  <span style={{ color: '#94a3b8', fontWeight: 600 }}>{label}: </span>
                  <span style={{ color: '#1e293b', fontWeight: 700, fontFamily: label === 'পাসওয়ার্ড' ? 'monospace' : 'inherit' }}>{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
