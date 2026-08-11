"use client";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ShieldCheck, User, Users } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { userDefaultValues, userSchema, UserSchema, UserSchemaLimit } from "@/features/manager/user/schemas/user-schema";
import { useCreateUser } from "@/features/manager/user/hooks/use-user";
import { useGetRoles } from "@/features/manager/role/hooks/use-role";
import FormDialog from "@/common/components/form/form-dialog";
import { TextInput } from "@/common/components/form/text-input";
import { showFormError } from "@/common/lib/show-form-error";
import { PasswordInput } from "@/common/components/form/password-input";
import SearchableSelect from "@/common/components/form/searchable-select";
type Props = { open: boolean; onClose: () => void; };
export default function CreateUserDialog({ open, onClose }: Props) {
    const { mutateAsync: createUser, isPending: isCreating } = useCreateUser();
    const { data: roles, isLoading: rolesIsLoading } = useGetRoles();
    const { register, handleSubmit, reset, watch, control, formState: { isSubmitting, isDirty } } = useForm<UserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: userDefaultValues
    });
    const loading = rolesIsLoading || isCreating || isSubmitting;
    const onSubmit = async (formData: UserSchema) => {
        try {
            const res = await createUser(formData);
            toast.success(res.message ?? "User created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset(userDefaultValues);
        onClose();
    };
    const onInvalid = (errors: FieldErrors<UserSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Create User"
            description="Create a new user accounts."
            submitDisabled={!isDirty}
            submitLabel="Create"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            icon={Users}
        >
            <div className="space-y-2">
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
                <PasswordInput
                    label="Password"
                    placeholder="Password"
                    disabled={loading}
                    value={watch("password")}
                    {...register("password")}
                />
                <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    disabled={loading}
                    value={watch("confirmPassword")}
                    {...register("confirmPassword")}
                />
                <Controller
                    control={control}
                    name="roleId"
                    render={({ field }) => (
                        <SearchableSelect
                            label="Role"
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
        </FormDialog>
    );
}