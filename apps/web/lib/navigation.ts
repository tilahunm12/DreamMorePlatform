import { UserRole } from '@dream-more/shared';

/**
 * getRoleDashboardPath - የተጠቃሚውን ሚና (Role) መሰረት በማድረግ ትክክለኛውን የዳሽቦርድ ዩአርኤል (URL) ይመልሳል።
 */
export function getRoleDashboardPath(role?: string | null): string {
  if (!role) return '/dashboard/student';
  switch (role) {
    case 'ADMIN':
    case UserRole.ADMIN:
      return '/dashboard/admin';
    case 'TEACHER':
    case UserRole.TEACHER:
      return '/dashboard/teacher';
    case 'EMPLOYER':
    case UserRole.EMPLOYER:
      return '/dashboard/employer';
    case 'FREELANCER':
    case UserRole.FREELANCER:
      return '/dashboard/freelancer';
    case 'STUDENT':
    case UserRole.STUDENT:
    default:
      return '/dashboard/student';
  }
}

/**
 * getRoleLabel - የተጠቃሚውን ሚና በአማርኛ እና በእንግሊዝኛ ገላጭ ጽሁፍ ይመልሳል።
 */
export function getRoleLabel(role?: string | null): string {
  switch (role) {
    case 'ADMIN':
      return 'አድሚን (Admin)';
    case 'TEACHER':
      return 'አስተማሪ (Teacher)';
    case 'EMPLOYER':
      return 'አሰሪ / ቀጣሪ (Employer)';
    case 'FREELANCER':
      return 'ፍሪላንሰር (Freelancer)';
    case 'STUDENT':
    default:
      return 'ተማሪ (Student)';
  }
}
