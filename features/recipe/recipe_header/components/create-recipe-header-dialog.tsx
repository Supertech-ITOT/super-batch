import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeHeaderSchema, RecipeSchema, RecipeHeaderSchemaLimit } from "../schemas/recipe-header-schema";
import { useCreateRecipeHeader } from "../hooks/use-recipe-header";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { Label } from "@/common/components/ui/label";
import CharacterProgress from "@/common/components/form/character-progress";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Button } from "@/common/components/ui/button";
import { Loader } from "lucide-react";
import { useGetMaterials } from "@/features/plant/material/hooks/use-materials";
import { useGetUnits } from "@/features/plant/unit/hooks/use-units";

type Props = { open: boolean; onClose: () => void; };
export default function CreateRecipeHeaderDialog({ open, onClose }: Props) {
    const { mutateAsync: createRecipe, isPending: isCreating } = useCreateRecipeHeader();
    const { data: units, isLoading: isLoadingUnits } = useGetUnits();
    const { data: materials, isLoading: isLoadingMaterials } = useGetMaterials();
    const { register, handleSubmit, reset, watch, control, formState: { isSubmitting, isDirty } } = useForm<RecipeSchema>({
        resolver: zodResolver(recipeHeaderSchema),
        defaultValues: { name: "", description: "", batchSize: "", materialId: "", unitId: "", status: "" }
    });
    const loading = isSubmitting || isCreating || isLoadingMaterials || isLoadingUnits;

    const onSubmit = async (formData: RecipeSchema) => {
        try {
            const res = await createRecipe({
                name: formData.name,
                description: formData.description,
                batchSize: Number(formData.batchSize),
                materialId: Number(formData.materialId),
                unitId: Number(formData.unitId),
                status: formData.status,


            });
            toast.success(res.message ?? "Recipe created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    }
    const handleClose = () => {
        reset({ name: "", description: "", batchSize: "", materialId: "", unitId: "", status: "" });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<RecipeSchema>) => {
        const firstError = Object.values(errors)[0];
        if (firstError?.message) {
            toast.error(firstError.message.toString());
        }
    };
    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose() }}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                    <DialogHeader>
                        <DialogTitle>Create Recipe</DialogTitle>
                        <DialogDescription>Create a new recipe.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Name</Label>
                                <CharacterProgress value={watch("name")} max={RecipeHeaderSchemaLimit.name.max} />
                            </div>
                            <Input
                                type="text"
                                disabled={loading}
                                placeholder="Solvent Blend Recipe"
                                maxLength={RecipeHeaderSchemaLimit.name.max}
                                {...register("name")}
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Description</Label>
                                <CharacterProgress value={watch("description")} max={RecipeHeaderSchemaLimit.description.max} />
                            </div>
                            <Textarea
                                placeholder="Brief role overview"
                                className="min-h-28 resize-none"
                                maxLength={RecipeHeaderSchemaLimit.description.max}
                                disabled={loading}
                                {...register("description")}
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <Label>Batch Size</Label>

                            <Input
                                type="number"
                                disabled={loading}
                                placeholder="1000"
                                {...register("batchSize", {
                                    valueAsNumber: true,
                                })}
                            />
                        </div>
                        <div className="relative space-y-2">
                            <Label>Material</Label>
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
                                            <SelectValue placeholder="Select Material" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                {materials?.map((material) => (
                                                    <SelectItem
                                                        key={material.id}
                                                        value={String(material.id)}
                                                    >
                                                        {material.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="relative space-y-2">
                            <Label>Unit</Label>

                            <Controller
                                control={control}
                                name="unitId"
                                render={({ field }) => (
                                    <Select
                                        disabled={loading}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Unit" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                {units?.map((unit) => (
                                                    <SelectItem
                                                        key={unit.id}
                                                        value={String(unit.id)}
                                                    >
                                                        {unit.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="relative space-y-2">
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
                                                <SelectItem value="ACTIVE">
                                                    Active
                                                </SelectItem>

                                                <SelectItem value="INACTIVE">
                                                    Inactive
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Create Recipe"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}