"use client";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Feather, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/common/components/ui/tabs";
import { showApiError } from "@/common/lib/show-api-error";
import { roleDefaultValues, roleSchema, RoleSchema, RoleSchemaLimit, } from "@/features/manager/role/schemas/role-schema";
import { useCreateRole } from "@/features/manager/role/hooks/use-role";
import { useGetModules } from "@/features/manager/module/hooks/use-module";
import { showFormError } from "@/common/lib/show-form-error";
import FormDialog from "@/common/components/form/form-dialog";
import { TextInput } from "@/common/components/form/text-input";
import { TextAreaInput } from "@/common/components/form/text-area-input";
import PermissionTable from "./permission-table";
import FormLoadingButton from "@/common/components/form/form-loading-button";

type Props = { open: boolean; onClose: () => void; };
type tab = "role" | "permissions";
export default function CreateRoleDialog({ open, onClose, }: Props) {
    const [tab, setTab] = useState<tab>("role");
    const { mutateAsync: createRole, isPending: isCreating, isSuccess } = useCreateRole();
    const { data: modules, isLoading: modulesIsLoading } = useGetModules();
    const { register, control, handleSubmit, reset, watch, formState: { isSubmitting, isDirty, }, } = useForm<RoleSchema>({
        resolver: zodResolver(roleSchema),
        defaultValues: roleDefaultValues,
    });
    const loading = modulesIsLoading || isCreating || isSubmitting;

    useEffect(() => {
        if (!modules) return;
        reset({
            name: "", description: "", permissions: modules.map((module) => ({
                moduleId: String(module.id),
                access: false
            })),
        });
    }, [modules, reset]);

    const handleClose = () => {
        setTab("role");
        reset(roleDefaultValues);
        onClose();
    };

    const onSubmit = async (formData: RoleSchema) => {
        try {
            const res = await createRole({
                name: formData.name,
                description: formData.description,
                permissions: formData.permissions.filter((p) => p.access).map((m) => ({
                    moduleId: Number(m.moduleId),
                    access: m.access,
                })),
            });
            toast.success(res.message ?? "Role created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };

    const onInvalid = (errors: FieldErrors<RoleSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Create Role"
            description="Create a role and assign module permissions."
            footer={
                tab === "permissions" && (
                    <FormLoadingButton form="create-role-form" type="submit" loading={loading} disabled={!isDirty}>
                        Create
                    </FormLoadingButton>
                )
            }
            icon={ShieldCheck}
        >
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} id="create-role-form">
                <Tabs value={tab} className="mt-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger onClick={() => setTab("role")} value="role">
                            Role Details
                        </TabsTrigger>
                        <TabsTrigger onClick={() => setTab("permissions")} value="permissions">
                            Permissions
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="role" className="space-y-4 pt-4">
                        <TextInput
                            label="Name"
                            icon={ShieldCheck}
                            counter
                            maxCharacters={RoleSchemaLimit.name.max}
                            placeholder="Operator"
                            maxLength={RoleSchemaLimit.name.max}
                            disabled={loading}
                            value={watch("name")}
                            {...register("name")}
                        />
                        <TextAreaInput
                            label="Description"
                            icon={Feather}
                            placeholder="Brief role overview"
                            counter
                            maxCharacters={RoleSchemaLimit.description.max}
                            maxLength={RoleSchemaLimit.description.max}
                            value={watch("description")}
                            disabled={loading}
                            {...register("description")}
                        />
                    </TabsContent>

                    <TabsContent
                        value="permissions"
                        className="pt-4"
                    >
                        <PermissionTable
                            modules={modules}
                            control={control}
                            name="permissions"
                        />
                    </TabsContent>
                </Tabs>
            </form>
        </FormDialog>

    );
}