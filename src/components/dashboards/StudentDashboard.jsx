import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle2, 
  FileText, 
  ChevronRight,
  TrendingUp,
  Download
} from 'lucide-react';
import { CURRENT_USERS, SYLLABUS_MODULES, STUDENT_REPORT_CARD } from '../../data/mockData';
import { Printer, Sparkles as SparklesIcon, ShieldCheck } from 'lucide-react';

export function StudentDashboard({ onOpenReportCard, onOpenRoutine, studentReportCard: propReportCard, currentUser }) {
  const defaultStudent = CURRENT_USERS["Student"];
  const student = (currentUser && currentUser.role === 'Student') ? {
    ...defaultStudent,
    ...currentUser,
    avatar: currentUser.avatar || defaultStudent.avatar,
    name: currentUser.name || defaultStudent.name,
    studentId: currentUser.studentId || currentUser.id || defaultStudent.studentId,
    grade: currentUser.grade || currentUser.class || defaultStudent.grade,
    rollNumber: currentUser.rollNumber || currentUser.roll || defaultStudent.rollNumber
  } : defaultStudent;
  const studentReportCard = propReportCard || STUDENT_REPORT_CARD;
  const [modules, setModules] = useState(SYLLABUS_MODULES);

  const todaySchedule = [
    { period: "Period 1", time: "08:30 - 09:20", subject: "Advanced Physics", teacher: "Dr. Marcus Sterling", room: "Lab 301", status: "Completed" },
    { period: "Period 2", time: "09:25 - 10:15", subject: "Pure Mathematics", teacher: "Prof. Sarah Lin", room: "Hall B", status: "In Progress" },
    { period: "Period 3", time: "10:20 - 11:10", subject: "English Literature", teacher: "Ms. Clara Vance", room: "Room 104", status: "Upcoming" },
    { period: "Period 4", time: "11:15 - 12:05", subject: "Computer Science", teacher: "Eng. David Chen", room: "IT Hub 2", status: "Upcoming" }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Student Banner */}
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
              src={student.avatar}
              alt={student.name}
              style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.4rem' }}>{student.name}</h2>
                <span className="badge badge-primary">{student.studentId}</span>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  backgroundColor: '#ecfdf5',
                  color: '#059669',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  border: '1px solid #a7f3d0'
                }}>
                  ● লাইভ সিঙ্কড
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', marginTop: '2px' }}>
                {student.grade} • Roll #{student.rollNumber} • Standing: <strong>{studentReportCard?.summary?.rankInClass || student.rank}</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              backgroundColor: 'var(--bg-surface-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 16px',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                সর্বশেষ মূল্যায়ন জিপিএ
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--primary)' }}>
                {studentReportCard?.summary?.cumulativeGPA ? `GPA ${studentReportCard.summary.cumulativeGPA}` : student.gpa}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#059669', fontWeight: 700 }}>
                {studentReportCard?.summary?.performanceStatus}
              </div>
            </div>

            <button
              onClick={onOpenReportCard}
              className="btn btn-primary"
              style={{ gap: '6px' }}
            >
              <FileText size={16} /> অফিসিয়াল ট্রান্সক্রিপ্ট দেখুন
            </button>
          </div>
        </div>
      </div>

      {/* Comprehensive Academic Results & Marksheet Section (Live Updated by Teacher) */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '18px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Award size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                  আমার পরীক্ষার ফলাফল ও একাডেমিক মার্কশীট (Live Marksheet)
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {studentReportCard.examination} • {studentReportCard.session} • ঢাকা শিক্ষা বোর্ড
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              backgroundColor: '#ecfdf5',
              color: '#059669',
              padding: '4px 10px',
              borderRadius: '9999px',
              border: '1px solid #a7f3d0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <CheckCircle2 size={12} /> শিক্ষক কর্তৃক সরাসরি হালনাগাদকৃত
            </span>
            <button
              onClick={onOpenReportCard}
              className="btn btn-secondary"
              style={{ padding: '6px 14px', fontSize: '0.78rem', gap: '6px' }}
            >
              <Printer size={14} /> প্রিন্ট / পিডিএফ ডাউনলোড
            </button>
          </div>
        </div>

        {/* 4 Performance KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>মোট প্রাপ্ত নম্বর</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '2px' }}>
              {studentReportCard.summary.totalMarks} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ {studentReportCard.summary.maxPossible}</span>
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>প্রাপ্ত শতকরা হার</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#2563eb', marginTop: '2px' }}>
              {studentReportCard.summary.percentage}
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>সর্বমোট জিপিএ (GPA)</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--primary)', marginTop: '2px' }}>
              {studentReportCard.summary.cumulativeGPA} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ ৫.০০</span>
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>ফলাফল স্ট্যাটাস</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#10b981', marginTop: '6px' }}>
              {studentReportCard.summary.performanceStatus}
            </div>
          </div>
        </div>

        {/* 10-Subject Detailed Scores Table */}
        <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-surface-subtle)', borderBottom: '1px solid var(--border-color)', fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 14px', width: '35px' }}>#</th>
                <th style={{ padding: '10px 14px' }}>বিষয় (Subject)</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>পূর্ণমান</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>প্রাপ্ত নম্বর (Score)</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>লেটার গ্রেড</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>জিপিএ (GP)</th>
                <th style={{ padding: '10px 14px' }}>শিক্ষকের মূল্যায়ন মন্তব্য</th>
              </tr>
            </thead>
            <tbody>
              {studentReportCard.scores.map((sub, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.84rem' }}>
                  <td style={{ padding: '10px 14px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {idx + 1}
                  </td>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-main)' }}>
                    {sub.subject}
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'center', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {sub.maxScore}
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 800, color: 'var(--text-main)', fontSize: '0.92rem' }}>
                    {sub.score}
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'center' }}>
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
                  <td style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 800, color: 'var(--primary)' }}>
                    {sub.gpa}
                  </td>
                  <td style={{ padding: '10px 14px', color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                    {sub.remarks || 'সন্তোষজনক ফলাফল'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Teacher's Overall Observation Quote */}
        {studentReportCard.principalRemarks && (
          <div style={{
            marginTop: '16px',
            padding: '14px 18px',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRadius: '12px',
            borderLeft: '4px solid var(--primary)',
            fontSize: '0.84rem',
            color: 'var(--text-main)'
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '4px', textTransform: 'uppercase' }}>
              শ্রেণি শিক্ষকের সামগ্রিক মূল্যায়ন ও মন্তব্য:
            </div>
            <em>"{studentReportCard.principalRemarks}"</em>
          </div>
        )}
      </div>

      {/* Grid: Today's Schedule & Syllabus Tracker */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '20px' }}>
        {/* Today's Classes */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Today's Academic Schedule</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Monday • Live Period Progression</div>
            </div>
            <button onClick={onOpenRoutine} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
              Full Week Routine <ChevronRight size={12} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {todaySchedule.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: item.status === 'In Progress' ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    {item.period} ({item.time})
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                    {item.subject}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.teacher} • {item.room}
                  </div>
                </div>

                <div>
                  {item.status === 'Completed' && (
                    <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                      <CheckCircle2 size={10} /> Completed
                    </span>
                  )}
                  {item.status === 'In Progress' && (
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem', animation: 'pulseSubtle 1.5s infinite' }}>
                      ● Live Now
                    </span>
                  )}
                  {item.status === 'Upcoming' && (
                    <span className="badge" style={{ fontSize: '0.65rem', backgroundColor: 'var(--bg-surface-subtle)', color: 'var(--text-muted)' }}>
                      Upcoming
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Syllabus Progression */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Syllabus Completion Tracker</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Term 2 Curriculum Milestones</div>
            </div>
            <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>
              84% Avg Completion
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {modules.map(mod => (
              <div key={mod.id} style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                    {mod.subject}
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {mod.progress}%
                  </div>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {mod.instructor}
                </div>

                {/* Progress Bar */}
                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: 'var(--bg-surface-subtle)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${mod.progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #4f46e5 0%, #8b5cf6 100%)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
