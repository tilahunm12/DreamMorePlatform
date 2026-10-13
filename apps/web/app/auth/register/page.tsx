'use client';

// React እና Next.js አስፈላጊ ክፍሎችን ማስገባት
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// ለፎርም ውበትና መስተጋብር የሚረዱ አይከኖች
import { 
  UserRole 
} from '@dream-more/shared';
import { apiClient } from '../../../lib/api-client';
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
  AlertCircle 
} from 'lucide-react';

/**
 * RegisterPage - የተጠቃሚዎች መመዝገቢያ ገጽ
 * ተማሪዎች፣ መምህራን፣ አሰሪዎች እና ፍሪላንሰሮች መለያ የሚፈጥሩበት ገጽ ነው።
 */
export default function RegisterPage() {
  const router = useRouter();

  // 1. የተመረጠው ሚና (Role State) - በነባሪነት 'STUDENT' ይሆናል
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.STUDENT);

  // 2. የፎርሙ መረጃዎች (Form State)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // 3. የይለፍ ቃል መደበቂያና ማሳያ (Show/Hide Password State)
  const [showPassword, setShowPassword] = useState(false);
  
  // 4. ሁኔታዎች (Loading እና Error State)
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // የ 4ቱ ሚናዎች መረጃ (Roles Configuration)
  const roles = [
    {
      id: UserRole.STUDENT,
      title: 'ተማሪ (Student)',
      desc: 'ኮርሶችን መማር፣ ፈተና መውሰድ እና ሰርተፊኬት ማግኘት ለሚፈልጉ።',
      icon: GraduationCap,
      color: 'border-brand-500 text-brand-400 bg-brand-500/10',
    },
    {
      id: UserRole.TEACHER,
      title: 'አስተማሪ (Teacher)',
      desc: 'ኮርሶችን ማዘጋጀት፣ ማስተማር እና ገቢ ማግኘት ለሚፈልጉ።',
      icon: BookOpen,
      color: 'border-blue-500 text-blue-400 bg-blue-500/10',
    },
    {
      id: UserRole.FREELANCER,
      title: 'ፍሪላንሰር (Freelancer)',
      desc: 'ክህሎትዎን ተጠቅመው የፍሪላንስ ሥራዎችን ሰርተው ገንዘብ ለማግኘት።',
      icon: UserCheck,
      color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
    },
    {
      id: UserRole.EMPLOYER,
      title: 'አሰሪ (Employer)',
      desc: 'ሥራዎችን መለጠፍ እና ባለሙያዎችን ቀጥረው ማሰራት ለሚፈልጉ።',
      icon: Briefcase,
      color: 'border-purple-500 text-purple-400 bg-purple-500/10',
    },
  ];

  // የፎርም መረጃ ለውጥ ሲደረግ መረጃውን መመዝገብ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage('');
  };

  // የመመዝገቢያ ቁልፉ ሲጫን የሚሰራው ተግባር (Submit Handler)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // የይለፍ ቃል ማረጋገጫ (Validation)
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('የይለፍ ቃሎች አይመሳሰሉም! እባክዎ በትክክል ያረጋግጡ።');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage('የይለፍ ቃል ቢያንስ 6 ፊደላት/ቁጥሮች መያዝ አለበት።');
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
      setSuccessMessage(response.data.message || 'ምዝገባዎ በተሳካ ሁኔታ ተጠናቋል! አሁን መግባት ይችላሉ።');
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    } catch (err: any) {
      setLoading(false);
      const apiError = err.response?.data?.message || 'ምዝገባው አልተሳካም። እባክዎ እንደገና ይሞክሩ።';
      setErrorMessage(Array.isArray(apiError) ? apiError.join(', ') : apiError);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-900/80 via-navy-950 to-navy-950">
      <div className="max-w-xl w-full space-y-8 bg-navy-900/60 p-8 sm:p-10 rounded-3xl border border-navy-800 backdrop-blur-xl shadow-2xl">
        
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
            አዲስ መለያ ይፍጠሩ
          </h2>
          <p className="text-sm text-slate-400">
            ለመጀመር የመረጡትን ሚና ይምረጡና መረጃዎን ያስገቡ
          </p>
        </div>

        {/* 1. የተጠቃሚ ሚና መምረጫ ካርዶች (Role Selector Cards) */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            የሚመዘገቡበት ሚና (Select Role)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'border-brand-500 bg-brand-500/15 shadow-lg shadow-brand-500/10 scale-[1.02]'
                      : 'border-navy-800 bg-navy-950/60 hover:border-navy-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-brand-500 text-white' : 'bg-navy-800 text-slate-400'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="h-4 w-4 text-brand-400" />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {role.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                      {role.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
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

        {/* 2. የመመዝገቢያ ፎርም (Registration Form) */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          
          {/* ሙሉ ስም (Full Name) */}
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

          {/* ኢሜይል (Email Address) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              ኢሜይል አድራሻ (Email Address)
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

          {/* የይለፍ ቃል (Password) */}
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
                placeholder="ቢያንስ 6 ፊደላት ወይም ቁጥሮች"
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

          {/* የይለፍ ቃል ማረጋገጫ (Confirm Password) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              የይለፍ ቃል ማረጋገጫ (Confirm Password)
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="የይለፍ ቃሉን በድጋሚ ያስገቡ"
                className="w-full rounded-xl bg-navy-950 border border-navy-800 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* የመመዝገቢያ አዝራር (Submit Button) */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? (
              <span>በመመዝገብ ላይ...</span>
            ) : (
              <>
                <span>መለያ ይፍጠሩ (Register)</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* ወደ መግቢያ ገጽ የሚወስድ ማስፈንጠሪያ */}
        <div className="text-center pt-2 text-sm text-slate-400">
          ቀደም ሲል መለያ አለዎት?{' '}
          <Link href="/auth/login" className="font-semibold text-brand-400 hover:text-brand-300 underline">
            እዚህ ይግቡ (Login)
          </Link>
        </div>

      </div>
    </div>
  );
}
