"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import FormError from "@/components/form-error";
import { toast } from "sonner";
import { showApiError } from "@/lib/show-api-error";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetEquipmentTypes } from "@/features/common/hooks/useMetadata";
import { useEffect } from "react";
import { useCreateEquipment } from "../../hooks/use-equipment";
import { equipmentSchema, EquipmentSchema } from "../../schemas/equipment-schema";
import { useGetUnits } from "../../hooks/use-units";

type Props = { open: boolean; onClose: () => void; unitId?: number };
export default function CreateEquipmentDialog({ open, onClose, unitId }: Props) {
    const { mutateAsync: createEquipment, isPending: isCreating } = useCreateEquipment();
    const { data: units, isLoading: unitsLoading } = useGetUnits(open);
    const { data: equipmentTypes, isLoading: equipmentTypeIsLoading } = useGetEquipmentTypes(open);
    const { register, handleSubmit, reset, control, formState: { errors, isSubmitting, isDirty } } = useForm<EquipmentSchema>({
        resolver: zodResolver(equipmentSchema),
        defaultValues: { name: "", unitId: "", equipmentType: "" }
    });

    useEffect(() => {
        if (!open || !unitId) return;

        reset({ name: "", unitId: String(unitId), equipmentType: "" })
    }, [open, unitId, reset]);

    const loading = isCreating || unitsLoading || isSubmitting || equipmentTypeIsLoading;
    const onSubmit = async (formData: EquipmentSchema) => {
        try {
            const res = await createEquipment({ name: formData.name, unitId: Number(formData.unitId), equipmentType: formData.equipmentType });
            toast.success(res.message ?? "Equipment created successfully.");
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
                        <DialogTitle>Create Equipment</DialogTitle>
                        <DialogDescription>Create a new equipment entity.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-2">
                        <Label>Equipment Name</Label>
                        <Input
                            type="text"
                            disabled={loading}
                            placeholder="Enter equipment name"
                            {...register("name")}
                        />
                        <FormError msg={errors.name?.message} />
                    </div>
                    <div className="py-4 space-y-2">
                        <Label>Select Unit</Label>
                        <Controller
                            control={control}
                            name="unitId"
                            render={({ field }) => (
                                <Select
                                    disabled={loading || !!unitId}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {units?.map((u) => (
                                                <SelectItem key={u.id} value={String(u.id)}>{u.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FormError msg={errors.unitId?.message} />
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
                                            {equipmentTypes?.map((e) => (
                                                <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
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
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Create Equipment"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}