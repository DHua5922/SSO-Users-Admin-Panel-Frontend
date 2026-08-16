import { render } from "@testing-library/react";
import {
	getStatus,
	getText,
} from "../../../../shared/tests/react-testing-library/locator";
import StatView from ".";

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

	expect(getStatus(`loading ${totalUsersLabel}`)).toBeTruthy();
});

test("should show stat", () => {
	const statValue = 10;

	renderStatView({
		value: statValue,
	});

	expect(getText(`${statValue}`)).toBeTruthy();
});

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
