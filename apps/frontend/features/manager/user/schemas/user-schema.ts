import { z } from "zod";

export const UserSchemaLimit = {
    name: { min: 2, max: 100 },
    email: { min: 5, max: 100 },
    password: { min: 8, max: 50 },
} as const;

const userBaseSchema = z.object({
    name: z
        .string()
        .trim()
        .min(
            UserSchemaLimit.name.min,
            `Name must be at least ${UserSchemaLimit.name.min} characters`
        )
        .max(
            UserSchemaLimit.name.max,
            `Name cannot exceed ${UserSchemaLimit.name.max} characters`
        )
        .regex(
            /^[a-zA-Z\s]+$/,
            "Name can only contain letters and spaces"
        ),

    email: z
        .email("Please enter a valid email address")
        .max(
            UserSchemaLimit.email.max,
            `Email cannot exceed ${UserSchemaLimit.email.max} characters`
        ),

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

    roleId: z
        .number({ error: "Role is required" })
        .min(1, "Role is required"),
});

export const userSchema = userBaseSchema.refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
);

export const updateUserSchema = userBaseSchema.omit({
    password: true,
    confirmPassword: true,
});

export type UserSchema = z.infer<typeof userSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;