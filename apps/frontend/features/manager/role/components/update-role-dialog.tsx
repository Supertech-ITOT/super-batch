"use client";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/common/components/ui/tabs";
import { showApiError } from "@/common/lib/show-api-error";
import { roleSchema, RoleSchema, RoleSchemaLimit, } from "@/features/manager/role/schemas/role-schema";
import { useGetRolesById, useUpdateRole } from "@/features/manager/role/hooks/use-role";
import { useGetModules } from "@/features/manager/module/hooks/use-module";
import { showFormError } from "@/common/lib/show-form-error";
import { TextAreaInput } from "@/common/components/form/text-area-input";
import { TextInput } from "@/common/components/form/text-input";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import FormDialog from "@/common/components/form/form-dialog";
import PermissionTable from "./permission-table";

type Props = { open: boolean; onClose: () => void; roleId: number };
type tab = "role" | "permissions";
export default function UpdateRoleDialog({ open, onClose, roleId }: Props) {
    const [tab, setTab] = useState<tab>("role");
    const { mutateAsync: updateRole, isPending: isUpdating } = useUpdateRole();
    const { data: role, isLoading: roleIsLoading } = useGetRolesById(roleId);
    const { data: modules, isLoading: modulesIsLoading } = useGetModules();
    const { register, control, handleSubmit, reset, watch, formState: { isSubmitting, isDirty, }, } = useForm<RoleSchema>({
        resolver: zodResolver(roleSchema),
        defaultValues: { name: "", description: "", permissions: [] },
    });
    const loading = modulesIsLoading || roleIsLoading;

    useEffect(() => {
        if (!modules || !role) return;
        reset({
            name: role.name,
            description: role.description,
            permissions: modules.map((module) => {
                const existing = role.permissions.find(
                    (p) => p.moduleId === module.id
                );

                return {
                    moduleId: String(module.id),
                    access: existing?.access ?? false,
                };
            }),
        });
    }, [modules, role, reset]);

    const handleClose = () => {
        setTab("role");
        reset({ name: "", description: "", permissions: [] });
        onClose();
    };

    const onSubmit = async (formData: RoleSchema) => {
        try {
            const res = await updateRole({
                id: roleId, data: {
                    name: formData.name,
                    description: formData.description,
                    permissions: formData.permissions.filter((p) => p.access).map((m) => ({
                        moduleId: Number(m.moduleId),
                        access: m.access,
                    })),
                }
            });
            toast.success(res.message ?? "Role updated successfully.");
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
            onClose={handleClose}
            loading={loading}
            title="Update Role"
            description="Update a role and assign module permissions."
            footer={
                tab === "permissions" && (
                    <FormLoadingButton form="create-role-form" type="submit" loading={isUpdating || isSubmitting} disabled={!isDirty}>
                        Update
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