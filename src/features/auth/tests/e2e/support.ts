import { expect, type Page } from "@playwright/test";
import { METHOD_POST } from "../../../../shared/constants";
import { waitForApiResponse } from "../../../../shared/tests/playwright/api";
import {
	getButton,
	getLabel,
} from "../../../../shared/tests/playwright/locator";
import {
	AUTH_BASE_API_ROUTE,
	LOGIN_EMAIL_INPUT_LABEL,
	LOGIN_PASSWORD_INPUT_LABEL,
	LOGIN_PATH,
	LOGIN_TEXT,
} from "../../constants";
import { loadPage } from "../playwright/environment";

export async function logInTest(page: Page) {
	const loginResponsePromise = waitForApiResponse({
		page,
		apiEndpoint: `${AUTH_BASE_API_ROUTE}${LOGIN_PATH}`,
		method: METHOD_POST,
	});

	const testEnv = await loadPage(page);

	await getLabel(LOGIN_EMAIL_INPUT_LABEL, page).fill(testEnv.VITE_TEST_EMAIL);
	await getLabel(LOGIN_PASSWORD_INPUT_LABEL, page).fill(
		testEnv.VITE_TEST_PASSWORD,
	);
	const [response] = await Promise.all([
		loginResponsePromise,
		getButton(page, LOGIN_TEXT).click(),
	]);
	const authenticatedUser = await response.json();

	expect(authenticatedUser).toMatchObject({
		_id: expect.any(String),
		email: testEnv.VITE_TEST_EMAIL,
		username: expect.any(String),
		role: {
			_id: expect.any(String),
			name: expect.any(String),
		},
	});
}
