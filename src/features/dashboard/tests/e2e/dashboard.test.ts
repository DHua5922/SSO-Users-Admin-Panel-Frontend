import { expect, test } from "@playwright/test";
import { waitForApiResponse } from "../../../../shared/tests/playwright/api";
import {
	getHeading,
	getLink,
	getText,
} from "../../../../shared/tests/playwright/locator";
import { logInTest } from "../../../auth/tests/e2e/support";
import {
	DASHBOARD_ROLE_STATS_HEADER,
	DASHBOARD_STATS_API_PATH,
	DASHBOARD_USER_STATS_HEADER,
	DASHBOARD_VIEW_ROLES_LINK_TEXT,
	DASHBOARD_VIEW_USERS_LINK_TEXT,
} from "../../constants";
import { dashboardStatsSchema } from "../../schemas";
import {
	getDashboardHeader,
	getDashboardRoleStatsSection,
	getDashboardUserStatsSection,
} from "./locator";

test("should show dashboard stats", async ({ page }) => {
	const responsePromise = waitForApiResponse({
		page,
		apiEndpoint: DASHBOARD_STATS_API_PATH,
	});

	await logInTest(page);

	const response = await responsePromise;
	const stats = dashboardStatsSchema.parse(await response.json());

	await expect(getDashboardHeader(page)).toBeVisible();

	const usersStat = getDashboardUserStatsSection(page);
	await expect(
		getHeading(usersStat, DASHBOARD_USER_STATS_HEADER),
	).toBeVisible();
	await expect(getText(usersStat, `${stats.totalUsers}`)).toBeVisible();
	await expect(
		getLink(usersStat, DASHBOARD_VIEW_USERS_LINK_TEXT),
	).toBeVisible();

	const rolesStat = getDashboardRoleStatsSection(page);
	await expect(
		getHeading(rolesStat, DASHBOARD_ROLE_STATS_HEADER),
	).toBeVisible();
	await expect(getText(rolesStat, `${stats.totalRoles}`)).toBeVisible();
	await expect(
		getLink(rolesStat, DASHBOARD_VIEW_ROLES_LINK_TEXT),
	).toBeVisible();
});
