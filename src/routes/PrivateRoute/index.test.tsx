import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import type { Mock } from "vitest";
import useAuthStore from "../../store/auth";
import PrivateRoute from ".";

vi.mock("../../store/auth", () => ({
	default: vi.fn(),
}));

const privateContentText = "Private Content";
const loginText = "Login";

test("show private content", () => {
	renderRoute("123");
	expect(screen.getByText(privateContentText)).toBeTruthy();
});

test("redirect to login page", () => {
	renderRoute("");
	expect(screen.getByText(loginText)).toBeTruthy();
});

function renderRoute(meId: string) {
	const mockUseAuthStore = useAuthStore as unknown as Mock;
	mockUseAuthStore.mockReturnValue({
		_id: meId,
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
