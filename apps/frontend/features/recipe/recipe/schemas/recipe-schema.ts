import { z } from "zod"

export const RecipeSchemaLimit = {
    name: { min: 2, max: 100 },
    description: { min: 2, max: 255 },
} as const

export const baseRecipeSchema = z.object({
    name: z.string()
        .trim()
        .min(
            RecipeSchemaLimit.name.min,
            ` Recipe name must be atleast ${RecipeSchemaLimit.name.min} characters`
        )
        .max(
            RecipeSchemaLimit.name.max,
            `Recipe name cannot exceed ${RecipeSchemaLimit.name.max} characters`
        )
        .regex(
            /^[a-zA-Z0-9\s&()\-_,.]+$/,
            "Recipe name contains invalid characters"
        ),

    description: z
        .string()
        .trim()
        .min(
            RecipeSchemaLimit.description.min,
            `Description must be at least ${RecipeSchemaLimit.description.min} characters`
        )
        .max(
            RecipeSchemaLimit.description.max,
            `Description cannot exceed ${RecipeSchemaLimit.description.max} characters`
        ),

    batchSize: z.string()
        .trim()
        .min(1, "Batch size must be greater than 0"),

    materialId: z
        .string()
        .trim()
        .min(1, `MaterialId must is required`),

    unitId: z
        .string()
        .trim()
        .min(1, `UnitId must is required`),

    status: z
        .string()
        .trim()
        .min(1, `Status must is required`)
});


export const createRecipeSchema = baseRecipeSchema;

export const updateRecipeSchema = baseRecipeSchema.omit({
    unitId: true,
});

export type CreateRecipeSchema = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeSchema = z.infer<typeof updateRecipeSchema>;