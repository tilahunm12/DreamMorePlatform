import React, { useState } from 'react';
import { ShieldAlert, UserCheck, Briefcase, CheckCircle, XCircle, AlertTriangle, TrendingUp, DollarSign, FileCheck, Search, Eye } from 'lucide-react';

export default function AdminDashboard({ jobs, onRefresh }) {
  const [pendingVerifications, setPendingVerifications] = useState([
    { id: 1, name: 'Abebe Kebede', role: 'Freelancer', type: 'Graduate ID & Portfolio', date: '2026-07-29', status: 'pending', doc: 'National_ID_Abebe.pdf' },
    { id: 2, name: 'Ethio-Tech Corp', role: 'Employer', type: 'Company Registration', date: '2026-07-28', status: 'pending', doc: 'Commercial_Reg_EthioTech.pdf' },
    { id: 3, name: 'Tigist Haile', role: 'Freelancer', type: 'UI/UX LMS Certificate', date: '2026-07-27', status: 'pending', doc: 'Cert_DM_881.pdf' }
  ]);

  const handleVerify = (id, status) => {
    setPendingVerifications(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const totalBudget = jobs.reduce((acc, j) => acc + (j.budget || 0), 0);

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              System Administrator Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">AppWorks Management & Governance</h1>
            <p className="text-slate-400 text-sm mt-1">Verify talent & employer credentials, monitor marketplace disputes, and oversee platform analytics.</p>
          </div>
          <span className="px-4 py-2 text-xs font-mono font-bold rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/30">
            FULL SYSTEM CONTROL
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Open Jobs</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{jobs.length}</h3>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Pending Verifications</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">
              {pendingVerifications.filter(v => v.status === 'pending').length}
            </h3>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Marketplace Volume</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">${totalBudget.toLocaleString()}</h3>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Disputes / Flagged</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">0 Active</h3>
          </div>
        </div>
      </div>

      {/* Main Grid: Verifications Queue & Marketplace Jobs Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Verification Approval Queue */}
        <div className="glass-panel rounded-2xl p-6 space-y-6 border border-slate-800 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-purple-400" />
              Identity & Credential Verification Requests
            </h2>
            <span className="text-xs text-slate-400 font-normal">Section 4.4 SRS Spec</span>
          </div>

          <div className="space-y-4">
            {pendingVerifications.map((v) => (
              <div key={v.id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{v.name}</h3>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                        v.role === 'Employer' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {v.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{v.type} • Requested on {v.date}</p>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-indigo-400 font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{v.doc}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase ${
                    v.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    v.status === 'rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    Status: {v.status}
                  </span>

                  {v.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleVerify(v.id, 'rejected')}
                        className="px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-lg transition-all border border-red-500/20"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleVerify(v.id, 'approved')}
                        className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all shadow-md shadow-emerald-600/20"
                      >
                        Approve Credentials
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Safety Controls */}
        <div className="glass-panel rounded-2xl p-6 space-y-6 border border-slate-800 lg:col-span-1">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            Marketplace Moderation
          </h2>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Dispute Resolution Protocol</h4>
              <p className="text-slate-400 leading-relaxed">Admin has override privileges to resolve contract disputes between Employers and Freelancers as per SRS Section 3.1.1.</p>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20 space-y-2">
              <h4 className="font-bold text-purple-300 text-sm">System Audit Logging</h4>
              <p className="text-slate-400">All job posts, bids, approvals, and payout transactions are logged in MySQL 8 with full audit trail.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
