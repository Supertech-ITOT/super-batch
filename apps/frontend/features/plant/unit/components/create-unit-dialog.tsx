"use client";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Boxes, Building, Feather, Hash, Loader, Scale } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { useGetAreas } from "../../area/hooks/use-areas";
import { useEffect } from "react";
import CharacterProgress from "@/common/components/form/character-progress";
import { Textarea } from "@/common/components/ui/textarea";
import { useCreateUnit } from "../hooks/use-units";
import { unitDefaultValues, unitSchema, UnitSchema, UnitSchemaLimit } from "../schemas/unit-schema";
import { showFormError } from "@/common/lib/show-form-error";
import FormDialog from "@/common/components/form/form-dialog";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import { TextInput } from "@/common/components/form/text-input";
import { TextAreaInput } from "@/common/components/form/text-area-input";
import SearchableSelect from "@/common/components/form/searchable-select";
import { NumberInput } from "@/common/components/form/number-input";

type Props = { open: boolean; onClose: () => void; areaId?: number };
export default function CreateUnitDialog({ open, onClose, areaId }: Props) {
    const { mutateAsync: createUnit, isPending: isCreating } = useCreateUnit();
    const { data: areas, isLoading: areasLoading } = useGetAreas(open);
    const { register, handleSubmit, reset, control, watch, formState: { isSubmitting, isDirty } } = useForm<UnitSchema>({
        resolver: zodResolver(unitSchema),
        defaultValues: unitDefaultValues
    });

    useEffect(() => {
        if (!open || !areaId) return;
        reset({ ...unitDefaultValues, areaId: areaId })
    }, [open, areaId, reset]);

    const loading = isCreating || areasLoading || isSubmitting;
    const onSubmit = async (formData: UnitSchema) => {
        try {
            const res = await createUnit(formData);
            toast.success(res.message ?? "Unit created successfully.");
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
            title="Create Unit"
            description="Create a unit entity."
            submitDisabled={!isDirty}
            submitLabel="Create"
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