'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { COURSES_DATA, LessonItem } from '../../../../lib/coursesData';
import {
  Play,
  Pause,
  CheckCircle2,
  Circle,
  Award,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  FileText,
  MessageSquare,
  Download,
  HelpCircle,
  Share2,
  Volume2,
  Maximize2,
  Settings,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function CourseLearningPlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const courseId = resolvedParams.id;

  // የተመረጠውን ኮርስ ማግኘት
  const course = COURSES_DATA.find((c) => c.id === courseId) || COURSES_DATA[0];

  // ሁሉም ትምህርቶች በአንድ ዝርዝር
  const allLessons = course.sections.flatMap((sec) => sec.lessons);

  // አሁን እየታየ ያለው ትምህርት (Current Active Lesson)
  const [currentLesson, setCurrentLesson] = useState<LessonItem>(allLessons[0]);

  // የተጠናቀቁ ትምህርቶች ዝርዝር (Completed Lesson IDs)
  const [completedLessons, setCompletedLessons] = useState<string[]>([allLessons[0]?.id]);

  // የታጠፉ/የተዘረጉ ምዕራፎች (Section Accordion State)
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  // ንቁ ታብ (Active Tab below video)
  const [activeTab, setActiveTab] = useState<'overview' | 'quiz' | 'qa' | 'resources'>('overview');

  // የፈተና ጥያቄዎች መልስ ስቴት (Quiz state)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // የቪዲዮ ፍጥነት (Playback Speed)
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // ምዕራፍ መክፈቻ/መዝጊያ
  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // ትምህርት ማጠናቀቅን ማረጋገጥ (Toggle Complete)
  const toggleLessonComplete = (lessonId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCompletedLessons((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  // የሂደት መቶኛ (Completion Percentage)
  const completionPercentage = Math.round(
    (completedLessons.length / (allLessons.length || 1)) * 100
  );

  // ወደ ቀጣይ ትምህርት መሸጋገር
  const handleNextLesson = () => {
    const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex < allLessons.length - 1) {
      const next = allLessons[currentIndex + 1];
      setCurrentLesson(next);
      if (!completedLessons.includes(currentLesson.id)) {
        setCompletedLessons((prev) => [...prev, currentLesson.id]);
      }
    }
  };

  // ወደ ቀዳሚ ትምህርት መመለስ
  const handlePrevLesson = () => {
    const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex > 0) {
      setCurrentLesson(allLessons[currentIndex - 1]);
    }
  };

  // የፈተና ጥያቄዎች (Sample Quiz Questions)
  const quizQuestions = [
    {
      question: '1. Next.js 15 ላይ App Router የሚጠቀምበት ነባሪ የፋይል ስም ለዋና ገጽ የትኛው ነው?',
      options: ['index.js', 'page.tsx', 'main.jsx', 'app.ts'],
      correct: 1,
    },
    {
      question: '2. React ላይ የ state ለውጥን ለመቆጣጠር በብዛት የምንጠቀመው Hook የትኛው ነው?',
      options: ['useEffect', 'useReducer', 'useState', 'useRef'],
      correct: 2,
    },
    {
      question: '3. በኢትዮጵያ ለተማሪዎች የክፍያ ዋስትና (Escrow) የትኛው ፕላትፎርም ያቀርባል?',
      options: ['Coursera', 'Dream More Platform', 'Udemy', 'edX'],
      correct: 1,
    },
  ];

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuizSubmitted(true);
    // ሁሉንም በትክክል ከመለሰ ትምህርቱን እንደተጠናቀቀ መመዝገብ
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons((prev) => [...prev, currentLesson.id]);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col">
      
      {/* 1. የአናት አሰሳ ባር (Top Header Bar - Udemy Style) */}
      <header className="h-16 border-b border-navy-800 bg-navy-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href={`/courses/${course.id}`}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">ወደ ኮርሱ ዝርዝር</span>
          </Link>
          <div className="h-5 w-px bg-navy-800 hidden sm:block" />
          <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
            {course.title}
          </h1>
        </div>

        {/* የእድገት መከታተያ ባር (Progress Bar & Certificate) */}
        <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-bold text-brand-400">
                {completionPercentage}% ተጠናቋል
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">
                {completedLessons.length} ከ {allLessons.length} ትምህርቶች
              </span>
            </div>
            <div className="w-20 sm:w-28 h-2 rounded-full bg-navy-950 overflow-hidden border border-navy-800">
              <div
                className="h-full bg-brand-500 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {completionPercentage === 100 ? (
            <Link
              href="/verify"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/25 transition-all animate-pulse"
            >
              <Award className="h-3.5 w-3.5" />
              <span>ሰርተፊኬት ይውሰዱ 🏆</span>
            </Link>
          ) : (
            <button
              onClick={() => alert(`ሰርተፊኬትዎን ለማግኘት የቀሩትን ${allLessons.length - completedLessons.length} ትምህርቶች ያጠናቁ!`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 bg-navy-800/80 border border-navy-700 hover:text-slate-200 transition-colors"
            >
              <Award className="h-3.5 w-3.5 text-slate-500" />
              <span className="hidden sm:inline">ሰርተፊኬት</span>
            </button>
          )}
        </div>
      </header>

      {/* 2. ዋናው ይዘት እና የቀኝ ማውጫ (Player and Curriculum Layout) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* ቪዲዮ እና የትምህርቱ ዝርዝር ክፍል (Left Player Column) */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          
          {/* የቪዲዮ ማጫወቻ ሳጥን (Video Player Container) */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center border-b border-navy-800 group overflow-hidden">
            
            {/* Mock High-Res Video Screen / Thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-black/60 pointer-events-none z-10" />
            <img
              src={course.thumbnail}
              alt={currentLesson.title}
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
            />

            {/* የማጫወቻ ቁልፍ (Play / Pause Button Overlay) */}
            <div className="relative z-20 flex flex-col items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-20 w-20 rounded-full bg-brand-500/90 text-white flex items-center justify-center shadow-2xl shadow-brand-500/50 hover:scale-110 hover:bg-brand-500 transition-all cursor-pointer"
                title={isPlaying ? 'አቁም (Pause)' : 'አጫውት (Play)'}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8 text-white" />
                ) : (
                  <Play className="h-8 w-8 text-white fill-white translate-x-0.5" />
                )}
              </button>
              <span className="text-xs font-bold text-white/90 bg-navy-950/80 px-3 py-1 rounded-full border border-navy-800 backdrop-blur-sm">
                {currentLesson.title} ({currentLesson.duration})
              </span>
            </div>

            {/* የቪዲዮ መቆጣጠሪያ ባር (Controls Overlay at bottom) */}
            <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-brand-400 transition-colors"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                </button>
                <span className="text-[11px] text-slate-300">03:45 / {currentLesson.duration}</span>
              </div>

              <div className="flex items-center gap-3">
                {/* የፍጥነት መምረጫ */}
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                  className="bg-navy-900 border border-navy-700 text-white text-[11px] rounded-md px-2 py-0.5 focus:outline-none focus:border-brand-500"
                >
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1.0x (መደበኛ)</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2.0x</option>
                </select>
                <Maximize2 className="h-4 w-4 cursor-pointer hover:text-brand-400 transition-colors" />
              </div>
            </div>

          </div>

          {/* የትምህርቱ የቁጥጥር ቁልፎች (Previous / Next Lesson Bar) */}
          <div className="bg-navy-900/60 border-b border-navy-800 px-6 py-3 flex items-center justify-between">
            <button
              onClick={handlePrevLesson}
              disabled={allLessons.findIndex((l) => l.id === currentLesson.id) === 0}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>ያለፈው ትምህርት</span>
            </button>

            <button
              onClick={() => toggleLessonComplete(currentLesson.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                completedLessons.includes(currentLesson.id)
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-brand-500 text-white shadow-md shadow-brand-500/20 hover:bg-brand-600'
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>
                {completedLessons.includes(currentLesson.id) ? 'ተጠናቋል ✓' : 'እንደተጠናቀቀ ምልክት አድርግ'}
              </span>
            </button>

            <button
              onClick={handleNextLesson}
              disabled={allLessons.findIndex((l) => l.id === currentLesson.id) === allLessons.length - 1}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <span>ቀጣይ ትምህርት</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* 3. ከቪዲዮው ስር ያሉ ታቦች (Tabs: Overview, Quiz, Q&A, Resources) */}
          <div className="p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center gap-2 border-b border-navy-800 pb-3">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-navy-900'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>ስለ ትምህርቱ (Overview)</span>
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'quiz'
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-navy-900'
                }`}
              >
                <HelpCircle className="h-4 w-4" />
                <span>ፈተና (Quiz & Practice)</span>
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'resources'
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-navy-900'
                }`}
              >
                <Download className="h-4 w-4" />
                <span>ማውረጃ ፋይሎች (Resources)</span>
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'qa'
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-navy-900'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span>ጥያቄና መልስ (Q&A)</span>
              </button>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{currentLesson.title}</h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    በዚህ የትምህርት ክፍል ውስጥ የተማርናቸውን ቁልፍ ነጥቦች በተግባር እንለማመዳለን። ኮዱን ደረጃ በደረጃ በመከተል በራሳችሁ ኮምፒውተር ላይ መሞከርን አትዘንጉ።
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-navy-900/60 border border-navy-800 space-y-3">
                  <h3 className="text-sm font-bold text-brand-400 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>ቁልፍ የመማሪያ ነጥቦች (Key Takeaways)</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span> የፕሮጀክቱን መዋቅር በትክክል ማደራጀት
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span> በ TypeScript Type Safety እና ንጹህ የኮድ አጻጻፍ ልምምድ
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span> ለስራ ገበያ ዝግጁ የሆነ ፕሮጀክት መገንባት
                    </li>
                  </ul>
                </div>

                {/* መምህሩ */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-navy-900/40 border border-navy-800">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border border-brand-500/30">
                    <Image
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{course.instructor.name}</span>
                    <span className="text-[11px] text-slate-400">{course.instructor.role}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: QUIZ */}
            {activeTab === 'quiz' && (
              <form onSubmit={handleQuizSubmit} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">የምዕራፉ የሙከራ ጥያቄዎች (Mini Quiz)</h2>
                  <span className="text-xs font-bold text-brand-400">3 ጥያቄዎች</span>
                </div>

                {quizQuestions.map((q, qIndex) => (
                  <div key={qIndex} className="p-5 rounded-2xl bg-navy-900/60 border border-navy-800 space-y-3">
                    <h3 className="text-xs sm:text-sm font-bold text-white">{q.question}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = quizAnswers[qIndex] === optIndex;
                        const isCorrect = q.correct === optIndex;
                        return (
                          <button
                            type="button"
                            key={optIndex}
                            onClick={() => setQuizAnswers({ ...quizAnswers, [qIndex]: optIndex })}
                            className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                              quizSubmitted
                                ? isCorrect
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40'
                                  : isSelected
                                  ? 'bg-red-500/10 text-red-400 border-red-500/40'
                                  : 'bg-navy-950 text-slate-400 border-navy-800'
                                : isSelected
                                ? 'bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/20'
                                : 'bg-navy-950 text-slate-300 border-navy-800 hover:border-navy-700'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 transition-all"
                >
                  መልሶችን አስገባ (Submit Answers)
                </button>
              </form>
            )}

            {/* TAB 3: RESOURCES */}
            {activeTab === 'resources' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-white">የትምህርቱ ማውረጃ ፋይሎች (Downloadable Resources)</h2>
                <div className="space-y-2">
                  <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-brand-400" />
                      <div>
                        <span className="text-xs font-bold text-white block">Next.js & React Cheatsheet (PDF)</span>
                        <span className="text-[10px] text-slate-400">2.4 MB • የአማርኛና የእንግሊዝኛ ማብራሪያ</span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert('የፋይሉ ማውረጃ ሊንክ ተዘጋጅቷል!')}
                      className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-brand-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>አውርድ</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-emerald-400" />
                      <div>
                        <span className="text-xs font-bold text-white block">Project Starter Code (ZIP)</span>
                        <span className="text-[10px] text-slate-400">14.1 MB • ሙሉ የ GitHub Source Code</span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert('የኮድ ፋይሉ ማውረጃ ተዘጋጅቷል!')}
                      className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-brand-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>አውርድ</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Q&A */}
            {activeTab === 'qa' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-white">የተማሪዎች ጥያቄና መልስ (Q&A Discussion)</h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-400">ዮሐንስ አበበ</span>
                      <span className="text-[10px] text-slate-500">ከ 2 ሰዓት በፊት</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      በ Node.js ላይ የ CORS error እያጋጠመኝ ነው፤ በምን መንገድ መፍታት እችላለሁ?
                    </p>
                    <div className="pl-4 border-l-2 border-brand-500/40 text-xs text-slate-400 mt-2">
                      <strong className="text-white block mb-0.5">ኢንጂነር ዳዊት ሰለሞን (አስተማሪ)፡</strong>
                      በ NestJS main.ts ላይ `app.enableCors()` በመጨመር በቀላሉ መፍታት ትችላለህ።
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* 4. የቀኝ የኮርሱ ይዘቶች ማውጫ (Curriculum Accordion Sidebar - Udemy Style) */}
        <aside className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-navy-800 bg-navy-900/40 flex flex-col h-auto lg:h-[calc(100vh-4rem)]">
          <div className="p-4 border-b border-navy-800 bg-navy-900/80">
            <h2 className="text-sm font-bold text-white">የትምህርቱ ይዘቶች (Course Content)</h2>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
              <span>{course.sections.length} ምዕራፎች • {allLessons.length} ትምህርቶች</span>
              <span className="font-bold text-brand-400">{completionPercentage}% ተጠናቋል</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-navy-800/60">
            {course.sections.map((sec, secIdx) => {
              const isCollapsed = collapsedSections[sec.id];
              return (
                <div key={sec.id} className="bg-navy-950/40">
                  {/* የምዕራፉ ርዕስ (Section Accordion Header) */}
                  <button
                    onClick={() => toggleSection(sec.id)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-navy-800/40 transition-colors"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block">{sec.title}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {sec.lessons.length} ትምህርቶች
                      </span>
                    </div>
                    {isCollapsed ? (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    )}
                  </button>

                  {/* የትምህርቶቹ ዝርዝር (Lessons List) */}
                  {!isCollapsed && (
                    <div className="divide-y divide-navy-800/30">
                      {sec.lessons.map((les) => {
                        const isCurrent = currentLesson.id === les.id;
                        const isDone = completedLessons.includes(les.id);
                        return (
                          <div
                            key={les.id}
                            onClick={() => setCurrentLesson(les)}
                            className={`p-3.5 pl-6 flex items-center justify-between cursor-pointer transition-colors text-xs ${
                              isCurrent
                                ? 'bg-brand-500/15 border-l-4 border-brand-500 text-white font-bold'
                                : 'text-slate-300 hover:bg-navy-800/30'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-2">
                              <button
                                onClick={(e) => toggleLessonComplete(les.id, e)}
                                className="flex-shrink-0"
                              >
                                {isDone ? (
                                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                ) : (
                                  <Circle className="h-4 w-4 text-slate-500 hover:text-slate-300" />
                                )}
                              </button>
                              <span className="truncate">{les.title}</span>
                            </div>

                            <span className="text-[10px] text-slate-500 flex-shrink-0 font-normal">
                              {les.duration}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

      </div>

    </div>
  );
}
