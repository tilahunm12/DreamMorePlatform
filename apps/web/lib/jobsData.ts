/**
 * jobsData.ts - የ AppWorks ፍሪላንስ ሥራዎች መረጃ ናሙና (Mock Jobs Data)
 * ቀጣሪዎች የለጠፏቸውን ሥራዎች፣ ባጀት፣ የሚያስፈልጉ ክህሎቶች እና የፕሮፖዛል መረጃዎችን ይይዛል።
 */

export interface JobItem {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'design' | 'cad' | 'video' | 'marketing' | 'writing';
  categoryLabel: string;
  description: string;
  budgetType: 'ቋሚ ዋጋ (Fixed)' | 'በሰዓት (Hourly)';
  budget: number; // በብር (ETB)
  duration: string;
  experienceLevel: 'ጀማሪ (Entry)' | 'መካከለኛ (Intermediate)' | 'ባለሙያ (Expert)';
  skillsRequired: string[];
  employer: {
    name: string;
    company: string;
    location: string;
    verified: boolean;
    rating: number;
    jobsPosted: number;
  };
  proposalsCount: number;
  postedAt: string;
  deadline: string;
}

export const JOBS_DATA: JobItem[] = [
  {
    id: 'job-1',
    title: 'ለኢ-ኮሜርስ ድርጅት Next.js እና Tailwind CSS ድረ-ገጽ ግንባታ',
    category: 'web',
    categoryLabel: 'Web Development',
    description: 'ፈጣን እና ዘመናዊ የሆነ የዕቃ መሸጫ ድረ-ገጽ በNext.js 15 እና Tailwind CSS መገንባት እንፈልጋለን። የክፍያ ስርዓት (Telebirr/CBE) ማካተት ይኖርበታል።',
    budgetType: 'ቋሚ ዋጋ (Fixed)',
    budget: 35000,
    duration: '3 ሳምንት',
    experienceLevel: 'መካከለኛ (Intermediate)',
    skillsRequired: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'API Integration'],
    employer: {
      name: 'ሰለሞን ከበደ',
      company: 'Abyssinia Tech Solutions',
      location: 'Addis Ababa, Ethiopia',
      verified: true,
      rating: 4.9,
      jobsPosted: 12,
    },
    proposalsCount: 8,
    postedAt: 'ከ 2 ሰዓት በፊት',
    deadline: 'በ 7 ቀናት ውስጥ',
  },
  {
    id: 'job-2',
    title: 'የሞባይል መተግበሪያ UI/UX ዲዛይን በ Figma',
    category: 'design',
    categoryLabel: 'UI/UX Design',
    description: 'ለአዲስ የትራንስፖርት እና ታክሲ መጥሪያ መተግበሪያ (Ride-hailing App) 15 ስክሪኖች ያሉት ሙሉ የ UI/UX ዲዛይን እና ፕሮቶታይፕ በFigma መስራት።',
    budgetType: 'ቋሚ ዋጋ (Fixed)',
    budget: 20000,
    duration: '2 ሳምንት',
    experienceLevel: 'መካከለኛ (Intermediate)',
    skillsRequired: ['Figma', 'UI Design', 'UX Research', 'Mobile Prototyping', 'Wireframing'],
    employer: {
      name: 'ማርታ ብርሃኑ',
      company: 'Zoma Mobility',
      location: 'Hawassa, Ethiopia',
      verified: true,
      rating: 4.8,
      jobsPosted: 5,
    },
    proposalsCount: 14,
    postedAt: 'ከ 5 ሰዓት በፊት',
    deadline: 'በ 5 ቀናት ውስጥ',
  },
  {
    id: 'job-3',
    title: 'የኢንዱስትሪ ማሽን 3D CAD ሞዴሊንግ እና ስዕል (SolidWorks)',
    category: 'cad',
    categoryLabel: 'CAD & Engineering',
    description: 'ለግብርና ማቀነባበሪያ ፋብሪካ የሚሆን የእህል መፈልፈያ ማሽን 3D Assembly Design እና የማምረቻ Blueprint በSolidWorks ማዘጋጀት።',
    budgetType: 'ቋሚ ዋጋ (Fixed)',
    budget: 45000,
    duration: '1 ወር',
    experienceLevel: 'ባለሙያ (Expert)',
    skillsRequired: ['SolidWorks', '3D Modeling', 'Mechanical Drafting', 'Simulation'],
    employer: {
      name: 'ኢንጂነር ተስፋዬ ጥላሁን',
      company: 'Blue Nile Agro Engineering',
      location: 'Bahir Dar, Ethiopia',
      verified: true,
      rating: 5.0,
      jobsPosted: 8,
    },
    proposalsCount: 4,
    postedAt: 'ከ 1 ቀን በፊት',
    deadline: 'በ 10 ቀናት ውስጥ',
  },
  {
    id: 'job-4',
    title: 'የማህበራዊ ሚዲያ ማስታወቂያ ቪዲዮ ኤዲቲንግ (Premiere Pro / After Effects)',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'ለቲክቶክ እና ኢንስታግራም የሚሆኑ 10 አጫጭር የማስተዋወቂያ ቪዲዮዎችን ማቀናበር፣ Subtitle እና Motion Graphics ማካተት።',
    budgetType: 'ቋሚ ዋጋ (Fixed)',
    budget: 15000,
    duration: '10 ቀናት',
    experienceLevel: 'ጀማሪ (Entry)',
    skillsRequired: ['Adobe Premiere Pro', 'After Effects', 'Shorts/Reels Editing', 'Color Grading'],
    employer: {
      name: 'ዮናስ ታደሰ',
      company: 'Ethio Digital Creative',
      location: 'Addis Ababa, Ethiopia',
      verified: false,
      rating: 4.6,
      jobsPosted: 3,
    },
    proposalsCount: 19,
    postedAt: 'ከ 2 ቀናት በፊት',
    deadline: 'በ 3 ቀናት ውስጥ',
  },
];
