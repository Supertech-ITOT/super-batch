import { z } from "zod"

export const RecipeHeaderSchemaLimit = {
    name: { min: 2, max: 100 },
    description: { min: 2, max: 255 },
} as const

export const recipeHeaderSchema = z.object({
    name: z.string()
        .trim()
        .min(
            RecipeHeaderSchemaLimit.name.min,
            ` Recipe name must be atleast ${RecipeHeaderSchemaLimit.name.min} characters`
        )
        .max(
            RecipeHeaderSchemaLimit.name.max,
            `Recipe name cannot exceed ${RecipeHeaderSchemaLimit.name.max} characters`
        )
        .regex(
            /^[a-zA-Z0-9\s&()\-_,.]+$/,
            "Recipe  name contains invalid characters"
        ),

    description: z
        .string()
        .trim()
        .min(
            RecipeHeaderSchemaLimit.description.min,
            `Description must be at least ${RecipeHeaderSchemaLimit.description.min} characters`
        )
        .max(
            RecipeHeaderSchemaLimit.description.max,
            `Description cannot exceed ${RecipeHeaderSchemaLimit.description.max} characters`
        ),

    batchSize: z.number()
        .positive("Batch size must be greater than 0"),

    batchSizeUom: z
        .string()
        .trim()
        .min(1, "Batch size UOM is required"),
});

export type RecipeSchema = z.infer<typeof recipeHeaderSchema>;