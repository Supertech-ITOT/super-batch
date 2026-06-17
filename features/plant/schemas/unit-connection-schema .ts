import { z } from "zod";

export const unitConnectionSchema = z.object({
    sourceUnitId: z
        .string({ error: "Source Unit is required." })
        .min(1, "Source Unit is required")
        .trim(),

    destinationUnitId: z
        .string({ error: "Destination Unit is required." })
        .min(1, "Destination Unit is required")
        .trim(),

    connectionType: z
        .string({ error: "Connection Type is required." })
        .min(1, "Connection Type is required")
        .trim(),
}).refine(
    (data) => data.sourceUnitId !== data.destinationUnitId,
    {
        message: "Source and Destination Unit cannot be the same",
        path: ["destinationUnitId"],
    }
);

export type UnitConnectionSchema = z.infer<typeof unitConnectionSchema>;