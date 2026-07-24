import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import UserAvatar from "@/common/components/user-avatar";
import { BatchAuditResponse } from "../types/audit.types";

export const columns: ColumnDef<BatchAuditResponse>[] = [
        {
            id: "srNo",
            header: "Sr. No.",
            cell: ({ row }) => row.index + 1,
        },
        {
            header: "Action",
            accessorFn: (row) => row.action,
        },
        {
            header: "Module Name",
            accessorFn: (row) => row.moduleName,
       
        },
        {
            id: "performedBy",
            header: "Performed By",
            cell: ({ row }) => {
                const user = row.original.performedBy;
                if (!user) return "-";
                return (
                    <div className="flex items-center gap-3">
                        <UserAvatar name={user.name} />
                        <div className="flex flex-col text-left">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-xs text-muted-foreground">{user.email} </span>
                        </div>
                    </div>
                );
            },
        },
        {
            header: "Performed At",
             accessorFn: (row) => row.performedAt,
        },
        {
            header: "Entity",
             accessorFn: (row) => row.entityName,
        },
    ];

export default columns;