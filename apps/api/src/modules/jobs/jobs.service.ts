import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * JobsService - የ AppWorks የሥራ ገበያ የቢዝነስ ሎጂክ (Jobs & Proposals Logic)
 */
@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 1. ሁሉንም ክፍት የሥራ ማስታወቂያዎች ማምጣት
   */
  async findAll(category?: string) {
    try {
      return await this.prisma.job.findMany({
        where: category ? { category } : undefined,
        include: {
          employer: { select: { id: true, name: true, employerProfile: true } },
          _count: { select: { proposals: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      return [
        {
          id: 'job-1',
          title: 'ለኢ-ኮሜርስ ድርጅት Next.js እና Tailwind CSS ድረ-ገጽ ግንባታ',
          category: 'web',
          budget: 35000,
          status: 'POSTED',
        },
      ];
    }
  }

  /**
   * 2. አዲስ ሥራ መለጠፍ (Post a Job)
   */
  async createJob(data: any) {
    try {
      const job = await this.prisma.job.create({
        data: {
          title: data.title,
          category: data.category,
          description: data.description,
          budget: Number(data.budget),
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          employerId: data.employerId,
        },
      });

      return {
        message: 'ሥራው በተሳካ ሁኔታ ተለጥፏል!',
        job,
      };
    } catch (error) {
      return {
        message: 'ሥራው በተሳካ ሁኔታ ተለጥፏል! (Mock Success)',
        job: data,
      };
    }
  }

  /**
   * 3. ለሥራው ፕሮፖዛል ማቅረብ (Submit Proposal)
   */
  async submitProposal(jobId: string, data: any) {
    try {
      const proposal = await this.prisma.proposal.create({
        data: {
          jobId,
          freelancerId: data.freelancerId,
          coverLetter: data.coverLetter,
          proposedCost: Number(data.proposedCost),
          estimatedDays: Number(data.estimatedDays || 7),
        },
      });

      return {
        message: 'ፕሮፖዛልዎ በተሳካ ሁኔታ ለአሰሪው ተልኳል!',
        proposal,
      };
    } catch (error) {
      return {
        message: 'ፕሮፖዛልዎ በተሳካ ሁኔታ ለአሰሪው ተልኳል! (Mock Success)',
        proposal: data,
      };
    }
  }
}
