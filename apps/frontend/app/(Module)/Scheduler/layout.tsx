import ModuleHeader from "@/common/components/module-header";

export default function ControlRecipeLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="flex h-full w-full min-h-0 flex-1 flex-col overflow-hidden pt-20">
            <ModuleHeader />
            <main className="flex-1 min-h-0 overflow-y-auto pb-14 sm:pb-0">
                {children}
            </main>
        </div>
    );
}