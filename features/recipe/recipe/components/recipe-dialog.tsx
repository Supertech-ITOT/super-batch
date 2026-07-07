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
import { GitBranch, Loader2, } from "lucide-react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";
import { recipeSchema, RecipeSchema, RecipeSchemaLimit, } from "../schemas/recipe-schema";
import { TransitionType } from "@/features/plant/transition/types/transition.types";
import { useCreateRecipe, useGetRecipeById, useInsertAboveRecipe, useInsertBelowRecipe, useUpdateRecipe } from "../hooks/use-recipe";
import { durationToMinutes, minutesToDuration } from "@/common/utils/duration.util";
import { useEffect } from "react";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetEquipment } from "@/features/plant/equipment/hooks/use-equipment";
export type recipeActionType = "create" | "insert-below" | "insert-above" | "edit" | "move-up" | "move-down" | "delete";
export type RecipeDialogType = {
  recipeId?: number;
  recipeHeaderId: number;
  stepNo?: number;
  action: recipeActionType;
}
export default function RecipeDialog({ recipeId, recipeHeaderId, action = "create", stepNo }: RecipeDialogType) {
  const { data: transitions, isLoading: transitionsIsLoading } = useGetTransitions();
  const { data: actions, isLoading: actionsIsLoading } = useGetActions();
  const { data: messages, isLoading: messagesIsLoading } = useGetMessages();
  const { data: materials, isLoading: materialsIsLoading } = useGetMaterials();
  const { data: parameters, isLoading: parametersIsLoading } = useGetParameters();
  const { data: equipments, isLoading: equipmentsIsLoading } = useGetEquipment();
  const { data: recipe, isLoading: recipeIsLoading } = useGetRecipeById(action === "edit" ? recipeId : undefined);

  const { mutateAsync: create, isPending: createIsPending } = useCreateRecipe();
  const { mutateAsync: insertBelow, isPending: insertBelowIsPending } = useInsertBelowRecipe();
  const { mutateAsync: insertAbove, isPending: insertAboveIsPending } = useInsertAboveRecipe();
  const { mutateAsync: update, isPending: updateIsPending } = useUpdateRecipe();

  const { handleSubmit, reset, watch, control, formState: { isSubmitting, isDirty }, } = useForm<RecipeSchema>({
    resolver: zodResolver(recipeSchema), defaultValues: {
      stdTime: "",
      actionId: 0,
      transitionId: 0,
      message: "",
      materials: [],
      parameters: [],
    },
  });

  const loading = isSubmitting || !transitions || transitionsIsLoading ||
    !actions || actionsIsLoading ||
    !messages || messagesIsLoading ||
    !materials || materialsIsLoading ||
    !parameters || parametersIsLoading ||
    !equipments || equipmentsIsLoading ||
    createIsPending || insertBelowIsPending || insertAboveIsPending || updateIsPending || recipeIsLoading;

  useEffect(() => {
    if (action === "edit" || recipe) {
      reset({
        actionId: recipe?.actionId,
        materials: recipe?.materials,
        message: recipe?.message,
        parameters: recipe?.parameters,
        stdTime: minutesToDuration(recipe?.stdTime ?? 0),
        transitionId: recipe?.transitionId
      })
    }
    else {
      handleClear();
    }
  }, [reset, recipe]);


  const selectedTransitionId = watch("transitionId");
  const selectedTransition = transitions?.find((t) => t.id === selectedTransitionId);
  const autoMaterialStep = selectedTransition?.name === TransitionType.AUTO_MATERIAL_CHARGE;
  const manualMaterialStep = selectedTransition?.name === TransitionType.MANUAL_MATERIAL_CHARGE;

  const onSubmit = async (formData: RecipeSchema) => {
    let res;
    try {
      switch (action) {
        case "create": {
          res = await create({ ...formData, recipeHeaderId, stdTime: durationToMinutes(formData.stdTime), });
          break;
        }
        case "insert-below": {
          if (!recipeId) return;
          res = await insertBelow({ id: recipeId, data: { ...formData, recipeHeaderId, stdTime: durationToMinutes(formData.stdTime), } });
          break;
        }
        case "insert-above": {
          if (!recipeId) return;
          res = await insertAbove({ id: recipeId, data: { ...formData, recipeHeaderId, stdTime: durationToMinutes(formData.stdTime), } });
          break;
        }
        case "edit": {
          if (!recipeId) return;
          res = await update({ ...formData, recipeHeaderId: recipeHeaderId, id: recipeId, stdTime: durationToMinutes(formData.stdTime), materials: formData.materials ?? [], parameters: formData.parameters ?? [], });
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
    reset({});
  };

  const onInvalid = (errors: FieldErrors<RecipeSchema>) => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast.error(firstError.message.toString());
    }
  };

  if (loading) {
    return <Skeleton className="h-full" />;
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
          <div className="relative flex items-start gap-4">
            <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <GitBranch className="size-6 text-primary" />
            </div>
            <div>
              <CardTitle>{action === "edit" ? "Edit Step" : "Create Step"}</CardTitle>
              <CardDescription>
                {action === "edit"
                  ? "Update the step information."
                  : "Create a new process step."}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Body */}
        <CardContent className="min-h-0 h-full flex-1 overflow-y-auto scrollbar-none p-4 space-y-4 ">
          <div className="flex gap-2">
            <div className="flex-1 space-y-2">
              <Label>Step No</Label>
              <Input
                placeholder="..."
                type="number"
                disabled={loading}
                readOnly
                value={stepNo ?? 0}
              />
            </div>

            <div className="flex-1 space-y-2">
              <Label>Standard Time</Label>
              <Controller
                control={control}
                name="stdTime"
                render={({ field }) => (
                  <DurationInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={loading}
                  />
                )}
              />
            </div>
          </div>
          <div className="space-y-2 relative ">
            <div className="flex items-center justify-between">
              <Label>Message</Label>
              <CharacterProgress
                value={watch("message")}
                max={RecipeSchemaLimit.message.max}
              />
            </div>
            <Controller
              control={control}
              name="message"
              render={({ field }) => (
                <TextareaAutocomplete
                  value={field.value}
                  onChange={field.onChange}
                  options={messages.map((m) => ({
                    id: m.id,
                    label: m.name,
                  }))}
                  placeholder="Brief message overview"
                  disabled={loading}
                  maxLength={RecipeSchemaLimit.message.max}
                  className="w-full min-w-0 max-w-full min-h-28 resize-none wrap-break-word"
                />
              )}
            />
          </div>
          <div className="flex gap-2">
            <div className="min-w-0 flex-1 space-y-2">
              <Label>Transition</Label>
              <Controller
                control={control}
                name="transitionId"
                render={({ field }) => (
                  <SearchableSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={transitions.map((t) => ({
                      value: t.id,
                      label: t.name,
                    }))}
                    placeholder="Select"
                    searchPlaceholder="Search Transition..."
                    disabled={loading}
                  />
                )}
              />
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <Label>Action</Label>
              <Controller
                control={control}
                name="actionId"
                render={({ field }) => (
                  <SearchableSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={actions.map((a) => ({
                      value: a.id,
                      label: a.name,
                    }))}
                    placeholder="Select"
                    searchPlaceholder="Search Action..."
                    disabled={loading}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="min-w-0 flex-1 space-y-2">
              <Label>From Equipment</Label>
              <Controller
                control={control}
                name="fromEquipmentId"
                render={({ field }) => (
                  <SearchableSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={equipments.map((t) => ({
                      value: t.id,
                      label: t.name,
                    }))}
                    placeholder="Select"
                    searchPlaceholder="Search Equipment..."
                    disabled={loading}
                  />
                )}
              />
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <Label>To Equipment</Label>
              <Controller
                control={control}
                name="toEquipmentId"
                render={({ field }) => (
                  <SearchableSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={equipments.map((a) => ({
                      value: a.id,
                      label: a.name,
                    }))}
                    placeholder="Select"
                    searchPlaceholder="Search Equipment..."
                    disabled={loading}
                  />
                )}
              />
            </div>
          </div>





          <Controller
            control={control}
            name="materials"
            render={({ field }) => (
              <ValuePicker
                label="Materials"
                placeholder="Search Material..."
                valueLabel="Std Qty"
                disabled={!(autoMaterialStep || manualMaterialStep)}
                limit={autoMaterialStep ? 1 : undefined}
                options={materials
                  .filter(
                    (f) => f.materialType !== MaterialType.FINISHED_PRODUCT,
                  )
                  .map((m) => ({
                    id: m.id,
                    name: m.name,
                    uom: m.uom.symbol,
                  }))}
                value={(field.value ?? []).map((m) => ({
                  id: m.materialId,
                  value: m.stdQty,
                }))}
                onChange={(items) =>
                  field.onChange(
                    items.map((i) => ({ materialId: i.id, stdQty: i.value })),
                  )
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
        <CardFooter className="sticky bottom-0 border-t bg-background justify-end gap-2 p-4!">
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
    </Card>
  );
}
