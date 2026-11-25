"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/common/components/ui/dialog";
import { ReportSettingsSidebar } from "./report-settings-sidebar";
import { ReportSettingsContent } from "./report-settings-content";

type ReportSettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ReportSettingsDialog({ open, onOpenChange }: ReportSettingsDialogProps) {
  const [activeSection, setActiveSection] = useState("branding");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[85vh]! max-h-225! w-[95vw]! max-w-5xl! overflow-hidden p-0 sm:w-full">
        <DialogTitle className="sr-only">Report Settings</DialogTitle>
        <div className="flex flex-col sm:flex-row h-full min-h-0">
          <ReportSettingsSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          <ReportSettingsContent activeSection={activeSection} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
