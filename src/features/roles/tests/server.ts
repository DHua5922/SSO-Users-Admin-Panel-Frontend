import { HttpResponse, http } from "msw";
import { SUCCESS_STATUS_CODE } from "../../../shared/constants";
import { server } from "../../../shared/tests/vitest.setup";
import { testRoles } from "./fixtures";

const endpoint = "*/api/v1/roles";

export function mockGetRolesSuccessApi(list = testRoles) {
	server.use(
		http.get(endpoint, () => {
			return HttpResponse.json(list, { status: SUCCESS_STATUS_CODE });
		}),
	);
}
