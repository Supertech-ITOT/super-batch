"use client";

import { useState } from "react";
import { useGetCheckParameters } from "../hooks/use-qualityCheck";
import FeedbackState from "@/common/components/feedback-state";
import { ClipboardCheckIcon, Plus } from "lucide-react";
import { Separator } from "@/common/components/ui/separator";
import { DataTable } from "@/common/components/data-table/data-table";
import { columns } from "./columns";
import DataTableSearch from "@/common/components/data-table/data-table-search";
import { Button } from "@/common/components/ui/button";
import QualityCheckSkeleton from "./quality-check-skeleton";

type CheckParameterAction = "create" | "edit" | "delete";
export type CheckParameterDialogState = {
  open: boolean;
  action: CheckParameterAction | null;
  checkParameterId: number | null;
};
export default function QualityCheckView() {
  const [dialog, setDialog] = useState<CheckParameterDialogState>({
    open: false,
    action: null,
    checkParameterId: null,
  });
  const {
    data: checkParameters,
    isLoading: checkParametersLoading,
    isError: checkParametersIsError,
  } = useGetCheckParameters();
  const loading = checkParametersLoading;
  const error = checkParametersIsError;

  const closeDialog = () =>
    setDialog({
      open: false,
      action: null,
      checkParameterId: null,
    });

  if (loading) {
    return <QualityCheckSkeleton />;
  }

  if (error) {
    return <FeedbackState variant="error" />;
  }

  if (!checkParameters) {
    return <FeedbackState variant="empty" />;
  }
  return (
    <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
      <div className="flex justify-between flex-wrap gap-2">
        <div className="flex gap-3">
          <div className="size-28 flex items-center justify-center border rounded-2xl shadow shrink-0">
            <ClipboardCheckIcon className="size-16 text-primary" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-xl uppercase tracking-wider text-primary">
              Quality Check
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage quality check parameters associated with finished products.
            </p>
          </div>
        </div>
      </div>
      <Separator className="my-2" />
      <DataTable
        columns={columns(setDialog)}
        data={checkParameters ?? []}
        pageSize={10}
        toolbar={(table) => (
          <div className="flex items-center gap-2">
            <DataTableSearch
              table={table}
              column="name"
              placeholder="Search parameters..."
            />
            <Button
              className="ml-auto text-white h-8 sm:h-10"
              onClick={() =>
                setDialog({
                  open: true,
                  action: "create",
                  checkParameterId: null,
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Parameters
            </Button>
          </div>
        )}
      />
    </div>
  );
}
