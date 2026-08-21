"use client";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { BookOpenText, Boxes, CalendarClock, Hash, PackageCheck, Scale, User } from "lucide-react";
import { useGetMaterials } from "@/features/plant/material/hooks/use-materials";
import { useGetUnits } from "@/features/plant/unit/hooks/use-units";
import { MaterialType } from "@/features/plant/material/types/material.types";
import { useCreateControlRecipe, useRecipeEquipmentMapping } from "../hooks/use-control-recipe";
import { controlRecipeDefaultValues, ControlRecipeSchemaLimit, createControlRecipeSchema, CreateControlRecipeSchema } from "../schemas/control-recipe-schema";
import SearchableSelect from "@/common/components/form/searchable-select";
import { useEffect, useState } from "react";
import DatetimePicker from "@/common/components/form/datetime-picker";
import UserSelect from "@/common/components/form/user-select";
import { useGetUser } from "@/features/manager/user/hooks/use-user";
import { useGetRecipeById, useGetRecipes } from "@/features/recipe/recipe/hooks/use-recipe";
import { EquipmentMappingResponse } from "../types/control-recipe.types";
import EquipmentMapping from "./equipment-mapping";
import { useGetEquipmentsByUnitId } from "@/features/plant/equipment/hooks/use-equipment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import FormDialog from "@/common/components/form/form-dialog";
import { TextInput } from "@/common/components/form/text-input";
import { NumberInput } from "@/common/components/form/number-input";
import { showFormError } from "@/common/lib/show-form-error";


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
        defaultValues: controlRecipeDefaultValues,
    });

    const loading = isSubmitting ||
        isCreating || isLoadingMaterials ||
        isLoadingUnits || isLoadingUsers ||
        !users || !units || !materials ||
        isLoadingMasterRecipes || !masterRecipes;

    const selectedUnitId = watch("unitId");
    const selectedMasterRecipeId = watch("recipeId");
    const selectedUnitMaxRange = units?.find((unit) => unit.id === selectedUnitId)?.capacity;
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
        if (isLoadingMasterRecipe) return;
        setValue("batchSize", selectedMasterRecipeId && masterRecipe ? masterRecipe.batchSize : 0);
    }, [selectedMasterRecipeId, masterRecipe, isLoadingMasterRecipe, setValue,]);

    const onSubmit = async (formData: CreateControlRecipeSchema) => {
        if (!selectedUnitMaxRange) return;
        if (formData.batchSize > selectedUnitMaxRange) {
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
        reset(controlRecipeDefaultValues);
        onClose();
    };
    const onInvalid = (errors: FieldErrors<CreateControlRecipeSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Create Schedule"
            description="Configure the batch details and production schedule."
            submitDisabled={!isDirty}
            submitLabel="Create"
            showFooter={isMapping ? tab === "mapping" : tab === "details"}
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            icon={CalendarClock}
        >

            <Tabs value={tab} onValueChange={(value) => setTab(value as Tab)} className="space-y-2">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details">Batch Details</TabsTrigger>
                    <TabsTrigger value="mapping" disabled={!isMapping}>Equipment Mapping</TabsTrigger>
                </TabsList>
                <TabsContent className="space-y-2" value="details">
                    <div className="grid grid-cols-2 gap-2">
                        <TextInput
                            label="Batch No"
                            icon={Hash}
                            counter
                            maxCharacters={ControlRecipeSchemaLimit.batchNo.max}
                            placeholder="Batch No"
                            maxLength={ControlRecipeSchemaLimit.batchNo.max}
                            disabled={loading}
                            value={watch("batchNo")}
                            {...register("batchNo")}
                        />
                        <SearchableSelect
                            label="Product"
                            value={materialId}
                            icon={PackageCheck}
                            onChange={setMaterialId}
                            options={materials?.filter((f) => f.materialType === MaterialType.FINISHED_PRODUCT).map((a) => ({
                                value: a.id,
                                label: a.name,
                            })) ?? []}
                            placeholder="Select Product"
                            searchPlaceholder="Search Products..."
                            disabled={loading}
                        />
                        <Controller
                            control={control}
                            name="recipeId"
                            render={({ field }) => (
                                <SearchableSelect
                                    label="Recipe"
                                    value={field.value}
                                    icon={BookOpenText}
                                    onChange={field.onChange}
                                    options={masterRecipesOptions?.map((m) => ({
                                        value: m.id,
                                        label: m.name,
                                    })) ?? []}
                                    placeholder="Select Recipe"
                                    searchPlaceholder="Search Recipes..."
                                    disabled={loading}
                                />
                            )}
                        />
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
                        <Controller
                            control={control}
                            name="shiftInchargeId"
                            render={({ field }) => (
                                <UserSelect
                                    label="Shift Incharge"
                                    icon={User}
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={
                                        users?.map((u) => ({
                                            id: u.id,
                                            name: u.name,
                                            email: u.email,
                                            role: u.roleName
                                        })) ?? []
                                    }
                                    placeholder="Select User"
                                    searchPlaceholder="Search Users..."
                                    disabled={loading}
                                />
                            )}
                        />
                    </div>
                    <Controller
                        name="scheduledAt"
                        control={control}
                        render={({ field }) => (
                            <DatetimePicker
                                icon={CalendarClock}
                                label="Schedule At"
                                disabledDates={{ before: new Date() }}
                                className="bg-card"
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="DD MM YY HH:MM"
                                disabled={loading}
                            />
                        )}
                    />
                </TabsContent>
                <TabsContent value="mapping" className="p-4 border rounded-lg ">
                    <div className="h-64 overflow-y-auto scrollbar-none flex justify-center items-center">
                        {isMapping &&
                            <EquipmentMapping
                                value={equipmentMappings}
                                onChange={setEquipmentMappings}
                                executionEquipments={equipmentOpt?.map(e => ({
                                    value: e.id,
                                    label: e.name
                                })) ?? []}
                                loading={isLoadingMapping || isLoadingEquipmentOpt}
                            />
                        }
                        {!isMapping && <p className="text-muted-foreground text-center">No mapping required, as proccessing unit is same as recipe default unit.</p>}
                    </div>
                </TabsContent>
            </Tabs>
        </FormDialog >

    )
}