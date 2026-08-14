"use client";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRecipeSchema, createRecipeSchema, recipeDefaultValues, RecipeSchemaLimit } from "../schemas/recipe-schema";
import { useCreateRecipe } from "../hooks/use-recipe";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { BookOpenText, Boxes, Circle, CircleDot, Feather, PackageCheck, Scale } from "lucide-react";
import { useGetMaterials } from "@/features/plant/material/hooks/use-materials";
import { useGetUnits } from "@/features/plant/unit/hooks/use-units";
import { useGetRecipeStatusTypes } from "@/features/common/hooks/useMetadata";
import { MaterialType } from "@/features/plant/material/types/material.types";
import { TextInput } from "@/common/components/form/text-input";
import { TextAreaInput } from "@/common/components/form/text-area-input";
import SearchableSelect from "@/common/components/form/searchable-select";
import { NumberInput } from "@/common/components/form/number-input";
import FormDialog from "@/common/components/form/form-dialog";
import { showFormError } from "@/common/lib/show-form-error";

type Props = { open: boolean; onClose: () => void; };
export default function CreateRecipeDialog({ open, onClose }: Props) {
    const { mutateAsync: createRecipe, isPending: isCreating } = useCreateRecipe();
    const { data: units, isLoading: isLoadingUnits } = useGetUnits();
    const { data: materials, isLoading: isLoadingMaterials } = useGetMaterials();
    const { data: recipeStatus, isLoading: isLoadingRecipeStatus } = useGetRecipeStatusTypes();
    const { register, handleSubmit, reset, watch, control, formState: { isSubmitting, isDirty } } = useForm<CreateRecipeSchema>({
        resolver: zodResolver(createRecipeSchema),
        defaultValues: recipeDefaultValues,
    });
    const loading = isSubmitting || isCreating || isLoadingMaterials || isLoadingUnits || isLoadingRecipeStatus;
    const selectedUnitId = watch("unitId");
    const selectedUnitMaxRange = units?.find((unit) => unit.id === Number(selectedUnitId))?.capacity;

    const onSubmit = async (formData: CreateRecipeSchema) => {
        if (!selectedUnitMaxRange) return;
        if (Number(formData.batchSize) > selectedUnitMaxRange) {
            toast.error(`Batch size must be under unit capacity - ${selectedUnitMaxRange}kg`)
            return;
        }
        try {
            const res = await createRecipe(formData);
            toast.success(res.message ?? "Recipe created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    }
    const handleClose = () => {
        reset(recipeDefaultValues);
        onClose();
    };
    const onInvalid = (errors: FieldErrors<CreateRecipeSchema>) => {
        toast.error(showFormError(errors));
    };
    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Create Recipe"
            description="Create a new recipe."
            submitDisabled={!isDirty}
            submitLabel="Create"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            icon={BookOpenText}
        >
            <div className="space-y-2">
                <TextInput
                    label="Name"
                    icon={BookOpenText}
                    counter
                    maxCharacters={RecipeSchemaLimit.name.max}
                    placeholder="Recipe Name"
                    maxLength={RecipeSchemaLimit.name.max}
                    disabled={loading}
                    value={watch("name")}
                    {...register("name")}
                />
                <TextAreaInput
                    label="Description"
                    icon={Feather}
                    counter
                    maxCharacters={RecipeSchemaLimit.description.max}
                    placeholder="Brief Recipe Overview"
                    maxLength={RecipeSchemaLimit.description.max}
                    disabled={loading}
                    value={watch("description")}
                    {...register("description")}
                />
                <div className="grid grid-cols-2 gap-2">
                    <Controller
                        control={control}
                        name="unitId"
                        render={({ field }) => (
                            <SearchableSelect
                                label="Unit"
                                value={field.value}
                                icon={Boxes}
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
                        label="Batch Size"
                        icon={Scale}
                        suffix="KG"
                        placeholder={selectedUnitMaxRange ? `0 - ${selectedUnitMaxRange}` : "0"}
                        disabled={loading}
                        value={watch("batchSize")}
                        {...register("batchSize", {
                            valueAsNumber: true,
                        })}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Controller
                        control={control}
                        name="materialId"
                        render={({ field }) => (
                            <SearchableSelect
                                label="Product"
                                value={field.value}
                                icon={PackageCheck}
                                onChange={field.onChange}
                                options={materials?.filter((f) => f.materialType === MaterialType.FINISHED_PRODUCT).map((a) => ({
                                    value: a.id,
                                    label: a.name,
                                })) ?? []}
                                placeholder="Select Product"
                                searchPlaceholder="Search Products..."
                                disabled={loading}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                            <SearchableSelect
                                label="Status"
                                value={field.value}
                                icon={CircleDot}
                                onChange={field.onChange}
                                options={recipeStatus?.map((a) => ({
                                    value: a.value,
                                    label: a.label,
                                })) ?? []}
                                placeholder="Select Status"
                                searchPlaceholder="Search Status..."
                                disabled={loading}
                            />
                        )}
                    />
                </div>
            </div>
        </FormDialog>
    )
}