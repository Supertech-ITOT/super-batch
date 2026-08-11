"use client";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Feather, MessageSquareQuote } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useCreateMessage } from "../hooks/use-messages";
import { messageDefaultValues, messageSchema, MessageSchema, MessageSchemaLimit } from "../schemas/message-schema";
import FormDialog from "@/common/components/form/form-dialog";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import { TextAreaInput } from "@/common/components/form/text-area-input";
import { showFormError } from "@/common/lib/show-form-error";

type Props = { open: boolean; onClose: () => void; };
export default function CreateMessageDialog({ open, onClose }: Props) {
    const { mutateAsync: createMessage, isPending: isCreating } = useCreateMessage();
    const { register, handleSubmit, reset, watch, formState: { isSubmitting, isDirty } } = useForm<MessageSchema>({
        resolver: zodResolver(messageSchema),
        defaultValues: messageDefaultValues,
    });
    const loading = isCreating || isSubmitting;
    const onSubmit = async (formData: MessageSchema) => {
        try {
            const res = await createMessage(formData);
            toast.success(res.message ?? "Message created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset(messageDefaultValues);
        onClose();
    };
    const onInvalid = (errors: FieldErrors<MessageSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Create Message"
            description="Create a new predefined messages."
            footer={
                <FormLoadingButton form="create-message-form" type="submit" loading={loading} disabled={!isDirty}>
                    Create
                </FormLoadingButton>
            }
            icon={MessageSquareQuote}
        >
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} id="create-message-form">
                <TextAreaInput
                    label="Message"
                    icon={Feather}
                    placeholder="Brief message overview"
                    counter
                    maxCharacters={MessageSchemaLimit.name.max}
                    maxLength={MessageSchemaLimit.name.max}
                    value={watch("name")}
                    disabled={loading}
                    {...register("name")}
                />
            </form>
        </FormDialog>
    );
}