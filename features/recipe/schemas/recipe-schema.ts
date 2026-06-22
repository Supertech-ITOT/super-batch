import { z } from "zod"

export const RecipeSchemaLimit = {
    name: { min: 2, max: 100 },
    description: { min: 2, max: 255 },
} as const

export const recipeSchema = z.object({
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
            "Recipe  name contains invalid characters"
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

    batchSize: z.number()
        .positive("Batch size must be greater than 0"),

    batchSizeUom: z
        .string()
        .trim()
        .min(1, "Batch size UOM is required"),
});

export type RecipeSchema = z.infer<typeof recipeSchema>;