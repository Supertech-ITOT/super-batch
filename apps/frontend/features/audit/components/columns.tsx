import { ColumnDef } from "@tanstack/react-table";
import UserAvatar from "@/common/components/user-avatar";
import { BatchAuditResponse } from "../types/audit.types";
import { format } from "date-fns";
import { toDisplayText } from "@/common/lib/format-enum";
import { Badge } from "@/common/components/ui/badge";
import { getColorByText } from "@/common/utils/color.util";
import { Circle, Eye } from "lucide-react";
import {
  EntityItemMap,
  EntityItems,
  OperationRoutes,
} from "@/features/manager/module/types/module.types";
import { Button } from "@/common/components/ui/button";

export const columns = (
  page: number,
  pageSize: number,
  onViewChanges: (audit: BatchAuditResponse) => void,
): ColumnDef<BatchAuditResponse>[] => [
    {
      id: "srNo",
      header: "Sr. No.",
      cell: ({ row }) => page * pageSize + row.index + 1,
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        const action = row.original.action;
        return (
          <Badge className={getColorByText(action)}>
            <Circle className="fill-current" />
            {toDisplayText(action)}
          </Badge>
        );
      },
    },
    {
      id: "module",
      header: "Module",
      cell: ({ row }) => {
        const module = OperationRoutes.find(
          (route) => route.module === row.original.module,
        );

        const Icon = module?.icon;

        return (
          <div className="flex items-center gap-2 justify-center">
            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            <span>{module?.label ?? toDisplayText(row.original.module)}</span>
          </div>
        );
      },
    },

    {
      id: "entity",
      header: "Entity",
      cell: ({ row }) => {
        const entity = EntityItemMap[row.original.entity];
        const Icon = entity?.icon;
        return (
          <div className="flex items-center gap-2 justify-center">
            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            <span>{entity?.label ?? toDisplayText(row.original.entity)}</span>
          </div>
        );
      },
    },

    {
      id: "performedBy",
      header: "Performed By",
      cell: ({ row }) => {
        const user = row.original.performedBy;
        if (!user) return "-";
        return (
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <UserAvatar name={user.name} />

              <div className="min-w-0 text-left">
                <p className="truncate font-medium">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>

            <Badge
              variant="outline"
              className={`h-6 text-[11px] shrink-0 ${getColorByText(user.role)}`}
            >
              <Circle className="size-2.5 fill-current" />
              {user.role}
            </Badge>
          </div>
        );
      },
    },
    {
      header: "Performed At",
      accessorFn: (row) =>
        row.performedAt
          ? format(new Date(row.performedAt), "dd MMM yyyy hh:mm a")
          : "-",
    },

    {
      id: "changes",
      header: "Changes",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          className="text-primary"
          onClick={() => onViewChanges(row.original)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View Changes
        </Button>
      ),
    },
  ];

export default columns;
