import { z } from "zod";

export const equipmentSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Equipment name must contain at least 2 characters")
        .max(50, "Equipment name cannot exceed 50 characters"),
    unitId: z.string().trim(),
    equipmentType: z.string().trim().min(2, "Equipment type is required")
});

export type EquipmentSchema = z.infer<typeof equipmentSchema>;