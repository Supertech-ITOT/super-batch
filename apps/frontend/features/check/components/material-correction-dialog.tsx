"use client";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Feather, Hash, LoaderCircle, PackageCheckIcon, Save, Scale, ScanBarcode } from "lucide-react";
import { toast } from "sonner";
import { useCreateMaterialCorrection } from "../hooks/use-check";
import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";
import { Button } from "@/common/components/ui/button";
import { useGetMaterialById, useGetMaterials } from "@/features/plant/material/hooks/use-materials";
import { materialCorrectionDefaultValues, materialCorrectionSchema, MaterialCorrectionSchema } from "../schemas/material-correction.schema";
import { NumberInput } from "@/common/components/form/number-input";
import SearchableSelect from "@/common/components/form/searchable-select";
import { MaterialType } from "@/features/plant/material/types/material.types";
import { TextAreaInput } from "@/common/components/form/text-area-input";
import { TextInput } from "@/common/components/form/text-input";

type Prop = {
  id: number;
};
export default function MaterialCorrectionDialog({ id }: Prop) {
  const { mutateAsync: createMaterialCorrection, isPending: isCreating } = useCreateMaterialCorrection();
  const { data: materials, isLoading: materialsIsLoading } = useGetMaterials();
  const {
    handleSubmit,
    reset,
    control,
    register,
    watch,
    formState: { isSubmitting, isDirty },
  } = useForm<MaterialCorrectionSchema>({
    resolver: zodResolver(materialCorrectionSchema),
    defaultValues: materialCorrectionDefaultValues,
  });

  const loading = isCreating || isSubmitting || materialsIsLoading;
  const selectedId = watch("materialId");
  const { data: material } = useGetMaterialById(selectedId);

  const onSubmit = async (formData: MaterialCorrectionSchema) => {
    try {
      const res = await createMaterialCorrection({
        batchId: id,
        request: {
          materialId: formData.materialId,
          qty: formData.qty,
        },
      });
      toast.success(res.message ?? "Batch check saved successfully");
      reset({ ...materialCorrectionDefaultValues });
    } catch (error) {
      showApiError(error);
    }
  };

  const onInvalid = (errors: FieldErrors<MaterialCorrectionSchema>) => {
    toast.error(showFormError(errors));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex h-full min-h-0 flex-col gap-5 rounded-2xl border bg-card p-3 shadow-sm sm:p-5">
      {/* Section heading */}
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <PackageCheckIcon className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold tracking-tight">Material Correction</h2>
          <p className="text-xs text-muted-foreground sm:text-sm">Select a raw material and enter its quantity.</p>
        </div>
      </div>

      {/* Primary inputs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Controller
            control={control}
            name="materialId"
            render={({ field }) => (
              <SearchableSelect
                label="Material"
                value={field.value}
                icon={PackageCheckIcon}
                onChange={field.onChange}
                options={
                  materials
                    ?.filter((f) => f.materialType === MaterialType.RAW_MATERIAL)
                    ?.map((a) => ({
                      value: a.id,
                      label: a.name,
                    })) ?? []
                }
                placeholder="Select Material"
                searchPlaceholder="Search Materials..."
                disabled={loading}
              />
            )}
          />
        </div>

        <div className="sm:col-span-2">
          <NumberInput
            label="Quantity"
            icon={Scale}
            suffix="KG"
            disabled={loading}
            value={watch("qty")}
            {...register("qty", {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>

      {/* Selected material details */}
      <div className="min-w-0 rounded-xl border bg-muted/30 p-3 sm:p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border text-muted-foreground">
            <Feather className="size-4" />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-semibold">Material Details</h3>
            <p className="text-xs text-muted-foreground">Automatically populated from the selected material</p>
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
          <NumberInput label="ID" icon={Hash} disabled={loading} value={material?.id ?? 0} readOnly />
          <TextInput label="Code" icon={ScanBarcode} disabled={loading} readOnly value={material?.code ?? "-"} />
          <div className="min-w-0 sm:col-span-2">
            <TextAreaInput label="Description" icon={Feather} disabled={loading} readOnly value={material?.description ?? "-"} />
          </div>
        </div>
      </div>

      {/* Footer action */}
      <div className="mt-auto border-t pt-4">
        <Button type="submit" disabled={loading || !isDirty} className="h-11 w-full gap-2 text-sm font-semibold sm:w-full">
          {loading ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />}
          {loading ? "Saving..." : "Save Material Correction"}
        </Button>
      </div>
    </form>
  );
}
