import { z } from "zod";

export const setupSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "Name is required."),
        companyName: z
            .string()
            .trim()
            .min(1, "Company name is required."),

        email: z
            .string()
            .trim()
            .min(1, "Email is required.")
            .email("Please enter a valid email address."),

        password: z
            .string()
            .trim()
            .min(1, "Password is required.")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
                "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character."
            ),

        confirmPassword: z
            .string()
            .trim()
            .min(1, "Confirm password is required.")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
                "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character."
            ),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export type SetupSchema = z.infer<typeof setupSchema>;

export const setupDefaultValues: SetupSchema = {
    name: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
};