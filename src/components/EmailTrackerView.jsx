import React, { useState } from 'react';
import { 
  Mail, 
  Eye, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Smartphone, 
  Laptop, 
  ShieldAlert,
  ArrowRight,
  Filter,
  RefreshCw,
  BellRing
} from 'lucide-react';
import { EMAIL_TRACKING_DATA } from '../data/mockData';

export function EmailTrackerView() {
  const [selectedBroadcast, setSelectedBroadcast] = useState(EMAIL_TRACKING_DATA[0]);
  const [reminderSent, setReminderSent] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all'); // all, read, unread

  const handleSendReminder = () => {
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 4000);
  };

  const filteredLogs = selectedBroadcast.readLogs.filter(log => {
    if (filterStatus === 'read') return log.status === 'Read';
    if (filterStatus === 'unread') return log.status === 'Unread';
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Overview & Architecture Header */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.4rem' }}>Notice Board & Email Open-Rate Tracking Engine</h2>
              <span className="badge badge-primary">1x1 Pixel Telemetry</span>
            </div>
            <p style={{ fontSize: '0.875rem', marginTop: '4px' }}>
              Real-time read receipts, client device intelligence, and engagement telemetry for all institutional notices.
            </p>
          </div>

          <button 
            onClick={handleSendReminder}
            className="btn btn-primary"
            style={{ gap: '8px' }}
          >
            <BellRing size={16} />
            Dispatch Push to Unopened (122)
          </button>
        </div>

        {reminderSent && (
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.85rem',
            fontWeight: 600
          }}>
            <CheckCircle2 size={18} />
            Automated SMS & In-App PWA Push reminder dispatched to all 122 parents with unread status!
          </div>
        )}

        {/* 1x1 Pixel Architecture Explainer Pill */}
        <div style={{
          marginTop: '20px',
          padding: '14px 18px',
          backgroundColor: 'var(--bg-surface-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.78rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '18px',
              height: '18px',
              borderRadius: '4px',
              backgroundColor: 'var(--primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.65rem',
              fontWeight: 800
            }}>
              1x1
            </div>
            <div>
              <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Transparent Pixel Injection: </span>
              <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
                &lt;img src="https://oakridge.schoolpulse.io/api/v1/pixel/msg_9a82f.png" width="1" height="1" /&gt;
              </code>
            </div>
          </div>
          <span style={{ color: 'var(--text-muted)' }}>
            Zero third-party dependency • Instant Webhook ingestion to Laravel Redis Queue
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Recipients</span>
            <Mail size={18} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: 'var(--text-main)' }}>
            {selectedBroadcast.recipientsCount.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '4px' }}>
            1,416 Successfully Delivered (99.7%)
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Verified Open Rate</span>
            <Eye size={18} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: '#10b981' }}>
            {selectedBroadcast.openRate}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            {selectedBroadcast.openedCount} Parents Opened
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Median First-Read Time</span>
            <Clock size={18} color="#06b6d4" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: '#06b6d4' }}>
            14.2 Mins
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            From initial dispatch
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Primary Mail Clients</span>
            <Smartphone size={18} color="#ec4899" />
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '8px', color: 'var(--text-main)' }}>
            Apple iOS (58%) • Gmail (34%)
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Outlook & Web Clients (8%)
          </div>
        </div>
      </div>

      {/* Recipient Read-Log Breakdown Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '18px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.2rem' }}>Parent Read Receipts Log</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Subject: <strong>"{selectedBroadcast.subject}"</strong>
            </div>
          </div>

          {/* Filter Pills */}
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--bg-surface-subtle)',
            padding: '3px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <button
              onClick={() => setFilterStatus('all')}
              className="btn"
              style={{
                padding: '4px 10px',
                fontSize: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: filterStatus === 'all' ? 'var(--primary)' : 'transparent',
                color: filterStatus === 'all' ? '#fff' : 'var(--text-muted)'
              }}
            >
              All (5)
            </button>
            <button
              onClick={() => setFilterStatus('read')}
              className="btn"
              style={{
                padding: '4px 10px',
                fontSize: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: filterStatus === 'read' ? 'var(--primary)' : 'transparent',
                color: filterStatus === 'read' ? '#fff' : 'var(--text-muted)'
              }}
            >
              Read (4)
            </button>
            <button
              onClick={() => setFilterStatus('unread')}
              className="btn"
              style={{
                padding: '4px 10px',
                fontSize: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: filterStatus === 'unread' ? 'var(--primary)' : 'transparent',
                color: filterStatus === 'unread' ? '#fff' : 'var(--text-muted)'
              }}
            >
              Unread (1)
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 14px' }}>Parent & Guardian</th>
                <th style={{ padding: '12px 14px' }}>Associated Ward</th>
                <th style={{ padding: '12px 14px' }}>Delivery Status</th>
                <th style={{ padding: '12px 14px' }}>First Opened Time</th>
                <th style={{ padding: '12px 14px' }}>Open Count</th>
                <th style={{ padding: '12px 14px' }}>Detected Client</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Follow-up</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-main)' }}>
                    {log.parentName}
                  </td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>
                    {log.student}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    {log.status === 'Read' ? (
                      <span className="badge badge-success">
                        <CheckCircle2 size={11} /> Read Confirmed
                      </span>
                    ) : (
                      <span className="badge badge-danger">
                        <AlertCircle size={11} /> Unopened
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: log.status === 'Read' ? 'var(--text-main)' : 'var(--text-subtle)' }}>
                    {log.openedAt}
                  </td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: log.opensCount > 0 ? 'var(--primary)' : 'var(--text-subtle)' }}>
                    {log.opensCount > 0 ? `${log.opensCount} times` : '0'}
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {log.client}
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    {log.status === 'Unread' ? (
                      <button 
                        onClick={() => alert(`Direct SMS alert dispatched to ${log.parentName}`)}
                        className="btn btn-secondary" 
                        style={{ padding: '4px 8px', fontSize: '0.72rem', color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.3)' }}
                      >
                        Send SMS Alert
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#10b981' }}>Acknowledged</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
