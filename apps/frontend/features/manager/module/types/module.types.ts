import { CalendarClock, BookOpenText, Factory, Users, ShieldCheck, ClipboardList, Settings, LucideIcon, UserCogIcon } from "lucide-react";

export enum ModuleType {
    MANAGER = "MANAGER",
    PLANT_MODEL = "PLANT_MODEL",
    RECIPE = "RECIPE",
    SCHEDULER = "SCHEDULER",
    AUDIT = "AUDIT",
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
        label: "Batch Manager",
        path: "/Manager/roles",
        icon: UserCogIcon,
        module: ModuleType.MANAGER
    },
    {
        label: "Plant Model",
        path: "/PlantModel",
        icon: Factory,
        module: ModuleType.PLANT_MODEL
    },
    {
        label: "Recipe Engine",
        path: "/Recipe",
        icon: BookOpenText,
        module: ModuleType.RECIPE
    },

    {
        label: "Batch Scheduler",
        path: "/Scheduler",
        icon: CalendarClock,
        module: ModuleType.SCHEDULER
    },
    {
        label: "Batch Audit",
        path: "/Audit",
        icon: ClipboardList,
        module: ModuleType.AUDIT
    },
];

export const ConfigurationRoutes: RouteType[] = [

    {
        label: "Setting",
        path: "/Setting",
        icon: Settings,
    },
];