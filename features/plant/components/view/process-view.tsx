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

type ProcessTypeCard = {
    label: string;
    desc: string;
    icon: LucideIcon;
    table: React.ReactNode;
    clr: string;
}

export default function ProcessView() {
    const { data: parameters, isLoading: parametersLoading } = useGetParameters();
    const { data: transitions, isLoading: transitionsLoading } = useGetTransitions();
    const { data: actions, isLoading: actionsLoading } = useGetActions();
    const loading = parametersLoading || transitionsLoading || actionsLoading || !parameters || !transitions || !actions;
    if (loading) {
        return (
            <Skeleton className="h-full" />
        );
    }

    const ProcessCard: ProcessTypeCard[] = [
        { label: "Parameter", desc: "Manage process parameters and their units.", icon: Gauge, table: <ParameterDataTable columns={ParameterColumns} data={parameters} />, clr: "#15803D" },
        { label: "Transition", desc: "Manage step completion condition.", icon: ArrowLeftRightIcon, table: <TransitionDataTable columns={TransitionColumns} data={transitions} />, clr: "#1D4ED8" },
        { label: "Action", desc: "Manage process action and operation.", icon: Play, table: <ActionDataTable columns={ActionColumns} data={actions} />, clr: "#BE185D" },
    ];
    return (
        <div className="flex-1 rounded-xl border bg-card p-4 overflow-y-auto">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                {ProcessCard.map((p) => {
                    const Icon = p.icon;

                    const count =
                        p.label === "Parameter"
                            ? parameters.length
                            : p.label === "Transition"
                                ? transitions.length
                                : actions.length;

                    return (
                        <div
                            key={p.label}
                            className="relative flex min-h-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm p-2 transition-all hover:shadow-lg"
                            style={{
                                backgroundColor: `${p.clr}02`,
                                borderColor: `${p.clr}20`,
                            }}
                        >
                            {/* Watermark */}
                            <Icon
                                className="pointer-events-none absolute -bottom-10 -right-10 size-44 opacity-[0.05]"
                                style={{ color: p.clr }}
                            />

                            {/* Header */}
                            <div className="flex items-center justify-between p-5">
                                <div className="flex items-center gap-4">
                                    <div
                                        style={{ backgroundColor: p.clr }}
                                        className="flex size-14 shrink-0 items-center justify-center rounded-2xl shadow-md"
                                    >
                                        <Icon className="size-7 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            {p.label}
                                        </h2>
                                        <p className="text-xs text-muted-foreground">
                                            {p.desc}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p
                                        className="text-2xl font-bold"
                                        style={{ color: p.clr }}
                                    >
                                        {count}
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