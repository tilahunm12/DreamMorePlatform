import { Controller, Get, Param } from '@nestjs/common';
import { CertificatesService } from './certificates.service';

/**
 * CertificatesController - የሰርተፊኬት ማረጋገጫ API Endpoints
 * 
 * Endpoints:
 * - GET /api/certificates/verify/:code : በኮድ ማረጋገጥ
 */
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Get('verify/:code')
  async verifyCertificate(@Param('code') code: string) {
    return this.certificatesService.verifyCertificate(code);
  }
}
