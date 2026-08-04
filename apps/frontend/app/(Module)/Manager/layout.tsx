import ModuleHeader from "@/common/components/module-header";
export default function ManagerLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="flex min-h-full flex-col sm:h-full sm:overflow-hidden pt-20">
            <ModuleHeader />
            <main className="flex-1 sm:min-h-0 sm:overflow-hidden">
                {children}
            </main>
        </div>
    );
}