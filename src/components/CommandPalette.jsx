import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  User, 
  Calendar, 
  FileText, 
  CreditCard, 
  Mail, 
  Sparkles, 
  ArrowRight,
  Command,
  CornerDownLeft
} from 'lucide-react';
import { SPOTLIGHT_ITEMS } from '../data/mockData';

export function CommandPalette({ isOpen, onClose, onNavigateTab, onSelectRole }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Filter items based on query
  const filteredItems = SPOTLIGHT_ITEMS.filter(item => {
    const q = query.toLowerCase();
    return item.title.toLowerCase().includes(q) ||
           item.category.toLowerCase().includes(q) ||
           item.detail.toLowerCase().includes(q);
  });

  // Handle keyboard shortcuts (Ctrl+K, Esc, Arrow Up/Down, Enter)
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled externally
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        executeItem(filteredItems[selectedIndex]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const executeItem = (item) => {
    if (item.linkRole) {
      onSelectRole(item.linkRole);
    }
    if (item.linkTab) {
      onNavigateTab(item.linkTab);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="glass-panel animate-fade-in"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: 'var(--bg-surface-elevated)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg), 0 0 50px rgba(99, 102, 241, 0.25)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-surface)'
        }}>
          <Search size={20} color="var(--primary)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a student name, class, invoice, or tool action..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-main)',
              fontSize: '1rem',
              fontWeight: 500
            }}
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          )}
          <kbd style={{
            fontSize: '0.7rem',
            padding: '2px 6px',
            borderRadius: '4px',
            background: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-subtle)',
            fontFamily: 'var(--font-mono)'
          }}>
            ESC to exit
          </kbd>
        </div>

        {/* Results Container */}
        <div style={{
          maxHeight: '380px',
          overflowY: 'auto',
          padding: '8px'
        }}>
          {filteredItems.length === 0 ? (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ marginBottom: '8px', color: '#9ca3af' }}><Search size={26} /></div>
              <div style={{ fontWeight: 600 }}>No matching records found</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                Try searching for "Leo", "Physics", "Routine", "Report Card", or "Invoice"
              </div>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => executeItem(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--badge-bg)' : 'transparent',
                    border: isSelected ? '1px solid rgba(99, 102, 241, 0.25)' : '1px solid transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all var(--duration-fast) ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg-surface-subtle)',
                      color: isSelected ? '#ffffff' : 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {item.category === 'Students' && <User size={16} />}
                      {item.category === 'Faculty' && <User size={16} />}
                      {item.category === 'Academic Tools' && <Calendar size={16} />}
                      {item.category === 'Finance' && <CreditCard size={16} />}
                      {item.category === 'Analytics' && <Mail size={16} />}
                      {item.category === 'AI Assistant' && <Sparkles size={16} />}
                      {item.category === 'System' && <Command size={16} />}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: isSelected ? 'var(--primary)' : 'var(--text-main)'
                      }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {item.detail}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
                      {item.category}
                    </span>
                    {isSelected && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--primary)', fontSize: '0.75rem' }}>
                        <CornerDownLeft size={12} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hotkeys Guide */}
        <div style={{
          padding: '10px 16px',
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-surface-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--text-subtle)'
        }}>
          <div style={{ display: 'flex', gap: '14px' }}>
            <span>↑↓ Navigate</span>
            <span>↵ Select Action</span>
            <span>ESC Close</span>
          </div>
          <div>
            SchoolPulse Spotlight Engine
          </div>
        </div>
      </div>
    </div>
  );
}
