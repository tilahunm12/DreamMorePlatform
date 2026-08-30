import { UserRole } from '../enums';
export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}
