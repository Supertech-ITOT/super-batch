"use client";

import { Controller, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClipboardCheck, Package, Ruler, Settings2 } from "lucide-react";

import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";
import FormDialog from "@/common/components/form/form-dialog";
import { TextInput } from "@/common/components/form/text-input";
import SearchableSelect from "@/common/components/form/searchable-select";

import { useGetMaterials } from "../../material/hooks/use-materials";
import { MaterialType } from "../../material/types/material.types";
import { useCreateCheckParameter } from "../hooks/use-qualityCheck";
import {
  checkParameterDefaultValues,
  CheckParameterFormValues,
  checkParameterSchema,
  CheckParameterSchemaLimit,
} from "../schemas/checkParameter.schema";
import { CheckParameterType } from "../types/checkParameter.types";
import QualitativeOptions from "./qualitative-options";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateQualityCheck({ open, onClose }: Props) {
  const { mutateAsync: createParameter, isPending: isCreating } =
    useCreateCheckParameter();

  const { data: materials, isLoading: materialsIsLoading } = useGetMaterials();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { isSubmitting, isDirty },
  } = useForm<CheckParameterFormValues>({
    resolver: zodResolver(checkParameterSchema),
    defaultValues: checkParameterDefaultValues,
  });

  const parameterType = watch("type");

  const allowedOptions = watch("allowedOptions") ?? [];
  const notAllowedOptions = watch("notAllowedOptions") ?? [];

  const loading = materialsIsLoading || isCreating || isSubmitting;

  const finishedProducts =
    materials?.filter(
      (material) => material.materialType === MaterialType.FINISHED_PRODUCT,
    ) ?? [];

  const onSubmit = async (formData: CheckParameterFormValues) => {
    try {
      const res = await createParameter({
        name: formData.name,
        product: formData.product,
        type: formData.type,

        min:
          formData.type === CheckParameterType.QUANTITIVE
            ? formData.min
            : undefined,

        max:
          formData.type === CheckParameterType.QUANTITIVE
            ? formData.max
            : undefined,

        allowedOptions:
          formData.type === CheckParameterType.QUALITATIVE
            ? formData.allowedOptions
            : undefined,

        notAllowedOptions:
          formData.type === CheckParameterType.QUALITATIVE
            ? formData.notAllowedOptions
            : undefined,
      });

      toast.success(
        res.message ?? "Quality check parameter created successfully",
      );

      handleClose();
    } catch (error) {
      showApiError(error);
    }
  };

  const handleClose = () => {
    reset(checkParameterDefaultValues);
    onClose();
  };

  const onInvalid = (errors: FieldErrors<CheckParameterFormValues>) => {
    toast.error(showFormError(errors));
  };

  return (
    <FormDialog
      open={open}
      loading={loading}
      onClose={handleClose}
      title="Create Quality Check Parameter"
      description="Create a new quality check parameter."
      submitDisabled={!isDirty}
      submitLabel="Create"
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      icon={ClipboardCheck}
    >
      <div className="space-y-2">
        <TextInput
          label="Parameter Name"
          icon={Settings2}
          counter
          maxCharacters={CheckParameterSchemaLimit.name.max}
          placeholder="Enter Parameter name"
          maxLength={CheckParameterSchemaLimit.name.max}
          disabled={loading}
          value={watch("name")}
          {...register("name")}
        />

        <Controller
          control={control}
          name="product"
          render={({ field }) => (
            <SearchableSelect
              label="Finished Product"
              value={field.value}
              icon={Package}
              onChange={field.onChange}
              options={finishedProducts.map((material) => ({
                value: material.name,
                label: material.name,
              }))}
              placeholder={
                materialsIsLoading
                  ? "Loading products..."
                  : "Select Finished Product"
              }
              searchPlaceholder="Search Finished Products..."
              disabled={loading}
            />
          )}
        />

        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <SearchableSelect
              label="Parameter Type"
              value={field.value}
              icon={ClipboardCheck}
              onChange={field.onChange}
              options={[
                {
                  value: CheckParameterType.QUANTITIVE,
                  label: "Quantitive",
                },
                {
                  value: CheckParameterType.QUALITATIVE,
                  label: "Qualitative",
                },
              ]}
              placeholder="Select Parameter Type"
              searchPlaceholder="Search Type..."
              disabled={loading}
            />
          )}
        />

        {parameterType === CheckParameterType.QUANTITIVE && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <TextInput
              label="Minimum Value"
              icon={Ruler}
              type="number"
              placeholder="Enter minimum value"
              disabled={loading}
              value={watch("min") !== undefined ? String(watch("min")) : ""}
              onChange={(e) => {
                const value = e.target.value;

                setValue("min", value === "" ? undefined : Number(value), {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />

            <TextInput
              label="Maximum Value"
              icon={Ruler}
              type="number"
              placeholder="Enter maximum value"
              disabled={loading}
              value={watch("max") !== undefined ? String(watch("max")) : ""}
              onChange={(e) => {
                const value = e.target.value;

                setValue("max", value === "" ? undefined : Number(value), {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
          </div>
        )}

        {parameterType === CheckParameterType.QUALITATIVE && (
          <QualitativeOptions
            loading={loading}
            allowedOptions={allowedOptions}
            notAllowedOptions={notAllowedOptions}
            setAllowedOptions={(options, shouldValidate, shouldDirty) =>
              setValue("allowedOptions", options, {
                shouldValidate,
                shouldDirty,
              })
            }
            setNotAllowedOptions={(options, shouldValidate, shouldDirty) =>
              setValue("notAllowedOptions", options, {
                shouldValidate,
                shouldDirty,
              })
            }
          />
        )}
      </div>
    </FormDialog>
  );
}
