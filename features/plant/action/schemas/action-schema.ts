import z from "zod";

export const ActionSchemaLimit = {
    name: { min: 2, max: 100 },
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
});

export type ActionSchema = z.infer<typeof actionSchema>;