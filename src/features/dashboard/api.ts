import { createAxiosInstance } from "../../shared/api/instance";
import { METHOD_GET } from "../../shared/constants";
import { dashboardStatsSchema } from "./schemas";

const axios = createAxiosInstance("/api/v1/dashboard");

export async function getDashboardStatsApi() {
	const response = await axios({
		method: METHOD_GET,
		url: "/stats",
	});

	return dashboardStatsSchema.parse(response.data);
}
