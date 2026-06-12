"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/lib/show-api-error";
import { useGetTransitionById, useUpdateTransition } from "../../../hooks/use-transitions";
import { transitionSchema, TransitionSchema, TransitionSchemaLimit } from "../../../schemas/transition-schema";
import CharacterProgress from "@/components/form/character-progress";
import { useEffect } from "react";

type Props = { open: boolean; onClose: () => void; transitionId?: number };
export default function UpdateTransitionDialog({ open, onClose, transitionId }: Props) {
    const { mutateAsync: updateTransition, isPending: isUpdating } = useUpdateTransition();
    const { data: transition, isLoading: transitionIsLoading } = useGetTransitionById(transitionId);
    const { register, handleSubmit, reset, watch, setValue, formState: { isSubmitting, isDirty } } = useForm<TransitionSchema>({
        resolver: zodResolver(transitionSchema),
        defaultValues: { name: "" }
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
        reset({ name: "" });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<TransitionSchema>) => {
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
                        <DialogTitle>Update Transition</DialogTitle>
                        <DialogDescription>Update transition information.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Name</Label>
                                <CharacterProgress value={watch("name")} max={TransitionSchemaLimit.name.max} />
                            </div>
                            <Input
                                type="text"
                                disabled={loading}
                                placeholder="Equal"
                                maxLength={TransitionSchemaLimit.name.max}
                                {...register("name")}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Update Transition"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}