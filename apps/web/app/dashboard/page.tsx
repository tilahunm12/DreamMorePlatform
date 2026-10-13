'use client';

// አስፈላጊ የሆኑ ሞጁሎች
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../stores/useAuthStore';
import { getRoleDashboardPath } from '../../lib/navigation';

/**
 * DashboardIndexPage - በተጠቃሚው ሚና (Role) መሰረት ወደ ትክክለኛው ዳሽቦርድ አቅጣጫ መቀየሪያ (Role-based Redirect)
 */
export default function DashboardIndexPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    const target = getRoleDashboardPath(user?.role);
    router.replace(target);
  }, [router, user]);

  return (
    <div className="flex items-center justify-center min-h-[50vh] text-slate-400 text-sm">
      ወደ ራስዎ ዳሽቦርድ በመሄድ ላይ...
    </div>
  );
}
