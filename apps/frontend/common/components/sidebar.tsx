"use client";
import { ChevronUp, LogOut, PanelLeftOpen, Loader, Clock3 } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useLogout } from "@/features/manager/auth/hooks/use-auth";
import { useGetCurrentUser } from "@/features/manager/user/hooks/use-user";
import { ConfigurationRoutes, ModuleType, OperationRoutes } from "@/features/manager/module/types/module.types";
import SidebarSkeleton from "./sidebar-skeleton";
import SessionCard from "./session-card";
import { useSidebar } from "./sidebar-provider";



export default function SideBar() {
    const pathname = usePathname();
    const router = useRouter();
    const { open } = useSidebar();
    const { mutateAsync: logout, isPending: logoutIsPending } = useLogout();
    const { data: user, isLoading: userIsLoading } = useGetCurrentUser();
    const loading = !user || userIsLoading;
    const initials = user?.name?.split(" ").map((word) => word[0]).join("").toUpperCase() ?? "U";
    const hasReadPermission = (module?: ModuleType) => {
        if (!module) return true;
        return user?.permissions?.some(
            (permission) =>
                permission.moduleName === module && permission.access
        );
    };

    const onLogout = async () => {
        try {
            const res = await logout();
            toast.success(res.message ?? "LogOut Success");
            router.replace("/");
        }
        catch (error) {
            showApiError(error);
        }
    }
    return (
        <>
            <aside className={`h-full z-50 border-r transition-all duration-300 bg-card overflow-hidden flex flex-col  ${open ? "w-60 p-4" : "w-12 items-center"}`}>
                {loading
                    ? (<SidebarSkeleton open={open} />)
                    : (
                        <>
                            {/* Plant Operation */}
                            {open && <div>
                                <h1 className="font-semibold text-sm uppercase">Operation</h1>
                            </div>}
                            <div className="flex flex-col space-y-2 mt-2">
                                {OperationRoutes
                                    .filter(route => hasReadPermission(route.module))
                                    .map((el) => {
                                        const active = pathname.startsWith(el.path);
                                        const Icon = el.icon;
                                        return (
                                            <Link
                                                key={el.label}
                                                href={el.path}
                                                className={`flex flex-row gap-2 rounded-sm items-end  text-muted-foreground px-2 py-2 text-sm transition-all duration-300  ${active ? "bg-primary text-white" : "hover:bg-background hover:shadow"}`}>
                                                <Icon className="w-5 h-5" />
                                                {open && <span>{el.label}</span>}
                                            </Link>
                                        )
                                    })}
                            </div>
                            {/* Configuration */}
                            {open && <div className="mt-10 ">
                                <h1 className="font-semibold text-sm uppercase">Configuration</h1>
                            </div>
                            }
                            <div className="flex flex-col space-y-2 mt-2">
                                {ConfigurationRoutes
                                    .filter(route => hasReadPermission(route.module))
                                    .map((el) => {
                                        const active = pathname.startsWith(el.path);
                                        const Icon = el.icon;
                                        return (
                                            <Link
                                                key={el.label}
                                                href={el.path}
                                                className={`flex flex-row gap-2 rounded-sm items-end  text-muted-foreground px-2 py-2 text-sm transition-all duration-300  ${active ? "bg-primary text-white" : "hover:bg-background hover:shadow"}`}>
                                                <Icon className="w-5 h-5" />
                                                {open && <span>{el.label}</span>}
                                            </Link>
                                        )
                                    })}
                            </div>

                            {/* User Section */}
                            <div className="mt-auto p-2">
                                <Separator className="my-4" />
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="w-full flex bg-card! items-center justify-between rounded-xl  hover:bg-muted transition-all">
                                            <div className="flex items-center gap-3">
                                                {/* Avatar */}
                                                <div className={`${open ? "size-11" : "size-8"} rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm`}>
                                                    {initials}
                                                </div>
                                                {/* User Info */}
                                                {open && <div className="flex flex-col text-left">
                                                    <span className="text-sm font-medium text-foreground">{user?.name ?? "-"}</span>
                                                    <span className="text-xs text-muted-foreground">{user?.roleName ?? "-"}</span>
                                                </div>}
                                            </div>
                                            {open && <ChevronUp className="w-4 h-4 text-muted-foreground" />}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        side="right"
                                        align="end"
                                        className="w-62 p-2 rounded-xl"
                                    >
                                        <SessionCard />
                                        <Separator className="my-2" />
                                        <DropdownMenuItem
                                            onClick={onLogout}
                                            className="text-destructive cursor-pointer"
                                        >
                                            {logoutIsPending ? (
                                                <Loader className="size-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <LogOut className="mr-2 size-4" />
                                                    Logout
                                                </>
                                            )}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </>
                    )
                }
            </aside>
        </>
    )
}