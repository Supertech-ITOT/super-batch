export interface LicenseResponse {
    id: number;
    licenseKey: string;
    licenseNumber: string;
    machineFingerprint: string;
    customerName: string;
    companyName: string;
    status: string;
    expiryDate: string;
    activationDate: string;
    lastValidatedAt: string | null;
    userCount: number;
    planId: number;
    planName: string;
    planDescription: string | null;
    planMaxUser: number;
}