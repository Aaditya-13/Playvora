import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string()
        .trim()
        .min(3)
        .max(30),

    fullName: z
        .string()
        .trim()
        .min(1)
        .max(50),

    email: z
        .string()
        .trim()
        .email()
        .toLowerCase(),

    password: z
        .string()
        .min(6)
        .max(30),
});

export const loginSchema = z.object({
    email: z
        .email()
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(6),
});



export const deleteAccountSchema = z.object({
    password: z
        .string()
        .min(6)
        .max(30),
});