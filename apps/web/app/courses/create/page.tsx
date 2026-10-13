'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../stores/useAuthStore';
import { UserRole } from '@dream-more/shared';
import {
  BookOpen,
  PlusCircle,
  Trash2,
  Video,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  Sparkles,
  Layers,
  HelpCircle,
  Eye,
  Lock,
  Clock,
  ShieldCheck,
  Check
} from 'lucide-react';

interface LessonForm {
  title: string;
  duration: string;
  videoUrl: string;
  isFreePreview: boolean;
}

interface SectionForm {
  title: string;
  lessons: LessonForm[];
}

export default function CreateCoursePage() {
  const router = useRouter();
  const { user } = useAuthStore();

  // የደረጃዎች ቁጥጥር (Wizard Stepper: 1 -> 2 -> 3 -> 4)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // 1. መሰረታዊ መረጃ (Basic Info)
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('programming');
  const [categoryLabel, setCategoryLabel] = useState('Programming & Coding');
  const [level, setLevel] = useState('ጀማሪ (Beginner)');
  const [thumbnail, setThumbnail] = useState(
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60'
  );
  const [description, setDescription] = useState('');

  // 2. የትምህርት ክፍሎች (Curriculum Sections & Lessons)
  const [sections, setSections] = useState<SectionForm[]>([
    {
      title: 'ምዕራፍ 1፡ መግቢያና የፕሮጀክት ዝግጅት',
      lessons: [
        {
          title: 'የኮርሱ አጠቃላይ ገለፃ እና የትምህርት አሰጣጥ',
          duration: '10 ደቂቃ',
          videoUrl: 'https://www.youtube.com/watch?v=sample1',
          isFreePreview: true,
        },
        {
          title: 'የስራ አካባቢን ማዘጋጀት (Setup Environment)',
          duration: '15 ደቂቃ',
          videoUrl: 'https://www.youtube.com/watch?v=sample2',
          isFreePreview: true,
        },
      ],
    },
    {
      title: 'ምዕራፍ 2፡ ዋናው የትምህርት ትግበራ (Core Practice)',
      lessons: [
        {
          title: 'የመጀመሪያውን ፕሮጀክት መገንባት',
          duration: '25 ደቂቃ',
          videoUrl: 'https://www.youtube.com/watch?v=sample3',
          isFreePreview: false,
        },
      ],
    },
  ]);

  // 3. ዋጋ እና መስፈርቶች (Pricing & Requirements)
  const [price, setPrice] = useState('1500');
  const [originalPrice, setOriginalPrice] = useState('2500');
  const [outcomes, setOutcomes] = useState([
    'ዘመናዊ የድረ-ገጽ እና የመተግበሪያ ግንባታ ጥልቅ እውቀት',
    'ለሀገር ውስጥ እና ለአለም አቀፍ የፍሪላንስ ስራ ዝግጁ መሆን',
    'የተሟላ ፕሮጀክት ሰርቶ በ GitHub እና ፖርትፎሊዮ ላይ ማሳየት',
  ]);
  const [requirements, setRequirements] = useState([
    'መሰረታዊ የኮምፒውተር አጠቃቀም ክህሎት',
    'የበይነመረብ (Internet) ግንኙነት እና ኮምፒውተር',
  ]);

  // ምዕራፍ መጨመር (Add Section)
  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        title: `ምዕራፍ ${sections.length + 1}፡ አዲስ ርዕስ`,
        lessons: [
          {
            title: 'አዲስ ትምህርት',
            duration: '15 ደቂቃ',
            videoUrl: '',
            isFreePreview: false,
          },
        ],
      },
    ]);
  };

  // ትምህርት መጨመር (Add Lesson to Section)
  const handleAddLesson = (sectionIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].lessons.push({
      title: `ትምህርት ${updated[sectionIndex].lessons.length + 1}`,
      duration: '15 ደቂቃ',
      videoUrl: '',
      isFreePreview: false,
    });
    setSections(updated);
  };

  // ትምህርት መሰረዝ (Delete Lesson)
  const handleDeleteLesson = (sectionIndex: number, lessonIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].lessons.splice(lessonIndex, 1);
    setSections(updated);
  };

  // ምዕራፍ መሰረዝ (Delete Section)
  const handleDeleteSection = (sectionIndex: number) => {
    if (sections.length <= 1) return;
    const updated = sections.filter((_, idx) => idx !== sectionIndex);
    setSections(updated);
  };

  // ኮርሱን ማተም (Submit / Publish Course)
  const handlePublishCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setPublishSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/teacher');
      }, 2000);
    }, 1500);
  };

  // የደረጃዎች ስሞች
  const steps = [
    { number: 1, title: 'መሰረታዊ መረጃ' },
    { number: 2, title: 'የትምህርት ክፍሎች (Curriculum)' },
    { number: 3, title: 'ዋጋ እና መስፈርቶች' },
    { number: 4, title: 'ማጠቃለያ እና ማተም' },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      
      {/* 1. የአናት ርዕስ እና ወደ ኋላ መመለሻ */}
      <div className="flex items-center justify-between border-b border-navy-800 pb-6">
        <div>
          <Link
            href="/dashboard/teacher"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>ወደ መምህር ዳሽቦርድ ተመለስ</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            አዲስ ኮርስ ማዘጋጃ (Course Creation Wizard) 🎓
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            እንደ Udemy የተዋቀረ ኮርስ ያዘጋጁ፤ ቪዲዮዎችን ይጫኑ፤ ዋጋዎን በብር ይቁረጡ።
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-bold">
          <Sparkles className="h-4 w-4" />
          <span>መምህር፡ {user?.name || 'አስተማሪ'}</span>
        </div>
      </div>

      {/* 2. የሂደት ደረጃዎች መከታተያ (Step Indicators) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {steps.map((s) => (
          <div
            key={s.number}
            onClick={() => setCurrentStep(s.number)}
            className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
              currentStep === s.number
                ? 'bg-brand-500/15 border-brand-500 text-white shadow-lg shadow-brand-500/20'
                : currentStep > s.number
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-navy-900/40 border-navy-800 text-slate-400 hover:border-navy-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold">ደረጃ {s.number}</span>
              {currentStep > s.number && <Check className="h-4 w-4 text-emerald-400" />}
            </div>
            <span className="text-xs font-bold block mt-1 truncate">{s.title}</span>
          </div>
        ))}
      </div>

      {/* 3. የደረጃዎቹ ቅጾች (Step Contents) */}

      {/* STEP 1: መሰረታዊ መረጃ */}
      {currentStep === 1 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/60 border border-navy-800 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-400" />
            <span>ደረጃ 1፡ የኮርሱ መሰረታዊ መረጃ (Basic Details)</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                የኮርሱ ዋና ርዕስ (Course Title) *
              </label>
              <input
                type="text"
                required
                placeholder="ምሳሌ፡ የሙሉ ቁልል ድረ-ገጽ ግንባታ በ Next.js እና Node.js"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                አጭር ንዑስ ርዕስ (Course Subtitle)
              </label>
              <input
                type="text"
                placeholder="ምሳሌ፡ ከባዶ ጀምሮ እስከ ስራ ገበያ ድረስ ተግባራዊ የኮዲንግ ስልጠና"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">ዘርፍ (Category)</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    const labels: Record<string, string> = {
                      programming: 'Programming & Coding',
                      design: 'Graphics & UI/UX Design',
                      engineering: 'Engineering & CAD',
                      marketing: 'Digital Marketing',
                      business: 'Business & Entrepreneurship',
                    };
                    setCategoryLabel(labels[e.target.value] || 'General');
                  }}
                  className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="programming">Programming & Web Development</option>
                  <option value="design">UI/UX & Graphic Design</option>
                  <option value="engineering">Engineering & Architecture CAD</option>
                  <option value="marketing">Digital Marketing & Sales</option>
                  <option value="business">Business & Freelancing</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">የትምህርት ደረጃ (Level)</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="ጀማሪ (Beginner)">ጀማሪ (Beginner)</option>
                  <option value="መካከለኛ (Intermediate)">መካከለኛ (Intermediate)</option>
                  <option value="የላቀ (Advanced)">የላቀ (Advanced)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                የኮርሱ የፊት ምስል ሊንክ (Cover Thumbnail URL)
              </label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                ሙሉ የኮርሱ መግለጫ (Detailed Course Description)
              </label>
              <textarea
                rows={4}
                placeholder="ተማሪዎች በዚህ ኮርስ ውስጥ ምን ምን ርዕሶችን እንደሚማሩ፣ የኮርሱ አወቃቀር ምን እንደሚመስል..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-navy-800">
            <button
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 transition-all"
            >
              <span>ቀጣይ፡ የትምህርት ክፍሎች</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: የትምህርት ክፍሎችና ቪዲዮዎች (Curriculum Builder) */}
      {currentStep === 2 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/60 border border-navy-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="h-5 w-5 text-brand-400" />
                <span>ደረጃ 2፡ የትምህርት ክፍሎችና ቪዲዮዎች ማደራጃ (Curriculum Builder)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                ምዕራፎችን (Sections) ይፍጠሩ፤ በእያንዳንዱ ምዕራፍ ስር የቪዲዮ ትምህርቶችን ያክሉ።
              </p>
            </div>

            <button
              onClick={handleAddSection}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              <span>አዲስ ምዕራፍ ጨምር</span>
            </button>
          </div>

          <div className="space-y-6">
            {sections.map((section, secIdx) => (
              <div
                key={secIdx}
                className="p-5 rounded-2xl bg-navy-950/80 border border-navy-800 space-y-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <label className="text-[10px] font-bold uppercase text-brand-400 block mb-1">
                      ምዕራፍ {secIdx + 1}
                    </label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => {
                        const updated = [...sections];
                        updated[secIdx].title = e.target.value;
                        setSections(updated);
                      }}
                      className="w-full rounded-lg bg-navy-900 border border-navy-800 px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  {sections.length > 1 && (
                    <button
                      onClick={() => handleDeleteSection(secIdx)}
                      className="p-2 text-slate-500 hover:text-red-400 transition-colors self-end"
                      title="ምዕራፉን ሰርዝ"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* የትምህርቶች ዝርዝር */}
                <div className="space-y-3 pl-3 sm:pl-4 border-l-2 border-brand-500/30">
                  {section.lessons.map((lesson, lesIdx) => (
                    <div
                      key={lesIdx}
                      className="p-3.5 rounded-xl bg-navy-900/60 border border-navy-800/80 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <Video className="h-4 w-4 text-brand-400 flex-shrink-0" />
                          <input
                            type="text"
                            placeholder="የትምህርቱ ርዕስ"
                            value={lesson.title}
                            onChange={(e) => {
                              const updated = [...sections];
                              updated[secIdx].lessons[lesIdx].title = e.target.value;
                              setSections(updated);
                            }}
                            className="w-full rounded-lg bg-navy-950 border border-navy-800 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="ርዝመት (15 ደቂቃ)"
                          value={lesson.duration}
                          onChange={(e) => {
                            const updated = [...sections];
                            updated[secIdx].lessons[lesIdx].duration = e.target.value;
                            setSections(updated);
                          }}
                          className="w-28 rounded-lg bg-navy-950 border border-navy-800 px-2 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
                        />
                        <button
                          onClick={() => handleDeleteLesson(secIdx, lesIdx)}
                          className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <input
                          type="text"
                          placeholder="የቪዲዮ ሊንክ (YouTube/Vimeo/MP4 Stream Link)"
                          value={lesson.videoUrl}
                          onChange={(e) => {
                            const updated = [...sections];
                            updated[secIdx].lessons[lesIdx].videoUrl = e.target.value;
                            setSections(updated);
                          }}
                          className="flex-1 rounded-lg bg-navy-950 border border-navy-800 px-3 py-1.5 text-[11px] text-white focus:outline-none focus:border-brand-500"
                        />
                        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                          <input
                            type="checkbox"
                            checked={lesson.isFreePreview}
                            onChange={(e) => {
                              const updated = [...sections];
                              updated[secIdx].lessons[lesIdx].isFreePreview = e.target.checked;
                              setSections(updated);
                            }}
                            className="rounded bg-navy-950 border-navy-800 text-brand-500 focus:ring-0"
                          />
                          <span className="text-[11px] font-semibold">ነፃ የሙከራ ቪዲዮ (Free Preview)</span>
                        </label>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => handleAddLesson(secIdx)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors pt-1"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>ትምህርት ጨምር (Add Lesson)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-navy-800">
            <button
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>ተመለስ</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 transition-all"
            >
              <span>ቀጣይ፡ ዋጋና መስፈርቶች</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: ዋጋ እና መስፈርቶች */}
      {currentStep === 3 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/60 border border-navy-800 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-400" />
            <span>ደረጃ 3፡ ዋጋ፣ ቅናሽ እና የመማሪያ መስፈርቶች</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                የኮርሱ ትክክለኛ መሸጫ ዋጋ (በብር / ETB) *
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                የቀድሞው ዋጋ / ቅናሽ ለማሳየት (በብር / ETB)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 block">
              ተማሪዎች ከዚህ ኮርስ ምን ይማራሉ? (Learning Outcomes)
            </label>
            {outcomes.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs font-bold text-brand-400">✓</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updated = [...outcomes];
                    updated[idx] = e.target.value;
                    setOutcomes(updated);
                  }}
                  className="flex-1 rounded-xl bg-navy-950 border border-navy-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 block">
              ቅድመ-ሁኔታዎች (Requirements)
            </label>
            {requirements.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">•</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updated = [...requirements];
                    updated[idx] = e.target.value;
                    setRequirements(updated);
                  }}
                  className="flex-1 rounded-xl bg-navy-950 border border-navy-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-navy-800">
            <button
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>ተመለስ</span>
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 transition-all"
            >
              <span>ቀጣይ፡ ማጠቃለያና ማተም</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: ማጠቃለያ እና ማተም (Review & Publish) */}
      {currentStep === 4 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/60 border border-navy-800 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-black text-white">ኮርሱን ለማተም ዝግጁ ነዎት? 🎉</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ያዘጋጇቸውን መረጃዎች ከታች ያረጋግጡ። ኮርሱ እንደታተመ በ Dream More Platform የኮርሶች ገጽ ላይ ለተማሪዎች ይታያል።
            </p>
          </div>

          {/* የኮርሱ ቅድመ-ዕይታ ካርድ (Live Preview Card) */}
          <div className="max-w-md mx-auto rounded-3xl bg-navy-950 border border-navy-800 overflow-hidden shadow-2xl space-y-4 p-5">
            <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-navy-900">
              <img
                src={thumbnail}
                alt={title || 'Course Preview'}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-500 text-white shadow-md">
                {categoryLabel}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400">{level}</span>
              <h3 className="text-base font-bold text-white line-clamp-2">
                {title || 'የኮርሱ ርዕስ እዚህ ይጻፋል'}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">{subtitle}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-navy-800">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-white">{price} ETB</span>
                {originalPrice && (
                  <span className="text-xs text-slate-500 line-through">{originalPrice} ETB</span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">
                {sections.reduce((acc, s) => acc + s.lessons.length, 0)} ትምህርቶች
              </span>
            </div>
          </div>

          {publishSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">ኮርሱ በተሳካ ሁኔታ ታትሟል! 🚀</h3>
              <p className="text-xs text-slate-300">ወደ መምህር ዳሽቦርድ በመመለስ ላይ...</p>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-6 border-t border-navy-800">
              <button
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>ተመለስ</span>
              </button>

              <button
                onClick={handlePublishCourse}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>ኮርሱን በማተም ላይ...</span>
                ) : (
                  <>
                    <UploadCloud className="h-4 w-4" />
                    <span>ኮርሱን አትም (Publish Course Now)</span>
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
