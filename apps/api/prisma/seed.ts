import { PrismaClient, Role, PaymentStatus, CourseStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for Dream More Platform...');

  // 1. Password hashing
  const adminPassword = await bcrypt.hash('AdminPassword123!', 10);
  const teacherPassword = await bcrypt.hash('TeacherPassword123!', 10);
  const studentPassword = await bcrypt.hash('StudentPassword123!', 10);

  // 2. Upsert Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@dreammore.com' },
    update: {
      password: adminPassword,
      role: Role.ADMIN,
      name: 'ዋና አስተዳዳሪ (Super Admin)',
      isVerified: true,
    },
    create: {
      email: 'admin@dreammore.com',
      password: adminPassword,
      role: Role.ADMIN,
      name: 'ዋና አስተዳዳሪ (Super Admin)',
      isVerified: true,
    },
  });
  console.log('✅ Admin user created/updated:', admin.email);

  // 3. Upsert Teacher User
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@dreammore.com' },
    update: {
      password: teacherPassword,
      role: Role.TEACHER,
      name: 'መምህር ታሪኩ ወርቁ',
      isVerified: true,
    },
    create: {
      email: 'teacher@dreammore.com',
      password: teacherPassword,
      role: Role.TEACHER,
      name: 'መምህር ታሪኩ ወርቁ',
      isVerified: true,
      teacherProfile: {
        create: {
          credentials: 'MSc in Computer Science, Full-Stack Developer',
          portfolioUrl: 'https://github.com/tilahunm12',
          isApproved: true,
        },
      },
    },
  });
  console.log('✅ Teacher user created/updated:', teacher.email);

  // 4. Upsert Student User
  const student = await prisma.user.upsert({
    where: { email: 'student@dreammore.com' },
    update: {
      password: studentPassword,
      role: Role.STUDENT,
      name: 'ዮሐንስ አበበ',
      isVerified: true,
    },
    create: {
      email: 'student@dreammore.com',
      password: studentPassword,
      role: Role.STUDENT,
      name: 'ዮሐንስ አበበ',
      isVerified: true,
      studentProfile: {
        create: {
          bio: 'የኮምፒውተር ሳይንስ ተማሪ እና የወደፊት የድረ-ገጽ ገንቢ',
        },
      },
    },
  });
  console.log('✅ Student user created/updated:', student.email);

  // 5. Create or Find Course
  let course = await prisma.course.findFirst({
    where: { title: 'የሙሉ ቁልል ድረ-ገጽ ግንባታ (Full-Stack Web Development)' },
  });

  if (!course) {
    course = await prisma.course.create({
      data: {
        title: 'የሙሉ ቁልል ድረ-ገጽ ግንባታ (Full-Stack Web Development)',
        category: 'Web Development',
        description: 'Next.js 16፣ NestJS፣ PostgreSQL እና Tailwind በመጠቀም ከዜሮ እስከ ምርት የሚሰራ ዘመናዊ ድረ-ገጽ መገንባት ይማሩ።',
        price: 1500,
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60',
        status: CourseStatus.PUBLISHED,
        teacherId: teacher.id,
      },
    });
    console.log('✅ Demo course created:', course.title);
  }

  // 6. Create Demo Payment if none exists
  const existingPayment = await prisma.payment.findFirst({
    where: { transactionId: 'FT2408912345' },
  });

  if (!existingPayment && course) {
    await prisma.payment.create({
      data: {
        studentId: student.id,
        courseId: course.id,
        amount: 1500,
        transactionId: 'FT2408912345',
        screenshotUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60',
        status: PaymentStatus.PENDING,
      },
    });
    console.log('✅ Demo pending payment created for Telebirr: FT2408912345');
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
