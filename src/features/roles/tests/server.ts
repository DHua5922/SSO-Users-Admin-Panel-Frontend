import { HttpResponse, http } from "msw";
import {
	INTERNAL_SERVER_ERROR_STATUS_CODE,
	SUCCESS_STATUS_CODE,
} from "../../../shared/constants";
import { server } from "../../../shared/tests/vitest.setup";
import { CANNOT_LOAD_ROLES_ERROR_MESSAGE } from "../constants/message";
import { testRoles } from "./fixtures";

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
