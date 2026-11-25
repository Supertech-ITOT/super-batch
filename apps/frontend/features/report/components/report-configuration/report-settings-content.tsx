import CompanyLogoSettings from "./company-logo-settings";

type ReportSettingsContentProps = {
  activeSection: string;
};

export function ReportSettingsContent({ activeSection }: ReportSettingsContentProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
      {activeSection === "branding" && <CompanyLogoSettings />}

      {activeSection === "layout" && (
        <div className="p-6">
          <h3 className="text-lg font-semibold">Layout</h3>
          <p className="text-sm text-muted-foreground">Layout configuration will be available soon.</p>
        </div>
      )}
    </div>
  );
}
