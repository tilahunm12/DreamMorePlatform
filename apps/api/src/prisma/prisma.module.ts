import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * PrismaModule - በሁሉም የፕሮጀክቱ ሞጁሎች ውስጥ በቀላሉ ጥቅም ላይ እንዲውል (@Global) የተደረገ ሞጁል
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
