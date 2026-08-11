import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import type { Mock } from "vitest";
import useCurrentUser from "../../hooks/useCurrentUser";
import PrivateRoute from ".";

vi.mock("../../hooks/useCurrentUser", () => ({
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
	expect(screen.getByText("Loading user...")).toBeTruthy();
});

function renderRoute(isLoggedIn: boolean, isLoading: boolean) {
	const mockUseCurrentUser = useCurrentUser as unknown as Mock;
	mockUseCurrentUser.mockReturnValue({
		isLoggedIn,
		isLoading,
	});

	render(
		<MemoryRouter initialEntries={["/"]}>
			<Routes>
				<Route element={<PrivateRoute />}>
					<Route path="/" element={<div>{privateContentText}</div>} />
				</Route>
				<Route path="/login" element={<div>{loginText}</div>} />
			</Routes>
		</MemoryRouter>,
	);
}
