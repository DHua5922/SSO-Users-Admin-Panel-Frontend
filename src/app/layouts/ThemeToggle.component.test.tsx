import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
	expectNoAccessibilityViolations,
	getButton,
} from "../../shared/tests/react-testing-library";
import {
	DARK_MODE_TEXT,
	DARK_THEME,
	LIGHT_THEME,
	THEME_ATTRIBUTE_NAME,
	THEME_STORAGE_KEY,
} from "../constants";
import { ThemeProvider } from "../providers/ThemeProvider";
import ThemeToggle from "./ThemeToggle";

test("toggles and stores the color theme", async () => {
	localStorage.setItem(THEME_STORAGE_KEY, LIGHT_THEME);
	const event = userEvent.setup();
	render(
		<ThemeProvider>
			<ThemeToggle />
		</ThemeProvider>,
	);

	const themeButton = getButton(DARK_MODE_TEXT);
	expect(themeButton.getAttribute("aria-pressed")).toBe("false");
	await event.click(themeButton);

	expect(document.documentElement.getAttribute(THEME_ATTRIBUTE_NAME)).toBe(
		DARK_THEME,
	);
	expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(DARK_THEME);
	expect(themeButton.getAttribute("aria-pressed")).toBe("true");
	await expectNoAccessibilityViolations();

	localStorage.removeItem(THEME_STORAGE_KEY);
	document.documentElement.removeAttribute(THEME_ATTRIBUTE_NAME);
});
