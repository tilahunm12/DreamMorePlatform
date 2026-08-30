import { z } from 'zod';
import { UserRole } from '../enums';

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'እባክዎ ትክክለኛ ኢሜይል ያስገቡ' }),
  password: z.string().min(6, { message: 'የይለፍ ቃል ቢያንስ 6 ቁምፊዎች መሆን አለበት' }),
  name: z.string().min(2, { message: 'ስም ቢያንስ 2 ፊደላት መሆን አለበት' }),
  role: z.nativeEnum(UserRole),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'የይለፍ ቃል ያስፈልጋል' }),
});

export const PostJobSchema = z.object({
  title: z.string().min(5, { message: 'የሥራው ርዕስ ቢያንስ 5 ፊደላት መሆን አለበት' }),
  category: z.string().min(1, { message: 'እባክዎ ምድብ ይምረጡ' }),
  description: z.string().min(20, { message: 'መግለጫው ቢያንስ 20 ፊደላት መሆን አለበት' }),
  budget: z.number().positive({ message: 'በጀት አወንታዊ ቁጥር መሆን አለበት' }),
  deadline: z.string().min(1, { message: 'እባክዎ የመጨረሻ ቀን ይምረጡ' }),
});

export const SubmitProposalSchema = z.object({
  jobId: z.string().min(1),
  coverLetter: z.string().min(20, { message: 'የማመልከቻ ጽሑፉ ቢያንስ 20 ፊደላት መሆን አለበት' }),
  proposedCost: z.number().positive(),
  estimatedDays: z.number().int().positive(),
});

export const SubmitPaymentSchema = z.object({
  courseId: z.string().min(1),
  transactionId: z.string().min(3, { message: 'የግብይት መለያ ቁጥር (Transaction ID) ያስገቡ' }),
  screenshotUrl: z.string().url({ message: 'የስክሪንሾት URL ይስጡ' }),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type PostJobInput = z.infer<typeof PostJobSchema>;
export type SubmitProposalInput = z.infer<typeof SubmitProposalSchema>;
export type SubmitPaymentInput = z.infer<typeof SubmitPaymentSchema>;
