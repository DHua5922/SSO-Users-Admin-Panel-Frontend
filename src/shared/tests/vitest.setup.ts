import { setupServer } from "msw/node";
import useRoleManagementStore from "../../features/roles/store/useRoleManagementStore";
import useUserManagementStore from "../../features/users/store/useUserManagementStore";
import useAlertStore from "../store/useAlertStore";

export const server = setupServer();

beforeAll(() => server.listen());

beforeEach(() => {
	if (!HTMLDialogElement.prototype.showModal) {
		HTMLDialogElement.prototype.showModal = function () {
			this.open = true;
		};
	}

	if (!HTMLDialogElement.prototype.close) {
		HTMLDialogElement.prototype.close = function () {
			this.open = false;
			this.dispatchEvent(new Event("close"));
		};
	}
});

afterEach(() => {
	server.resetHandlers();
	useAlertStore.setState({ pageAlerts: [], modalAlerts: [] });
	useRoleManagementStore.setState({
		showUpsertRoleModal: false,
		showDeleteRoleModal: false,
		chosenRole: null,
	});
	useUserManagementStore.setState({
		showUpsertUserModal: false,
		showDeleteUserModal: false,
		chosenUser: null,
	});
});

afterAll(() => server.close());
