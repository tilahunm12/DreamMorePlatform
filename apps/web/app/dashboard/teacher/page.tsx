'use client';

// አስፈላጊ የሆኑ የ React እና Next.js ሞጁሎችን ማስገባት
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// አይከኖች
import { 
  BookOpen, 
  Users, 
  DollarSign, 
  Star, 
  PlusCircle, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Edit3, 
  ArrowRight,
  Lock,
  RefreshCw
} from 'lucide-react';
import { useAuthStore } from '../../../stores/useAuthStore';
import { UserRole } from '@dream-more/shared';
import { getRoleDashboardPath, getRoleLabel } from '../../../lib/navigation';
import { COURSES_DATA } from '../../../lib/coursesData';

/**
 * TeacherDashboardPage - የመምህራን ዳሽቦርድ (Instructor Portal)
 * መምህራን ኮርሶቻቸውን የሚያስተዳድሩበት፣ አዳዲስ ኮርሶችን የሚያዘጋጁበት እና ገቢያቸውን የሚከታተሉበት ነው።
 */
export default function TeacherDashboardPage() {
  const { user } = useAuthStore();
  const [mounted, setMounted] = React.useState(false);
  const teacherCourses = COURSES_DATA.slice(0, 2);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400 text-sm">
          <RefreshCw className="h-5 w-5 animate-spin text-brand-500" />
          <span>ዳሽቦርድ በመጫን ላይ...</span>
        </div>
      </div>
    );
  }

  // 🔐 Route Guard: ያልገባ ወይም መምህር ያልሆነን መከልከል
  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-5">
        <div className="h-16 w-16 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shadow-xl">
          <Lock className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">እባክዎ መጀመሪያ ይግቡ (Login Required)</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            ወደ አስተማሪ ዳሽቦርድ ለመግባት በመምህር መለያዎ መግባት አለብዎት።
          </p>
        </div>
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

  // መምህር ያልሆነ (ለምሳሌ ተማሪ) ከሆነ ወደ ራሱ ዳሽቦርድ እንዲሄድ ማድረግ
  if (user.role !== UserRole.TEACHER && user.role !== UserRole.ADMIN) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-5">
        <div className="h-16 w-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-xl">
          <Lock className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">ይህ ገጽ የተፈቀደው ለመምህራን ብቻ ነው!</h2>
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

  // የመምህሩ ስታቲስቲክስ
  const stats = [
    { label: 'ጠቅላላ ተማሪዎቼ', value: '770', icon: Users, color: 'text-brand-400' },
    { label: 'ጠቅላላ ገቢ (Revenue)', value: '145,000 ብር', icon: DollarSign, color: 'text-emerald-400' },
    { label: 'የተዘጋጁ ኮርሶች', value: '2', icon: BookOpen, color: 'text-blue-400' },
    { label: 'አማካይ ደረጃ (Rating)', value: '4.9 ★', icon: Star, color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. የመምህሩ ራስጌ (Teacher Welcome Banner) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-navy-900/80 border border-navy-800 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>አስተማሪ (Instructor Portal)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            እንኳን ደህና መጡ፣ {user.name}! 👨‍🏫
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            ኮርሶችዎን ያስተዳድሩ፣ አዳዲስ ትምህርቶችን ይጨምሩ እና የተማሪዎችዎን እድገት ይከታተሉ።
          </p>
        </div>

        <button
          onClick={() => alert('አዲስ ኮርስ ማዘጋጃ ገጽ በመከፈት ላይ...')}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/20 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="h-4 w-4" />
          <span>አዲስ ኮርስ ፍጠር</span>
        </button>
      </div>

      {/* 2. ቁልፍ ስታቲስቲክስ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="p-5 rounded-2xl bg-navy-900/50 border border-navy-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{item.label}</span>
                <Icon className={`h-4 w-4 ${item.color}`} />
              </div>
              <div className="text-2xl font-black text-white">{item.value}</div>
            </div>
          );
        })}
      </div>

      {/* 3. የእኔ ኮርሶች ዝርዝር (My Courses) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-brand-400" />
          <span>የእኔ ኮርሶች (My Courses)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teacherCourses.map((course) => (
            <div
              key={course.id}
              className="p-6 rounded-3xl bg-navy-900/60 border border-navy-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    የታተመ (Published)
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white">{course.title}</h3>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-2 border-t border-navy-800">
                  <div>
                    <span>ተማሪዎች፡ </span>
                    <strong className="text-white">{course.studentsCount}</strong>
                  </div>
                  <div>
                    <span>የኮርሱ ዋጋ፡ </span>
                    <strong className="text-brand-400">{course.price.toLocaleString()} ብር</strong>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-navy-800 flex items-center justify-between gap-2">
                <Link
                  href={`/courses/${course.id}`}
                  className="text-xs font-semibold text-slate-400 hover:text-white"
                >
                  ኮርሱን በገጹ እይ
                </Link>
                <button
                  onClick={() => alert('የኮርስ ማስተካከያ ገጽ...')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-navy-950 hover:bg-navy-800 text-brand-400 border border-navy-800"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>አስተካክል (Edit)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
