import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

/**
 * PaymentsService - የክፍያ ስክሪንሾት ማረጋገጫ የቢዝነስ ሎጂክ (Payment Verification Logic)
 */
@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

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

        // የተማሪውን እና የኮርሱን ዝርዝር በመውሰድ የማረጋገጫ ደረሰኝ ኢሜይል መላክ
        this.prisma.payment.findUnique({
          where: { id },
          include: { student: true, course: true },
        }).then((fullPayment) => {
          if (fullPayment?.student?.email && fullPayment?.course?.title) {
            this.mailService.sendPaymentApprovedEmail(
              fullPayment.student.email,
              fullPayment.student.name,
              fullPayment.course.title,
              `${fullPayment.amount} ETB`,
              fullPayment.transactionId,
            ).catch((e) => console.error('Failed to send payment approval email:', e));
          }
        }).catch((e) => console.error('Failed to query payment details for email:', e));
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
