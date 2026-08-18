import { HOME_PATH } from "../../../../shared/constants";
import { renderApp } from "../../../../shared/tests/react-testing-library/app";
import {
	findAllText,
	findText,
} from "../../../../shared/tests/react-testing-library/locator";
import { mockGetMeSuccessApi } from "../../../auth/tests/integration/mocks/currentUserHandlers";
import { DASHBOARD_STATS_ERROR_MESSAGE } from "../../constants";
import {
	mockGetDashboardStatsFailureApi,
	mockGetDashboardStatsSuccessApi,
} from "./mocks/dashboardHandlers";

test("should show dashboard stats", async () => {
	mockGetMeSuccessApi();
	mockGetDashboardStatsSuccessApi();
	renderApp(HOME_PATH);

	expect(await findText("10")).toBeTruthy();
	expect(await findText("5")).toBeTruthy();
});

test("should show error when failing to get dashboard stats", async () => {
	mockGetMeSuccessApi();
	mockGetDashboardStatsFailureApi();
	renderApp(HOME_PATH);

	expect(await findAllText(DASHBOARD_STATS_ERROR_MESSAGE)).toHaveLength(2);
});
