'use client';

// አስፈላጊ የሆኑ የ React እና Next.js ሞጁሎችን ማስገባት
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// አይከኖች
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  Calendar, 
  User, 
  Award, 
  Download, 
  QrCode,
  Sparkles,
  ExternalLink
} from 'lucide-react';

/**
 * VerifyCertificatePage - የሰርተፊኬት ማረጋገጫ ገጽ (Public Certificate Verification)
 * ቀጣሪዎች ወይም ተማሪዎች የሰርተፊኬት መለያ ቁጥር (Certificate ID) በማስገባት ትክክለኛነቱን የሚያረጋግጡበት ገጽ ነው።
 */
export default function VerifyCertificatePage() {
  // 1. የሰርተፊኬት መለያ ቁጥር State
  const [certId, setCertId] = useState('DM-2026-89412');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);

  // የተገኘ የሰርተፊኬት መረጃ (Mock Certificate Data)
  const certificateData = {
    id: 'DM-2026-89412',
    studentName: 'ዮሐንስ አበበ ተፈራ',
    courseName: 'የሙሉ ቁልል ድረ-ገጽ ግንባታ (Full-Stack Web Development)',
    instructorName: 'ኢንጂነር ዳዊት ሰለሞን',
    issueDate: 'ነሐሴ 2018 ዓ.ም (August 2026)',
    grade: 'A+ (98% Assessment Score)',
    verified: true,
    skills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'],
  };

  // የሰርተፊኬት ፍለጋ ተግባር (Search Handler)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 800);
  };

  return (
    <div className="min-h-screen pb-20 pt-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      
      {/* 1. የገጹ ራስጌ (Header) */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>ኦፊሴላዊ የሰርተፊኬት ማረጋገጫ ሥርዓት</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          ሰርተፊኬት ያረጋግጡ
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          በ Dream More Platform የተሰጡ የትምህርት ማጠናቀቂያ ሰርተፊኬቶችን ትክክለኛነት በሰከንዶች ውስጥ ያረጋግጡ።
        </p>
      </div>

      {/* 2. የሰርተፊኬት መለያ መፈለጊያ ሳጥን (Search Input Box) */}
      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2.5 p-2 rounded-2xl bg-navy-900/80 border border-navy-800 backdrop-blur-xl shadow-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              required
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              placeholder="የሰርተፊኬት ቁጥር ያስገቡ (ለምሳሌ፡ DM-2026-89412)..."
              className="w-full rounded-xl bg-navy-950 border border-navy-800 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/25 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <span>በማረጋገጥ ላይ...</span>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                <span>አረጋግጥ (Verify)</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* 3. የተረጋገጠው ሰርተፊኬት ማሳያ ካርድ (Verified Certificate View) */}
      {hasSearched && (
        <div className="relative rounded-3xl bg-gradient-to-b from-navy-900/90 to-navy-950 border border-navy-800 p-8 sm:p-12 shadow-2xl space-y-8 overflow-hidden">
          
          {/* የጀርባ ጌጥ (Background watermark effect) */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* የሰርተፊኬቱ አናት ሁኔታ (Status Badge & Logo) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-800">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white/95 p-1 shadow-md">
                <Image
                  src="/images/logo.png"
                  alt="Dream More Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white block">
                  Dream<span className="text-brand-500">More</span>
                </span>
                <span className="text-[11px] text-slate-400">Verified Certificate Credential</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold self-start sm:self-auto">
              <CheckCircle2 className="h-4 w-4" />
              <span>ትክክለኛና የተረጋገጠ (VERIFIED)</span>
            </div>
          </div>

          {/* የተማሪ እና የኮርስ መረጃ (Student & Course Info) */}
          <div className="space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                ይህ ሰርተፊኬት የተሰጠው ለ፦
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {certificateData.studentName}
              </h2>
            </div>

            <div className="p-6 rounded-2xl bg-navy-950/80 border border-navy-800 space-y-2">
              <span className="text-xs text-brand-400 font-semibold">የተጠናቀቀው ኮርስ</span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {certificateData.courseName}
              </h3>
              <p className="text-xs text-slate-400">
                አሰልጣኝ መምህር፡ <strong className="text-slate-200">{certificateData.instructorName}</strong>
              </p>
            </div>

            {/* ዝርዝር ማረጋገጫ መረጃዎች */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-navy-900/60 border border-navy-800">
                <span className="text-slate-500 block mb-1">የሰርተፊኬት መለያ ቁጥር</span>
                <span className="font-mono font-bold text-brand-400">{certificateData.id}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-navy-900/60 border border-navy-800">
                <span className="text-slate-500 block mb-1">የተሰጠበት ቀን</span>
                <span className="font-semibold text-slate-200">{certificateData.issueDate}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-navy-900/60 border border-navy-800">
                <span className="text-slate-500 block mb-1">የውጤት ደረጃ</span>
                <span className="font-bold text-emerald-400">{certificateData.grade}</span>
              </div>
            </div>

            {/* የተማሯቸው ክህሎቶች */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400">የተረጋገጡ ክህሎቶች (Verified Skills):</span>
              <div className="flex flex-wrap gap-1.5">
                {certificateData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-navy-900 text-slate-300 border border-navy-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* የግርጌ አዝራሮች (Download & Share) */}
          <div className="pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <QrCode className="h-5 w-5 text-brand-400" />
              <span>በ QR Code በቀጥታ የተረጋገጠ ሰነድ</span>
            </div>

            <button
              onClick={() => alert('የሰርተፊኬት PDF ሰነድ በማውረድ ላይ...')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/20 transition-all hover:scale-105"
            >
              <Download className="h-4 w-4" />
              <span>ሰርተፊኬቱን አውርድ (Download PDF)</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
