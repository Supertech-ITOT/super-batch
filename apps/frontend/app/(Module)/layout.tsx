import SideBar from "@/common/components/sidebar";

export default function ModuleLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="flex h-full overflow-hidden">
            <SideBar />
            <section className="flex-1 overflow-hidden min-h-0">
                {children}
            </section>
        </main>
    )
}