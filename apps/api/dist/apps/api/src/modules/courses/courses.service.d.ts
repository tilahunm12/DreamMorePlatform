import { PrismaService } from '../../prisma/prisma.service';
export declare class CoursesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(category?: string): Promise<({
        teacher: {
            email: string;
            name: string;
            id: string;
        };
        sections: ({
            lessons: {
                title: string;
                id: string;
                videoUrl: string | null;
                duration: number | null;
                sectionId: string;
            }[];
        } & {
            title: string;
            courseId: string;
            id: string;
            order: number;
        })[];
    } & {
        status: import(".prisma/client").$Enums.CourseStatus;
        title: string;
        category: string;
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        thumbnail: string | null;
        teacherId: string;
    })[] | {
        id: string;
        title: string;
        category: string;
        price: number;
        status: string;
        totalLessons: number;
        rating: number;
    }[]>;
    findOne(id: string): Promise<({
        teacher: {
            email: string;
            name: string;
            id: string;
        };
        sections: ({
            lessons: {
                title: string;
                id: string;
                videoUrl: string | null;
                duration: number | null;
                sectionId: string;
            }[];
        } & {
            title: string;
            courseId: string;
            id: string;
            order: number;
        })[];
    } & {
        status: import(".prisma/client").$Enums.CourseStatus;
        title: string;
        category: string;
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        thumbnail: string | null;
        teacherId: string;
    }) | {
        id: string;
        title: string;
        category: string;
        price: number;
    }>;
}
