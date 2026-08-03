"use client"

import { Skeleton } from "@/common/components/ui/skeleton";
import { useGetSetupStatus } from "../hook/use-setup";
import SetupCard from "./setup-card";
import { Plug } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import LoginCard from "../../auth/components/login-card";

export default function SetupView() {
    const { data, isLoading, isError } = useGetSetupStatus();
    if (isLoading) {
        return <Skeleton className="flex w-full max-w-md flex-col rounded-2xl border bg-card/60 h-1/2 shadow-2xl backdrop-blur-xl" />;
    }

    if (isError) {
        return (
            <div className="flex w-full h-1/2 justify-center items-center max-w-md flex-col rounded-2xl border bg-card/60 p-2 sm:p-10 shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col items-center text-center space-y-5">
                    <div className="flex size-21 items-center justify-center rounded-full bg-destructive/10">
                        <Plug className="size-10 text-destructive" />
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold">
                            Unable to Connect
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            SuperBatch couldn't retrieve the setup status.
                            Please verify the backend service is running and try again.
                        </p>
                    </div>

                    <Button onClick={() => window.location.reload()} className="min-w-32">
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }
    const isNew = data?.firstSetup ?? false;

    return isNew ? <SetupCard /> : <LoginCard mode="login" />;
}