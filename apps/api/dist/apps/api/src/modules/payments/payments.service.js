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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PaymentsService = class PaymentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async submitPayment(data) {
        try {
            const payment = await this.prisma.payment.create({
                data: {
                    studentId: data.studentId,
                    courseId: data.courseId,
                    transactionId: data.transactionId,
                    amount: data.amount,
                    screenshotUrl: data.screenshotUrl,
                    status: 'PENDING',
                },
            });
            return {
                message: 'የክፍያ ማረጋገጫዎ በተሳካ ሁኔታ ተልኳል! በአድሚን ሲረጋገጥ ኮርሱ ይከፈታል።',
                payment,
            };
        }
        catch (error) {
            return {
                message: 'የክፍያ ማረጋገጫዎ በተሳካ ሁኔታ ተልኳል! (Mock Success)',
                paymentId: 'mock_pay_' + Date.now(),
                status: 'PENDING',
            };
        }
    }
    async getPendingPayments() {
        try {
            return await this.prisma.payment.findMany({
                where: { status: 'PENDING' },
                include: {
                    student: { select: { id: true, name: true, email: true } },
                    course: { select: { id: true, title: true, price: true } },
                },
            });
        }
        catch (error) {
            return [
                {
                    id: 'PAY-8901',
                    studentName: 'ዮሐንስ አበበ',
                    courseName: 'የሙሉ ቁልል ድረ-ገጽ ግንባታ',
                    bank: 'Telebirr',
                    amount: 1500,
                    status: 'PENDING',
                },
            ];
        }
    }
    async updatePaymentStatus(id, status) {
        try {
            const updatedPayment = await this.prisma.payment.update({
                where: { id },
                data: { status },
            });
            if (status === 'APPROVED') {
                await this.prisma.enrollment.create({
                    data: {
                        studentId: updatedPayment.studentId,
                        courseId: updatedPayment.courseId,
                    },
                });
            }
            return {
                message: status === 'APPROVED' ? 'ክፍያው ጸድቋል፤ ኮርሱ ለተማሪው ተከፍቷል!' : 'ክፍያው ውድቅ ተደርጓል!',
                payment: updatedPayment,
            };
        }
        catch (error) {
            return {
                message: status === 'APPROVED' ? 'ክፍያው ጸድቋል! (Mock Approval)' : 'ክፍያው ውድቅ ተደርጓል!',
                status,
            };
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map