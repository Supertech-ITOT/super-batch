import { z } from "zod";
import { StatusType } from "../types/status.type";

export const EquipmentSchemaLimit = {
    name: { min: 2, max: 100 },
    description: { min: 2, max: 100 },
    tagName: { min: 2, max: 50 },
} as const;

export const equipmentSchema = z.object({
    name: z
        .string()
        .trim()
        .min(
            EquipmentSchemaLimit.name.min,
            `Equipment name must be at least ${EquipmentSchemaLimit.name.min} characters`
        )
        .max(
            EquipmentSchemaLimit.name.max,
            `Equipment name cannot exceed ${EquipmentSchemaLimit.name.max} characters`
        )
        .regex(
            /^[a-zA-Z0-9\s&()\-_,.]+$/,
            "Equipment name contains invalid characters"
        ),

    description: z
        .string()
        .trim()
        .min(
            EquipmentSchemaLimit.description.min,
            `Description must be at least ${EquipmentSchemaLimit.description.min} characters`
        )
        .max(
            EquipmentSchemaLimit.description.max,
            `Description cannot exceed ${EquipmentSchemaLimit.description.max} characters`
        ),

    status: z.enum(StatusType),

    tagName: z
        .string()
        .trim()
        .min(
            EquipmentSchemaLimit.tagName.min,
            `Tag name must be at least ${EquipmentSchemaLimit.tagName.min} characters`
        )
        .max(
            EquipmentSchemaLimit.tagName.max,
            `Tag name cannot exceed ${EquipmentSchemaLimit.tagName.max} characters`
        )
        .regex(
            /^[A-Z0-9\-_]+$/,
            "Tag name must contain only uppercase letters, numbers, hyphen, or underscore"
        ),

    uom: z.string({ error: "Uom type is required." }).trim(),

    equipmentType: z.string({ error: "Equipment type is required." }).trim(),

    unitId: z.string({ error: "Unit is required." }).trim()
});

export type EquipmentSchema = z.infer<typeof equipmentSchema>;