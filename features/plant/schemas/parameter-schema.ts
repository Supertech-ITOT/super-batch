import z from "zod";

export const ParameterSchemaLimit = {
    name: { min: 2, max: 100 },
    code: { min: 2, max: 50 },
} as const;


export const parameterSchema = z.object({
    name: z
        .string()
        .trim()
        .min(
            ParameterSchemaLimit.name.min,
            `Parameter name must be at least ${ParameterSchemaLimit.name.min} characters`
        )
        .max(
            ParameterSchemaLimit.name.max,
            `Parameter name cannot exceed ${ParameterSchemaLimit.name.max} characters`
        )
        .regex(
            /^[a-zA-Z0-9\s&()\-_,.]+$/,
            "Parameter name contains invalid characters"
        ),

    code: z
        .string()
        .trim()
        .min(
            ParameterSchemaLimit.code.min,
            `Parameter code must be at least ${ParameterSchemaLimit.code.min} characters`
        )
        .max(
            ParameterSchemaLimit.code.max,
            `Parameter code cannot exceed ${ParameterSchemaLimit.code.max} characters`
        )
        .regex(
            /^[A-Z0-9\-_]+$/,
            "Parameter code must contain only uppercase letters, numbers, hyphen, or underscore"
        ),

    uom: z.string({ error: "Uom type is required." }).min(1, "UOM is required").trim(),
    active: z.boolean(),
});

export type ParameterSchema = z.infer<typeof parameterSchema>;