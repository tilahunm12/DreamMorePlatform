'use client';

// React እና Next.js አስፈላጊ የሆኑ ሞጁሎችን ማስገባት
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// ለገጹ ውበት የሚረዱ አይከኖችን (Icons) ማስገባት
import { 
  BookOpen, 
  Briefcase, 
  ShieldCheck, 
  Menu, 
  X, 
  LogIn, 
  UserPlus,
  LayoutDashboard,
  LogOut,
  User as UserIcon,
  ShoppingCart
} from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';
import { useCartStore } from '../stores/useCartStore';
import { UserRole } from '@dream-more/shared';
import { getRoleDashboardPath, getRoleLabel } from '../lib/navigation';

/**
 * Navbar Component (ከላይ የሚቀመጥ ቋሚ ማውጫ)
 * የድርጅቱን ሎጎ፣ የገጽ ማውጫዎችን እና የይግቡ/ይመዝገቡ ወይም የዳሽቦርድ አዝራሮችን የያዘ ነው።
 */
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { items: cartItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getDashboardLink = () => {
    return getRoleDashboardPath(user?.role);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-navy-800/80 bg-navy-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* የድርጅቱ ዋና ሎጎ (Brand Logo) */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white/95 p-1 shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
            <Image
              src="/images/logo.png"
              alt="Dream More Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-brand-400 transition-colors">
              Dream<span className="text-brand-500">More</span>
            </span>
            <span className="text-[11px] font-medium tracking-wide text-brand-300">
              Right work at right time
            </span>
          </div>
        </Link>

        {/* የኮምፒውተር ማውጫ ዝርዝር (Desktop Navigation Links) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link 
            href="/courses" 
            className="flex items-center gap-1.5 hover:text-brand-400 transition-colors"
          >
            <BookOpen className="h-4 w-4 text-brand-400" />
            ኮርሶች (Courses)
          </Link>
          <Link 
            href="/jobs" 
            className="flex items-center gap-1.5 hover:text-brand-400 transition-colors"
          >
            <Briefcase className="h-4 w-4 text-brand-400" />
            AppWorks Jobs
          </Link>
          <Link 
            href="/verify" 
            className="flex items-center gap-1.5 hover:text-brand-400 transition-colors"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            ሰርተፊኬት ማረጋገጫ
          </Link>
        </nav>

        {/* የመግቢያ እና የመመዝገቢያ ወይም የዳሽቦርድ አዝራሮች (Action Buttons) */}
        <div className="hidden md:flex items-center gap-3">
          {/* የግዢ ጋሪ (Shopping Cart - Udemy Style) */}
          <Link
            href="/cart"
            className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-navy-800 transition-all border border-navy-800/80 hover:border-navy-700 mr-1"
            title="የግዢ ጋሪ (Shopping Cart)"
          >
            <ShoppingCart className="h-5 w-5 text-brand-400" />
            {mounted && cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-brand-500 text-white font-black text-[10px] flex items-center justify-center shadow-lg shadow-brand-500/50">
                {cartItems.length}
              </span>
            )}
          </Link>

          {mounted && user ? (
            <div className="flex items-center gap-3">
              <Link
                href={getDashboardLink()}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-xl shadow-md shadow-brand-500/20 transition-all hover:scale-105"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>
                  {user.role === UserRole.ADMIN
                    ? '🛡️ አድሚን ዳሽቦርድ'
                    : user.role === UserRole.TEACHER
                    ? '👨‍🏫 መምህር ዳሽቦርድ'
                    : user.role === UserRole.EMPLOYER
                    ? '🏢 አሰሪ ዳሽቦርድ'
                    : user.role === UserRole.FREELANCER
                    ? '💼 ፍሪላንሰር ዳሽቦርድ'
                    : '🎓 ተማሪ ዳሽቦርድ'}
                </span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  window.location.href = '/';
                }}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-navy-800 rounded-xl transition-colors"
                title="ይውጡ (Logout)"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:text-white rounded-lg hover:bg-navy-800 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                ይግቡ (Login)
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-lg shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all hover:scale-[1.02]"
              >
                <UserPlus className="h-4 w-4" />
                ይመዝገቡ (Sign Up)
              </Link>
            </>
          )}
        </div>

        {/* ለስልክ ስክሪን የሚሆን የማውጫ መክፈቻ ቁልፍ (Mobile Menu Button) */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/cart"
            className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
            title="የግዢ ጋሪ"
          >
            <ShoppingCart className="h-5 w-5 text-brand-400" />
            {mounted && cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-brand-500 text-white font-bold text-[9px] flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-brand-400" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* በስልክ ስክሪን ላይ የሚዘረጋው ማውጫ (Mobile Dropdown Menu) */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-navy-800 bg-navy-900/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-4">
          <div className="flex flex-col space-y-3 pt-2">
            <Link
              href="/courses"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-navy-800 hover:text-brand-400 transition-colors"
            >
              <BookOpen className="h-5 w-5 text-brand-400" />
              ኮርሶች (Courses)
            </Link>
            <Link
              href="/jobs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-navy-800 hover:text-brand-400 transition-colors"
            >
              <Briefcase className="h-5 w-5 text-brand-400" />
              AppWorks Jobs
            </Link>
            <Link
              href="/verify"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-navy-800 hover:text-brand-400 transition-colors"
            >
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              ሰርተፊኬት ማረጋገጫ
            </Link>
          </div>

          <div className="pt-4 border-t border-navy-800 flex flex-col gap-2.5">
            {mounted && user ? (
              <>
                <Link
                  href={getDashboardLink()}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white bg-brand-500 hover:bg-brand-600 transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  ዳሽቦርድ ({user.role})
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                    window.location.href = '/';
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-red-400 bg-navy-800 hover:bg-navy-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  ይውጡ (Logout)
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-slate-200 bg-navy-800 hover:bg-navy-700 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  ይግቡ (Login)
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/20 transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  ይመዝገቡ (Sign Up)
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
