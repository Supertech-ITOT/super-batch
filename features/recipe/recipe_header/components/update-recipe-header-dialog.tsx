import { Controller, FieldErrors, useForm } from "react-hook-form";
import { useGetRecipeHeaderById, useUpdateRecipeHeader } from "../hooks/use-recipe-header";
import { recipeHeaderSchema, RecipeSchema, RecipeHeaderSchemaLimit } from "../schemas/recipe-header-schema";
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

type Props = { open: boolean; onClose: () => void; recipeHeaderId: number };
export default function UpdateRecipeDialog({ open, onClose, recipeHeaderId }: Props) {
    const { mutateAsync: updateRecipeMutation, isPending: isCreating } = useUpdateRecipeHeader();
    const { data: recipe, isLoading: recipeIsLoading } = useGetRecipeHeaderById(recipeHeaderId);
    const { register, handleSubmit, reset, watch, control, formState: { isSubmitting, isDirty } } = useForm<RecipeSchema>({
        resolver: zodResolver(recipeHeaderSchema),
        defaultValues: { name: "", description: "", batchSize: 0, batchSizeUom: "", }
    });
    const loading = isCreating || isSubmitting || recipeIsLoading;
    useEffect(() => {
        if (loading || !recipe)
            return;
        reset({ name: recipe.name, description: recipe.description, batchSize: recipe.batchSize, batchSizeUom: recipe.batchSizeUom, });
    }, [recipe, reset])
    const onSubmit = async (formData: RecipeSchema) => {
        try {
            const res = await updateRecipeMutation({
                id: recipeHeaderId,
                data: {
                    name: formData.name, description: formData.description, batchSize: formData.batchSize, batchSizeUom: formData.batchSizeUom,
                },
            });
            toast.success(res.message ?? "Recipe updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset({ name: "", description: "", batchSize: 0, batchSizeUom: "" });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<RecipeSchema>) => {
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
                                <CharacterProgress value={watch("name")} max={RecipeHeaderSchemaLimit.name.max} />
                            </div>
                            <Input
                                type="text"
                                disabled={loading}
                                placeholder="Jhon"
                                maxLength={RecipeHeaderSchemaLimit.name.max}
                                {...register("name")}
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Description</Label>
                                <CharacterProgress value={watch("description")}
                                    max={RecipeHeaderSchemaLimit.description.max} />
                            </div>
                            <Input
                                disabled={loading}
                                placeholder="Recipe description"
                                maxLength={RecipeHeaderSchemaLimit.description.max}
                                {...register("description")}
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <Label>Batch Size</Label>
                            <Input
                                type="number" disabled={loading}
                                {...register("batchSize",
                                    { valueAsNumber: true, }
                                )}
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <Label>
                                Batch Size UOM
                            </Label>

                            <Controller control={control} name="batchSizeUom"
                                render={({ field, }) => (
                                    <Select
                                        disabled={loading}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="h-10 w-full">
                                            <SelectValue placeholder="Select UOM" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="KG"> KG </SelectItem>
                                                <SelectItem value="PERCENT">%</SelectItem>
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
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Update Recipe"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )


}