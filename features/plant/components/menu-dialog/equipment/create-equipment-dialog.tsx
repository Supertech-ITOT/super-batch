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
import { useEffect } from "react";
import { useCreateEquipment } from "../../../hooks/use-equipment";
import { equipmentSchema, EquipmentSchema, EquipmentSchemaLimit } from "../../../schemas/equipment-schema";
import { useGetUnits } from "../../../hooks/use-units";
import CharacterProgress from "@/common/components/form/character-progress";
import { Textarea } from "@/common/components/ui/textarea";
import { useGetEquipmentTypes } from "@/features/common/hooks/useMetadata";

type Props = { open: boolean; onClose: () => void; unitId?: number };
export default function CreateEquipmentDialog({ open, onClose, unitId }: Props) {
    const { mutateAsync: createEquipment, isPending: isCreating } = useCreateEquipment();
    const { data: equipments, isLoading: equipmentsLoading } = useGetEquipmentTypes();
    const { data: units, isLoading: unitsLoading } = useGetUnits(open);
    const { register, handleSubmit, reset, control, watch, formState: { isSubmitting, isDirty } } = useForm<EquipmentSchema>({
        resolver: zodResolver(equipmentSchema),
        defaultValues: { name: "", unitId: "", equipmentType: "", description: "", tagName: "" }
    });

    useEffect(() => {
        if (!open || !unitId) return;

        reset({ name: "", unitId: String(unitId), equipmentType: "", description: "", tagName: "" })
    }, [open, unitId, reset]);

    const loading = isCreating || unitsLoading || isSubmitting || equipmentsLoading;
    const onSubmit = async (formData: EquipmentSchema) => {
        try {
            const res = await createEquipment({
                name: formData.name,
                description: formData.description,
                equipmentType: formData.equipmentType,
                tagName: formData.tagName,
                unitId: Number(formData.unitId),
            });
            toast.success(res.message ?? "Equipment created successfully.");
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
                        <DialogTitle>Create Equipment</DialogTitle>
                        <DialogDescription>Create a new equipment entity.</DialogDescription>
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
                                placeholder="Temperature 101"
                                maxLength={EquipmentSchemaLimit.name.max}
                                {...register("name")}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="space-y-2 relative flex-1">
                                <div className="flex items-center justify-between">
                                    <Label>TagName</Label>
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
                        <div className="flex gap-2">

                            <div className="space-y-2 flex-1">
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
                                                <SelectValue placeholder="Select Unit" />
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
                            </div>
                        </div>
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