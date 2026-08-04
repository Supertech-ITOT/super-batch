"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { OperationRoutes } from "@/features/manager/module/types/module.types";
import { useGetCurrentUser } from "@/features/manager/user/hooks/use-user";

export default function BottomNavigation() {
    const pathname = usePathname();
    const { data: user } = useGetCurrentUser();

    const initials =
        user?.name
            ?.split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase() ?? "U";

    const getBasePath = (path: string) => "/" + path.split("/")[1];

    return (
        <nav className="fixed inset-x-0 bottom-[max(2px,env(safe-area-inset-bottom))] z-50 px-2 md:hidden">
            <div className="mx-auto flex max-w-lg items-center">
                {/* Floating Navigation */}
                <div className="flex flex-1 items-center justify-between rounded-full border border-white/15 bg-card/60 p-1 backdrop-blur-3xl">
                    {OperationRoutes.map((item) => {
                        const Icon = item.icon;
                        const active = getBasePath(pathname) === getBasePath(item.path);

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`relative flex flex-col items-center justify-center rounded-full px-3 py-1 transition-all duration-300 ${active ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-muted-foreground active:scale-95"}`}
                            >
                                {active && (
                                    <div className="absolute inset-0 rounded-full bg-linear-to-b from-white/35 via-white/10 to-transparent" />
                                )}

                                <Icon className="relative z-10 size-5" />

                                <span className={`relative z-10 text-[10px] font-medium `}>
                                    {item.short}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}