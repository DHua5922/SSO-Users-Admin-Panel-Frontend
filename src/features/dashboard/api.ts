import { createAxiosInstance } from "../../shared/api/instance";
import { dashboardStatsSchema } from "./schemas";

const axios = createAxiosInstance("/api/v1/dashboard");

export async function getDashboardStatsApi() {
  const response = await axios({
    method: "get",
    url: "/stats",
  });

  return dashboardStatsSchema.parse(response.data);
}
