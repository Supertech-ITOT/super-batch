"use client";

import { CalendarDays, Clock3, Mail, ShieldCheck, User, } from "lucide-react";
import { format } from "date-fns";
import UserAvatar from "@/common/components/user-avatar";
import { useGetCurrentUser } from "@/features/manager/user/hooks/use-user";

export default function ProfileCard() {
    const { data, isLoading, isError } = useGetCurrentUser();

    if (isLoading) {
        return (
            <div className="rounded-2xl border bg-card p-4">
                <div className="animate-pulse space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="size-12 rounded-full bg-muted" />
                        <div className="space-y-2">
                            <div className="h-4 w-28 rounded bg-muted" />
                            <div className="h-3 w-40 rounded bg-muted" />
                        </div>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                        {[1, 2, 3, 4].map((i) => (<div key={i} className="h-14 rounded-xl bg-muted" />))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="rounded-2xl border bg-card p-4 text-sm text-muted-foreground">
                Unable to load profile information.
            </div>
        );
    }

    const profileInfo = [
        { label: "Name", value: data.name, icon: User },
        { label: "Email", value: data.email, icon: Mail },
        { label: "Role", value: data.roleName, icon: ShieldCheck },
        { label: "Created", value: format(data.createdAt, "dd MMM yyyy, hh:mm a"), icon: CalendarDays, },
        { label: "Last Login", value: data.lastLoginAt ? format(data.lastLoginAt, "dd MMM yyyy, hh:mm a") : "-", icon: Clock3, },
        { label: "Updated", value: format(data.updatedAt, "dd MMM yyyy, hh:mm a"), icon: CalendarDays, },
    ];

    return (
        <div className="overflow-hidden rounded-2xl border bg-card">
            <div className="flex items-center gap-3 border-b bg-muted/20 p-4">
                <UserAvatar name={data.name} />
                <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold">{data.name}
                    </h2>
                    <p className="truncate text-xs text-muted-foreground">{data.email}</p>
                </div>
            </div>

            <div className="p-4">
                <div className="mb-3">
                    <h3 className="text-sm font-semibold"> Account Information</h3>
                    <p className="text-xs text-muted-foreground"> Your account and access details</p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                    {profileInfo.map(({ label, value, icon: Icon }) => (
                        <div
                            key={label}
                            className="flex items-center gap-2.5 rounded-xl border px-3 py-2.5"
                        >
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Icon className="size-4" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[11px] text-muted-foreground"> {label}</p>
                                <p className="truncate text-xs font-medium">{value || "-"} </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}