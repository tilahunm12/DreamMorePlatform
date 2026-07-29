import React, { useState, useEffect } from 'react';
import { PlusCircle, Briefcase, Users, CheckCircle, Clock, DollarSign, ChevronRight, UserCheck, MessageSquare, AlertCircle, XCircle } from 'lucide-react';
import { fetchProposals, updateProposalStatus } from '../services/api';

export default function EmployerDashboard({ jobs, onOpenPostModal, onRefresh }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loadingProposals, setLoadingProposals] = useState(false);
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' or 'proposals'

  useEffect(() => {
    if (selectedJob) {
      loadProposals(selectedJob.id);
    } else if (jobs.length > 0) {
      setSelectedJob(jobs[0]);
      loadProposals(jobs[0].id);
    }
  }, [jobs]);

  const loadProposals = async (jobId) => {
    setLoadingProposals(true);
    const data = await fetchProposals(jobId);
    setProposals(data);
    setLoadingProposals(false);
  };

  const handleProposalAction = async (proposalId, status) => {
    await updateProposalStatus(proposalId, status);
    if (selectedJob) {
      loadProposals(selectedJob.id);
    }
    if (onRefresh) onRefresh();
  };

  const totalSpent = jobs.reduce((acc, job) => acc + (job.budget || 0), 0);

  return (
    <div className="space-y-8">
      {/* Header & Stats Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Employer Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your active job listings, review applicant proposals, and hire talent.</p>
        </div>
        <button
          onClick={onOpenPostModal}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Post New Job</span>
        </button>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Posted Jobs</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{jobs.length}</h3>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Applicants</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">
              {jobs.reduce((acc, j) => acc + (j.proposals_count || 0), 0)}
            </h3>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Active Hires</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">
              {jobs.filter(j => j.status === 'in_progress').length}
            </h3>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Budget Allocated</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">${totalSpent.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: List of Jobs */}
        <div className="glass-panel rounded-2xl p-6 space-y-4 border border-slate-800 lg:col-span-1">
          <h2 className="text-lg font-bold text-white flex items-center justify-between">
            <span>Your Posted Listings</span>
            <span className="text-xs text-indigo-400 font-normal">{jobs.length} total</span>
          </h2>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {jobs.map((job) => {
              const isSelected = selectedJob && selectedJob.id === job.id;
              return (
                <div
                  key={job.id}
                  onClick={() => {
                    setSelectedJob(job);
                    loadProposals(job.id);
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500/60 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-400 border border-slate-700">
                      {job.category}
                    </span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                      job.status === 'open' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-2 line-clamp-1">{job.title}</h4>
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
                    <span className="text-emerald-400 font-semibold">${job.budget}</span>
                    <span>{job.proposals_count || 0} Proposals</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Review Proposals for Selected Job */}
        <div className="glass-panel rounded-2xl p-6 space-y-6 border border-slate-800 lg:col-span-2">
          {selectedJob ? (
            <div className="space-y-6">
              
              {/* Selected Job Banner */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {selectedJob.category}
                  </span>
                  <div className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                    Budget: ${selectedJob.budget}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">{selectedJob.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{selectedJob.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span>Deadline: {selectedJob.deadline}</span>
                  <span>•</span>
                  <span>Status: <strong className="text-slate-200 capitalize">{selectedJob.status}</strong></span>
                </div>
              </div>

              {/* Proposals List Header */}
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-400" />
                  Received Proposals ({proposals.length})
                </h3>
              </div>

              {/* Proposals Cards */}
              {loadingProposals ? (
                <div className="text-center py-10 text-slate-400 text-sm">Loading proposals...</div>
              ) : proposals.length === 0 ? (
                <div className="text-center py-10 glass-card rounded-2xl border border-slate-800 text-slate-400 text-sm space-y-2">
                  <p>No proposals submitted for this job yet.</p>
                  <p className="text-xs text-slate-500">Freelancers will appear here as soon as they submit applications.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {proposals.map((prop) => (
                    <div key={prop.id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
                      
                      {/* Freelancer Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prop.freelancer_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                            alt={prop.freelancer_name}
                            className="w-11 h-11 rounded-xl object-cover border border-slate-700"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-bold text-white">{prop.freelancer_name}</h4>
                              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                                ★ {prop.freelancer_rating || 4.9}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400">{prop.freelancer_title} • {prop.completed_jobs || 10} completed jobs</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-lg font-extrabold text-emerald-400">${prop.amount}</span>
                          <p className="text-xs text-slate-400">in {prop.delivery_days} days</p>
                        </div>
                      </div>

                      {/* Proposal Cover Letter */}
                      <div className="p-3.5 rounded-xl bg-slate-900/60 text-slate-300 text-sm leading-relaxed border border-slate-800">
                        "{prop.proposal_text}"
                      </div>

                      {/* Status & Action Buttons */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">Status:</span>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase ${
                            prop.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            prop.status === 'rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {prop.status}
                          </span>
                        </div>

                        {prop.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleProposalAction(prop.id, 'rejected')}
                              className="px-3.5 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-lg transition-all border border-red-500/20"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleProposalAction(prop.id, 'accepted')}
                              className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all shadow-md shadow-emerald-600/20"
                            >
                              Accept Proposal
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">Select a job from the left to view proposals.</div>
          )}
        </div>

      </div>
    </div>
  );
}
