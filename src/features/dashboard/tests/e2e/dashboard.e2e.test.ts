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
} from "./locators";

test("should show dashboard stats", async ({ page }) => {
	const dashboardStatsResponsePromise = waitForApiResponse({
		page,
		apiEndpoint: DASHBOARD_STATS_API_PATH,
	});

	await logInTest(page);

	const dashboardStatsResponse = await dashboardStatsResponsePromise;
	const stats = dashboardStatsSchema.parse(await dashboardStatsResponse.json());

	await expect(getDashboardHeader(page)).toBeVisible();

	const userStatsSection = getDashboardUserStatsSection(page);
	await expect(
		getHeading(userStatsSection, DASHBOARD_USER_STATS_HEADER),
	).toBeVisible();
	await expect(getText(userStatsSection, `${stats.totalUsers}`)).toBeVisible();
	await expect(
		getLink(userStatsSection, DASHBOARD_VIEW_USERS_LINK_TEXT),
	).toBeVisible();

	const roleStatsSection = getDashboardRoleStatsSection(page);
	await expect(
		getHeading(roleStatsSection, DASHBOARD_ROLE_STATS_HEADER),
	).toBeVisible();
	await expect(getText(roleStatsSection, `${stats.totalRoles}`)).toBeVisible();
	await expect(
		getLink(roleStatsSection, DASHBOARD_VIEW_ROLES_LINK_TEXT),
	).toBeVisible();
});
