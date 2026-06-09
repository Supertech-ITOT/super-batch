import CreateActionDialog from "../menu-dialog/action/create-action-dialog";
import DeleteActionDialog from "../menu-dialog/action/delete-action-dialog";
import UpdateActionDialog from "../menu-dialog/action/update-action-dialog";
import CreateParameterDialog from "../menu-dialog/parameter/create-parameter-dialog";
import DeleteParameterDialog from "../menu-dialog/parameter/delete-parameter-dialog";
import UpdateParameterDialog from "../menu-dialog/parameter/update-parameter-dialog";
import CreateTransitionDialog from "../menu-dialog/transition/create-transition-dialog";
import DeleteTransitionDialog from "../menu-dialog/transition/delete-transition-dialog";
import UpdateTransitionDialog from "../menu-dialog/transition/update-transition-dialog";
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