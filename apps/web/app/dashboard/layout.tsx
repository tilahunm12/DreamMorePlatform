'use client';

// አስፈላጊ የሆኑ የ React እና Next.js ሞጁሎችን ማስገባት
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
// አይከኖች
import { 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  LayoutDashboard, 
  CreditCard, 
  Award, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  PlusCircle,
  FileCheck,
  BarChart3
} from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';

/**
 * DashboardLayout - የተጠቃሚዎች ዳሽቦርድ አጠቃላይ መዋቅር (Dashboard Wrapper)
 * የግራ ማውጫ (Sidebar)፣ የአናት ማሳወቂያዎች ባር (Topbar) እና ዋናውን ይዘት ይይዛል።
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // በተጠቃሚው ሚና (Role) መሰረት ብቻ የሚታዩ ማውጫዎች
  const navItems = React.useMemo(() => {
    if (!user) {
      return [
        {
          title: 'የተማሪ ዳሽቦርድ (Student)',
          href: '/dashboard/student',
          icon: GraduationCap,
        },
      ];
    }

    if (user.role === 'ADMIN') {
      return [
        {
          title: '🛡️ የአድሚን መቆጣጠሪያ (Admin)',
          href: '/dashboard/admin',
          icon: ShieldCheck,
        },
      ];
    }

    if (user.role === 'TEACHER') {
      return [
        {
          title: '👨‍🏫 የመምህር ዳሽቦርድ (Teacher)',
          href: '/dashboard/teacher',
          icon: BookOpen,
        },
      ];
    }

    if (user.role === 'EMPLOYER') {
      return [
        {
          title: '🏢 የአሰሪ ዳሽቦርድ (Employer)',
          href: '/dashboard/employer',
          icon: Briefcase,
        },
      ];
    }

    if (user.role === 'FREELANCER') {
      return [
        {
          title: '💼 የፍሪላንሰር ዳሽቦርድ (Freelancer)',
          href: '/dashboard/freelancer',
          icon: Briefcase,
        },
      ];
    }

    // STUDENT
    return [
      {
        title: '🎓 የተማሪ ዳሽቦርድ (Student)',
        href: '/dashboard/student',
        icon: GraduationCap,
      },
    ];
  }, [user]);

  return (
    <div className="min-h-screen flex bg-navy-950 text-slate-100">
      
      {/* 1. የግራ ቋሚ ማውጫ (Sidebar for Desktop) */}
      <aside className="hidden lg:flex w-72 flex-col justify-between border-r border-navy-800/80 bg-navy-900/60 backdrop-blur-xl p-6">
        
        <div className="space-y-8">
          {/* የድርጅቱ ሎጎ */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white/95 p-1 shadow-md">
              <Image
                src="/images/logo.png"
                alt="Dream More Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-bold text-white">
                Dream<span className="text-brand-500">More</span>
              </span>
              <span className="text-[10px] text-slate-400">Portal Dashboard</span>
            </div>
          </Link>

          {/* የማውጫ አዝራሮች */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3">
              ዋና ማውጫዎች (Dashboards)
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25 scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-navy-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ፈጣን አገልግሎቶች */}
          <div className="space-y-1.5 pt-4 border-t border-navy-800/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3">
              ፈጣን ማስፈንጠሪያዎች
            </span>
            <Link
              href="/courses"
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-brand-400 hover:bg-navy-800/40 transition-colors"
            >
              <BookOpen className="h-4 w-4 text-brand-400" />
              <span>ኮርሶችን ያስሱ (Courses)</span>
            </Link>
            <Link
              href="/jobs"
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-brand-400 hover:bg-navy-800/40 transition-colors"
            >
              <Briefcase className="h-4 w-4 text-brand-400" />
              <span>የሥራ ገበያ (AppWorks)</span>
            </Link>
            <Link
              href="/verify"
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-emerald-400 hover:bg-navy-800/40 transition-colors"
            >
              <FileCheck className="h-4 w-4 text-emerald-400" />
              <span>ሰርተፊኬት ማረጋገጫ</span>
            </Link>
          </div>
        </div>

        {/* የተጠቃሚ ፕሮፋይል ማጠቃለያ */}
        <div className="pt-4 border-t border-navy-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-8 w-8 rounded-full bg-brand-500 text-white flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-sm uppercase">
              {user?.name ? user.name.slice(0, 2) : 'DM'}
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-white block truncate">
                {user?.name || 'ተጠቃሚ'}
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                {user?.email || 'user@dreammore.com'}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              window.location.href = '/auth/login';
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-navy-800 transition-colors flex-shrink-0"
            title="ይውጡ (Logout)"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

      </aside>

      {/* 2. የቀኝ ዋና ክፍል (Main Content Area) */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* የዳሽቦርድ አናት ባር (Topbar) */}
        <header className="h-16 border-b border-navy-800/80 bg-navy-950/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-900"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline-block">
              Dream More Platform • Portal Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {user?.role === 'EMPLOYER' ? (
                <Link
                  href="/dashboard/employer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500 hover:text-white transition-colors"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>አዲስ ስራ ይለጥፉ</span>
                </Link>
              ) : user?.role === 'TEACHER' ? (
                <Link
                  href="/dashboard/teacher"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500 hover:text-white transition-colors"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>አዲስ ኮርስ ፍጠር</span>
                </Link>
              ) : (
                <Link
                  href="/courses"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500 hover:text-white transition-colors"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>አዲስ ኮርስ ውሰድ</span>
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* የሞባይል ተጣጣፊ ማውጫ */}
        {isSidebarOpen && (
          <div className="lg:hidden p-4 bg-navy-900 border-b border-navy-800 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:bg-navy-800"
              >
                <item.icon className="h-4 w-4 text-brand-400" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        )}

        {/* የገጾቹ ይዘት ማሳያ ቦታ */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}
