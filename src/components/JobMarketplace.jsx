import React, { useState } from 'react';
import { Search, Filter, DollarSign, Calendar, Clock, ArrowRight, Code, Palette, Cpu, TrendingUp, CheckCircle, ChevronRight, MessageSquare } from 'lucide-react';
import { JobSkeleton } from './SkeletonLoader';

const CATEGORIES = [
  { id: 'All', label: 'All Jobs', icon: Filter },
  { id: 'Technology', label: 'Technology & Code', icon: Code },
  { id: 'Creative', label: 'Creative & Design', icon: Palette },
  { id: 'Engineering', label: 'Engineering & CAD', icon: Cpu },
  { id: 'Business', label: 'Business & Marketing', icon: TrendingUp }
];

export default function JobMarketplace({ jobs, loadingJobs, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, onSelectJob, onApplyJob }) {
  return (
    <div className="space-y-8">
      
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel p-8 sm:p-10 border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            Dream More Graduate & Work Marketplace
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Find High-Impact Projects & Hire Top <span className="gradient-text">Ethiopian Talent</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Connect verified skilled graduates with top tech employers. Work on exciting contracts, gain ratings, and elevate your career.
          </p>

          {/* Search Bar */}
          <div className="pt-2">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs by title, skills (e.g. React, SolidWorks, Logo Design)..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm sm:text-base shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-[1.02]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Job Grid Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Available Opportunities 
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            {jobs.length} open
          </span>
        </h2>
      </div>

      {/* Jobs Grid */}
      {loadingJobs ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <JobSkeleton />
          <JobSkeleton />
          <JobSkeleton />
          <JobSkeleton />
        </div>
      ) : jobs.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No jobs found</h3>
          <p className="text-slate-400 text-sm">
            Try adjusting your search criteria or selecting a different job category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-5 border border-slate-800/80 hover:border-indigo-500/40"
            >
              <div className="space-y-4">
                {/* Employer & Category Badge */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.employer_avatar}
                      alt={job.employer_name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-white">{job.employer_name}</h4>
                      <p className="text-xs text-slate-400">Posted {job.created_at}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {job.category}
                  </span>
                </div>

                {/* Job Title & Description */}
                <div>
                  <h3
                    onClick={() => onSelectJob(job)}
                    className="text-lg font-bold text-white hover:text-indigo-400 transition-colors cursor-pointer line-clamp-1"
                  >
                    {job.title}
                  </h3>
                  <p className="text-slate-300 text-sm mt-2 line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </div>

              {/* Metrics & Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs font-medium">
                  <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    <DollarSign className="w-4 h-4" />
                    <span>${job.budget}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Due {job.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{job.proposals_count} proposals</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectJob(job)}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onApplyJob(job)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/20 transition-all"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

