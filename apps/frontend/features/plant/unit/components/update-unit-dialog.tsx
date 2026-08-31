"use client";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Boxes, Building, Feather, Hash, Scale } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetAreas } from "../../area/hooks/use-areas";
import { useGetUnitById, useUpdateUnit } from "../hooks/use-units";
import { unitDefaultValues, unitSchema, UnitSchema, UnitSchemaLimit } from "../schemas/unit-schema";
import SearchableSelect from "@/common/components/form/searchable-select";
import { NumberInput } from "@/common/components/form/number-input";
import { TextAreaInput } from "@/common/components/form/text-area-input";
import { TextInput } from "@/common/components/form/text-input";
import FormDialog from "@/common/components/form/form-dialog";
import { showFormError } from "@/common/lib/show-form-error";

type Props = { open: boolean; onClose: () => void; unitId?: number };
export default function UpdateUnitDialog({ open, onClose, unitId }: Props) {
    const { mutateAsync: updateUnit, isPending: isUpdating } = useUpdateUnit();
    const { data: areas, isLoading: areasLoading } = useGetAreas(open);
    const { data: unit, isLoading: unitLoading } = useGetUnitById(unitId);
    const { register, handleSubmit, reset, control, watch, formState: { isSubmitting, isDirty } } = useForm<UnitSchema>({
        resolver: zodResolver(unitSchema),
        defaultValues: unitDefaultValues
    });

    useEffect(() => {
        if (!open || !unit || !areas) return;
        reset({ name: unit.name, areaId: unit.areaId, capacity: unit.capacity, code: unit.code, description: unit.description });
    }, [open, unit, areas, reset]);
    const loading = isUpdating || unitLoading || areasLoading || isSubmitting;

    const onSubmit = async (formData: UnitSchema) => {
        try {
            const res = await updateUnit({
                id: unitId!, data: formData
            });
            toast.success(res.message ?? "Unit updated successfully.");

            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };

    const handleClose = () => {
        reset(unitDefaultValues);
        onClose();
    };
    const onInvalid = (errors: FieldErrors<UnitSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Update Unit"
            description="Update a unit entity."
            submitDisabled={!isDirty}
            submitLabel="Update"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            icon={Boxes}
        >
            <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <TextInput
                        label="Name"
                        counter
                        maxCharacters={UnitSchemaLimit.name.max}
                        icon={Boxes}
                        placeholder="Unit Name"
                        maxLength={UnitSchemaLimit.name.max}
                        disabled={loading}
                        value={watch("name")}
                        {...register("name")}
                    />
                    <TextInput
                        label="Code"
                        counter
                        maxCharacters={UnitSchemaLimit.code.max}
                        icon={Hash}
                        placeholder="Unit Code"
                        maxLength={UnitSchemaLimit.code.max}
                        disabled={loading}
                        value={watch("code")}
                        {...register("code")}
                    />
                </div>
                <TextAreaInput
                    label="Description"
                    placeholder="Brief Unit Overview"
                    icon={Feather}
                    counter
                    maxCharacters={UnitSchemaLimit.description.max}
                    maxLength={UnitSchemaLimit.description.max}
                    value={watch("description")}
                    disabled={loading}
                    {...register("description")}
                />
                <div className="grid grid-cols-2 gap-2">
                    <Controller
                        control={control}
                        name="areaId"
                        render={({ field }) => (
                            <SearchableSelect
                                value={field.value}
                                icon={Building}
                                label="Area"
                                onChange={field.onChange}
                                options={areas?.map((a) => ({
                                    value: a.id,
                                    label: a.name,
                                })) ?? []}
                                placeholder="Select Area"
                                searchPlaceholder="Search Areas..."
                                disabled={loading}
                            />
                        )}
                    />
                    <NumberInput
                        label="Capacity"
                        icon={Scale}
                        suffix="KG"
                        placeholder="Unit Capacity"
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