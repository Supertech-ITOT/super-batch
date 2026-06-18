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
import { useGetAreas } from "../../../hooks/use-areas";
import { useCreateUnit } from "../../../hooks/use-units";
import { UnitSchema, unitSchema, UnitSchemaLimit } from "../../../schemas/unit-schema";
import { useGetUomTypes } from "@/features/common/hooks/useMetadata";
import { useEffect } from "react";
import CharacterProgress from "@/common/components/form/character-progress";
import { Textarea } from "@/common/components/ui/textarea";

type Props = { open: boolean; onClose: () => void; areaId?: number };
export default function CreateUnitDialog({ open, onClose, areaId }: Props) {
    const { mutateAsync: createUnit, isPending: isCreating } = useCreateUnit();
    const { data: uomTypes, isLoading: uomTypesIsLoading } = useGetUomTypes(open);
    const { data: areas, isLoading: areasLoading } = useGetAreas(open);
    const { register, handleSubmit, reset, control, watch, formState: { isSubmitting, isDirty } } = useForm<UnitSchema>({
        resolver: zodResolver(unitSchema),
        defaultValues: { name: "", areaId: "", batchSizeUom: "", capacity: "", code: "", description: "" }
    });

    useEffect(() => {
        if (!open || !areaId) return;
        reset({ name: "", areaId: String(areaId), batchSizeUom: "", code: "", description: "" })
    }, [open, areaId, reset]);

    const loading = isCreating || areasLoading || isSubmitting || uomTypesIsLoading;
    const onSubmit = async (formData: UnitSchema) => {
        try {
            const res = await createUnit({
                areaId: Number(formData.areaId),
                name: formData.name,
                code: formData.code,
                description: formData.description,
                batchSizeUom: formData.batchSizeUom,
                capacity: Number(formData.capacity)
            });
            toast.success(res.message ?? "Unit created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset({ name: "", areaId: "", batchSizeUom: "", capacity: "", code: "", description: "" });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<UnitSchema>) => {
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
                        <DialogTitle>Create Unit</DialogTitle>
                        <DialogDescription>Create a new Unit entity.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-6">
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Name</Label>
                                <CharacterProgress value={watch("name")} max={UnitSchemaLimit.name.max} />
                            </div>
                            <Input
                                type="text"
                                disabled={loading}
                                placeholder="Reactor 101"
                                maxLength={UnitSchemaLimit.name.max}
                                {...register("name")}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="space-y-2 flex-1 relative">
                                <div className="flex items-center justify-between">
                                    <Label>Code</Label>
                                    <CharacterProgress value={watch("code")} max={UnitSchemaLimit.code.max} />
                                </div>
                                <Input
                                    type="text"
                                    disabled={loading}
                                    placeholder="R101"
                                    maxLength={UnitSchemaLimit.code.max}
                                    {...register("code")}
                                />
                            </div>
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center justify-between">
                                    <Label>Capacity</Label>
                                </div>
                                <div className="flex">
                                    <Input
                                        type="number"
                                        placeholder="1000"
                                        className="rounded-r-none"
                                        {...register("capacity")}
                                    />
                                    <div className="flex items-center px-3 border border-l-0 rounded-r-md bg-muted text-sm">
                                        kg
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Description</Label>
                                <CharacterProgress value={watch("description")} max={UnitSchemaLimit.description.max} />
                            </div>
                            <Textarea
                                disabled={loading}
                                placeholder="Brief unit overview"
                                className="min-h-30 w-full resize-none break-all overflow-hidden"
                                maxLength={UnitSchemaLimit.description.max}
                                {...register("description")}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="space-y-2 flex-1">
                                <Label>Select Area</Label>
                                <Controller
                                    control={control}
                                    name="areaId"
                                    render={({ field }) => (
                                        <Select
                                            disabled={loading || !!areaId}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Area" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {areas?.map((p) => (
                                                        <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div className="space-y-2 flex-1">
                                <Label>Batch Size Uom</Label>
                                <Controller
                                    control={control}
                                    name="batchSizeUom"
                                    render={({ field }) => (
                                        <Select
                                            disabled={loading}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Batch Size Uom" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {uomTypes?.filter(f => f.value == "KG" || f.value == "PERCENT").map((e) => (
                                                        <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                        </div>

                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Create Unit"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}