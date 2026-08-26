import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import type { Mock } from "vitest";
import {
	LOADING_CURRENT_USER_TEXT,
	LOGIN_PATH,
} from "../../features/auth/constants";
import useCurrentUser from "../../features/auth/hooks/useCurrentUser";
import { HOME_PATH } from "../../shared/constants";
import { getText } from "../../shared/tests/react-testing-library";
import { SKIP_TO_MAIN_CONTENT_TEXT } from "../constants";
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

test("skips navigation and focuses the main content", async () => {
	const event = userEvent.setup();
	renderRoute(true, false);

	const skipLink = screen.getByRole("link", {
		name: SKIP_TO_MAIN_CONTENT_TEXT,
	});
	await event.tab();
	expect(document.activeElement).toBe(skipLink);

	await event.click(skipLink);
	expect(document.activeElement).toBe(screen.getByRole("main"));
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
