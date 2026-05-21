import { z } from "zod";

export const unitSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Unit name must contain at least 2 characters")
        .max(50, "Unit name cannot exceed 50 characters"),
    areaId: z.string().trim()
        .min(1, "Area is required"),
    unitType: z.string().trim().min(2, "Unit type is required")
});

export type UnitSchema = z.infer<typeof unitSchema>;