import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    submitPayment(body: any): Promise<{
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
