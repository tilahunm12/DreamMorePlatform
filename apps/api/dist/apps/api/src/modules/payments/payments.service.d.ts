import { PrismaService } from '../../prisma/prisma.service';
export declare class PaymentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    submitPayment(data: {
        studentId: string;
        courseId: string;
        transactionId: string;
        amount: number;
        screenshotUrl: string;
    }): Promise<{
        message: string;
        payment: {
            status: import(".prisma/client").$Enums.PaymentStatus;
            courseId: string;
            transactionId: string;
            screenshotUrl: string;
            id: string;
            createdAt: Date;
            amount: number;
            studentId: string;
        };
        paymentId?: undefined;
        status?: undefined;
    } | {
        message: string;
        paymentId: string;
        status: string;
        payment?: undefined;
    }>;
    getPendingPayments(): Promise<({
        course: {
            title: string;
            id: string;
            price: number;
        };
        student: {
            email: string;
            name: string;
            id: string;
        };
    } & {
        status: import(".prisma/client").$Enums.PaymentStatus;
        courseId: string;
        transactionId: string;
        screenshotUrl: string;
        id: string;
        createdAt: Date;
        amount: number;
        studentId: string;
    })[] | {
        id: string;
        studentName: string;
        courseName: string;
        bank: string;
        amount: number;
        status: string;
    }[]>;
    updatePaymentStatus(id: string, status: 'APPROVED' | 'REJECTED'): Promise<{
        message: string;
        payment: {
            status: import(".prisma/client").$Enums.PaymentStatus;
            courseId: string;
            transactionId: string;
            screenshotUrl: string;
            id: string;
            createdAt: Date;
            amount: number;
            studentId: string;
        };
        status?: undefined;
    } | {
        message: string;
        status: "APPROVED" | "REJECTED";
        payment?: undefined;
    }>;
}
