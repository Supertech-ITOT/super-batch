"use client";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftRightIcon, Gauge, LucideIcon, Play, Plus } from "lucide-react";
import { useGetParameters } from "@/features/plant/hooks/use-parameters";
import { Skeleton } from "@/components/ui/skeleton";
import ParameterDataTable from "./parameter/data-table";
import TransitionDataTable from "./transition/data-table";
import ActionDataTable from "./action/data-table";
import ParameterColumns from "./parameter/columns";
import TransitionColumns from "./transition/columns";
import ActionColumns from "./action/columns";
import { useGetTransitions } from "../../hooks/use-transitions";
import { useGetActions } from "../../hooks/use-actions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProcessDialogs from "./process-dialog";

type ProcessCardConfig = {
    entity: ProcessEntity;
    label: string;
    desc: string;
    icon: LucideIcon;
    count: number;
    color: string;
    table: React.ReactNode;
}
type ProcessEntity = "parameter" | "transition" | "action";
type ProcessAction = "create" | "edit" | "delete";
export type ProcessDialogState = {
    open: boolean;
    entity: ProcessEntity | null;
    action: ProcessAction | null;
    id: number | null;
};

export default function ProcessView() {
    const [dialog, setDialog] = useState<ProcessDialogState>({ open: false, entity: null, action: null, id: null, });

    const { data: parameters, isLoading: parametersLoading } = useGetParameters();
    const { data: transitions, isLoading: transitionsLoading } = useGetTransitions();
    const { data: actions, isLoading: actionsLoading } = useGetActions();
    const closeDialog = () =>
        setDialog({ open: false, entity: null, action: null, id: null, });
    const openDialog = (entity: ProcessEntity, action: ProcessAction, id: number | null = null) => {
        setDialog({ open: true, entity, action, id });
    };
    const loading = parametersLoading || transitionsLoading || actionsLoading || !parameters || !transitions || !actions;
    if (loading) {
        return (
            <Skeleton className="h-full" />
        );
    }

    const cards: ProcessCardConfig[] = [
        {
            entity: "parameter",
            label: "Parameter",
            desc: "Manage process parameters and their units.",
            icon: Gauge,
            color: "#15803D",
            count: parameters.length,
            table: (
                <ParameterDataTable
                    columns={ParameterColumns(setDialog)}
                    data={parameters}
                />
            ),
        },
        {
            entity: "transition",
            label: "Transition",
            desc: "Manage step completion condition.",
            icon: ArrowLeftRightIcon,
            color: "#1D4ED8",
            count: transitions.length,
            table: (
                <TransitionDataTable
                    columns={TransitionColumns(setDialog)}
                    data={transitions}
                />
            ),
        },
        {
            entity: "action",
            label: "Action",
            desc: "Manage process actions and operations.",
            icon: Play,
            color: "#BE185D",
            count: actions.length,
            table: (
                <ActionDataTable
                    columns={ActionColumns(setDialog)}
                    data={actions}
                />
            ),
        },
    ];
    return (
        <div className="flex-1 rounded-xl border bg-card p-4 overflow-y-auto">
            <div className="grid grid-cols-1 gap-4 2xl:grid-cols-3 2xl:h-full ">
                {cards.map((p) => {
                    const Icon = p.icon;
                    return (
                        <div
                            key={p.entity}
                            className="relative flex min-h-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm p-2 transition-all hover:shadow-lg"
                            style={{
                                backgroundColor: `${p.color}02`,
                                borderColor: `${p.color}20`,
                            }}
                        >
                            {/* Watermark */}
                            <Icon
                                className="pointer-events-none absolute -bottom-10 -right-10 size-44 opacity-[0.05]"
                                style={{ color: p.color }}
                            />

                            {/* Header */}
                            <div className="flex items-center justify-between p-5 gap-2">
                                <div className="flex items-start gap-4 h-full">
                                    <div style={{ backgroundColor: p.color }} className="size-24 flex items-center justify-center border rounded-md shadow shrink-0">
                                        <Icon className="size-16 text-white" />
                                    </div>
                                    <div className="flex justify-between flex-col h-full">
                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                {p.label}
                                            </h2>
                                            <p className="text-xs text-muted-foreground">
                                                {p.desc}
                                            </p>
                                        </div>
                                        <Button className="text-white" style={{ backgroundColor: p.color }} onClick={() => openDialog(p.entity, "create", null)}>
                                            <Plus className="size-5!" />
                                            Add {p.label}
                                        </Button>
                                        <ProcessDialogs dialog={dialog} onClose={closeDialog} />
                                    </div>
                                </div>


                                <div className="flex  h-full item-center flex-col">
                                    <p
                                        className="text-2xl font-bold text-right"
                                        style={{ color: p.color }}
                                    >
                                        {p.count}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Records
                                    </p>
                                </div>



                            </div>
                            <Separator className="my-4" />
                            {/* Table */}
                            <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
                                {p.table}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}