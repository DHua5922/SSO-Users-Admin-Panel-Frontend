import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import type { Mock } from "vitest";
import useAuthStore from "../../store/auth";
import PublicRoute from ".";

vi.mock("../../store/auth", () => ({
	default: vi.fn(),
}));

const privateContentText = "Private Content";
const loginText = "Login";

test("redirect to login page", () => {
	renderApp("");
	expect(screen.getByText(loginText)).toBeTruthy();
});

test("show private content", () => {
	renderApp("123");
	expect(screen.getByText(privateContentText)).toBeTruthy();
});

function renderApp(meId: string) {
	const mockUseAuthStore = useAuthStore as unknown as Mock;
	mockUseAuthStore.mockReturnValue({
		_id: meId,
	});

	render(
		<MemoryRouter initialEntries={["/login"]}>
			<Routes>
				<Route element={<PublicRoute />}>
					<Route path="/login" element={<div>{loginText}</div>} />
				</Route>
				<Route path="/" element={<div>{privateContentText}</div>} />
			</Routes>
		</MemoryRouter>,
	);
}
