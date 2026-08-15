import { HttpResponse, http } from "msw";
import {
	CANNOT_LOAD_ROLES_ERROR_MESSAGE,
	INTERNAL_SERVER_ERROR_STATUS_CODE,
	SUCCESS_STATUS_CODE,
	testRoles,
} from "../../constants";
import { server } from "../vitest.setup";

const endpoint = "*/api/v1/roles";

export function mockGetRolesSuccessApi(list = testRoles) {
	server.use(
		http.get(endpoint, () => {
			return HttpResponse.json(list, { status: SUCCESS_STATUS_CODE });
		}),
	);
}

export function mockGetRolesFailureApi() {
	server.use(
		http.get(endpoint, () => {
			return HttpResponse.json(CANNOT_LOAD_ROLES_ERROR_MESSAGE, {
				status: INTERNAL_SERVER_ERROR_STATUS_CODE,
			});
		}),
	);
}
