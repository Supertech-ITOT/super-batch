import { z } from "zod";


export const materialCorrectionSchema = z.object({
    materialId: z
        .number({ error: "Material is required." })
        .min(1, "Material is required"),
    qty: z
        .number({ error: "Material Qty is required." })
        .min(1, "Material Qty is required"),

});


export type MaterialCorrectionSchema = z.infer<typeof materialCorrectionSchema>;

export const materialCorrectionDefaultValues: MaterialCorrectionSchema = {
    materialId: 0,
    qty: 0,
};
