import { Controller, FieldErrors, useForm } from "react-hook-form";
import { useGetRecipeById, useUpdateRecipe } from "../hooks/use-recipe";
import { RecipeSchemaLimit, updateRecipeSchema, UpdateRecipeSchema } from "../schemas/recipe-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Label } from "@/common/components/ui/label";
import CharacterProgress from "@/common/components/form/character-progress";
import { Input } from "@/common/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Button } from "@/common/components/ui/button";
import { Loader } from "lucide-react";
import { useGetUnits } from "@/features/plant/unit/hooks/use-units";
import { useGetMaterials } from "@/features/plant/material/hooks/use-materials";
import { useGetRecipeStatusTypes } from "@/features/common/hooks/useMetadata";
import { Textarea } from "@/common/components/ui/textarea";
import { MaterialType } from "@/features/plant/material/types/material.types";

type Props = { open: boolean; onClose: () => void; recipeId: number };
export default function UpdateRecipeDialog({ open, onClose, recipeId }: Props) {
    const { data: recipe, isLoading: recipeIsLoading } = useGetRecipeById(recipeId);
    const { mutateAsync: updateRecipeMutation, isPending: isUpdating } = useUpdateRecipe();
    const { data: units, isLoading: isLoadingUnits } = useGetUnits();
    const { data: materials, isLoading: isLoadingMaterials } = useGetMaterials();
    const { data: recipeStatus, isLoading: isLoadingRecipeStatus } = useGetRecipeStatusTypes();
    const { register, handleSubmit, reset, watch, control, formState: { isSubmitting, isDirty } } = useForm<UpdateRecipeSchema>({
        resolver: zodResolver(updateRecipeSchema),
        defaultValues: { name: "", description: "", batchSize: "", materialId: "", status: "" }
    });
    const loading = isSubmitting || isUpdating || isLoadingMaterials || isLoadingUnits || isLoadingRecipeStatus || recipeIsLoading;

    useEffect(() => {
        if (loading || !recipe)
            return;
        reset({ name: recipe.name, description: recipe.description, batchSize: String(recipe.batchSize), materialId: String(recipe.materialRecipeResponse.id), status: recipe.status });
    }, [recipe, reset])

    const selectedUnitMaxRange = recipe?.unitRecipeResponse.capacity;
    const onSubmit = async (formData: UpdateRecipeSchema) => {
        if (!selectedUnitMaxRange) return;
        if (Number(formData.batchSize) > selectedUnitMaxRange) {
            toast.error(`Batch size must be under unit capacity - ${selectedUnitMaxRange}kg`)
            return;
        }
        try {
            const res = await updateRecipeMutation({
                id: recipeId,
                data: {
                    name: formData.name,
                    description: formData.description,
                    batchSize: Number(formData.batchSize),
                    materialId: Number(formData.materialId),
                    status: formData.status,
                },
            });
            toast.success(res.message ?? "Recipe updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset({ name: "", description: "", batchSize: "", materialId: "", status: "" });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<UpdateRecipeSchema>) => {
        const firstError = Object.values(errors)[0];
        if (firstError?.message) {
            toast.error(firstError.message.toString());
        }
    };
    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose(); }}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                    <DialogHeader>
                        <DialogTitle>Update Recipe</DialogTitle>
                        <DialogDescription>Update a new recipe.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Name</Label>
                                <CharacterProgress value={watch("name")} max={RecipeSchemaLimit.name.max} />
                            </div>
                            <Input
                                type="text"
                                disabled={loading}
                                placeholder="Solvent Blend Recipe"
                                maxLength={RecipeSchemaLimit.name.max}
                                {...register("name")}
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Description</Label>
                                <CharacterProgress value={watch("description")} max={RecipeSchemaLimit.description.max} />
                            </div>
                            <Textarea
                                placeholder="Brief recipe overview"
                                className="min-h-28 resize-none"
                                maxLength={RecipeSchemaLimit.description.max}
                                disabled={loading}
                                {...register("description")}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="relative space-y-2">
                                <Label>Unit</Label>
                                <Input
                                    type="text"
                                    readOnly
                                    disabled
                                    value={recipe?.unitRecipeResponse.name}
                                />
                            </div>
                            <div className="space-y-2 relative">
                                <div className="flex items-center justify-between">
                                    <Label>Batch Size</Label>
                                </div>
                                <div className="flex">
                                    <Input
                                        type="number"
                                        placeholder={selectedUnitMaxRange ? `0 - ${selectedUnitMaxRange}` : "0"}
                                        className="rounded-r-none"
                                        {...register("batchSize")}
                                    />
                                    <div className="flex items-center justify-center w-12 border border-l-0 rounded-r-md bg-muted text-sm">
                                        KG
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex gap-2">

                            <div className="relative flex-1 space-y-2">
                                <Label>Product</Label>
                                <Controller
                                    control={control}
                                    name="materialId"
                                    render={({ field }) => (
                                        <Select
                                            disabled={loading || isLoadingMaterials}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Product" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectGroup>
                                                    {materials?.filter((f) => f.materialType === MaterialType.FINISHED_PRODUCT).map((material) => (
                                                        <SelectItem key={material.id} value={String(material.id)}>
                                                            {material.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div className="relative flex-1 space-y-2">
                                <Label>Status</Label>
                                <Controller
                                    control={control}
                                    name="status"
                                    render={({ field }) => (
                                        <Select
                                            disabled={loading}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {recipeStatus?.map((recipeStatus) => (
                                                        <SelectItem
                                                            key={recipeStatus.value}
                                                            value={String(recipeStatus.value)}
                                                        >
                                                            <div
                                                                className={`h-2 w-2 rounded-full ${recipeStatus.value === "RELEASED"
                                                                    ? "bg-green-500"
                                                                    : "bg-gray-500"
                                                                    }`}
                                                            />
                                                            {recipeStatus.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Update"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )


}