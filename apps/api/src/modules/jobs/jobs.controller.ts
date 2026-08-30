import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';

/**
 * JobsController - የ AppWorks የሥራ ማስታወቂያዎችና ፕሮፖዛሎች API Endpoints
 * 
 * Endpoints:
 * - GET  /api/jobs                : ሁሉንም ሥራዎች ማምጣት
 * - POST /api/jobs                : አዲስ ሥራ መለጠፍ
 * - POST /api/jobs/:id/proposals  : ፕሮፖዛል ማቅረብ
 */
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async findAll(@Query('category') category?: string) {
    return this.jobsService.findAll(category);
  }

  @Post()
  async createJob(@Body() data: any) {
    return this.jobsService.createJob(data);
  }

  @Post(':id/proposals')
  async submitProposal(@Param('id') id: string, @Body() data: any) {
    return this.jobsService.submitProposal(id, data);
  }
}
