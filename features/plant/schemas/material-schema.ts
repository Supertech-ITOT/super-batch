import z from "zod";

export const MaterialSchemaLimit = {
    name: { min: 2, max: 100 },
    description: { min: 2, max: 100 },
    code: { min: 2, max: 50 },
} as const;


export const materialSchema = z.object({
    id: z.string({ error: "Id is required." }).min(1, "Id is required").trim(),

    name: z
        .string()
        .trim()
        .min(
            MaterialSchemaLimit.name.min,
            `Material name must be at least ${MaterialSchemaLimit.name.min} characters`
        )
        .max(
            MaterialSchemaLimit.name.max,
            `Material name cannot exceed ${MaterialSchemaLimit.name.max} characters`
        )
        .regex(
            /^[a-zA-Z0-9\s&()\-_,.]+$/,
            "Material name contains invalid characters"
        ),

    code: z
        .string()
        .trim()
        .min(
            MaterialSchemaLimit.code.min,
            `Material code must be at least ${MaterialSchemaLimit.code.min} characters`
        )
        .max(
            MaterialSchemaLimit.code.max,
            `Material code cannot exceed ${MaterialSchemaLimit.code.max} characters`
        )
        .regex(
            /^[A-Z0-9\-_]+$/,
            "Material code must contain only uppercase letters, numbers, hyphen, or underscore"
        ),

    description: z
        .string()
        .trim()
        .min(
            MaterialSchemaLimit.description.min,
            `Description must be at least ${MaterialSchemaLimit.description.min} characters`
        )
        .max(
            MaterialSchemaLimit.description.max,
            `Description cannot exceed ${MaterialSchemaLimit.description.max} characters`
        ),


    materialType: z.string({ error: "Material Type is required." }).min(1, "Material Type is required").trim(),

    uom: z.string({ error: "Uom type is required." }).min(1, "UOM is required").trim(),
});

export type MaterialSchema = z.infer<typeof materialSchema>;