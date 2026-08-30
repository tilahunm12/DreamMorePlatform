import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * CoursesService - የኮርሶች አስተዳደር የቢዝነስ ሎጂክ (Courses Business Logic)
 */
@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 1. ሁሉንም ኮርሶች ማምጣት (Get all courses)
   */
  async findAll(category?: string) {
    try {
      return await this.prisma.course.findMany({
        where: category ? { category } : undefined,
        include: {
          teacher: {
            select: { id: true, name: true, email: true },
          },
          sections: {
            include: { lessons: true },
          },
        },
      });
    } catch (error) {
      // Offline mock data
      return [
        {
          id: 'course-1',
          title: 'የሙሉ ቁልል ድረ-ገጽ ግንባታ (Full-Stack Web Development)',
          category: 'programming',
          price: 1500,
          status: 'PUBLISHED',
          totalLessons: 42,
          rating: 4.9,
        },
        {
          id: 'course-2',
          title: 'የ UI/UX ዲዛይን እና Figma ሙያዊ ስልጠና',
          category: 'design',
          price: 1200,
          status: 'PUBLISHED',
          totalLessons: 30,
          rating: 4.8,
        },
      ];
    }
  }

  /**
   * 2. የአንድ ኮርስ ዝርዝር ማምጣት (Get course by ID)
   */
  async findOne(id: string) {
    try {
      return await this.prisma.course.findUnique({
        where: { id },
        include: {
          sections: { include: { lessons: true } },
          teacher: { select: { id: true, name: true, email: true } },
        },
      });
    } catch (error) {
      return {
        id,
        title: 'የሙሉ ቁልል ድረ-ገጽ ግንባታ (Full-Stack Web Development)',
        category: 'programming',
        price: 1500,
      };
    }
  }
}
