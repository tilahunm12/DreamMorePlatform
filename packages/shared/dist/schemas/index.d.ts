import { z } from 'zod';
import { UserRole } from '../enums';
export declare const RegisterSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    role: z.ZodNativeEnum<typeof UserRole>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
    role: UserRole;
}, {
    email: string;
    password: string;
    name: string;
    role: UserRole;
}>;
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const PostJobSchema: z.ZodObject<{
    title: z.ZodString;
    category: z.ZodString;
    description: z.ZodString;
    budget: z.ZodNumber;
    deadline: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    category: string;
    description: string;
    budget: number;
    deadline: string;
}, {
    title: string;
    category: string;
    description: string;
    budget: number;
    deadline: string;
}>;
export declare const SubmitProposalSchema: z.ZodObject<{
    jobId: z.ZodString;
    coverLetter: z.ZodString;
    proposedCost: z.ZodNumber;
    estimatedDays: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    jobId: string;
    coverLetter: string;
    proposedCost: number;
    estimatedDays: number;
}, {
    jobId: string;
    coverLetter: string;
    proposedCost: number;
    estimatedDays: number;
}>;
export declare const SubmitPaymentSchema: z.ZodObject<{
    courseId: z.ZodString;
    transactionId: z.ZodString;
    screenshotUrl: z.ZodString;
}, "strip", z.ZodTypeAny, {
    courseId: string;
    transactionId: string;
    screenshotUrl: string;
}, {
    courseId: string;
    transactionId: string;
    screenshotUrl: string;
}>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type PostJobInput = z.infer<typeof PostJobSchema>;
export type SubmitProposalInput = z.infer<typeof SubmitProposalSchema>;
export type SubmitPaymentInput = z.infer<typeof SubmitPaymentSchema>;
