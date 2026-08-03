import z from "zod";

export const resetFirstPasswordSchema = z
    .object({
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

export type ResetFirstPasswordSchema = z.infer<typeof resetFirstPasswordSchema>;
export const resetFirstPasswordDefaultValues: ResetFirstPasswordSchema = {
    password: "",
    confirmPassword: "",
};