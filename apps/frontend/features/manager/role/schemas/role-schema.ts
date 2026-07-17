import { access } from "fs";
import { z } from "zod";

export const RoleSchemaLimit = {
    name: { min: 2, max: 100 },
    description: { max: 255 }
} as const;

const permissionSchema = z
    .object({
        moduleId: z.string({ error: "Module is required." }).min(1, "Module is required").trim(),
        access: z.boolean(),
    })

export const roleSchema = z.object({
    name: z
        .string()
        .trim()
        .min(
            RoleSchemaLimit.name.min,
            `Role name must be at least ${RoleSchemaLimit.name.min} characters`
        )
        .max(
            RoleSchemaLimit.name.max,
            `Role name cannot exceed ${RoleSchemaLimit.name.max} characters`
        ),

    description: z
        .string()
        .trim()
        .max(
            RoleSchemaLimit.description.max,
            `Description cannot exceed ${RoleSchemaLimit.description.max} characters`
        ),


    permissions: z
        .array(permissionSchema)
        .refine(
            (permissions) => permissions.some((p) => p.access),
            {
                message: "At least one permission must be assigned.",
            }
        ),
});

export type RoleSchema = z.infer<typeof roleSchema>;