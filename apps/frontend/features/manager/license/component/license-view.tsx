import LicenseCard from "./license-card";

export default function LicenseView() {
    return (
        <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
            <LicenseCard
                license={{
                    licenseKey: "SB-XXXX-XXXX-XXXX-XXXX",
                    planId: "ENTERPRISE",
                    customerName: "ABC Pharma",
                    companyName: "ABC Pharma Pvt Ltd",
                    machineId: "9A4F-4C91-7B2D-8E33-1F23A9B7C5D2",
                    productId: "SUPERBATCH",
                    version: "1.0.0",
                    expiryDate: "2028-12-31",
                    maxClients: 20,
                    activatedAt: "2026-07-30T09:15:00",
                    lastValidatedAt: "2026-07-30T10:30:00",
                    status: "ACTIVE",
                }}
            />
        </div>
    );
}