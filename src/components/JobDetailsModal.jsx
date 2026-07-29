import React from 'react';
import { X, DollarSign, Calendar, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

export default function JobDetailsModal({ isOpen, onClose, job, onApply }) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <img
              src={job.employer_avatar}
              alt={job.employer_name}
              className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
            />
            <div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {job.category}
              </span>
              <h2 className="text-xl font-bold text-white mt-1">{job.title}</h2>
              <p className="text-xs text-slate-400">Posted by {job.employer_name} • {job.created_at}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Budget & Metadata Bar */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <div>
            <p className="text-xs text-slate-400">Budget</p>
            <p className="text-lg font-extrabold text-emerald-400 mt-0.5">${job.budget}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Deadline</p>
            <p className="text-sm font-bold text-white mt-1">{job.deadline}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Proposals</p>
            <p className="text-sm font-bold text-indigo-400 mt-1">{job.proposals_count} submitted</p>
          </div>
        </div>

        {/* Description Body */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-white">Project Description</h3>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-300 text-sm leading-relaxed whitespace-pre-line">
            {job.description}
          </div>
        </div>

        {/* Verified Employer Shield */}
        <div className="flex items-center gap-2 text-xs text-slate-400 p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Payment verified employer on Dream More AppWorks. Payment held in secure escrow.</span>
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-slate-300 hover:text-white bg-slate-800 rounded-xl transition-all text-sm font-semibold"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onApply(job);
            }}
            className="flex items-center gap-2 px-6 py-2.5 text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
          >
            <span>Apply for this Job</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
