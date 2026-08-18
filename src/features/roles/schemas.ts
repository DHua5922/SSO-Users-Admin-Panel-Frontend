import { z } from "zod";
import { REQUIRED_NAME_ERROR_MESSAGE } from "./constants/message";

export const roleSchema = z.object({
	_id: z.string(),
	name: z.string().min(1, REQUIRED_NAME_ERROR_MESSAGE),
	description: z.string(),
});

export const upsertRoleFormDataSchema = z.object({
	name: z.string().min(1, REQUIRED_NAME_ERROR_MESSAGE),
	description: z.string(),
});

export type UpsertRoleFormData = z.infer<typeof upsertRoleFormDataSchema>;
export type Role = z.infer<typeof roleSchema>;
