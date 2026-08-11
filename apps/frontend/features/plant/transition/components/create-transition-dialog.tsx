"use client";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useCreateTransition } from "../hooks/use-transitions";
import { transitionDefaultValues, transitionSchema, TransitionSchema, TransitionSchemaLimit } from "../schemas/transition-schema";
import FormDialog from "@/common/components/form/form-dialog";
import { TextInput } from "@/common/components/form/text-input";
import { showFormError } from "@/common/lib/show-form-error";
type Props = { open: boolean; onClose: () => void; };
export default function CreateTransitionDialog({ open, onClose }: Props) {
    const { mutateAsync: createTransition, isPending: isCreating } = useCreateTransition();
    const { register, handleSubmit, reset, watch, formState: { isSubmitting, isDirty } } = useForm<TransitionSchema>({
        resolver: zodResolver(transitionSchema),
        defaultValues: transitionDefaultValues,
    });
    const loading = isCreating || isSubmitting;
    const onSubmit = async (formData: TransitionSchema) => {
        try {
            const res = await createTransition(formData);
            toast.success(res.message ?? "Transition created successfully.");
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
            title="Create Transition"
            description="Create a Transition entity."
            icon={ArrowRightLeft}
            submitDisabled={!isDirty}
            submitLabel="Create"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
        >
            <TextInput
                label="Name"
                counter
                maxCharacters={TransitionSchemaLimit.name.max}
                icon={ArrowRightLeft}
                placeholder="Action Name"
                maxLength={TransitionSchemaLimit.name.max}
                disabled={loading}
                value={watch("name")}
                {...register("name")}
            />
        </FormDialog>
    );
}