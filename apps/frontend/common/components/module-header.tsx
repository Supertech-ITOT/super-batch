"use client";

import { Button } from "@/common/components/ui/button";
import { ConfigurationRoutes, OperationRoutes } from "@/features/manager/module/types/module.types";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ModuleBreadcrumb } from "./module-breadcrumb";


export default function ModuleHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const getBasePath = (path: string) => "/" + path.split("/")[1];
    const routes = [...OperationRoutes, ...ConfigurationRoutes];
    const current = routes.find(route => getBasePath(pathname) === getBasePath(route.path));

    if (!current) return null;
    const Icon = current.icon;
    const isRoot = pathname === current.path;
    return (
        <header className="border-b bg-background px-6 py-4">
            <div className="flex items-center gap-4">
                {!isRoot && (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.back()}
                        className="size-12 shrink-0 rounded-full"
                    >
                        <ChevronLeft className="size-6!" />
                    </Button>
                )}

                <div className="min-w-0 flex-1">
                    <ModuleBreadcrumb />

                    <div className="mt-1 flex items-center gap-3">
                        <Icon className="size-10 text-primary animate-in zoom-in duration-300" />
                        <div className="min-w-0">
                            <h1 className="truncate text-lg font-bold leading-none text-primary">
                                {current.label}
                            </h1>

                            <p className="mt-1 text-xs text-muted-foreground">
                                {current.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}