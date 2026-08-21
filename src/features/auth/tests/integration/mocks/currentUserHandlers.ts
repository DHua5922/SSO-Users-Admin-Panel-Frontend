import { HttpResponse, http } from "msw";
import { SUCCESS_STATUS_CODE } from "../../../../../shared/constants";
import { server } from "../../../../../shared/tests/vitest.setup";
import { ME_API_ROUTE } from "../../../constants";

const meEndpoint = `*${ME_API_ROUTE}`;
const currentUser = {
	_id: "current-user-id",
	email: "test@example.com",
	username: "testadmin",
	role: { _id: "admin-role-id", name: "admin" },
	systemManaged: false,
};

export function mockGetMeSuccessApi() {
	return server.use(
		http.get(meEndpoint, () => {
			return HttpResponse.json(currentUser, { status: SUCCESS_STATUS_CODE });
		}),
	);
}

export function mockGetMeFailureApi() {
	return server.use(
		http.get(meEndpoint, () => {
			return HttpResponse.json("Internal Server Error", { status: 500 });
		}),
	);
}
