"use client";

import { Building, Mail, User, ArrowLeft, } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "@/common/components/form/text-input";
import { PasswordInput } from "@/common/components/form/password-input";
import { setupDefaultValues, setupSchema, SetupSchema, } from "../schemas/setup-schema";
import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";
import { useSetup } from "../hook/use-setup";

interface TrialSetupFormProps {
    onBack: () => void;
}

export default function TrialSetupForm({ onBack, }: TrialSetupFormProps) {
    const { mutateAsync, isPending } = useSetup();
    const router = useRouter();
    const { handleSubmit, register, formState: { isDirty, isSubmitting, } } = useForm<SetupSchema>({
        resolver: zodResolver(setupSchema),
        defaultValues: setupDefaultValues,
    });

    const loading = isSubmitting || isPending;
    const onSubmit = async (data: SetupSchema) => {
        try {
            const formData = new FormData();
            formData.append("companyName", data.companyName);
            formData.append("activationType", "ONLINE");
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("isTrial", "true");
            formData.append("name", data.name);
            const res = await mutateAsync(formData);
            toast.success(res.message ?? "Setup completed successfully.");
            router.refresh();
        } catch (error) {
            showApiError(error);
        }
    };

    const onInvalid = (errors: FieldErrors<SetupSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className="flex flex-col gap-2"
        >
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-fit p-0!"
                onClick={onBack}
                disabled={loading}
            >
                <ArrowLeft className="mr-2 size-4" />
                Back
            </Button>

            <div className="space-y-1">
                <h2 className="font-semibold">
                    Start Free Trial
                </h2>

                <p className="text-sm text-muted-foreground">
                    Create your organization and administrator account.
                </p>
            </div>

            <TextInput
                icon={User}
                disabled={loading}
                placeholder="Name"
                type="text"
                {...register("name")}
            />

            <TextInput
                icon={Mail}
                disabled={loading}
                placeholder="Email"
                type="email"
                {...register("email")}
            />

            <TextInput
                icon={Building}
                disabled={loading}
                placeholder="Company Name"
                type="text"
                {...register("companyName")}
            />

            <PasswordInput
                placeholder="New password"
                disabled={loading}
                {...register("password")}
            />

            <PasswordInput
                placeholder="Confirm password"
                disabled={loading}
                {...register("confirmPassword")}
            />

            <Button
                disabled={loading || !isDirty}
                type="submit"
                className="w-full text-white"
            >
                {loading ? "Creating Trial..." : "Complete Setup"}
            </Button>
        </form>
    );
}