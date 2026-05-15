import { z } from "zod";

export const plantSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Plant name is required")
        .max(50, "Plant name cannot exceed 50 characters")
});

export type PlantSchema = z.infer<typeof plantSchema>;