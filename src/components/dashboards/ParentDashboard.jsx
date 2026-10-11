import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  MessageSquare, 
  Bell, 
  CheckCircle2, 
  Send, 
  AlertTriangle, 
  ArrowRight,
  Sparkles,
  DollarSign,
  Clock,
  Receipt
} from 'lucide-react';
import { CURRENT_USERS } from '../../data/mockData';

export function ParentDashboard({ onNavigateFinance, onNavigateReportCard, studentReportCard, invoices: propInvoices, currentUser }) {
  const defaultParent = CURRENT_USERS["Parent"];
  const parent = (currentUser && currentUser.role === 'Parent') ? {
    ...defaultParent,
    ...currentUser,
    name: currentUser.name || defaultParent.name,
    children: currentUser.children || [
      {
        name: currentUser.studentName || defaultParent.children[0].name,
        grade: currentUser.grade || defaultParent.children[0].grade,
        roll: currentUser.studentRoll || defaultParent.children[0].roll,
        studentId: currentUser.studentId || defaultParent.children[0].studentId,
        attendance: defaultParent.children[0].attendance,
        gpa: defaultParent.children[0].gpa
      }
    ]
  } : defaultParent;
  const [selectedChild, setSelectedChild] = useState(parent.children[0]);

  // Sync fee payment status from invoices
  const invoices = propInvoices || (() => {
    const saved = localStorage.getItem('schoolpulse_invoices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  })();

  const isTanvir = selectedChild.name.includes('তানভীর');
  const tanvirInvoice = invoices.find(i => i.id === 'FEE-2026-0941' || (i.studentName && i.studentName.includes('তানভীর')));
  const isTanvirPaid = tanvirInvoice && tanvirInvoice.status === 'Paid';
  const [chatMessages, setChatMessages] = useState([
    { sender: 'teacher', text: 'আসসালামু আলাইকুম জনাব রিয়াজ উদ্দিন সাহেব। তানভীর আজকের পদার্থবিজ্ঞান মডেল টেস্টে ৯৪/১০০ পেয়ে শ্রেণিতে ১ম স্থান অধিকার করেছে।', time: '০৯:৪০ AM' },
    { sender: 'parent', text: 'ওয়ালাইকুম আসসালাম স্যার! জেনে খুব ভালো লাগল। জাতীয় বিজ্ঞান অলিম্পিয়াডের প্রস্তুতিমূলক ক্লাস কি শনিবার থেকে শুরু হচ্ছে?', time: '০৯:৪৫ AM' },
    { sender: 'teacher', text: 'জি, প্রতি শনিবার ও মঙ্গলবার ক্লাস শেষে শেখ রাসেল ডিজিটাল ল্যাবে বিশেষ ক্লাস পরিচালিত হবে।', time: '০৯:৫০ AM' }
  ]);
  const [typedMessage, setTypedMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const newMsg = {
      sender: 'parent',
      text: typedMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages([...chatMessages, newMsg]);
    setTypedMessage('');

    // Teacher simulated reply
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'teacher',
          text: `ধন্যবাদ! আপনার বার্তাটি শিক্ষকের ডায়রিতে নথিভুক্ত করা হয়েছে। তানভীরের যত্ন নেওয়া হচ্ছে।`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Parent Banner with Multi-Ward Switcher */}
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
              src={parent.avatar}
              alt={parent.name}
              style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.4rem' }}>{parent.name}</h2>
                <span className="badge badge-primary">অভিভাবক পোর্টাল</span>
              </div>
              <p style={{ fontSize: '0.85rem', marginTop: '2px' }}>
                {parent.email} • জরুরি যোগাযোগ: {parent.phone}
              </p>
            </div>
          </div>

          {/* Child Switcher Ribbon */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--bg-surface-subtle)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              শিক্ষার্থী নির্বাচন:
            </span>
            {parent.children.map(child => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className="btn"
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  backgroundColor: selectedChild.id === child.id ? 'var(--primary)' : 'var(--bg-surface)',
                  color: selectedChild.id === child.id ? '#ffffff' : 'var(--text-main)',
                  border: selectedChild.id === child.id ? 'none' : '1px solid var(--border-color)'
                }}
              >
                {child.name} ({child.grade})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Financial Card & Direct Teacher Chat */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '20px' }}>
        {/* Child Academic Snapshot & Fee Due */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', margin: 0 }}>{selectedChild.name} • শিক্ষা অগ্রগতি</h3>
                {selectedChild.name.includes('তানভীর') && studentReportCard?.summary?.cumulativeGPA && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700, marginTop: '2px' }}>
                    সর্বশেষ জিপিএ: {studentReportCard.summary.cumulativeGPA} ({studentReportCard.summary.performanceStatus})
                  </div>
                )}
              </div>
              <span className="badge badge-success">৯৮% ডিজিটাল উপস্থিতি</span>
            </div>

            <div style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: 'var(--bg-surface-subtle)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  মাসিক বেতন ও ফি এর স্থিতি
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
                  {isTanvir ? (
                    isTanvirPaid ? (
                      <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle2 size={18} /> ৳ ০.০০ (সকল ফি পরিশোধিত)
                      </span>
                    ) : (
                      '৳ ৩,২০০ বকেয়া প্রদেয়'
                    )
                  ) : (
                    '৳ ২,৪০০ বকেয়া প্রদেয়'
                  )}
                </div>
                <div style={{ 
                  fontSize: '0.72rem', 
                  color: isTanvir && isTanvirPaid ? '#10b981' : '#f59e0b', 
                  marginTop: '2px',
                  fontWeight: isTanvir && isTanvirPaid ? 600 : 400
                }}>
                  {isTanvir && isTanvirPaid ? (
                    `পরিশোধিত (${tanvirInvoice?.paidDate || '২০ সেপ্টেম্বর ২০২৬'} • TrxID: ${tanvirInvoice?.trxId || 'BK928401'})`
                  ) : (
                    'পরিশোধের শেষ তারিখ: ১০ অক্টোবর, ২০২৬'
                  )}
                </div>
              </div>

              <button 
                onClick={onNavigateFinance}
                className={isTanvir && isTanvirPaid ? "btn btn-secondary" : "btn btn-primary"} 
                style={{ padding: '8px 14px', fontSize: '0.8rem', fontWeight: 700, gap: '6px' }}
              >
                {isTanvir && isTanvirPaid ? (
                  <>
                    <Receipt size={15} color="var(--primary)" /> রসিদ দেখুন
                  </>
                ) : (
                  <>
                    বিকাশ/নগদে দিন <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
              <button 
                onClick={onNavigateReportCard}
                className="btn btn-secondary" 
                style={{ flex: 1, fontSize: '0.8rem', fontWeight: 700 }}
              >
                বার্ষিক পরীক্ষার মার্কশিট ও ফলাফল (PDF)
              </button>
            </div>
          </div>

          {/* Real-Time Push Alerts Feed */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>লাইভ অভিভাবক পুশ নোটিফিকেশন</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface)',
                borderLeft: '3px solid #10b981',
                border: '1px solid var(--border-color)',
                fontSize: '0.8rem'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>১ম পিরিয়ড ও প্রাত্যহিক সমাবেশ নিশ্চিত</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{selectedChild.name} সকাল ০৭:৫০ মিনিটে জাতীয় সংগীত ও সমাবেশে উপস্থিত ছিলেন।</div>
              </div>
              <div style={{
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface)',
                borderLeft: '3px solid #6366f1',
                border: '1px solid var(--border-color)',
                fontSize: '0.8rem'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>মডেল টেস্টের নম্বর অন্তর্ভুক্ত: ৯৪/১০০</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>প্রফেসর লাল মোহাম্মদ পদার্থবিজ্ঞান বিষয়ের পরীক্ষার ফল সংরক্ষণ করেছেন।</div>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Parent-Teacher Messenger */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '480px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '12px',
            marginBottom: '12px'
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Dr. Marcus Sterling</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Class Mentor & STEM Head • Online</div>
            </div>
            <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Encrypted</span>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            paddingRight: '6px'
          }}>
            {chatMessages.map((msg, i) => {
              const isMe = msg.sender === 'parent';
              return (
                <div
                  key={i}
                  style={{
                    alignSelf: isMe ? 'flex-end' : 'flex-start',
                    maxWidth: '82%',
                    backgroundColor: isMe ? 'var(--primary)' : 'var(--bg-surface-subtle)',
                    color: isMe ? '#ffffff' : 'var(--text-main)',
                    borderRadius: isMe ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    padding: '8px 12px',
                    fontSize: '0.8rem',
                    border: isMe ? 'none' : '1px solid var(--border-color)'
                  }}
                >
                  <div>{msg.text}</div>
                  <div style={{ fontSize: '0.62rem', opacity: 0.75, textAlign: 'right', marginTop: '2px' }}>
                    {msg.time}
                  </div>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <input
              type="text"
              value={typedMessage}
              onChange={e => setTypedMessage(e.target.value)}
              placeholder="Message Leo's teacher directly..."
              className="input-control"
              style={{ fontSize: '0.8rem', padding: '8px 12px' }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0 14px' }}>
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
