import type { Page } from "@playwright/test";
import { LOGIN_TEXT } from "../../../../features/auth/constants";

export function getLoginButton(page: Page) {
	return page.getByRole("button", { name: new RegExp(LOGIN_TEXT, "i") });
}
