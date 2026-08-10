"use client";

import { useState } from "react";
import { Gauge, ArrowLeftRightIcon, Play } from "lucide-react";
import { useGetParameters } from "../../../parameter/hooks/use-parameters";
import { useGetTransitions } from "../../../transition/hooks/use-transitions";
import { useGetActions } from "../../../action/hooks/use-actions";
import ParameterColumns from "../../../parameter/components/columns";
import TransitionColumns from "../../../transition/components/columns";
import ActionColumns from "../../../action/components/columns";
import ProcessCard from "./process-card";
import FeedbackState from "@/common/components/feedback-state";
import ProcessSkeleton from "./process-skeleton";

export type ProcessEntity = | "parameter" | "transition" | "action";
export type ProcessAction = | "create" | "edit" | "delete";
export type ProcessDialogState = {
    open: boolean;
    entity: ProcessEntity | null;
    action: ProcessAction | null;
    id: number | null;
};

export default function ProcessView() {
    const [dialog, setDialog] = useState<ProcessDialogState>({ open: false, entity: null, action: null, id: null, });
    const { data: parameters, isLoading: parametersLoading, isError: parametersIsError } = useGetParameters();
    const { data: transitions, isLoading: transitionsLoading, isError: transitionsIsError } = useGetTransitions();
    const { data: actions, isLoading: actionsLoading, isError: actionsIsError } = useGetActions();
    const closeDialog = () => setDialog({ open: false, entity: null, action: null, id: null, });
    const openDialog = (entity: ProcessEntity, action: ProcessAction, id: number | null = null) => setDialog({ open: true, entity, action, id, });

    const loading = parametersLoading || transitionsLoading || actionsLoading;
    const error = parametersIsError || transitionsIsError || actionsIsError;

    if (loading) {
        return (<ProcessSkeleton />);
    }
    if (error) {
        return <FeedbackState variant="error" />;
    }
    if (!parameters || !transitions || !actions) {
        return <FeedbackState variant="empty" />;
    }

    return (
        <div className="grid grid-cols-1 gap-2 2xl:grid-cols-3 flex-1">
            <ProcessCard
                entity="parameter"
                label="Parameter"
                desc="Manage process parameters and their units."
                icon={Gauge}
                color="#15803D"
                count={parameters.length}
                columns={ParameterColumns(setDialog)}
                data={parameters}
                dialog={dialog}
                onClose={closeDialog}
                openDialog={openDialog}
            />
            <ProcessCard
                entity="transition"
                label="Transition"
                desc="Manage step completion condition."
                icon={ArrowLeftRightIcon}
                color="#1D4ED8"
                count={transitions.length}
                columns={TransitionColumns(setDialog)}
                data={transitions}
                dialog={dialog}
                onClose={closeDialog}
                openDialog={openDialog}
            />
            <ProcessCard
                entity="action"
                label="Action"
                desc="Manage process actions and operations."
                icon={Play}
                color="#BE185D"
                count={actions.length}
                columns={ActionColumns(setDialog)}
                data={actions}
                dialog={dialog}
                onClose={closeDialog}
                openDialog={openDialog}
            />
        </div>
    );
}