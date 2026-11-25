"use client";
import { cn } from "@/common/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "@/common/components/ui/carousel";
import { RportSettingsSections } from "./report-setting-section";

type ReportSettingsSidebarProps = {
  activeSection: string;
  onSectionChange: (section: string) => void;
};

export function ReportSettingsSidebar({ activeSection, onSectionChange }: ReportSettingsSidebarProps) {
  const renderSection = (section: (typeof RportSettingsSections)[number]) => {
    const Icon = section.icon;
    const isActive = activeSection === section.value;

    return (
      <button
        key={section.value}
        type="button"
        onClick={() => section.enabled && onSectionChange(section.value)}
        disabled={!section.enabled}
        title={!section.enabled ? "Coming soon" : section.description}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
          "disabled:pointer-events-none disabled:opacity-40",
          isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        <Icon className="size-4 shrink-0" />
        <span className="truncate">{section.label}</span>
      </button>
    );
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-muted/20 p-4 md:flex">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Report Settings</h2>
          <p className="mt-1 text-xs text-muted-foreground">Configure your report preferences</p>
        </div>

        <div className="space-y-2">
          <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Report</p>

          <div className="flex flex-col gap-1">{RportSettingsSections.map(renderSection)}</div>
        </div>

        <div className="mt-auto border-t pt-4">
          <p className="text-xs text-muted-foreground">Report configuration</p>
        </div>
      </aside>

      {/* Mobile horizontal carousel */}
      <div className="border-b bg-muted/20 p-3 md:hidden">
        <div className="mb-3">
          <h2 className="text-base font-semibold">Report Settings</h2>
          <p className="text-xs text-muted-foreground">Configure your report preferences</p>
        </div>

        <Carousel opts={{ align: "start", dragFree: true }}>
          <CarouselContent className="-ml-2">
            {RportSettingsSections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.value;

              return (
                <CarouselItem key={section.value} className="basis-auto pl-2">
                  <button
                    type="button"
                    onClick={() => section.enabled && onSectionChange(section.value)}
                    disabled={!section.enabled}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors",
                      "disabled:pointer-events-none disabled:opacity-40",
                      isActive
                        ? "border-primary bg-primary/10 text-primary font-medium"
                        : "border-border bg-background text-muted-foreground hover:bg-muted",
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    {section.label}
                  </button>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
