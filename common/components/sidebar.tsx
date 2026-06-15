"use client";
import { FileText, CalendarClock, BookOpenText, Factory, Users, ShieldCheck, ClipboardList, Settings, ChevronUp, Home, LogOut, LucideIcon, PanelLeftOpen, Loader } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";
import Image from "next/image";
import { useLogout } from "@/features/manager/hooks/useAuth";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { getUser } from "@/features/manager/types/auth.types";

type RouteType = {
    label: string;
    path: string;
    icon: LucideIcon;
}

const OperationRoutes: RouteType[] = [
    {
        label: "Dashboard",
        path: "/Dashboard",
        icon: Home,
    },
    {
        label: "Reports",
        path: "/Reports",
        icon: FileText,
    },
    {
        label: "Scheduler",
        path: "/Scheduler",
        icon: CalendarClock,
    },
    {
        label: "Recipe",
        path: "/Recipe",
        icon: BookOpenText,
    },
    {
        label: "PlantModel",
        path: "/PlantModel",
        icon: Factory,
    },
];

const AdminRoutes: RouteType[] = [
    {
        label: "Users",
        path: "/Users",
        icon: Users,
    },
    {
        label: "Roles",
        path: "/Roles",
        icon: ShieldCheck,
    },
    {
        label: "Audit",
        path: "/Audit",
        icon: ClipboardList,
    },
    {
        label: "Setting",
        path: "/Setting",
        icon: Settings,
    },
];

export default function SideBar() {
    const pathname = usePathname();
    const router = useRouter();
    const { mutateAsync: logout, isPending } = useLogout();
    const [open, setOpen] = useState<boolean>(true);
    const user = getUser();
    const initials =
        user?.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase() ?? "U";
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
            {/* Outside Toggle Button */}
            {!open && (
                <Button onClick={() => setOpen(true)} size="icon-lg" variant="outline" className="fixed transition-all duration-1000 top-4 left-4 z-40">
                    <PanelLeftOpen className="w-6! h-6!" />
                </Button>
            )}
            <aside className={`min-h-screen z-50 border-r transition-all duration-300 bg-card overflow-hidden flex flex-col  ${open ? "w-60 p-4" : "w-18 items-center"}`}>
                <div className="flex justify-between items-center my-4">

                    <Button
                        onClick={() => setOpen((prev) => !prev)}
                        variant="ghost"
                        size="icon-lg"
                        className="h-auto w-full justify-start "
                    >
                        {open ? (
                            <div className="w-46">
                                <Image
                                    src="/superbatch-light.png"
                                    alt="SuperBatch Light Logo"
                                    priority
                                    width={500}
                                    height={120}
                                    draggable={false}
                                    className="w-full h-auto object-contain dark:hidden"
                                />
                                <Image
                                    src="/superbatch-dark.png"
                                    alt="SuperBatch Dark Logo"
                                    priority
                                    width={500}
                                    height={120}
                                    draggable={false}
                                    className="hidden dark:block w-full h-auto object-contain"
                                />
                            </div>
                        ) : (
                            <Image
                                src="/icon.png"
                                alt="SuperBatch Icon"
                                priority
                                width={20}
                                height={20}
                                draggable={false}
                                className="w-8 h-8 object-contain"
                            />
                        )}
                    </Button>
                </div>


                {/* Plant Operation */}
                {open && <div className="mt-10">
                    <h1 className="text-muted-foreground text-sm uppercase">Plant Operation</h1>
                </div>}
                <div className="flex flex-col space-y-2 mt-2">
                    {OperationRoutes.map((el) => {
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
                {/* Administration */}
                {open && <div className="mt-10 ">
                    <h1 className="text-muted-foreground text-sm uppercase">Administration</h1>
                </div>
                }
                <div className="flex flex-col space-y-2 mt-2">
                    {AdminRoutes.map((el) => {
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
                <div className="mt-auto py-4">
                    <Separator className="mb-4" />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="w-full flex bg-card! h-14! items-center justify-between rounded-xl p-3! hover:bg-muted transition-all">
                                <div className="flex items-center gap-3">
                                    {/* Avatar */}
                                    <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                                        {initials}
                                    </div>
                                    {/* User Info */}
                                    {open && <div className="flex flex-col text-left">
                                        <span className="text-sm font-medium text-foreground">{user?.name ?? "-"}</span>
                                        <span className="text-xs text-muted-foreground">{user?.role ?? "-"}</span>
                                    </div>}
                                </div>
                                {open && <ChevronUp className="w-4 h-4 text-muted-foreground" />}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="top" align="end" className="min-w-fit!">
                            <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-destructive justify-center">
                                {isPending
                                    ? <Loader className="animate-spin size-4" />
                                    :
                                    <>
                                        <LogOut className="w-4 h-4 mr-2" />
                                        {open && <span>Logout</span>}
                                    </>

                                }

                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </aside>
        </>
    )
}