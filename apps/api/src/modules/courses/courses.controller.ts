import { Controller, Get, Param, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';

/**
 * CoursesController - የኮርሶች API Endpoints
 * 
 * Endpoints:
 * - GET /api/courses      : ሁሉንም ኮርሶች ማምጣት
 * - GET /api/courses/:id  : የአንድ የተመረጠ ኮርስ ዝርዝር
 */
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async findAll(@Query('category') category?: string) {
    return this.coursesService.findAll(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }
}
