"use client";

import { Eye, EyeOff, Lock, ShieldCheck, User } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        router.replace("PlantModel");
    }
    return (
        <div className="flex w-full max-w-md flex-col rounded-2xl border bg-card/60 p-10 shadow-2xl backdrop-blur-xl">
            {/* Logo Section */}
            <div className="flex items-center justify-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-lg backdrop-blur-md">
                    <h1 className="text-6xl font-extrabold tracking-tight text-primary">
                        S
                    </h1>
                </div>
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
            <form onSubmit={onSubmit} className="flex flex-col gap-5 mt-6">
                <div className="relative">
                    <User className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2" />
                    <Input
                        placeholder="Username"
                        type="text"
                        className="pl-8 bg-background h-12"
                    />
                </div>
                <div className="relative">
                    <Lock className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2" />
                    <Input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        className="pl-8 bg-background h-12"
                    />
                    <Button
                        variant={"ghost"}
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >

                        {showPassword ? (
                            <EyeOff className="w-4 h-4 " />
                        ) : (<Eye className="w-4 h-4" />)}
                    </Button>
                </div>
                <Button className="text-primary place-self-end"
                    variant={"ghost"}
                    type="button"
                    onClick={() => toast.warning("Please contact an administrator")}
                >
                    Forgot Password?
                </Button>
                <Button type="submit" className="h-12!">
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