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
import { useCreateAction } from "../../../hooks/use-actions";
import { actionSchema, ActionSchema, ActionSchemaLimit } from "../../../schemas/action-schema";
import CharacterProgress from "@/components/form/character-progress";
import StatusToggle from "@/components/form/status-toggle";
import { StatusConfig } from "@/features/common/types/status.type";
type Props = { open: boolean; onClose: () => void; };
export default function CreateActionDialog({ open, onClose }: Props) {
    const { mutateAsync: createAction, isPending: isCreating } = useCreateAction();
    const { register, handleSubmit, reset, watch, setValue, formState: { isSubmitting, isDirty } } = useForm<ActionSchema>({
        resolver: zodResolver(actionSchema),
        defaultValues: { name: "", active: true, code: "" }
    });
    const loading = isCreating || isSubmitting;
    const onSubmit = async (formData: ActionSchema) => {
        try {
            const res = await createAction({
                name: formData.name,
                active: formData.active,
                code: formData.code,
            });
            toast.success(res.message ?? "Action created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset({ name: "", active: true, code: "" });
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
                                placeholder="Equal"
                                maxLength={ActionSchemaLimit.name.max}
                                {...register("name")}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="space-y-2 relative flex-1">
                                <div className="flex items-center justify-between">
                                    <Label>Action Code</Label>
                                    <CharacterProgress value={watch("code")} max={ActionSchemaLimit.code.max} />
                                </div>
                                <Input
                                    type="text"
                                    disabled={loading}
                                    placeholder="EQ"
                                    maxLength={ActionSchemaLimit.code.max}
                                    {...register("code")}
                                />
                            </div>
                        </div>
                        <StatusToggle
                            label="Status"
                            value={watch("active") ? "ACTIVE" : "INACTIVE"}
                            options={StatusConfig.filter(
                                (s) => s.value === "ACTIVE" || s.value === "INACTIVE"
                            )} onChange={(value) => setValue("active", value === "ACTIVE")}
                        />
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