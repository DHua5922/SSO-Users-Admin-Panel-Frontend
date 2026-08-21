import { HttpResponse, http } from "msw";
import {
	BAD_REQUEST_STATUS_CODE,
	SUCCESS_STATUS_CODE,
} from "../../../../../shared/constants";
import { server } from "../../../../../shared/tests/vitest.setup";
import {
	AUTH_BASE_API_ROUTE,
	GUEST_LOGIN_PATH,
	LOGIN_PATH,
} from "../../../constants";

const baseUrl = `*${AUTH_BASE_API_ROUTE}`;
const loginEndpoint = `${baseUrl}${LOGIN_PATH}`;
const authenticatedUser = {
	_id: "authenticated-user-id",
	email: "test@example.com",
	username: "testadmin",
	role: { _id: "admin-role-id", name: "admin" },
	systemManaged: false,
};

export function mockLoginSuccessApi() {
	server.use(
		http.post(loginEndpoint, () => {
			return HttpResponse.json(authenticatedUser, {
				status: SUCCESS_STATUS_CODE,
			});
		}),
	);
}

export function mockLoginFailureApi() {
	server.use(
		http.post(loginEndpoint, () => {
			return HttpResponse.json("Invalid credentials", {
				status: BAD_REQUEST_STATUS_CODE,
			});
		}),
	);
}

export function mockGuestLoginSuccessApi() {
	server.use(
		http.post(`${baseUrl}${GUEST_LOGIN_PATH}`, () => {
			return HttpResponse.json(authenticatedUser, {
				status: SUCCESS_STATUS_CODE,
			});
		}),
	);
}

export function mockLogoutSuccessApi() {
	server.use(
		http.post(`${baseUrl}/logout`, () => {
			return HttpResponse.json(true, { status: SUCCESS_STATUS_CODE });
		}),
	);
}
