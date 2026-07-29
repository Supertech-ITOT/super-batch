import { z } from "zod";

export const ControlRecipeSchemaLimit = {
  batchNo: { min: 2, max: 100 },
  scheduledAt: { length: 19 },
} as const;

const scheduledAtSchema = z.iso.datetime({
  local: true,
  error: "Scheduled time must be in format YYYY-MM-DDTHH:mm:ss",
});

const equipmentMappingSchema = z.object({
  recipeEquipmentId: z.number({ error: "Recipe Equipment is required." }).min(1, "Recipe Equipment is required."),
  executionEquipmentId: z.number({ error: "Execution Equipment is required." }).min(1, "Execution Equipment is required."),
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
    .regex(
      /^[A-Z0-9_-]+$/,
      "Batch No must contain only uppercase letters, numbers, underscores (_) and hyphens (-)."
    ),
  batchSize: z
    .string({ error: "Batch Size is required." })
    .min(1, "Batch Size is required")
    .trim(),

  recipeId: z
    .number({ error: "Recipe Id is required." })
    .min(1, "Recipe Id is required"),

  unitId: z
    .number({ error: "Unit Id is required." })
    .min(1, "Unit Id is required"),

  shiftInchargeId: z
    .number({ error: "Shift Incharge Id is required." })
    .min(1, "Shift Incharge Id is required"),

  equipmentMappings: z
    .array(equipmentMappingSchema).optional(),
});

export const updateControlRecipeSchema = createControlRecipeSchema.omit({
  recipeId: true,
  equipmentMappings: true,
  unitId: true,
});

export type CreateControlRecipeSchema = z.infer<
  typeof createControlRecipeSchema
>;

export type UpdateControlRecipeSchema = z.infer<
  typeof updateControlRecipeSchema
>;
