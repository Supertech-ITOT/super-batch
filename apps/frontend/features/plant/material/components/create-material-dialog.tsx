"use client";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Feather, Hash, PackageCheckIcon, PackageSearch } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetMaterialTypes } from "@/features/common/hooks/useMetadata";
import { materialDefaultValues, materialSchema, MaterialSchema, MaterialSchemaLimit } from "../schemas/material-schema";
import { useCreateMaterial } from "../hooks/use-materials";
import FormDialog from "@/common/components/form/form-dialog";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import { TextInput } from "@/common/components/form/text-input";
import { TextAreaInput } from "@/common/components/form/text-area-input";
import SearchableSelect from "@/common/components/form/searchable-select";
import { showFormError } from "@/common/lib/show-form-error";

type Props = { open: boolean; onClose: () => void; };
export default function CreateMaterialDialog({ open, onClose }: Props) {
    const { mutateAsync: createMaterial, isPending: isCreating } = useCreateMaterial();
    const { data: materialTypes, isLoading: materialTypeIsLoading } = useGetMaterialTypes(open);
    const { register, handleSubmit, reset, control, watch, formState: { isSubmitting, isDirty } } = useForm<MaterialSchema>({
        resolver: zodResolver(materialSchema),
        defaultValues: materialDefaultValues,
    });
    const loading = isCreating || isSubmitting || materialTypeIsLoading;
    const onSubmit = async (formData: MaterialSchema) => {
        try {
            const res = await createMaterial(formData);
            toast.success(res.message ?? "Material created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset(materialDefaultValues);
        onClose();
    };
    const onInvalid = (errors: FieldErrors<MaterialSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Create Material"
            description="Create a material entity."
            submitDisabled={!isDirty}
            submitLabel="Create"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            icon={PackageCheckIcon}
        >
            <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <TextInput
                        label="Name"
                        counter
                        maxCharacters={MaterialSchemaLimit.name.max}
                        icon={PackageCheckIcon}
                        placeholder="Material Name"
                        maxLength={MaterialSchemaLimit.name.max}
                        disabled={loading}
                        value={watch("name")}
                        {...register("name")}
                    />
                    <TextInput
                        label="Code"
                        counter
                        maxCharacters={MaterialSchemaLimit.code.max}
                        icon={Hash}
                        placeholder="Material Code"
                        maxLength={MaterialSchemaLimit.code.max}
                        disabled={loading}
                        value={watch("code")}
                        {...register("code")}
                    />
                </div>
                <TextAreaInput
                    label="Description"
                    placeholder="Brief Material Overview"
                    icon={Feather}
                    counter
                    maxCharacters={MaterialSchemaLimit.description.max}
                    maxLength={MaterialSchemaLimit.description.max}
                    value={watch("description")}
                    disabled={loading}
                    {...register("description")}
                />
                <Controller
                    control={control}
                    name="materialType"
                    render={({ field }) => (
                        <SearchableSelect
                            value={field.value}
                            icon={PackageSearch}
                            label="Type"
                            onChange={field.onChange}
                            options={materialTypes?.map((a) => ({
                                value: a.value,
                                label: a.label,
                            })) ?? []}
                            placeholder="Select Material Type"
                            searchPlaceholder="Search Material Type..."
                            disabled={loading}
                        />
                    )}
                />
            </div>
        </FormDialog>
    );
}