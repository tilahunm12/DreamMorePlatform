'use client';

// React እና Next.js አስፈላጊ ክፍሎችን ማስገባት
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// ለፎርም ውበት የሚረዱ አይከኖች
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
// የመተግበሪያውን ተጠቃሚ State ለማስቀመጥ የሚረዳ Zustand store
import { useAuthStore } from '../../../stores/useAuthStore';
import { UserRole } from '@dream-more/shared';

/**
 * LoginPage - የተጠቃሚዎች መግቢያ ገጽ
 * ተማሪዎች፣ መምህራን፣ አድሚኖች እና ቀጣሪዎች ኢሜይልና የይለፍ ቃል አስገብተው የሚገቡበት ገጽ ነው።
 */
export default function LoginPage() {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  // 1. የመግቢያ ፎርም መረጃዎች (Email & Password State)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. የይለፍ ቃል መደበቂያና ማሳያ (Show/Hide Password State)
  const [showPassword, setShowPassword] = useState(false);

  // 3. ሁኔታዎች (Loading እና Error State)
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // የመግቢያ ቁልፉ ሲጫን የሚሰራው ተግባር (Submit Handler)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      // ለሙከራ የሚሆን የመግቢያ ሂደት (Mock login)
      setTimeout(() => {
        setLoading(false);
        // መረጃውን በ Zustand State ውስጥ እናስቀምጣለን
        setUser({
          id: 'user_123',
          email: email,
          name: email.split('@')[0] || 'User',
          role: email.includes('admin') 
            ? UserRole.ADMIN 
            : email.includes('teacher') 
            ? UserRole.TEACHER 
            : email.includes('employer')
            ? UserRole.EMPLOYER
            : email.includes('freelancer')
            ? UserRole.FREELANCER
            : UserRole.STUDENT,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as any);

        setToken('mock_jwt_token_123456');
        setSuccessMessage('በተሳካ ሁኔታ ገብተዋል! ወደ ዳሽቦርድ በመሄድ ላይ...');

        setTimeout(() => {
          router.push('/');
        }, 1200);
      }, 1000);
    } catch (err: any) {
      setLoading(false);
      setErrorMessage('የገቡት ኢሜይል ወይም የይለፍ ቃል ትክክል አይደለም።');
    }
  };

  // ለሙከራ በፍጥነት ለመግባት የሚረዱ ፈጣን ቁልፎች (Quick Test Logins)
  const handleQuickLogin = (role: string, demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-900/80 via-navy-950 to-navy-950">
      <div className="max-w-md w-full space-y-8 bg-navy-900/60 p-8 sm:p-10 rounded-3xl border border-navy-800 backdrop-blur-xl shadow-2xl">
        
        {/* የገጹ አናት ሎጎና አርዕስት */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3 group mb-2">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white/95 p-1 shadow-md">
              <Image
                src="/images/logo.png"
                alt="Dream More Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-extrabold text-white">
              Dream<span className="text-brand-500">More</span>
            </span>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            እንኳን ደህና መጡ!
          </h2>
          <p className="text-sm text-slate-400">
            ወደ መለያዎ ለመግባት ኢሜይልና የይለፍ ቃል ያስገቡ
          </p>
        </div>

        {/* የስህተት ወይም የስኬት መልእክት ማሳያ */}
        {errorMessage && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* የመግቢያ ፎርም (Login Form) */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          
          {/* ኢሜይል (Email Address) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              ኢሜይል አድራሻ (Email)
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl bg-navy-950 border border-navy-800 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* የይለፍ ቃል (Password) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                የይለፍ ቃል (Password)
              </label>
              <Link href="/auth/forgot-password" className="text-xs text-brand-400 hover:text-brand-300">
                ረሱት? (Forgot?)
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-navy-950 border border-navy-800 pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* የመግቢያ አዝራር (Submit Button) */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? (
              <span>በመግባት ላይ...</span>
            ) : (
              <>
                <span>ይግቡ (Sign In)</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* ለሙከራ ፈጣን መሙያ (Quick Demo Accounts) */}
        <div className="pt-2 border-t border-navy-800/80">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 mb-2">
            <Sparkles className="h-3 w-3 text-brand-400" />
            <span>ፈጣን የሙከራ አካውንቶች (Quick Demo Logins):</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickLogin('Student', 'student@dreammore.com')}
              className="px-2.5 py-1.5 rounded-lg bg-navy-950/80 border border-navy-800 text-slate-300 hover:text-brand-400 hover:border-brand-500/40 text-left transition-colors"
            >
              🎓 Student Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('Teacher', 'teacher@dreammore.com')}
              className="px-2.5 py-1.5 rounded-lg bg-navy-950/80 border border-navy-800 text-slate-300 hover:text-brand-400 hover:border-brand-500/40 text-left transition-colors"
            >
              👨‍🏫 Teacher Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('Employer', 'employer@dreammore.com')}
              className="px-2.5 py-1.5 rounded-lg bg-navy-950/80 border border-navy-800 text-slate-300 hover:text-brand-400 hover:border-brand-500/40 text-left transition-colors"
            >
              💼 Employer Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('Admin', 'admin@dreammore.com')}
              className="px-2.5 py-1.5 rounded-lg bg-navy-950/80 border border-navy-800 text-slate-300 hover:text-brand-400 hover:border-brand-500/40 text-left transition-colors"
            >
              🛡️ Admin Demo
            </button>
          </div>
        </div>

        {/* ወደ መመዝገቢያ ገጽ የሚወስድ ማስፈንጠሪያ */}
        <div className="text-center pt-2 text-sm text-slate-400">
          አዲስ ነዎት?{' '}
          <Link href="/auth/register" className="font-semibold text-brand-400 hover:text-brand-300 underline">
            እዚህ ይመዝገቡ (Create Account)
          </Link>
        </div>

      </div>
    </div>
  );
}
