import { PrismaService } from '../../prisma/prisma.service';
export declare class JobsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(category?: string): Promise<({
        _count: {
            proposals: number;
        };
        employer: {
            employerProfile: {
                id: string;
                userId: string;
                companyName: string | null;
                registrationNo: string | null;
                contactPhone: string | null;
            };
            name: string;
            id: string;
        };
    } & {
        status: import(".prisma/client").$Enums.JobStatus;
        title: string;
        category: string;
        description: string;
        budget: number;
        deadline: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        employerId: string;
    })[] | {
        id: string;
        title: string;
        category: string;
        budget: number;
        status: string;
    }[]>;
    createJob(data: any): Promise<{
        message: string;
        job: any;
    }>;
    submitProposal(jobId: string, data: any): Promise<{
        message: string;
        proposal: any;
    }>;
}
