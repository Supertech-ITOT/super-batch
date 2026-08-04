"use client";
import { Label } from "@/common/components/ui/label";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ShieldCheck, User, Users } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { UpdateUserSchema, UserSchemaLimit, updateUserSchema } from "@/features/manager/user/schemas/user-schema";
import { useGetUsersById, useUpdateUser } from "@/features/manager/user/hooks/use-user";
import { useEffect } from "react";
import { useGetRoles } from "@/features/manager/role/hooks/use-role";
import SearchableSelect from "@/common/components/form/searchable-select";
import { TextInput } from "@/common/components/form/text-input";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import FormDialog from "@/common/components/form/form-dialog";
import { showFormError } from "@/common/lib/show-form-error";
type Props = { open: boolean; onClose: () => void; userId: number };
export default function UpdateUserDialog({ open, onClose, userId }: Props) {
    const { mutateAsync: updateUser, isPending: isCreating } = useUpdateUser();
    const { data: user, isLoading: userIsLoading } = useGetUsersById(userId);
    const { data: roles, isLoading: rolesIsLoading } = useGetRoles();
    const { register, handleSubmit, reset, watch, control, formState: { isSubmitting, isDirty } } = useForm<UpdateUserSchema>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: { name: "", email: "", roleId: 0 }
    });
    const loading = isCreating || isSubmitting || rolesIsLoading || userIsLoading;
    useEffect(() => {
        if (loading || !user)
            return;
        reset({ email: user.email, name: user.name, roleId: user.roleId });
    }, [user, reset])
    const onSubmit = async (formData: UpdateUserSchema) => {
        try {
            const res = await updateUser({ id: userId, data: formData });
            toast.success(res.message ?? "User updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset({ name: "", email: "", roleId: 0 });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<UpdateUserSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Update User"
            description="Update a existing user accounts."
            footer={
                <FormLoadingButton form="update-user-form" type="submit" loading={isSubmitting || isCreating} disabled={!isDirty}>
                    Update
                </FormLoadingButton>
            }
            icon={Users}
        >
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} id="update-user-form">
                <div className="space-y-4">
                    <TextInput
                        label="Name"
                        icon={User}
                        counter
                        maxCharacters={UserSchemaLimit.name.max}
                        placeholder="Jhon Joe"
                        maxLength={UserSchemaLimit.name.max}
                        disabled={loading}
                        value={watch("name")}
                        {...register("name")}
                    />
                    <TextInput
                        label="Email"
                        icon={Mail}
                        counter
                        maxCharacters={UserSchemaLimit.email.max}
                        placeholder="abc@gmail.com"
                        maxLength={UserSchemaLimit.email.max}
                        disabled={loading}
                        value={watch("email")}
                        {...register("email")}
                    />

                    <div className="min-w-0 flex-1 space-y-2">
                        <Label>Role</Label>
                        <Controller
                            control={control}
                            name="roleId"
                            render={({ field }) => (
                                <SearchableSelect
                                    value={field.value}
                                    icon={ShieldCheck}
                                    onChange={field.onChange}
                                    options={roles?.map((a) => ({
                                        value: a.id,
                                        label: a.name,
                                    })) ?? []}
                                    placeholder="Select Role"
                                    searchPlaceholder="Search Roles..."
                                    disabled={loading}
                                />
                            )}
                        />
                    </div>

                </div>
            </form>
        </FormDialog>
    );
}