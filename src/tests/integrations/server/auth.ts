import { HttpResponse, http } from "msw";
import { SUCCESS_STATUS_CODE, testUser } from "../../../constants";
import { server } from "../../vitest.setup";

const loginEndpoint = "*/api/v1/auth/login";

export function mockLoginSuccessApi() {
	server.use(
		http.post(loginEndpoint, () => {
			return HttpResponse.json(testUser, { status: SUCCESS_STATUS_CODE });
		}),
	);
}

export function mockLoginFailureApi() {
	server.use(
		http.post(loginEndpoint, () => {
			return HttpResponse.json("Invalid credentials", { status: 400 });
		}),
	);
}
