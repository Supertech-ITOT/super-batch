"use client";

import columns from "./columns";
import DataTable from "./data-table";
import RoleStat from "./role-stat";
import { useState } from "react";

export type DialogProp = {
    action: "create" | "edit" | "delete" | null;
    id: Number | null;
}
export default function RoleView() {
    const [dialog, setDialog] = useState<DialogProp>({ action: null, id: null });
    const data = [
        {
            id: 1,
            name: "admin",
            description: "full system access",
            users: 8,
            permission: "47/25",
            createdAt: "2026-01-15 10:30 AM"
        },
        {
            id: 2,
            name: "uygv",
            description: "full system access",
            users: 8,
            permission: "47/25",
            createdAt: "2026-01-15 10:30 AM"
        },
    ];

    return (
        <div className="bg-card h-full border rounded-lg flex flex-col p-6 ">
            <RoleStat />

            <div className="flex-1 min-h-0 my-4">
                <DataTable
                    columns={columns(setDialog)}
                    data={data}
                />
            </div>

        </div>
    )
} 