import { z } from "zod";

export const CheckParameterSchemaLimit = {
  name: { min: 1, max: 100 },
  option: { min: 1, max: 100 },
} as const;

export const checkParameterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(
        CheckParameterSchemaLimit.name.min,
        `Check parameter name must be at least ${CheckParameterSchemaLimit.name.min} characters`,
      )
      .max(
        CheckParameterSchemaLimit.name.max,
        `Check parameter name cannot exceed ${CheckParameterSchemaLimit.name.max} characters`,
      ),

    product: z.string().trim().min(1, "Product is required"),

    type: z.enum(["QUANTITIVE", "QUALITATIVE"], {
      error: "Check parameter type is required",
    }),

    min: z.number().optional(),

    max: z.number().optional(),

    allowedOptions: z
      .array(
        z
          .string()
          .trim()
          .min(
            CheckParameterSchemaLimit.option.min,
            "Allowed option is required",
          )
          .max(
            CheckParameterSchemaLimit.option.max,
            `Allowed option cannot exceed ${CheckParameterSchemaLimit.option.max} characters`,
          ),
      )
      .optional(),

    notAllowedOptions: z
      .array(
        z
          .string()
          .trim()
          .min(
            CheckParameterSchemaLimit.option.min,
            "Not allowed option is required",
          )
          .max(
            CheckParameterSchemaLimit.option.max,
            `Not allowed option cannot exceed ${CheckParameterSchemaLimit.option.max} characters`,
          ),
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "QUANTITIVE") {
      if (data.min === undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["min"],
          message: "Minimum value is required",
        });
      }

      if (data.max === undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["max"],
          message: "Maximum value is required",
        });
      }

      if (
        data.min !== undefined &&
        data.max !== undefined &&
        data.min > data.max
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["max"],
          message: "Maximum value must be greater than minimum value",
        });
      }
    }

    if (data.type === "QUALITATIVE") {
      if (!data.allowedOptions?.length && !data.notAllowedOptions?.length) {
        ctx.addIssue({
          code: "custom",
          path: ["allowedOptions"],
          message: "At least one option is required",
        });
      }
    }
  });

export type CheckParameterFormValues = z.infer<typeof checkParameterSchema>;

export const checkParameterDefaultValues: CheckParameterFormValues = {
  name: "",
  product: "",
  type: "QUANTITIVE",
  min: 0,
  max: 0,
  allowedOptions: [],
  notAllowedOptions: [],
};
