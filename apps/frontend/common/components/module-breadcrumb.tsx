"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const titleMap: Record<string, string> = {
    Manager: "Batch Manager",
    roles: "Roles",
    users: "Users",
    PlantModel: "Plant Model",
    Recipe: "Recipe Engine",
    Scheduler: "Batch Scheduler",
    Audit: "Batch Audit",
    create: "Create",
    edit: "Edit",
    materials: "Materials",
    process: "Process",
    message: "Predefiend Message",
    plant: "Plant", area: "Area", unit: "Unit", equipment: "Equipment"
};

export function ModuleBreadcrumb() {
    const pathname = usePathname();
    const breadcrumbs = useMemo(() => {
        const segments = pathname.split("/").filter(Boolean);
        return segments.map((segment, index) => ({
            href: "/" + segments.slice(0, index + 1).join("/"),
            label: titleMap[segment] ?? segment,
            isLast: index === segments.length - 1,
        }));
    }, [pathname]);
    return (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Link href="/">Home</Link>

            {breadcrumbs.map(({ href, label, isLast }) => (
                <div key={href} className="flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    <Link
                        href={href}
                        className={isLast ? "font-medium text-foreground" : ""}
                    >
                        {label}
                    </Link>
                </div>
            ))}
        </div>
    );
}