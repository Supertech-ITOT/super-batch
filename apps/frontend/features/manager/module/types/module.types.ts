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
    short: string;
    path: string;
    icon: LucideIcon;
    module?: ModuleType;
    description: string;
}

export const OperationRoutes: RouteType[] = [
    {
        label: "Batch Manager",
        short: "Manager",
        path: "/Manager/roles",
        icon: UserCogIcon,
        module: ModuleType.MANAGER,
        description:
            "Manage users, roles, and module permissions for secure system access.",
    },
    {
        label: "Plant Model",
        short: "Model",
        path: "/PlantModel",
        icon: Factory,
        module: ModuleType.PLANT_MODEL,
        description:
            "Configure the ISA-88 plant hierarchy, equipment, and process resources.",
    },
    {
        label: "Recipe Engine",
        short: "Recipe",
        path: "/Recipe",
        icon: BookOpenText,
        module: ModuleType.RECIPE,
        description:
            "Create and maintain recipes, procedures, operations, and phases.",
    },
    {
        label: "Batch Scheduler",
        short: "Scheduler",
        path: "/Scheduler",
        icon: CalendarClock,
        module: ModuleType.SCHEDULER,
        description:
            "Schedule, execute, and monitor production batches in real time.",
    },
    {
        label: "Batch Audit",
        short: "Audit",
        path: "/Audit",
        icon: ClipboardList,
        module: ModuleType.AUDIT,
        description:
            "Review audit trails, user activities, and system change history.",
    },
];

export const ConfigurationRoutes: RouteType[] = [
    {
        label: "Settings",
        short: "Settings",
        path: "/Setting/profile",
        icon: Settings,
        description:
            "Configure system preferences, application settings, and defaults.",
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