import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  Sparkles, 
  Save, 
  Calendar, 
  Send,
  BookOpen,
  ArrowRight,
  FileEdit,
  Edit3,
  X,
  Check,
  FileCheck,
  AlertCircle,
  FileText
} from 'lucide-react';
import { GRADEBOOK_STUDENTS, CURRENT_USERS } from '../../data/mockData';

export function TeacherDashboard({ 
  onTriggerNotification, 
  onNavigateRoutine, 
  studentReportCard, 
  onUpdateStudentResults,
  currentUser
}) {
  const teacher = (currentUser && currentUser.role === 'Teacher') ? currentUser : CURRENT_USERS["Teacher"];
  const [students, setStudents] = useState(GRADEBOOK_STUDENTS);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingScores, setEditingScores] = useState([]);
  const [editingRemarks, setEditingRemarks] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [attendance, setAttendance] = useState({
    "std-1": "Present",
    "std-2": "Present",
    "std-3": "Present",
    "std-4": "Late",
    "std-5": "Absent"
  });

  const handleSetAttendance = (studentId, status, studentName) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
    
    // Trigger Real-Time Sync Event
    if (status === 'Absent') {
      onTriggerNotification({
        id: `att-${Date.now()}`,
        type: 'attendance',
        channel: 'এসএমএস ও পুশ',
        time: 'এইমাত্র',
        title: `অনুপস্থিতি নোটিফিকেশন: ${studentName}`,
        message: `১ম পিরিয়ড অনুপস্থিত। অভিভাবকের মোবাইলে তাৎক্ষণিক এসএমএস ও পুশ অ্যালার্ট পাঠানো হয়েছে।`
      });
    } else {
      onTriggerNotification({
        id: `att-${Date.now()}`,
        type: 'attendance',
        channel: 'হাজিরা খাতা সিঙ্ক',
        time: 'এইমাত্র',
        title: `হাজিরা নিশ্চিত: ${studentName}`,
        message: `শ্রেণি হাজিরা খাতায় শিক্ষার্থীর উপস্থিতি (${status === 'Present' ? 'উপস্থিত' : status === 'Late' ? 'বিলম্ব' : 'অনুপস্থিত'}) সফলভাবে সংরক্ষিত হয়েছে।`
      });
    }
  };

  // Authentic Bangladesh GPA (Scale of 5.00) Computation
  const calculateGPA = (marksObj) => {
    const scores = Object.values(marksObj)
      .map(v => Number(v))
      .filter(v => !isNaN(v));
    if (scores.length === 0) return '5.00';

    const gradePoints = scores.map(score => {
      if (score >= 80) return 5.00; // A+
      if (score >= 70) return 4.00; // A
      if (score >= 60) return 3.50; // A-
      if (score >= 50) return 3.00; // B
      if (score >= 40) return 2.00; // C
      if (score >= 33) return 1.00; // D
      return 0.00; // F
    });

    if (gradePoints.includes(0.00)) {
      return '0.00 (F)';
    }

    const avg = gradePoints.reduce((acc, gp) => acc + gp, 0) / gradePoints.length;
    return avg.toFixed(2);
  };

  const getSubjectGradeAndGP = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return { grade: 'A+', gpa: '5.00', color: '#10b981', bg: '#ecfdf5' };
    if (percentage >= 70) return { grade: 'A', gpa: '4.00', color: '#2563eb', bg: '#eff6ff' };
    if (percentage >= 60) return { grade: 'A-', gpa: '3.50', color: '#0284c7', bg: '#f0f9ff' };
    if (percentage >= 50) return { grade: 'B', gpa: '3.00', color: '#d97706', bg: '#fffbeb' };
    if (percentage >= 40) return { grade: 'C', gpa: '2.00', color: '#ea580c', bg: '#fff7ed' };
    if (percentage >= 33) return { grade: 'D', gpa: '1.00', color: '#64748b', bg: '#f8fafc' };
    return { grade: 'F', gpa: '0.00', color: '#e11d48', bg: '#fff1f2' };
  };

  const handleOpenResultEditor = (student) => {
    setEditingStudent(student);
    setSaveSuccess(false);

    if (student.id === 'std-1' && studentReportCard && studentReportCard.scores) {
      setEditingScores(JSON.parse(JSON.stringify(studentReportCard.scores)));
      setEditingRemarks(studentReportCard.principalRemarks || '');
    } else {
      const gpaFactor = parseFloat(student.gpa) / 5.0 || 0.95;
      const baseScores = [
        { subject: "বাংলা (১ম ও ২য় পত্র)", maxScore: 200, score: Math.round(184 * gpaFactor), remarks: "অনবদ্য সাহিত্য বিশ্লেষণ ও ব্যাকরণ দক্ষতা" },
        { subject: "ইংরেজি (১ম ও ২য় পত্র)", maxScore: 200, score: Math.round(180 * gpaFactor), remarks: "চমৎকার ব্যাকরণ ও মুক্ত লিখন নৈপুণ্য" },
        { subject: "সাধারণ গণিত", maxScore: 100, score: student.marks.math || 95, remarks: "জ্যামিতি ও পাটিগণিতে পূর্ণ দক্ষতা" },
        { subject: "উচ্চতর গণিত", maxScore: 100, score: Math.round(96 * gpaFactor), remarks: "ত্রিকোণমিতি ও স্থানাঙ্ক জ্যামিতিতে সেরা" },
        { subject: "পদার্থবিজ্ঞান (তত্ত্বীয় + ব্যবহারিক)", maxScore: 100, score: student.marks.physics || 92, remarks: "ব্যবহারিক পরীক্ষণ ও গাণিতিক পদার্থে নিখুঁত" },
        { subject: "রসায়ন বিজ্ঞান (তত্ত্বীয় + ব্যবহারিক)", maxScore: 100, score: Math.round(92 * gpaFactor), remarks: "রাসায়নিক বিক্রিয়া ও ল্যাব দক্ষতায় পারদর্শী" },
        { subject: "জীববিজ্ঞান (তত্ত্বীয় + ব্যবহারিক)", maxScore: 100, score: Math.round(95 * gpaFactor), remarks: "কোষ তত্ত্ব ও শারীরবিদ্যায় চমৎকার" },
        { subject: "তথ্য ও যোগাযোগ প্রযুক্তি (ICT)", maxScore: 50, score: Math.min(50, Math.round(49 * gpaFactor)), remarks: "প্রোগ্রামিং ও ডিজিটাল দক্ষতা প্রশংসনীয়" },
        { subject: "বাংলাদেশ ও বিশ্বপরিচয়", maxScore: 100, score: Math.round(90 * gpaFactor), remarks: "বাংলাদেশের ইতিহাস ও সাধারণ জ্ঞান সমৃদ্ধ" },
        { subject: "ইসলাম ও নৈতিক শিক্ষা", maxScore: 100, score: Math.round(96 * gpaFactor), remarks: "উচ্চ নৈতিকতা ও সঠিক অনুধাবন" }
      ].map(s => {
        const { grade, gpa } = getSubjectGradeAndGP(s.score, s.maxScore);
        return { ...s, grade, gpa };
      });
      setEditingScores(baseScores);
      setEditingRemarks(`${student.name} একজন অত্যন্ত নিয়মিত ও মনোযোগী শিক্ষার্থী। প্রাতিষ্ঠানিক ও জাতীয় পাঠ্যক্রমে তার সার্বিক ফলাফল ও সক্রিয় অংশগ্রহণ প্রশংসনীয়।`);
    }
  };

  const handleEditSubjectScore = (index, newScoreStr) => {
    const parsed = parseInt(newScoreStr, 10);
    const max = editingScores[index].maxScore;
    const score = isNaN(parsed) ? 0 : Math.min(max, Math.max(0, parsed));
    const { grade, gpa } = getSubjectGradeAndGP(score, max);

    setEditingScores(prev => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        score,
        grade,
        gpa
      };
      return copy;
    });
  };

  const handleEditSubjectRemarks = (index, text) => {
    setEditingScores(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], remarks: text };
      return copy;
    });
  };

  // Live Calculations for Modal
  const modalTotalObtained = editingScores.reduce((acc, s) => acc + (s.score || 0), 0);
  const modalMaxPossible = editingScores.reduce((acc, s) => acc + (s.maxScore || 100), 0);
  const modalPercentage = modalMaxPossible > 0 ? ((modalTotalObtained / modalMaxPossible) * 100).toFixed(2) : '0.00';
  const modalPoints = editingScores.map(s => parseFloat(s.gpa) || 0);
  const modalHasFail = modalPoints.some(p => p === 0);
  const modalCumulativeGPA = modalHasFail ? '0.00' : (modalPoints.reduce((a, b) => a + b, 0) / (modalPoints.length || 1)).toFixed(2);

  let modalPerformanceStatus = 'GPA 5.00 (Golden A+)';
  if (modalHasFail) modalPerformanceStatus = 'অকৃতকার্য (Failed)';
  else if (modalCumulativeGPA === '5.00' && editingScores.every(s => s.grade === 'A+')) modalPerformanceStatus = 'GPA 5.00 (Golden A+)';
  else if (modalCumulativeGPA === '5.00') modalPerformanceStatus = 'GPA 5.00 (A+)';
  else if (modalCumulativeGPA >= 4.00) modalPerformanceStatus = `GPA ${modalCumulativeGPA} (A)`;
  else if (modalCumulativeGPA >= 3.50) modalPerformanceStatus = `GPA ${modalCumulativeGPA} (A-)`;
  else if (modalCumulativeGPA >= 3.00) modalPerformanceStatus = `GPA ${modalCumulativeGPA} (B)`;
  else if (modalCumulativeGPA >= 2.00) modalPerformanceStatus = `GPA ${modalCumulativeGPA} (C)`;
  else modalPerformanceStatus = `GPA ${modalCumulativeGPA} (Passed)`;

  const handleSaveAndSyncResults = () => {
    setSaveSuccess(true);

    const updatedReport = {
      ...(studentReportCard || {}),
      student: {
        name: editingStudent.name,
        id: editingStudent.id === 'std-1' ? "ISC-2026-1014" : `ISC-2026-${editingStudent.roll + 1000}`,
        class: "১০ম শ্রেণি (Class 10) • দিবা শাখা - ক",
        group: "বিজ্ঞান বিভাগ (Science Group)",
        rollNumber: editingStudent.roll,
        regNo: "1810948291",
        guardian: "জনাব মোঃ রিয়াজ উদ্দিন",
        attendancePercentage: editingStudent.attendance || "98.8%"
      },
      scores: editingScores,
      summary: {
        totalMarks: modalTotalObtained,
        maxPossible: modalMaxPossible,
        percentage: `${modalPercentage}%`,
        cumulativeGPA: modalCumulativeGPA,
        performanceStatus: modalPerformanceStatus,
        rankInClass: modalCumulativeGPA === '5.00' ? "১ম স্থান (মেধা তালিকায় শীর্ষস্থান)" : "মেধাতালিকায় উত্তীর্ণ",
        boardStatus: parseFloat(modalCumulativeGPA) >= 4.00 ? "ঢাকা শিক্ষা বোর্ডে মেধা তালিকায় অন্তর্ভুক্তির যোগ্য" : "কৃতকার্য"
      },
      principalRemarks: editingRemarks,
      issueDate: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    if (onUpdateStudentResults) {
      onUpdateStudentResults(updatedReport);
    }

    const physicsScore = editingScores.find(s => s.subject.includes('পদার্থ'))?.score ?? editingStudent.marks.physics;
    const mathScore = editingScores.find(s => s.subject.includes('সাধারণ গণিত'))?.score ?? editingStudent.marks.math;

    setStudents(prev => prev.map(s => {
      if (s.id === editingStudent.id) {
        return {
          ...s,
          marks: {
            ...s.marks,
            physics: physicsScore,
            math: mathScore
          },
          gpa: modalCumulativeGPA,
          status: modalPerformanceStatus
        };
      }
      return s;
    }));

    setTimeout(() => {
      setEditingStudent(null);
      setSaveSuccess(false);
    }, 600);
  };

  const handleMarkChange = (studentId, subject, newScore, studentName) => {
    const parsed = parseInt(newScore, 10);
    const num = isNaN(parsed) ? 0 : Math.min(100, Math.max(0, parsed));
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const updatedMarks = { ...s.marks, [subject]: num };
        const newGpa = calculateGPA(updatedMarks);
        return {
          ...s,
          marks: updatedMarks,
          gpa: newGpa
        };
      }
      return s;
    }));

    // Trigger Real-Time Marks Sync Event
    onTriggerNotification({
      id: `mark-${Date.now()}`,
      type: 'marks',
      channel: 'Gradebook Sync',
      time: 'Just now',
      title: `Marks Updated: ${studentName}`,
      message: `Score updated to ${num}/100 in ${subject.toUpperCase()}. Live parent alert dispatched via Reverb.`
    });
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Teacher Profile Banner */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src={teacher.avatar}
              alt={teacher.name}
              style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.4rem' }}>{teacher.name}</h2>
                <span className="badge badge-primary">{teacher.badge}</span>
              </div>
              <p style={{ fontSize: '0.85rem', marginTop: '2px' }}>
                {teacher.subject || 'সাধারণ বিষয়'} • পদবী: {teacher.designation || 'সহকারী শিক্ষক'} • দায়িত্বপ্রাপ্ত শ্রেণি: {Array.isArray(teacher.assignedClasses) ? teacher.assignedClasses.join(', ') : (teacher.assignedClass || teacher.assignedClasses || '১০ম শ্রেণি (বিজ্ঞান)')}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={onNavigateRoutine}
              className="btn btn-secondary"
              style={{ gap: '6px', fontSize: '0.8rem' }}
            >
              <Calendar size={15} /> My Timetable Routine
            </button>
          </div>
        </div>
      </div>

      {/* Grid: 1-Click Attendance & Live Gradebook */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '20px' }}>
        {/* Module 1: Daily Attendance Register (Instant WebSocket Push) */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>দৈনিক ডিজিটাল শ্রেণি হাজিরা খাতা</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                ১০ম শ্রেণি (বিজ্ঞান বিভাগ, দিবা-ক) • ১ম পিরিয়ড (বিজ্ঞান ল্যাব ৪০১)
              </div>
            </div>
            <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
              <Sparkles size={10} /> লাইভ অভিভাবক পুশ
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {students.map(std => {
              const currentStatus = attendance[std.id] || 'Present';
              return (
                <div
                  key={std.id}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                      {std.name}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '1px' }}>
                      রোল নং: #{std.roll} • নিয়মিত উপস্থিতি: <strong style={{ color: '#059669' }}>{std.attendance}</strong>
                    </div>
                  </div>

                  {/* Attendance Status Buttons */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => handleSetAttendance(std.id, 'Present', std.name)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        border: currentStatus === 'Present' ? '1px solid #059669' : '1px solid #e2e8f0',
                        backgroundColor: currentStatus === 'Present' ? '#ecfdf5' : '#f8fafc',
                        color: currentStatus === 'Present' ? '#065f46' : '#64748b',
                        boxShadow: currentStatus === 'Present' ? '0 1px 2px rgba(5, 150, 105, 0.2)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      উপস্থিত
                    </button>
                    <button
                      onClick={() => handleSetAttendance(std.id, 'Late', std.name)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        border: currentStatus === 'Late' ? '1px solid #d97706' : '1px solid #e2e8f0',
                        backgroundColor: currentStatus === 'Late' ? '#fffbeb' : '#f8fafc',
                        color: currentStatus === 'Late' ? '#92400e' : '#64748b',
                        boxShadow: currentStatus === 'Late' ? '0 1px 2px rgba(217, 119, 6, 0.2)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      ⏱ বিলম্ব
                    </button>
                    <button
                      onClick={() => handleSetAttendance(std.id, 'Absent', std.name)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        border: currentStatus === 'Absent' ? '1px solid #e11d48' : '1px solid #e2e8f0',
                        backgroundColor: currentStatus === 'Absent' ? '#fff1f2' : '#f8fafc',
                        color: currentStatus === 'Absent' ? '#9f1239' : '#64748b',
                        boxShadow: currentStatus === 'Absent' ? '0 1px 2px rgba(225, 29, 72, 0.2)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      অনুপস্থিত
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Module 2: Quick Gradebook Entry with Real-Time GPA Recompute */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Continuous Assessment Gradebook</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Physics Midterms • Real-Time Autosave & GPA Computation
              </div>
            </div>
            <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
              Autosave ON
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '10px 12px' }}>শিক্ষার্থী (Student)</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center' }}>পদার্থবিজ্ঞান (/১০০)</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center' }}>গণিত (/১০০)</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center' }}>জিপিএ (GPA ৫.০০)</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center' }}>সিঙ্ক স্ট্যাটাস</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center' }}>ফলাফল এডিটর (Action)</th>
                </tr>
              </thead>
              <tbody>
                {students.map(std => (
                  <tr key={std.id} style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.825rem' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--text-main)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#eef2ff',
                          color: '#4338ca',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.75rem'
                        }}>
                          {std.roll}
                        </div>
                        <div>
                          <div>{std.name}</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>রোল: {std.roll} • ১০ম শ্রেণি (বিজ্ঞান)</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <input
                        type="number"
                        value={std.marks.physics}
                        onChange={e => handleMarkChange(std.id, 'physics', e.target.value, std.name)}
                        style={{
                          width: '60px',
                          padding: '6px 8px',
                          textAlign: 'center',
                          borderRadius: 'var(--radius-sm)',
                          border: '1.5px solid #cbd5e1',
                          backgroundColor: '#ffffff',
                          color: '#0f172a',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          outline: 'none',
                          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)'
                        }}
                      />
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {std.marks.math}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        backgroundColor: '#eef2ff',
                        color: '#4338ca',
                        border: '1px solid #c7d2fe'
                      }}>
                        {std.gpa}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                        <CheckCircle2 size={13} /> লাইভ সিঙ্কড
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleOpenResultEditor(std)}
                        className="btn btn-primary btn-shine"
                        style={{
                          padding: '7px 14px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          borderRadius: 'var(--radius-md)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 2px 8px -1px rgba(67, 56, 202, 0.35)',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <FileEdit size={14} />
                        <span>সম্পূর্ণ রেজাল্ট এডিট</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Full Academic Result & Marksheet Editor Modal */}
      {editingStudent && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.72)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setEditingStudent(null)}
        >
          <div 
            style={{
              maxWidth: '940px',
              width: '100%',
              maxHeight: '92vh',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
              overflow: 'hidden',
              animation: 'slideDown 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              backgroundColor: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 4px 12px rgba(67, 56, 202, 0.3)'
                }}>
                  <FileEdit size={24} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                      শিক্ষার্থীর সম্পূর্ণ ফলাফল ও মার্কশীট সম্পাদনা
                    </h3>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      backgroundColor: '#ecfdf5',
                      color: '#059669',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      border: '1px solid #a7f3d0'
                    }}>
                      ● রিয়েল-টাইম স্টুডেন্ট পোর্টাল সিঙ্ক
                    </span>
                  </div>
                  <p style={{ margin: '3px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
                    শিক্ষার্থী: <strong>{editingStudent.name}</strong> • রোল: <strong>{editingStudent.roll}</strong> • শ্রেণি: ১০ম (বিজ্ঞান বিভাগ) • ঢাকা শিক্ষা বোর্ড
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingStudent(null)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Live Evaluation KPI Ribbon */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              padding: '16px 24px',
              backgroundColor: '#f1f5f9',
              borderBottom: '1px solid #e2e8f0'
            }}>
              <div style={{ backgroundColor: '#ffffff', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>মোট প্রাপ্ত নম্বর (Total Marks)</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a' }}>
                  {modalTotalObtained} <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>/ {modalMaxPossible}</span>
                </div>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>শতকরা হার (Percentage)</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#2563eb' }}>
                  {modalPercentage}%
                </div>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>চূড়ান্ত জিপিএ (Overall GPA)</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#4338ca' }}>
                  {modalCumulativeGPA} <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>/ ৫.০০</span>
                </div>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>মেধা গ্রেড (Standing)</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: modalCumulativeGPA >= '4.00' ? '#10b981' : '#d97706', marginTop: '4px' }}>
                  {modalPerformanceStatus}
                </div>
              </div>
            </div>

            {/* Modal Body: Scrollable Subject Marksheet Table */}
            <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#1e293b' }}>
                  বিষয়ভিত্তিক নম্বর এন্ট্রি (১০টি আবশ্যিক ও নৈর্বাচনিক বিষয়)
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  * নম্বর ইনপুট দেওয়ার সাথে সাথে স্বয়ংক্রিয়ভাবে লেটার গ্রেড ও জিপিএ পরিবর্তিত হবে
                </span>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase' }}>
                      <th style={{ padding: '10px 12px', width: '35px' }}>#</th>
                      <th style={{ padding: '10px 12px' }}>বিষয় (Subject)</th>
                      <th style={{ padding: '10px 12px', textAlign: 'center' }}>পূর্ণমান</th>
                      <th style={{ padding: '10px 12px', textAlign: 'center', width: '110px' }}>প্রাপ্ত নম্বর (Score)</th>
                      <th style={{ padding: '10px 12px', textAlign: 'center' }}>লেটার গ্রেড</th>
                      <th style={{ padding: '10px 12px', textAlign: 'center' }}>গ্রেড পয়েন্ট</th>
                      <th style={{ padding: '10px 12px' }}>শিক্ষকের পর্যবেক্ষণ মন্তব্য</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editingScores.map((sub, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '0.82rem' }}>
                        <td style={{ padding: '10px 12px', color: '#94a3b8', fontWeight: 700 }}>
                          {idx + 1}
                        </td>
                        <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1e293b' }}>
                          {sub.subject}
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'center', color: '#64748b', fontWeight: 600 }}>
                          {sub.maxScore}
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                          <input
                            type="number"
                            min="0"
                            max={sub.maxScore}
                            value={sub.score}
                            onChange={(e) => handleEditSubjectScore(idx, e.target.value)}
                            style={{
                              width: '75px',
                              padding: '6px 8px',
                              textAlign: 'center',
                              borderRadius: '8px',
                              border: '1.5px solid #cbd5e1',
                              fontWeight: 800,
                              fontSize: '0.9rem',
                              color: '#0f172a',
                              backgroundColor: '#ffffff',
                              outline: 'none'
                            }}
                          />
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '9999px',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            backgroundColor: sub.grade === 'A+' ? '#ecfdf5' : sub.grade === 'A' ? '#eff6ff' : sub.grade === 'F' ? '#fff1f2' : '#f8fafc',
                            color: sub.grade === 'A+' ? '#059669' : sub.grade === 'A' ? '#2563eb' : sub.grade === 'F' ? '#e11d48' : '#475569',
                            border: '1px solid currentColor'
                          }}>
                            {sub.grade}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 800, color: '#4338ca' }}>
                          {sub.gpa}
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          <input
                            type="text"
                            value={sub.remarks || ''}
                            onChange={(e) => handleEditSubjectRemarks(idx, e.target.value)}
                            placeholder="মন্তব্য লিখুন..."
                            style={{
                              width: '100%',
                              padding: '5px 8px',
                              borderRadius: '6px',
                              border: '1px solid #e2e8f0',
                              fontSize: '0.78rem',
                              color: '#334155'
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Overall Teacher's Remarks Box */}
              <div style={{ marginTop: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                  শ্রেণি শিক্ষকের সার্বিক মূল্যায়ন ও দিকনির্দেশনা (স্টুডেন্ট পোর্টালে সরাসরি দৃশ্যমান হবে):
                </label>
                <textarea
                  rows={2}
                  value={editingRemarks}
                  onChange={(e) => setEditingRemarks(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.84rem',
                    fontFamily: 'inherit',
                    color: '#0f172a',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '16px 24px',
              backgroundColor: '#f8fafc',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#64748b' }}>
                <AlertCircle size={15} color="#4338ca" />
                <span>সংরক্ষণ বাটনে ক্লিক করার সাথে সাথে স্টুডেন্ট পোর্টাল ও অফিসিয়াল রিপোর্ট কার্ডে লাইভ সিঙ্ক হবে।</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => setEditingStudent(null)}
                  className="btn btn-secondary"
                  style={{ padding: '9px 18px', fontSize: '0.84rem', borderRadius: '10px' }}
                >
                  বাতিল
                </button>

                <button
                  onClick={handleSaveAndSyncResults}
                  className="btn btn-primary btn-shine"
                  disabled={saveSuccess}
                  style={{
                    padding: '9px 22px',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    borderRadius: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: saveSuccess ? '#10b981' : '#4338ca',
                    boxShadow: '0 4px 14px -2px rgba(67, 56, 202, 0.4)'
                  }}
                >
                  {saveSuccess ? (
                    <>
                      <Check size={16} />
                      <span>সফলভাবে সিঙ্ক সম্পন্ন!</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>সংরক্ষণ ও স্টুডেন্ট পোর্টালে সিঙ্ক করুন</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
