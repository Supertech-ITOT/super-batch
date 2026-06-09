import z from "zod";

export const ActionSchemaLimit = {
    name: { min: 2, max: 100 },
    code: { min: 2, max: 50 },
} as const;


export const actionSchema = z.object({
    name: z
        .string()
        .trim()
        .min(
            ActionSchemaLimit.name.min,
            `Action name must be at least ${ActionSchemaLimit.name.min} characters`
        )
        .max(
            ActionSchemaLimit.name.max,
            `Action name cannot exceed ${ActionSchemaLimit.name.max} characters`
        )
        .regex(
            /^[a-zA-Z0-9\s&()\-_,.]+$/,
            "Action name contains invalid characters"
        ),

    code: z
        .string()
        .trim()
        .min(
            ActionSchemaLimit.code.min,
            `Action code must be at least ${ActionSchemaLimit.code.min} characters`
        )
        .max(
            ActionSchemaLimit.code.max,
            `Action code cannot exceed ${ActionSchemaLimit.code.max} characters`
        )
        .regex(
            /^[A-Z0-9\-_]+$/,
            "Action code must contain only uppercase letters, numbers, hyphen, or underscore"
        ),

    active: z.boolean(),
});

export type ActionSchema = z.infer<typeof actionSchema>;