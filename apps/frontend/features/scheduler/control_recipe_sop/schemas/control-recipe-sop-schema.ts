import { z } from "zod"

export const ControlRecipeSOPSchemaLimit = {
    stdTime: { min: 1 },
    message: { min: 2, max: 255 },
    actionId: { min: 1 },
    transitionId: { min: 1 },
} as const

const controlRecipeSOPMaterialSchema = z.object({
    materialId: z.number().min(1, "Material is required."),
    stdQty: z.number().nonnegative("Standard Quantity cannot be negative."),
});

const controlRecipeSOPParameterSchema = z.object({
    parameterId: z.number().min(1, "Parameter is required."),
    stdValue: z.number().nonnegative("Standard Value cannot be negative."),
});

export const controlRecipeSOPSchema = z.object({
    stdTime: z.string({ error: "Standard time is required." }).trim().min(ControlRecipeSOPSchemaLimit.stdTime.min, `Standard Time is required.`).refine(
        value => value !== "00:00:00",
        "Standard Time is required"
    ),
    message: z.string().trim().min(ControlRecipeSOPSchemaLimit.message.min, `Message must be between 2 - 255 chars.`).max(ControlRecipeSOPSchemaLimit.message.max, `Message must be between 2 - 255 chars.`),
    actionId: z.number({ error: `Action is required.` }).min(1, "Action is required"),
    transitionId: z.number({ error: `Transition is required.` }).min(1, "Transition is required"),
    fromEquipmentId: z.number({ error: `From Equipment is required.` }).min(1, "From Equipment is required").nullable().optional(),
    toEquipmentId: z.number({ error: `To Equipment is required.` }).min(1, "To Equipment is required"),
    materials: z.array(controlRecipeSOPMaterialSchema).optional(),
    parameters: z.array(controlRecipeSOPParameterSchema)
}).refine(
    data =>
        data.fromEquipmentId == null ||
        data.toEquipmentId == null ||
        data.fromEquipmentId !== data.toEquipmentId,
    {
        path: ["toEquipmentId"],
        message: "From Equipment and To Equipment cannot be the same.",
    }
);

export type ControlRecipeSOPSchema = z.infer<typeof controlRecipeSOPSchema>;