"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import FormError from "@/components/form-error";
import { toast } from "sonner";
import { showApiError } from "@/lib/show-api-error";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetEquipmentTypes, useGetUomTypes } from "@/features/common/hooks/useMetadata";
import { useEffect } from "react";
import { useCreateEquipment } from "../../../hooks/use-equipment";
import { equipmentSchema, EquipmentSchema, EquipmentSchemaLimit } from "../../../schemas/equipment-schema";
import { useGetUnits } from "../../../hooks/use-units";
import CharacterProgress from "@/components/character-progress";
import { Textarea } from "@/components/ui/textarea";
import { StatusConfig, StatusType } from "../../../../common/types/status.type";
import clsx from "clsx";
import { PlantSchema } from "../../../schemas/plant-schema";

type Props = { open: boolean; onClose: () => void; unitId?: number };
export default function CreateEquipmentDialog({ open, onClose, unitId }: Props) {
    const { mutateAsync: createEquipment, isPending: isCreating } = useCreateEquipment();
    const { data: units, isLoading: unitsLoading } = useGetUnits(open);
    const { data: equipmentTypes, isLoading: equipmentTypeIsLoading } = useGetEquipmentTypes(open);
    const { data: uomTypes, isLoading: uomTypesIsLoading } = useGetUomTypes(open);
    const { register, handleSubmit, reset, control, watch, setValue, formState: { isSubmitting, isDirty } } = useForm<EquipmentSchema>({
        resolver: zodResolver(equipmentSchema),
        defaultValues: { name: "", unitId: undefined, equipmentType: undefined, description: "", status: StatusType.ACTIVE, tagName: "", uom: undefined }
    });

    useEffect(() => {
        if (!open || !unitId) return;

        reset({ name: "", unitId: String(unitId), equipmentType: undefined, description: "", status: StatusType.ACTIVE, tagName: "", uom: undefined })
    }, [open, unitId, reset]);

    const loading = isCreating || unitsLoading || isSubmitting || equipmentTypeIsLoading || uomTypesIsLoading;
    const onSubmit = async (formData: EquipmentSchema) => {
        try {
            const res = await createEquipment({
                name: formData.name,
                description: formData.description,
                equipmentType: formData.equipmentType,
                status: formData.status,
                tagName: formData.tagName,
                unitId: Number(formData.unitId),
                uom: formData.uom
            });
            toast.success(res.message ?? "Equipment created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset({ name: "", unitId: undefined, equipmentType: undefined, description: "", status: StatusType.ACTIVE, tagName: "", uom: undefined });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<PlantSchema>) => {
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
                            <div className="flex-1 space-y-2">
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
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <div className="flex rounded-md border overflow-hidden transition-all duration-200">
                                {StatusConfig.map((status) => {
                                    const selected = watch("status") === status.value;
                                    return (
                                        <Button
                                            type="button"
                                            disabled={loading}
                                            variant="outline"
                                            key={status.value}
                                            onClick={() =>
                                                setValue("status", status.value as StatusType, {
                                                    shouldDirty: true,
                                                    shouldValidate: true,
                                                })
                                            }
                                            className={clsx(
                                                "relative flex-1 h-8 rounded-none border bg-card py-0.5 flex items-center justify-center gap-3 text-left hover:bg-muted/50",
                                                selected ? "bg-primary/5" : ""
                                            )}
                                        >
                                            <div className={clsx("h-3 w-3 rounded-full", status.dot)} />
                                            <span className="font-medium text-xs">{status.label}</span>
                                            {selected && <div className="absolute bottom-0 h-0.5 w-full bg-primary" />}
                                        </Button>
                                    );
                                })}
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