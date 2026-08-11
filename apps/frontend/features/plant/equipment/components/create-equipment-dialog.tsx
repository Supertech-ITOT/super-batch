"use client";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Boxes, Cpu, Feather, Hash, Scale } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useEffect } from "react";
import { useCreateEquipment } from "../hooks/use-equipment";
import { equipmentDefaultValues, equipmentSchema, EquipmentSchema, EquipmentSchemaLimit } from "../schemas/equipment-schema";
import { useGetUnits } from "../../unit/hooks/use-units";
import FormDialog from "@/common/components/form/form-dialog";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import { TextInput } from "@/common/components/form/text-input";
import { TextAreaInput } from "@/common/components/form/text-area-input";
import SearchableSelect from "@/common/components/form/searchable-select";
import { NumberInput } from "@/common/components/form/number-input";
import { showFormError } from "@/common/lib/show-form-error";

type Props = { open: boolean; onClose: () => void; unitId?: number };
export default function CreateEquipmentDialog({ open, onClose, unitId }: Props) {
    const { mutateAsync: createEquipment, isPending: isCreating } = useCreateEquipment();
    const { data: units, isLoading: unitsLoading } = useGetUnits(open);
    const { register, handleSubmit, reset, control, watch, formState: { isSubmitting, isDirty } } = useForm<EquipmentSchema>({
        resolver: zodResolver(equipmentSchema),
        defaultValues: equipmentDefaultValues
    });

    useEffect(() => {
        if (!open || !unitId) return;
        reset({ ...equipmentDefaultValues, unitId: unitId })
    }, [open, unitId, reset]);

    const loading = isCreating || unitsLoading || isSubmitting;
    const onSubmit = async (formData: EquipmentSchema) => {
        try {
            const res = await createEquipment(formData);
            toast.success(res.message ?? "Equipment created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset(equipmentDefaultValues);
        onClose();
    };
    const onInvalid = (errors: FieldErrors<EquipmentSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Create Equipment"
            description="Create a equipment entity."
            submitDisabled={!isDirty}
            submitLabel="Create"
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
                <div className="grid grid-cols-2 gap-2">
                    <Controller
                        control={control}
                        name="unitId"
                        render={({ field }) => (
                            <SearchableSelect
                                value={field.value}
                                icon={Boxes}
                                label="Unit"
                                onChange={field.onChange}
                                options={units?.map((a) => ({
                                    value: a.id,
                                    label: a.name,
                                })) ?? []}
                                placeholder="Select Unit"
                                searchPlaceholder="Search Units..."
                                disabled={loading}
                            />
                        )}
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
            </div>
        </FormDialog>
    );
}