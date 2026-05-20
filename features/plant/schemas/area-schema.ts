import { z } from "zod";

export const areaSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Area name must contain at least 2 characters")
        .max(50, "Area name cannot exceed 50 characters"),
    plantId: z.number({ error: "Plant is required" })
        .min(1, "Plant is required"),
});

export type AreaSchema = z.infer<typeof areaSchema>;