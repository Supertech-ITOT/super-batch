"use client";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Label } from "@/common/components/ui/label";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetMessageById, useUpdateMessage } from "../../../hooks/use-messages";
import { messageSchema, MessageSchema, MessageSchemaLimit } from "../../../schemas/message-schema";
import CharacterProgress from "@/common/components/form/character-progress";
import { Textarea } from "@/common/components/ui/textarea";
import { useEffect } from "react";

type Props = { open: boolean; onClose: () => void; messageId?: number };
export default function UpdateMessageDialog({ open, onClose, messageId }: Props) {
    const { mutateAsync: updateMessage, isPending: isUpdating } = useUpdateMessage();
    const { data: message, isLoading: messageIsLoading } = useGetMessageById(messageId);
    const { register, handleSubmit, reset, watch, formState: { isSubmitting, isDirty } } = useForm<MessageSchema>({
        resolver: zodResolver(messageSchema),
        defaultValues: { name: "" }
    });

    useEffect(() => {
        if (!open || !message) return;
        reset({
            name: message.name,
        });
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
        reset({ name: "" });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<MessageSchema>) => {
        const firstError = Object.values(errors)[0];
        if (firstError?.message) {
            toast.error(firstError.message.toString());
        }
    };

    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose() }}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                    <DialogHeader>
                        <DialogTitle>Update Message</DialogTitle>
                        <DialogDescription>Update predefined message.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Message</Label>
                                <CharacterProgress value={watch("name")} max={MessageSchemaLimit.name.max} />
                            </div>
                            <Textarea
                                disabled={loading}
                                placeholder="Brief message overview"
                                className="min-h-30 w-full resize-none break-all overflow-hidden"
                                maxLength={MessageSchemaLimit.name.max}
                                {...register("name")}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Update Message"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}