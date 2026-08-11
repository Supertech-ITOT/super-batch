"use client";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Users, } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useResetPassword } from "@/features/manager/user/hooks/use-user";
import { resetPasswordDefaultValues, resetPasswordSchema, ResetPasswordSchema } from "../schemas/reset-password-schema";
import { PasswordInput } from "@/common/components/form/password-input";
import { showFormError } from "@/common/lib/show-form-error";
import FormDialog from "@/common/components/form/form-dialog";
type Props = { open: boolean; onClose: () => void; userId: number };
export default function ResetPasswordUserDialog({ open, onClose, userId }: Props) {
    const { mutateAsync: resetPassword, isPending: isReseting } = useResetPassword();
    const { register, handleSubmit, reset, watch, formState: { isSubmitting, isDirty } } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: resetPasswordDefaultValues
    });
    const loading = isReseting || isSubmitting;
    const onSubmit = async (formData: ResetPasswordSchema) => {
        try {
            const res = await resetPassword({
                id: userId,
                data: { password: formData.password }
            });
            toast.success(res.message ?? "Password reset successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset(resetPasswordDefaultValues);
        onClose();
    };
    const onInvalid = (errors: FieldErrors<ResetPasswordSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Reset Password"
            description="Create a new user password."
            submitDisabled={!isDirty}
            submitLabel="Reset"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            icon={Users}
        >
            <div className="space-y-2">
                <PasswordInput
                    label="New Password"
                    placeholder="New Password"
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
            </div>
        </FormDialog>
    );
}