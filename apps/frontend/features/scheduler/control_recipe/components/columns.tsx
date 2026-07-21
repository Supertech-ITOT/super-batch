import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/common/components/ui/button";
import { DialogProp } from "./control-recipe-view";
import { Circle, Eye, PencilLine, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/common/components/ui/badge";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getColorByText } from "@/common/utils/color.util";
import { ControlRecipeResponse, ControlRecipeStatus, ControlRecipeStatusBadgeStyles } from "../types/control-recipe.types";

export const columns = (setDialog: React.Dispatch<React.SetStateAction<DialogProp>>, router: AppRouterInstance): ColumnDef<ControlRecipeResponse>[] => [
    {
        id: "srNo",
        header: "Sr. No.",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "name",
        header: "Control Recipe Name",
    },
    {
        header: "Master Recipe Name",
        accessorFn: (row) => row.recipe.name
    },
    {
        header: "Scheduled At",
        cell: ({ row }) => {
            const value = row.original.scheduledAt;
            if (!value || new Date(value).getTime() === 0) {
                return "-";
            }
            return format(new Date(value), "dd MMM yyyy hh:mm a");
        },
    },

    {
        id: "batchSize",
        header: "Batch Size",
        cell: ({ row }) => {
            const batchSize = row.original.batchSize;
            const uom = "kg";
            return `${batchSize} ${uom}`.trim();
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge className={ControlRecipeStatusBadgeStyles[status as keyof typeof ControlRecipeStatusBadgeStyles]}>
                    <Circle className="size-2.5! fill-current" />
                    {status === ControlRecipeStatus.SHEDULED ? "Scheduled" : "Transfer"}
                </Badge>
            );
        },
    },
    {
        header: "Product",
        accessorFn: (row) =>
            row.recipe.product ?? "-",
    },
    {
        header: "Unit",
        accessorFn: (row) =>
            row.recipe.unit ?? "-",
    },
    {
        id: "shiftIncharge",
        header: "Shift Incharge",
        cell: ({ row }) => {
            const user = row.original.shiftIncharge;
            if (!user) return "-";
            const initials = user.name?.split(" ").map(word => word[0]).join("").substring(0, 2).toUpperCase();
            return (
                <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${getColorByText(user.name)}`}>
                        {initials}
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">
                            {user.email}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        id: "createdBy",
        header: "Scheduled By",
        cell: ({ row }) => {
            const user = row.original.createdBy;
            if (!user) return "-";
            const initials = user.name?.split(" ").map(word => word[0]).join("").substring(0, 2).toUpperCase();
            return (
                <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${getColorByText(user.name)}`}>
                        {initials}
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">
                            {user.email}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        id: "lastModified",
        header: "Last Modified",
        cell: ({ row }) => {
            const value = row.original.updatedAt || row.original.createdAt;

            if (!value || new Date(value).getTime() === 0) {
                return "-";
            }

            return format(new Date(value), "dd MMM yyyy hh:mm a");
        },
    },

    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const recipe = row.original;

            return (
                <div className="flex items-center justify-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/Scheduler/edit?id=${recipe.id}`)}>
                        <Eye className="size-5!" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDialog({ action: "edit", id: recipe.id, open: true, })} >
                        <PencilLine className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDialog({ action: "delete", id: recipe.id, open: true, })}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            );
        },
    }

];

export default columns;