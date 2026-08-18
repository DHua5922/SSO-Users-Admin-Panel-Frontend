import type { Locator, Page } from "@playwright/test";
import { regexMatch } from "../fixtures";

export function getLink(page: Page | Locator, linkText: string) {
	return page.getByRole("link", {
		name: regexMatch(linkText, undefined, true),
	});
}

export function getHeading(
	page: Page | Locator,
	headerText: string,
	options = {},
) {
	return page.getByRole("heading", {
		name: regexMatch(headerText, undefined, true),
		...options,
	});
}

export function getButton(page: Page | Locator, labelText: string) {
	return page.getByRole("button", {
		name: regexMatch(labelText, undefined, true),
	});
}

export function getText(page: Page | Locator, text: string) {
	return page.getByText(regexMatch(text, undefined, true));
}

export function getDialog(page: Page | Locator, dialogTitle: string) {
	return page.getByRole("dialog", {
		name: regexMatch(dialogTitle),
	});
}

export function getTableRow(page: Page | Locator, text: string) {
	return page.getByRole("row", { name: regexMatch(text) });
}

export function getSection(page: Page | Locator, sectionTitle: string) {
	return page.getByRole("region", {
		name: regexMatch(sectionTitle, undefined, true),
	});
}

export function getLabel(labelText: string, page: Page | Locator) {
	const regex = new RegExp(
		`^${regexMatch(labelText).source}(?:\\s*\\*)?(?:\\s*\\(required\\))?$`,
		"i",
	);
	return page.getByLabel(regex);
}
