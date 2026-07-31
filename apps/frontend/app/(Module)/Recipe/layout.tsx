import ModuleHeader from "@/common/components/module-header";

export default function RecipeLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="h-full flex flex-col overflow-hidden">
            <ModuleHeader />
            <main className="flex-1 min-h-0 overflow-hidden">
                {children}
            </main>
        </div>
    );
}