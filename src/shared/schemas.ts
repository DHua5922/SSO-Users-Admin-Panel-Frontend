import { z } from "zod";

export const roleSchema = z.object({
	_id: z.string(),
	name: z.string().min(1, "Role name is required"),
	description: z.string(),
});

export type Role = z.infer<typeof roleSchema>;
