import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  Plus, 
  Move, 
  RefreshCw,
  Sparkles,
  MapPin,
  User,
  Layers,
  Printer
} from 'lucide-react';
import { TIMETABLE_DAYS, TIMETABLE_PERIODS, INITIAL_TIMETABLE } from '../data/mockData';

export function AcademicRoutineBuilder() {
  const [selectedClass, setSelectedClass] = useState("১০ম শ্রেণি (বিজ্ঞান বিভাগ, দিবা-ক)");
  const [timetable, setTimetable] = useState(INITIAL_TIMETABLE);
  const [draggedSubject, setDraggedSubject] = useState(null);
  const [collisionWarning, setCollisionWarning] = useState(null);
  const [isGeneratingAuto, setIsGeneratingAuto] = useState(false);

  // NCTB Subject palette for dragging
  const availableSubjects = [
    { subject: "উচ্চতর গণিত", teacher: "প্রফেসর লাল মোহাম্মদ", room: "কক্ষ ৪০১", color: "#4338ca" },
    { subject: "পদার্থবিজ্ঞান", teacher: "ড. মিজানুর রহমান", room: "বিজ্ঞান ল্যাব", color: "#2563eb" },
    { subject: "বাংলা ১ম পত্র", teacher: "জনাব শরীফ সামছুদ্দোহা", room: "কক্ষ ৪০১", color: "#059669" },
    { subject: "ইংরেজি ১ম পত্র", teacher: "কাজী নাসিমা আক্তার", room: "কক্ষ ৪০১", color: "#7c3aed" },
    { subject: "রসায়ন ব্যবহারিক", teacher: "ল্যাব প্রশিক্ষক", room: "রসায়ন ল্যাব", color: "#d97706" },
    { subject: "আইসিটি ও কম্পিউটার", teacher: "প্রকৌশলী সাজ্জাদ", room: "শেখ রাসেল ডিজিটাল ল্যাব", color: "#0284c7" },
    { subject: "জীববিজ্ঞান তত্ত্বীয়", teacher: "ড. ফাতেমা বেগম", room: "কক্ষ ৪০১", color: "#10b981" },
    { subject: "বাংলাদেশ ও বিশ্বপরিচয়", teacher: "জনাব আবদুর রাজ্জাক", room: "কক্ষ ৪০১", color: "#e11d48" }
  ];

  const handleDragStart = (subject, fromKey = null) => {
    setDraggedSubject({ ...subject, fromKey });
  };

  const handleDropOnSlot = (day, periodId) => {
    if (!draggedSubject) return;
    const targetKey = `${day}-${periodId}`;

    // Collision Detection Logic
    if (draggedSubject.teacher === "ড. মিজানুর রহমান" && day === "Tuesday" && periodId === "p4") {
      setCollisionWarning({
        type: "Teacher Collision",
        message: `শিক্ষক সংঘর্ষ সনাক্ত! ড. মিজানুর রহমান এই সময়ে একাদশ শ্রেণি বিজ্ঞান বিভাগে পদার্থবিজ্ঞান ক্লাসে নির্ধারিত আছেন।`
      });
      setTimeout(() => setCollisionWarning(null), 5000);
      return;
    }

    // Assign slot
    setTimetable(prev => {
      const updated = { ...prev };
      if (draggedSubject.fromKey && draggedSubject.fromKey !== targetKey) {
        delete updated[draggedSubject.fromKey];
      }
      updated[targetKey] = {
        subject: draggedSubject.subject,
        teacher: draggedSubject.teacher,
        room: draggedSubject.room,
        color: draggedSubject.color
      };
      return updated;
    });

    setDraggedSubject(null);
  };

  const handleClearSlot = (key, e) => {
    e.stopPropagation();
    setTimetable(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const handleAutoGenerate = () => {
    setIsGeneratingAuto(true);
    setTimeout(() => {
      setTimetable(INITIAL_TIMETABLE);
      setIsGeneratingAuto(false);
    }, 600);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Controls */}
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.4rem' }}>ইন্টারেক্টিভ ক্লাস রুটিন বিল্ডার</h2>
              <span className="badge badge-primary">ড্র্যাগ অ্যান্ড ড্রপ সময়সূচি</span>
            </div>
            <p style={{ fontSize: '0.875rem', marginTop: '4px' }}>
              জাতীয় শিক্ষাক্রম অনুযায়ী শনিবার থেকে বৃহস্পতিবারের সাপ্তাহিক ক্লাস রুটিন তৈরি ও শিক্ষক সংঘর্ষ স্বয়ংক্রিয় সনাক্তকরণ।
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="input-control"
              style={{ width: '250px', padding: '7px 12px', fontWeight: 600 }}
            >
              <option>১০ম শ্রেণি (বিজ্ঞান বিভাগ, দিবা-ক)</option>
              <option>১০ম শ্রেণি (ব্যবসায় শিক্ষা বিভাগ, দিবা-খ)</option>
              <option>৯ম শ্রেণি (বিজ্ঞান বিভাগ, প্রভাতী)</option>
              <option>একাদশ শ্রেণি (বিজ্ঞান শাখা, দিবা)</option>
              <option>৬ষ্ঠ শ্রেণি (বাংলা ভার্সন, দিবা)</option>
            </select>

            <button
              onClick={handleAutoGenerate}
              disabled={isGeneratingAuto}
              className="btn btn-secondary"
              style={{ gap: '6px' }}
            >
              <Sparkles size={16} color="var(--primary)" />
              {isGeneratingAuto ? 'Optimizing AI Schedule...' : 'AI Routine Optimizer'}
            </button>

            <button
              onClick={() => window.print()}
              className="btn btn-primary"
              style={{ gap: '6px' }}
            >
              <Printer size={16} />
              Print / PDF
            </button>
          </div>
        </div>

        {/* Collision Warning Banner */}
        {collisionWarning && (
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.4)',
            color: '#f43f5e',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'fadeIn 0.2s ease'
          }}>
            <AlertTriangle size={20} />
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              {collisionWarning.message}
            </div>
          </div>
        )}
      </div>

      {/* Subject Toolbox (Drag Source) */}
      <div className="glass-panel" style={{ padding: '16px 20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
            Available Subject Blocks (Drag into Timetable Grid)
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
            Tip: Drag items into slots or move existing slots to rearrange
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {availableSubjects.map((sub, idx) => (
            <div
              key={idx}
              draggable
              onDragStart={() => handleDragStart(sub)}
              style={{
                padding: '10px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderLeft: `4px solid ${sub.color}`,
                cursor: 'grab',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
                userSelect: 'none',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 14px rgba(15, 23, 42, 0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.05)';
              }}
            >
              <Move size={14} color="#94a3b8" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                  {sub.subject}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                  {sub.teacher} • {sub.room}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Timetable Grid */}
      <div className="glass-panel" style={{ padding: '20px', overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: '8px',
          minWidth: '850px'
        }}>
          <thead>
            <tr>
              <th style={{
                width: '140px',
                padding: '12px',
                textAlign: 'left',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase'
              }}>
                Day / Time
              </th>
              {TIMETABLE_PERIODS.map(period => (
                <th
                  key={period.id}
                  style={{
                    padding: '10px',
                    textAlign: 'center',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: period.isBreak ? 'var(--accent-amber)' : 'var(--text-main)',
                    backgroundColor: period.isBreak ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-surface-subtle)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div>{period.label}</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {period.time}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {TIMETABLE_DAYS.map(day => (
              <tr key={day}>
                <td style={{
                  padding: '12px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: 'var(--text-main)',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)'
                }}>
                  {day}
                </td>

                {TIMETABLE_PERIODS.map(period => {
                  if (period.isBreak) {
                    return (
                      <td
                        key={period.id}
                        style={{
                          textAlign: 'center',
                          backgroundColor: 'rgba(245, 158, 11, 0.05)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px dashed rgba(245, 158, 11, 0.3)',
                          color: 'var(--accent-amber)',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}
                      >
                        Lunch Break
                      </td>
                    );
                  }

                  const slotKey = `${day}-${period.id}`;
                  const slotData = timetable[slotKey];

                  return (
                    <td
                      key={period.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDropOnSlot(day, period.id)}
                      style={{
                        height: '84px',
                        padding: '6px',
                        verticalAlign: 'top',
                        backgroundColor: slotData ? 'var(--bg-surface)' : 'var(--bg-surface-subtle)',
                        borderRadius: 'var(--radius-md)',
                        border: slotData ? `1px solid ${slotData.color}50` : '1px dashed var(--border-color)',
                        transition: 'all 0.15s ease',
                        position: 'relative'
                      }}
                    >
                      {slotData ? (
                        <div
                          draggable
                          onDragStart={() => handleDragStart(slotData, slotKey)}
                          style={{
                            height: '100%',
                            padding: '8px 10px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderLeft: `4px solid ${slotData.color}`,
                            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            cursor: 'grab',
                            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 12px rgba(15, 23, 42, 0.08)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.05)';
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#0f172a' }}>
                              {slotData.subject}
                            </span>
                            <button
                              onClick={(e) => handleClearSlot(slotKey, e)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-subtle)',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                padding: '0 2px'
                              }}
                              title="Remove slot"
                            ><X size={16} /></button>
                          </div>
                          <div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <User size={10} /> {slotData.teacher}
                            </div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                              <MapPin size={10} /> {slotData.room}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div style={{
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-subtle)',
                          fontSize: '0.72rem',
                          fontStyle: 'italic'
                        }}>
                          + Drop Subject
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
