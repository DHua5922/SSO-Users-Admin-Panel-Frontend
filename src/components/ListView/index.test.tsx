import { screen, render } from "@testing-library/react";
import ListView from ".";

test("shows error message", () => {
  const { errorMessage } = renderListView({ isError: true });
  expect(screen.getByText(errorMessage)).toBeTruthy();
});
test("shows message for empty list", () => {
  const { emptyListMessage } = renderListView({ isEmpty: true });
  expect(screen.getByText(emptyListMessage)).toBeTruthy();
});

test("shows list loading", () => {
  const { loadingMessage } = renderListView({ isLoading: true });
  expect(screen.getByText(loadingMessage)).toBeTruthy();
});

test("shows list with items", () => {
  const list: string[] = ["Item 1", "Item 2"];
  
  renderListView({ list });

  list.forEach((item) => {
    expect(screen.getByText(item)).toBeTruthy();
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
  const loadingMessage = "Loading...";
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
