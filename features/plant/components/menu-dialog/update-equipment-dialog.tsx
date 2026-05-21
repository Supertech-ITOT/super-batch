"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import FormError from "@/components/form-error";
import { toast } from "sonner";
import { showApiError } from "@/lib/show-api-error";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAreas } from "../../hooks/use-areas";
import { useGetUnitById, useGetUnits, useUpdateUnit } from "../../hooks/use-units";
import { UnitSchema, unitSchema } from "../../schemas/unit-schema";
import { useGetEquipmentTypes, useGetUnitTypes } from "@/features/common/hooks/useMetadata";
import { useGetEquipmentById, useUpdateEquipment } from "../../hooks/use-equipment";
import { equipmentSchema, EquipmentSchema } from "../../schemas/equipment-schema";

type Props = { open: boolean; onClose: () => void; equipmentId?: number };
export default function UpdateEquipmentDialog({ open, onClose, equipmentId }: Props) {
    const { mutateAsync: updateEquipment, isPending: isUpdating } = useUpdateEquipment();
    const { data: units, isLoading: unitsLoading } = useGetUnits(open);
    const { data: equipment, isLoading: equipmentLoading } = useGetEquipmentById(equipmentId);
    const { data: equipmentTypes, isLoading: equipmentTypeIsLoading } = useGetEquipmentTypes(open);
    const { register, handleSubmit, reset, control, formState: { errors, isSubmitting, isDirty } } = useForm<EquipmentSchema>({
        resolver: zodResolver(equipmentSchema),
        defaultValues: { name: "", unitId: "", equipmentType: "" }
    });

    useEffect(() => {
        if (!open || !equipment || !units) return;
        reset({ name: equipment.name, unitId: String(equipment.unitId), equipmentType: equipment.equipmentType });
    }, [open, equipment, units, reset]);
    const loading = isUpdating || unitsLoading || equipmentLoading || isSubmitting || equipmentTypeIsLoading;

    const onSubmit = async (formData: EquipmentSchema) => {
        try {
            const res = await updateEquipment({
                id: equipmentId!, data: {
                    name: formData.name,
                    equipmentType: formData.equipmentType,
                    unitId: Number(formData.unitId)
                }
            });
            toast.success(res.message ?? "Equipment updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };

    const handleClose = () => {
        reset({ name: "", unitId: "", equipmentType: "" });
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose() }}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Update Equipment</DialogTitle>
                        <DialogDescription> Update Equipment information</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-2">
                        <Label>Equipment Name</Label>
                        <Input
                            type="text"
                            disabled={loading}
                            placeholder="Enter Equipment Name"
                            {...register("name")}
                        />
                        <FormError msg={errors.name?.message} />
                    </div>
                    <div className="py-4 space-y-2">
                        <Label>Unit</Label>
                        <Input
                            type="text"
                            disabled
                            value={units?.find((a) => a.id === equipment?.unitId)?.name ?? ""}
                        />
                    </div>
                    <div className="py-4 space-y-2">
                        <Label>Select Equipment Type</Label>
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
                                            {equipmentTypes?.map((p) => (
                                                <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FormError msg={errors.equipmentType?.message} />
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