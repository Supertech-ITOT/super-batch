import SideBar from "@/common/components/sidebar";
import { SidebarProvider } from "@/common/components/sidebar-provider";

export default function ModuleLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <SidebarProvider>
            <main className="flex h-screen overflow-hidden">
                <SideBar />
                <section className="flex-1 overflow-hidden min-h-0">
                    {children}
                </section>
            </main>
        </SidebarProvider>
    )
}