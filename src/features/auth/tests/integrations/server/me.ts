import { HttpResponse, http } from "msw";
import { SUCCESS_STATUS_CODE } from "../../../../../shared/constants";
import { server } from "../../../../../shared/tests/vitest.setup";
import { testUser } from "../../../../users/tests/fixtures";

const meEndpoint = "*/api/v1/me";

export function mockGetMeSuccessApi() {
	return server.use(
		http.get(meEndpoint, () => {
			return HttpResponse.json(testUser, { status: SUCCESS_STATUS_CODE });
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
