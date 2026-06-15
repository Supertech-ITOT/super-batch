"use client";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useCreateAction } from "../../../hooks/use-actions";
import { actionSchema, ActionSchema, ActionSchemaLimit } from "../../../schemas/action-schema";
import CharacterProgress from "@/common/components/form/character-progress";
type Props = { open: boolean; onClose: () => void; };
export default function CreateActionDialog({ open, onClose }: Props) {
    const { mutateAsync: createAction, isPending: isCreating } = useCreateAction();
    const { register, handleSubmit, reset, watch, formState: { isSubmitting, isDirty } } = useForm<ActionSchema>({
        resolver: zodResolver(actionSchema),
        defaultValues: { name: "" }
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
        reset({ name: "" });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<ActionSchema>) => {
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
                        <DialogTitle>Create Action</DialogTitle>
                        <DialogDescription>Create a new action entity.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Name</Label>
                                <CharacterProgress value={watch("name")} max={ActionSchemaLimit.name.max} />
                            </div>
                            <Input
                                type="text"
                                disabled={loading}
                                placeholder="Charge"
                                maxLength={ActionSchemaLimit.name.max}
                                {...register("name")}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Create Action"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}