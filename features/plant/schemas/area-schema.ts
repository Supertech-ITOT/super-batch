import { z } from "zod";
import { StatusType } from "../../common/types/status.type";

export const AreaSchemaLimit = {
    name: { min: 2, max: 100 },
    description: { min: 2, max: 100 },
    areaType: { min: 2, max: 50 },
} as const;

export const areaSchema = z.object({
    name: z
        .string()
        .trim()
        .min(
            AreaSchemaLimit.name.min,
            `Area name must be at least ${AreaSchemaLimit.name.min} characters`
        )
        .max(
            AreaSchemaLimit.name.max,
            `Area name cannot exceed ${AreaSchemaLimit.name.max} characters`
        )
        .regex(
            /^[a-zA-Z0-9\s&()\-_,.]+$/,
            "Area name contains invalid characters"
        ),

    description: z
        .string()
        .trim()
        .min(
            AreaSchemaLimit.description.min,
            `Description must be at least ${AreaSchemaLimit.description.min} characters`
        )
        .max(
            AreaSchemaLimit.description.max,
            `Description cannot exceed ${AreaSchemaLimit.description.max} characters`
        ),


    status: z.enum(StatusType),

    areaType: z
        .string()
        .trim()
        .min(
            AreaSchemaLimit.areaType.min,
            `Area type must be at least ${AreaSchemaLimit.areaType.min} characters`
        )
        .max(
            AreaSchemaLimit.areaType.max,
            `Area type cannot exceed ${AreaSchemaLimit.areaType.max} characters`
        )
        .regex(
            /^[a-zA-Z0-9\s\-_/]+$/,
            "Area type contains invalid characters"
        ),

    plantId: z.string({ error: "Plant is required" }).trim()
});

export type AreaSchema = z.infer<typeof areaSchema>;