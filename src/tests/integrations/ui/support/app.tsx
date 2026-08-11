import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import Routes from "../../../../routes/Routes";

export function renderApp(initialRoute: string) {
	const queryClient = new QueryClient();
	const event = userEvent.setup();

	render(
		<QueryClientProvider client={queryClient}>
			<MemoryRouter initialEntries={[initialRoute]}>
				<Routes />
			</MemoryRouter>
		</QueryClientProvider>,
	);

	return { event };
}
