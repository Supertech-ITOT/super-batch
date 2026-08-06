"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LucideIcon, Plus } from "lucide-react";

import { Separator } from "@/common/components/ui/separator";
import { Button } from "@/common/components/ui/button";
import { DataTable } from "@/common/components/data-table/data-table";
import DataTableSearch from "@/common/components/data-table/data-table-search";

import ProcessDialogs from "./process-dialog";
import {
    ProcessDialogState,
} from "./process-view";

export type ProcessEntity = "parameter" | "transition" | "action";
export type ProcessAction = "create" | "edit" | "delete";

type Props<T> = {
    entity: ProcessEntity;
    label: string;
    desc: string;
    icon: LucideIcon;
    color: string;
    count: number;

    columns: ColumnDef<T>[];
    data: T[];

    dialog: ProcessDialogState;
    onClose: () => void;
    openDialog: (
        entity: ProcessEntity,
        action: ProcessAction,
        id?: number | null
    ) => void;
};

export default function ProcessCard<T>({ entity, label, desc, icon: Icon, color, count, columns, data, dialog, onClose, openDialog, }: Props<T>) {
    return (
        <div className="relative flex min-h-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm p-2 transition-all hover:shadow-lg">
            <Icon
                className="pointer-events-none absolute -bottom-10 -right-10 size-44 opacity-[0.05]"
                style={{ color }}
            />
            <div className="flex items-center justify-between p-5 gap-2">
                <div className="flex items-start gap-4 h-full">
                    <div
                        className="size-24 flex items-center justify-center rounded-2xl shadow shrink-0"
                        style={{ backgroundColor: color }}
                    >
                        <Icon className="size-16 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">{label}</h2>
                        <p className="text-xs text-muted-foreground">  {desc}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-2xl font-bold" style={{ color }} >{count}</p>
                    <p className="text-xs text-muted-foreground">Records</p>
                </div>
            </div>
            <Separator className="my-2" />
            <DataTable
                columns={columns}
                data={data}
                pageSize={10}
                toolbar={(table) => (
                    <div className="flex items-center gap-2">
                        <DataTableSearch
                            table={table}
                            column="name"
                            placeholder={`Search ${label.toLowerCase()}...`}
                        />
                        <Button
                            className="ml-auto"
                            onClick={() => openDialog(entity, "create")}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add {label}
                        </Button>
                    </div>
                )}
            />
            {<ProcessDialogs dialog={dialog} onClose={onClose} />}
        </div>
    );
}