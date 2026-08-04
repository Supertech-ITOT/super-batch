import Navigation from "@/common/components/navigation/navigation";

export default function ModuleLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="flex mb-14 sm:m-0 min-h-full flex-col sm:h-full sm:flex-row">
            <Navigation />
            <section className="flex-1 overflow-hidden min-h-0">
                {children}
            </section>
        </main>
    )
}