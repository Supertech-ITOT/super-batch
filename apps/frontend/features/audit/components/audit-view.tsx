"use client";

import { Skeleton } from "@/common/components/ui/skeleton";
import { Separator } from "@/common/components/ui/separator";
import { useGetBatchAudits } from "../hook/use-batch-audit";
import DataTable from "./data-table";
import columns from "./columns";

export default function AuditView() {
    const { data: audits, isLoading } = useGetBatchAudits();

    if (!audits || isLoading) {
        return (

            <div className="flex-1 rounded-lg border shadow h-full bg-card p-4 overflow-y-auto scrollbar-none flex flex-col">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-10 w-80" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="flex-1 min-h-0">
                    <Skeleton className="h-full w-full rounded-lg" />
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 rounded-lg border shadow h-full bg-card p-4 overflow-y-auto scrollbar-none flex-col">
            <div className="flex-1 min-h-0 my-4">
                <DataTable
                    columns={columns}
                    data={audits}
                />
            </div>
        </div>
    );
}