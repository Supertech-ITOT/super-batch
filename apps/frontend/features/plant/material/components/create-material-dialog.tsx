"use client";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { useGetMaterialTypes, useGetUomTypes } from "@/features/common/hooks/useMetadata";
import { materialSchema, MaterialSchema, MaterialSchemaLimit } from "../schemas/material-schema";
import CharacterProgress from "@/common/components/form/character-progress";
import { Textarea } from "@/common/components/ui/textarea";
import { useCreateMaterial } from "../hooks/use-materials";

type Props = { open: boolean; onClose: () => void; };
export default function CreateMaterialDialog({ open, onClose }: Props) {
    const { mutateAsync: createMaterial, isPending: isCreating } = useCreateMaterial();
    const { data: materialTypes, isLoading: materialTypeIsLoading } = useGetMaterialTypes(open);
    const { register, handleSubmit, reset, control, watch, formState: { isSubmitting, isDirty } } = useForm<MaterialSchema>({
        resolver: zodResolver(materialSchema),
        defaultValues: { name: "", materialType: "", description: "", code: "" }
    });
    const loading = isCreating || isSubmitting || materialTypeIsLoading;
    const onSubmit = async (formData: MaterialSchema) => {
        try {
            const res = await createMaterial({
                name: formData.name,
                description: formData.description,
                materialType: formData.materialType,
                code: formData.code,
            });
            toast.success(res.message ?? "Material created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset({ name: "", materialType: "", description: "", code: ""});
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
                        <DialogTitle>Create Material</DialogTitle>
                        <DialogDescription>Create a new material entity.</DialogDescription>
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
                            <div className="relative space-y-2 flex-1">
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


                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Create Material"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}