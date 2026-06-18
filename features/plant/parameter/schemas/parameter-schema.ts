import z from "zod";

export const ParameterSchemaLimit = {
    name: { min: 2, max: 100 },
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
    uom: z.string({ error: "Uom type is required." }).min(1, "UOM is required").trim(),

});

export type ParameterSchema = z.infer<typeof parameterSchema>;