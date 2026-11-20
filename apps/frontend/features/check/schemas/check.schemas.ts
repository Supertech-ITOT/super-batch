import { z } from "zod";

export const batchCheckResultSchema = z.object({
  checkParameterId: z.number().positive(),
  value: z.string().trim(),
});

export const batchCheckSchema = z.object({
  results: z.array(batchCheckResultSchema).min(1, "At least one check result is required"),
});

export type BatchCheckFormValues = z.infer<typeof batchCheckSchema>;

export const batchCheckDefaultValues: BatchCheckFormValues = {
  results: [],
};
