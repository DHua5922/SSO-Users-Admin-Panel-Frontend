import { HttpResponse, http } from "msw";
import { SUCCESS_STATUS_CODE, testUser } from "../../../constants";
import { server } from "../../vitest.setup";

const meEndpoint = "*/api/v1/me";

export function mockGetMeSuccessApi() {
	return server.use(
		http.get(meEndpoint, () => {
			return HttpResponse.json(testUser, { status: SUCCESS_STATUS_CODE });
		}),
	);
}
