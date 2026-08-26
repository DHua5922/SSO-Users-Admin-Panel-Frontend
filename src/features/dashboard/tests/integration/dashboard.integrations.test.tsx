import { screen } from "@testing-library/react";
import { HOME_PATH } from "../../../../shared/constants";
import { regexMatch } from "../../../../shared/tests";
import {
	findText,
	renderApp,
} from "../../../../shared/tests/react-testing-library";
import { mockGetMeSuccessApi } from "../../../auth/tests/integration/mocks/currentUserHandlers";
import { DASHBOARD_STATS_ERROR_MESSAGE } from "../../constants";
import {
	mockGetDashboardStatsFailureApi,
	mockGetDashboardStatsSuccessApi,
} from "./dashboardHandlers";

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

	expect(
		await screen.findAllByText(
			regexMatch(DASHBOARD_STATS_ERROR_MESSAGE, undefined, true),
		),
	).toHaveLength(2);
});
