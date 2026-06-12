"use client";

import { useState } from "react";
import UserStat from "./user-stat";
import DataTable from "./data-table";
import columns from "./columns";

export type DialogProp = {
    action: "create" | "edit" | "delete" | null;
    id: Number | null;
}
export default function UserView() {
    const [dialog, setDialog] = useState<DialogProp>({ action: null, id: null });
    const data = [
        {
            id: 1,
            name: "admin",
            email: "admin@gmail.com",
            role: "Adminstrator",
            lastLogin: "2026-01-15 10:30 AM",
            updatedAt: "2026-01-15 10:30 AM"
        },
        {
            id: 2,
            name: "uygv",
            email: "admin@gmail.com",
            role: "Guest",
            lastLogin: "2026-01-15 10:30 AM",
            updatedAt: "2026-01-15 10:30 AM"
        }

    ];

    return (
        <div className="bg-card h-full border rounded-lg flex flex-col p-6">
            <UserStat />

            <div className="flex-1 min-h-0 my-4">
                <DataTable
                    columns={columns(setDialog)}
                    data={data}
                />
            </div>

        </div>
    )
} 