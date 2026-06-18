import z from "zod";

export const loginSchema = z.object({
    email: z
        .email("Please enter a valid email address")
        .trim()
        .min(1, "Email is required"),


    password: z
        .string()
        .trim()
        .min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;