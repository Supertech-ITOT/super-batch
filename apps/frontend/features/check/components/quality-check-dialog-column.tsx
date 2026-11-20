"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

import { Trash2 } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { Badge } from "@/common/components/ui/badge";

import { NumberInput } from "@/common/components/form/number-input";
import SearchableSelect from "@/common/components/form/searchable-select";

import { CheckParameterType, CheckParameterTypeBadgeStyles } from "@/features/plant/check-parameter/types/checkParameter.types";

import type { BatchCheckFormValues } from "../schemas/check.schemas";
import type { QualityCheckRow } from "./quality-check-dialog";

import { toDisplayText } from "@/common/lib/format-enum";

interface QualityCheckColumnsProps {
  register: UseFormRegister<BatchCheckFormValues>;
  setValue: UseFormSetValue<BatchCheckFormValues>;
  errors: FieldErrors<BatchCheckFormValues>;
  remove: (index: number) => void;
}

export const qualityCheckColumns = ({ register, setValue, remove }: QualityCheckColumnsProps): ColumnDef<QualityCheckRow>[] => [
  {
    id: "srNo",
    header: "Sr. No.",
    cell: ({ row }) => <span className="font-medium tabular-nums text-muted-foreground">{row.original.formIndex + 1}</span>,
    meta: {
      align: "center",
    },
  },

  {
    id: "name",
    header: "Parameter",
    accessorFn: (row) => row.parameter.name,
    cell: ({ row }) => <span>{row.original.parameter.name}</span>,
    meta: {
      align: "left",
    },
  },

  {
    id: "type",
    header: "Type",
    accessorFn: (row) => row.parameter.type,
    cell: ({ row }) => {
      const type = row.original.parameter.type;

      return (
        <Badge variant="outline" className={CheckParameterTypeBadgeStyles[type as keyof typeof CheckParameterTypeBadgeStyles]}>
          {toDisplayText(type)}
        </Badge>
      );
    },
    meta: {
      align: "center",
    },
  },

  {
    id: "specifications",
    header: "Specifications",
    cell: ({ row }) => {
      const parameter = row.original.parameter;
      if (parameter.type === CheckParameterType.QUANTITATIVE) {
        return (
          <span>
            {parameter.min ?? "—"} - {parameter.max ?? "—"}
          </span>
        );
      }

      const allowed = parameter.options
        ?.filter((option) => option.isAllowed)
        .map((option) => option.value)
        .join(", ");

      const notAllowed = parameter.options
        ?.filter((option) => !option.isAllowed)
        .map((option) => option.value)
        .join(", ");

      return (
        <div className="text-sm">
          <div>
            <span className="font-medium">Allowed:</span> {allowed || "-"}
          </div>
          <div>
            <span className="font-medium">Not Allowed:</span> {notAllowed || "-"}
          </div>
        </div>
      );
    },
    meta: {
      align: "left",
    },
  },
  {
    id: "result",
    header: "Result",
    cell: ({ row }) => {
      const field = row.original;
      const parameter = field.parameter;
      const index = field.formIndex;
      const fieldName = `results.${index}.value` as const;

      return (
        <div className="min-w-44 space-y-1">
          {parameter.type === CheckParameterType.QUANTITATIVE ? (
            <NumberInput
              {...register(fieldName)}
              id={`result-${field.id}`}
              step="any"
              placeholder={parameter.min != null && parameter.max != null ? `${parameter.min} – ${parameter.max}` : "Enter result"}
              aria-label={`Result for ${parameter.name}`}
            />
          ) : (
            <SearchableSelect<string>
              value={field.value || ""}
              onChange={(value) => {
                setValue(fieldName, typeof value === "string" ? value : "", {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              options={(parameter.options ?? []).map((option) => ({
                value: option.value,
                label: option.value,
              }))}
              placeholder="Select result"
              searchPlaceholder="Search options..."
              emptyText="No matching options."
            />
          )}
        </div>
      );
    },
    meta: {
      align: "left",
    },
  },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const field = row.original;

      return (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          onClick={() => remove(field.formIndex)}
          aria-label={`Remove ${field.parameter.name}`}
          title="Remove parameter"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      );
    },
    meta: {
      align: "center",
    },
  },
];
