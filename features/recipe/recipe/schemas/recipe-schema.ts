import { z } from "zod"

export const RecipeSchemaLimit = {
    stdTime: { min: 1 },
    message: { min: 2, max: 255 },
    actionId: { min: 1 },
    transitionId: { min: 1 },
} as const

const recipeMaterialSchema = z.object({
    materialId: z.number().min(1, "Material is required."),
    stdQty: z.number().nonnegative("Standard Quantity cannot be negative."),
});

const recipeParameterSchema = z.object({
    parameterId: z.number().min(1, "Parameter is required."),
    stdValue: z.number().nonnegative("Standard Value cannot be negative."),
});

export const recipeSchema = z.object({
    stdTime: z.string({ error: "Standard time is required." }).trim().min(RecipeSchemaLimit.stdTime.min, `Standard Time is required.`).refine(
        value => value !== "00:00:00",
        "Standard Time is required"
    ),
    message: z.string().trim().min(RecipeSchemaLimit.message.min, `Message must be between 2 - 255 chars.`).max(RecipeSchemaLimit.message.max, `Message must be between 2 - 255 chars.`),
    actionId: z.number({ error: `Action is required.` }).min(1, "Action is required"),
    transitionId: z.number({ error: `Transition is required.` }).min(1, "Transition is required"),
    materials: z.array(recipeMaterialSchema).optional(),
    parameters: z.array(recipeParameterSchema).optional(),
});

export type RecipeSchema = z.infer<typeof recipeSchema>;