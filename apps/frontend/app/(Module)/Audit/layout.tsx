import ModuleHeader from "@/common/components/module-header";

export default function AuditLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="flex h-full flex-col pt-20">
            <ModuleHeader />

            <main className="flex-1 min-h-0 overflow-y-auto">
                {children}
            </main>
        </div>
    )

}