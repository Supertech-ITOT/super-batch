"use client";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import CharacterProgress from "@/common/components/form/character-progress";
import { UpdateUserSchema, UserSchemaLimit, updateUserSchema } from "@/features/manager/schemas/user-schema";
import { useGetUsersById, useUpdateUser } from "@/features/manager/hooks/use-user";
import { useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { useGetRoles } from "@/features/manager/hooks/use-role";
type Props = { open: boolean; onClose: () => void; userId: number };
export default function UpdateUserDialog({ open, onClose, userId }: Props) {
    const { mutateAsync: updateUser, isPending: isCreating } = useUpdateUser();
    const { data: user, isLoading: userIsLoading } = useGetUsersById(userId);
    const { data: roles, isLoading: rolesIsLoading } = useGetRoles();
    const { register, handleSubmit, reset, watch, control, formState: { isSubmitting, isDirty } } = useForm<UpdateUserSchema>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: { name: "", email: "", roleId: "" }
    });
    const loading = isCreating || isSubmitting || rolesIsLoading || userIsLoading;
    useEffect(() => {
        if (loading || !user)
            return;
        reset({ email: user.email, name: user.name, roleId: String(user.roleId) });
    }, [user, reset])
    const onSubmit = async (formData: UpdateUserSchema) => {
        try {
            const res = await updateUser({
                id: userId, data: {
                    name: formData.name,
                    email: formData.email,
                    roleId: Number(formData.roleId),

                }
            });
            toast.success(res.message ?? "User updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset({ name: "", email: "", roleId: "" });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<UpdateUserSchema>) => {
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
                        <DialogTitle>Update User</DialogTitle>
                        <DialogDescription>Update a new user account.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Name</Label>
                                <CharacterProgress value={watch("name")} max={UserSchemaLimit.name.max} />
                            </div>
                            <Input
                                type="text"
                                disabled={loading}
                                placeholder="Jhon"
                                maxLength={UserSchemaLimit.name.max}
                                {...register("name")}
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Email</Label>
                                <CharacterProgress value={watch("email")} max={UserSchemaLimit.email.max} />
                            </div>
                            <Input
                                type="email"
                                disabled={loading}
                                placeholder="abc@gmail.com"
                                maxLength={UserSchemaLimit.email.max}
                                {...register("email")}
                            />
                        </div>

                        <div className="relative space-y-2">
                            <Label>Select Role Type</Label>
                            <Controller
                                control={control}
                                name="roleId"
                                render={({ field }) => (
                                    <Select
                                        disabled={loading}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Role Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {roles?.map((e) => (
                                                    <SelectItem key={e.id} value={String(e.id)}>{e.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Update User"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}