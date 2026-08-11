"use client";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Play } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useCreateAction } from "../hooks/use-actions";
import { actionDefaultValues, actionSchema, ActionSchema, ActionSchemaLimit } from "../schemas/action-schema";
import FormDialog from "@/common/components/form/form-dialog";
import { TextInput } from "@/common/components/form/text-input";
import { showFormError } from "@/common/lib/show-form-error";
type Props = { open: boolean; onClose: () => void; };
export default function CreateActionDialog({ open, onClose }: Props) {
    const { mutateAsync: createAction, isPending: isCreating } = useCreateAction();
    const { register, handleSubmit, reset, watch, formState: { isSubmitting, isDirty } } = useForm<ActionSchema>({
        resolver: zodResolver(actionSchema),
        defaultValues: actionDefaultValues,
    });
    const loading = isCreating || isSubmitting;
    const onSubmit = async (formData: ActionSchema) => {
        try {
            const res = await createAction(formData);
            toast.success(res.message ?? "Action created successfully.");
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
            title="Create Action"
            description="Create a Action entity."
            icon={Play}
            submitDisabled={!isDirty}
            submitLabel="Create"
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