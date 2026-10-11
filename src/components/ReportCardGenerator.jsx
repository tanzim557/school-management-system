import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  CheckCircle2, 
  Award, 
  QrCode, 
  ShieldCheck, 
  User, 
  Calendar,
  Sparkles,
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import { STUDENT_REPORT_CARD, INSTITUTION } from '../data/mockData';

export function ReportCardGenerator({ reportData: propReportData }) {
  const [reportData, setReportData] = useState(() => propReportData || STUDENT_REPORT_CARD);
  const [viewMode, setViewMode] = useState('pdf');

  useEffect(() => {
    if (propReportData) {
      setReportData(propReportData);
    }
  }, [propReportData]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Action Header (Hidden in Print) */}
      <div className="glass-panel no-print" style={{ padding: '18px 24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.4rem' }}>Automated PDF Report Card Engine</h2>
              <span className="badge badge-success">
                <CheckCircle2 size={12} /> QR Verifiable
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', marginTop: '4px' }}>
              Pixel-perfect digital and print-ready transcripts with automated GPA/CGPA grading calculation.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              display: 'flex',
              backgroundColor: 'var(--bg-surface-subtle)',
              padding: '3px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <button
                onClick={() => setViewMode('pdf')}
                className="btn"
                style={{
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: viewMode === 'pdf' ? 'var(--primary)' : 'transparent',
                  color: viewMode === 'pdf' ? '#fff' : 'var(--text-muted)'
                }}
              >
                Official PDF Layout
              </button>
              <button
                onClick={() => setViewMode('digital')}
                className="btn"
                style={{
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: viewMode === 'digital' ? 'var(--primary)' : 'transparent',
                  color: viewMode === 'digital' ? '#fff' : 'var(--text-muted)'
                }}
              >
                Interactive Analytics View
              </button>
            </div>

            <button onClick={handlePrint} className="btn btn-primary" style={{ gap: '8px' }}>
              <Printer size={16} />
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      {/* Official Report Card Printable Document */}
      <div 
        className="report-card-container"
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%',
          backgroundColor: '#ffffff',
          color: '#0f172a',
          borderRadius: 'var(--radius-xl)',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
          border: '2px solid #e2e8f0',
          position: 'relative'
        }}
      >
        {/* Subtle Watermark */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-30deg)',
          fontSize: '6rem',
          fontWeight: 900,
          color: 'rgba(99, 102, 241, 0.04)',
          pointerEvents: 'none',
          userSelect: 'none',
          textAlign: 'center',
          lineHeight: 1
        }}>
          OFFICIAL<br />ACADEMIC RECORD
        </div>

        {/* Institution Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '3px double #cbd5e1',
          paddingBottom: '24px',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.5rem',
              boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)'
            }}>
              ISC
            </div>
            <div>
              <h1 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
                {INSTITUTION.name}
              </h1>
              <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>
                {INSTITUTION.motto} • ঢাকা শিক্ষা বোর্ড ও NCTB অনুমোদিত
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                EIIN: 108275 • বোর্ড কোড: 1102 • কলেজ কোড: 1058 • মতিঝিল মূল ক্যাম্পাস, ঢাকা
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{
              display: 'inline-block',
              padding: '4px 12px',
              backgroundColor: '#e0e7ff',
              color: '#3730a3',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}>
              Term Transcript
            </span>
            <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '6px', fontWeight: 600 }}>
              Session: {reportData.session}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Issue Date: {reportData.issueDate}
            </div>
          </div>
        </div>

        {/* Student Profile Ribbon */}
        <div style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Student Name</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{reportData.student.name}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Student ID</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'monospace', color: '#4f46e5' }}>{reportData.student.id}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Class & Section</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{reportData.student.class}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Roll Number</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>#{reportData.student.rollNumber}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Attendance</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#16a34a' }}>{reportData.student.attendancePercentage} (Eligible)</div>
          </div>
        </div>

        {/* Academic Marks Table */}
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '28px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: '#475569' }}>Subject Name</th>
              <th style={{ padding: '10px 14px', textAlign: 'center', fontSize: '0.75rem', textTransform: 'uppercase', color: '#475569' }}>Max Score</th>
              <th style={{ padding: '10px 14px', textAlign: 'center', fontSize: '0.75rem', textTransform: 'uppercase', color: '#475569' }}>Score Achieved</th>
              <th style={{ padding: '10px 14px', textAlign: 'center', fontSize: '0.75rem', textTransform: 'uppercase', color: '#475569' }}>Letter Grade</th>
              <th style={{ padding: '10px 14px', textAlign: 'center', fontSize: '0.75rem', textTransform: 'uppercase', color: '#475569' }}>Grade Point (GPA)</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: '#475569' }}>Faculty Assessment</th>
            </tr>
          </thead>
          <tbody>
            {reportData.scores.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>
                  {row.subject}
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
                  {row.maxScore}
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
                  {row.score}
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: row.grade.startsWith('A') ? '#dcfce7' : '#fef3c7',
                    color: row.grade.startsWith('A') ? '#15803d' : '#b45309',
                    fontWeight: 700,
                    fontSize: '0.78rem'
                  }}>
                    {row.grade}
                  </span>
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 700, fontSize: '0.85rem', color: '#4f46e5' }}>
                  {row.gpa}
                </td>
                <td style={{ padding: '12px 14px', fontSize: '0.8rem', color: '#475569', fontStyle: 'italic' }}>
                  "{row.remarks}"
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Performance Statistics & Distinction Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '28px'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#1e40af', fontWeight: 700, textTransform: 'uppercase' }}>Aggregate Total</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e3a8a' }}>
              {reportData.summary.totalMarks} / {reportData.summary.maxPossible} ({reportData.summary.percentage})
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#1e40af', fontWeight: 700, textTransform: 'uppercase' }}>Cumulative GPA</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#4338ca' }}>
              {reportData.summary.cumulativeGPA} / 4.00
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#1e40af', fontWeight: 700, textTransform: 'uppercase' }}>Cohort Rank</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#047857' }}>
              {reportData.summary.rankInClass}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#1e40af', fontWeight: 700, textTransform: 'uppercase' }}>Academic Standing</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#7c3aed' }}>
              {reportData.summary.performanceStatus}
            </div>
          </div>
        </div>

        {/* Principal Remarks */}
        <div style={{
          padding: '14px 18px',
          borderLeft: '4px solid #4f46e5',
          backgroundColor: '#f8fafc',
          borderRadius: '4px',
          marginBottom: '32px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4f46e5', textTransform: 'uppercase' }}>
            Head of School Commentary
          </div>
          <p style={{ fontSize: '0.85rem', color: '#334155', marginTop: '4px', fontStyle: 'italic', margin: 0 }}>
            "{reportData.principalRemarks}"
          </p>
        </div>

        {/* Footer: Signatures & QR Code Authentication */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingTop: '20px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <div style={{ textAlign: 'center', width: '200px' }}>
            <div style={{
              fontFamily: 'serif',
              fontStyle: 'italic',
              fontSize: '1.3rem',
              color: '#1e3a8a',
              marginBottom: '4px'
            }}>
              শরীফ সামছুদ্দোহা
            </div>
            <div style={{ borderTop: '1px solid #94a3b8', paddingTop: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
              শ্রেণি শিক্ষক (দিবা শাখা)
            </div>
          </div>

          {/* Cryptographic QR Security Seal */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '8px 14px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#0f172a',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <QrCode size={36} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <ShieldCheck size={12} /> ঢাকা শিক্ষা বোর্ড ডিজিটাল সিল
              </div>
              <div style={{ fontSize: '0.62rem', color: '#64748b', fontFamily: 'monospace' }}>
                HASH: SHA256-ISC-DHAKA-GPA500
              </div>
              <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>
                যাচাই: idealschool.edu.bd/verify
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', width: '200px' }}>
            <div style={{
              fontFamily: 'serif',
              fontStyle: 'italic',
              fontSize: '1.3rem',
              color: '#1e3a8a',
              marginBottom: '4px'
            }}>
              প্রফেসর লাল মোহাম্মদ
            </div>
            <div style={{ borderTop: '1px solid #94a3b8', paddingTop: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
              অধ্যক্ষ ও প্রধান শিক্ষক
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
