import { HttpResponse, http } from "msw";
import {
	INTERNAL_SERVER_ERROR_STATUS_CODE,
	SUCCESS_STATUS_CODE,
} from "../../../../shared/constants";
import { server } from "../../../../shared/tests/vitest.setup";
import {
	DASHBOARD_STATS_API_PATH,
	DASHBOARD_STATS_ERROR_MESSAGE,
} from "../../constants";

const endpoint = `*${DASHBOARD_STATS_API_PATH}`;

export function mockGetDashboardStatsSuccessApi() {
	server.use(
		http.get(endpoint, () => {
			return HttpResponse.json(
				{
					totalUsers: 10,
					totalRoles: 5,
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
