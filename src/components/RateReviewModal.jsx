import React, { useState } from 'react';
import { X, Star, CheckCircle, MessageSquare } from 'lucide-react';
import { submitReview } from '../services/api';

export default function RateReviewModal({ isOpen, onClose, targetItem, onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !targetItem) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await submitReview({
      proposal_id: targetItem.id,
      job_id: targetItem.job_id,
      rating,
      review_text: reviewText
    });
    setSubmitting(false);
    onClose();
    if (onReviewSubmitted) onReviewSubmitted();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              Complete Contract & Rate Talent
            </h2>
            <p className="text-xs text-slate-400 mt-1">Leave ratings and feedback to complete contract payout.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contract & Freelancer Card */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
          <img
            src={targetItem.freelancer_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
            alt={targetItem.freelancer_name}
            className="w-12 h-12 rounded-xl object-cover border border-slate-700"
          />
          <div>
            <h4 className="text-sm font-bold text-white">{targetItem.freelancer_name}</h4>
            <p className="text-xs text-slate-400">{targetItem.job_title || 'AppWorks Freelance Contract'}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          
          {/* Star Rating Picker */}
          <div className="space-y-2 text-center">
            <label className="block text-slate-300 font-semibold">Star Rating</label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= (hoverRating || rating);
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        isFilled ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-amber-400 font-semibold">
              {rating === 5 ? '★ 5.0 - Exceptional Work' :
               rating === 4 ? '★ 4.0 - Very Good' :
               rating === 3 ? '★ 3.0 - Satisfactory' :
               rating === 2 ? '★ 2.0 - Below Expectations' : '★ 1.0 - Poor'}
            </p>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-indigo-400" /> Written Review & Testimonial
            </label>
            <textarea
              required
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience working with this freelancer, quality of work, and communication..."
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
              className="flex items-center gap-2 px-6 py-2.5 text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{submitting ? 'Completing...' : 'Approve & Release Payment'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
