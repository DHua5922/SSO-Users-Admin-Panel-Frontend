import { z } from "zod";

export const dashboardStatsSchema = z.object({
	totalUsers: z.number(),
	totalRoles: z.number(),
});
