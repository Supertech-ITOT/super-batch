import Navigation from "@/common/components/navigation/navigation";

export default function ModuleLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="flex mb-14 sm:mb-0 h-full flex-col sm:flex-row">
            <Navigation />
            <section className="flex-1 min-h-0 min-w-0 overflow-hidden">
                {children}
            </section>
        </div>
    )
}