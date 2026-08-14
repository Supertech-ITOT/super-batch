import CharacterProgress from "@/common/components/form/character-progress";
import DurationInput from "@/common/components/form/duration-input";
import SearchableSelect from "@/common/components/form/searchable-select";
import TextareaAutocomplete from "@/common/components/form/textarea-autocomplete";
import ValuePicker from "@/common/components/form/value-picker";
import { Button } from "@/common/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/common/components/ui/card";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Skeleton } from "@/common/components/ui/skeleton";
import { useGetActions } from "@/features/plant/action/hooks/use-actions";
import { useGetMaterials } from "@/features/plant/material/hooks/use-materials";
import { MaterialType } from "@/features/plant/material/types/material.types";
import { useGetMessages } from "@/features/plant/message/hooks/use-messages";
import { useGetParameters } from "@/features/plant/parameter/hooks/use-parameters";
import { useGetTransitions } from "@/features/plant/transition/hooks/use-transitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightLeft, Cpu, Feather, GitBranch, Hash, Loader2, Play, } from "lucide-react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";
import { recipeSopDefaultValues, recipeSOPSchema, RecipeSOPSchema, RecipeSOPSchemaLimit, } from "../schemas/recipe-sop-schema";
import { TransitionType } from "@/features/plant/transition/types/transition.types";
import { useCreateRecipeSOP, useGetRecipeSOPById, useInsertAboveRecipeSOP, useInsertBelowRecipeSOP, useUpdateRecipeSOP } from "../hooks/use-recipe-sop";
import { durationToMinutes, minutesToDuration } from "@/common/utils/duration.util";
import { useEffect, useState } from "react";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetEquipmentsByUnitId } from "@/features/plant/equipment/hooks/use-equipment";
import { recipeSOPActionType } from "./recipe-sop-view";
import { RadioGroup, RadioGroupItem } from "@/common/components/ui/radio-group";
import { Separator } from "@/common/components/ui/separator";
import { showFormError } from "@/common/lib/show-form-error";
import { TextInput } from "@/common/components/form/text-input";
import { QuantityPicker } from "@/common/components/form/quantity-picker";

type RecipeSOPDialogProp = {
  recipeSOPId?: number;
  recipeId: number;
  stepNo?: number;
  action: recipeSOPActionType;
  unitId: number;
  batchSize: number;
}
export default function RecipeSOPDialog({ recipeSOPId, recipeId, action = "create", stepNo, unitId, batchSize }: RecipeSOPDialogProp) {
  const { data: transitions, isLoading: transitionsIsLoading } = useGetTransitions();
  const { data: actions, isLoading: actionsIsLoading } = useGetActions();
  const { data: messages, isLoading: messagesIsLoading } = useGetMessages();
  const { data: materials, isLoading: materialsIsLoading } = useGetMaterials();
  const { data: parameters, isLoading: parametersIsLoading } = useGetParameters();
  const { data: equipments, isLoading: equipmentsIsLoading } = useGetEquipmentsByUnitId(unitId);
  const { data: recipeSOP, isLoading: recipeSOPIsLoading } = useGetRecipeSOPById(action === "edit" ? recipeSOPId : undefined);

  const { mutateAsync: create, isPending: createIsPending } = useCreateRecipeSOP();
  const { mutateAsync: insertBelow, isPending: insertBelowIsPending } = useInsertBelowRecipeSOP();
  const { mutateAsync: insertAbove, isPending: insertAboveIsPending } = useInsertAboveRecipeSOP();
  const { mutateAsync: update, isPending: updateIsPending } = useUpdateRecipeSOP();

  const [materialInputMode, setMaterialInputMode] = useState<"ABSOLUTE" | "PERCENTAGE">("ABSOLUTE");

  const { handleSubmit, reset, watch, control, setValue, formState: { isSubmitting, isDirty }, } = useForm<RecipeSOPSchema>({
    resolver: zodResolver(recipeSOPSchema), defaultValues: recipeSopDefaultValues,
  });

  const loading = isSubmitting ||
    !transitions || transitionsIsLoading ||
    !actions || actionsIsLoading ||
    !messages || messagesIsLoading ||
    !materials || materialsIsLoading ||
    !parameters || parametersIsLoading ||
    !equipments || equipmentsIsLoading ||
    createIsPending || insertBelowIsPending || insertAboveIsPending || updateIsPending || recipeSOPIsLoading;

  useEffect(() => {
    if (action === "edit" || recipeSOP) {
      reset({
        actionId: recipeSOP?.actionId,
        materials: recipeSOP?.materials,
        message: recipeSOP?.message,
        parameters: recipeSOP?.parameters,
        stdTime: minutesToDuration(recipeSOP?.stdTime ?? 0),
        transitionId: recipeSOP?.transitionId,
        fromEquipmentId: recipeSOP?.fromEquipment?.id ?? undefined,
        toEquipmentId: recipeSOP?.toEquipment.id
      })
    }
    else {
      handleClear();
    }
  }, [reset, recipeSOP]);


  // Business Logic
  const selectedTransitionId = watch("transitionId");
  const selectedTransition = transitions?.find((t) => t.id === selectedTransitionId);
  const autoMaterialStep = selectedTransition?.name === TransitionType.AUTO_MATERIAL_CHARGE;
  const manualMaterialStep = selectedTransition?.name === TransitionType.MANUAL_MATERIAL_CHARGE;
  const transferStep = selectedTransition?.name === TransitionType.TRANSFER;
  const parentEq = equipments?.find((e) => e.creatorUnitId === unitId);
  useEffect(() => {
    if (!selectedTransition || !parentEq) return;
    if (transferStep) {
      setValue("fromEquipmentId", parentEq.id);
    } else {
      setValue("toEquipmentId", parentEq.id);
    }
  }, [selectedTransition, parentEq, transferStep, setValue]);

  const onSubmit = async (formData: RecipeSOPSchema) => {
    let res;
    try {
      switch (action) {
        case "create": {
          res = await create({ ...formData, recipeId, stdTime: durationToMinutes(formData.stdTime), });
          break;
        }
        case "insert-below": {
          if (!recipeSOPId) return;
          res = await insertBelow({ id: recipeSOPId, data: { ...formData, recipeId, stdTime: durationToMinutes(formData.stdTime), } });
          break;
        }
        case "insert-above": {
          if (!recipeSOPId) return;
          res = await insertAbove({ id: recipeSOPId, data: { ...formData, recipeId, stdTime: durationToMinutes(formData.stdTime), } });
          break;
        }
        case "edit": {
          if (!recipeSOPId) return;
          res = await update({ ...formData, recipeId: recipeId, id: recipeSOPId, stdTime: durationToMinutes(formData.stdTime), materials: formData.materials ?? [], parameters: formData.parameters ?? [], });
          break;
        }
      }
      toast.success(res?.message ?? "Step created.");
      handleClear()
    }
    catch (err) {
      showApiError(err);
    }
  };

  const handleClear = () => {
    reset(recipeSopDefaultValues);
  };

  const onInvalid = (errors: FieldErrors<RecipeSOPSchema>) => {
    toast.error(showFormError(errors));
  };

  if (loading) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-[2px]">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="h-full rounded-none flex flex-col py-0! m-0! gap-2! min-h-0">
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="flex h-full flex-col min-h-0"
      >
        {/* Header */}
        <CardHeader className="relative overflow-hidden border-b bg-muted/40 py-4!">
          {/* Background Icon */}
          <GitBranch className="absolute -top-4 -right-4 size-28 text-primary/10 " />
          <div className="relative flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <GitBranch className="size-6 text-primary" />
              </div>
              <div>
                <CardTitle>{action === "edit" ? "Edit Step" : "Create Step"}</CardTitle>
                <CardDescription>{action === "edit" ? "Update the step information." : "Create a new process step."}</CardDescription>
              </div>
            </div>
            <h1 className="text-primary text-4xl font-bold">{stepNo ?? 0}</h1>
          </div>
        </CardHeader>

        {/* Body */}
        <CardContent className="min-h-0 h-full flex-1 overflow-y-auto scrollbar-none p-4 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <TextInput
              label="Step No"
              icon={Hash}
              disabled
              readOnly
              value={stepNo ?? 0}
            />
            <Controller
              control={control}
              name="stdTime"
              render={({ field }) => (
                <DurationInput
                  value={field.value}
                  label="Standard Time"
                  onChange={field.onChange}
                  disabled={loading}
                />
              )}
            />
          </div>
          <Controller
            control={control}
            name="message"
            render={({ field }) => (
              <TextareaAutocomplete
                value={field.value}
                label="Message"
                icon={Feather}
                onChange={field.onChange}
                options={messages.map((m) => ({
                  id: m.id,
                  label: m.name,
                }))}
                counter
                maxCharacters={RecipeSOPSchemaLimit.message.max}
                placeholder="Brief Message Overview"
                disabled={loading}
                maxLength={RecipeSOPSchemaLimit.message.max}
                className="w-full min-w-0 max-w-full min-h-28 resize-none wrap-break-word"
              />
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <Controller
              control={control}
              name="transitionId"
              render={({ field }) => (
                <SearchableSelect
                  label="Transition"
                  value={field.value ?? undefined}
                  icon={ArrowRightLeft}
                  onChange={field.onChange}
                  options={transitions?.map((a) => ({
                    value: a.id,
                    label: a.name,
                  })) ?? []}
                  placeholder="Select Transition"
                  searchPlaceholder="Search Transitions..."
                  disabled={loading}
                />
              )}
            />
            <Controller
              control={control}
              name="actionId"
              render={({ field }) => (
                <SearchableSelect
                  label="Action"
                  value={field.value ?? undefined}
                  icon={Play}
                  onChange={field.onChange}
                  options={actions?.map((a) => ({
                    value: a.id,
                    label: a.name,
                  })) ?? []}
                  placeholder="Select Action"
                  searchPlaceholder="Search Actions..."
                  disabled={loading}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Controller
              control={control}
              name="fromEquipmentId"
              render={({ field }) => (
                <SearchableSelect
                  label="Source"
                  value={field.value ?? undefined}
                  icon={Cpu}
                  onChange={field.onChange}
                  options={equipments?.map((a) => ({
                    value: a.id,
                    label: a.name,
                  })) ?? []}
                  placeholder="Select Source"
                  searchPlaceholder="Search Equipments..."
                  disabled={loading || !autoMaterialStep}
                />
              )}
            />
            <Controller
              control={control}
              name="toEquipmentId"
              render={({ field }) => (
                <SearchableSelect
                  label="Destination"
                  value={field.value ?? undefined}
                  icon={Cpu}
                  onChange={field.onChange}
                  options={equipments?.map((a) => ({
                    value: a.id,
                    label: a.name,
                  })) ?? []}
                  placeholder="Select Destination"
                  searchPlaceholder="Search Equipments..."
                  disabled={loading || !transferStep}
                />
              )}
            />
          </div>
          <Controller
            control={control}
            name="materials"
            render={({ field }) => (
              <QuantityPicker
                value={(field.value ?? []).map((material) => ({
                  id: material.materialId,
                  value: material.stdQty,
                }))}
                onChange={(items) =>
                  field.onChange(
                    items.map((item) => ({
                      materialId: item.id,
                      stdQty: item.value,
                    }))
                  )
                }
                items={materials}
                targetSize={batchSize}
                label="Material Quantity Mode"
                pickerLabel="Materials"
                placeholder="Search Material..."
                disabled={
                  !(autoMaterialStep || manualMaterialStep)
                }
                limit={autoMaterialStep ? 1 : undefined}
                excludeItem={(item) =>
                  item.materialType === MaterialType.FINISHED_PRODUCT
                }
              />
            )}
          />
          <Controller
            control={control}
            name="parameters"
            render={({ field }) => (
              <ValuePicker
                label="Parameters"
                placeholder="Search Parameter..."
                valueLabel="Std Value"
                options={parameters.map((p) => ({
                  id: p.id,
                  name: p.name,
                  uom: p.uom.symbol,
                }))}
                value={(field.value ?? []).map((p) => ({
                  id: p.parameterId,
                  value: p.stdValue,
                }))}
                onChange={(items) =>
                  field.onChange(
                    items.map((i) => ({ parameterId: i.id, stdValue: i.value })),
                  )
                }
                isAdd={false}
                disabled={loading}
              />
            )}
          />

        </CardContent>

        {/* Footer */}
        <CardFooter className="sticky bottom-0 border-t bg-card justify-end gap-2 p-4!">
          <Button type="reset" variant="outline" className="min-w-22" onClick={handleClear}>
            Clear
          </Button>
          <Button type="submit" className="min-w-32" disabled={loading || !isDirty}>
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : action === "edit" ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card >
  );
}
