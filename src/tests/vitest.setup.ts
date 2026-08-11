import { setupServer } from "msw/node";
import useStatusStore from "../store/status";

export const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
	server.resetHandlers();
	useStatusStore.setState({ pageAlerts: [] });
});
afterAll(() => server.close());
