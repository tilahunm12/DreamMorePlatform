'use client';

// አስፈላጊ የሆኑ የ React እና Next.js ሞጁሎችን ማስገባት
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// አይከኖች
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  CreditCard, 
  Briefcase, 
  GraduationCap,
  Sparkles,
  AlertCircle,
  FileCheck,
  Search
} from 'lucide-react';

/**
 * AdminDashboardPage - የአድሚን ዋና መቆጣጠሪያ ዳሽቦርድ (Admin Portal)
 * ተጠቃሚዎችን፣ የክፍያ ስክሪንሾቶችን ማጽደቅ/ውድቅ ማድረግ፣ የመምህራንና የኮርስ ጥያቄዎችን መቆጣጠሪያ ነው።
 */
export default function AdminDashboardPage() {
  
  // 1. በአድሚኑ የሚገመገሙ የክፍያ ማረጋገጫዎች State (Pending Payments Queue)
  const [payments, setPayments] = useState([
    {
      id: 'PAY-8901',
      studentName: 'ዮሐንስ አበበ',
      studentEmail: 'yohannes@example.com',
      courseName: 'የሙሉ ቁልል ድረ-ገጽ ግንባታ (Full-Stack Web Development)',
      bank: 'Telebirr (ቴሌብር)',
      amount: '1,500 ብር',
      txnId: 'FT2408912345',
      date: 'ከ 20 ደቂቃ በፊት',
      screenshot: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60',
      status: 'PENDING',
    },
    {
      id: 'PAY-8902',
      studentName: 'ሄለን ገብሬ',
      studentEmail: 'helen@example.com',
      courseName: 'የ UI/UX ዲዛይን እና Figma ሙያዊ ስልጠና',
      bank: 'CBE (ንግድ ባንክ)',
      amount: '1,200 ብር',
      txnId: 'TXN99887766',
      date: 'ከ 1 ሰዓት በፊት',
      screenshot: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&auto=format&fit=crop&q=60',
      status: 'PENDING',
    },
    {
      id: 'PAY-8903',
      studentName: 'ሚካኤል ታሪኩ',
      studentEmail: 'mikael@example.com',
      courseName: 'SolidWorks እና AutoCAD ለኢንጂነሪንግ ዲዛይን',
      bank: 'Telebirr (ቴሌብር)',
      amount: '2,000 ብር',
      txnId: 'FT2407711223',
      date: 'ከ 3 ሰዓት በፊት',
      screenshot: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60',
      status: 'PENDING',
    },
  ]);

  // የስክሪንሾት ማሳያ ሞዳል State
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // የክፍያ ማረጋገጫ ውሳኔ ተግባር (Approve / Reject Action)
  const handlePaymentDecision = (id: string, decision: 'APPROVED' | 'REJECTED') => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: decision } : p))
    );

    setFeedbackMessage(
      decision === 'APPROVED'
        ? `ክፍያ ${id} በተሳካ ሁኔታ ጸድቋል (Approved)! ለተማሪው ኮርሱ ተከፍቷል።`
        : `ክፍያ ${id} ውድቅ ተደርጓል (Rejected)።`
    );

    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  // የፕላትፎርሙ አጠቃላይ ስታቲስቲክስ
  const stats = [
    { label: 'ጠቅላላ ተማሪዎች', value: '1,240', icon: GraduationCap, color: 'text-brand-400' },
    { label: 'ጠቅላላ መምህራን', value: '45', icon: BookOpen, color: 'text-blue-400' },
    { label: 'ጠቅላላ የተሰበሰበ ገቢ', value: '480,000 ብር', icon: DollarSign, color: 'text-emerald-400' },
    { label: 'ውሳኔ የሚጠብቁ ክፍያዎች', value: payments.filter(p => p.status === 'PENDING').length.toString(), icon: Clock, color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. የአድሚን ራስጌ (Admin Welcome Header) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-navy-900/80 border border-navy-800 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>ዋና አስተዳዳሪ (Administrator)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            የአድሚን መቆጣጠሪያ ዳሽቦርድ
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            የተጠቃሚዎችን ምዝገባ፣ የክፍያ ስክሪንሾቶችን እና የፕላትፎርሙን እንቅስቃሴዎች ይቆጣጠሩ።
          </p>
        </div>
      </div>

      {/* 2. ቁልፍ ስታቲስቲክስ (Admin Stats Grid) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="p-5 rounded-2xl bg-navy-900/50 border border-navy-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{item.label}</span>
                <Icon className={`h-4 w-4 ${item.color}`} />
              </div>
              <div className="text-2xl font-black text-white">{item.value}</div>
            </div>
          );
        })}
      </div>

      {/* የውሳኔ መልእክት ማሳያ (Feedback Notification) */}
      {feedbackMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* 3. ውሳኔ የሚጠብቁ የክፍያ ማረጋገጫዎች (Pending Payment Approvals Queue) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-brand-400" />
              <span>የክፍያ ማረጋገጫ ጥያቄዎች (Payment Verification Queue)</span>
            </h2>
            <p className="text-xs text-slate-400">ተማሪዎች የላኳቸውን ደረሰኞች አይተው ያጽድቁ ወይም ውድቅ ያድርጉ</p>
          </div>
        </div>

        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="p-6 rounded-3xl bg-navy-900/60 border border-navy-800 space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* የተማሪና የኮርስ መረጃ */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">{payment.studentName}</span>
                    <span className="text-xs text-slate-400 font-normal">({payment.studentEmail})</span>
                  </div>
                  <h4 className="text-xs font-semibold text-brand-400">{payment.courseName}</h4>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
                    <span>ባንክ፡ <strong className="text-slate-200">{payment.bank}</strong></span>
                    <span>Txn ID: <strong className="font-mono text-white bg-navy-950 px-2 py-0.5 rounded border border-navy-800">{payment.txnId}</strong></span>
                    <span>የተከፈለው፡ <strong className="text-emerald-400">{payment.amount}</strong></span>
                    <span>ጊዜ፡ {payment.date}</span>
                  </div>
                </div>

                {/* የድርጊት አዝራሮች (Action Buttons) */}
                <div className="flex flex-wrap items-center gap-3">
                  
                  {/* ደረሰኝ ማሳያ ቁልፍ */}
                  <button
                    onClick={() => setSelectedScreenshot(payment.screenshot)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-navy-950 hover:bg-navy-800 text-slate-300 border border-navy-800 transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5 text-brand-400" />
                    <span>ደረሰኙን እይ</span>
                  </button>

                  {payment.status === 'PENDING' ? (
                    <>
                      {/* አጽድቅ (Approve) */}
                      <button
                        onClick={() => handlePaymentDecision(payment.id, 'APPROVED')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>አጽድቅ (Approve)</span>
                      </button>

                      {/* ውድቅ አድርግ (Reject) */}
                      <button
                        onClick={() => handlePaymentDecision(payment.id, 'REJECTED')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-colors"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        <span>ውድቅ (Reject)</span>
                      </button>
                    </>
                  ) : (
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                      payment.status === 'APPROVED'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/15 text-red-400 border border-red-500/30'
                    }`}>
                      {payment.status === 'APPROVED' ? '✓ ጸድቋል (Approved)' : '✗ ውድቅ ተደርጓል (Rejected)'}
                    </span>
                  )}

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. የስክሪንሾት ማሳያ ሞዳል (Screenshot Modal) */}
      {selectedScreenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md">
          <div className="relative max-w-lg w-full rounded-3xl bg-navy-900 border border-navy-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">የተላከው የክፍያ ደረሰኝ ስክሪንሾት</h3>
              <button
                onClick={() => setSelectedScreenshot(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="relative h-72 w-full rounded-2xl overflow-hidden bg-navy-950">
              <Image
                src={selectedScreenshot}
                alt="Payment Receipt Screenshot"
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={() => setSelectedScreenshot(null)}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-navy-800 hover:bg-navy-700"
            >
              ዝጋ
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
