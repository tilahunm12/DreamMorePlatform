'use client';

// React እና Next.js አስፈላጊ ክፍሎችን ማስገባት
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// ለፎርም ውበትና መስተጋብር የሚረዱ አይከኖች
import { UserRole } from '@dream-more/shared';
import { apiClient } from '../../../lib/api-client';
import Script from 'next/script';
import { useAuthStore } from '../../../stores/useAuthStore';
import { 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  UserCheck, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';

/**
 * RegisterPage - የተጠቃሚዎች መመዝገቢያ ገጽ (Udemy-Style Professional UI)
 * ተማሪዎች፣ መምህራን፣ አሰሪዎች እና ፍሪላንሰሮች በኢሜይል ወይም በ Google OAuth የሚመዘገቡበት ነው።
 */
export default function RegisterPage() {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  // 1. የተመረጠው ሚና (Role State)
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.STUDENT);

  // 2. የፎርሙ መረጃዎች (Form State)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    subscribeTips: true,
  });

  // 3. የይለፍ ቃል መደበቂያና ማሳያ (Show/Hide Password State)
  const [showPassword, setShowPassword] = useState(false);
  
  // 4. ሁኔታዎች (Loading እና Error State)
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // የ 4ቱ ሚናዎች መረጃ (Roles Configuration)
  const roles = [
    {
      id: UserRole.STUDENT,
      title: 'ተማሪ (Student)',
      desc: 'ኮርሶችን መማር እና ሰርተፊኬት ማግኘት',
      icon: GraduationCap,
    },
    {
      id: UserRole.TEACHER,
      title: 'አስተማሪ (Teacher)',
      desc: 'ኮርሶችን ማዘጋጀት እና ማስተማር',
      icon: BookOpen,
    },
    {
      id: UserRole.FREELANCER,
      title: 'ፍሪላንሰር (Freelancer)',
      desc: 'የፍሪላንስ ስራዎችን ሰርቶ ገቢ ማግኘት',
      icon: UserCheck,
    },
    {
      id: UserRole.EMPLOYER,
      title: 'አሰሪ (Employer)',
      desc: 'ስራዎችን መለጠፍ እና ባለሙያዎችን መቅጠር',
      icon: Briefcase,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setErrorMessage('');
  };

  // የመመዝገቢያ ቁልፉ ሲጫን የሚሰራው ተግባር (Submit Handler via Real API)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('የይለፍ ቃሎች አይመሳሰሉም! እባክዎ በትክክል ያረጋግጡ።');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage('የይለፍ ቃል ቢያንስ 6 ፊደላት ወይም ቁጥሮች መያዝ አለበት።');
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.post('/auth/register', {
        name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: selectedRole,
      });

      setLoading(false);
      setSuccessMessage('ምዝገባዎ በተሳካ ሁኔታ ተጠናቋል! የማረጋገጫ መልእክት ወደ ኢሜይልዎ ተልኳል። አሁን መግባት ይችላሉ።');
      setTimeout(() => {
        router.push('/auth/login');
      }, 1800);
    } catch (err: any) {
      setLoading(false);
      const apiError = err.response?.data?.message || 'ምዝገባው አልተሳካም። እባክዎ እንደገና ይሞክሩ።';
      setErrorMessage(Array.isArray(apiError) ? apiError.join(', ') : apiError);
    }
  };

  // 🌐 Google OAuth 2.0 Sign-In Handler (Choose an Account Modal)
  const handleGoogleSignup = () => {
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
                // የጎግል ተጠቃሚውን መረጃ ማምጣት (Fetch user info from Google)
                const googleRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const profile = await googleRes.json();

                // የBackend API በመጥራት ተጠቃሚውን መመዝገብ/ማስገባት
                const response = await apiClient.post('/auth/google', {
                  email: profile.email,
                  name: profile.name,
                  avatarUrl: profile.picture,
                  role: selectedRole,
                });

                const { user: loggedInUser, token, message } = response.data;
                setUser(loggedInUser);
                setToken(token);
                setGoogleLoading(false);
                setSuccessMessage(message || `በ Google (${profile.email}) በተሳካ ሁኔታ ተመዝግበዋል! ወደ ዳሽቦርድ በመሄድ ላይ...`);

                setTimeout(() => {
                  if (loggedInUser.role === UserRole.TEACHER) {
                    router.push('/dashboard/teacher');
                  } else if (loggedInUser.role === UserRole.ADMIN) {
                    router.push('/dashboard/admin');
                  } else {
                    router.push('/dashboard/student');
                  }
                }, 1200);
              } catch (apiErr: any) {
                setGoogleLoading(false);
                const msg = apiErr.response?.data?.message || 'በ Google መመዝገብ አልተሳካም። እባክዎ እንደገና ይሞክሩ።';
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

        // "Choose an account" የሚለውን የጎግል መስኮት ያስነሳል!
        tokenClient.requestAccessToken({ prompt: 'select_account' });
      } catch (err: any) {
        setGoogleLoading(false);
        setErrorMessage('የ Google Identity አገልግሎት ማስጀመር አልተቻለም።');
      }
    } else {
      setErrorMessage('የ Google Identity አገልግሎት በመጫን ላይ ነው። እባክዎ ከ1 ሰከንድ በኋላ እንደገና ይሞክሩ።');
    }
  };

  const handleSocialSignup = (provider: string) => {
    alert(`በ ${provider} የመመዝገብ አገልግሎት (OAuth) በመገናኘት ላይ ነው...`);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-900/90 via-navy-950 to-navy-950">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-navy-900/60 rounded-3xl border border-navy-800 backdrop-blur-2xl shadow-2xl overflow-hidden">
        
        {/* የግራ ክፍል፦ የ Udemy-Style የትምህርትና ሙያ ምስል/መግለጫ (Creative Artwork Side) */}
        <div className="lg:col-span-5 p-8 sm:p-10 bg-gradient-to-br from-navy-900 via-navy-950 to-brand-950/40 border-b lg:border-b-0 lg:border-r border-navy-800/80 flex flex-col justify-between">
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-white/95 p-1 shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/images/logo.png"
                  alt="Dream More Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-extrabold text-white">
                Dream<span className="text-brand-500">More</span>
              </span>
            </Link>

            <div className="space-y-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold border border-brand-500/20">
                <Sparkles className="h-3.5 w-3.5" />
                <span>በኢትዮጵያ ቀዳሚው የትምህርትና የስራ ገበያ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                ተማሩ፤ ክህሎትዎን ያሳድጉ፤ ገቢ ያግኙ!
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                ልክ እንደ Udemy በሺዎች የሚቆጠሩ ኮርሶችን ይማሩ፤ በቴሌብር እና በንግድ ባንክ በቀላሉ ይክፈሉ፤ በ AppWorks በኩል የፍሪላንስ ስራዎችን ያግኙ።
              </p>
            </div>

            {/* ዋና ዋና ጥቅሞች (Value Props) */}
            <div className="space-y-3 pt-4 border-t border-navy-800/60">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <div className="h-6 w-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span>በ QR Code የተረጋገጡ ዲጂታል ሰርተፊኬቶች</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <div className="h-6 w-6 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span>በሀገር ውስጥ ባንኮች እና በቴሌብር የሚፈጸም ክፍያ</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <div className="h-6 w-6 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span>ከተመረቁ በኋላ በቀጥታ የፍሪላንስ ስራ የማግኘት እድል</span>
              </div>
            </div>
          </div>

          <div className="pt-6 text-[11px] text-slate-500">
            © 2026 Dream More Platform. All rights reserved.
          </div>
        </div>

        {/* የቀኝ ክፍል፦ የመመዝገቢያ ፎርም (Sign up with email & Social Options) */}
        <div className="lg:col-span-7 p-8 sm:p-10 space-y-6">
          
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Sign up with email
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              አዲስ መለያ ይፍጠሩ እና የመማር ጉዞዎን አሁኑኑ ይጀምሩ
            </p>
          </div>

          {/* የስህተት ወይም የስኬት መልእክት */}
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

          {/* 1. የተጠቃሚ ሚና መምረጫ (Role Selector Tabs) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              የሚመዘገቡበት ሚና (Select Role)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {roles.map((r) => {
                const isSelected = selectedRole === r.id;
                const Icon = r.icon;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    className={`p-2.5 rounded-xl text-center border transition-all text-xs font-bold flex flex-col items-center gap-1.5 ${
                      isSelected
                        ? 'border-brand-500 bg-brand-500/15 text-white shadow-md shadow-brand-500/10 scale-[1.02]'
                        : 'border-navy-800 bg-navy-950/60 text-slate-400 hover:text-white hover:border-navy-700'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isSelected ? 'text-brand-400' : 'text-slate-400'}`} />
                    <span className="truncate w-full">{r.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. ዋና የመመዝገቢያ ፎርም */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* ሙሉ ስም */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                ሙሉ ስም (Full Name)
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="ለምሳሌ፡ ዮሐንስ አበበ"
                  className="w-full rounded-xl bg-navy-950 border border-navy-800 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* ኢሜይል */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                ኢሜይል አድራሻ (Email)
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl bg-navy-950 border border-navy-800 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* የይለፍ ቃል እና ማረጋገጫ (2 Columns on tablet+) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  የይለፍ ቃል (Password)
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-navy-950 border border-navy-800 pl-10 pr-9 py-2.5 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
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

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  የይለፍ ቃል ማረጋገጫ
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-navy-950 border border-navy-800 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* ልዩ ቅናሾችና ምክሮች የመቀበያ Checkbox (Udemy-Style Opt-in) */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="subscribeTips"
                name="subscribeTips"
                checked={formData.subscribeTips}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 rounded border-navy-700 bg-navy-950 text-brand-500 focus:ring-brand-500"
              />
              <label htmlFor="subscribeTips" className="text-xs text-slate-400 select-none cursor-pointer">
                ልዩ የኮርስ ቅናሾችን፣ የስልጠና ምክሮችን እና አዳዲስ መረጃዎችን በኢሜይል ላኩልኝ (Send me special offers, personalized recommendations, and learning tips).
              </label>
            </div>

            {/* የመመዝገቢያ አዝራር (Continue Button) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <span>በመመዝገብ ላይ...</span>
              ) : (
                <>
                  <span>ቀጥል (Continue)</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* 3. ሌሎች የመመዝገቢያ አማራጮች (Other sign up options - Google, Facebook, Apple) */}
          <div className="space-y-4 pt-1">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-navy-800 w-full"></div>
              <span className="bg-navy-900/90 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider relative">
                Other sign up options
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              
              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={googleLoading}
                className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-navy-950 border border-navy-800 hover:border-slate-500 hover:bg-navy-900 transition-all group disabled:opacity-50"
                title="በ Google ይመዝገቡ"
              >
                {googleLoading ? (
                  <div className="h-5 w-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
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
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={() => handleSocialSignup('Facebook')}
                className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-navy-950 border border-navy-800 hover:border-slate-600 hover:bg-navy-900 transition-all text-[#1877F2]"
                title="በ Facebook ይመዝገቡ"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={() => handleSocialSignup('Apple')}
                className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-navy-950 border border-navy-800 hover:border-slate-600 hover:bg-navy-900 transition-all text-white"
                title="በ Apple ይመዝገቡ"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.47c.68-.83 1.15-1.98 1.02-3.14-1 .04-2.22.67-2.93 1.5-.63.73-1.18 1.91-1.03 3.03 1.12.09 2.26-.56 2.94-1.39z" />
                </svg>
              </button>

            </div>
          </div>

          {/* 4. Terms of Use Notice */}
          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            By signing up, you agree to our{' '}
            <Link href="/" className="text-brand-400 hover:underline">
              Terms of Use
            </Link>{' '}
            and{' '}
            <Link href="/" className="text-brand-400 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          {/* 5. ወደ መግቢያ ገጽ የሚወስድ አዝራር */}
          <div className="text-center pt-2 border-t border-navy-800/80 text-sm text-slate-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-bold text-brand-400 hover:text-brand-300 underline">
              Log in (ይግቡ)
            </Link>
          </div>

        </div>

      </div>

      {/* Google Identity Services SDK Script */}
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
    </div>
  );
}
