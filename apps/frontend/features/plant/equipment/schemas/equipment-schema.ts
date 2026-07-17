import { z } from "zod";

export const EquipmentSchemaLimit = {
    name: { min: 2, max: 100 },
    description: { min: 2, max: 100 },
    code: { min: 2, max: 50 },
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

    code: z
        .string()
        .trim()
        .min(
            EquipmentSchemaLimit.code.min,
            `code must be at least ${EquipmentSchemaLimit.code.min} characters`
        )
        .max(
            EquipmentSchemaLimit.code.max,
            `code cannot exceed ${EquipmentSchemaLimit.code.max} characters`
        )
        .regex(
            /^[A-Z0-9\-_]+$/,
            "code must contain only uppercase letters, numbers, hyphen, or underscore"
        ),


    capacity: z.string({ error: "Capacity is required." }).trim(),

    unitId: z.string({ error: "Unit is required." }).trim()
});

export type EquipmentSchema = z.infer<typeof equipmentSchema>;


export const updateEquipmentSchema = equipmentSchema.omit({
    unitId: true,
});

export type UpdateEquipmentSchema = z.infer<
    typeof updateEquipmentSchema
>;


export const equipmentAssignmentSchema = z.object({
    equipmentId: z.string({ error: "Equipment is required." }).trim(),
    unitId: z.string({ error: "Unit is required." }).trim(),
});

export type EquipmentAssignmentSchema = z.infer<typeof equipmentAssignmentSchema>;

export type AssignEquipmentSchema = EquipmentAssignmentSchema;
export type UnAssignEquipmentSchema = EquipmentAssignmentSchema;