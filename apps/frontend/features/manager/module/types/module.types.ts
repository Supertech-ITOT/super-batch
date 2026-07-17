import { FileText, CalendarClock, BookOpenText, Factory, Users, ShieldCheck, ClipboardList, Settings, Home, LucideIcon } from "lucide-react";

export enum ModuleType {
    PLANT_MODEL = "PLANT_MODEL",
    USER = "USER",
    ROLE = "ROLE",
    AUDIT = "AUDIT",
    RECIPE = "RECIPE",
    SCHEDULER = "SCHEDULER"
}

export interface ModuleResponse {
    id: number;
    name: string;
}


type RouteType = {
    label: string;
    path: string;
    icon: LucideIcon;
    module?: ModuleType;
}

export const OperationRoutes: RouteType[] = [
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
        module: ModuleType.SCHEDULER
    },
    {
        label: "Recipe",
        path: "/Recipe",
        icon: BookOpenText,
        module: ModuleType.RECIPE
    },
    {
        label: "PlantModel",
        path: "/PlantModel",
        icon: Factory,
        module: ModuleType.PLANT_MODEL
    },
];

export const ConfigurationRoutes: RouteType[] = [
    {
        label: "Users",
        path: "/Manager/users",
        icon: Users,
        module: ModuleType.USER
    },
    {
        label: "Roles",
        path: "/Manager/roles",
        icon: ShieldCheck,
        module: ModuleType.ROLE
    },
    {
        label: "Audit",
        path: "/Audit",
        icon: ClipboardList,
        module: ModuleType.AUDIT
    },
    {
        label: "Setting",
        path: "/Setting",
        icon: Settings,
    },
];