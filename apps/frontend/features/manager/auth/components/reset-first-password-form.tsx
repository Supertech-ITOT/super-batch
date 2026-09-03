"use client";

import { Button } from "../../../../common/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showApiError } from "@/common/lib/show-api-error";
import { PasswordInput } from "@/common/components/form/password-input";
import { showFormError } from "@/common/lib/show-form-error";
import { useResetFirstPassword } from "../../user/hooks/use-user";
import {
  resetFirstPasswordDefaultValues,
  resetFirstPasswordSchema,
  ResetFirstPasswordSchema,
} from "../schemas/reset-first-password-schema";

export default function ResetFirstPasswordForm() {
  const { mutateAsync, isPending } = useResetFirstPassword();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm<ResetFirstPasswordSchema>({
    resolver: zodResolver(resetFirstPasswordSchema),
    defaultValues: resetFirstPasswordDefaultValues,
  });
  const loading = isSubmitting || isPending;
  const onSubmit = async (data: ResetFirstPasswordSchema) => {
    try {
      const res = await mutateAsync(data);
      toast.success(res.message ?? "Login Successfully");
      window.location.href = "/";
    } catch (error) {
      showApiError(error);
    }
  };
  const onInvalid = (errors: FieldErrors<ResetFirstPasswordSchema>) => {
    toast.error(showFormError(errors));
  };
  return (
    <>
      <div>
        <h1 className="flex justify-center items-center font-bold mt-8">
          Create New Password
        </h1>
        <span className="text-primary flex items-center leading-3.5 text-sm justify-center font-semibold text-center">
          Your administrator has assigned you a temporary password. Please
          create a new password before continuing.
        </span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="flex flex-col gap-2 mt-6"
      >
        <PasswordInput
          placeholder="New Password"
          disabled={loading}
          value={watch("password")}
          {...register("password")}
        />
        <PasswordInput
          placeholder="Confirm Password"
          disabled={loading}
          value={watch("confirmPassword")}
          {...register("confirmPassword")}
        />
        <Button
          disabled={loading || !isDirty}
          type="submit"
          className="text-white"
        >
          Update Password
        </Button>
      </form>
    </>
  );
}
