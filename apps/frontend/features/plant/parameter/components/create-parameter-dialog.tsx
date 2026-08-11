"use client";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gauge, Ruler } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetUomTypes } from "@/features/common/hooks/useMetadata";
import { parameterDefaultValues, parameterSchema, ParameterSchema, ParameterSchemaLimit } from "../schemas/parameter-schema";
import { useCreateParameter } from "../hooks/use-parameters";
import FormDialog from "@/common/components/form/form-dialog";
import { TextInput } from "@/common/components/form/text-input";
import SearchableSelect from "@/common/components/form/searchable-select";
import { showFormError } from "@/common/lib/show-form-error";


type Props = { open: boolean; onClose: () => void; };
export default function CreateParameterDialog({ open, onClose }: Props) {
    const { mutateAsync: createParameter, isPending: isCreating } = useCreateParameter();
    const { data: uomTypes, isLoading: uomTypesIsLoading } = useGetUomTypes(open);
    const { register, handleSubmit, reset, control, watch, setValue, formState: { isSubmitting, isDirty } } = useForm<ParameterSchema>({
        resolver: zodResolver(parameterSchema),
        defaultValues: parameterDefaultValues,
    });
    const loading = isCreating || isSubmitting || uomTypesIsLoading;
    const onSubmit = async (formData: ParameterSchema) => {
        try {
            const res = await createParameter(formData);
            toast.success(res.message ?? "Parameter created successfully.");
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
            title="Create Parameter"
            description="Create a parameter entity."
            submitDisabled={!isDirty}
            submitLabel="Create"
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