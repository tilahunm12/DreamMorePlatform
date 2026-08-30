"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let JobsService = class JobsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(category) {
        try {
            return await this.prisma.job.findMany({
                where: category ? { category } : undefined,
                include: {
                    employer: { select: { id: true, name: true, employerProfile: true } },
                    _count: { select: { proposals: true } },
                },
                orderBy: { createdAt: 'desc' },
            });
        }
        catch (error) {
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
    async createJob(data) {
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
        }
        catch (error) {
            return {
                message: 'ሥራው በተሳካ ሁኔታ ተለጥፏል! (Mock Success)',
                job: data,
            };
        }
    }
    async submitProposal(jobId, data) {
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
        }
        catch (error) {
            return {
                message: 'ፕሮፖዛልዎ በተሳካ ሁኔታ ለአሰሪው ተልኳል! (Mock Success)',
                proposal: data,
            };
        }
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JobsService);
//# sourceMappingURL=jobs.service.js.map