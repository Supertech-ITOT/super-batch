import PlantNav from "@/features/plant/common/components/plant-nav";

export default function PlantModelLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <PlantNav />
            <main className="flex-1 min-h-0 overflow-hidden">
                {children}
            </main>
        </div>
    );
}