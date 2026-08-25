"use client";

import { KeyRound, ShieldCheck, Users } from "lucide-react";

import CommonTabs, {
    TabItem,
} from "@/common/components/common-tabs";

const tabs: TabItem[] = [
    {
        label: "Role",
        path: "/Manager/roles/",
        icon: ShieldCheck,
    },
    {
        label: "User",
        path: "/Manager/users/",
        icon: Users,
    },
    {
        label: "License",
        path: "/Manager/license/",
        icon: KeyRound,
    },
];

export default function ManagerTab() {
    return <CommonTabs tabs={tabs} />;
}