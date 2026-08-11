"use client";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gauge, Ruler } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetUomTypes } from "@/features/common/hooks/useMetadata";
import { parameterDefaultValues, parameterSchema, ParameterSchema, ParameterSchemaLimit } from "../schemas/parameter-schema";
import { useEffect } from "react";
import { useGetParameterById, useUpdateParameter } from "../hooks/use-parameters";
import { showFormError } from "@/common/lib/show-form-error";
import FormDialog from "@/common/components/form/form-dialog";
import { TextInput } from "@/common/components/form/text-input";
import SearchableSelect from "@/common/components/form/searchable-select";

type Props = { open: boolean; onClose: () => void; parameterId?: number };
export default function UpdateParameterDialog({ open, onClose, parameterId }: Props) {
    const { mutateAsync: updateParameter, isPending: isUpdating } = useUpdateParameter();
    const { data: parameter, isLoading: parameterIsLoading } = useGetParameterById(parameterId);
    const { data: uomTypes, isLoading: uomTypesIsLoading } = useGetUomTypes(open);
    const { register, handleSubmit, reset, control, watch, formState: { isSubmitting, isDirty } } = useForm<ParameterSchema>({
        resolver: zodResolver(parameterSchema),
        defaultValues: parameterDefaultValues,
    });

    useEffect(() => {
        if (!open || !parameter) return;
        reset({
            name: parameter.name,
            uom: parameter.uom.value,
        });
    }, [open, parameter, reset]);

    const loading = isUpdating || isSubmitting || uomTypesIsLoading || parameterIsLoading;
    const onSubmit = async (formData: ParameterSchema) => {
        try {
            const res = await updateParameter({
                id: parameterId!, data: formData
            });
            toast.success(res.message ?? "Parameter updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset(parameterDefaultValues);
        onClose();
    };
    const onInvalid = (errors: FieldErrors<ParameterSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Update Parameter"
            description="Update a parameter entity."
            submitDisabled={!isDirty}
            submitLabel="Update"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            icon={Gauge}
        >
            <div className="space-y-2">
                <TextInput
                    label="Name"
                    counter
                    maxCharacters={ParameterSchemaLimit.name.max}
                    icon={Gauge}
                    placeholder="Parameter Name"
                    maxLength={ParameterSchemaLimit.name.max}
                    disabled={loading}
                    value={watch("name")}
                    {...register("name")}
                />
                <Controller
                    control={control}
                    name="uom"
                    render={({ field }) => (
                        <SearchableSelect
                            value={field.value}
                            icon={Ruler}
                            label="Uom"
                            onChange={field.onChange}
                            options={uomTypes?.map((a) => ({
                                value: a.value,
                                label: a.label,
                            })) ?? []}
                            placeholder="Select Uom Type"
                            searchPlaceholder="Search Uom Type..."
                            disabled={loading}
                        />
                    )}
                />
            </div>
        </FormDialog>
    );
}