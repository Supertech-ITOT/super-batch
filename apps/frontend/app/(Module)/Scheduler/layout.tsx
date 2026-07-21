import ControlRecipeNav from "@/features/scheduler/common/components/control-recipe-nav";

export default function ControlRecipeLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <ControlRecipeNav />
            <main className="flex-1 min-h-0 overflow-hidden">
                {children}
            </main>
        </div>
    );
}