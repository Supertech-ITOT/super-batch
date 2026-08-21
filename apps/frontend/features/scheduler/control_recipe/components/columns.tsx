import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/common/components/ui/button";
import { DialogProp } from "./control-recipe-view";
import { BookCopy, BookOpen, BookOpenText, Boxes, CalendarDays, Circle, ClipboardList, Clock3, Eye, Factory, MoveRight, Package, PencilLine, Scale, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/common/components/ui/badge";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getColorByText } from "@/common/utils/color.util";
import { ControlRecipeResponse, ControlRecipeStatus, ControlRecipeStatusBadgeStyles } from "../types/control-recipe.types";
import { Separator } from "@/common/components/ui/separator";
import UserAvatar from "@/common/components/user-avatar";

export const columns = (setDialog: React.Dispatch<React.SetStateAction<DialogProp>>, router: AppRouterInstance): ColumnDef<ControlRecipeResponse>[] => [
    {
        id: "srNo",
        header: "Sr. No.",
        cell: ({ row }) => row.index + 1,
        meta: {
            align: "center",
        },
    },
    {
        header: "Batch",
        id: "batch",
        accessorFn: (row) => row.batchNo,
        cell: ({ row }) => {
            const { batchNo, batchSize, scheduledAt, status } = row.original;
            return (
                <div className="space-y-2">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-primary text-lg"> #{batchNo}</span>
                        <Badge className={ControlRecipeStatusBadgeStyles[status as keyof typeof ControlRecipeStatusBadgeStyles]} >
                            <Circle className="size-2 fill-current" />
                            {status === ControlRecipeStatus.SCHEDULED ? "Scheduled" : "Transferred"}
                        </Badge>
                    </div>

                    <Separator className="opacity-50" />

                    {/* Batch Size */}
                    <div className="flex items-center justify-between">
                        <div className="flex w-28 items-center gap-2 text-muted-foreground">
                            <div className="rounded bg-muted-foreground/10 p-2">
                                <Scale className="size-3.5 shrink-0 text-foreground" />
                            </div>
                            <span className="text-muted-foreground">Size</span>
                        </div>
                        <span className="font-medium">{batchSize} KG</span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center justify-between">
                        <div className="flex w-28 items-center gap-2 text-muted-foreground">
                            <div className="rounded bg-primary/10 p-2">
                                <CalendarDays className="size-3.5 shrink-0 text-primary" />
                            </div>
                            <span className="text-muted-foreground">Schedule</span>
                        </div>
                        <span className="font-medium">
                            {scheduledAt ? format(new Date(scheduledAt), "dd MMM yyyy hh:mm a") : "-"}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        header: "Recipe",
        cell: ({ row }) => (
            <div className="space-y-2">
                {/* Control Recipe */}
                <div className="flex items-center gap-2 ">
                    <div className="rounded bg-primary/10 p-2">
                        <BookCopy className="size-4 shrink-0 text-primary" />
                    </div>
                    <div className="min-w-0 text-left">
                        <p className="text-muted-foreground">
                            Control Recipe
                        </p>
                        <p className="truncate font-medium leading-none">
                            {row.original.name}
                        </p>
                    </div>
                </div>

                {/* Master Recipe */}
                <div className="flex items-center gap-2 ">
                    <div className="rounded bg-muted-foreground/10 p-2">
                        <BookOpenText className="size-4 shrink-0 text-foreground" />
                    </div>
                    <div className="min-w-0 text-left">
                        <p className="text-muted-foreground">
                            Master Recipe
                        </p>
                        <p className="truncate font-medium leading-none">
                            {row.original.recipe.name}
                        </p>
                    </div>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap gap-1">
                    <Badge
                        variant="outline"
                        className={`h-6 gap-1 px-2 text-[11px] ${getColorByText(row.original.recipe.unit.name)}`}
                    >
                        <Boxes />
                        {row.original.unit.name}
                    </Badge>

                    <Badge
                        variant="outline"
                        className={`h-6 gap-1 px-2 text-[11px] ${getColorByText(row.original.recipe.product)}`}
                    >
                        <Package />
                        {row.original.recipe.product}
                    </Badge>
                </div>
            </div>
        ),
    },
    {
        id: "people",
        header: "Assignment",
        cell: ({ row }) => {
            const assignments = [
                {
                    user: row.original.shiftIncharge,
                    assignment: "Shift Incharge",
                },
                {
                    user: row.original.createdBy,
                    assignment: "Scheduled By",
                },
            ];

            return (
                <div className="space-y-2">
                    {assignments.map(({ user, assignment }) =>
                        user ? (
                            <div
                                key={assignment}
                                className="grid grid-cols-[100px_1fr_100px] items-center gap-3  border-l-2 border-l-primary bg-card px-3 py-2"
                            >
                                {/* Assignment */}
                                <p className="text-[10px] text-left font-semibold uppercase tracking-wider text-muted-foreground">
                                    {assignment}
                                </p>

                                {/* User */}
                                <div className="flex items-center gap-3 min-w-52 shrink-0">
                                    <UserAvatar
                                        name={user.name}
                                        className="size-8 shrink-0"
                                    />

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium leading-none">
                                            {user.name}
                                        </p>
                                        <p className="mt-1 truncate text-xs text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Role */}
                                <div className="flex justify-end">
                                    <Badge className={getColorByText(user.role)}>
                                        {user.role}
                                    </Badge>
                                </div>
                            </div>
                        ) : (
                            <div
                                key={assignment}
                                className="grid grid-cols-[140px_1fr_110px] items-center gap-3 rounded-lg border border-dashed px-3 py-2"
                            >
                                <div className="border-l-2 border-muted pl-2">
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                        {assignment}
                                    </p>
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    No user assigned
                                </p>

                                <div />
                            </div>
                        )
                    )}
                </div>
            );
        },
    },
    {
        id: "modified",
        meta: {
            align: "center",
        },
        header: "Modified",
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
            const controlRecipe = row.original;

            return (
                <div className="flex items-center justify-center flex-col gap-0.5">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/Scheduler/edit?id=${controlRecipe.id}`)}>
                        <Eye className="size-5!" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDialog({ action: "transfer", id: controlRecipe.id, open: true, })}>
                        <MoveRight className="size-5! text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDialog({ action: "edit", id: controlRecipe.id, open: true, })} >
                        <PencilLine className="size-4! text-blue-800" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDialog({ action: "delete", id: controlRecipe.id, open: true, })}>
                        <Trash2 className="size-4.5! text-destructive" />
                    </Button>
                </div>
            );
        },
    }

];

export default columns;