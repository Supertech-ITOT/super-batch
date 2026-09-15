"use client";

import { Controller, FieldErrors, useForm } from "react-hook-form";
import { useGetMaterials } from "../../material/hooks/use-materials";
import {
  useGetCheckParameterById,
  useUpdateCheckParameter,
} from "../hooks/use-qualityCheck";
import {
  checkParameterDefaultValues,
  CheckParameterFormValues,
  checkParameterSchema,
  CheckParameterSchemaLimit,
} from "../schemas/checkParameter.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { MaterialType } from "../../material/types/material.types";
import { showApiError } from "@/common/lib/show-api-error";
import { CheckParameterType } from "../types/checkParameter.types";
import { toast } from "sonner";
import { showFormError } from "@/common/lib/show-form-error";
import FormDialog from "@/common/components/form/form-dialog";
import {
  ClipboardCheck,
  ListChecks,
  Package,
  Ruler,
  Settings2,
  Trash2,
} from "lucide-react";
import { TextInput } from "@/common/components/form/text-input";
import SearchableSelect from "@/common/components/form/searchable-select";
import { Button } from "@/common/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  checkParameterId: number | null;
};
export default function UpdateQualityCheck({
  open,
  onClose,
  checkParameterId,
}: Props) {
  const { mutateAsync: updateParameter, isPending: isUpdating } =
    useUpdateCheckParameter();
  const { data: parameter, isLoading: parameterIsLoading } =
    useGetCheckParameterById(checkParameterId ?? undefined);
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

  const [allowedInput, setAllowedInput] = useState("");
  const [notAllowedInput, setNotAllowedInput] = useState("");

  const allowedOptions = watch("allowedOptions") ?? [];
  const notAllowedOptions = watch("notAllowedOptions") ?? [];

  const finishedProducts =
    materials?.filter(
      (material) => material.materialType === MaterialType.FINISHED_PRODUCT,
    ) ?? [];

  const loading =
    parameterIsLoading || materialsIsLoading || isUpdating || isSubmitting;

  useEffect(() => {
    if (!open || !parameter) {
      return;
    }

    const allowed =
      parameter.options
        ?.filter((option) => option.isAllowed)
        .map((option) => option.value) ?? [];

    const notAllowed =
      parameter.options
        ?.filter((option) => !option.isAllowed)
        .map((option) => option.value) ?? [];

    reset({
      name: parameter.name,
      product: parameter.product,
      type: parameter.type,
      min: parameter.min ?? undefined,
      max: parameter.max ?? undefined,
      allowedOptions: allowed,
      notAllowedOptions: notAllowed,
    });

    setAllowedInput("");
    setNotAllowedInput("");
  }, [parameter, open, reset]);

  const addAllowedOption = () => {
    const value = allowedInput.trim();
    if (!value) {
      return;
    }
    setValue("allowedOptions", [...allowedOptions, value], {
      shouldValidate: true,
      shouldDirty: true,
    });
    setAllowedInput("");
  };
  const addNotAllowedOption = () => {
    const value = notAllowedInput.trim();
    if (!value) {
      return;
    }
    setValue("notAllowedOptions", [...notAllowedOptions, value], {
      shouldValidate: true,
      shouldDirty: true,
    });
    setNotAllowedInput("");
  };
  const removeAllowedOption = (index: number) => {
    setValue(
      "allowedOptions",
      allowedOptions.filter((_, i) => i !== index),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };

  const removeNotAllowedOption = (index: number) => {
    setValue(
      "notAllowedOptions",
      notAllowedOptions.filter((_, i) => i !== index),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };

  const onSubmit = async (formData: CheckParameterFormValues) => {
    if (!checkParameterId) {
      return;
    }
    try {
      const res = await updateParameter({
        id: checkParameterId,
        data: {
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
        },
      });
      toast.success(
        res.message ?? "Quality check parameter updated successfully",
      );

      handleClose();
    } catch (error) {
      showApiError(error);
    }
  };
  const handleClose = () => {
    reset(checkParameterDefaultValues);
    setAllowedInput("");
    setNotAllowedInput("");
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
      title="Update Quality Check Parameter"
      description="Update the quality check parameter."
      submitDisabled={!isDirty}
      submitLabel="Update"
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      icon={ClipboardCheck}
    >
      <div className="space-y-2">
        {/* Parameter Name */}

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

        {/* Finished Product */}

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

        {/* Parameter Type */}

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

        {/* QUANTITIVE */}

        {parameterType === CheckParameterType.QUANTITIVE && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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

        {/* QUALITATIVE */}

        {parameterType === CheckParameterType.QUALITATIVE && (
          <div className="space-y-3">
            {/* Allowed Options */}

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ListChecks className="size-4 text-primary" />
                Allowed Options
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <TextInput
                    label=""
                    icon={ListChecks}
                    placeholder="Enter allowed option"
                    maxLength={CheckParameterSchemaLimit.option.max}
                    disabled={loading}
                    value={allowedInput}
                    onChange={(e) => setAllowedInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addAllowedOption();
                      }
                    }}
                  />
                </div>

                <Button
                  type="button"
                  className="h-10 px-3"
                  onClick={addAllowedOption}
                  disabled={loading || !allowedInput.trim()}
                >
                  Add
                </Button>
              </div>

              {allowedOptions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {allowedOptions.map((option, index) => (
                    <div
                      key={`${option}-${index}`}
                      className="flex items-center gap-1 rounded-md border bg-muted px-2 py-1 text-sm"
                    >
                      <span>{option}</span>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAllowedOption(index)}
                        disabled={loading}
                        className="size-6 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Not Allowed Options */}

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ListChecks className="size-4 text-destructive" />
                Not Allowed Options
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <TextInput
                    label=""
                    icon={ListChecks}
                    placeholder="Enter not allowed option"
                    maxLength={CheckParameterSchemaLimit.option.max}
                    disabled={loading}
                    value={notAllowedInput}
                    onChange={(e) => setNotAllowedInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addNotAllowedOption();
                      }
                    }}
                  />
                </div>

                <Button
                  type="button"
                  className="h-10 px-3"
                  onClick={addNotAllowedOption}
                  disabled={loading || !notAllowedInput.trim()}
                >
                  Add
                </Button>
              </div>

              {notAllowedOptions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {notAllowedOptions.map((option, index) => (
                    <div
                      key={`${option}-${index}`}
                      className="flex items-center gap-1 rounded-md border bg-muted px-2 py-1 text-sm"
                    >
                      <span>{option}</span>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeNotAllowedOption(index)}
                        disabled={loading}
                        className="size-6 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </FormDialog>
  );
}
