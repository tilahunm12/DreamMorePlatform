import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  TrendingUp,
  Award
} from 'lucide-react';

/**
 * Dream More Platform - ዋና መነሻ ገጽ (Home / Landing Page)
 * ተጠቃሚዎች መድረኩን ሲከፍቱ የሚያዩት የመጀመሪያው ማስተዋወቂያ ገጽ
 */
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      
      {/* 1. የገጹ ዋና ማስተዋወቂያ ክፍል (Hero Section) */}
      <section className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-900/60 via-navy-950 to-navy-950">
        <div className="mx-auto max-w-5xl space-y-8">
          
          {/* ማራኪ ባጅ (Badge) */}
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-400 border border-brand-500/20 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-brand-400" />
            <span>Right work at right time — የተቀናጀ የትምህርትና የሥራ ገበያ</span>
          </div>

          {/* ዋናው አርዕስት (Main Heading) */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white">
            ተማር፤ ክህሎት አሳድግ፤ <br />
            <span className="bg-gradient-to-r from-brand-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
              ሥራና ገቢ ፍጠር!
            </span>
          </h1>

          {/* ንዑስ መግለጫ (Subtitle) */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            በ <strong className="text-white">DreamMore</strong> ተግባር ተኮር ኮርሶችን በመማር የተረጋገጠ ሰርተፊኬት ያግኙ፤ እንዲሁም በ <strong className="text-white">AppWorks</strong> የፍሪላንስ ገበያ በቀጥታ ከቀጣሪዎች ጋር ይገናኙ።
          </p>

          {/* የድርጊት መመሪያ አዝራሮች (Call to Action Buttons) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-105 transition-all duration-200"
            >
              <BookOpen className="h-5 w-5" />
              ኮርሶችን ያስሱ (Explore Courses)
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/auth/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-slate-200 bg-navy-900 hover:bg-navy-800 border border-navy-700 hover:text-white transition-all duration-200"
            >
              አሁኑኑ ይመዝገቡ (Sign Up)
            </Link>
          </div>

          {/* ዋና ዋና ጥቅሞች (Trust badges) */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-400" />
              <span>በስክሪንሾት የሚረጋገጥ ክፍያ</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-400" />
              <span>በ QR Code የተረጋገጠ ሰርተፊኬት</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-400" />
              <span>የተረጋገጡ የፍሪላንስ ሥራዎች</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. የፕላትፎርሙ 4 ዋና ምሰሶዎች (Core Feature Cards) */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            የፕላትፎርሙ ዋና ዋና አገልግሎቶች
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            ተማሪዎችን፣ መምህራንን፣ ፍሪላንሰሮችንና አሰሪዎችን በአንድ ስነ-ምህዳር የሚያገናኝ የተሟላ ሥርዓት
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* ካርድ 1: LMS Courses */}
          <div className="group p-6 rounded-2xl bg-navy-900/60 border border-navy-800 hover:border-brand-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 mb-4 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">LMS Courses</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              በቪዲዮ የታገዙ የኦንላይን ትምህርቶች፣ ጥያቄዎች (Quizzes) እና የተማሪዎች የትምህርት ሂደት መከታተያ።
            </p>
          </div>

          {/* ካርድ 2: AppWorks Jobs */}
          <div className="group p-6 rounded-2xl bg-navy-900/60 border border-navy-800 hover:border-brand-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 mb-4 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">AppWorks Jobs</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              የፍሪላንስ ሥራዎችን መለጠፍ፣ ፕሮፖዛል ማቅረብ፣ ሥራ መስራትና ማስረከቢያ የተሟላ የሥራ ገበያ።
            </p>
          </div>

          {/* ካርድ 3: Payment Verification */}
          <div className="group p-6 rounded-2xl bg-navy-900/60 border border-navy-800 hover:border-brand-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 mb-4 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Payment Verification</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              ተማሪዎች የከፈሉበትን ደረሰኝ (Screenshot + Transaction ID) ጭነው በአድሚን የሚረጋገጥ ክፍያ።
            </p>
          </div>

          {/* ካርድ 4: QR Certificates */}
          <div className="group p-6 rounded-2xl bg-navy-900/60 border border-navy-800 hover:border-brand-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 mb-4 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">QR Certificates</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              ትምህርቱን ላጠናቀቁ ተማሪዎች በራስ-ሰር የሚዘጋጅ እና በ QR Code በማንኛውም ሰው የሚረጋገጥ ሰርተፊኬት።
            </p>
          </div>

        </div>
      </section>

      {/* 3. የስታቲስቲክስ ክፍል (Stats Section) */}
      <section className="w-full py-12 border-y border-navy-800/60 bg-navy-900/30 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">50+</div>
            <div className="text-xs sm:text-sm text-slate-400">ተግባር ተኮር ኮርሶች</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-400">1,200+</div>
            <div className="text-xs sm:text-sm text-slate-400">ተማሪዎችና ሰልጣኞች</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-400">350+</div>
            <div className="text-xs sm:text-sm text-slate-400">የተጠናቀቁ ፍሪላንስ ሥራዎች</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">99.8%</div>
            <div className="text-xs sm:text-sm text-slate-400">የሰርተፊኬት ትክክለኛነት</div>
          </div>
        </div>
      </section>

    </div>
  );
}
