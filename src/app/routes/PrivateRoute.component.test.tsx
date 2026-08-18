import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import type { Mock } from "vitest";
import {
	LOADING_CURRENT_USER_TEXT,
	LOGIN_PATH,
} from "../../features/auth/constants";
import useCurrentUser from "../../features/auth/hooks/useCurrentUser";
import { HOME_PATH } from "../../shared/constants";
import {
	getButton,
	getText,
} from "../../shared/tests/react-testing-library/locator";
import {
	DARK_MODE_TEXT,
	DARK_THEME,
	LIGHT_THEME,
	THEME_ATTRIBUTE_NAME,
	THEME_STORAGE_KEY,
} from "../constants";
import PrivateRoute from "./PrivateRoute";

vi.mock("../../features/auth/hooks/useCurrentUser", () => ({
	default: vi.fn(),
}));

const privateContentText = "Private Content";
const loginText = "Login";

test("show private content", () => {
	renderRoute(true, false);
	expect(getText(privateContentText)).toBeTruthy();
});

test("toggles and stores the color theme", async () => {
	localStorage.setItem(THEME_STORAGE_KEY, LIGHT_THEME);
	const event = userEvent.setup();
	renderRoute(true, false);

	const themeButton = getButton(DARK_MODE_TEXT);
	expect(themeButton.getAttribute("aria-pressed")).toBe("false");
	await event.click(themeButton);

	expect(document.documentElement.getAttribute(THEME_ATTRIBUTE_NAME)).toBe(
		DARK_THEME,
	);
	expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(DARK_THEME);
	expect(themeButton.getAttribute("aria-pressed")).toBe("true");

	localStorage.removeItem(THEME_STORAGE_KEY);
	document.documentElement.removeAttribute(THEME_ATTRIBUTE_NAME);
});

test("redirect to login page", () => {
	renderRoute(false, false);
	expect(getText(loginText)).toBeTruthy();
});

test("show loading state", () => {
	renderRoute(false, true);
	expect(getText(LOADING_CURRENT_USER_TEXT)).toBeTruthy();
});

function renderRoute(isLoggedIn: boolean, isLoading: boolean) {
	const mockUseCurrentUser = useCurrentUser as unknown as Mock;
	mockUseCurrentUser.mockReturnValue({
		isLoggedIn,
		isLoading,
	});
	const queryClient = new QueryClient();

	render(
		<QueryClientProvider client={queryClient}>
			<MemoryRouter initialEntries={[HOME_PATH]}>
				<Routes>
					<Route element={<PrivateRoute />}>
						<Route path={HOME_PATH} element={<div>{privateContentText}</div>} />
					</Route>
					<Route path={LOGIN_PATH} element={<div>{loginText}</div>} />
				</Routes>
			</MemoryRouter>
		</QueryClientProvider>,
	);
}
