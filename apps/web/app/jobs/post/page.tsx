'use client';

// አስፈላጊ የሆኑ የ React እና Next.js ሞጁሎችን ማስገባት
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// አይከኖች
import { 
  Briefcase, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  DollarSign, 
  Clock, 
  Layers, 
  Plus, 
  X,
  AlertCircle
} from 'lucide-react';

/**
 * PostJobPage - አዲስ የፍሪላንስ ሥራ መለጠፊያ ገጽ
 * ቀጣሪዎች (Employers) አዳዲስ ፕሮጀክቶችን እና ክፍት የሥራ ቦታዎችን የሚለጥፉበት ገጽ ነው።
 */
export default function PostJobPage() {
  const router = useRouter();

  // 1. የሥራ መለጠፊያ ፎርም መረጃዎች State
  const [formData, setFormData] = useState({
    title: '',
    category: 'web',
    description: '',
    budgetType: 'fixed',
    budget: '',
    duration: '',
    experienceLevel: 'መካከለኛ (Intermediate)',
  });

  // 2. ክህሎቶች State (Skills Tags)
  const [skills, setSkills] = useState<string[]>(['React', 'Tailwind CSS']);
  const [newSkill, setNewSkill] = useState('');

  // 3. ሁኔታዎች (Loading እና Success)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ክህሎት መጨመሪያ (Add Skill)
  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  // ክህሎት ማስወገጃ (Remove Skill)
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  // ሥራውን መለጠፍ (Submit Form Handler)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.budget) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/jobs');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen pb-20 pt-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
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

      <div className="p-8 sm:p-10 rounded-3xl bg-navy-900/60 border border-navy-800 backdrop-blur-xl shadow-2xl space-y-8">
        
        {/* የገጹ አናት አርዕስት */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-400 border border-brand-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ቀጣሪዎች (Employers)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            አዲስ የፍሪላንስ ሥራ ይለጥፉ
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            የሥራውን ዝርዝር፣ የተመደበውን ባጀት እና የሚያስፈልጉ ክህሎቶችን ይግለጹ።
          </p>
        </div>

        {isSuccess ? (
          /* ሥራው በተሳካ ሁኔታ ሲለጠፍ */
          <div className="text-center py-12 space-y-4 bg-navy-950/60 rounded-2xl border border-emerald-500/30 p-8">
            <div className="h-16 w-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">ሥራው በተሳካ ሁኔታ ተለጥፏል!</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              የሥራ ማስታወቂያዎ አሁን በገበያው ላይ ይገኛል። ፍሪላንሰሮች ፕሮፖዛል ማቅረብ ሲጀምሩ ማሳወቂያ ይደርስዎታል።
            </p>
          </div>
        ) : (
          /* የሥራ መለጠፊያ ፎርም */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. የሥራው ርዕስ (Job Title) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                የሥራው አጭርና ግልፅ ርዕስ (Job Title) *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="ለምሳሌ፡ የኢ-ኮሜርስ ድረ-ገጽ ግንባታ በ Next.js"
                className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
              />
            </div>

            {/* 2. የሥራው ዘርፍ እና የልምድ ደረጃ (Category & Level) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  የሥራው ዘርፍ (Category) *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-3 text-sm text-slate-200 focus:border-brand-500 focus:outline-none"
                >
                  <option value="web">Web Development</option>
                  <option value="design">UI/UX Design</option>
                  <option value="cad">CAD & Engineering</option>
                  <option value="video">Video Editing & Animation</option>
                  <option value="marketing">Digital Marketing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  የሚፈለገው የልምድ ደረጃ *
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                  className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-3 text-sm text-slate-200 focus:border-brand-500 focus:outline-none"
                >
                  <option value="ጀማሪ (Entry)">ጀማሪ (Entry Level)</option>
                  <option value="መካከለኛ (Intermediate)">መካከለኛ (Intermediate)</option>
                  <option value="ባለሙያ (Expert)">ባለሙያ (Expert Level)</option>
                </select>
              </div>
            </div>

            {/* 3. ዝርዝር መግለጫ (Job Description) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                የሥራው ዝርዝር መግለጫና መስፈርቶች (Detailed Description) *
              </label>
              <textarea
                required
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="የፕሮጀክቱን ግብ፣ የሚፈለጉ ውጤቶችን እና መስፈርቶችን በዝርዝር ያብራሩ..."
                className="w-full rounded-xl bg-navy-950 border border-navy-800 p-4 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
              />
            </div>

            {/* 4. ባጀት እና የሚፈጀው ጊዜ (Budget & Duration) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  የተመደበ ባጀት በብር (Budget in ETB) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="ለምሳሌ፡ 25000"
                  className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-3 text-sm text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  የሚፈጀው ጊዜ (Estimated Duration) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="ለምሳሌ፡ 2 ሳምንት ወይም 1 ወር"
                  className="w-full rounded-xl bg-navy-950 border border-navy-800 px-4 py-3 text-sm text-white focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>

            {/* 5. የሚያስፈልጉ ክህሎቶች (Skills Tags) */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                የሚያስፈልጉ ክህሎቶች (Required Skills)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="ክህሎት ጽፈው ይጨምሩ (ለምሳሌ፡ Figma, Python)..."
                  className="flex-1 rounded-xl bg-navy-950 border border-navy-800 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(e);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-xs font-semibold text-white transition-colors"
                >
                  ጨምር
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-red-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* ሥራ መለጠፊያ አዝራር */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 disabled:opacity-50 transition-all"
            >
              {isSubmitting ? 'ሥራውን በመለጠፍ ላይ...' : 'ሥራውን ይለጥፉ (Publish Job)'}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
