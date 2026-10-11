import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  ArrowUpRight, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Receipt, 
  FileCheck, 
  X, 
  Landmark, 
  Building2, 
  Smartphone, 
  QrCode, 
  Printer, 
  RefreshCw, 
  Copy, 
  Check, 
  ExternalLink, 
  FileText, 
  Clock, 
  ArrowLeft 
} from 'lucide-react';
import { INVOICES_DATA, INSTITUTION } from '../data/mockData';

// Helper to convert BDT amounts to formal Bangla Words for official receipts
function convertAmountToBanglaWords(amount) {
  const wordsMap = {
    3200: "তিন হাজার দুইশত টাকা মাত্র",
    1850: "এক হাজার আটশত পঞ্চাশ টাকা মাত্র",
    1650: "এক হাজার ছয়শত পঞ্চাশ টাকা মাত্র",
    1500: "এক হাজার পাঁচশত টাকা মাত্র",
    1200: "এক হাজার দুইশত টাকা মাত্র",
    3000: "তিন হাজার টাকা মাত্র",
    2500: "দুই হাজার পাঁচশত টাকা মাত্র",
    2000: "দুই হাজার টাকা মাত্র",
    1000: "এক হাজার টাকা মাত্র"
  };

  if (wordsMap[amount]) {
    return wordsMap[amount];
  }

  // Generic fallback converter
  const ones = ["", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়", "সাত", "আট", "নয়"];
  const thousands = Math.floor(amount / 1000);
  const hundreds = Math.floor((amount % 1000) / 100);
  const remainder = amount % 100;

  let result = "";
  if (thousands > 0) {
    result += (ones[thousands] || thousands) + " হাজার ";
  }
  if (hundreds > 0) {
    result += (ones[hundreds] || hundreds) + " শত ";
  }
  if (remainder > 0) {
    result += remainder + " ";
  }
  return (result.trim() || amount) + " টাকা মাত্র";
}

export function FinanceBillingView({ invoices: propInvoices, onUpdateInvoices, onTriggerNotification }) {
  // Initialize invoices from localStorage if available, or fall back to mock data
  const [invoices, setInvoices] = useState(() => {
    if (propInvoices && propInvoices.length > 0) return propInvoices;
    const saved = localStorage.getItem('schoolpulse_invoices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INVOICES_DATA;
  });

  // Sync if propInvoices changes
  useEffect(() => {
    if (propInvoices && propInvoices.length > 0) {
      setInvoices(propInvoices);
    }
  }, [propInvoices]);

  // Payment Checkout Modal State
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Account, 2: OTP, 3: PIN, 4: Success
  const [paymentMethod, setPaymentMethod] = useState('bkash'); // 'bkash', 'nagad', 'bank'
  const [accountNumber, setAccountNumber] = useState('01711-489201');
  const [otpCode, setOtpCode] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedTrxId, setGeneratedTrxId] = useState('');
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Official Money Receipt (মানি রসিদ) Modal State
  const [activeReceiptInvoice, setActiveReceiptInvoice] = useState(null);

  // Save invoices to localStorage and parent whenever state updates
  const updateAndSaveInvoices = (newInvoices) => {
    setInvoices(newInvoices);
    localStorage.setItem('schoolpulse_invoices', JSON.stringify(newInvoices));
    if (onUpdateInvoices) {
      onUpdateInvoices(newInvoices);
    }
  };

  // Open Checkout Modal
  const handleOpenCheckout = (inv) => {
    setSelectedInvoice(inv);
    setCheckoutStep(1);
    setAccountNumber('01711-489201');
    setOtpCode('');
    setPinCode('');
    setIsProcessing(false);
    setGeneratedTrxId('');
  };

  // Step 1 -> Step 2: Request OTP
  const handleRequestOtp = (e) => {
    e.preventDefault();
    if (!accountNumber || accountNumber.length < 10) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep(2);
    }, 600);
  };

  // Step 2 -> Step 3: Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep(3);
    }, 600);
  };

  // Step 3 -> Step 4: Process Payment & Finalize
  const handleFinalizePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const prefix = paymentMethod === 'bkash' ? 'BK' : paymentMethod === 'nagad' ? 'NG' : 'SB';
    const newTrxId = `${prefix}${randomNum}`;
    const timestamp = new Date().toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const methodName = paymentMethod === 'bkash' 
      ? `বিকাশ গেটওয়ে (${accountNumber.slice(0, 5)}•••••)` 
      : paymentMethod === 'nagad' 
      ? `নগদ এমএফএস (${accountNumber.slice(0, 5)}•••••)` 
      : `সোনালী ব্যাংক ই-সেবা (${accountNumber.slice(0, 5)}•••••)`;

    setTimeout(() => {
      setIsProcessing(false);
      setGeneratedTrxId(newTrxId);
      setCheckoutStep(4);

      // Update state and persistence
      const updated = invoices.map(item => {
        if (item.id === selectedInvoice.id) {
          return {
            ...item,
            status: 'Paid',
            paidDate: `${timestamp}, দুপুর ০১:৪৫`,
            method: methodName,
            trxId: newTrxId,
            paidAmount: item.amount + (item.fineAmount || 0)
          };
        }
        return item;
      });

      updateAndSaveInvoices(updated);

      // Trigger real-time system toast
      if (onTriggerNotification) {
        onTriggerNotification({
          id: `pay-${Date.now()}`,
          type: 'finance',
          channel: 'পেমেন্ট গেটওয়ে (Webhook)',
          time: 'এইমাত্র',
          title: 'ফি পরিশোধ সফল হয়েছে',
          message: `${selectedInvoice.studentName}-এর ৳ ${(selectedInvoice.amount + (selectedInvoice.fineAmount || 0)).toLocaleString()} টাকা জমা হয়েছে (TrxID: ${newTrxId})।`
        });
      }
    }, 1200);
  };

  // Reset Demo Invoices
  const handleResetDemoData = () => {
    if (window.confirm('আপনি কি টেস্ট ডাটা রিসেট করে আগের অবস্থায় ফিরে যেতে চান?')) {
      updateAndSaveInvoices(INVOICES_DATA);
    }
  };

  // Copy TrxID helper
  const handleCopyTrxId = (id) => {
    navigator.clipboard.writeText(id);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 1800);
  };

  // Metrics
  const totalInvoiced = invoices.reduce((acc, i) => acc + i.amount + (i.fineAmount || 0), 0);
  const totalCollected = invoices.filter(i => i.status === 'Paid').reduce((acc, i) => acc + i.amount + (i.fineAmount || 0), 0);
  const totalPending = totalInvoiced - totalCollected;

  // The active invoice object when viewing payment receipt
  const currentReceiptData = activeReceiptInvoice ? (
    invoices.find(i => i.id === activeReceiptInvoice.id) || activeReceiptInvoice
  ) : null;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Metrics Banner */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px'
      }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>মোট ধার্যকৃত ফি (Total Billed)</span>
            <Receipt size={20} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: 'var(--text-main)' }}>
            ৳ {totalInvoiced.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            শিক্ষাবর্ষ ২০২৬ • সেশন ও মাসিক বেতন
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>মোট সংগৃহীত ফি (Collected)</span>
            <CheckCircle2 size={20} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: '#10b981' }}>
            ৳ {totalCollected.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '4px' }}>
            বিকাশ, নগদ ও সোনালী ব্যাংকে তাৎক্ষণিক জমা
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>বকেয়া পাওনা (Pending Dues)</span>
            <AlertCircle size={20} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: '#f59e0b' }}>
            ৳ {totalPending.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            বিলম্ব ফি সহ মোট অবশিষ্ট প্রদেয়
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>বিলম্ব ফি নীতিমালা</span>
            <ShieldCheck size={20} color="var(--accent-purple)" />
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '8px', color: 'var(--text-main)' }}>
            ৳ ৫০.০০ / সপ্তাহ
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            নির্ধারিত তারিখের ৭ দিন পর স্বয়ংক্রিয়ভাবে যোগ হবে
          </div>
        </div>
      </div>

      {/* 2. Invoices Ledger Card */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>শ্রেণিভিত্তিক টিউশন ফি ও চালান খাতা (Billing Ledger)</h3>
              <span className="badge badge-success">বাংলাদেশ ব্যাংক গেটওয়ে সংযুক্ত</span>
            </div>
            <p style={{ fontSize: '0.825rem', marginTop: '4px', color: 'var(--text-muted)' }}>
              বিকাশ (bKash), নগদ (Nagad) ও সোনালী ব্যাংক ই-সেবা সমন্বিত সরাসরি শিক্ষার্থী ফি আদায় ব্যবস্থা।
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button 
              onClick={handleResetDemoData}
              className="btn btn-secondary" 
              style={{ fontSize: '0.8rem', gap: '6px' }}
              title="টেস্ট ডাটা আগের অবস্থায় ফিরিয়ে আনুন"
            >
              <RefreshCw size={13} /> রিসেট টেস্ট ডাটা
            </button>
            <button 
              onClick={() => alert('আইডিয়াল স্কুল অ্যান্ড কলেজ আর্থিক অডিট রিপোর্ট (CSV) এক্সপোর্ট সম্পন্ন হয়েছে।')}
              className="btn btn-secondary" 
              style={{ fontSize: '0.8rem', gap: '6px' }}
            >
              <Download size={14} /> লেজার এক্সপোর্ট (CSV)
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 14px' }}>চালান নং (Invoice)</th>
                <th style={{ padding: '12px 14px' }}>শিক্ষার্থীর বিবরণ</th>
                <th style={{ padding: '12px 14px' }}>ফি এর খাত</th>
                <th style={{ padding: '12px 14px' }}>পরিশোধের শেষ তারিখ</th>
                <th style={{ padding: '12px 14px' }}>মোট ফি</th>
                <th style={{ padding: '12px 14px' }}>বর্তমান স্থিতি</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>অ্যাকশন (Action)</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => {
                const totalDue = inv.amount + (inv.fineAmount || 0);
                const isPaid = inv.status === 'Paid';

                return (
                  <tr key={inv.id} style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                    <td style={{ padding: '14px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary)' }}>
                      {inv.id}
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{inv.studentName}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{inv.studentId}</div>
                    </td>
                    <td style={{ padding: '14px', color: 'var(--text-main)', maxWidth: '240px' }}>
                      {inv.category}
                    </td>
                    <td style={{ padding: '14px', color: 'var(--text-muted)' }}>
                      {inv.dueDate}
                    </td>
                    <td style={{ padding: '14px', fontWeight: 800, color: 'var(--text-main)' }}>
                      ৳ {totalDue.toLocaleString()}
                      {inv.fineAmount > 0 && (
                        <span style={{ display: 'block', fontSize: '0.7rem', color: '#f43f5e', fontWeight: 700 }}>
                          (বিলম্ব ফি ৳ {inv.fineAmount} সহ)
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '14px' }}>
                      {isPaid && (
                        <span className="badge badge-success" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                          <CheckCircle2 size={12} /> পরিশোধিত
                        </span>
                      )}
                      {inv.status === 'Pending' && (
                        <span className="badge badge-warning" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                          <Calendar size={12} /> চলতি বকেয়া
                        </span>
                      )}
                      {inv.status === 'Overdue' && (
                        <span className="badge badge-danger" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                          <AlertCircle size={12} /> বিলম্বিত (+১৫ দিন)
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'center' }}>
                      {isPaid ? (
                        <button 
                          onClick={() => setActiveReceiptInvoice(inv)}
                          className="btn btn-secondary" 
                          style={{ 
                            padding: '6px 14px', 
                            fontSize: '0.8rem', 
                            fontWeight: 700,
                            color: '#0f172a',
                            borderColor: '#cbd5e1',
                            display: 'inline-flex',
                            gap: '6px',
                            alignItems: 'center',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                          }}
                          title="অফিসিয়াল মানি রসিদ দেখুন ও প্রিন্ট করুন"
                        >
                          <Receipt size={15} color="#4338ca" /> রসিদ
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleOpenCheckout(inv)}
                          className="btn btn-primary" 
                          style={{ 
                            padding: '7px 14px', 
                            fontSize: '0.82rem', 
                            fontWeight: 700,
                            display: 'inline-flex',
                            gap: '6px',
                            alignItems: 'center'
                          }}
                        >
                          বিকাশ/নগদে দিন <ArrowUpRight size={15} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Authentic Bangladeshi MFS Payment Checkout Modal */}
      {selectedInvoice && (
        <div className="modal-overlay" onClick={() => !isProcessing && setSelectedInvoice(null)}>
          <div 
            className="animate-fade-in"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '520px',
              width: '100%',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.3)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Modal Header with Dynamic Brand Accent */}
            <div style={{
              background: paymentMethod === 'bkash' 
                ? 'linear-gradient(135deg, #e2136e 0%, #be123c 100%)' 
                : paymentMethod === 'nagad' 
                ? 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)' 
                : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              padding: '20px 24px',
              color: '#ffffff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    {paymentMethod === 'bkash' ? <Smartphone size={20} /> : paymentMethod === 'nagad' ? <Zap size={20} /> : <Building2 size={20} />}
                  </span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.01em' }}>
                    {paymentMethod === 'bkash' ? 'বিকাশ পেমেন্ট গেটওয়ে' : paymentMethod === 'nagad' ? 'নগদ ডিজিটাল লেনদেন' : 'সোনালী ব্যাংক ই-সেবা'}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: '4px' }}>
                  মার্চেন্ট: আইডিয়াল স্কুল অ্যান্ড কলেজ (EIIN: ১০৮২৭৫)
                </div>
              </div>

              <button 
                onClick={() => !isProcessing && setSelectedInvoice(null)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px' }}>
              
              {/* Step 4: SUCCESS CONFIRMATION */}
              {checkoutStep === 4 ? (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    backgroundColor: '#ecfdf5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    border: '3px solid #a7f3d0'
                  }}>
                    <CheckCircle2 size={40} />
                  </div>

                  <h3 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 800 }}>আলহামদুলিল্লাহ! ফি পরিশোধ সফল হয়েছে</h3>
                  <p style={{ fontSize: '0.875rem', marginTop: '6px', color: '#475569' }}>
                    <strong>৳ {(selectedInvoice.amount + (selectedInvoice.fineAmount || 0)).toLocaleString()}</strong> টাকা সফলভাবে প্রতিষ্ঠানের ব্যাংক হিসাবে ক্রেডিট করা হয়েছে।
                  </p>

                  {/* Transaction Box */}
                  <div style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    padding: '16px',
                    margin: '20px 0',
                    textAlign: 'left',
                    fontSize: '0.82rem',
                    lineHeight: 1.8,
                    color: '#334155'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#64748b' }}>ট্রানজেকশন আইডি (TrxID):</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a', fontSize: '0.95rem' }}>
                          {generatedTrxId}
                        </strong>
                        <button 
                          onClick={() => handleCopyTrxId(generatedTrxId)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4f46e5', padding: '2px' }}
                          title="কপি করুন"
                        >
                          {copyFeedback ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>শিক্ষার্থীর নাম:</span>
                      <strong style={{ color: '#0f172a' }}>{selectedInvoice.studentName}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>চালান নম্বর:</span>
                      <strong style={{ color: '#0f172a' }}>{selectedInvoice.id}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>পেমেন্ট মাধ্যম:</span>
                      <span style={{ color: '#0f172a', fontWeight: 600 }}>
                        {paymentMethod === 'bkash' ? 'বিকাশ পে (bKash Payment Gateway)' : paymentMethod === 'nagad' ? 'নগদ ডিজিটাল ওয়ালেট' : 'সোনালী ব্যাংক ই-সেবা'}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button 
                      onClick={() => {
                        const paidInv = invoices.find(i => i.id === selectedInvoice.id) || {
                          ...selectedInvoice,
                          status: 'Paid',
                          paidDate: '২০ সেপ্টেম্বর ২০২৬, দুপুর ০১:৪৫',
                          method: paymentMethod === 'bkash' ? 'বিকাশ গেটওয়ে' : paymentMethod === 'nagad' ? 'নগদ এমএফএস' : 'সোনালী ব্যাংক ই-সেবা',
                          trxId: generatedTrxId
                        };
                        setSelectedInvoice(null);
                        setActiveReceiptInvoice(paidInv);
                      }}
                      className="btn btn-primary"
                      style={{ 
                        padding: '12px 18px', 
                        fontSize: '0.92rem', 
                        fontWeight: 700, 
                        gap: '8px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      }}
                    >
                      <Receipt size={18} /> অফিসিয়াল মানি রসিদ দেখুন ও প্রিন্ট করুন
                    </button>
                    
                    <button 
                      onClick={() => setSelectedInvoice(null)}
                      className="btn btn-secondary"
                      style={{ padding: '10px 18px', fontSize: '0.85rem', fontWeight: 600 }}
                    >
                      চালান তালিকায় ফিরে যান
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Payable Amount Summary Banner */}
                  <div style={{
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#15803d', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.04em' }}>
                        মোট প্রদেয় ফি (TOTAL PAYABLE)
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                        {selectedInvoice.category}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '1px' }}>
                        শিক্ষার্থী: {selectedInvoice.studentName} ({selectedInvoice.studentId})
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#15803d' }}>
                        ৳ {(selectedInvoice.amount + (selectedInvoice.fineAmount || 0)).toLocaleString()}
                      </div>
                      {selectedInvoice.fineAmount > 0 && (
                        <div style={{ fontSize: '0.68rem', color: '#e11d48', fontWeight: 700 }}>
                          (বিলম্ব ফি ৳ {selectedInvoice.fineAmount} অন্তর্ভুক্ত)
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step Tabs */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bkash')}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '8px',
                        border: paymentMethod === 'bkash' ? '2px solid #e2136e' : '1px solid #e2e8f0',
                        background: paymentMethod === 'bkash' ? '#fff1f2' : '#ffffff',
                        color: paymentMethod === 'bkash' ? '#e2136e' : '#475569',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px'
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Smartphone size={14} /><span>বিকাশ (bKash)</span></span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 500 }}>ইনস্ট্যান্ট গেটওয়ে</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('nagad')}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '8px',
                        border: paymentMethod === 'nagad' ? '2px solid #ea580c' : '1px solid #e2e8f0',
                        background: paymentMethod === 'nagad' ? '#fff7ed' : '#ffffff',
                        color: paymentMethod === 'nagad' ? '#ea580c' : '#475569',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px'
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Zap size={14} /><span>নগদ (Nagad)</span></span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 500 }}>ডাক বিভাগ সেবা</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '8px',
                        border: paymentMethod === 'bank' ? '2px solid #059669' : '1px solid #e2e8f0',
                        background: paymentMethod === 'bank' ? '#ecfdf5' : '#ffffff',
                        color: paymentMethod === 'bank' ? '#059669' : '#475569',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Landmark size={14} />
                        <span>সোনালী ই-সেবা</span>
                      </div>
                      <span style={{ fontSize: '0.62rem', fontWeight: 500 }}>সরকারি ব্যাংক</span>
                    </button>
                  </div>

                  {/* Step Progress Tracker */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                    <span style={{ color: checkoutStep >= 1 ? 'var(--primary)' : '#94a3b8' }}>১. একাউন্ট নম্বর</span>
                    <span style={{ color: '#cbd5e1', display: 'inline-flex', alignItems: 'center' }}><ArrowRight size={13} /></span>
                    <span style={{ color: checkoutStep >= 2 ? 'var(--primary)' : '#94a3b8' }}>২. ওটিপি কোড</span>
                    <span style={{ color: '#cbd5e1', display: 'inline-flex', alignItems: 'center' }}><ArrowRight size={13} /></span>
                    <span style={{ color: checkoutStep >= 3 ? 'var(--primary)' : '#94a3b8' }}>৩. গোপন পিন</span>
                  </div>

                  {/* STEP 1: Account Number Entry */}
                  {checkoutStep === 1 && (
                    <form onSubmit={handleRequestOtp}>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                          {paymentMethod === 'bkash' ? 'বিকাশ ওয়ালেট নম্বর লিখুন:' : paymentMethod === 'nagad' ? 'নগদ একাউন্ট নম্বর লিখুন:' : 'সোনালী ব্যাংক / রকেট নম্বর:'}
                        </label>
                        <div style={{ position: 'relative' }}>
                          <input 
                            type="text" 
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="input-control" 
                            placeholder="01XXXXXXXXX"
                            style={{ 
                              paddingLeft: '40px', 
                              fontFamily: 'var(--font-mono)', 
                              fontSize: '1rem',
                              fontWeight: 700,
                              letterSpacing: '0.04em'
                            }}
                            required
                          />
                          <Smartphone size={18} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>অভিভাবকের নিবন্ধিত নম্বর</span>
                          <button
                            type="button"
                            onClick={() => setAccountNumber('01711-489201')}
                            style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 600 }}
                          >
                            অভিভাবক নম্বর বসান (০১৭১১-৪৮৯২০১)
                          </button>
                        </div>
                      </div>

                      <div style={{
                        backgroundColor: '#f8fafc',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        border: '1px solid #e2e8f0',
                        fontSize: '0.75rem',
                        color: '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '20px'
                      }}>
                        <Lock size={14} color="#10b981" />
                        <span>বাংলাদেশ ব্যাংকের পিএসআই-ডিএসএস সিকিউরড চ্যানেল। ০% গেটওয়ে ফি।</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="btn btn-primary"
                        style={{
                          width: '100%',
                          padding: '12px',
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          backgroundColor: paymentMethod === 'bkash' ? '#e2136e' : paymentMethod === 'nagad' ? '#ea580c' : '#059669'
                        }}
                      >
                        {isProcessing ? 'ওটিপি রিকোয়েস্ট হচ্ছে...' : 'পরবর্তী ধাপ (ওটিপি পাঠান)'}
                      </button>
                    </form>
                  )}

                  {/* STEP 2: OTP Verification */}
                  {checkoutStep === 2 && (
                    <form onSubmit={handleVerifyOtp}>
                      {/* Simulated SMS Arrival Toast */}
                      <div style={{
                        backgroundColor: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        borderRadius: '10px',
                        padding: '12px 14px',
                        marginBottom: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.8rem',
                        color: '#1e40af'
                      }}>
                        <Sparkles size={18} color="#2563eb" />
                        <div>
                          <div style={{ fontWeight: 700 }}>এসএমএস পাঠানো হয়েছে ({accountNumber})</div>
                          <div style={{ fontSize: '0.75rem', color: '#3b82f6', marginTop: '2px' }}>
                            আপনার ৪-সংখ্যার ওটিপি কোড: <strong>১২৩৪</strong> (মেয়াদ ২ মিনিট)
                          </div>
                        </div>
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                            ৪-সংখ্যার ওটিপি কোড (OTP) লিখুন:
                          </label>
                          <button 
                            type="button"
                            onClick={() => setOtpCode('1234')}
                            style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 700 }}
                          >
                            এক ক্লিকে কোড বসান (১২৩৪)
                          </button>
                        </div>
                        <input 
                          type="text" 
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="1 2 3 4"
                          className="input-control" 
                          style={{
                            fontFamily: 'var(--font-mono)', 
                            fontSize: '1.25rem', 
                            textAlign: 'center', 
                            letterSpacing: '0.3em',
                            fontWeight: 800
                          }}
                          required
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <button
                          type="button"
                          onClick={() => setCheckoutStep(1)}
                          className="btn btn-secondary"
                          style={{ padding: '10px 14px' }}
                        >
                          <ArrowLeft size={16} /> পিছনে
                        </button>
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className="btn btn-primary"
                          style={{
                            flex: 1,
                            padding: '12px',
                            fontSize: '0.92rem',
                            fontWeight: 700,
                            backgroundColor: paymentMethod === 'bkash' ? '#e2136e' : paymentMethod === 'nagad' ? '#ea580c' : '#059669'
                          }}
                        >
                          {isProcessing ? 'ওটিপি যাচাই হচ্ছে...' : 'ওটিপি নিশ্চিত করুন'}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* STEP 3: Secret PIN Entry */}
                  {checkoutStep === 3 && (
                    <form onSubmit={handleFinalizePayment}>
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                            {paymentMethod === 'bkash' ? 'বিকাশ গোপন পিন (PIN)' : paymentMethod === 'nagad' ? 'নগদ গোপন পিন' : 'ব্যাংক সিক্রেট পিন'} লিখুন:
                          </label>
                          <button 
                            type="button"
                            onClick={() => setPinCode('12345')}
                            style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 700 }}
                          >
                            ডেমো পিন বসান (১২৩৪৫)
                          </button>
                        </div>
                        <input 
                          type="password" 
                          maxLength={5}
                          value={pinCode}
                          onChange={(e) => setPinCode(e.target.value)}
                          placeholder="•••••"
                          className="input-control" 
                          style={{
                            fontSize: '1.4rem', 
                            textAlign: 'center', 
                            letterSpacing: '0.4em'
                          }}
                          required
                        />
                      </div>

                      <div style={{
                        backgroundColor: '#fffbeb',
                        border: '1px solid #fef3c7',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        fontSize: '0.73rem',
                        color: '#92400e',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <ShieldCheck size={16} color="#d97706" />
                        <span>আপনার পিন সম্পূর্ণ ব্যক্তিগত। এটি কখনো কারো সাথে শেয়ার করবেন না।</span>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          type="button"
                          onClick={() => setCheckoutStep(2)}
                          className="btn btn-secondary"
                          style={{ padding: '10px 14px' }}
                        >
                          <ArrowLeft size={16} /> পিছনে
                        </button>
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className="btn btn-primary"
                          style={{
                            flex: 1,
                            padding: '12px',
                            fontSize: '0.95rem',
                            fontWeight: 800,
                            backgroundColor: paymentMethod === 'bkash' ? '#e2136e' : paymentMethod === 'nagad' ? '#ea580c' : '#059669'
                          }}
                        >
                          {isProcessing ? 'পেমেন্ট প্রসেসিং হচ্ছে...' : `৳ ${(selectedInvoice.amount + (selectedInvoice.fineAmount || 0)).toLocaleString()} পরিশোধ নিশ্চিত করুন`}
                        </button>
                      </div>
                    </form>
                  )}

                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* 4. Official Institutional Money Receipt (মানি রসিদ) Modal */}
      {currentReceiptData && (
        <div className="modal-overlay" onClick={() => setActiveReceiptInvoice(null)}>
          <div 
            className="animate-fade-in printable-receipt-modal"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '720px',
              width: '100%',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '2px solid #cbd5e1',
              boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.35)',
              padding: '32px',
              color: '#0f172a',
              position: 'relative'
            }}
          >
            {/* Action Bar (Hidden when printed) */}
            <div className="no-print" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Receipt size={18} color="#4338ca" />
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>
                  অফিসিয়াল শিক্ষার্থী ফি আদায় রসিদ প্রিভিউ
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  onClick={() => window.print()}
                  className="btn btn-primary"
                  style={{ padding: '6px 14px', fontSize: '0.8rem', fontWeight: 700, gap: '6px' }}
                >
                  <Printer size={15} /> প্রিন্ট রসিদ (Print)
                </button>
                <button 
                  onClick={() => alert(`রসিদ #${currentReceiptData.id} সফলভাবে সেভ করা হয়েছে।`)}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem', fontWeight: 600, gap: '6px' }}
                >
                  <Download size={14} /> ডাউনলোড (PDF)
                </button>
                <button 
                  onClick={() => setActiveReceiptInvoice(null)}
                  style={{
                    background: '#f1f5f9',
                    border: 'none',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#64748b'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Official Money Receipt Paper Voucher */}
            <div style={{
              border: '2px dashed #94a3b8',
              borderRadius: '12px',
              padding: '28px',
              backgroundColor: '#fafbfc',
              position: 'relative'
            }}>
              {/* PAID Watermark Seal */}
              <div style={{
                position: 'absolute',
                top: '42%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-20deg)',
                fontSize: '4.5rem',
                fontWeight: 900,
                color: 'rgba(16, 185, 129, 0.12)',
                border: '8px dashed rgba(16, 185, 129, 0.22)',
                padding: '10px 30px',
                borderRadius: '16px',
                pointerEvents: 'none',
                userSelect: 'none',
                letterSpacing: '0.1em'
              }}>
                PAID • পরিশোধিত
              </div>

              {/* Institution Header */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '16px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#059669',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1rem'
                  }}>
                    আই
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>
                      আইডিয়াল স্কুল অ্যান্ড কলেজ
                    </h2>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', letterSpacing: '0.05em' }}>
                      IDEAL SCHOOL AND COLLEGE, MOTIJHEEL, DHAKA-1000
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                  গণপ্রজাতন্ত্রী বাংলাদেশ সরকার ও ঢাকা শিক্ষা বোর্ড অনুমোদিত • EIIN: ১০৮২৭৫ • স্থাপিত: ১৯৬৫
                </div>

                <div style={{
                  display: 'inline-block',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  padding: '4px 18px',
                  borderRadius: '20px',
                  marginTop: '10px',
                  letterSpacing: '0.04em'
                }}>
                  মানি রসিদ (MONEY RECEIPT) — শিক্ষার্থী ও অভিভাবক কপি
                </div>
              </div>

              {/* Voucher Meta Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                backgroundColor: '#ffffff',
                padding: '14px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                margin: '16px 0',
                fontSize: '0.8rem',
                lineHeight: 1.6
              }}>
                <div>
                  <div><span style={{ color: '#64748b' }}>রসিদ নম্বর:</span> <strong>ISC-REC-{currentReceiptData.id.replace('FEE-', '')}</strong></div>
                  <div><span style={{ color: '#64748b' }}>চালান নম্বর:</span> <strong>{currentReceiptData.id}</strong></div>
                  <div><span style={{ color: '#64748b' }}>শিক্ষাবর্ষ ও সেশন:</span> <strong>{INSTITUTION.academicYear} (সেশন ২০২৫-২০২৬)</strong></div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div><span style={{ color: '#64748b' }}>পরিশোধের তারিখ:</span> <strong>{currentReceiptData.paidDate || '২০ সেপ্টেম্বর ২০২৬, দুপুর ০১:৪৫'}</strong></div>
                  <div><span style={{ color: '#64748b' }}>পেমেন্ট গেটওয়ে:</span> <strong style={{ color: '#059669' }}>{currentReceiptData.method || 'বিকাশ ডিজিটাল গেটওয়ে'}</strong></div>
                  <div><span style={{ color: '#64748b' }}>ট্রানজেকশন আইডি:</span> <strong style={{ fontFamily: 'var(--font-mono)', color: '#4338ca' }}>{currentReceiptData.trxId || 'BK928401'}</strong></div>
                </div>
              </div>

              {/* Student Information Box */}
              <div style={{
                backgroundColor: '#f1f5f9',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '16px',
                fontSize: '0.82rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '10px'
              }}>
                <div>
                  <span style={{ color: '#64748b' }}>শিক্ষার্থীর নাম:</span>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>{currentReceiptData.studentName}</div>
                </div>
                <div>
                  <span style={{ color: '#64748b' }}>আইডি নম্বর:</span>
                  <div style={{ fontWeight: 800, fontFamily: 'monospace' }}>{currentReceiptData.studentId}</div>
                </div>
                <div>
                  <span style={{ color: '#64748b' }}>শ্রেণি ও রোল:</span>
                  <div style={{ fontWeight: 800 }}>১০ম শ্রেণি (বিজ্ঞান-ক) • রোল: ১০১</div>
                </div>
                <div>
                  <span style={{ color: '#64748b' }}>অভিভাবক:</span>
                  <div style={{ fontWeight: 800 }}>জনাব মোঃ রিয়াজ উদ্দিন</div>
                </div>
              </div>

              {/* Fee Breakdown Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#e2e8f0', color: '#0f172a', fontWeight: 800 }}>
                    <th style={{ padding: '8px 10px', textAlign: 'left', border: '1px solid #cbd5e1' }}>ক্রমিক</th>
                    <th style={{ padding: '8px 10px', textAlign: 'left', border: '1px solid #cbd5e1' }}>ফি এর খাত ও বিবরণ</th>
                    <th style={{ padding: '8px 10px', textAlign: 'right', border: '1px solid #cbd5e1' }}>মূল ফি</th>
                    <th style={{ padding: '8px 10px', textAlign: 'right', border: '1px solid #cbd5e1' }}>বিলম্ব জরিমানা</th>
                    <th style={{ padding: '8px 10px', textAlign: 'right', border: '1px solid #cbd5e1' }}>মোট প্রদেয়</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'center' }}>০১</td>
                    <td style={{ padding: '10px', border: '1px solid #cbd5e1', fontWeight: 700 }}>
                      {currentReceiptData.category}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'right' }}>
                      ৳ {currentReceiptData.amount.toLocaleString()}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'right', color: currentReceiptData.fineAmount > 0 ? '#f43f5e' : '#64748b' }}>
                      ৳ {(currentReceiptData.fineAmount || 0).toLocaleString()}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 800 }}>
                      ৳ {(currentReceiptData.amount + (currentReceiptData.fineAmount || 0)).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'center' }}>০২</td>
                    <td style={{ padding: '10px', border: '1px solid #cbd5e1', color: '#64748b' }}>
                      ডিজিটাল এসএমএস ও অনলাইন ট্রানজেকশন প্রসেসিং চার্জ (শিক্ষা সহায়তায় মওকুফ)
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'right' }}>৳ ০.০০</td>
                    <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'right' }}>৳ ০.০০</td>
                    <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'right' }}>৳ ০.০০</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr style={{ backgroundColor: '#f0fdf4', fontWeight: 900, fontSize: '0.9rem' }}>
                    <td colSpan={4} style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'right', color: '#15803d' }}>
                      সর্বমোট পরিশোধিত অর্থ (NET TOTAL PAID):
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'right', color: '#15803d' }}>
                      ৳ {(currentReceiptData.amount + (currentReceiptData.fineAmount || 0)).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>

              {/* Amount in Words */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '0.8rem',
                marginBottom: '20px'
              }}>
                <span style={{ color: '#64748b' }}>টাকায় কথায়: </span>
                <strong style={{ color: '#0f172a' }}>
                  {convertAmountToBanglaWords(currentReceiptData.amount + (currentReceiptData.fineAmount || 0))}
                </strong>
              </div>

              {/* Signatures & QR Section */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginTop: '32px',
                paddingTop: '16px',
                borderTop: '1px solid #cbd5e1'
              }}>
                {/* QR Code */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #94a3b8',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <QrCode size={52} color="#0f172a" />
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', maxWidth: '160px', lineHeight: 1.3 }}>
                    কিউআর কোড স্ক্যান করে অনলাইন ডাটাবেজে রসিদ যাচাই ও ডাউনলোড করুন।
                  </div>
                </div>

                {/* Cashier Signature */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: '1px solid #10b981',
                    color: '#059669',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    marginBottom: '4px'
                  }}>
                    ডিজিটাল সিল: সংগৃহীত
                  </div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #94a3b8', paddingTop: '4px' }}>
                    হিসাবরক্ষণ কর্মকর্তা ও ক্যাশিয়ার
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>আইডিয়াল স্কুল অ্যান্ড কলেজ</div>
                </div>

                {/* Principal Signature */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'cursive',
                    fontSize: '0.95rem',
                    color: '#1e40af',
                    fontWeight: 700,
                    marginBottom: '2px'
                  }}>
                    Prof. Lal Mohammad
                  </div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #94a3b8', paddingTop: '4px' }}>
                    প্রফেসর লাল মোহাম্মদ (অধ্যক্ষ)
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>প্রধান শিক্ষক ও সদস্য সচিব</div>
                </div>
              </div>

              {/* Disclaimer */}
              <div style={{
                textAlign: 'center',
                fontSize: '0.68rem',
                color: '#94a3b8',
                marginTop: '20px',
                borderTop: '1px dashed #e2e8f0',
                paddingTop: '8px'
              }}>
                এটি একটি কম্পিউটার জেনারেটেড ডিজিটাল মানি রসিদ। কোনো ম্যানুয়াল স্বাক্ষরের প্রয়োজন নেই। সরকারি অডিট ও ট্যাক্স রেকর্ডের জন্য সংরক্ষিত।
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
