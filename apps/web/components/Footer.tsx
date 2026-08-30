import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

/**
 * Footer Component (የገጹ ግርጌ ማጠቃለያ)
 * ፈጣን ማስፈንጠሪያዎችን፣ የእውቂያ መረጃዎችን እና የህግ ማስታወሻዎችን ይይዛል።
 */
export default function Footer() {
  return (
    <footer className="w-full border-t border-navy-800/80 bg-navy-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* የድርጅቱ መግለጫ እና ሎጎ (Brand Description) */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white/95 p-1 shadow-sm">
              <Image
                src="/images/logo.png"
                alt="Dream More Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg font-bold text-white">
              Dream<span className="text-brand-500">More</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Right work at right time — የተቀናጀ የትምህርት እና የፍሪላንስ ሥራ መድረክ። ክህሎትዎን ያዳብሩ፣ ሰርተፊኬት ያግኙ፣ የሥራ ዕድሎችን ይፍጠሩ።
          </p>
        </div>

        {/* የትምህርት ክፍሎች (LMS Learning Links) */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">ኮርሶች (LMS)</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/courses?category=programming" className="hover:text-brand-400 transition-colors">Programming & Coding</Link></li>
            <li><Link href="/courses?category=design" className="hover:text-brand-400 transition-colors">Graphics & UI/UX Design</Link></li>
            <li><Link href="/courses?category=engineering" className="hover:text-brand-400 transition-colors">Engineering & CAD</Link></li>
            <li><Link href="/courses?category=business" className="hover:text-brand-400 transition-colors">Business & Marketing</Link></li>
          </ul>
        </div>

        {/* የሥራ ገበያ (Freelance & Jobs Links) */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">የሥራ ገበያ (AppWorks)</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/jobs" className="hover:text-brand-400 transition-colors">የሥራ ማስታወቂያዎች</Link></li>
            <li><Link href="/freelancers" className="hover:text-brand-400 transition-colors">የባለሙያዎች ዝርዝር</Link></li>
            <li><Link href="/jobs/post" className="hover:text-brand-400 transition-colors">ሥራ ይለጥፉ</Link></li>
            <li><Link href="/verify" className="hover:text-brand-400 transition-colors">የሰርተፊኬት ማረጋገጫ</Link></li>
          </ul>
        </div>

        {/* የእውቂያ መረጃዎች (Contact info) */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">እውቂያና ድጋፍ</h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-brand-400" />
              <span>info@dreammoreplatform.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-brand-400" />
              <span>+251 900 000 000</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-brand-400" />
              <span>Addis Ababa, Ethiopia</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="mx-auto max-w-7xl pt-8 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} DreamMore. መብቱ በህግ የተጠበቀ ነው።</p>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-brand-400 transition-colors">የአጠቃቀም ደንቦች</Link>
          <Link href="/privacy" className="hover:text-brand-400 transition-colors">የግላዊነት ፖሊሲ</Link>
        </div>
      </div>
    </footer>
  );
}
