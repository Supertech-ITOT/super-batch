"use client";

import { BadgeCheck, KeyRound, UserCircle } from "lucide-react";
import CommonTabs, { TabItem, } from "@/common/components/common-tabs";

const tabs: TabItem[] = [
    {
        label: "Profile",
        path: "/Setting/profile/",
        icon: UserCircle,
    },
    {
        label: "License",
        path: "/Setting/license/",
        icon: KeyRound,
    },
    {
        label: "Application",
        path: "/Setting/application/",
        icon: BadgeCheck,
    },
];

export default function SettingTab() {
    return <CommonTabs tabs={tabs} />;
}