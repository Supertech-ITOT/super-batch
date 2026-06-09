import z from "zod";

export const TransitionSchemaLimit = {
    name: { min: 2, max: 100 },
    code: { min: 2, max: 50 },
} as const;


export const transitionSchema = z.object({
    name: z
        .string()
        .trim()
        .min(
            TransitionSchemaLimit.name.min,
            `Transition name must be at least ${TransitionSchemaLimit.name.min} characters`
        )
        .max(
            TransitionSchemaLimit.name.max,
            `Transition name cannot exceed ${TransitionSchemaLimit.name.max} characters`
        )
        .regex(
            /^[a-zA-Z0-9\s&()\-_,.]+$/,
            "Transition name contains invalid characters"
        ),

    code: z
        .string()
        .trim()
        .min(
            TransitionSchemaLimit.code.min,
            `Transition code must be at least ${TransitionSchemaLimit.code.min} characters`
        )
        .max(
            TransitionSchemaLimit.code.max,
            `Transition code cannot exceed ${TransitionSchemaLimit.code.max} characters`
        )
        .regex(
            /^[A-Z0-9\-_]+$/,
            "Transition code must contain only uppercase letters, numbers, hyphen, or underscore"
        ),

    active: z.boolean(),
});

export type TransitionSchema = z.infer<typeof transitionSchema>;