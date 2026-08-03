"use client";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import LoginForm from "./login-form";
import ResetFirstPasswordForm from "./reset-first-password-form";


type AuthMode = "login" | "reset-password";

interface LoginCardProps {
    mode: AuthMode;
}

export default function LoginCard({ mode }: LoginCardProps) {

    return (
        <div className="flex w-full max-w-md flex-col rounded-2xl border bg-card/60 p-2 sm:p-10 shadow-2xl backdrop-blur-xl">

            <div className="flex justify-center">
                <Image
                    src="/icon.png"
                    alt="SuperBatch"
                    width={102}
                    height={102}
                    priority
                />
            </div>

            {mode === "login" ? (
                <LoginForm />
            ) : (
                <ResetFirstPasswordForm />
            )}

            <div className="mt-4 flex items-center gap-2">
                <ShieldCheck className="text-primary size-10 shrink-0" />

                <div>
                    <p className="font-semibold">
                        Secured Connection
                    </p>

                    <p className="text-xs text-muted-foreground">
                        All data is encrypted and protected.
                    </p>
                </div>
            </div>

        </div>
    );
}