import { z } from "zod";

export const userSchema = z.object({
	_id: z.string(),
	email: z.string(),
	username: z.string(),
	role: z.string(),
});
export type User = z.infer<typeof userSchema>;
