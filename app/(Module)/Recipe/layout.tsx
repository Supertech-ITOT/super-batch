import RecipeNav from "@/features/recipe/common/components/recipe-nav";

export default function RecipeLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <RecipeNav />
            <main className="flex-1 min-h-0 overflow-hidden">
                {children}
            </main>
        </div>
    );
}