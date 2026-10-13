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

import { apiClient } from '../../../lib/api-client';
import Script from 'next/script';

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
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // የመግቢያ ቁልፉ ሲጫን የሚሰራው ተግባር (Submit Handler via Real API)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const response = await apiClient.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password,
      });

      const { user: loggedInUser, token, message } = response.data;

      // መረጃውን በ Zustand Persistent State ውስጥ እናስቀምጣለን
      setUser(loggedInUser);
      setToken(token);
      setLoading(false);
      setSuccessMessage(message || 'በተሳካ ሁኔታ ገብተዋል! ወደ ዳሽቦርድ በመሄድ ላይ...');

      setTimeout(() => {
        if (loggedInUser.role === UserRole.ADMIN) {
          router.push('/dashboard/admin');
        } else if (loggedInUser.role === UserRole.TEACHER) {
          router.push('/dashboard/teacher');
        } else {
          router.push('/dashboard/student');
        }
      }, 1000);
    } catch (err: any) {
      setLoading(false);
      const apiError = err.response?.data?.message || 'የገቡት ኢሜይል ወይም የይለፍ ቃል ትክክል አይደለም።';
      setErrorMessage(Array.isArray(apiError) ? apiError.join(', ') : apiError);
    }
  };

  // 🌐 Google OAuth Sign-In Handler
  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '809670747488-ellf0kkijkc9o9q4nojf50hg7ie7bhej.apps.googleusercontent.com';

    if (typeof window !== 'undefined' && (window as any).google?.accounts?.oauth2) {
      setGoogleLoading(true);
      setErrorMessage('');
      try {
        const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'email profile openid',
          callback: async (tokenResponse: any) => {
            if (tokenResponse && tokenResponse.access_token) {
              try {
                const googleRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const profile = await googleRes.json();

                const response = await apiClient.post('/auth/google', {
                  email: profile.email,
                  name: profile.name,
                  avatarUrl: profile.picture,
                  role: UserRole.STUDENT,
                });

                const { user: loggedInUser, token, message } = response.data;
                setUser(loggedInUser);
                setToken(token);
                setGoogleLoading(false);
                setSuccessMessage(message || `በ Google (${profile.email}) በተሳካ ሁኔታ ገብተዋል! ወደ ዳሽቦርድ በመሄድ ላይ...`);

                setTimeout(() => {
                  if (loggedInUser.role === UserRole.ADMIN) {
                    router.push('/dashboard/admin');
                  } else if (loggedInUser.role === UserRole.TEACHER) {
                    router.push('/dashboard/teacher');
                  } else {
                    router.push('/dashboard/student');
                  }
                }, 1000);
              } catch (apiErr: any) {
                setGoogleLoading(false);
                const msg = apiErr.response?.data?.message || 'በ Google መግባት አልተሳካም።';
                setErrorMessage(Array.isArray(msg) ? msg.join(', ') : msg);
              }
            } else {
              setGoogleLoading(false);
            }
          },
          error_callback: () => {
            setGoogleLoading(false);
            setErrorMessage('የ Google መግቢያ መስኮት ተዘግቷል ወይም አልተፈቀደም።');
          },
        });

        tokenClient.requestAccessToken({ prompt: 'select_account' });
      } catch (err: any) {
        setGoogleLoading(false);
        setErrorMessage('የ Google Identity አገልግሎት ማስጀመር አልተቻለም።');
      }
    } else {
      setErrorMessage('የ Google Identity አገልግሎት በመጫን ላይ ነው። እባክዎ ከ1 ሰከንድ በኋላ እንደገና ይሞክሩ።');
    }
  };

  // ለሙከራ በፍጥነት ለመግባት የሚረዱ ፈጣን ቁልፎች (Quick Test Logins with seeded credentials)
  const handleQuickLogin = (role: string, demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
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

          {/* Google Sign In Button */}
          <div className="pt-2">
            <div className="relative flex items-center justify-center mb-3">
              <div className="border-t border-navy-800 w-full"></div>
              <span className="bg-navy-900/90 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider relative">
                ወይም (Or continue with)
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-navy-950 border border-navy-800 hover:border-slate-500 hover:bg-navy-900 transition-all font-semibold text-xs text-white disabled:opacity-50"
            >
              {googleLoading ? (
                <div className="h-4 w-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>በ Google ይግቡ (Sign in with Google)</span>
            </button>
          </div>
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
              onClick={() => handleQuickLogin('Student', 'student@dreammore.com', 'StudentPassword123!')}
              className="px-2.5 py-1.5 rounded-lg bg-navy-950/80 border border-navy-800 text-slate-300 hover:text-brand-400 hover:border-brand-500/40 text-left transition-colors"
            >
              🎓 Student Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('Teacher', 'teacher@dreammore.com', 'TeacherPassword123!')}
              className="px-2.5 py-1.5 rounded-lg bg-navy-950/80 border border-navy-800 text-slate-300 hover:text-brand-400 hover:border-brand-500/40 text-left transition-colors"
            >
              👨‍🏫 Teacher Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('Employer', 'employer@dreammore.com', 'AdminPassword123!')}
              className="px-2.5 py-1.5 rounded-lg bg-navy-950/80 border border-navy-800 text-slate-300 hover:text-brand-400 hover:border-brand-500/40 text-left transition-colors"
            >
              💼 Employer Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('Admin', 'admin@dreammore.com', 'AdminPassword123!')}
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

      {/* Google Identity Services SDK Script */}
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
    </div>
  );
}
