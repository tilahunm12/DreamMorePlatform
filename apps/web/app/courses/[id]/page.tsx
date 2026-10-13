'use client';

// አስፈላጊ የሆኑ የ React እና Next.js ሞጁሎችን ማስገባት
import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// አይከኖች
import { 
  BookOpen, 
  Clock, 
  Star, 
  Users, 
  CheckCircle2, 
  ArrowLeft, 
  PlayCircle, 
  ShieldCheck, 
  UploadCloud, 
  FileText, 
  Sparkles,
  Lock,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
// የኮርሶች መረጃ
import { COURSES_DATA } from '../../../lib/coursesData';
import { useAuthStore } from '../../../stores/useAuthStore';
import { apiClient } from '../../../lib/api-client';

/**
 * CourseDetailPage - የአንድ የተመረጠ ኮርስ ዝርዝር መረጃ እና መመዝገቢያ ገጽ
 * ተማሪዎች የትምህርቱን ይዘት አይተው፣ የክፍያ ስክሪንሾት እና የትራንዛክሽን ቁጥር ጭነው የሚመዘገቡበት ነው።
 */
export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const resolvedParams = use(params);
  const courseId = resolvedParams.id;

  // የተመረጠውን ኮርስ ከመረጃ ቋቱ መፈለግ
  const course = COURSES_DATA.find((c) => c.id === courseId) || COURSES_DATA[0];

  // 1. የክፍያ ሞዳል (Payment Modal) ሁኔታ State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // 2. የክፍያ ፎርም መረጃዎች (Payment Submission State)
  const [transactionId, setTransactionId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'telebirr' | 'cbe' | 'awash'>('telebirr');
  const [screenshotUploaded, setScreenshotUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // የባንክና የቴሌብር መረጃዎች (Bank & Telebirr Accounts)
  const paymentAccounts = {
    telebirr: { name: 'Telebirr (ቴሌብር)', number: '0911000000', accountName: 'Dream More Platform' },
    cbe: { name: 'Commercial Bank of Ethiopia (CBE)', number: '1000123456789', accountName: 'Dream More Platform' },
    awash: { name: 'Awash Bank', number: '0132000000000', accountName: 'Dream More Platform' },
  };

  // የሂሳብ ቁጥር መቅጃ (Copy account number helper)
  const handleCopyAccount = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedAccount(number);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  // የክፍያ መረጃውን ለአድሚን ማረጋገጫ መላክ (Submit Payment for Admin Approval)
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId) return;

    setIsSubmitting(true);

    try {
      await apiClient.post('/payments', {
        studentId: user?.id,
        studentEmail: user?.email || 'student@dreammore.com',
        studentName: user?.name || 'ተማሪ',
        courseId: course.id,
        courseTitle: course.title,
        amount: course.price,
        transactionId: transactionId.trim(),
        paymentMethod,
        screenshotUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60',
      });
      setIsSubmitting(false);
      setPaymentSuccess(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setPaymentSuccess(true);
    }
  };

  return (
    <div className="min-h-screen pb-20 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* ወደ ኋላ መመለሻ አዝራር */}
      <div className="mb-6">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-brand-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>ወደ ኮርሶች ዝርዝር ተመለስ</span>
        </Link>
      </div>

      {/* የኮርሱ ራስጌ ማጠቃለያ (Course Header Banner) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* የግራ ክፍል - አርዕስት እና ዝርዝር መረጃ */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
              {course.categoryLabel}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-navy-900 text-slate-300 border border-navy-800">
              {course.level}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {course.title}
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            {course.description}
          </p>

          {/* መምህር፣ ደረጃ እና የተማሪዎች ቁጥር */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300 border-t border-navy-800/80">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 rounded-full overflow-hidden bg-navy-800">
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">አሰልጣኝ</span>
                <span className="font-semibold text-white">{course.instructor.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>{course.rating}</span>
              <span className="text-slate-400 font-normal">({course.reviewCount} ግምገማዎች)</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-300">
              <Users className="h-4 w-4 text-brand-400" />
              <span>{course.studentsCount} ተማሪዎች</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="h-4 w-4 text-brand-400" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>

        {/* የቀኝ ክፍል - የመመዝገቢያ ካርድ (Sticky Enroll Card) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-3xl bg-navy-900/80 border border-navy-800 p-6 backdrop-blur-xl shadow-2xl space-y-6">
            
            {/* ቪዲዮ ማሳያ ምስል */}
            <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-navy-950">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy-950/40 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/40 hover:scale-110 transition-transform">
                  <PlayCircle className="h-7 w-7" />
                </div>
              </div>
            </div>

            {/* የዋጋ መረጃ */}
            <div className="space-y-1">
              <span className="text-xs text-slate-400">የኮርሱ ዋጋ</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white">
                  {course.price.toLocaleString()} ብር
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    {course.originalPrice.toLocaleString()} ብር
                  </span>
                )}
              </div>
            </div>

            {/* የመመዝገቢያ አዝራር */}
            <div className="space-y-2">
              <Link
                href={`/courses/${course.id}/learn`}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all hover:scale-[1.02]"
              >
                <PlayCircle className="h-5 w-5" />
                <span>ትምህርቱን ጀምር (Start Learning)</span>
              </Link>
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-300 bg-navy-800 hover:bg-navy-700 border border-navy-700 transition-colors"
              >
                <ShieldCheck className="h-4 w-4 text-brand-400" />
                <span>በቴሌብር / ባንክ ይክፈሉ (Enroll with Payment)</span>
              </button>
            </div>

            {/* የኮርሱ ጥቅሎች ዝርዝር */}
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <span className="font-semibold text-slate-200 block">ኮርሱ የሚያካትታቸው፦</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-400" />
                <span>{course.duration} የተሟሉ ቪዲዮ ትምህርቶች</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-400" />
                <span>{course.totalLessons} ተግባራዊ ልምምዶችና ጥያቄዎች</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-400" />
                <span>የ QR Code የተረጋገጠ ሰርተፊኬት</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-400" />
                <span>በስልክና በኮምፒውተር ማየት የሚቻል</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* የኮርሱ ዝርዝር ማብራሪያ (Tabs / Sections) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          
          {/* ምን ይማራሉ? (What you will learn) */}
          <div className="p-6 rounded-3xl bg-navy-900/40 border border-navy-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-400" />
              <span>በዚህ ኮርስ ምን ይማራሉ?</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
              {course.whatYouWillLearn.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* የኮርሱ ምዕራፎችና ትምህርቶች (Curriculum) */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-400" />
              <span>የትምህርቱ ይዘት (Course Content)</span>
            </h3>

            <div className="space-y-3">
              {course.sections.map((section, idx) => (
                <div key={section.id} className="rounded-2xl bg-navy-900/40 border border-navy-800 overflow-hidden">
                  <div className="px-5 py-3.5 bg-navy-900/80 border-b border-navy-800 flex items-center justify-between">
                    <span className="font-semibold text-sm text-white">{section.title}</span>
                    <span className="text-xs text-slate-400">{section.lessons.length} ትምህርቶች</span>
                  </div>
                  <div className="divide-y divide-navy-800/50">
                    {section.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/courses/${course.id}/learn`}
                        className="px-5 py-3 flex items-center justify-between text-xs hover:bg-navy-900/60 transition-colors block"
                      >
                        <div className="flex items-center gap-2.5 text-slate-300">
                          {lesson.isFreePreview ? (
                            <PlayCircle className="h-4 w-4 text-brand-400" />
                          ) : (
                            <Lock className="h-4 w-4 text-slate-500" />
                          )}
                          <span className="hover:text-brand-400 transition-colors">{lesson.title}</span>
                          {lesson.isFreePreview && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                              ነፃ ሙከራ
                            </span>
                          )}
                        </div>
                        <span className="text-slate-500">{lesson.duration}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ቅድመ ሁኔታዎች (Requirements) */}
          <div className="p-6 rounded-3xl bg-navy-900/40 border border-navy-800 space-y-3">
            <h3 className="text-base font-bold text-white">ቅድመ-ሁኔታዎች (Requirements)</h3>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-300">
              {course.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* 4. የክፍያ ስክሪንሾት መጫኛ ሞዳል (Manual Payment Verification Modal) */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-navy-900 border border-navy-800 p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* የሞዳሉ አርዕስት */}
            <div className="flex items-center justify-between border-b border-navy-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">የኮርስ ክፍያ ማረጋገጫ</h3>
                <p className="text-xs text-slate-400">እባክዎ ክፍያውን ፈጽመው ደረሰኙን ያስገቡ</p>
              </div>
              <button
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  setPaymentSuccess(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800"
              >
                ✕
              </button>
            </div>

            {paymentSuccess ? (
              /* ክፍያው በተሳካ ሁኔታ ሲላክ */
              <div className="text-center py-6 space-y-4">
                <div className="h-16 w-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-white">የክፍያ መረጃዎ በተሳካ ሁኔታ ተልኳል!</h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                  የላኩት ደረሰኝ እና የትራንዛክሽን ቁጥር በአድሚን ተገምግሞ ሲፈቀድ ኮርሱ በራስ-ሰር ይከፈትልዎታል። ማሳወቂያ በኢሜይል ይደርስዎታል።
                </p>
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600"
                >
                  እሺ ተረድቻለሁ
                </button>
              </div>
            ) : (
              /* የክፍያ መመሪያና ፎርም */
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                
                {/* 1. የክፍያ አማራጭ መምረጫ */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    የክፍያ ዘዴ ይምረጡ (Payment Method)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['telebirr', 'cbe', 'awash'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`p-2 rounded-xl text-xs font-bold border capitalize transition-colors ${
                          paymentMethod === method
                            ? 'border-brand-500 bg-brand-500/15 text-white'
                            : 'border-navy-800 bg-navy-950 text-slate-400 hover:border-navy-700'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* የሂሳብ ቁጥር መረጃ ማሳያ */}
                <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 space-y-1.5 text-xs">
                  <span className="text-slate-400 block">{paymentAccounts[paymentMethod].name}</span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-white">
                      {paymentAccounts[paymentMethod].number}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyAccount(paymentAccounts[paymentMethod].number)}
                      className="inline-flex items-center gap-1 text-[11px] text-brand-400 hover:text-brand-300"
                    >
                      {copiedAccount === paymentAccounts[paymentMethod].number ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">ተገልብጧል</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>ቅዳ (Copy)</span>
                        </>
                      )}
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    የሂሳብ ስም፡ {paymentAccounts[paymentMethod].accountName} | የሚከፈል፡{' '}
                    <strong className="text-brand-400">{course.price.toLocaleString()} ብር</strong>
                  </span>
                </div>

                {/* 2. የትራንዛክሽን ቁጥር (Transaction ID) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    የትራንዛክሽን ቁጥር (Transaction ID / Ref) *
                  </label>
                  <input
                    type="text"
                    required
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="ለምሳሌ፡ FT240987654321 ወይም TXN12345"
                    className="w-full rounded-xl bg-navy-950 border border-navy-800 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {/* 3. የደረሰኝ ስክሪንሾት መጫኛ (Screenshot Upload) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    የክፍያ ደረሰኝ ስክሪንሾት (Screenshot Upload) *
                  </label>
                  <div
                    onClick={() => setScreenshotUploaded(true)}
                    className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                      screenshotUploaded
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-navy-800 hover:border-brand-500 bg-navy-950'
                    }`}
                  >
                    {screenshotUploaded ? (
                      <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-semibold">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>ስክሪንሾት ተመርጧል (screenshot_receipt.png)</span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <UploadCloud className="h-6 w-6 text-brand-400 mx-auto" />
                        <span className="text-xs text-slate-300 block font-medium">ስክሪንሾት ለመጫን እዚህ ይጫኑ</span>
                        <span className="text-[10px] text-slate-500 block">PNG, JPG እስከ 5MB</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* የማረጋገጫ አዝራር */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? 'ደረሰኙን በመላክ ላይ...' : 'የክፍያ ማረጋገጫውን ላክ (Submit Payment)'}
                </button>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
