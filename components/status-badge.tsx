export default function StatusBadge({ status }: { status: string }) {
    const label =
        status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    let clr = "";

    switch (label) {
        case "Active":
            clr = "bg-green-50 text-green-500";
            break;

        case "Inactive":
            clr = "bg-gray-50 text-gray-500";
            break;

        case "Maintenance":
            clr = "bg-yellow-50  text-yellow-500";
            break;

        default:
            clr = "bg-blue-50 text-blue-500";
    }

    return (
        <span className={`px-2 py-1 rounded-md text-xs font-bold shadow h-fit ${clr}`}>
            {label}
        </span>
    );
}