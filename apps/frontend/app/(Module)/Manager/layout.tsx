import ManagerNav from "@/features/manager/common/components/manager-nav";

export default function ManagerLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <ManagerNav />
            <main className="flex-1 min-h-0 overflow-hidden">
                {children}
            </main>
        </div>
    );
}