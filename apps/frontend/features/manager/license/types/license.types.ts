
import { format } from "date-fns";
import {
    Building2, CalendarDays, Clock3, Fingerprint, Info, KeyRound, Package, ShieldCheck, Tag, UserRound, Users, AlertCircle,
    Ban,
    CheckCircle2,
    XCircle,
} from "lucide-react";

export interface LicenseResponse {
    id: number;
    licenseKey: string;
    licenseNumber: string;
    machineFingerprint: string;
    customerName: string;
    companyName: string;
    status: LicenseStatus;
    expiryDate: string;
    activationDate: string;
    lastValidatedAt: string | null;
    unitCount: number;
    planId: number;
    planName: string;
    planDescription: string | null;
    planMaxUnits: number;
}


export enum LicenseStatus {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    REVOKED = "REVOKED",
    SUSPENDED = "SUSPENDED",
    EXPIRED = "EXPIRED",
}

export const LicenseStatusConfig: Record<
    LicenseStatus,
    {
        label: string;
        icon: React.ElementType;
        iconClass: string;
        bgClass: string;
        badgeClass: string;
    }
> = {
    [LicenseStatus.INACTIVE]: {
        label: "Inactive",
        icon: AlertCircle,
        iconClass: "text-gray-600 dark:text-gray-400",
        bgClass: "bg-gray-50 dark:bg-gray-950/40",
        badgeClass:
            "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800",
    },

    [LicenseStatus.ACTIVE]: {
        label: "Active",
        icon: CheckCircle2,
        iconClass: "text-green-600 dark:text-green-400",
        bgClass: "bg-green-50 dark:bg-green-950/40",
        badgeClass:
            "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
    },

    [LicenseStatus.REVOKED]: {
        label: "Revoked",
        icon: Ban,
        iconClass: "text-red-600 dark:text-red-400",
        bgClass: "bg-red-50 dark:bg-red-950/40",
        badgeClass:
            "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
    },

    [LicenseStatus.SUSPENDED]: {
        label: "Suspended",
        icon: Clock3,
        iconClass: "text-yellow-600 dark:text-yellow-400",
        bgClass: "bg-yellow-50 dark:bg-yellow-950/40",
        badgeClass:
            "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800",
    },

    [LicenseStatus.EXPIRED]: {
        label: "Expired",
        icon: XCircle,
        iconClass: "text-orange-600 dark:text-orange-400",
        bgClass: "bg-orange-50 dark:bg-orange-950/40",
        badgeClass:
            "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",
    },
};

export const getLicenseInfo = (license: LicenseResponse, expiryDate?: Date | null) => [
    { label: "License Key", value: license.licenseKey, icon: KeyRound, mono: true, copy: true },
    { label: "License Number", value: license.licenseNumber, icon: Tag, mono: true, copy: true },
    { label: "Customer Name", value: license.customerName, icon: UserRound },
    { label: "Company Name", value: license.companyName, icon: Building2 },
    { label: "Machine Fingerprint", value: license.machineFingerprint, icon: Fingerprint, mono: true, copy: true },
    { label: "Product", value: "SuperBatch", icon: Package },
    { label: "Plan ID", value: license.planId, icon: Tag, mono: true },
    { label: "Plan Name", value: license.planName, icon: Tag },
    { label: "Plan Description", value: license.planDescription, icon: Info },
    {
        label: "Activation Date",
        value: license.activationDate
            ? format(new Date(license.activationDate), "dd MMM yyyy")
            : "-",
        icon: Clock3,
    },
    {
        label: "Last Validated",
        value: license.lastValidatedAt
            ? format(new Date(license.lastValidatedAt), "dd MMM yyyy hh:mm a")
            : "-",
        icon: ShieldCheck,
    },
];