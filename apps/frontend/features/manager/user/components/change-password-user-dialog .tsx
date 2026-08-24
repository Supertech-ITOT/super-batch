"use client";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useChangePassword } from "@/features/manager/user/hooks/use-user";
import { changePasswordDefaultValues, changePasswordSchema, ChangePasswordSchema } from "../schemas/change-password-schema";
import { PasswordInput } from "@/common/components/form/password-input";
import { showFormError } from "@/common/lib/show-form-error";
import FormDialog from "@/common/components/form/form-dialog";
type Props = { open: boolean; onClose: () => void; };
export default function ChangePasswordUserDialog({ open, onClose }: Props) {
    const { mutateAsync: changePassword, isPending: isReseting } = useChangePassword();
    const { register, handleSubmit, reset, watch, formState: { isSubmitting, isDirty } } = useForm<ChangePasswordSchema>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: changePasswordDefaultValues
    });
    const loading = isReseting || isSubmitting;
    const onSubmit = async (formData: ChangePasswordSchema) => {
        try {
            const res = await changePassword(formData);
            toast.success(res.message ?? "Password changed successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset(changePasswordDefaultValues);
        onClose();
    };
    const onInvalid = (errors: FieldErrors<ChangePasswordSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Change Password"
            description="Update your account password."
            submitDisabled={!isDirty}
            submitLabel="Change"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            icon={KeyRound}
        >
            <div className="space-y-2">
                <PasswordInput
                    label="Current Password"
                    placeholder="Current Password"
                    disabled={loading}
                    value={watch("currentPassword")}
                    {...register("currentPassword")}
                />
                <PasswordInput
                    label="New Password"
                    placeholder="New Password"
                    disabled={loading}
                    value={watch("newPassword")}
                    {...register("newPassword")}
                />
                <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    disabled={loading}
                    value={watch("confirmPassword")}
                    {...register("confirmPassword")}
                />
            </div>
        </FormDialog>
    );
}