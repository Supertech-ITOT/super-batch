import { ImageIcon, FileText, Palette } from "lucide-react";

export const RportSettingsSections = [
  {
    value: "branding",
    label: "Branding",
    icon: ImageIcon,
    description: "Company logo and branding",
    enabled: true,
  },
  {
    value: "layout",
    label: "Layout",
    icon: FileText,
    description: "Report layout preferences",
    enabled: false,
  },
  {
    value: "appearance",
    label: "Appearance",
    icon: Palette,
    description: "Report styling",
    enabled: false,
  },
] as const;
