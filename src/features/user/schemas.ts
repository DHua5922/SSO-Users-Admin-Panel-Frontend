import { z } from "zod";

export const userSchema = z.object({
  _id: z.string(),
  email: z.string(),
  username: z.string(),
  role: z.string(),
});

export const upsertUserSchema = userSchema.extend({
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

export const upsertUserFormSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email address"),
    password: z.string(),
    role: z.string().min(1, "Role is required"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
	path: ["confirmPassword"],
  });

export type UpsertUserFormData = z.infer<typeof upsertUserFormSchema>;
export type User = z.infer<typeof userSchema>;
export type UpsertUser = z.infer<typeof upsertUserSchema>;
