import React, { useState } from 'react';
import { X, Send, Link, FileText, CheckCircle, Upload } from 'lucide-react';
import { submitWork } from '../services/api';

export default function SubmitWorkModal({ isOpen, onClose, contract, onWorkSubmitted }) {
  const [formData, setFormData] = useState({
    work_url: '',
    notes: '',
    repository_url: ''
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !contract) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await submitWork({
      proposal_id: contract.id,
      job_id: contract.job_id,
      ...formData
    });
    setSubmitting(false);
    onClose();
    if (onWorkSubmitted) onWorkSubmitted();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-indigo-400" />
              Submit Completed Deliverables
            </h2>
            <p className="text-xs text-slate-400 mt-1">Submit your completed work for employer review and contract payout.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contract Summary */}
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 space-y-1">
          <span className="text-xs text-indigo-400 font-semibold">Active Contract</span>
          <h4 className="text-sm font-bold text-white">{contract.job_title}</h4>
          <p className="text-xs text-slate-400">Budget: ${contract.amount} • Delivery Estimate: {contract.delivery_days} days</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Link className="w-4 h-4 text-indigo-400" /> Live Demo / Preview Link (Optional)
            </label>
            <input
              type="url"
              value={formData.work_url}
              onChange={(e) => setFormData({ ...formData, work_url: e.target.value })}
              placeholder="https://dreammore-preview.vercel.app"
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-400" /> Repository / Asset Link
            </label>
            <input
              type="url"
              required
              value={formData.repository_url}
              onChange={(e) => setFormData({ ...formData, repository_url: e.target.value })}
              placeholder="https://github.com/myaccount/dreammore-project"
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Submission Notes & Instructions</label>
            <textarea
              required
              rows="4"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Detail what was completed, setup instructions, and key highlights for the employer review..."
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
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
              className="flex items-center gap-2 px-6 py-2.5 text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Submitting...' : 'Submit Work for Review'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
