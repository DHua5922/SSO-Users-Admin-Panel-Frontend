import { render } from "@testing-library/react";
import { getText } from "../../../shared/tests/react-testing-library/locator";
import { LOADING_TEXT } from "../../constants";
import ListView from ".";

test("shows error message", () => {
	const { errorMessage } = renderListView({ isError: true });
	expect(getText(errorMessage)).toBeTruthy();
});
test("shows message for empty list", () => {
	const { emptyListMessage } = renderListView({ isEmpty: true });
	expect(getText(emptyListMessage)).toBeTruthy();
});

test("shows list loading", () => {
	const { loadingMessage } = renderListView({ isLoading: true });
	expect(getText(loadingMessage)).toBeTruthy();
});

test("shows list with items", () => {
	const list: string[] = ["Item 1", "Item 2"];

	renderListView({ list });

	list.forEach((item) => {
		expect(getText(item)).toBeTruthy();
	});
});

function renderListView({
	isError = false,
	errorMessage = "Error loading list",
	isEmpty = false,
	emptyListMessage = "No items found",
	isLoading = false,
	list = [] as string[],
}) {
	render(
		<ListView
			isError={isError}
			errorMessage={errorMessage}
			isEmpty={isEmpty}
			emptyListMessage={emptyListMessage}
			isLoading={isLoading}
			loadingChildren={<p>{LOADING_TEXT}</p>}
		>
			<ul>
				{list.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</ListView>,
	);

	return { errorMessage, emptyListMessage, loadingMessage: LOADING_TEXT };
}
