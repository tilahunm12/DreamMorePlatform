import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoursesModule } from './modules/courses/courses.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { MailModule } from './modules/mail/mail.module';

/**
 * AppModule - የ NestJS Backend API ዋና ማዕከል (Root Module)
 * ሁሉንም ንዑስ ሞጁሎች (Auth, Courses, Payments, Jobs, Certificates, Database) በአንድ ላይ ያቀናጃል።
 */
@Module({
  imports: [
    // 1. የአካባቢ ተለዋዋጮች ቅንብር (Config Module)
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 2. የዳታቤዝ ግንኙነት ሞጁል (Database / Prisma)
    PrismaModule,
    // 3. የተጠቃሚዎች መለያ እና የይለፍ ቃል (Authentication)
    AuthModule,
    // 4. የኮርሶች ሞጁል (LMS Courses)
    CoursesModule,
    // 5. የክፍያ ስክሪንሾት ማረጋገጫ (Payment Verification)
    PaymentsModule,
    // 6. የ AppWorks ፍሪላንስ ገበያ (Jobs & Proposals)
    JobsModule,
    // 7. የሰርተፊኬት ማረጋገጫ (Certificates)
    CertificatesModule,
    // 8. የኢሜይል ማሳወቂያዎች (Mail Service)
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
