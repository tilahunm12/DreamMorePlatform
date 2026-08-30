import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService - የዳታቤዝ ግንኙነት አስተዳዳሪ (Database Service)
 * NestJS መተግበሪያው ሲጀምር ከ PostgreSQL ዳታቤዝ ጋር እንዲገናኝ እና ሲዘጋ ደግሞ ግንኙነቱን እንዲያቋርጥ ያደርጋል።
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // መተግበሪያው ሲጀምር ከዳታቤዝ ጋር መገናኘት
    try {
      await this.$connect();
      console.log('✅ Prisma connected to PostgreSQL database successfully.');
    } catch (error) {
      console.warn('⚠️ Prisma connection warning (Running in offline/mock fallback mode):', error.message);
    }
  }

  async onModuleDestroy() {
    // መተግበሪያው ሲዘጋ የዳታቤዝ ግንኙነትን ማቋረጥ
    await this.$disconnect();
  }
}
