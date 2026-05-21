import { z } from "zod";

export const areaSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Area name must contain at least 2 characters")
        .max(50, "Area name cannot exceed 50 characters"),
    plantId: z.string().trim()
});

export type AreaSchema = z.infer<typeof areaSchema>;