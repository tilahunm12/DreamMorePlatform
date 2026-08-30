import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';

/**
 * PaymentsController - የክፍያ ስክሪንሾት ማረጋገጫ API Endpoints
 * 
 * Endpoints:
 * - POST /api/payments/submit       : ተማሪ ደረሰኝ የሚልክበት
 * - GET  /api/payments/pending      : አድሚን የሚገመግማቸው ክፍያዎች
 * - PATCH /api/payments/:id/status  : ክፍያን ማጽደቂያ / ውድቅ ማድረጊያ
 */
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('submit')
  async submitPayment(@Body() body: any) {
    return this.paymentsService.submitPayment(body);
  }

  @Get('pending')
  async getPendingPayments() {
    return this.paymentsService.getPendingPayments();
  }

  @Patch(':id/status')
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body('status') status: 'APPROVED' | 'REJECTED',
  ) {
    return this.paymentsService.updatePaymentStatus(id, status);
  }
}
