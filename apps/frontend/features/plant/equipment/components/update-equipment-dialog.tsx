"use client";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cpu, Feather, Hash, Scale } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetEquipmentById, useUpdateEquipment } from "../hooks/use-equipment";
import { equipmentDefaultValues, EquipmentSchemaLimit, updateEquipmentSchema, UpdateEquipmentSchema } from "../schemas/equipment-schema";
import { NumberInput } from "@/common/components/form/number-input";
import { TextAreaInput } from "@/common/components/form/text-area-input";
import { TextInput } from "@/common/components/form/text-input";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import FormDialog from "@/common/components/form/form-dialog";
import { showFormError } from "@/common/lib/show-form-error";
import { useGetUnits } from "../../unit/hooks/use-units";

type Props = { open: boolean; onClose: () => void; equipmentId?: number };
export default function UpdateEquipmentDialog({ open, onClose, equipmentId }: Props) {
    const { mutateAsync: updateEquipment, isPending: isUpdating } = useUpdateEquipment();
    const { data: units, isLoading: unitsLoading } = useGetUnits(open);
    const { data: equipment, isLoading: equipmentLoading } = useGetEquipmentById(equipmentId);
    const { register, handleSubmit, reset, watch, control, formState: { isSubmitting, isDirty } } = useForm<UpdateEquipmentSchema>({
        resolver: zodResolver(updateEquipmentSchema),
        defaultValues: equipmentDefaultValues
    });

    useEffect(() => {
        if (!open || !equipment) return;
        reset({
            name: equipment.name,
            capacity: equipment.capacity,
            description: equipment.description,
            code: equipment.code,
        });

    }, [open, equipment, reset]);
    const loading = isUpdating || equipmentLoading || unitsLoading || isSubmitting;

    const onSubmit = async (formData: UpdateEquipmentSchema) => {
        try {
            const res = await updateEquipment({
                id: equipmentId!, data: formData
            });
            toast.success(res.message ?? "Equipment updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };

    const handleClose = () => {
        reset(equipmentDefaultValues);
        onClose();
    };

    const onInvalid = (errors: FieldErrors<UpdateEquipmentSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Update Equipment"
            description="Update a equipment entity."
            submitDisabled={!isDirty}
            submitLabel="Update"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            icon={Cpu}
        >
            <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <TextInput
                        label="Name"
                        counter
                        maxCharacters={EquipmentSchemaLimit.name.max}
                        icon={Cpu}
                        placeholder="Equipment Name"
                        maxLength={EquipmentSchemaLimit.name.max}
                        disabled={loading}
                        value={watch("name")}
                        {...register("name")}
                    />
                    <TextInput
                        label="Code"
                        counter
                        maxCharacters={EquipmentSchemaLimit.code.max}
                        icon={Hash}
                        placeholder="Equipment Code"
                        maxLength={EquipmentSchemaLimit.code.max}
                        disabled={loading}
                        value={watch("code")}
                        {...register("code")}
                    />
                </div>
                <TextAreaInput
                    label="Description"
                    placeholder="Brief Equipment Overview"
                    icon={Feather}
                    counter
                    maxCharacters={EquipmentSchemaLimit.description.max}
                    maxLength={EquipmentSchemaLimit.description.max}
                    value={watch("description")}
                    disabled={loading}
                    {...register("description")}
                />
                <NumberInput
                    label="Capacity"
                    icon={Scale}
                    suffix="KG"
                    placeholder="Equipment Capacity"
                    disabled={loading}
                    value={watch("capacity")}
                    {...register("capacity", {
                        valueAsNumber: true,
                    })}
                />
            </div>
        </FormDialog>
    );
}