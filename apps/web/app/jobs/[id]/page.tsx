'use client';

// አስፈላጊ የሆኑ የ React እና Next.js ሞጁሎችን ማስገባት
import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// አይከኖች
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft, 
  Send, 
  Sparkles, 
  DollarSign, 
  FileText,
  Star,
  Building,
  Paperclip
} from 'lucide-react';
// የሥራዎች መረጃ
import { JOBS_DATA } from '../../../lib/jobsData';

/**
 * JobDetailPage - የሥራ ዝርዝር መረጃ እና የፕሮፖዛል ማቅረቢያ ገጽ
 * ፍሪላንሰሮች የሥራውን ሙሉ ዝርዝር አንብበው ዋጋ እና የማብራሪያ ደብዳቤ (Proposal) የሚያስገቡበት ነው።
 */
export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const jobId = resolvedParams.id;

  // የተመረጠውን ሥራ ከመረጃ ቋቱ መፈለግ
  const job = JOBS_DATA.find((j) => j.id === jobId) || JOBS_DATA[0];

  // 1. የፕሮፖዛል ፎርም መረጃዎች State (Proposal Form State)
  const [bidAmount, setBidAmount] = useState(job.budget.toString());
  const [deliveryTime, setDeliveryTime] = useState(job.duration);
  const [coverLetter, setCoverLetter] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');

  // 2. ሁኔታዎች (Loading እና Success State)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ፕሮፖዛሉን ለአሰሪው መላክ (Submit Proposal Handler)
  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverLetter) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen pb-20 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* ወደ ኋላ መመለሻ አዝራር */}
      <div className="mb-6">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-brand-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>ወደ ሥራዎች ዝርዝር ተመለስ</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* የግራ ክፍል - የሥራው ዝርዝር መረጃ እና ፕሮፖዛል ማቅረቢያ (2 Columns) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* የሥራው ዋና መረጃ ካርድ */}
          <div className="p-8 rounded-3xl bg-navy-900/60 border border-navy-800 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                {job.categoryLabel}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-slate-500" />
                የተለጠፈው፡ {job.postedAt}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              {job.title}
            </h1>

            {/* ባጀት እና ጊዜ */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-navy-950/80 border border-navy-800/80 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">የተመደበ ባጀት</span>
                <span className="text-base font-extrabold text-white">{job.budget.toLocaleString()} ብር</span>
                <span className="text-[10px] text-slate-500 block">({job.budgetType})</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">የሚፈጀው ጊዜ</span>
                <span className="text-base font-extrabold text-white">{job.duration}</span>
                <span className="text-[10px] text-slate-500 block">የማብቂያ ቀን፡ {job.deadline}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">የልምድ ደረጃ</span>
                <span className="text-base font-extrabold text-white">{job.experienceLevel}</span>
              </div>
            </div>

            {/* የሥራው ሙሉ ማብራሪያ */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">የሥራው ዝርዝር መግለጫ</h3>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* የሚያስፈልጉ ክህሎቶች */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-white">የሚያስፈልጉ ክህሎቶች (Required Skills)</h3>
              <div className="flex flex-wrap gap-2">
                {job.skillsRequired.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-navy-950 text-brand-300 border border-navy-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* የፕሮፖዛል ማቅረቢያ ፎርም (Submit Proposal Section) */}
          <div className="p-8 rounded-3xl bg-navy-900/60 border border-navy-800 space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-400">
                <Sparkles className="h-4 w-4" />
                <span>ፕሮፖዛል ማቅረቢያ (Submit Proposal)</span>
              </div>
              <h2 className="text-xl font-bold text-white">ለዚህ ሥራ ማመልከቻዎን ያስገቡ</h2>
            </div>

            {isSubmitted ? (
              /* ፕሮፖዛሉ በተሳካ ሁኔታ ሲላክ */
              <div className="text-center py-8 space-y-4 bg-navy-950/60 rounded-2xl border border-emerald-500/30 p-6">
                <div className="h-14 w-14 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-white">ፕሮፖዛልዎ በተሳካ ሁኔታ ለአሰሪው ተልኳል!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  አሰሪው ፕሮፖዛልዎን አይቶ ውሳኔ ሲሰጥ በኢሜይል እና በሲስተሙ ማሳወቂያ ይደርስዎታል።
                </p>
                <Link
                  href="/jobs"
                  className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600"
                >
                  ተጨማሪ ሥራዎችን እይ
                </Link>
              </div>
            ) : (
              /* የማመልከቻ ፎርም */
              <form onSubmit={handleSubmitProposal} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* የሚጠይቁት ዋጋ */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      የሚጠይቁት ዋጋ (Your Bid in ETB) *
                    </label>
                    <input
                      type="number"
                      required
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="w-full rounded-xl bg-navy-950 border border-navy-800 px-3.5 py-2.5 text-sm text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  {/* የሚፈጀው ጊዜ */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      ሥራውን የምታጠናቅቁበት ጊዜ (Delivery Time) *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      placeholder="ለምሳሌ፡ 2 ሳምንት"
                      className="w-full rounded-xl bg-navy-950 border border-navy-800 px-3.5 py-2.5 text-sm text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* የማብራሪያ ደብዳቤ (Cover Letter) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    የማብራሪያ ደብዳቤ (Cover Letter & Approach) *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="ይህን ሥራ እንዴት እንደሚሰሩት፣ ያለዎትን ልምድና አሰራርዎን በአጭሩ ያብራሩ..."
                    className="w-full rounded-xl bg-navy-950 border border-navy-800 p-3.5 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {/* የፖርትፎሊዮ ማስፈንጠሪያ */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    የቀድሞ ስራዎች ማስፈንጠሪያ (Portfolio / GitHub link)
                  </label>
                  <input
                    type="url"
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    placeholder="https://myportfolio.com ወይም https://github.com/..."
                    className="w-full rounded-xl bg-navy-950 border border-navy-800 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {/* ፕሮፖዛል መላኪያ አዝራር */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>ፕሮፖዛሉን በመላክ ላይ...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>ፕሮፖዛሉን ላክ (Submit Proposal)</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

        {/* የቀኝ ክፍል - ስለ አሰሪው መረጃ (About Employer Card) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-24 p-6 rounded-3xl bg-navy-900/80 border border-navy-800 backdrop-blur-xl shadow-xl space-y-5">
            
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              ስለ አሰሪው መረጃ (About Employer)
            </h3>

            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center border border-brand-500/20 font-bold text-lg">
                {job.employer.company.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-white text-base">{job.employer.company}</h4>
                  {job.employer.verified && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" title="የተረጋገጠ አሰሪ" />
                  )}
                </div>
                <span className="text-xs text-slate-400">{job.employer.name}</span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-navy-800 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">አካባቢ (Location):</span>
                <span className="font-medium text-white">{job.employer.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">የአሰሪው ደረጃ (Rating):</span>
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400" />
                  {job.employer.rating} / 5.0
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">የተለጠፉ ሥራዎች:</span>
                <span className="font-medium text-white">{job.employer.jobsPosted} ሥራዎች</span>
              </div>
            </div>

            {/* የደህንነት ማሳሰቢያ */}
            <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 text-[11px] text-slate-400 leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 text-brand-400 font-semibold">
                <ShieldCheck className="h-4 w-4" />
                <span>የ AppWorks የደህንነት ዋስትና</span>
              </div>
              <p>ክፍያዎች በአሰሪው በቅድሚያ በሲስተሙ የተያዙ (Escrow/Verified) ስለሆኑ ሥራዎን በሙሉ ልብ መስራት ይችላሉ።</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
