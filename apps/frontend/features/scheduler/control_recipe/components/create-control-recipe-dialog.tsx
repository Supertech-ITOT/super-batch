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
import { useCreateControlRecipe, useRecipeEquipmentMapping } from "../hooks/use-control-recipe";
import { createControlRecipeSchema, CreateControlRecipeSchema } from "../schemas/control-recipe-schema";
import SearchableSelect from "@/common/components/form/searchable-select";
import { useEffect, useState } from "react";
import DatetimePicker from "@/common/components/form/datetime-picker";
import UserSelect from "@/common/components/form/user-select";
import { useGetUser } from "@/features/manager/user/hooks/use-user";
import { Skeleton } from "@/common/components/ui/skeleton";
import { useGetRecipeById, useGetRecipes } from "@/features/recipe/recipe/hooks/use-recipe";
import { EquipmentMappingResponse } from "../types/control-recipe.types";
import EquipmentMapping from "./equipment-mapping";
import { useGetEquipmentsByUnitId } from "@/features/plant/equipment/hooks/use-equipment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";


type Tab = "details" | "mapping";
type Props = { open: boolean; onClose: () => void; };
export default function CreateControlRecipeDialog({ open, onClose }: Props) {
    const [tab, setTab] = useState<Tab>("details");
    const [equipmentMappings, setEquipmentMappings] = useState<EquipmentMappingResponse[]>([]);
    const [materialId, setMaterialId] = useState<number>();
    const { mutateAsync: createControlRecipe, isPending: isCreating } = useCreateControlRecipe();
    const { data: units, isLoading: isLoadingUnits } = useGetUnits();
    const { data: materials, isLoading: isLoadingMaterials } = useGetMaterials();
    const { data: users, isLoading: isLoadingUsers } = useGetUser();
    const { data: masterRecipes, isLoading: isLoadingMasterRecipes } = useGetRecipes();
    const { register, handleSubmit, reset, watch, control, setValue, formState: { isSubmitting, isDirty } } = useForm<CreateControlRecipeSchema>({
        resolver: zodResolver(createControlRecipeSchema),
        defaultValues: { batchNo: "", batchSize: "", recipeId: 0, unitId: 0, scheduledAt: "", shiftInchargeId: 0, equipmentMappings: [], }
    });

    const loading = isSubmitting ||
        isCreating || isLoadingMaterials ||
        isLoadingUnits || isLoadingUsers ||
        !users || !units || !materials ||
        isLoadingMasterRecipes || !masterRecipes;

    const selectedUnitId = watch("unitId");
    const selectedMasterRecipeId = watch("recipeId");
    const selectedUnitMaxRange = units?.find((unit) => unit.id === Number(selectedUnitId))?.capacity;
    const defaultBatchSize = masterRecipes?.find((f) => f.id === selectedMasterRecipeId)?.batchSize;
    const masterRecipesOptions = masterRecipes?.filter((f) => f.materialRecipeResponse.id === materialId);
    const { data: mapping, isLoading: isLoadingMapping } = useRecipeEquipmentMapping(selectedMasterRecipeId, selectedUnitId);
    const { data: masterRecipe, isLoading: isLoadingMasterRecipe } = useGetRecipeById(selectedMasterRecipeId);
    const { data: equipmentOpt, isLoading: isLoadingEquipmentOpt } = useGetEquipmentsByUnitId(selectedUnitId);
    const isMapping = !!masterRecipe && masterRecipe.unitRecipeResponse.id !== selectedUnitId;

    useEffect(() => {
        if (!mapping) return;
        setEquipmentMappings(mapping);
    }, [mapping]);

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
        if (isMapping && equipmentMappings.length === 0) {
            toast.error("Please map all equipments.");
            return;
        }

        if (isMapping && equipmentMappings.some((m) => m.mappedEquipmentId == null)) {
            toast.error("Please map all equipments.");
            return;
        }

        const payload = {
            ...formData,
            batchSize: Number(formData.batchSize),
            equipmentMappings: isMapping
                ? equipmentMappings.map((m) => ({
                    recipeEquipmentId: m.equipmentId,
                    executionEquipmentId: m.mappedEquipmentId!,
                }))
                : [],
        };
        try {
            const res = await createControlRecipe(payload);
            toast.success(res.message ?? "Batch scheduled successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    }
    const handleClose = () => {
        reset({ batchNo: "", batchSize: "", recipeId: 0, unitId: 0, scheduledAt: "", shiftInchargeId: 0, equipmentMappings: [], });
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
                    <Tabs value={tab} onValueChange={(value) => setTab(value as Tab)} className="py-4 space-y-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="details">Batch Details</TabsTrigger>
                            <TabsTrigger value="mapping" disabled>Equipment Mapping</TabsTrigger>
                        </TabsList>
                        <TabsContent className="space-y-4" value="details">
                            <div className="grid grid-cols-2 gap-1.5">
                                <div className="space-y-2 relative">
                                    <div className="flex items-center justify-between">
                                        <Label>Batch No</Label>
                                    </div>
                                    <div className="flex">
                                        <Input
                                            type="text"
                                            placeholder="LOT_88"
                                            {...register("batchNo")}
                                            onChange={(e) => {
                                                e.target.value = e.target.value.toUpperCase();
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="min-w-0 space-y-2">
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
                                <div className="min-w-0 space-y-2">
                                    <Label>Proccessing Unit</Label>
                                    <Controller
                                        control={control}
                                        name="unitId"
                                        render={({ field }) => (
                                            <SearchableSelect
                                                value={field.value}
                                                onChange={field.onChange}
                                                options={units?.map((m) => ({
                                                    value: m.id,
                                                    label: m.name,
                                                })) ?? []}
                                                placeholder="Select"
                                                searchPlaceholder="Search Unit..."
                                                disabled={loading}
                                            />
                                        )}
                                    />
                                </div>

                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
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
                                            placeholder="DD MM YY HH:MM"
                                            disabled={loading}
                                        />
                                    )}
                                />
                            </div>

                        </TabsContent>
                        <TabsContent value="mapping" className="p-4 border ">
                            <div className="h-64 overflow-y-auto scrollbar-none">
                                <EquipmentMapping
                                    value={equipmentMappings}
                                    onChange={setEquipmentMappings}
                                    executionEquipments={equipmentOpt?.map(e => ({
                                        value: e.id,
                                        label: e.name
                                    })) ?? []}
                                    loading={isLoadingMapping || isLoadingEquipmentOpt}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                    <DialogFooter>
                        {tab === "details" ? (
                            <>
                                <DialogClose asChild>
                                    <Button key="cancel" type="button" variant="outline" disabled={loading} onClick={handleClose} >
                                        Cancel
                                    </Button>
                                </DialogClose>

                                {isMapping ? (
                                    <Button key="next" type="button" onClick={() => setTab("mapping")} className="min-w-34 text-white" >
                                        Next
                                    </Button>
                                ) : (
                                    <Button key="create-mapping" type="submit" className="min-w-34 text-white" disabled={loading || !isDirty} >
                                        {loading ? (<Loader className="w-4 h-4 animate-spin text-white" />) : ("Create")}
                                    </Button>
                                )}
                            </>
                        ) : (
                            <>
                                <Button key="back" variant="outline" type="button" onClick={() => setTab("details")} >
                                    Back
                                </Button>
                                <Button key="create-mapping" type="submit" className="min-w-34 text-white" disabled={loading || !isDirty} >
                                    {loading ? (<Loader className="w-4 h-4 animate-spin text-white" />) : ("Create")}
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}