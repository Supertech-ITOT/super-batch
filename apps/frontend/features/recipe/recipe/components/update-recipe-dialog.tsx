import { Controller, FieldErrors, useForm } from "react-hook-form";
import { useGetRecipeById, useUpdateRecipe } from "../hooks/use-recipe";
import { recipeDefaultValues, RecipeSchemaLimit, updateRecipeSchema, UpdateRecipeSchema } from "../schemas/recipe-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { BookOpenText, Boxes, CircleDot, Feather, Loader, PackageCheck, Scale } from "lucide-react";
import { useGetMaterials } from "@/features/plant/material/hooks/use-materials";
import { useGetRecipeStatusTypes } from "@/features/common/hooks/useMetadata";
import { MaterialType } from "@/features/plant/material/types/material.types";
import SearchableSelect from "@/common/components/form/searchable-select";
import { NumberInput } from "@/common/components/form/number-input";
import { TextAreaInput } from "@/common/components/form/text-area-input";
import { TextInput } from "@/common/components/form/text-input";
import FormDialog from "@/common/components/form/form-dialog";
import { showFormError } from "@/common/lib/show-form-error";

type Props = { open: boolean; onClose: () => void; recipeId: number };
export default function UpdateRecipeDialog({ open, onClose, recipeId }: Props) {
    const { data: recipe, isLoading: recipeIsLoading } = useGetRecipeById(recipeId);
    const { mutateAsync: updateRecipeMutation, isPending: isUpdating } = useUpdateRecipe();
    const { data: materials, isLoading: isLoadingMaterials } = useGetMaterials();
    const { data: recipeStatus, isLoading: isLoadingRecipeStatus } = useGetRecipeStatusTypes();
    const { register, handleSubmit, reset, watch, control, formState: { isSubmitting, isDirty } } = useForm<UpdateRecipeSchema>({
        resolver: zodResolver(updateRecipeSchema),
        defaultValues: recipeDefaultValues,
    });
    const loading = isSubmitting || isUpdating || isLoadingMaterials || isLoadingRecipeStatus || recipeIsLoading;

    useEffect(() => {
        if (loading || !recipe)
            return;
        reset({ ...recipeDefaultValues, name: recipe.name, description: recipe.description, batchSize: recipe.batchSize, materialId: recipe.materialRecipeResponse.id, status: recipe.status });
    }, [recipe, reset])

    const selectedUnitMaxRange = recipe?.unitRecipeResponse?.capacity ?? 0;
    const onSubmit = async (formData: UpdateRecipeSchema) => {
        if (!selectedUnitMaxRange) return;
        if (Number(formData.batchSize) > selectedUnitMaxRange) {
            toast.error(`Batch size must be under unit capacity - ${selectedUnitMaxRange}kg`)
            return;
        }
        try {
            const res = await updateRecipeMutation({ id: recipeId, data: formData });
            toast.success(res.message ?? "Recipe updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset(recipeDefaultValues);
        onClose();
    };
    const onInvalid = (errors: FieldErrors<UpdateRecipeSchema>) => {
        toast.error(showFormError(errors));
    };
    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Update Recipe"
            description="Update a new recipe."
            submitDisabled={!isDirty}
            submitLabel="Update"
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
                    <TextInput
                        label="Unit"
                        icon={Boxes}
                        readOnly
                        value={recipe?.unitRecipeResponse?.name ?? ""}
                        disabled
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