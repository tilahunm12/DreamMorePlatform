import { JobsService } from './jobs.service';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
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
    submitProposal(id: string, data: any): Promise<{
        message: string;
        proposal: any;
    }>;
}
