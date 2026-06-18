"use client";

import { Eye, EyeOff, Lock, ShieldCheck, User } from "lucide-react";
import { Input } from "../../../../common/components/ui/input";
import { Button } from "../../../../common/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { showApiError } from "@/common/lib/show-api-error";
import { useLogin } from "../hooks/use-auth";
import { loginSchema, LoginSchema } from "../schemas/login-schema";

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);
    const { mutateAsync, isPending } = useLogin();
    const router = useRouter();

    const { handleSubmit, register, formState: { errors, isDirty, isSubmitting } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" }
    });
    const loading = isSubmitting || isPending;
    const onSubmit = async (data: LoginSchema) => {
        try {
            const res = await mutateAsync(data);
            toast.success(res.message ?? "Login Successfully");
            router.replace("/PlantModel");
        } catch (error) {
            showApiError(error);
        }
    }
    return (
        <div className="flex w-full max-w-md flex-col rounded-2xl border bg-card/60 p-10 shadow-2xl backdrop-blur-xl">
            {/* Logo Section */}
            <div className="flex items-center justify-center gap-4">
                <Image
                    src="/icon.png"
                    alt="SuperBatch Icon"
                    priority
                    width={102}
                    height={102}
                    draggable={false}
                    className="object-contain"
                />
            </div>
            {/* Content Section */}
            <div>
                <h1 className="flex justify-center items-center font-bold mt-8">
                    Welcome Back
                </h1>
                <span className="text-muted-foreground flex items-center justify-center font-semibold">
                    Sign in to continue to SuperBatch
                </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-6">
                <div className="relative">
                    <User className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2" />
                    <Input
                        disabled={loading}
                        placeholder="abc@gmail.com"
                        type="email"
                        {...register("email")}
                        className="pl-8 bg-background h-12"
                    />
                </div>
                <div className="relative">
                    <Lock className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2" />
                    <Input
                        disabled={loading}
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className="pl-8 bg-background h-12"
                    />
                    <Button
                        variant={"ghost"}
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? (<EyeOff className="w-4 h-4 " />) : (<Eye className="w-4 h-4" />)}
                    </Button>
                </div>

                <Button className="text-primary place-self-end"
                    disabled={loading}
                    variant="link"
                    type="button"
                    onClick={() => toast.warning("Please contact an administrator")}
                >
                    Forgot Password?
                </Button>
                <Button disabled={loading || !isDirty} type="submit" className="h-12! text-white">
                    Sign In
                </Button>

            </form>
            <div className="mt-10 flex items-center gap-3 rounded-2xl ">

                <ShieldCheck className="text-primary" />

                <div>
                    <p className="font-semibold">
                        Secured Connection
                    </p>

                    <p className="text-sm text-muted-foreground">
                        All data is encrypted and protected
                    </p>
                </div>
            </div>
        </div>
    )
}