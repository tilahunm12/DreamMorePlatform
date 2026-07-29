import React, { useState, useEffect } from 'react';
import { UserCheck, Award, Briefcase, DollarSign, Star, CheckCircle, Clock, FileText, ExternalLink, ShieldCheck, GraduationCap, Upload } from 'lucide-react';
import { fetchProposals } from '../services/api';
import { ProposalSkeleton } from './SkeletonLoader';

export default function FreelancerDashboard({ onBrowseJobs, onSubmitWork }) {
  const [myProposals, setMyProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyProposals();
  }, []);

  const loadMyProposals = async () => {
    setLoading(true);
    const data = await fetchProposals(null, 3); // Freelancer ID 3 (Tilahun)
    setMyProposals(data);
    setLoading(false);
  };

  const acceptedCount = myProposals.filter(p => p.status === 'accepted' || p.status === 'submitted' || p.status === 'completed').length;
  const totalEarnings = myProposals.filter(p => p.status === 'accepted' || p.status === 'submitted' || p.status === 'completed').reduce((acc, p) => acc + (p.amount || 0), 0);

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                alt="Tilahun Abebe"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500 shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-white text-xs">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">Tilahun Abebe</h1>
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  LMS Graduate Verified
                </span>
              </div>
              <p className="text-slate-300 text-sm mt-0.5">Full-Stack React & PHP REST API Engineer</p>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.95 Rating
                </span>
                <span>•</span>
                <span>14 Completed Contracts</span>
                <span>•</span>
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>

          <button
            onClick={onBrowseJobs}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
          >
            Find New Opportunities
          </button>

        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Submitted Proposals</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{myProposals.length}</h3>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Active Contracts</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{acceptedCount}</h3>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Contracted</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">${totalEarnings.toLocaleString()}</h3>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">LMS Badges</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">3 Verified</h3>
          </div>
        </div>
      </div>

      {/* Main Grid: My Proposals & LMS Skill Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Submitted Applications List */}
        <div className="glass-panel rounded-2xl p-6 space-y-6 border border-slate-800 lg:col-span-2">
          <h2 className="text-lg font-bold text-white flex items-center justify-between">
            <span>My Submitted Applications</span>
            <span className="text-xs text-slate-400 font-normal">{myProposals.length} applications</span>
          </h2>

          {loading ? (
            <div className="space-y-4">
              <ProposalSkeleton />
              <ProposalSkeleton />
            </div>
          ) : myProposals.length === 0 ? (
            <div className="text-center py-10 glass-card rounded-2xl border border-slate-800 text-slate-400 text-sm">
              You have not submitted any proposals yet.
            </div>
          ) : (
            <div className="space-y-4">
              {myProposals.map((prop) => (
                <div key={prop.id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-white">{prop.job_title}</h3>
                      <p className="text-xs text-slate-400 mt-1">Submitted on {prop.created_at}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-bold text-emerald-400">${prop.amount}</span>
                      <p className="text-xs text-slate-400">{prop.delivery_days} days estimate</p>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm line-clamp-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    "{prop.proposal_text}"
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      prop.status === 'completed' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                      prop.status === 'submitted' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                      prop.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      prop.status === 'rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      Status: {prop.status.toUpperCase()}
                    </span>

                    {prop.status === 'accepted' && (
                      <button
                        onClick={() => onSubmitWork(prop)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md shadow-indigo-600/20 transition-all"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Submit Work</span>
                      </button>
                    )}

                    {prop.status === 'submitted' && (
                      <span className="text-xs text-indigo-400 font-semibold">
                        Deliverables Under Employer Review
                      </span>
                    )}

                    {prop.status === 'completed' && (
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Contract Completed & Paid
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


        {/* LMS Verified Skills & Certificates Integration */}
        <div className="glass-panel rounded-2xl p-6 space-y-6 border border-slate-800 lg:col-span-1">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            Verified LMS Certificates
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                  LMS Certificate
                </span>
                <span className="text-xs text-emerald-400 font-mono">QR Verified</span>
              </div>
              <h4 className="text-sm font-bold text-white">Full-Stack Web Development</h4>
              <p className="text-xs text-slate-400">Completed React 19, Node, & PHP API masterclass.</p>
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800">
                <span>Code: DM-CERT-2026-881</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                  LMS Certificate
                </span>
                <span className="text-xs text-emerald-400 font-mono">QR Verified</span>
              </div>
              <h4 className="text-sm font-bold text-white">UI/UX Design Systems in Figma</h4>
              <p className="text-xs text-slate-400">Advanced component libraries & accessibility design.</p>
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800">
                <span>Code: DM-CERT-2026-442</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 space-y-2">
            <h4 className="text-sm font-bold text-indigo-300">Boost Your Hireability!</h4>
            <p className="text-xs text-slate-400">Complete more Dream More courses to automatically display verified credentials on your AppWorks freelancer profile.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
