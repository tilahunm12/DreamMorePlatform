'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../../../stores/useAuthStore';
import { UserRole } from '@dream-more/shared';
import { getRoleDashboardPath, getRoleLabel } from '../../../lib/navigation';
import {
  Briefcase,
  Users,
  CheckCircle2,
  DollarSign,
  PlusCircle,
  Clock,
  ArrowRight,
  Lock,
  Search,
  Filter,
  Eye,
  FileText,
  Building,
  Check,
  X,
  AlertCircle
} from 'lucide-react';

interface MockEmployerJob {
  id: string;
  title: string;
  category: string;
  budget: number;
  deadline: string;
  status: 'POSTED' | 'ACTIVE' | 'COMPLETED';
  proposalsCount: number;
  createdAt: string;
}

export default function EmployerDashboardPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'jobs' | 'proposals' | 'escrow'>('jobs');
  const [showPostModal, setShowPostModal] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  // አዲስ ስራ መለጠፊያ ፎርም ስቴት
  const [jobTitle, setJobTitle] = useState('');
  const [jobCategory, setJobCategory] = useState('Web Development');
  const [jobBudget, setJobBudget] = useState('');
  const [jobDeadline, setJobDeadline] = useState('');
  const [jobDesc, setJobDesc] = useState('');

  // የአሰሪው የስራዎች ናሙና
  const [myJobs, setMyJobs] = useState<MockEmployerJob[]>([
    {
      id: 'job-emp-1',
      title: 'ለኢ-ኮሜርስ ድርጅት Next.js እና Tailwind CSS ድረ-ገጽ ግንባታ',
      category: 'Web Development',
      budget: 35000,
      deadline: 'በ 7 ቀናት ውስጥ',
      status: 'ACTIVE',
      proposalsCount: 8,
      createdAt: '2026-10-10',
    },
    {
      id: 'job-emp-2',
      title: 'የሞባይል መተግበሪያ UI/UX ዲዛይን በ Figma',
      category: 'UI/UX Design',
      budget: 18000,
      deadline: 'በ 5 ቀናት ውስጥ',
      status: 'POSTED',
      proposalsCount: 6,
      createdAt: '2026-10-12',
    },
    {
      id: 'job-emp-3',
      title: 'የአማርኛ እና እንግሊዝኛ ጽሁፎች ትርጉም እና ኤዲቲንግ',
      category: 'Writing & Translation',
      budget: 12000,
      deadline: 'ተጠናቋል',
      status: 'COMPLETED',
      proposalsCount: 5,
      createdAt: '2026-09-28',
    },
  ]);

  // የቀረቡ ማመልከቻዎች (Proposals)
  const proposals = [
    {
      id: 'prop-1',
      jobTitle: 'ለኢ-ኮሜርስ ድርጅት Next.js እና Tailwind CSS ድረ-ገጽ ግንባታ',
      freelancerName: 'ዳዊት ታደሰ',
      freelancerRole: 'Full-Stack Developer (ደረጃ 2)',
      rate: '34,000 ETB',
      deliveryTime: '18 ቀናት',
      coverSnippet: 'ሰላም! በNext.js እና Node.js ከ4 ዓመት በላይ ልምድ አለኝ። ቀደም ሲል ለሀገር ውስጥ ድርጅቶች የሠራኋቸውን ናሙናዎች ማየት ትችላላችሁ...',
      rating: 4.9,
      status: 'PENDING',
    },
    {
      id: 'prop-2',
      jobTitle: 'የሞባይል መተግበሪያ UI/UX ዲዛይን በ Figma',
      freelancerName: 'ቤተልሔም ሰለሞን',
      freelancerRole: 'Lead Product Designer',
      rate: '17,500 ETB',
      deliveryTime: '4 ቀናት',
      coverSnippet: 'ሰላም አሰሪ! ለታክሲ መጥሪያ እና ኢ-ኮሜርስ መተግበሪያዎች የተሟላ የFigma ዲዛይን ሲስተም አዘጋጅቼ አውቃለሁ። ወዲያው ለመጀመር ዝግጁ ነኝ...',
      rating: 5.0,
      status: 'ACCEPTED',
    },
  ];

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobBudget) return;

    const newJob: MockEmployerJob = {
      id: `job-emp-${Date.now()}`,
      title: jobTitle,
      category: jobCategory,
      budget: parseFloat(jobBudget) || 10000,
      deadline: jobDeadline || 'በ 10 ቀናት ውስጥ',
      status: 'POSTED',
      proposalsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setMyJobs([newJob, ...myJobs]);
    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setShowPostModal(false);
      setJobTitle('');
      setJobBudget('');
      setJobDeadline('');
      setJobDesc('');
    }, 1500);
  };

  // ተጠቃሚ ያልገባ ከሆነ
  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-4">
        <div className="h-16 w-16 rounded-3xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 shadow-xl">
          <Building className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">ይህንን ገጽ ለማየት እባክዎ መጀመሪያ ይግቡ</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          የአሰሪዎችን ዳሽቦርድ ለመጠቀምና ስራዎችን ለመለጠፍ ወደ መለያዎ መግባት ያስፈልግዎታል።
        </p>
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 transition-all hover:scale-105"
        >
          <span>ይግቡ (Login)</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  // አሰሪ ያልሆነ ከሆነ ወደ ራሱ ዳሽቦርድ እንዲሄድ ማድረግ
  if (user.role !== UserRole.EMPLOYER && user.role !== UserRole.ADMIN) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-5">
        <div className="h-16 w-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-xl">
          <Lock className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">ይህ ገጽ የተፈቀደው ለአሰሪዎች (Employers) ብቻ ነው!</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            እርስዎ የገቡት በ{getRoleLabel(user.role)} ሚና ስለሆነ ወደ ራስዎ ዳሽቦርድ ይሂዱ።
          </p>
        </div>
        <Link
          href={getRoleDashboardPath(user.role)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 transition-all hover:scale-105"
        >
          <span>ወደ ራስዎ ዳሽቦርድ ይሂዱ</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const stats = [
    { label: 'የተለጠፉ ስራዎች (Jobs Posted)', value: myJobs.length.toString(), icon: Briefcase, color: 'text-brand-400' },
    { label: 'የቀረቡ ማመልከቻዎች (Proposals)', value: '19', icon: Users, color: 'text-blue-400' },
    { label: 'በመሰራት ላይ ያሉ (Active)', value: '1', icon: CheckCircle2, color: 'text-emerald-400' },
    { label: 'የተያዘ/የተከፈለ በጀት (Escrow)', value: '65,000 ETB', icon: DollarSign, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. እንኳን ደህና መጡ ባነር (Welcome Banner) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy-900 via-navy-900 to-navy-800 border border-navy-700/60 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider">
              <Building className="h-3.5 w-3.5" />
              <span>የአሰሪ መቆጣጠሪያ ዳሽቦርድ • Employer Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              እንኳን ደህና መጡ፣ <span className="text-brand-400">{user.name || 'አሰሪ'}</span>! 🏢
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              በ <span className="text-brand-400 font-semibold">AppWorks</span> የሥራ ገበያ ላይ አዳዲስ ፕሮጀክቶችን ይለጥፉ፣ ብቁ የኢትዮጵያ ፍሪላንሰሮችን ይቅጠሩ እንዲሁም የክፍያ ዋስትና (Escrow) በቴሌብር እና በኢትዮጵያ ንግድ ባንክ ያስተዳድሩ።
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setShowPostModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <PlusCircle className="h-4 w-4" />
              <span>አዲስ ስራ ይለጥፉ (Post Job)</span>
            </button>
            <Link
              href="/jobs"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-300 bg-navy-800/80 hover:bg-navy-700 border border-navy-700 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>የስራ ገበያውን ይመልከቱ</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. ቁልፍ ስታቲስቲክስ (Key Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-navy-900/60 border border-navy-800/80 shadow-lg hover:border-navy-700/80 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">{stat.label}</span>
                <div className={`p-2.5 rounded-xl bg-navy-950/80 border border-navy-800 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-white tracking-tight">{stat.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. ታቦች (Tabs Navigation) */}
      <div className="flex items-center gap-2 border-b border-navy-800 pb-3">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'jobs'
              ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
              : 'text-slate-400 hover:text-white hover:bg-navy-900'
          }`}
        >
          <Briefcase className="h-4 w-4" />
          <span>የለጠፍኳቸው ስራዎች ({myJobs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('proposals')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'proposals'
              ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
              : 'text-slate-400 hover:text-white hover:bg-navy-900'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>የቀረቡ ማመልከቻዎች (19)</span>
        </button>
        <button
          onClick={() => setActiveTab('escrow')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'escrow'
              ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
              : 'text-slate-400 hover:text-white hover:bg-navy-900'
          }`}
        >
          <DollarSign className="h-4 w-4" />
          <span>የክፍያ ዋስትና (Escrow & Banking)</span>
        </button>
      </div>

      {/* 4. የይዘት ክፍሎች (Tab Contents) */}

      {/* TAB 1: የለጠፍኳቸው ስራዎች */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">የተለጠፉ ፕሮጀክቶች ዝርዝር</h2>
            <button
              onClick={() => setShowPostModal(true)}
              className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              <span>አዲስ ጨምር</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-navy-800 bg-navy-900/60 shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-950/80 text-slate-400 font-bold uppercase tracking-wider border-b border-navy-800">
                <tr>
                  <th className="py-4 px-6">የስራው ርዕስ (Job Title)</th>
                  <th className="py-4 px-6">ዘርፍ (Category)</th>
                  <th className="py-4 px-6">በጀት (Budget)</th>
                  <th className="py-4 px-6">ማመልከቻዎች</th>
                  <th className="py-4 px-6">ሁኔታ (Status)</th>
                  <th className="py-4 px-6 text-right">እርምጃ (Action)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/60">
                {myJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-navy-800/30 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      <div className="flex flex-col">
                        <span>{job.title}</span>
                        <span className="text-[10px] text-slate-500 font-normal">የተለጠፈበት ቀን፡ {job.createdAt}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-300">{job.category}</td>
                    <td className="py-4 px-6 font-bold text-brand-400">{job.budget.toLocaleString()} ETB</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                        <Users className="h-3 w-3" />
                        {job.proposalsCount} ባለሙያዎች
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          job.status === 'POSTED'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : job.status === 'ACTIVE'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                        }`}
                      >
                        {job.status === 'POSTED' ? 'ክፍት ነው' : job.status === 'ACTIVE' ? 'በመሰራት ላይ' : 'ተጠናቋል'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setActiveTab('proposals')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-500/10 text-brand-400 hover:bg-brand-500 hover:text-white transition-colors font-bold text-[11px]"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>አመልካቾችን እይ</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: የቀረቡ ማመልከቻዎች (Proposals) */}
      {activeTab === 'proposals' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">ለስራዎችዎ የቀረቡ የፍሪላንሰሮች ማመልከቻዎች (Proposals)</h2>
          <div className="grid grid-cols-1 gap-4">
            {proposals.map((prop) => (
              <div
                key={prop.id}
                className="p-6 rounded-2xl bg-navy-900/60 border border-navy-800/80 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-md border border-brand-500/20">
                      {prop.jobTitle}
                    </span>
                    <span className="text-xs text-slate-400">• ደረጃ፡ ⭐ {prop.rating}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{prop.freelancerName} <span className="text-xs text-slate-400 font-normal">({prop.freelancerRole})</span></h3>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{prop.coverSnippet}"
                  </p>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 pt-2">
                    <span>የተጠየቀው ክፍያ፡ <strong className="text-white">{prop.rate}</strong></span>
                    <span>የሚያስረክብበት ጊዜ፡ <strong className="text-white">{prop.deliveryTime}</strong></span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2 flex-shrink-0">
                  <button className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 transition-all">
                    <Check className="h-3.5 w-3.5" />
                    <span>ቅጠር (Accept & Escrow)</span>
                  </button>
                  <button className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-navy-800 hover:bg-navy-700 transition-colors">
                    <FileText className="h-3.5 w-3.5" />
                    <span>ሙሉ ፕሮፖዛሉን አንብብ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: የክፍያ ዋስትና (Escrow) */}
      {activeTab === 'escrow' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-navy-900/60 border border-navy-800/80 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-400" />
              <span>የ Dream More አስተማማኝ የክፍያ ዋስትና (Escrow Protection)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              አሰሪዎች ፍሪላንሰር በሚቀጥሩበት ወቅት ገንዘባቸው በ Dream More የዋስትና አካውንት (Escrow) ውስጥ በቴሌብር ወይም በኢትዮጵያ ንግድ ባንክ (CBE) ተይዞ ይቆያል። ፍሪላንሰሩ ሥራውን አጠናቆ አስረክቦ በአሰሪው ሲረጋገጥ ብቻ ገንዘቡ ይለቀቃል። ይህም ለሁለቱም ወገኖች 100% አስተማማኝ ዋስትና ይሰጣል።
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                <span className="text-[11px] text-slate-400 block">በዋስትና የተያዘ በጀት (In Escrow)</span>
                <span className="text-xl font-black text-amber-400">35,000 ETB</span>
              </div>
              <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                <span className="text-[11px] text-slate-400 block">የተለቀቀ/የተከፈለ (Released to Freelancers)</span>
                <span className="text-xl font-black text-emerald-400">30,000 ETB</span>
              </div>
              <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                <span className="text-[11px] text-slate-400 block">የተገናኘ የክፍያ ዘዴ</span>
                <span className="text-sm font-bold text-white">Telebirr & CBE Birr</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. አዲስ ስራ መለጠፊያ መስኮት (Job Post Modal) */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-navy-900 border border-navy-700/80 p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-navy-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">አዲስ ስራ ይለጥፉ (Post a Job)</h3>
                  <span className="text-[11px] text-slate-400">በ AppWorks የሥራ ገበያ ላይ ወዲያው ይታያል</span>
                </div>
              </div>
              <button
                onClick={() => setShowPostModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {postSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="h-14 w-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check className="h-7 w-7" />
                </div>
                <h4 className="text-lg font-bold text-white">ስራው በተሳካ ሁኔታ ተለጥፏል!</h4>
                <p className="text-xs text-slate-300">አመልካቾች ማመልከት ሲጀምሩ ማሳወቂያ ይደርስዎታል።</p>
              </div>
            ) : (
              <form onSubmit={handleCreateJob} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">የስራው ርዕስ (Job Title) *</label>
                  <input
                    type="text"
                    required
                    placeholder="ምሳሌ፡ ለድርጅት የቴሌግራም ቦት እና ዌብሳይት ግንባታ"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">ዘርፍ (Category)</label>
                    <select
                      value={jobCategory}
                      onChange={(e) => setJobCategory(e.target.value)}
                      className="w-full rounded-xl bg-navy-950 border border-navy-800 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App">Mobile App Development</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Graphics & Video">Graphics & Video</option>
                      <option value="Writing & Translation">Writing & Translation</option>
                      <option value="Engineering & CAD">Engineering & CAD</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">የተመደበ በጀት (በብር / ETB) *</label>
                    <input
                      type="number"
                      required
                      placeholder="ምሳሌ፡ 25000"
                      value={jobBudget}
                      onChange={(e) => setJobBudget(e.target.value)}
                      className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">የማጠናቀቂያ ጊዜ (Deadline)</label>
                  <input
                    type="text"
                    placeholder="ምሳሌ፡ በ 10 ቀናት ውስጥ"
                    value={jobDeadline}
                    onChange={(e) => setJobDeadline(e.target.value)}
                    className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">ዝርዝር መግለጫ (Job Description)</label>
                  <textarea
                    rows={3}
                    placeholder="ስራው ምን ምን ነገሮችን እንደሚያካትት፣ የሚያስፈልጉ ክህሎቶችንና መስፈርቶችን ይግለጹ..."
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPostModal(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-navy-800"
                  >
                    ይቅር
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 transition-all"
                  >
                    ስራውን ለጥፍ (Publish Job)
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
