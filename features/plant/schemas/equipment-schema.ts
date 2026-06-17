import { z } from "zod";

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

    tagName: z
        .string()
        .trim()
        .min(
            EquipmentSchemaLimit.tagName.min,
            `tagName must be at least ${EquipmentSchemaLimit.tagName.min} characters`
        )
        .max(
            EquipmentSchemaLimit.tagName.max,
            `tagName cannot exceed ${EquipmentSchemaLimit.tagName.max} characters`
        )
        .regex(
            /^[A-Z0-9\-_]+$/,
            "tagName must contain only uppercase letters, numbers, hyphen, or underscore"
        ),


    equipmentType: z.string({ error: "equipmentType is required." }).trim(),

    unitId: z.string({ error: "Unit is required." }).trim()
});

export type EquipmentSchema = z.infer<typeof equipmentSchema>;