import { z } from "zod";

export const AreaSchemaLimit = {
    name: { min: 2, max: 100 },
    description: { min: 2, max: 255 },
} as const;

export const areaSchema = z.object({
    name: z
        .string()
        .trim()
        .min(
            AreaSchemaLimit.name.min,
            `Area name must be at least ${AreaSchemaLimit.name.min} characters`
        )
        .max(
            AreaSchemaLimit.name.max,
            `Area name cannot exceed ${AreaSchemaLimit.name.max} characters`
        )
        .regex(
            /^[a-zA-Z0-9\s&()\-_,.]+$/,
            "Area name contains invalid characters"
        ),

    description: z
        .string()
        .trim()
        .min(
            AreaSchemaLimit.description.min,
            `Description must be at least ${AreaSchemaLimit.description.min} characters`
        )
        .max(
            AreaSchemaLimit.description.max,
            `Description cannot exceed ${AreaSchemaLimit.description.max} characters`
        ),

    plantId: z.number({ error: "Plant is required" }).min(1, "Plant is required")
});

export type AreaSchema = z.infer<typeof areaSchema>;

export const areaDefaultValues: AreaSchema = { name: "", plantId: 0, description: "" }