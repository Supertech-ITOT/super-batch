"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { showApiError } from "@/lib/show-api-error";
import { useGetUnits } from "../../../hooks/use-units";
import { useGetEquipmentById, useUpdateEquipment } from "../../../hooks/use-equipment";
import { equipmentSchema, EquipmentSchema, EquipmentSchemaLimit } from "../../../schemas/equipment-schema";
import CharacterProgress from "@/components/form/character-progress";
import { Textarea } from "@/components/ui/textarea";

type Props = { open: boolean; onClose: () => void; equipmentId?: number };
export default function UpdateEquipmentDialog({ open, onClose, equipmentId }: Props) {
    const { mutateAsync: updateEquipment, isPending: isUpdating } = useUpdateEquipment();
    const { data: units, isLoading: unitsLoading } = useGetUnits(open);
    const { data: equipment, isLoading: equipmentLoading } = useGetEquipmentById(equipmentId);
    const { register, handleSubmit, reset, watch, formState: { isSubmitting, isDirty } } = useForm<EquipmentSchema>({
        resolver: zodResolver(equipmentSchema),
        defaultValues: { name: "", unitId: "", capacity: "", description: "", code: "" }
    });

    useEffect(() => {
        if (!open || !equipment || !units) return;
        reset({
            name: equipment.name,
            unitId: String(equipment.unitId),
            capacity: String(equipment.capacity),
            description: equipment.description,
            code: equipment.code,
        });

    }, [open, equipment, units, reset]);
    const loading = isUpdating || unitsLoading || equipmentLoading || isSubmitting;

    const onSubmit = async (formData: EquipmentSchema) => {
        try {
            const res = await updateEquipment({
                id: equipmentId!, data: {
                    name: formData.name,
                    capacity: Number(formData.capacity),
                    unitId: Number(formData.unitId),
                    description: formData.description,
                    code: formData.code,
                }
            });
            toast.success(res.message ?? "Equipment updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };

    const handleClose = () => {
        reset({ name: "", unitId: "", capacity: "", description: "", code: "" });
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
                                    <Label>Code</Label>
                                    <CharacterProgress value={watch("code")} max={EquipmentSchemaLimit.code.max} />
                                </div>
                                <Input
                                    type="text"
                                    disabled={loading}
                                    placeholder="T101"
                                    maxLength={EquipmentSchemaLimit.code.max}
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