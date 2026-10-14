'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../stores/useCartStore';
import {
  ShoppingCart,
  Trash2,
  Bookmark,
  Star,
  Clock,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export default function ShoppingCartPage() {
  const router = useRouter();
  const {
    items,
    removeFromCart,
    getTotalPrice,
    getOriginalTotalPrice,
    getDiscountAmount,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400 text-sm">
        የግዢ ጋሪውን በመጫን ላይ...
      </div>
    );
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      setAppliedCoupon(couponCode.trim().toUpperCase());
      setCouponSuccess(true);
      setTimeout(() => setCouponSuccess(false), 3000);
    }
  };

  const totalPrice = getTotalPrice();
  const originalPrice = getOriginalTotalPrice();
  const discountAmount = getDiscountAmount();
  const discountPercent =
    originalPrice > 0 ? Math.round((discountAmount / originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* 1. የገጹ ራስጌ (Shopping Cart Header) */}
      <div className="space-y-2 border-b border-navy-800 pb-6">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <ShoppingCart className="h-8 w-8 text-brand-400" />
          <span>የግዢ ጋሪ (Shopping Cart)</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {items.length > 0
            ? `${items.length} ኮርሶች በጋሪዎ ውስጥ ይገኛሉ (${items.length} Courses in Cart)`
            : 'በጋሪዎ ውስጥ ምንም የተጨመረ ኮርስ የለም'}
        </p>
      </div>

      {/* ጋሪው ባዶ ሲሆን የሚታይ መልእክት */}
      {items.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto space-y-5">
          <div className="h-20 w-20 rounded-3xl bg-navy-900 border border-navy-800 flex items-center justify-center mx-auto text-slate-500 shadow-xl">
            <ShoppingBag className="h-10 w-10 text-brand-400/60" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">የግዢ ጋሪዎ ባዶ ነው!</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              የሚፈልጉትን ኮርስ ይምረጡ፤ አዳዲስ ክህሎቶችን ይማሩ፤ በቴሌብር እና በባንክ በቀላሉ ይክፈሉ።
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 transition-all hover:scale-105"
          >
            <span>ኮርሶችን ያስሱ (Keep Shopping)</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        /* ጋሪው ሙሉ ሲሆን (2-Column Layout 100% Matching Udemy) */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* 2. የኮርሶች ዝርዝር (Left Column - Cart Items) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-1">
              በጋሪዎ ውስጥ ያሉ ኮርሶች ({items.length})
            </div>

            <div className="divide-y divide-navy-800/80 rounded-3xl bg-navy-900/60 border border-navy-800 overflow-hidden shadow-2xl">
              {items.map((course) => (
                <div
                  key={course.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 hover:bg-navy-850/40 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative h-28 w-full sm:w-44 rounded-2xl overflow-hidden bg-navy-950 flex-shrink-0">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-brand-500 text-white shadow-md">
                      Premium
                    </span>
                  </div>

                  {/* Course Details */}
                  <div className="flex-1 space-y-2 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <Link
                          href={`/courses/${course.id}`}
                          className="text-sm sm:text-base font-bold text-white hover:text-brand-400 transition-colors line-clamp-2"
                        >
                          {course.title}
                        </Link>
                      </div>

                      <span className="text-xs text-slate-400 block mt-0.5">
                        በአሰልጣኝ፡ <strong className="text-slate-300">{course.instructor.name}</strong>
                      </span>

                      {/* Ratings & Meta */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                        <span className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20 font-bold text-[10px]">
                          Bestseller
                        </span>
                        <div className="flex items-center gap-1 text-amber-400 font-bold">
                          <span>{course.rating}</span>
                          <Star className="h-3 w-3 fill-amber-400" />
                          <span className="text-slate-500 font-normal">({course.reviewCount})</span>
                        </div>
                        <span>•</span>
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span>{course.level}</span>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-4 text-xs font-semibold pt-2 text-slate-400">
                      <button
                        onClick={() => removeFromCart(course.id)}
                        className="text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>አስወግድ (Remove)</span>
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => alert('ኮርሱ ለሌላ ጊዜ ተቀምጧል!')}
                        className="hover:text-white transition-colors"
                      >
                        ለሌላ ጊዜ አስቀምጥ
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => alert('ወደ ምኞት ዝርዝር ተጨምሯል!')}
                        className="hover:text-white transition-colors"
                      >
                        ወደ ምኞት ዝርዝር
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-left sm:text-right flex-shrink-0 sm:pt-1">
                    <div className="text-lg font-black text-brand-400">
                      {course.price.toLocaleString()} ብር
                    </div>
                    {course.originalPrice && (
                      <div className="text-xs text-slate-500 line-through">
                        {course.originalPrice.toLocaleString()} ብር
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. የቀኝ ክፍል - የዋጋ ማጠቃለያ (Right Column - Order Total & Checkout) */}
          <div className="lg:col-span-1 space-y-6 sticky top-24">
            <div className="p-6 rounded-3xl bg-navy-900/80 border border-navy-800 shadow-2xl space-y-6">
              
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  ጠቅላላ ዋጋ (Total):
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {totalPrice.toLocaleString()} ብር
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center gap-2 pt-1 text-xs">
                    <span className="text-slate-500 line-through">
                      {originalPrice.toLocaleString()} ብር
                    </span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {discountPercent}% ቅናሽ
                    </span>
                  </div>
                )}
              </div>

              {/* Big CTA Button: Proceed to Checkout */}
              <button
                onClick={() => router.push('/payment/checkout')}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/30 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>ወደ ክፍያ ሂድ (Proceed to Checkout)</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <span className="text-[11px] text-slate-400 block text-center">
                አሁኑኑ ክፍያ አይጠየቁም (You won't be charged yet)
              </span>

              {/* የቅናሽ ኩፖን ማስገቢያ (Coupon Form - Udemy Style) */}
              <div className="pt-4 border-t border-navy-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-brand-400" />
                  <span>የቅናሽ ኩፖን (Apply Coupon)</span>
                </label>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ምሳሌ፡ DREAMMORE2026"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 rounded-xl bg-navy-950 border border-navy-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-navy-800 hover:bg-navy-700 border border-navy-700 transition-colors"
                  >
                    ተግብር
                  </button>
                </form>

                {couponSuccess && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 pt-1">
                    <Check className="h-3.5 w-3.5" />
                    <span>ኩፖን <strong>{appliedCoupon}</strong> በተሳካ ሁኔታ ተተግብሯል!</span>
                  </div>
                )}
              </div>

              {/* የክፍያ ዋስትና ማረጋገጫ */}
              <div className="pt-4 border-t border-navy-800 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2 text-slate-300 font-semibold">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>በቴሌብር እና በኢትዮጵያ ባንኮች የተጠበቀ ክፍያ</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  ክፍያዎ በ Dream More ደህንነቱ በተጠበቀ የክፍያ ማረጋገጫ ስርዓት ይፈጸማል።
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
