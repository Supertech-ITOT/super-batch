"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { OperationRoutes } from "@/features/manager/module/types/module.types";

export default function BottomNavigation() {
    const pathname = usePathname();
    const getBasePath = (path: string) => "/" + path.split("/")[1];
    return (
        <nav className="fixed inset-x-0 bottom-0 z-50 w-full px-2 pb-[max(2px,env(safe-area-inset-bottom))] md:hidden">
            <div className="w-full rounded-full border bg-card/60 p-1 backdrop-blur-3xl">
                <div className="flex w-full items-center">
                    {OperationRoutes.map((item) => {
                        const Icon = item.icon;

                        const active =
                            getBasePath(pathname) === getBasePath(item.path);

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className="relative flex min-w-0 flex-1 flex-col items-center justify-center rounded-full py-2"
                            >
                                {active && (
                                    <motion.div
                                        layoutId="bottom-nav-active"
                                        className="absolute inset-0 rounded-full bg-primary shadow-lg shadow-primary/30"
                                        transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 35,
                                            mass: 0.8,
                                        }}
                                    >
                                        <div className="absolute inset-0 rounded-full bg-linear-to-b from-white/35 via-white/10 to-transparent" />
                                    </motion.div>
                                )}

                                <Icon
                                    className={`relative z-10 size-6 transition-colors duration-200 ${active
                                        ? "text-white"
                                        : "text-muted-foreground"
                                        }`}
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}