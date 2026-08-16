import { HttpResponse, http } from "msw";
import {
	INTERNAL_SERVER_ERROR_STATUS_CODE,
	SUCCESS_STATUS_CODE,
} from "../../../../shared/constants";
import { server } from "../../../../shared/tests/vitest.setup";
import { DASHBOARD_STATS_ERROR_MESSAGE } from "../../constants";

const endpoint = "/api/v1/dashboard/stats";

export function mockGetDashboardStatsSuccessApi() {
	server.use(
		http.get(endpoint, () => {
			return HttpResponse.json(
				{
					usersCount: 10,
					rolesCount: 5,
				},
				{ status: SUCCESS_STATUS_CODE },
			);
		}),
	);
}

export function mockGetDashboardStatsFailureApi() {
	server.use(
		http.get(endpoint, () => {
			return HttpResponse.json(DASHBOARD_STATS_ERROR_MESSAGE, {
				status: INTERNAL_SERVER_ERROR_STATUS_CODE,
			});
		}),
	);
}
