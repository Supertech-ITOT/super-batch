import z from "zod";

export const MessageSchemaLimit = {
    name: { min: 2, max: 255 },
} as const;

export const messageSchema = z.object({
    name: z
        .string()
        .trim()
        .min(
            MessageSchemaLimit.name.min,
            `Message must be at least ${MessageSchemaLimit.name.min} characters`
        )
        .max(
            MessageSchemaLimit.name.max,
            `Message cannot exceed ${MessageSchemaLimit.name.max} characters`
        ),
});

export type MessageSchema = z.infer<typeof messageSchema>;