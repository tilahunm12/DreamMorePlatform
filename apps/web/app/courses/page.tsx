'use client';

// አስፈላጊ የሆኑ የ React እና Next.js ሞጁሎችን ማስገባት
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// ለውበትና መስተጋብር የሚረዱ አይከኖች
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Star, 
  Users, 
  Sparkles, 
  ArrowRight,
  GraduationCap,
  Layers,
  ShoppingCart,
  Check
} from 'lucide-react';
// የኮርሶቹን መረጃ ማስገባት
import { COURSES_DATA, CourseItem } from '../../lib/coursesData';
import { useCartStore } from '../../stores/useCartStore';

/**
 * CoursesPage - የኮርሶች ዝርዝር እና መፈለጊያ ገጽ (Course Catalog)
 * ተማሪዎች ኮርሶችን በዘርፍ፣ በደረጃ፣ በዋጋ እና በፍለጋ ቃል አጣርተው የሚያዩበት ገጽ ነው።
 */
export default function CoursesPage() {
  const { addToCart, isInCart } = useCartStore();
  // 1. የፍለጋ ቃል State (Search Query)
  const [searchQuery, setSearchQuery] = useState('');
  
  // 2. የተመረጠው ዘርፍ/ምድብ (Category Filter) - 'all' ማለት ሁሉም
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 3. የኮርሶች አደራደር State (Sorting)
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-low' | 'price-high'>('popular');

  // የዘርፎች ዝርዝር (Category Chips)
  const categories = [
    { id: 'all', label: 'ሁሉም ኮርሶች (All)' },
    { id: 'programming', label: 'Programming & Coding' },
    { id: 'design', label: 'Graphics & UI/UX' },
    { id: 'engineering', label: 'Engineering & CAD' },
    { id: 'marketing', label: 'Digital Marketing' },
  ];

  // 4. ኮርሶችን በፍለጋና በዘርፍ ማጣራት (Filtered & Sorted Courses)
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      // በፍለጋ ቃል ማጣራት (ርዕስ ወይም መግለጫ ውስጥ)
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

      // በዘርፍ ማጣራት
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return b.studentsCount - a.studentsCount; // 'popular' በነባሪ
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen pb-20 pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. የገጹ ራስጌ (Header Banner) */}
      <div className="space-y-4 text-center sm:text-left mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-400 border border-brand-500/20">
          <Sparkles className="h-3.5 w-3.5 text-brand-400" />
          <span>ተግባር ተኮር የኦንላይን ትምህርቶች</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          ኮርሶችን ያስሱ (Course Catalog)
        </h1>
        <p className="text-slate-400 max-w-3xl text-sm sm:text-base leading-relaxed">
          በሙያው ከፍተኛ ልምድ ባላቸው ባለሙያዎች የተዘጋጁ ተግባራዊ ኮርሶች። አሁኑኑ ይመዝገቡ፣ ተምረው ያጠናቁ፤ የተረጋገጠ ሰርተፊኬት ያግኙ።
        </p>
      </div>

      {/* 2. የፍለጋ እና የማጣሪያ ክፍል (Search & Filters Bar) */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* የፍለጋ ሳጥን (Search Input) */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ኮርስ በርዕስ፣ በመምህር ስም ወይም በክህሎት ይፈልጉ..."
              className="w-full rounded-xl bg-navy-900/80 border border-navy-800 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors"
            />
          </div>

          {/* የአደራደር መምረጫ (Sort Dropdown) */}
          <div className="sm:w-56">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full rounded-xl bg-navy-900/80 border border-navy-800 px-4 py-2.5 text-sm text-slate-200 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              <option value="popular">ተፈላጊነት (Most Popular)</option>
              <option value="rating">ከፍተኛ ደረጃ (Highest Rated)</option>
              <option value="price-low">ዋጋ፡ ከዝቅተኛ ወደ ከፍተኛ</option>
              <option value="price-high">ዋጋ፡ ከከፍተኛ ወደ ዝቅተኛ</option>
            </select>
          </div>
        </div>

        {/* የዘርፎች መምረጫ አዝራሮች (Category Filter Chips) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25 scale-[1.02]'
                    : 'bg-navy-900/80 border border-navy-800 text-slate-400 hover:text-white hover:border-navy-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. የኮርሶች ካርዶች ዝርዝር (Course Cards Grid) */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group flex flex-col justify-between rounded-3xl bg-navy-900/50 border border-navy-800/80 overflow-hidden hover:border-brand-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/10"
            >
              {/* የኮርሱ ፎቶ (Thumbnail) */}
              <div className="relative h-48 w-full overflow-hidden bg-navy-950">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                
                {/* የዘርፍ እና የደረጃ ባጆች */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-navy-950/80 backdrop-blur-md text-brand-400 border border-navy-800">
                    {course.categoryLabel}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-navy-950/80 backdrop-blur-md text-slate-300 border border-navy-800">
                    {course.level}
                  </span>
                </div>
              </div>

              {/* የኮርሱ ዝርዝር መረጃዎች */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2">
                  {/* ደረጃ እና የተማሪዎች ብዛት (Rating & Students) */}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                      <span className="text-slate-500 font-normal">({course.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-slate-500" />
                      <span>{course.studentsCount} ተማሪዎች</span>
                    </div>
                  </div>

                  {/* የኮርሱ ርዕስ */}
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  {/* አጭር መግለጫ */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* መምህር እና የኮርስ ርዝማኔ */}
                <div className="pt-3 border-t border-navy-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="relative h-6 w-6 rounded-full overflow-hidden bg-navy-800">
                      <Image
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-slate-300 font-medium">{course.instructor.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-500" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* ዋጋ እና የመመዝገቢያ አዝራር */}
                <div className="pt-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400">የኮርሱ ዋጋ</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-extrabold text-white">
                        {course.price.toLocaleString()} ብር
                      </span>
                      {course.originalPrice && (
                        <span className="text-xs text-slate-500 line-through">
                          {course.originalPrice.toLocaleString()} ብር
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(course)}
                      title={isInCart(course.id) ? 'በጋሪው ውስጥ አለ' : 'ወደ ጋሪ ጨምር'}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isInCart(course.id)
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                          : 'bg-navy-950 border-navy-800 text-slate-400 hover:text-white hover:border-brand-500'
                      }`}
                    >
                      {isInCart(course.id) ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <ShoppingCart className="h-4 w-4" />
                      )}
                    </button>

                    <Link
                      href={`/courses/${course.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/20 hover:shadow-brand-500/30 transition-all hover:scale-105"
                    >
                      <span>ዝርዝሩን እይ</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ምንም ኮርስ ካልተገኘ (Empty State) */
        <div className="text-center py-20 bg-navy-900/30 rounded-3xl border border-navy-800 space-y-4">
          <BookOpen className="h-12 w-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">የተፈለገው ኮርስ አልተገኘም</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            በያስገቡት የፍለጋ ቃል ወይም የመረጡት ዘርፍ ምንም አይነት ኮርስ የለም። እባክዎ ሌላ ቃል ይሞክሩ።
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-navy-800 text-slate-300 hover:text-white"
          >
            ሁሉንም ኮርሶች አሳይ
          </button>
        </div>
      )}

    </div>
  );
}
