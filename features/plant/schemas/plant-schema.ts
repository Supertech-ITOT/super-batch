import { z } from "zod";

export const plantSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Plant name must contain at least 2 characters")
        .max(50, "Plant name cannot exceed 50 characters")
});

export type PlantSchema = z.infer<typeof plantSchema>;