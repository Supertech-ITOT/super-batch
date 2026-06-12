"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/lib/show-api-error";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetMaterialTypes, useGetUomTypes } from "@/features/common/hooks/useMetadata";
import { useGetMaterialById, useUpdateMaterial } from "../../../hooks/use-materials";
import { materialSchema, MaterialSchema, MaterialSchemaLimit } from "../../../schemas/material-schema";
import CharacterProgress from "@/components/form/character-progress";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

type Props = { open: boolean; onClose: () => void; materialId?: number };
export default function UpdateMaterialDialog({ open, onClose, materialId }: Props) {
    const { mutateAsync: updateMaterial, isPending: isUpdating } = useUpdateMaterial();
    const { data: materialTypes, isLoading: materialTypeIsLoading } = useGetMaterialTypes(open);
    const { data: material, isLoading: materialIsLoading } = useGetMaterialById(materialId);
    const { data: uomTypes, isLoading: uomTypesIsLoading } = useGetUomTypes(open);
    const { register, handleSubmit, reset, control, watch, formState: { isSubmitting, isDirty } } = useForm<MaterialSchema>({
        resolver: zodResolver(materialSchema),
        defaultValues: { name: "", materialType: "", description: "", code: "", uom: "" }
    });

    useEffect(() => {
        if (!open || !material) return;
        reset({
            name: material.name,
            code: material.code,
            description: material.description,
            materialType: material.materialType,
            uom: material.uom.value,
        });
    }, [open, material, reset]);

    const loading = isUpdating || isSubmitting || materialTypeIsLoading || uomTypesIsLoading || materialIsLoading;
    const onSubmit = async (formData: MaterialSchema) => {
        try {
            const res = await updateMaterial({
                id: materialId!, data: {
                    code: formData.code,
                    name: formData.name,
                    description: formData.description,
                    uom: formData.uom,
                    materialType: formData.materialType
                }
            });
            toast.success(res.message ?? "Material updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset({ name: "", materialType: "", description: "", code: "", uom: "" });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<MaterialSchema>) => {
        const firstError = Object.values(errors)[0];
        if (firstError?.message) {
            toast.error(firstError.message.toString());
        }
    };

    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose() }}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                    <DialogHeader>
                        <DialogTitle>Update Material</DialogTitle>
                        <DialogDescription>Update material information.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Name</Label>
                                <CharacterProgress value={watch("name")} max={MaterialSchemaLimit.name.max} />
                            </div>
                            <Input
                                type="text"
                                disabled={loading}
                                placeholder="Titanium Dioxide"
                                maxLength={MaterialSchemaLimit.name.max}
                                {...register("name")}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="space-y-2 relative flex-1">
                                <div className="flex items-center justify-between">
                                    <Label>Material Code</Label>
                                    <CharacterProgress value={watch("code")} max={MaterialSchemaLimit.code.max} />
                                </div>
                                <Input
                                    type="text"
                                    disabled={loading}
                                    placeholder="TD101"
                                    maxLength={MaterialSchemaLimit.code.max}
                                    {...register("code")}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label>Select Uom Type</Label>
                                <Controller
                                    control={control}
                                    name="uom"
                                    render={({ field }) => (
                                        <Select
                                            disabled={loading}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Uom Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {uomTypes?.map((e) => (
                                                        <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Description</Label>
                                <CharacterProgress value={watch("description")} max={MaterialSchemaLimit.description.max} />
                            </div>
                            <Textarea
                                disabled={loading}
                                placeholder="Brief material overview"
                                className="min-h-30 w-full resize-none break-all overflow-hidden"
                                maxLength={MaterialSchemaLimit.description.max}
                                {...register("description")}
                            />
                        </div>
                        <div className="relative space-y-2">
                            <Label>Select Material Type</Label>
                            <Controller
                                control={control}
                                name="materialType"
                                render={({ field }) => (
                                    <Select
                                        disabled={loading}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Material Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {materialTypes?.map((e) => (
                                                    <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Update Material"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}