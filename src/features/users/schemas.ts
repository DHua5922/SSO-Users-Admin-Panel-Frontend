import { z } from "zod";
import {
	INVALID_EMAIL_ERROR_MESSAGE,
	NO_MATCHING_PASSWORDS_ERROR_MESSAGE,
	REQUIRED_PASSWORD_ERROR_MESSAGE,
	REQUIRED_ROLE_ERROR_MESSAGE,
	REQUIRED_USERNAME_ERROR_MESSAGE,
} from "./constants";

const upsertUserFormFieldsSchema = z.object({
	username: z.string().min(1, REQUIRED_USERNAME_ERROR_MESSAGE),
	email: z.email(INVALID_EMAIL_ERROR_MESSAGE),
	password: z.string(),
	role: z.string().min(1, REQUIRED_ROLE_ERROR_MESSAGE),
	confirmPassword: z.string(),
});

export function createUpsertUserFormSchema(isEditing: boolean) {
	return upsertUserFormFieldsSchema.superRefine((data, context) => {
		if (!isEditing && !data.password) {
			context.addIssue({
				code: "custom",
				message: REQUIRED_PASSWORD_ERROR_MESSAGE,
				path: ["password"],
			});
		}

		if (data.password !== data.confirmPassword) {
			context.addIssue({
				code: "custom",
				message: NO_MATCHING_PASSWORDS_ERROR_MESSAGE,
				path: ["confirmPassword"],
			});
		}
	});
}

export const userSchema = z.object({
	_id: z.string().min(1),
	email: z.email(),
	username: z.string().min(1),
	role: z.object({
		_id: z.string().min(1),
		name: z.string().min(1),
	}),
	systemManaged: z.boolean(),
});

const upsertUserSchema = userSchema
	.omit({ _id: true, systemManaged: true })
	.extend({
		_id: z.string().min(1).optional(),
		role: z.string().min(1),
		password: z.string().optional(),
		confirmPassword: z.string().optional(),
	});

export type UpsertUserFormData = z.infer<typeof upsertUserFormFieldsSchema>;
export type User = z.infer<typeof userSchema>;
export type UpsertUser = z.infer<typeof upsertUserSchema>;
