"use client";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Feather, MessageSquareQuote } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetMessageById, useUpdateMessage } from "../hooks/use-messages";
import { messageDefaultValues, messageSchema, MessageSchema, MessageSchemaLimit } from "../schemas/message-schema";
import { useEffect } from "react";
import { TextAreaInput } from "@/common/components/form/text-area-input";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import FormDialog from "@/common/components/form/form-dialog";
import { showFormError } from "@/common/lib/show-form-error";

type Props = { open: boolean; onClose: () => void; messageId?: number };
export default function UpdateMessageDialog({ open, onClose, messageId }: Props) {
    const { mutateAsync: updateMessage, isPending: isUpdating } = useUpdateMessage();
    const { data: message, isLoading: messageIsLoading } = useGetMessageById(messageId);
    const { register, handleSubmit, reset, watch, formState: { isSubmitting, isDirty } } = useForm<MessageSchema>({
        resolver: zodResolver(messageSchema),
        defaultValues: messageDefaultValues,
    });

    useEffect(() => {
        if (!open || !message) return;
        reset({ name: message.name });
    }, [open, message, reset]);

    const loading = isUpdating || isSubmitting || messageIsLoading;
    const onSubmit = async (formData: MessageSchema) => {
        try {
            const res = await updateMessage({
                id: messageId!, data: formData
            });
            toast.success(res.message ?? "Message updated successfully.");
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
            title="Update Message"
            description="Update a new predefined messages."
            footer={
                <FormLoadingButton form="update-message-form" type="submit" loading={loading} disabled={!isDirty}>
                    Update
                </FormLoadingButton>
            }
            icon={MessageSquareQuote}
        >
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} id="update-message-form">
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