"use client";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader, Lock } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import CharacterProgress from "@/common/components/form/character-progress";
import { userSchema, UserSchema, UserSchemaLimit } from "@/features/manager/schemas/user-schema";
import { useCreateUser, useGetUsersById } from "@/features/manager/hooks/use-user";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { useGetRoles } from "@/features/manager/hooks/use-role";
type Props = { open: boolean; onClose: () => void; };
export default function CreateUserDialog({ open, onClose }: Props) {
    const { mutateAsync: createUser, isPending: isCreating } = useCreateUser();
    const { data: roles, isLoading: rolesIsLoading } = useGetRoles();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit, reset, watch, control, formState: { isSubmitting, isDirty } } = useForm<UserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: { name: "", email: "", confirmPassword: "", password: "", roleId: "" }
    });
    const loading = isCreating || isSubmitting || rolesIsLoading;
    const onSubmit = async (formData: UserSchema) => {
        try {
            const res = await createUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                roleId: Number(formData.roleId),

            });
            toast.success(res.message ?? "User created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset({ name: "", email: "", confirmPassword: "", password: "", roleId: "" });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<UserSchema>) => {
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
                        <DialogTitle>Create User</DialogTitle>
                        <DialogDescription>Create a new user account.</DialogDescription>
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
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Password</Label>
                                <CharacterProgress
                                    value={watch("password")}
                                    max={UserSchemaLimit.password.max}
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4" />
                                <Input
                                    disabled={loading}
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    maxLength={UserSchemaLimit.password.max}
                                    {...register("password")}
                                    className="pl-8 pr-10 h-12"
                                />

                                <Button
                                    variant="ghost"
                                    type="button"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Confirm Password</Label>
                                <CharacterProgress
                                    value={watch("confirmPassword")}
                                    max={UserSchemaLimit.password.max}
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 " />
                                <Input
                                    disabled={loading}
                                    placeholder="Confirm Password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...register("confirmPassword")}
                                    className="pl-8 pr-10 h-12"
                                />

                                <Button
                                    variant="ghost"
                                    type="button"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
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
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Create User"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}