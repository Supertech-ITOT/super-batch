import { CalendarClock, BookOpenText, Factory, Users, ShieldCheck, ClipboardList, Settings, LucideIcon, UserCogIcon, Building, Boxes, Cpu, PackageCheckIcon, Gauge, ArrowRightLeft, Play, MessageSquareQuote, Hash, CalendarClockIcon, PackageCheck, Package } from "lucide-react";

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

export const EntityItems = [
    { type: "PLANT", label: "Plant", icon: Factory },
    { type: "AREA", label: "Area", icon: Building },
    { type: "UNIT", label: "Unit", icon: Boxes },
    { type: "EQUIPMENT", label: "Equipment", icon: Cpu },

    { type: "MATERIAL", label: "Material", icon: PackageCheck },
    { type: "PARAMETER", label: "Parameter", icon: Gauge },
    { type: "TRANSITION", label: "Transition", icon: ArrowRightLeft },
    { type: "ACTION", label: "Action", icon: Play },

    { type: "RECIPE", label: "Recipe", icon: BookOpenText },
    { type: "RECIPE_SOP", label: "Recipe SOP", icon: Hash },
    { type: "CONTROL_RECIPE", label: "Control Recipe", icon: CalendarClock },
    { type: "CONTROL_RECIPE_SOP", label: "Control Recipe SOP", icon: Hash },

    { type: "ROLE", label: "Role", icon: ShieldCheck },
    { type: "USER", label: "User", icon: Users },

    { type: "BATCH", label: "Batch", icon: Package },
];

export const EntityItemMap = Object.fromEntries(
    EntityItems.map((item) => [item.type, item])
);