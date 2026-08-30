/**
 * coursesData.ts - የኮርሶች መረጃ ናሙና (Mock Courses Data)
 * የትምህርት ክፍሎችን፣ የመምህራን ዝርዝር፣ የትምህርት ደረጃዎችን እና ዋጋዎችን የያዘ ነው።
 */

export interface LessonItem {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  isFreePreview?: boolean;
}

export interface CourseSectionItem {
  id: string;
  title: string;
  lessons: LessonItem[];
}

export interface CourseItem {
  id: string;
  title: string;
  slug: string;
  category: 'programming' | 'design' | 'engineering' | 'marketing' | 'business';
  categoryLabel: string;
  description: string;
  thumbnail: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  level: 'ጀማሪ (Beginner)' | 'መካከለኛ (Intermediate)' | 'የላቀ (Advanced)';
  duration: string;
  totalLessons: number;
  rating: number;
  reviewCount: number;
  studentsCount: number;
  price: number; // በብር (ETB)
  originalPrice?: number;
  sections: CourseSectionItem[];
  requirements: string[];
  whatYouWillLearn: string[];
}

export const COURSES_DATA: CourseItem[] = [
  {
    id: 'course-1',
    title: 'የሙሉ ቁልል ድረ-ገጽ ግንባታ (Full-Stack Web Development)',
    slug: 'fullstack-web-development',
    category: 'programming',
    categoryLabel: 'Programming & Coding',
    description: 'Next.js፣ React፣ Node.js፣ TypeScript እና PostgreSQL በመጠቀም ዘመናዊ እና ፈጣን ድረ-ገጾችን ከባዶ ጀምረው ይገንቡ።',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60',
    instructor: {
      name: 'ኢንጂነር ዳዊት ሰለሞን',
      role: 'Senior Full-Stack Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    },
    level: 'ጀማሪ (Beginner)',
    duration: '24 ሰዓት',
    totalLessons: 42,
    rating: 4.9,
    reviewCount: 128,
    studentsCount: 450,
    price: 1500,
    originalPrice: 2500,
    requirements: [
      'መሰረታዊ የኮምፒውተር አጠቃቀም ክህሎት',
      'የበይነመረብ (Internet) ግንኙነት እና ኮምፒውተር',
    ],
    whatYouWillLearn: [
      'HTML5, CSS3, እና Tailwind CSS በደንብ ማወቅ',
      'JavaScript እና TypeScript ጥልቅ ዕውቀት',
      'React & Next.js በመጠቀም ድረ-ገጽ መስራት',
      'Backend API እና Database ማገናኘት',
    ],
    sections: [
      {
        id: 'sec-1',
        title: 'ምዕራፍ 1፡ መግቢያና የፕሮጀክት ዝግጅት',
        lessons: [
          { id: 'les-1', title: 'የኮርሱ አጠቃላይ ገለፃ', duration: '10 ደቂቃ', isFreePreview: true },
          { id: 'les-2', title: 'የስራ አካባቢን ማዘጋጀት (VS Code, Node.js)', duration: '15 ደቂቃ', isFreePreview: true },
        ],
      },
      {
        id: 'sec-2',
        title: 'ምዕራፍ 2፡ የ React እና Next.js መሰረቶች',
        lessons: [
          { id: 'les-3', title: 'React Components እና State', duration: '25 ደቂቃ' },
          { id: 'les-4', title: 'Next.js App Router እና Navigation', duration: '30 ደቂቃ' },
        ],
      },
    ],
  },
  {
    id: 'course-2',
    title: 'የ UI/UX ዲዛይን እና Figma ሙያዊ ስልጠና',
    slug: 'ui-ux-design-figma',
    category: 'design',
    categoryLabel: 'Graphics & UI/UX Design',
    description: 'በዓለም አቀፍ ደረጃ ተፈላጊ የሆነውን የሞባይልና ድረ-ገጽ ዲዛይን (UI/UX) በFigma መሳሪያ ከባዶ ጀምረው ይማሩ።',
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=60',
    instructor: {
      name: 'ሀና ተስፋዬ',
      role: 'Lead Product Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    },
    level: 'ጀማሪ (Beginner)',
    duration: '18 ሰዓት',
    totalLessons: 30,
    rating: 4.8,
    reviewCount: 94,
    studentsCount: 320,
    price: 1200,
    originalPrice: 1800,
    requirements: [
      'የንድፍ (Design) ፍላጎት',
      'Figma ለመጠቀም የሚያስችል ኮምፒውተር',
    ],
    whatYouWillLearn: [
      'የ UI እና UX መሰረታዊ ህጎች (Color, Typography, Hierarchy)',
      'Figma Components, Auto Layout, እና Prototyping',
      'ተጠቃሚን ማዕከል ያደረገ የዲዛይን ጥናት (User Research)',
      'ለገበያ የሚቀርብ የዲዛይን ፖርትፎሊዮ መገንባት',
    ],
    sections: [
      {
        id: 'sec-1',
        title: 'ምዕራፍ 1፡ የንድፍ መሰረቶች',
        lessons: [
          { id: 'les-1', title: 'UI/UX ምንድን ነው?', duration: '12 ደቂቃ', isFreePreview: true },
          { id: 'les-2', title: 'የFigma መተግበሪያ አጠቃቀም', duration: '20 ደቂቃ', isFreePreview: true },
        ],
      },
    ],
  },
  {
    id: 'course-3',
    title: 'SolidWorks እና AutoCAD ለኢንጂነሪንግ ዲዛይን',
    slug: 'solidworks-autocad-engineering',
    category: 'engineering',
    categoryLabel: 'Engineering & CAD',
    description: 'የሜካኒካልና ሲቪል ምህንድስና 3D ሞዴሊንግ፣ ሲሙሌሽን እና የቴክኒካል ስዕሎችን በSolidWorks እና AutoCAD ይማሩ።',
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=60',
    instructor: {
      name: 'ኢንጂነር አማኑኤል ግርማ',
      role: 'Mechanical CAD Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    },
    level: 'መካከለኛ (Intermediate)',
    duration: '32 ሰዓት',
    totalLessons: 50,
    rating: 4.9,
    reviewCount: 76,
    studentsCount: 210,
    price: 2000,
    originalPrice: 3000,
    requirements: [
      'የምህንድስና ወይም የቴክኒክ መሰረታዊ ዕውቀት',
      'CAD ሶፍትዌሮችን መሸከም የሚችል ኮምፒውተር',
    ],
    whatYouWillLearn: [
      '2D Sketching እና 3D Part Modeling',
      'Assembly Design እና Motion Study',
      'Technical Drafting እና Blueprint ዝግጅት',
      'የፍሪላንስ CAD ፕሮጀክቶችን መስራት',
    ],
    sections: [
      {
        id: 'sec-1',
        title: 'ምዕራፍ 1፡ የ SolidWorks 3D ሞዴሊንግ',
        lessons: [
          { id: 'les-1', title: 'የSolidWorks ገጽታና መሳሪያዎች', duration: '18 ደቂቃ', isFreePreview: true },
        ],
      },
    ],
  },
  {
    id: 'course-4',
    title: 'ዲጂታል ማርኬቲንግ እና የማህበራዊ ሚዲያ ስልት',
    slug: 'digital-marketing-strategy',
    category: 'marketing',
    categoryLabel: 'Digital Marketing',
    description: 'በፌስቡክ፣ ቲክቶክ፣ ቴሌግራም እና ጉግል ማስታወቂያዎችን በመስራት የንግድ ድርጅቶችን ሽያጭ የሚያሳድጉበት ሙያ።',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    instructor: {
      name: 'ሰላም ሚካኤል',
      role: 'Digital Growth Strategist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    },
    level: 'ጀማሪ (Beginner)',
    duration: '15 ሰዓት',
    totalLessons: 28,
    rating: 4.7,
    reviewCount: 88,
    studentsCount: 390,
    price: 1000,
    originalPrice: 1500,
    requirements: [
      'ማህበራዊ ሚዲያዎችን የመጠቀም ፍላጎት',
      'ስልክ ወይም ኮምፒውተር',
    ],
    whatYouWillLearn: [
      'የማህበራዊ ሚዲያ ማስታወቂያዎች (Meta Ads, Google Ads)',
      'የይዘት ፈጠራ እና የቪዲዮ ስልቶች',
      'የሽያጭ ማሳደጊያ ስልቶችና የደንበኛ አያያዝ',
    ],
    sections: [
      {
        id: 'sec-1',
        title: 'ምዕራፍ 1፡ የዲጂታል ማርኬቲንግ መሰረቶች',
        lessons: [
          { id: 'les-1', title: 'የማርኬቲንግ መግቢያ', duration: '14 ደቂቃ', isFreePreview: true },
        ],
      },
    ],
  },
];
