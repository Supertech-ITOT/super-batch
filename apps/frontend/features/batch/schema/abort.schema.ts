import { z } from "zod";

export const AbortSchemaLimit = {
    remark: {
        min: 3,
        max: 500,
    },
} as const;

export const abortBatchSchema = z.object({
    remark: z
        .string()
        .trim()
        .min(
            AbortSchemaLimit.remark.min,
            `Abort reason must be at least ${AbortSchemaLimit.remark.min} characters`,
        )
        .max(
            AbortSchemaLimit.remark.max,
            `Abort reason cannot exceed ${AbortSchemaLimit.remark.max} characters`,
        ),
});

export type AbortBatchSchema = z.infer<typeof abortBatchSchema>;

export const abortBatchDefaultValues: AbortBatchSchema = {
    remark: "",
};