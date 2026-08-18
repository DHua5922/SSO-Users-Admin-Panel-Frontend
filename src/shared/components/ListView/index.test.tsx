import { render } from "@testing-library/react";
import { expectNoAccessibilityViolations } from "../../../shared/tests/react-testing-library/accessibility";
import { getText } from "../../../shared/tests/react-testing-library/locator";
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

test.each([
	{ isError: true },
	{ isEmpty: true },
	{ isLoading: true },
	{ list: ["Item 1"] },
])(
	"has no automatically detectable accessibility violations",
	async (props) => {
		renderListView(props);
		await expectNoAccessibilityViolations();
	},
);

function renderListView({
	isError = false,
	errorMessage = "Error loading list",
	isEmpty = false,
	emptyListMessage = "No items found",
	isLoading = false,
	list = [] as string[],
}) {
	const loadingMessage = "loading...";
	render(
		<ListView
			isError={isError}
			errorMessage={errorMessage}
			isEmpty={isEmpty}
			emptyListMessage={emptyListMessage}
			isLoading={isLoading}
			loadingChildren={<p>{loadingMessage}</p>}
		>
			<ul>
				{list.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</ListView>,
	);

	return { errorMessage, emptyListMessage, loadingMessage };
}
