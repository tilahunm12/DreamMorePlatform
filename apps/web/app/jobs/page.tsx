'use client';

// አስፈላጊ የሆኑ የ React እና Next.js ሞጁሎችን ማስገባት
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
// ለውበትና መስተጋብር የሚረዱ አይከኖች
import { 
  Search, 
  Briefcase, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  DollarSign, 
  Sparkles, 
  ArrowRight,
  PlusCircle,
  FileText,
  UserCheck
} from 'lucide-react';
// የሥራዎች መረጃ
import { JOBS_DATA, JobItem } from '../../lib/jobsData';

/**
 * JobsPage - የ AppWorks ፍሪላንስ ሥራዎች መፈለጊያ ገጽ
 * ፍሪላንሰሮች ሥራዎችን ፈልገው የሚያመለክቱበት፤ አሰሪዎች ደግሞ አዲስ ሥራ የሚለጥፉበት ገጽ ነው።
 */
export default function JobsPage() {
  // 1. የፍለጋ ቃል State (Search Input)
  const [searchQuery, setSearchQuery] = useState('');

  // 2. የተመረጠው የሥራ ዘርፍ (Category Filter)
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 3. የተመረጠው የልምድ ደረጃ (Experience Level Filter)
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // የሥራ ዘርፎች ዝርዝር (Category Options)
  const categories = [
    { id: 'all', label: 'ሁሉም ሥራዎች (All Jobs)' },
    { id: 'web', label: 'Web Development' },
    { id: 'design', label: 'UI/UX Design' },
    { id: 'cad', label: 'CAD & Engineering' },
    { id: 'video', label: 'Video Editing' },
  ];

  // 4. ሥራዎችን በፍለጋና በዘርፍ ማጣራት (Filtered Jobs)
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      // በፍለጋ ቃል ማጣራት
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skillsRequired.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      // በዘርፍ ማጣራት
      const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen pb-20 pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. የገጹ ራስጌና የሥራ መለጠፊያ ጥሪ (Header & Post Job CTA) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-navy-800/80">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-400 border border-brand-500/20">
            <Sparkles className="h-3.5 w-3.5 text-brand-400" />
            <span>AppWorks Freelance Marketplace</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            የፍሪላንስ ሥራዎች (Browse Jobs)
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            ክህሎትዎን የሚመጥኑ የፍሪላንስ ሥራዎችን ይፈልጉ፣ ፕሮፖዛል ያቅርቡ፣ ሰርተው ገቢዎን ያሳድጉ።
          </p>
        </div>

        {/* አሰሪዎች አዲስ ሥራ የሚለጥፉበት አዝራር */}
        <Link
          href="/jobs/post"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-105 transition-all duration-200"
        >
          <PlusCircle className="h-5 w-5" />
          <span>ሥራ ይለጥፉ (Post a Job)</span>
        </Link>
      </div>

      {/* 2. የፍለጋ እና የማጣሪያ ክፍሎች (Search & Filter Chips) */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ሥራ በርዕስ፣ በሚያስፈልጉ ክህሎቶች (Figma, React, CAD...) ይፈልጉ..."
            className="w-full rounded-2xl bg-navy-900/80 border border-navy-800 pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors"
          />
        </div>

        {/* የዘርፎች መምረጫ አዝራሮች */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25 scale-[1.02]'
                    : 'bg-navy-900/80 border border-navy-800 text-slate-400 hover:text-white hover:border-navy-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. የሥራዎች ዝርዝር ካርዶች (Job Cards List) */}
      {filteredJobs.length > 0 ? (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="group p-6 rounded-3xl bg-navy-900/50 border border-navy-800/80 hover:border-brand-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/10 space-y-4"
            >
              {/* የሥራው አናት መረጃ (Category, Time, Budget) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                    {job.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-500" />
                    {job.postedAt}
                  </span>
                  <span className="text-xs text-slate-400">• {job.experienceLevel}</span>
                </div>

                {/* የባጀት መረጃ */}
                <div className="flex items-baseline gap-1.5 text-right">
                  <span className="text-xl sm:text-2xl font-black text-white">
                    {job.budget.toLocaleString()} ብር
                  </span>
                  <span className="text-xs text-slate-400">({job.budgetType})</span>
                </div>
              </div>

              {/* የሥራው ርዕስ እና መግለጫ */}
              <div className="space-y-2">
                <Link
                  href={`/jobs/${job.id}`}
                  className="text-lg sm:text-xl font-bold text-white group-hover:text-brand-400 transition-colors block"
                >
                  {job.title}
                </Link>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                  {job.description}
                </p>
              </div>

              {/* የሚያስፈልጉ ክህሎቶች (Required Skills Badges) */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.skillsRequired.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-navy-950 text-slate-300 border border-navy-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* የቀጣሪ መረጃ እና የማመልከቻ አዝራር */}
              <div className="pt-4 border-t border-navy-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-200">{job.employer.company}</span>
                    {job.employer.verified && (
                      <span title="የተረጋገጠ አሰሪ"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /></span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-500" />
                    <span>{job.employer.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-300">
                    <FileText className="h-3.5 w-3.5 text-brand-400" />
                    <span>{job.proposalsCount} ፕሮፖዛሎች ቀርበዋል</span>
                  </div>
                </div>

                <Link
                  href={`/jobs/${job.id}`}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/20 transition-all hover:scale-105"
                >
                  <span>ዝርዝሩን እይና አመልክት</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* ምንም ሥራ ካልተገኘ */
        <div className="text-center py-20 bg-navy-900/30 rounded-3xl border border-navy-800 space-y-4">
          <Briefcase className="h-12 w-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">ምንም አይነት ሥራ አልተገኘም</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            በያስገቡት የፍለጋ ቃል ምንም የሥራ ማስታወቂያ የለም።
          </p>
        </div>
      )}

    </div>
  );
}
