import { setupServer } from "msw/node";
import useAuthStore from "../store/auth";
import useStatusStore from "../store/status";

export const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
	server.resetHandlers();

	useAuthStore.setState({
		me: {
			_id: "",
			email: "",
			username: "",
		},
	});
	useStatusStore.setState({ pageAlerts: [] });
});
afterAll(() => server.close());
