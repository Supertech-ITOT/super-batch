import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { Label } from "@/common/components/ui/label";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { Loader } from "lucide-react";
import { useGetMaterials } from "@/features/plant/material/hooks/use-materials";
import { useGetUnits } from "@/features/plant/unit/hooks/use-units";
import { MaterialType } from "@/features/plant/material/types/material.types";
import { useCreateControlRecipe } from "../hooks/use-control-recipe";
import { createControlRecipeSchema, CreateControlRecipeSchema } from "../schemas/control-recipe-schema";
import SearchableSelect from "@/common/components/form/searchable-select";
import { useEffect, useState } from "react";
import DatetimePicker from "@/common/components/form/datetime-picker";
import UserSelect from "@/common/components/form/user-select";
import { useGetUser } from "@/features/manager/user/hooks/use-user";
import { Skeleton } from "@/common/components/ui/skeleton";
import { useGetRecipes } from "@/features/recipe/recipe/hooks/use-recipe";

type Props = { open: boolean; onClose: () => void; };
export default function CreateControlRecipeDialog({ open, onClose }: Props) {
    const [unitId, setUnitId] = useState<number>();
    const [materialId, setMaterialId] = useState<number>();
    const { mutateAsync: createControlRecipe, isPending: isCreating } = useCreateControlRecipe();
    const { data: units, isLoading: isLoadingUnits } = useGetUnits();
    const { data: materials, isLoading: isLoadingMaterials } = useGetMaterials();
    const { data: users, isLoading: isLoadingUsers } = useGetUser();
    const { data: masterRecipes, isLoading: isLoadingMasterRecipes } = useGetRecipes();
    const { register, handleSubmit, reset, watch, control, setValue, formState: { isSubmitting, isDirty } } = useForm<CreateControlRecipeSchema>({
        resolver: zodResolver(createControlRecipeSchema),
        defaultValues: { batchNo: "", batchSize: "", recipeId: 0, scheduledAt: "", shiftInchargeId: 0 }
    });
    const loading = isSubmitting ||
        isCreating || isLoadingMaterials ||
        isLoadingUnits || isLoadingUsers ||
        !users || !units || !materials ||
        isLoadingMasterRecipes || !masterRecipes;
    const selectedUnitMaxRange = units?.find((unit) => unit.id === Number(unitId))?.capacity;
    const masterRecipesOptions = masterRecipes?.filter((f) => f.unitRecipeResponse.id === unitId && f.materialRecipeResponse.id === materialId);
    const selectedMasterRecipeId = watch("recipeId");
    const defaultBatchSize = masterRecipes?.find((f) => f.id === selectedMasterRecipeId)?.batchSize;

    useEffect(() => {
        if (!selectedMasterRecipeId) return;
        setValue("batchSize", String(defaultBatchSize));
    }, [selectedMasterRecipeId]);

    const onSubmit = async (formData: CreateControlRecipeSchema) => {
        if (!selectedUnitMaxRange) return;
        if (Number(formData.batchSize) > selectedUnitMaxRange) {
            toast.error(`Batch size must be under unit capacity - ${selectedUnitMaxRange}kg`)
            return;
        }
        try {
            const res = await createControlRecipe({ ...formData, batchSize: Number(formData.batchSize) });
            toast.success(res.message ?? "Batch scheduled successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    }
    const handleClose = () => {
        reset({ batchNo: "", batchSize: "", recipeId: 0, scheduledAt: "", shiftInchargeId: 0 });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<CreateControlRecipeSchema>) => {
        const firstError = Object.values(errors)[0];
        if (firstError?.message) {
            toast.error(firstError.message.toString());
        }
    };
    if (loading) {
        return <Skeleton className="h-full" />;
    }

    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose() }}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                    <DialogHeader>
                        <DialogTitle>Create Batch Schedule</DialogTitle>
                        <DialogDescription>
                            Configure the batch details and production schedule.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Batch No</Label>
                            </div>
                            <div className="flex">
                                <Input
                                    type="text"
                                    placeholder="LOT_88"
                                    {...register("batchNo")}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="min-w-0 flex-1 space-y-2">
                                <Label>Unit</Label>
                                <SearchableSelect
                                    value={unitId}
                                    onChange={setUnitId}
                                    options={
                                        units.map((u) => ({
                                            value: u.id,
                                            label: u.name,
                                        }))
                                    }
                                    placeholder="Select"
                                    searchPlaceholder="Search Unit..."
                                    disabled={loading}
                                />
                            </div>
                            <div className="min-w-0 flex-1 space-y-2">
                                <Label>Product</Label>
                                <SearchableSelect
                                    value={materialId}
                                    onChange={setMaterialId}
                                    options={
                                        materials.filter((m) => m.materialType === MaterialType.FINISHED_PRODUCT)
                                            .map((m) => ({
                                                value: m.id,
                                                label: m.name,
                                            }))
                                    }
                                    placeholder="Select"
                                    searchPlaceholder="Search Product..."
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="min-w-0 space-y-2">
                            <Label>Master Recipe</Label>
                            <Controller
                                control={control}
                                name="recipeId"
                                render={({ field }) => (
                                    <SearchableSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={masterRecipesOptions?.map((m) => ({
                                            value: m.id,
                                            label: m.name,
                                        })) ?? []}
                                        placeholder="Select"
                                        searchPlaceholder="Search Transition..."
                                        disabled={loading}
                                    />
                                )}
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
                                    {...register("batchSize")}
                                    className="rounded-r-none"
                                />
                                <div className="flex items-center justify-center w-12 border border-l-0 rounded-r-md bg-muted text-sm">
                                    KG
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Schedule At</Label>
                            <Controller
                                name="scheduledAt"
                                control={control}
                                render={({ field }) => (
                                    <DatetimePicker
                                        disabledDates={{ before: new Date() }}
                                        className="bg-card"
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="DD MM YY HH:MM:SS"
                                        disabled={loading}
                                    />
                                )}
                            />
                        </div>
                        <div className="min-w-0  space-y-2">
                            <Label>Shift Incharge</Label>
                            <Controller
                                control={control}
                                name="shiftInchargeId"
                                render={({ field }) => (
                                    <UserSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={
                                            users.map((u) => ({
                                                id: u.id,
                                                name: u.name,
                                                email: u.email,
                                                role: u.roleName
                                            }))
                                        }
                                        placeholder="Select"
                                        searchPlaceholder="Search Users..."
                                        disabled={loading}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Create"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}