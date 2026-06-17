"use client";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetUnits } from "../../../hooks/use-units";
import { useGetEquipmentById, useUpdateEquipment } from "../../../hooks/use-equipment";
import { equipmentSchema, EquipmentSchema, EquipmentSchemaLimit } from "../../../schemas/equipment-schema";
import CharacterProgress from "@/common/components/form/character-progress";
import { Textarea } from "@/common/components/ui/textarea";
import { useGetEquipmentTypes } from "@/features/common/hooks/useMetadata";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";

type Props = { open: boolean; onClose: () => void; equipmentId?: number };
export default function UpdateEquipmentDialog({ open, onClose, equipmentId }: Props) {
    const { mutateAsync: updateEquipment, isPending: isUpdating } = useUpdateEquipment();
    const { data: equipments, isLoading: equipmentsLoading } = useGetEquipmentTypes();
    const { data: units, isLoading: unitsLoading } = useGetUnits(open);
    const { data: equipment, isLoading: equipmentLoading } = useGetEquipmentById(equipmentId);
    const { register, handleSubmit, reset, control, watch, formState: { isSubmitting, isDirty } } = useForm<EquipmentSchema>({
        resolver: zodResolver(equipmentSchema),
        defaultValues: { name: "", unitId: "", equipmentType: "", description: "", tagName: "" }
    });

    useEffect(() => {
        if (!open || !equipment || !units) return;
        reset({
            name: equipment.name,
            unitId: String(equipment.unitId),
            equipmentType: equipment.equipmentType,
            description: equipment.description,
            tagName: equipment.tagName,
        });

    }, [open, equipment, units, reset]);
    const loading = isUpdating || unitsLoading || equipmentLoading || isSubmitting || equipmentsLoading;

    const onSubmit = async (formData: EquipmentSchema) => {
        try {
            const res = await updateEquipment({
                id: equipmentId!, data: {
                    name: formData.name,
                    equipmentType: formData.equipmentType,
                    unitId: Number(formData.unitId),
                    description: formData.description,
                    tagName: formData.tagName,
                }
            });
            toast.success(res.message ?? "Equipment updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };

    const handleClose = () => {
        reset({ name: "", unitId: "", equipmentType: "", description: "", tagName: "" });
        onClose();
    };

    const onInvalid = (errors: FieldErrors<EquipmentSchema>) => {
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
                        <DialogTitle>Update Equipment</DialogTitle>
                        <DialogDescription> Update Equipment information</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Name</Label>
                                <CharacterProgress value={watch("name")} max={EquipmentSchemaLimit.name.max} />
                            </div>
                            <Input
                                type="text"
                                disabled={loading}
                                placeholder="Tank 101"
                                maxLength={EquipmentSchemaLimit.name.max}
                                {...register("name")}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="space-y-2 relative flex-1">
                                <div className="flex items-center justify-between">
                                    <Label>Tag Name</Label>
                                    <CharacterProgress value={watch("tagName")} max={EquipmentSchemaLimit.tagName.max} />
                                </div>
                                <Input
                                    type="text"
                                    disabled={loading}
                                    placeholder="TT101"
                                    maxLength={EquipmentSchemaLimit.tagName.max}
                                    {...register("tagName")}
                                />
                            </div>
                            <div className="space-y-2 relative flex-1">
                                <Label>Equipment Type</Label>
                                <Controller
                                    control={control}
                                    name="equipmentType"
                                    render={({ field }) => (
                                        <Select
                                            disabled={loading}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Equipment Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {equipments?.map((e) => (
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
                                <CharacterProgress value={watch("description")} max={EquipmentSchemaLimit.description.max} />
                            </div>
                            <Textarea
                                disabled={loading}
                                placeholder="Brief equipment overview"
                                className="min-h-30 w-full resize-none break-all overflow-hidden"
                                maxLength={EquipmentSchemaLimit.description.max}
                                {...register("description")}
                            />
                        </div>
                        <div className="space-y-2 flex-1">
                            <Label>Unit</Label>
                            <Input
                                type="text"
                                disabled
                                value={units?.find((u) => u.id === equipment?.unitId)?.name ?? ""}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Update Equipment"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}