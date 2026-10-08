import ModuleHeader from "@/common/components/module-header";
import Navigation from "@/common/components/navigation/navigation";

export default function ModuleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-full flex-col sm:flex-row">
      <Navigation />

      <ModuleHeader />

      <section className="relative flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden pt-22 pb-14 sm:pb-0">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          {/* Top glow */}
          <div className="absolute left-1/2 top-0 h-80 w-150 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

          {/* Middle-left glow */}
          <div className="absolute left-0 top-1/2 h-96 w-72 -translate-y-1/2 -translate-x-1/3 rounded-full bg-primary/10 blur-3xl" />

          {/* Bottom-right glow */}
          <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/4 translate-y-1/4 rounded-full bg-primary/10 blur-3xl" />
        </div>

        {children}
      </section>
    </div>
  );
}
