'use client';

// አስፈላጊ የሆኑ ሞጁሎች
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * DashboardIndexPage - ወደ ተማሪ ዳሽቦርድ አቅጣጫ መቀየሪያ (Redirect)
 */
export default function DashboardIndexPage() {
  const router = useRouter();

  useEffect(() => {
    // በነባሪነት ወደ ተማሪ ዳሽቦርድ ይወስዳል
    router.replace('/dashboard/student');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh] text-slate-400 text-sm">
      ወደ ዳሽቦርድ በመሄድ ላይ...
    </div>
  );
}
