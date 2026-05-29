import z from "zod";

export const loginSchema = z.object({
    username: z.string().trim(),
    password: z.string().trim()
});

export type LoginSchema = z.infer<typeof loginSchema>;