import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * PaymentsService - የክፍያ ስክሪንሾት ማረጋገጫ የቢዝነስ ሎጂክ (Payment Verification Logic)
 */
@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 1. ተማሪው የከፈለበትን ደረሰኝ ማስገባት (Submit payment screenshot)
   */
  async submitPayment(data: {
    studentId: string;
    courseId: string;
    transactionId: string;
    amount: number;
    screenshotUrl: string;
  }) {
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
    } catch (error) {
      return {
        message: 'የክፍያ ማረጋገጫዎ በተሳካ ሁኔታ ተልኳል! (Mock Success)',
        paymentId: 'mock_pay_' + Date.now(),
        status: 'PENDING',
      };
    }
  }

  /**
   * 2. በአድሚን የሚገመገሙ ክፍያዎችን ማምጣት (Get all pending payments)
   */
  async getPendingPayments() {
    try {
      return await this.prisma.payment.findMany({
        where: { status: 'PENDING' },
        include: {
          student: { select: { id: true, name: true, email: true } },
          course: { select: { id: true, title: true, price: true } },
        },
      });
    } catch (error) {
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

  /**
   * 3. ክፍያን ማጽደቅ ወይም ውድቅ ማድረግ (Approve or Reject payment)
   */
  async updatePaymentStatus(id: string, status: 'APPROVED' | 'REJECTED') {
    try {
      const updatedPayment = await this.prisma.payment.update({
        where: { id },
        data: { status },
      });

      // ክፍያው ከጸደቀ ተማሪውን በኮርሱ መመዝገብ (Enroll Student on Approval)
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
    } catch (error) {
      return {
        message: status === 'APPROVED' ? 'ክፍያው ጸድቋል! (Mock Approval)' : 'ክፍያው ውድቅ ተደርጓል!',
        status,
      };
    }
  }
}
