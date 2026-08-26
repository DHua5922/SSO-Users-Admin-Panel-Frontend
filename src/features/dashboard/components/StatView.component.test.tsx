import { render, screen } from "@testing-library/react";
import {
	expectNoAccessibilityViolations,
	getText,
} from "../../../shared/tests/react-testing-library";
import StatView from "./StatView";

const totalUsersLabel = "Total Users";
const defaultValue = 0;

test("should show error", () => {
	const errorMessage = "Error message";

	renderStatView({
		isError: true,
		errorMessage,
	});

	expect(getText(errorMessage)).toBeTruthy();
});

test("should show loading state", () => {
	renderStatView({
		value: defaultValue,
		isLoading: true,
	});

	expect(
		screen.getByRole("status", {
			name: new RegExp(`^loading ${totalUsersLabel}$`, "i"),
		}),
	).toBeTruthy();
});

test("should show stat", () => {
	const statValue = 10;

	renderStatView({
		value: statValue,
	});

	expect(getText(`${statValue}`)).toBeTruthy();
});

test.each([
	{ isLoading: false, isError: false, errorMessage: "" },
	{ isLoading: true, isError: false, errorMessage: "" },
	{ isLoading: false, isError: true, errorMessage: "Error message" },
])(
	"has no automatically detectable accessibility violations",
	async ({ isLoading, isError, errorMessage }) => {
		renderStatView({ isLoading, isError, errorMessage });
		await expectNoAccessibilityViolations();
	},
);

function renderStatView({
	value = defaultValue,
	isError = false,
	errorMessage = "",
	isLoading = false,
}) {
	render(
		<StatView
			label={totalUsersLabel}
			value={value}
			isError={isError}
			errorMessage={errorMessage}
			isLoading={isLoading}
			linkLabel="View Details"
			href="/details"
		/>,
	);
}
