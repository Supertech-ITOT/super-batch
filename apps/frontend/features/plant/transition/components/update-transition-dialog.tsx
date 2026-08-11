"use client";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetTransitionById, useUpdateTransition } from "../hooks/use-transitions";
import { transitionDefaultValues, transitionSchema, TransitionSchema, TransitionSchemaLimit } from "../schemas/transition-schema";
import { useEffect } from "react";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import FormDialog from "@/common/components/form/form-dialog";
import { TextInput } from "@/common/components/form/text-input";
import { showFormError } from "@/common/lib/show-form-error";

type Props = { open: boolean; onClose: () => void; transitionId?: number };
export default function UpdateTransitionDialog({ open, onClose, transitionId }: Props) {
    const { mutateAsync: updateTransition, isPending: isUpdating } = useUpdateTransition();
    const { data: transition, isLoading: transitionIsLoading } = useGetTransitionById(transitionId);
    const { register, handleSubmit, reset, watch, formState: { isSubmitting, isDirty } } = useForm<TransitionSchema>({
        resolver: zodResolver(transitionSchema),
        defaultValues: transitionDefaultValues
    });

    useEffect(() => {
        if (!open || !transition) return;
        reset({ name: transition.name });
    }, [open, transition, reset]);

    const loading = isUpdating || isSubmitting || transitionIsLoading;
    const onSubmit = async (formData: TransitionSchema) => {
        try {
            const res = await updateTransition({
                id: transitionId!, data: formData
            });
            toast.success(res.message ?? "Transition updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset(transitionDefaultValues);
        onClose();
    };
    const onInvalid = (errors: FieldErrors<TransitionSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Update Transition"
            description="Update a Transition entity."
            submitDisabled={!isDirty}
            submitLabel="Update"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            icon={ArrowRightLeft}
        >
            <TextInput
                label="Name"
                counter
                maxCharacters={TransitionSchemaLimit.name.max}
                icon={ArrowRightLeft}
                placeholder="Transition Name"
                maxLength={TransitionSchemaLimit.name.max}
                disabled={loading}
                value={watch("name")}
                {...register("name")}
            />
        </FormDialog>
    );
}