"use client";

import {
  LayoutGrid,
  LucideClipboardCheck,
  MessageSquareQuoteIcon,
  Package,
  Workflow,
} from "lucide-react";

import CommonTabs, { TabItem } from "@/common/components/common-tabs";

const tabs: TabItem[] = [
  {
    label: "Overview",
    path: "/PlantModel/",
    icon: LayoutGrid,
  },
  {
    label: "Materials",
    path: "/PlantModel/materials/",
    icon: Package,
  },
  {
    label: "Process Configuration",
    path: "/PlantModel/process/",
    icon: Workflow,
  },
  {
    label: "Predefined Message",
    path: "/PlantModel/message/",
    icon: MessageSquareQuoteIcon,
  },
  {
    label: "Quality Check",
    path: "/PlantModel/qualityCheck/",
    icon: LucideClipboardCheck,
  },
];

export default function PlantTab() {
  return <CommonTabs tabs={tabs} />;
}
