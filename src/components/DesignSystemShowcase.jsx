import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  Box, 
  Layers, 
  Sparkles, 
  Check, 
  Copy, 
  Eye, 
  ToggleLeft,
  ToggleRight,
  Sun,
  Moon,
  Zap
} from 'lucide-react';

export function DesignSystemShowcase({ theme, toggleTheme }) {
  const [showSkeletonDemo, setShowSkeletonDemo] = useState(false);
  const [copiedToken, setCopiedToken] = useState(null);

  const colors = [
    { name: "Primary Brand", hex: "#4f46e5", token: "--primary", hsl: "hsl(243, 75%, 59%)", desc: "Core interactive buttons & navigation accents" },
    { name: "Accent Violet", hex: "#8b5cf6", token: "--accent-purple", hsl: "hsl(258, 90%, 66%)", desc: "Academic badges & spotlight gradients" },
    { name: "Accent Pink", hex: "#ec4899", token: "--accent-pink", hsl: "hsl(330, 81%, 60%)", desc: "Urgent announcements & event highlights" },
    { name: "Cyan Horizon", hex: "#06b6d4", token: "--accent-cyan", hsl: "hsl(189, 94%, 43%)", desc: "STEM subjects & computer science modules" },
    { name: "Success Emerald", hex: "#10b981", token: "--accent-emerald", hsl: "hsl(160, 84%, 39%)", desc: "Paid invoices & attendance confirmations" },
    { name: "Warning Amber", hex: "#f59e0b", token: "--accent-amber", hsl: "hsl(38, 92%, 50%)", desc: "Pending fees & schedule warnings" },
    { name: "Danger Rose", hex: "#f43f5e", token: "--accent-rose", hsl: "hsl(347, 89%, 60%)", desc: "Overdue fines & collision alerts" }
  ];

  const handleCopy = (token) => {
    navigator.clipboard?.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Design System Header */}
      <div className="glass-panel" style={{ padding: '26px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.5rem' }}>SchoolPulse Figma Design System & Token Lab</h2>
              <span className="badge badge-primary">Version 2.0 Tokens</span>
            </div>
            <p style={{ fontSize: '0.875rem', marginTop: '4px' }}>
              Living design specification honoring the Sprint 0 requirement: tokens, typography scales, glassmorphism, and skeleton loaders.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={toggleTheme}
              className="btn btn-secondary"
              style={{ gap: '6px' }}
            >
              {theme === 'dark' ? <Sun size={15} color="#f59e0b" /> : <Moon size={15} color="#6366f1" />}
              {theme === 'dark' ? 'Light Tokens' : 'Dark Tokens'}
            </button>

            <button
              onClick={() => setShowSkeletonDemo(!showSkeletonDemo)}
              className="btn btn-primary"
              style={{ gap: '6px' }}
            >
              <Zap size={15} />
              {showSkeletonDemo ? 'Switch to Loaded States' : 'Preview Skeleton Loaders'}
            </button>
          </div>
        </div>
      </div>

      {/* Section 1: Curated HSL Color Tokens */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Palette size={20} color="var(--primary)" />
          <h3 style={{ fontSize: '1.25rem' }}>Curated HSL Color Palette</h3>
        </div>
        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
          Tailored HSL values with automatic Dark/Light contrast adjustment according to WCAG 2.1 AA specifications.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px'
        }}>
          {colors.map((c, i) => (
            <div
              key={i}
              onClick={() => handleCopy(c.token)}
              style={{
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ height: '70px', backgroundColor: c.hex, position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  bottom: '6px',
                  right: '8px',
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  color: '#fff',
                  borderRadius: '4px',
                  padding: '1px 6px',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {c.hex}
                </span>
              </div>
              <div style={{ padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>{c.name}</span>
                  {copiedToken === c.token ? <Check size={14} color="#10b981" /> : <Copy size={13} color="var(--text-subtle)" />}
                </div>
                <code style={{ fontSize: '0.72rem', color: 'var(--primary)', fontFamily: 'var(--font-mono)', display: 'block', marginTop: '2px' }}>
                  var({c.token})
                </code>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {c.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Typography Specimen */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Type size={20} color="var(--primary)" />
          <h3 style={{ fontSize: '1.25rem' }}>Modern Typography Scales</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>Display Heading (Outfit 800) • 2.2rem</span>
            <h1 style={{ fontSize: '2.2rem', marginTop: '4px' }}>Excellence in Academic SaaS Platforms</h1>
          </div>
          <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>Section Heading (Outfit 700) • 1.5rem</span>
            <h2 style={{ fontSize: '1.5rem', marginTop: '4px' }}>Automated Gradebook & Real-Time Sync</h2>
          </div>
          <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>Body Text (Plus Jakarta Sans 500) • 0.95rem</span>
            <p style={{ fontSize: '0.95rem', marginTop: '4px', maxWidth: '800px' }}>
              SchoolPulse provides a complete 100% web-based foundation for educational institutions. Every interaction is designed with high tactile fidelity, sub-50ms spotlight searches, and instant push alerts.
            </p>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>Mono Identifiers (JetBrains Mono) • 0.8rem</span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--primary)', marginTop: '4px' }}>
              AUTH_TOKEN_SHA256: 8a91f4b238d9 • POSTGRES_TENANT_SCHEMA: tenant_oakridge_981
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Skeleton Loaders & Interactive Primitives */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Box size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.25rem' }}>Component Primitives & Skeleton Loading States</h3>
          </div>
          <span className="badge badge-primary">Requirement 3: Usability</span>
        </div>

        {showSkeletonDemo ? (
          /* SKELETON DEMO STATE */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>
              Simulated Live Data-Fetching Skeleton (Async Suspense State)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="skeleton" style={{ width: '45%', height: '18px' }} />
                <div className="skeleton" style={{ width: '70%', height: '14px' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '10px' }}>
              <div className="skeleton" style={{ height: '80px', borderRadius: 'var(--radius-md)' }} />
              <div className="skeleton" style={{ height: '80px', borderRadius: 'var(--radius-md)' }} />
              <div className="skeleton" style={{ height: '80px', borderRadius: 'var(--radius-md)' }} />
            </div>
            <div className="skeleton" style={{ width: '100%', height: '120px', borderRadius: 'var(--radius-md)', marginTop: '6px' }} />
          </div>
        ) : (
          /* LOADED COMPONENT SPECIMEN */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Buttons */}
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Button Hierarchy</span>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                <button className="btn btn-primary">Primary Action</button>
                <button className="btn btn-secondary">Secondary Action</button>
                <button className="btn btn-ghost">Ghost Action</button>
                <button className="btn btn-primary" style={{ gap: '6px' }}>
                  <Sparkles size={15} /> With Icon
                </button>
              </div>
            </div>

            {/* Badges */}
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Status Badges</span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                <span className="badge badge-primary">Primary Tag</span>
                <span className="badge badge-success">Verified Active</span>
                <span className="badge badge-warning">Due Soon</span>
                <span className="badge badge-danger">Overdue</span>
                <span className="badge badge-info">ℹ Information</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
