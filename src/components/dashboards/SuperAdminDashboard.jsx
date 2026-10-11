import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Activity, 
  Server, 
  ShieldCheck, 
  Plus, 
  Database, 
  Globe, 
  ExternalLink,
  Cpu,
  HardDrive,
  RefreshCw,
  UserPlus
} from 'lucide-react';
import { SUPER_ADMIN_DATA, INSTITUTION } from '../../data/mockData';
import { AccountManagementModal } from '../AccountManagementModal';
import { getAdmissions } from '../../data/authManager';

export function SuperAdminDashboard({ onOpenRoutine, onOpenReportCard }) {
  const [tenants, setTenants] = useState(SUPER_ADMIN_DATA.tenants);
  const [showNewTenantModal, setShowNewTenantModal] = useState(false);
  const [showAccountDeskModal, setShowAccountDeskModal] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newSubdomain, setNewSubdomain] = useState('');

  const admissions = getAdmissions();
  const pendingAdmissionsCount = admissions.filter(a => a.status === 'Pending').length;

  const handleCreateTenant = (e) => {
    e.preventDefault();
    if (!newSchoolName || !newSubdomain) return;

    const newTenant = {
      id: `t${tenants.length + 1}`,
      name: newSchoolName,
      domain: `${newSubdomain}.schoolpulse.io`,
      students: 450,
      plan: "Enterprise Tier",
      status: "Active",
      dbHealth: "Provisioned"
    };

    setTenants([newTenant, ...tenants]);
    setNewSchoolName('');
    setNewSubdomain('');
    setShowNewTenantModal(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* SaaS Health & Multi-Tenant KPI Banner */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active School Tenants</span>
            <Building2 size={18} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: 'var(--text-main)' }}>
            {tenants.length} Schools
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '4px' }}>
            Multi-Tenant PostgreSQL Schemas
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Students Enrolled</span>
            <Users size={18} color="#06b6d4" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: '#06b6d4' }}>
            {SUPER_ADMIN_DATA.activeStudentsAcrossTenants.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            Across all 48 tenant databases
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Monthly Recurring Rev</span>
            <DollarSign size={18} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: '#10b981' }}>
            {SUPER_ADMIN_DATA.totalMRR}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '4px' }}>
            +18.4% growth this quarter
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Platform Edge Latency</span>
            <Activity size={18} color="#ec4899" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: '#ec4899' }}>
            {SUPER_ADMIN_DATA.avgApiLatency}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            Vercel Global Edge CDN
          </div>
        </div>
      </div>

      {/* Admission Approvals & ID Generation Management Hub */}
      <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #1e3a8a' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 800, color: 'var(--text-main)' }}>
                অনলাইন ভর্তি আবেদন অনুমোদন ও আইডি তৈরি হাব
              </h3>
              {pendingAdmissionsCount > 0 && (
                <span style={{ backgroundColor: '#f43f5e', color: '#fff', fontSize: '0.74rem', fontWeight: 800, padding: '2px 8px', borderRadius: '12px' }}>
                  {pendingAdmissionsCount} টি আবেদন অপেক্ষমাণ
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              শিক্ষার্থীর ভর্তি অনুমোদন (স্বয়ংক্রিয় স্টুডেন্ট আইডি ও পাসওয়ার্ড জেনারেশন + অভিভাবকের ফোনে SMS নোটিফিকেশন), বিষয়ভিত্তিক শিক্ষক পদায়ন ও আইডি তৈরি।
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setShowAccountDeskModal(true)}
              className="btn btn-primary"
              style={{ gap: '8px', fontWeight: 700 }}
            >
              <UserPlus size={16} /> আইডি তৈরি ও অনুমোদন হাব খুলুন
            </button>
          </div>
        </div>
      </div>

      {/* Tenant Management Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem' }}>Provisioned School Tenants (Multi-Tenancy)</h3>
            <p style={{ fontSize: '0.825rem', marginTop: '2px' }}>
              Isolated PostgreSQL schemas with custom subdomain and DNS domain mapping.
            </p>
          </div>

          <button 
            onClick={() => setShowNewTenantModal(true)}
            className="btn btn-primary"
            style={{ gap: '8px' }}
          >
            <Plus size={16} /> Provision New School Tenant
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 14px' }}>Institution Name</th>
                <th style={{ padding: '12px 14px' }}>Tenant Subdomain</th>
                <th style={{ padding: '12px 14px' }}>Student Body</th>
                <th style={{ padding: '12px 14px' }}>SaaS Subscription</th>
                <th style={{ padding: '12px 14px' }}>Schema Status</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Portal Action</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '14px', fontWeight: 700, color: 'var(--text-main)' }}>
                    {t.name}
                  </td>
                  <td style={{ padding: '14px', fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
                    {t.domain}
                  </td>
                  <td style={{ padding: '14px', color: 'var(--text-muted)' }}>
                    {t.students.toLocaleString()} Students
                  </td>
                  <td style={{ padding: '14px' }}>
                    <span className="badge badge-primary">{t.plan}</span>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <span className="badge badge-success">
                      <Database size={11} /> {t.dbHealth}
                    </span>
                  </td>
                  <td style={{ padding: '14px', textAlign: 'right' }}>
                    <button 
                      onClick={() => alert(`Switching context to ${t.name} admin dashboard`)}
                      className="btn btn-secondary" 
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      Inspect Portal <ExternalLink size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tenant Provisioning Modal */}
      {showNewTenantModal && (
        <div className="modal-overlay" onClick={() => setShowNewTenantModal(false)}>
          <div 
            className="glass-panel animate-fade-in"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '480px',
              width: '100%',
              backgroundColor: 'var(--bg-surface-elevated)',
              padding: '24px',
              borderRadius: 'var(--radius-xl)'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Provision New School Tenant</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
              Automatically spins up an isolated PostgreSQL tenant schema, migrates baseline seeders, and routes DNS.
            </p>

            <form onSubmit={handleCreateTenant} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  School Legal Entity Name
                </label>
                <input
                  type="text"
                  placeholder="যেমন: আইডিয়াল স্কুল অ্যান্ড কলেজ (বনশ্রী শাখা)"
                  value={newSchoolName}
                  onChange={e => setNewSchoolName(e.target.value)}
                  className="input-control"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  Desired Subdomain
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="text"
                    placeholder="cambridge"
                    value={newSubdomain}
                    onChange={e => setNewSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="input-control"
                    required
                  />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    .schoolpulse.io
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowNewTenantModal(false)} 
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Spin Up Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Account Management & Admission Approval Modal */}
      <AccountManagementModal 
        isOpen={showAccountDeskModal}
        onClose={() => setShowAccountDeskModal(false)}
      />
    </div>
  );
}
