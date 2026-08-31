import { z } from "zod";

export const RecipeSchemaLimit = {
    name: { min: 2, max: 100 },
    description: { min: 2, max: 255 },
} as const;

export const baseRecipeSchema = z.object({
    name: z
        .string()
        .trim()
        .min(
            RecipeSchemaLimit.name.min,
            `Recipe name must be at least ${RecipeSchemaLimit.name.min} characters`
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

    batchSize: z
        .number({ error: "Batch size is required." })
        .min(1, "Batch size is required"),

    materialId: z
        .number({ error: "Product is required." })
        .min(1, "Product is required"),

    unitId: z
        .number({ error: "Unit is required." })
        .min(1, "Unit is required"),

    status: z
        .string()
        .trim()
        .min(1, "Status is required"),
});

export const createRecipeSchema = baseRecipeSchema.omit({
    status: true,
});

export const updateRecipeSchema = baseRecipeSchema.omit({
    unitId: true,
});

export type CreateRecipeSchema = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeSchema = z.infer<typeof updateRecipeSchema>;

export const recipeDefaultValues: CreateRecipeSchema = {
    name: "",
    description: "",
    batchSize: 0,
    materialId: 0,
    unitId: 0,
};