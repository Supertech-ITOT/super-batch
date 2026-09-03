"use client";

import { User } from "lucide-react";
import { Button } from "../../../../common/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showApiError } from "@/common/lib/show-api-error";
import { useLogin } from "../hooks/use-auth";
import {
  loginDefaultValues,
  loginSchema,
  LoginSchema,
} from "../schemas/login-schema";
import { TextInput } from "@/common/components/form/text-input";
import { PasswordInput } from "@/common/components/form/password-input";
import { showFormError } from "@/common/lib/show-form-error";

export default function LoginForm() {
  const { mutateAsync, isPending } = useLogin();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });
  const loading = isSubmitting || isPending;
  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await mutateAsync(data);
      toast.success(res.message ?? "Login Successfully");
      if (res.data.passwordChangeRequired) {
        router.replace("/reset-first-password");
        return;
      }
      window.location.href = "/";
    } catch (error) {
      showApiError(error);
    }
  };
  const onInvalid = (errors: FieldErrors<LoginSchema>) => {
    toast.error(showFormError(errors));
  };
  return (
    <>
      <div>
        <h1 className="flex justify-center items-center font-bold mt-8">
          Welcome Back
        </h1>
        <span className="text-primary flex items-center leading-3.5 text-sm justify-center font-semibold text-center">
          Login to continue to SuperBatch
        </span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="flex flex-col gap-2 mt-6"
      >
        <TextInput
          icon={User}
          disabled={loading}
          placeholder="Email"
          type="email"
          value={watch("email")}
          {...register("email")}
        />

        <PasswordInput
          placeholder="Password"
          disabled={loading}
          value={watch("password")}
          {...register("password")}
        />

        <Button
          className="text-primary place-self-end"
          disabled={loading}
          variant="link"
          type="button"
          onClick={() => toast.warning("Please contact an administrator")}
        >
          Forgot Password?
        </Button>
        <Button
          disabled={loading || !isDirty}
          type="submit"
          className="text-white"
        >
          Sign In
        </Button>
      </form>
    </>
  );
}
