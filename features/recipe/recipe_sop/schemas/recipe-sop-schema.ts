import { z } from "zod"

export const RecipeSOPSchemaLimit = {
    stdTime: { min: 1 },
    message: { min: 2, max: 255 },
    actionId: { min: 1 },
    transitionId: { min: 1 },
} as const

const recipeSOPMaterialSchema = z.object({
    materialId: z.number().min(1, "Material is required."),
    stdQty: z.number().nonnegative("Standard Quantity cannot be negative."),
});

const recipeSOPParameterSchema = z.object({
    parameterId: z.number().min(1, "Parameter is required."),
    stdValue: z.number().nonnegative("Standard Value cannot be negative."),
});

export const recipeSOPSchema = z.object({
    stdTime: z.string({ error: "Standard time is required." }).trim().min(RecipeSOPSchemaLimit.stdTime.min, `Standard Time is required.`).refine(
        value => value !== "00:00:00",
        "Standard Time is required"
    ),
    message: z.string().trim().min(RecipeSOPSchemaLimit.message.min, `Message must be between 2 - 255 chars.`).max(RecipeSOPSchemaLimit.message.max, `Message must be between 2 - 255 chars.`),
    actionId: z.number({ error: `Action is required.` }).min(1, "Action is required"),
    transitionId: z.number({ error: `Transition is required.` }).min(1, "Transition is required"),
    fromEquipmentId: z.number({ error: `From Equipment is required.` }).min(1, "From Equipment is required").optional(),
    toEquipmentId: z.number({ error: `To Equipment is required.` }).min(1, "To Equipment is required"),
    materials: z.array(recipeSOPMaterialSchema).optional(),
    parameters: z.array(recipeSOPParameterSchema)
});

export type RecipeSOPSchema = z.infer<typeof recipeSOPSchema>;