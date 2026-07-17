import z from "zod";

export const TransitionSchemaLimit = {
    name: { min: 2, max: 100 },
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
        )
});

export type TransitionSchema = z.infer<typeof transitionSchema>;