import { z } from "zod";
import {
	INVALID_EMAIL_ERROR_MESSAGE,
	NO_MATCHING_PASSWORDS_ERROR_MESSAGE,
	REQUIRED_ROLE_ERROR_MESSAGE,
	REQUIRED_USERNAME_ERROR_MESSAGE,
} from "./constants";

export const upsertUserFormSchema = z
	.object({
		username: z.string().min(1, REQUIRED_USERNAME_ERROR_MESSAGE),
		email: z.email(INVALID_EMAIL_ERROR_MESSAGE),
		password: z.string(),
		role: z.string().min(1, REQUIRED_ROLE_ERROR_MESSAGE),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: NO_MATCHING_PASSWORDS_ERROR_MESSAGE,
		path: ["confirmPassword"],
	});

export const userSchema = z.object({
	_id: z.string().min(1),
	email: z.string(),
	username: z.string(),
	role: z.string(),
	systemManaged: z.boolean(),
});

const upsertUserSchema = userSchema
	.omit({ _id: true, systemManaged: true })
	.extend({
		_id: z.string().min(1).optional(),
		password: z.string().optional(),
		confirmPassword: z.string().optional(),
	});

export type UpsertUserFormData = z.infer<typeof upsertUserFormSchema>;
export type User = z.infer<typeof userSchema>;
export type UpsertUser = z.infer<typeof upsertUserSchema>;
