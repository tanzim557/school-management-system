import React from 'react';
import { 
  DollarSign, 
  CreditCard, 
  Receipt, 
  TrendingUp, 
  AlertCircle, 
  Download, 
  Building, 
  CheckCircle2,
  PieChart,
  ArrowUpRight
} from 'lucide-react';
import { INVOICES_DATA } from '../../data/mockData';

export function AccountantDashboard({ onNavigateFinance }) {
  const feeStructures = [
    { grade: "প্রাথমিক স্তর (১ম - ৫ম শ্রেণি)", tuition: "৳ ১,২০০ / মাস", lab: "৳ ০", sports: "৳ ১০০", lateFeeRule: "৭ দিন পর ৳ ৫০ জরিমানা" },
    { grade: "নিম্ন মাধ্যমিক (৬ষ্ঠ - ৮ম শ্রেণি)", tuition: "৳ ১,৬০০ / মাস", lab: "৳ ১৫০", sports: "৳ ১৫০", lateFeeRule: "৭ দিন পর ৳ ৫০ জরিমানা" },
    { grade: "মাধ্যমিক স্তর (৯ম - ১০ম শ্রেণি বিজ্ঞান)", tuition: "৳ ২,০০০ / মাস", lab: "৳ ৩০০", sports: "৳ ২০০", lateFeeRule: "৭ দিন পর ৳ ১০০ জরিমানা" },
    { grade: "উচ্চ মাধ্যমিক (একাদশ - দ্বাদশ বিজ্ঞান)", tuition: "৳ ২,৮০০ / মাস", lab: "৳ ৫০০", sports: "৳ ২৫০", lateFeeRule: "৭ দিন পর ৳ ১০০ জরিমানা" }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Financial Health Header */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.4rem' }}>প্রধান হিসাবরক্ষণ ও ক্যাশিয়ার লেজার টার্মিনাল</h2>
              <span className="badge badge-success">সরকারি অডিট ভেরিফায়েড</span>
            </div>
            <p style={{ fontSize: '0.85rem', marginTop: '2px' }}>
              আইডিয়াল স্কুল অ্যান্ড কলেজ • শ্রেণিভিত্তিক মাসিক বেতন, ল্যাব ফি, জরিমানা বিধি ও পেমেন্ট গেটওয়ে হিসাব খাতা।
            </p>
          </div>

          <button onClick={onNavigateFinance} className="btn btn-primary" style={{ gap: '8px', fontWeight: 700 }}>
            <Receipt size={16} /> ইনভয়েসিং ও ক্যাশ লেজার খুলুন
          </button>
        </div>
      </div>

      {/* Gateway Settlement Matrix */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px'
      }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>বিকাশ (bKash) মোট কালেকশন</span>
            <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>অটো-ডিপোজিট</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '8px', color: 'var(--text-main)' }}>
            ৳ ১৮,৪৫,২৫০
          </div>
          <div style={{ fontSize: '0.72rem', color: '#10b981', marginTop: '4px' }}>
            তাৎক্ষণিক এমএফএস ওয়েবহুক রিকনসিলিয়েশন • শূন্য চার্জব্যাক
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>নগদ ও সোনালী ব্যাংক ই-সেবা</span>
            <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>টি+১ নিষ্পত্তি</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '8px', color: 'var(--text-main)' }}>
            ৳ ৬,৪৯,০০০
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            সরাসরি ব্যাংক চালান ও সরকারি কোষাগার লিংক
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>আদায়কৃত বিলম্ব জরিমানা</span>
            <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>জরিমানা খাতা</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '8px', color: '#f43f5e' }}>
            ৳ ১৪,২০০
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            ৭ দিন গ্রেস পিরিয়ডের পর সফটওয়্যার স্বয়ংক্রিয়ভাবে যুক্ত করে
          </div>
        </div>
      </div>

      {/* Institutional Fee Structures Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>অনুমোদিত প্রাতিষ্ঠানিক বেতন কাঠামো ও বিলম্ব ফি নীতিমালা</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 14px' }}>শ্রেণি ও স্তর</th>
                <th style={{ padding: '12px 14px' }}>মাসিক বেতন</th>
                <th style={{ padding: '12px 14px' }}>আইসিটি ও বিজ্ঞান ল্যাব</th>
                <th style={{ padding: '12px 14px' }}>খেলাধুলা ও স্কাউট</th>
                <th style={{ padding: '12px 14px' }}>স্বয়ংক্রিয় বিলম্ব ফি নিয়ম</th>
              </tr>
            </thead>
            <tbody>
              {feeStructures.map((f, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--text-main)' }}>
                    {f.grade}
                  </td>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--primary)' }}>
                    {f.tuition}
                  </td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>
                    {f.lab}
                  </td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>
                    {f.sports}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
                      {f.lateFeeRule}
                    </span>
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
