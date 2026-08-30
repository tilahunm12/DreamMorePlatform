import { CertificatesService } from './certificates.service';
export declare class CertificatesController {
    private readonly certificatesService;
    constructor(certificatesService: CertificatesService);
    verifyCertificate(code: string): Promise<{
        verified: boolean;
        certificate: {
            course: {
                title: string;
                id: string;
            };
            student: {
                email: string;
                name: string;
                id: string;
            };
        } & {
            courseId: string;
            id: string;
            studentId: string;
            certificateCode: string;
            qrCodeUrl: string | null;
            issuedAt: Date;
        };
    } | {
        verified: boolean;
        certificate: {
            certificateCode: string;
            studentName: string;
            courseTitle: string;
            instructorName: string;
            issuedAt: string;
            grade: string;
        };
    }>;
}
