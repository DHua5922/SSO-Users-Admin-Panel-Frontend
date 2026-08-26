import type { Locator, Page } from "@playwright/test";
import { expect, test } from "@playwright/test";
import { regexMatch } from "../../../../shared/tests";
import {
	getLink,
	getText,
	waitForApiResponse,
} from "../../../../shared/tests/playwright";
import { logInTest } from "../../../auth/tests/e2e/support";
import {
	DASHBOARD_HEADER,
	DASHBOARD_ROLE_STATS_HEADER,
	DASHBOARD_STATS_API_PATH,
	DASHBOARD_USER_STATS_HEADER,
	DASHBOARD_VIEW_ROLES_LINK_TEXT,
	DASHBOARD_VIEW_USERS_LINK_TEXT,
} from "../../constants";
import { dashboardStatsSchema } from "../../schemas";

test("should show dashboard stats", async ({ page }) => {
	const dashboardStatsResponsePromise = waitForApiResponse({
		page,
		apiEndpoint: DASHBOARD_STATS_API_PATH,
	});

	await logInTest(page);

	const dashboardStatsResponse = await dashboardStatsResponsePromise;
	const stats = dashboardStatsSchema.parse(await dashboardStatsResponse.json());

	await expect(getHeading(page, DASHBOARD_HEADER, { level: 1 })).toBeVisible();

	const userStatsSection = getSection(page, DASHBOARD_USER_STATS_HEADER);
	await expect(
		getHeading(userStatsSection, DASHBOARD_USER_STATS_HEADER),
	).toBeVisible();
	await expect(getText(userStatsSection, `${stats.totalUsers}`)).toBeVisible();
	await expect(
		getLink(userStatsSection, DASHBOARD_VIEW_USERS_LINK_TEXT),
	).toBeVisible();

	const roleStatsSection = getSection(page, DASHBOARD_ROLE_STATS_HEADER);
	await expect(
		getHeading(roleStatsSection, DASHBOARD_ROLE_STATS_HEADER),
	).toBeVisible();
	await expect(getText(roleStatsSection, `${stats.totalRoles}`)).toBeVisible();
	await expect(
		getLink(roleStatsSection, DASHBOARD_VIEW_ROLES_LINK_TEXT),
	).toBeVisible();
});

function getHeading(page: Page | Locator, headerText: string, options = {}) {
	return page.getByRole("heading", {
		name: regexMatch(headerText, undefined, true),
		...options,
	});
}

function getSection(page: Page | Locator, sectionTitle: string) {
	return page.getByRole("region", {
		name: regexMatch(sectionTitle, undefined, true),
	});
}
