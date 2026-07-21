import { z } from "zod";

export const ControlRecipeSchemaLimit = {
  batchNo: { min: 2, max: 100 },
  scheduledAt: { length: 19 },
} as const;

const scheduledAtSchema = z.iso.datetime({
  local: true,
  error: "Scheduled time must be in format YYYY-MM-DDTHH:mm:ss",
});

export const createControlRecipeSchema = z.object({
  scheduledAt: scheduledAtSchema,

  batchNo: z
    .string({ error: "Batch No is required." })
    .trim()
    .min(ControlRecipeSchemaLimit.batchNo.min, {
      error: `Batch No must be at least ${ControlRecipeSchemaLimit.batchNo.min} characters.`,
    })
    .max(ControlRecipeSchemaLimit.batchNo.max, {
      error: `Batch No must not exceed ${ControlRecipeSchemaLimit.batchNo.max} characters.`,
    })
    .regex(/^[A-Za-z0-9\s/_-]+$/, "Batch No contains invalid characters."),

  batchSize: z
    .string({ error: "Batch Size is required." })
    .min(1, "Batch Size is required")
    .trim(),

  recipeId: z
    .number({ error: "Recipe Id is required." })
    .min(1, "Recipe Id is required"),

  shiftInchargeId: z
    .number({ error: "Shift Incharge Id is required." })
    .min(1, "Shift Incharge Id is required"),
});

export const updateControlRecipeSchema = createControlRecipeSchema.omit({
  recipeId: true,
});

export type CreateControlRecipeSchema = z.infer<
  typeof createControlRecipeSchema
>;

export type UpdateControlRecipeSchema = z.infer<
  typeof updateControlRecipeSchema
>;
