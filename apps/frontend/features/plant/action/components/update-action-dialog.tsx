"use client";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Play } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetActionById, useUpdateAction } from "../hooks/use-actions";
import { actionDefaultValues, actionSchema, ActionSchema, ActionSchemaLimit } from "../schemas/action-schema";
import { useEffect } from "react";
import FormDialog from "@/common/components/form/form-dialog";
import { TextInput } from "@/common/components/form/text-input";
import { showFormError } from "@/common/lib/show-form-error";

type Props = { open: boolean; onClose: () => void; actionId?: number };
export default function UpdateActionDialog({ open, onClose, actionId }: Props) {
    const { mutateAsync: updateAction, isPending: isUpdating } = useUpdateAction();
    const { data: action, isLoading: actionIsLoading } = useGetActionById(actionId);
    const { register, handleSubmit, reset, watch, formState: { isSubmitting, isDirty } } = useForm<ActionSchema>({
        resolver: zodResolver(actionSchema),
        defaultValues: actionDefaultValues,
    });

    useEffect(() => {
        if (!open || !action) return;
        reset({ name: action.name });
    }, [open, action, reset]);

    const loading = isUpdating || isSubmitting || actionIsLoading;
    const onSubmit = async (formData: ActionSchema) => {
        try {
            const res = await updateAction({
                id: Number(actionId!), data: formData
            });
            toast.success(res.message ?? "Action updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset(actionDefaultValues);
        onClose();
    };
    const onInvalid = (errors: FieldErrors<ActionSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Update Action"
            description="Update a Action entity."
            icon={Play}
            submitDisabled={!isDirty}
            submitLabel="Update"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
        >
            <TextInput
                label="Name"
                counter
                maxCharacters={ActionSchemaLimit.name.max}
                icon={Play}
                placeholder="Action Name"
                maxLength={ActionSchemaLimit.name.max}
                disabled={loading}
                value={watch("name")}
                {...register("name")}
            />
        </FormDialog>
    );
}