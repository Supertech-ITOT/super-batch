import { z } from "zod";

export const RoleSchemaLimit = {
    name: { min: 2, max: 100 },
    description: { max: 255 }
} as const;

export const roleSchema = z.object({
    name: z
        .string()
        .min(1, "Role name is required")
        .max(100, "Role name cannot exceed 100 characters"),

    description: z
        .string()
        .max(255, "Description cannot exceed 255 characters")
});

export type RoleSchema = z.infer<typeof roleSchema>;