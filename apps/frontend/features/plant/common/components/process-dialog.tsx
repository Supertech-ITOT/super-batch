import CreateActionDialog from "../../action/components/create-action-dialog";
import DeleteActionDialog from "../../action/components/delete-action-dialog";
import UpdateActionDialog from "../../action/components/update-action-dialog";
import CreateParameterDialog from "../../parameter/components/create-parameter-dialog";
import DeleteParameterDialog from "../../parameter/components/delete-parameter-dialog";
import UpdateParameterDialog from "../../parameter/components/update-parameter-dialog";
import CreateTransitionDialog from "../../transition/components/create-transition-dialog";
import DeleteTransitionDialog from "../../transition/components/delete-transition-dialog";
import UpdateTransitionDialog from "../../transition/components/update-transition-dialog";
import { ProcessDialogState } from "./process-view";

type Prop = {
    dialog: ProcessDialogState;
    onClose: () => void;
};
export default function ProcessDialogs({ dialog, onClose }: Prop) {
    return (
        <>
            {/* Parameter */}
            {dialog.entity === "parameter" &&
                dialog.action === "create" && (
                    <CreateParameterDialog
                        open={dialog.open}
                        onClose={onClose}
                    />
                )}

            {dialog.entity === "parameter" &&
                dialog.action === "edit" &&
                dialog.id !== null && (
                    <UpdateParameterDialog
                        open={dialog.open}
                        parameterId={dialog.id}
                        onClose={onClose}
                    />
                )}

            {dialog.entity === "parameter" &&
                dialog.action === "delete" &&
                dialog.id !== null && (
                    <DeleteParameterDialog
                        open={dialog.open}
                        parameterId={dialog.id}
                        onClose={onClose}
                    />
                )}

            {/* Transition */}
            {dialog.entity === "transition" &&
                dialog.action === "create" && (
                    <CreateTransitionDialog
                        open={dialog.open}
                        onClose={onClose}
                    />
                )}

            {dialog.entity === "transition" &&
                dialog.action === "edit" &&
                dialog.id !== null && (
                    <UpdateTransitionDialog
                        open={dialog.open}
                        transitionId={dialog.id}
                        onClose={onClose}
                    />
                )}

            {dialog.entity === "transition" &&
                dialog.action === "delete" &&
                dialog.id !== null && (
                    <DeleteTransitionDialog
                        open={dialog.open}
                        transitionId={dialog.id}
                        onClose={onClose}
                    />
                )}

            {/* Action */}
            {dialog.entity === "action" &&
                dialog.action === "create" && (
                    <CreateActionDialog
                        open={dialog.open}
                        onClose={onClose}
                    />
                )}

            {dialog.entity === "action" &&
                dialog.action === "edit" &&
                dialog.id !== null && (
                    <UpdateActionDialog
                        open={dialog.open}
                        actionId={dialog.id}
                        onClose={onClose}
                    />
                )}

            {dialog.entity === "action" &&
                dialog.action === "delete" &&
                dialog.id !== null && (
                    <DeleteActionDialog
                        open={dialog.open}
                        actionId={dialog.id}
                        onClose={onClose}
                    />
                )}
        </>

    );
}