import { z } from "zod";

export const batchCheckResultSchema = z.object({
  checkParameterId: z.number().positive(),
  value: z.string().trim(),
});

export const batchCheckSchema = z.object({
  batchNo: z.string().trim().min(1, "Batch number is required"),
  stepNo: z.number().int().positive("Step number must be greater than 0"),
  results: z.array(batchCheckResultSchema).min(1, "At least one check result is required"),
});

export type BatchCheckFormValues = z.infer<typeof batchCheckSchema>;

export const batchCheckDefaultValues: BatchCheckFormValues = {
  batchNo: "",
  stepNo: 1,
  results: [],
};
