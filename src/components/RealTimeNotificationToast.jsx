import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Radio, 
  UserCheck, 
  Award,
  DollarSign
} from 'lucide-react';

export function RealTimeNotificationToast({ toasts, onDismissToast, onSimulateEvent }) {
  return (
    <div style={{
      position: 'fixed',
      top: '70px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '380px',
      pointerEvents: 'none'
    }}>
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="glass-panel animate-fade-in"
          style={{
            pointerEvents: 'auto',
            padding: '12px 16px',
            backgroundColor: 'var(--bg-surface-elevated)',
            borderLeft: `4px solid ${toast.type === 'marks' ? '#6366f1' : toast.type === 'attendance' ? '#10b981' : '#f59e0b'}`,
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            border: '1px solid var(--border-color)'
          }}
        >
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: toast.type === 'marks' ? 'rgba(99, 102, 241, 0.15)' : toast.type === 'attendance' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            color: toast.type === 'marks' ? '#6366f1' : toast.type === 'attendance' ? '#10b981' : '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {toast.type === 'marks' && <Award size={16} />}
            {toast.type === 'attendance' && <UserCheck size={16} />}
            {toast.type === 'finance' && <DollarSign size={16} />}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>
                {toast.channel}
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-subtle)' }}>
                {toast.time}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
              {toast.title}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {toast.message}
            </div>
          </div>

          <button
            onClick={() => onDismissToast(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '2px'
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
