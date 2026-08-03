
import { Building, Mail, ShieldCheck, User } from "lucide-react";
import { Button } from "../../../../common/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { showApiError } from "@/common/lib/show-api-error";
import { TextInput } from "@/common/components/form/text-input";
import { PasswordInput } from "@/common/components/form/password-input";
import { setupDefaultValues, setupSchema, SetupSchema } from "../schemas/setup-schema";
import { showFormError } from "@/common/lib/show-form-error";
import { useSetup } from "../hook/use-setup";

export default function SetupCard() {
    const { mutateAsync, isPending } = useSetup();
    const router = useRouter();
    const { handleSubmit, register, watch, formState: { isDirty, isSubmitting, } } = useForm<SetupSchema>({
        resolver: zodResolver(setupSchema),
        defaultValues: setupDefaultValues
    });
    const loading = isSubmitting || isPending;
    const onSubmit = async (data: SetupSchema) => {
        try {
            const res = await mutateAsync(data);
            toast.success(res.message ?? "Setup completed Successfully.");
            router.refresh();
        } catch (error) {
            showApiError(error);
        }
    }
    const onInvalid = (errors: FieldErrors<SetupSchema>) => {
        toast.error(showFormError(errors));
    };
    return (
        <div className="flex w-full max-w-md flex-col rounded-2xl border bg-card/60 p-2 sm:p-10 shadow-2xl backdrop-blur-xl">
            {/* Logo Section */}
            <div className="flex items-center justify-center">
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
                    Welcome to SuperBatch
                </h1>
                <span className="text-primary flex items-center leading-3.5 text-sm justify-center font-semibold text-center">
                    Complete the initial setup by creating your organization and the primary administrator account.
                </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-2 mt-6">
                <TextInput
                    icon={User}
                    disabled={loading}
                    placeholder="Name"
                    type="text"
                    value={watch("name")}
                    {...register("name")} />
                <TextInput
                    icon={Mail}
                    disabled={loading}
                    placeholder="Email"
                    type="email"
                    value={watch("email")}
                    {...register("email")} />
                <TextInput
                    icon={Building}
                    disabled={loading}
                    placeholder="Company Name"
                    type="text"
                    value={watch("companyName")}
                    {...register("companyName")} />
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
                <Button disabled={loading || !isDirty} type="submit" className="text-white">
                    Complete Setup
                </Button>

            </form>
            <div className="mt-4 flex items-center gap-2 rounded-2xl ">
                <ShieldCheck className="text-primary size-10 shrink-0" />
                <div className="leading-4">
                    <p className="font-semibold">Secure Setup</p>
                    <p className="text-xs text-muted-foreground text-justify leading-3.5">All setup information is securely stored. The administrator account will have full access to configure plants, users, and licenses.</p>
                </div>
            </div>
        </div>
    );
}