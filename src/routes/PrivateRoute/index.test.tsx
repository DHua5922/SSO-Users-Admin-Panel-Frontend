import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import type { Mock } from "vitest";
import {
	LOADING_CURRENT_USER_TEXT,
	LOGIN_PATH,
} from "../../features/auth/constants";
import useCurrentUser from "../../features/auth/hooks/useCurrentUser";
import { HOME_PATH } from "../../shared/constants";
import PrivateRoute from ".";

vi.mock("../../features/auth/hooks/useCurrentUser", () => ({
	default: vi.fn(),
}));

const privateContentText = "Private Content";
const loginText = "Login";

test("show private content", () => {
	renderRoute(true, false);
	expect(screen.getByText(privateContentText)).toBeTruthy();
});

test("redirect to login page", () => {
	renderRoute(false, false);
	expect(screen.getByText(loginText)).toBeTruthy();
});

test("show loading state", () => {
	renderRoute(false, true);
	expect(screen.getByText(LOADING_CURRENT_USER_TEXT)).toBeTruthy();
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
