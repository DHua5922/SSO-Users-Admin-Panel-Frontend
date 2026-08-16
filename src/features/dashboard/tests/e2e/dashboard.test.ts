import { expect, test } from "@playwright/test";
import { waitForApiResponse } from "../../../../shared/tests/playwright/fixtures";
import {
	getHeader,
	getLink,
	getText,
} from "../../../../shared/tests/playwright/locator";
import { logInTest } from "../../../../shared/tests/playwright/support";
import {
	DASHBOARD_ROLE_STATS_HEADER,
	DASHBOARD_STATS_API_PATH,
	DASHBOARD_USER_STATS_HEADER,
	DASHBOARD_VIEW_ROLES_LINK_TEXT,
	DASHBOARD_VIEW_USERS_LINK_TEXT,
} from "../../constants";
import { dashboardStatsSchema } from "../../schemas";
import { getDashboardHeader } from "./locator";

test("should show dashboard stats", async ({ page }) => {
	await logInTest(page);

	const response = await waitForApiResponse(page, DASHBOARD_STATS_API_PATH);
	const stats = dashboardStatsSchema.parse(await response.json());

	await expect(getDashboardHeader(page)).toBeVisible();
	await expect(getHeader(page, DASHBOARD_USER_STATS_HEADER)).toBeVisible();
	await expect(getHeader(page, DASHBOARD_ROLE_STATS_HEADER)).toBeVisible();
	await expect(getText(page, `${stats.totalUsers}`)).toBeVisible();
	await expect(getText(page, `${stats.totalRoles}`)).toBeVisible();
	await expect(getLink(page, DASHBOARD_VIEW_USERS_LINK_TEXT)).toBeVisible();
	await expect(getLink(page, DASHBOARD_VIEW_ROLES_LINK_TEXT)).toBeVisible();
});
