import { z } from "zod";
import { StatusType } from "../../common/types/status.type";

export const UnitSchemaLimit = {
    name: { min: 3, max: 100 },
    code: { min: 2, max: 30 },
    description: { min: 2, max: 100 },
} as const;

export const unitSchema = z.object({
    name: z
        .string()
        .trim()
        .min(
            UnitSchemaLimit.name.min,
            `Unit name must be at least ${UnitSchemaLimit.name.min} characters`
        )
        .max(
            UnitSchemaLimit.name.max,
            `Unit name cannot exceed ${UnitSchemaLimit.name.max} characters`
        )
        .regex(
            /^[a-zA-Z0-9\s&()\-_,.]+$/,
            "Unit name contains invalid characters"
        ),

    code: z
        .string()
        .trim()
        .min(
            UnitSchemaLimit.code.min,
            `Unit code must be at least ${UnitSchemaLimit.code.min} characters`
        )
        .max(
            UnitSchemaLimit.code.max,
            `Unit code cannot exceed ${UnitSchemaLimit.code.max} characters`
        )
        .regex(
            /^[A-Z0-9\-_]+$/,
            "Unit code must contain only uppercase letters, numbers, hyphen, or underscore"
        ),

    description: z
        .string()
        .trim()
        .min(
            UnitSchemaLimit.description.min,
            `Description must be at least ${UnitSchemaLimit.description.min} characters`
        )
        .max(
            UnitSchemaLimit.description.max,
            `Description cannot exceed ${UnitSchemaLimit.description.max} characters`
        ),

    status: z.enum(StatusType),

    unitType: z.string({ error: "Unit Type is required." }).trim(),

    areaId: z.string({ error: "Area is required." }).trim()
});

export type UnitSchema = z.infer<typeof unitSchema>;