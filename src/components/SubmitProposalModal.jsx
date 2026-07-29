import React, { useState } from 'react';
import { X, Send, DollarSign, Clock, FileText } from 'lucide-react';
import { submitProposal } from '../services/api';

export default function SubmitProposalModal({ isOpen, onClose, job, onProposalSubmitted }) {
  const [proposalText, setProposalText] = useState('');
  const [amount, setAmount] = useState('');
  const [deliveryDays, setDeliveryDays] = useState('5');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !job) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await submitProposal({
      job_id: job.id,
      job_title: job.title,
      proposal_text: proposalText,
      amount: amount || job.budget,
      delivery_days: deliveryDays
    });
    setSubmitting(false);
    onClose();
    if (onProposalSubmitted) onProposalSubmitted();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-400" />
              Submit Proposal
            </h2>
            <p className="text-xs text-slate-400 mt-1 line-clamp-1">Applying for: {job.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Job Budget Hint */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">Client's Posted Budget:</span>
          <span className="text-emerald-400 font-bold text-sm">${job.budget} USD</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Your Bid Amount ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="number"
                  required
                  defaultValue={job.budget}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={job.budget}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Delivery Time (Days)</label>
              <input
                type="number"
                required
                min="1"
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Cover Letter & Approach</label>
            <textarea
              required
              rows="5"
              value={proposalText}
              onChange={(e) => setProposalText(e.target.value)}
              placeholder="Explain why you are the best fit for this project, mention your technical experience, and outline your approach..."
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            ></textarea>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-slate-300 hover:text-white bg-slate-800 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
