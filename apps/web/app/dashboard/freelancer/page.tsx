'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../../../stores/useAuthStore';
import { UserRole } from '@dream-more/shared';
import { getRoleDashboardPath, getRoleLabel } from '../../../lib/navigation';
import {
  Briefcase,
  FileText,
  DollarSign,
  Award,
  ArrowRight,
  Lock,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';

export default function FreelancerDashboardPage() {
  const { user } = useAuthStore();

  // ተጠቃሚ ያልገባ ከሆነ
  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-4">
        <div className="h-16 w-16 rounded-3xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 shadow-xl">
          <Briefcase className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">ይህንን ገጽ ለማየት እባክዎ መጀመሪያ ይግቡ</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          የፍሪላንሰሮችን ዳሽቦርድ ለመጠቀምና ለስራዎች ለማመልከት ወደ መለያዎ መግባት ያስፈልግዎታል።
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

  // ፍሪላንሰር ያልሆነ ከሆነ ወደ ራሱ ዳሽቦርድ እንዲሄድ ማድረግ
  if (user.role !== UserRole.FREELANCER && user.role !== UserRole.ADMIN) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-5">
        <div className="h-16 w-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-xl">
          <Lock className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">ይህ ገጽ የተፈቀደው ለፍሪላንሰሮች (Freelancers) ብቻ ነው!</h2>
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
    { label: 'ያመለከቱባቸው ስራዎች (Proposals)', value: '6', icon: FileText, color: 'text-brand-400' },
    { label: 'የተሰጡኝ ስራዎች (Active Contracts)', value: '2', icon: Briefcase, color: 'text-blue-400' },
    { label: 'ጠቅላላ ገቢ (Total Earnings)', value: '48,500 ETB', icon: DollarSign, color: 'text-emerald-400' },
    { label: 'የተጠናቀቁ ስራዎች (Completed)', value: '5', icon: Award, color: 'text-purple-400' },
  ];

  const activeJobs = [
    {
      id: 'active-1',
      title: 'ለኢ-ኮሜርስ ድርጅት Next.js እና Tailwind CSS ድረ-ገጽ ግንባታ',
      employer: 'ሰለሞን ከበደ (Abyssinia Tech)',
      budget: '35,000 ETB',
      status: 'በመሰራት ላይ',
      deadline: 'በ 5 ቀናት ውስጥ',
      progress: 70,
    },
    {
      id: 'active-2',
      title: 'የሞባይል መተግበሪያ UI/UX ዲዛይን በ Figma',
      employer: 'አዲስ ራይድ ኃ/የተ/የግ/ማ',
      budget: '17,500 ETB',
      status: 'በመሰራት ላይ',
      deadline: 'በ 2 ቀናት ውስጥ',
      progress: 90,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. እንኳን ደህና መጡ ባነር */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy-900 via-navy-900 to-navy-800 border border-navy-700/60 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider">
              <Briefcase className="h-3.5 w-3.5" />
              <span>የፍሪላንሰር መቆጣጠሪያ ዳሽቦርድ • Freelancer Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              እንኳን ደህና መጡ፣ <span className="text-brand-400">{user.name || 'ፍሪላንሰር'}</span>! 💼
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              በ <span className="text-brand-400 font-semibold">AppWorks</span> ላይ አዳዲስ የስራ ዕድሎችን ያስሱ፣ ፕሮፖዛል ያስገቡ እንዲሁም ክፍያዎን በቴሌብር እና በኢትዮጵያ ንግድ ባንክ በቀጥታ ይቀበሉ።
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/jobs"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Search className="h-4 w-4" />
              <span>አዳዲስ ስራዎችን ፈልግ (Browse Jobs)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. ስታቲስቲክስ */}
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

      {/* 3. በመሰራት ላይ ያሉ ስራዎች (Active Contracts) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Clock className="h-5 w-5 text-brand-400" />
          <span>በመሰራት ላይ ያሉ ፕሮጀክቶች (Active Contracts)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeJobs.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-navy-900/60 border border-navy-800/80 shadow-xl space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <span className="text-xs text-slate-400 block mt-1">አሰሪ፡ {item.employer}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {item.status}
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-400 mb-1">
                  <span>የስራው ሂደት</span>
                  <span className="text-brand-400 font-bold">{item.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-navy-950 overflow-hidden border border-navy-800">
                  <div className="h-full bg-brand-500 rounded-full" style={{ width: `${item.progress}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-navy-800 text-xs">
                <span className="font-bold text-brand-400">{item.budget}</span>
                <span className="text-slate-400">የጊዜ ገደብ፡ {item.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
