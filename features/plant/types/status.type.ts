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