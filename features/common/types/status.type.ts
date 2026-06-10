export enum StatusType {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    MAINTENANCE = "MAINTENANCE"
}

export const StatusConfig = [
    { value: "ACTIVE", label: "Active", dot: "bg-green-600" },
    { value: "INACTIVE", label: "Inactive", dot: "bg-gray-600" },
    { value: "MAINTENANCE", label: "Maintenance", dot: "bg-yellow-600" },
]

export const StatusBadgeStyles = {
    ACTIVE:
        "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
    INACTIVE:
        "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800",
    MAINTENANCE:
        "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
} as const;