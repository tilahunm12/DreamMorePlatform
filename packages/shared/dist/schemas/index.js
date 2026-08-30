"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitPaymentSchema = exports.SubmitProposalSchema = exports.PostJobSchema = exports.LoginSchema = exports.RegisterSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../enums");
exports.RegisterSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'እባክዎ ትክክለኛ ኢሜይል ያስገቡ' }),
    password: zod_1.z.string().min(6, { message: 'የይለፍ ቃል ቢያንስ 6 ቁምፊዎች መሆን አለበት' }),
    name: zod_1.z.string().min(2, { message: 'ስም ቢያንስ 2 ፊደላት መሆን አለበት' }),
    role: zod_1.z.nativeEnum(enums_1.UserRole),
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1, { message: 'የይለፍ ቃል ያስፈልጋል' }),
});
exports.PostJobSchema = zod_1.z.object({
    title: zod_1.z.string().min(5, { message: 'የሥራው ርዕስ ቢያንስ 5 ፊደላት መሆን አለበት' }),
    category: zod_1.z.string().min(1, { message: 'እባክዎ ምድብ ይምረጡ' }),
    description: zod_1.z.string().min(20, { message: 'መግለጫው ቢያንስ 20 ፊደላት መሆን አለበት' }),
    budget: zod_1.z.number().positive({ message: 'በጀት አወንታዊ ቁጥር መሆን አለበት' }),
    deadline: zod_1.z.string().min(1, { message: 'እባክዎ የመጨረሻ ቀን ይምረጡ' }),
});
exports.SubmitProposalSchema = zod_1.z.object({
    jobId: zod_1.z.string().min(1),
    coverLetter: zod_1.z.string().min(20, { message: 'የማመልከቻ ጽሑፉ ቢያንስ 20 ፊደላት መሆን አለበት' }),
    proposedCost: zod_1.z.number().positive(),
    estimatedDays: zod_1.z.number().int().positive(),
});
exports.SubmitPaymentSchema = zod_1.z.object({
    courseId: zod_1.z.string().min(1),
    transactionId: zod_1.z.string().min(3, { message: 'የግብይት መለያ ቁጥር (Transaction ID) ያስገቡ' }),
    screenshotUrl: zod_1.z.string().url({ message: 'የስክሪንሾት URL ይስጡ' }),
});
