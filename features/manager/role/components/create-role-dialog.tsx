"use client";
import { useEffect, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Textarea } from "@/common/components/ui/textarea";
import { Checkbox } from "@/common/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/common/components/ui/tabs";
import CharacterProgress from "@/common/components/form/character-progress";
import { showApiError } from "@/common/lib/show-api-error";
import { roleSchema, RoleSchema, RoleSchemaLimit, } from "@/features/manager/role/schemas/role-schema";
import { useCreateRole } from "@/features/manager/role/hooks/use-role";
import { useGetModules } from "@/features/manager/module/hooks/use-module";
import { toDisplayText } from "@/common/lib/format-enum";
import { showFormError } from "@/common/lib/show-form-error";

type Props = { open: boolean; onClose: () => void; };
type tab = "role" | "permissions";
export default function CreateRoleDialog({ open, onClose, }: Props) {
    const [tab, setTab] = useState<tab>("role");
    const { mutateAsync: createRole, isPending: isCreating } = useCreateRole();
    const { data: modules, isLoading: modulesIsLoading } = useGetModules();
    const { register, control, handleSubmit, reset, watch, formState: { isSubmitting, isDirty, }, } = useForm<RoleSchema>({
        resolver: zodResolver(roleSchema),
        defaultValues: { name: "", description: "", permissions: [] },
    });
    const loading = isCreating || isSubmitting || modulesIsLoading;

    useEffect(() => {
        if (!modules) return;
        reset({
            name: "", description: "", permissions: modules.map((module) => ({
                moduleId: String(module.id),
                canRead: false,
                canWrite: false,
            })),
        });
    }, [modules, reset]);

    const handleClose = () => {
        setTab("role");
        reset({ name: "", description: "", permissions: [] });
        onClose();
    };

    const onSubmit = async (formData: RoleSchema) => {
        try {
            const res = await createRole({
                name: formData.name,
                description: formData.description,
                permissions: formData.permissions.filter((p) => p.canRead || p.canWrite).map((m) => ({
                    moduleId: Number(m.moduleId),
                    canRead: m.canRead,
                    canWrite: m.canWrite,
                })),
            });
            toast.success(res.message ?? "Role created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };



    const onInvalid = (errors: FieldErrors<RoleSchema>) => {
        const message = showFormError(errors);
        if (message) {
            toast.error(message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose(); }}>
            <DialogContent className="max-w-3xl">
                <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                    <DialogHeader>
                        <DialogTitle>Create Role</DialogTitle>
                        <DialogDescription>
                            Create a role and assign module permissions.
                        </DialogDescription>
                    </DialogHeader>

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
                            <div className="space-y-2 relative">
                                <div className="flex items-center justify-between">
                                    <Label>Name</Label>
                                    <CharacterProgress value={watch("name")} max={RoleSchemaLimit.name.max} />
                                </div>
                                <Input
                                    placeholder="Operator"
                                    maxLength={RoleSchemaLimit.name.max}
                                    disabled={loading}
                                    {...register("name")}
                                />
                            </div>

                            <div className="space-y-2 relative">
                                <div className="flex items-center justify-between">
                                    <Label>Description</Label>
                                    <CharacterProgress value={watch("description")} max={RoleSchemaLimit.description.max} />
                                </div>
                                <Textarea
                                    placeholder="Brief role overview"
                                    className="min-h-28 resize-none"
                                    maxLength={RoleSchemaLimit.description.max}
                                    disabled={loading}
                                    {...register("description")}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent
                            value="permissions"
                            className="pt-4"
                        >
                            <div className="rounded-md border">
                                <div className="grid grid-cols-3 border-b bg-muted/50 p-3 font-medium">
                                    <div>Module</div>
                                    <div>Read</div>
                                    <div>Write</div>
                                </div>

                                {modules?.map((module, index) => (
                                    <div key={module.id} className="grid grid-cols-3 items-center border-b p-3 last:border-0">
                                        <div>{toDisplayText(module.name)}</div>
                                        <div>
                                            <Controller
                                                control={control}
                                                name={`permissions.${index}.canRead`}
                                                render={({ field }) => (
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <Controller
                                                control={control}
                                                name={`permissions.${index}.canWrite`}
                                                render={({ field }) => (
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                )}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>

                    <DialogFooter className="mt-6 flex-1">
                        {tab === "permissions" && (
                            <Button type="submit" disabled={loading || !isDirty} className="w-full text-white">
                                {loading ? (<Loader2 className="h-4 w-4 animate-spin" />) : ("Create")}
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}