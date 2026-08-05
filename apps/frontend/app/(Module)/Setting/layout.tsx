import ModuleHeader from "@/common/components/module-header";

export default function SettingLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="flex h-full w-full min-h-0 flex-1 flex-col overflow-hidden pt-20">
            <ModuleHeader />
            <main className="flex flex-1 min-h-0 overflow-hidden">
                {children}
            </main>
        </div>
    );
}