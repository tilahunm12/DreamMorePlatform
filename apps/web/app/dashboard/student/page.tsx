'use client';

// አስፈላጊ የሆኑ የ React እና Next.js ሞጁሎችን ማስገባት
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// አይከኖች
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  PlayCircle, 
  Award, 
  CreditCard, 
  Briefcase, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  FileCheck,
  Lock,
  RefreshCw
} from 'lucide-react';
import { useAuthStore } from '../../../stores/useAuthStore';
import { UserRole } from '@dream-more/shared';
import { getRoleDashboardPath, getRoleLabel } from '../../../lib/navigation';
import { COURSES_DATA } from '../../../lib/coursesData';

/**
 * StudentDashboardPage - የተማሪዎች ዳሽቦርድ (Student Learning Portal)
 * ተማሪዎች የትምህርት ሂደታቸውን፣ የተመዘገቡባቸውን ኮርሶች፣ የክፍያ ሁኔታዎችን እና ሰርተፊኬቶቻቸውን የሚከታተሉበት ነው።
 */
export default function StudentDashboardPage() {
  const { user } = useAuthStore();
  const [mounted, setMounted] = React.useState(false);
  const activeCourse = COURSES_DATA[0];

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

  // 🔐 Route Guard: ያልገባ ወይም ተማሪ ያልሆነን መከልከል
  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-5">
        <div className="h-16 w-16 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shadow-xl">
          <Lock className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">እባክዎ መጀመሪያ ይግቡ (Login Required)</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            ወደ ተማሪ ዳሽቦርድ ለመግባት በተማሪ መለያዎ መግባት አለብዎት።
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

  // ተማሪ ያልሆነ (ለምሳሌ መምህር) ከሆነ ወደ ራሱ ዳሽቦርድ እንዲሄድ ማድረግ
  if (user.role !== UserRole.STUDENT && user.role !== UserRole.ADMIN) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-5">
        <div className="h-16 w-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-xl">
          <Lock className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">ይህ ገጽ የተፈቀደው ለተማሪዎች ብቻ ነው!</h2>
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

  // የተማሪው ስታቲስቲክስ (Mock Statistics)
  const stats = [
    { label: 'የተመዘገቡባቸው ኮርሶች', value: '3', icon: BookOpen, color: 'text-brand-400' },
    { label: 'የተጠናቀቁ ትምህርቶች', value: '28 / 42', icon: PlayCircle, color: 'text-blue-400' },
    { label: 'የተገኙ ሰርተፊኬቶች', value: '1', icon: Award, color: 'text-emerald-400' },
    { label: 'የቀረቡ የሥራ ፕሮፖዛሎች', value: '2', icon: Briefcase, color: 'text-purple-400' },
  ];

  // የክፍያዎች ታሪክ (Payment Submissions)
  const paymentHistory = [
    {
      id: 'PAY-101',
      courseName: 'የሙሉ ቁልል ድረ-ገጽ ግንባታ (Full-Stack Web Development)',
      bank: 'Telebirr',
      amount: '1,500 ብር',
      txnId: 'FT2408912345',
      date: 'ነሐሴ 20, 2026',
      status: 'APPROVED',
      statusLabel: 'ተረጋግጧል (Approved)',
    },
    {
      id: 'PAY-102',
      courseName: 'የ UI/UX ዲዛይን እና Figma ሙያዊ ስልጠና',
      bank: 'CBE',
      amount: '1,200 ብር',
      txnId: 'TXN987654321',
      date: 'ነሐሴ 27, 2026',
      status: 'PENDING',
      statusLabel: 'በግምገማ ላይ (Pending)',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. የእንኳን ደህና መጡ መልእክት (Welcome Banner) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-950 border border-navy-800 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold border border-brand-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ተማሪ (Student Portal)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            እንኳን ደህና መጡ፣ {user.name}! 🎓
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            የትምህርት ሂደትዎን ይከታተሉ፤ የተሰጡትን ተግባራት አጠናቀው ሰርተፊኬት ያግኙ።
          </p>
        </div>

        <Link
          href="/courses"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/20 transition-all self-start sm:self-auto"
        >
          <span>አዲስ ኮርስ ፈልግ</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 2. የስራ አፈጻጸም ካርዶች (Key Metrics Grid) */}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 3. ትምህርቱን ይቀጥሉ (Continue Learning Section - 2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-brand-400" />
              <span>ትምህርቱን ይቀጥሉ (Continue Learning)</span>
            </h2>

            <div className="p-6 rounded-3xl bg-navy-900/60 border border-navy-800 space-y-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative h-28 w-full sm:w-44 rounded-2xl overflow-hidden bg-navy-950 flex-shrink-0">
                  <Image
                    src={activeCourse.thumbnail}
                    alt={activeCourse.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                    በሂደት ላይ ያለ
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {activeCourse.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    ቀጣይ ትምህርት፡ <strong className="text-slate-200">ምዕራፍ 2፡ Next.js App Router & Server Components</strong>
                  </p>
                </div>
              </div>

              {/* የትምህርት ሂደት መቶኛ (Progress Bar) */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">የትምህርት ሂደት (Progress)</span>
                  <span className="text-brand-400">68% ተጠናቋል</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-navy-950 border border-navy-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-500 to-orange-400 rounded-full w-[68%]" />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  href={`/courses/${activeCourse.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/20 transition-all"
                >
                  <PlayCircle className="h-4 w-4" />
                  <span>ትምህርቱን ቀጥል (Resume Lesson)</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 4. የክፍያዎች ታሪክ (Payment Verification History) */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-brand-400" />
              <span>የክፍያ ማረጋገጫ ታሪክ (Payment History)</span>
            </h2>

            <div className="divide-y divide-navy-800 rounded-2xl bg-navy-900/40 border border-navy-800 overflow-hidden">
              {paymentHistory.map((item) => (
                <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-sm">{item.courseName}</h4>
                    <div className="flex flex-wrap gap-3 text-slate-400 text-[11px]">
                      <span>ዘዴ፡ {item.bank}</span>
                      <span>Txn ID: <strong className="text-slate-300 font-mono">{item.txnId}</strong></span>
                      <span>ቀን፡ {item.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <span className="font-bold text-white">{item.amount}</span>
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      item.status === 'APPROVED'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}>
                      {item.statusLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 5. የቀኝ ክፍል - ሰርተፊኬቶች እና ፈጣን ማሳሰቢያዎች (1 Col) */}
        <div className="space-y-6">
          
          {/* የተገኙ ሰርተፊኬቶች ካርድ */}
          <div className="p-6 rounded-3xl bg-navy-900/60 border border-navy-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-400" />
                <span>የተገኙ ሰርተፊኬቶች</span>
              </h3>
              <span className="text-[11px] font-bold text-brand-400">1 ሰርተፊኬት</span>
            </div>

            <div className="p-4 rounded-2xl bg-navy-950/90 border border-navy-800 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Full-Stack Development</h4>
                  <span className="text-[10px] text-slate-400">ID: DM-2026-89412</span>
                </div>
              </div>
              <Link
                href="/verify"
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-navy-900 hover:bg-navy-800 text-slate-300 hover:text-white border border-navy-700 transition-colors"
              >
                <FileCheck className="h-3.5 w-3.5 text-brand-400" />
                <span>ሰርተፊኬቱን እይና አረጋግጥ</span>
              </Link>
            </div>
          </div>

          {/* የ AppWorks የሥራ ዕድል ጥሪ */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-500/15 via-navy-900 to-navy-950 border border-brand-500/30 space-y-3">
            <div className="flex items-center gap-2 text-brand-400 font-bold text-xs">
              <Briefcase className="h-4 w-4" />
              <span>AppWorks Marketplace</span>
            </div>
            <h4 className="text-sm font-bold text-white leading-snug">
              ክህሎትዎን ተጠቅመው የፍሪላንስ ሥራዎችን ይስሩ!
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              ያጠናቀቋቸው ኮርሶች በፕሮፋይልዎ ላይ ስለሚታዩ አሰሪዎች በቀላሉ እንዲመርጡዎት ይረዳል።
            </p>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 hover:text-brand-300 pt-1"
            >
              <span>ክፍት ሥራዎችን እይ</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
