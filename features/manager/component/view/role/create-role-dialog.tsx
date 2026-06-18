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
import CharacterProgress from "@/common/components/form/character-progress";
import { roleSchema, RoleSchema, RoleSchemaLimit } from "@/features/manager/schemas/role-schema";
import { useCreateRole } from "@/features/manager/hooks/use-role";
import { Textarea } from "@/common/components/ui/textarea";

type Props = { open: boolean; onClose: () => void; };
export default function CreateRoleDialog({ open, onClose }: Props) {
    const { mutateAsync: createRole, isPending: isCreating } = useCreateRole();
    const { register, handleSubmit, reset, watch, formState: { isSubmitting, isDirty } } = useForm<RoleSchema>({
        resolver: zodResolver(roleSchema),
        defaultValues: { name: "", description: "" }
    });
    const loading = isCreating || isSubmitting;

    const onSubmit = async (formData: RoleSchema) => {
        try {
            const res = await createRole({

                name: formData.name,
                description: formData.description

            });
            toast.success(res.message ?? "Role created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset({ name: "", description: "" });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<RoleSchema>) => {
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
                        <DialogTitle>Create Role</DialogTitle>
                        <DialogDescription> Create a new role and assign permissions.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Name</Label>
                                <CharacterProgress value={watch("name")} max={RoleSchemaLimit.name.max} />
                            </div>
                            <Input
                                type="text"
                                disabled={loading}
                                placeholder="Operator"
                                maxLength={RoleSchemaLimit.name.max}
                                {...register("name")}
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Description</Label>
                                <CharacterProgress value={watch("description")} max={RoleSchemaLimit.description.max} />
                            </div>
                            <Textarea
                                disabled={loading}
                                placeholder="Brief role overview"
                                className="min-h-30 w-full resize-none break-all overflow-hidden"
                                maxLength={RoleSchemaLimit.description.max}
                                {...register("description")}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Create Role"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}