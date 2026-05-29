import { z } from "zod";
import { StatusType } from "../../common/types/status.type";

export const PlantSchemaLimit = {
    name: { min: 3, max: 100, },
    description: { min: 2, max: 100, },
    location: { min: 2, max: 100, },
    plantType: { min: 2, max: 50, },
} as const;

export const plantSchema = z.object({
    name: z
        .string()
        .trim()
        .min(
            PlantSchemaLimit.name.min,
            `Plant name must be at least ${PlantSchemaLimit.name.min} characters`
        )
        .max(
            PlantSchemaLimit.name.max,
            `Plant name cannot exceed ${PlantSchemaLimit.name.max} characters`
        )
        .regex(
            /^[a-zA-Z0-9\s&()\-_,.]+$/,
            "Plant name contains invalid characters"
        ),

    description: z
        .string()
        .trim()
        .min(
            PlantSchemaLimit.description.min,
            `Description must be at least ${PlantSchemaLimit.description.min} characters`
        )
        .max(
            PlantSchemaLimit.description.max,
            `Description cannot exceed ${PlantSchemaLimit.description.max} characters`
        ),

    location: z
        .string()
        .trim()
        .min(
            PlantSchemaLimit.location.min,
            `Location must be at least ${PlantSchemaLimit.location.min} characters`
        )
        .max(
            PlantSchemaLimit.location.max,
            `Location cannot exceed ${PlantSchemaLimit.location.max} characters`
        ),

    status: z.enum(StatusType),

    plantType: z
        .string()
        .trim()
        .min(
            PlantSchemaLimit.plantType.min,
            `Plant type must be at least ${PlantSchemaLimit.plantType.min} characters`
        )
        .max(
            PlantSchemaLimit.plantType.max,
            `Plant type cannot exceed ${PlantSchemaLimit.plantType.max} characters`
        )
        .regex(
            /^[a-zA-Z0-9\s\-_/]+$/,
            "Plant type contains invalid characters"
        ),
});

export type PlantSchema = z.infer<typeof plantSchema>;