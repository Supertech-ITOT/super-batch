"use client";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useResetPassword } from "@/features/manager/user/hooks/use-user";
import { resetPasswordDefaultValues, resetPasswordSchema, ResetPasswordSchema } from "../schemas/reset-password-schema";
import { PasswordInput } from "@/common/components/form/password-input";
import { showFormError } from "@/common/lib/show-form-error";
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
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose() }}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                    <DialogHeader>
                        <DialogTitle>Reset Password</DialogTitle>
                        <DialogDescription>Create a new temporary user password.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <PasswordInput
                            placeholder="New password"
                            disabled={loading}
                            value={watch("password")}
                            {...register("password")}
                        />
                        <PasswordInput
                            placeholder="Confirm password"
                            disabled={loading}
                            value={watch("confirmPassword")}
                            {...register("confirmPassword")}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Reset"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}