export default function StatusBadge({ status }: { status?: string }) {
    if (!status) return;
    const label =
        status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    let clr = "";

    switch (label) {
        case "Active":
            clr =
                "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400";
            break;

        case "Inactive":
            clr =
                "bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
            break;

        case "Maintenance":
            clr =
                "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";
            break;

        default:
            clr =
                "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    }

    return (
        <span
            className={`px-2 py-1 rounded-md text-xs font-bold shadow h-fit ${clr}`}
        >
            {label}
        </span>
    );
}