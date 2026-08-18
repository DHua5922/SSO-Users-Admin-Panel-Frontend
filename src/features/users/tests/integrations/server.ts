import { HttpResponse, http } from "msw";
import {
	BAD_REQUEST_STATUS_CODE,
	INTERNAL_SERVER_ERROR_STATUS_CODE,
	SUCCESS_STATUS_CODE,
} from "../../../../shared/constants";
import { server } from "../../../../shared/tests/vitest.setup";
import { USERS_API_ROUTE } from "../../constants/general";
import {
	CANNOT_LOAD_USERS_ERROR_MESSAGE,
	CANNOT_UPSERT_USER_ERROR_MESSAGE,
} from "../../constants/message";
import type { User } from "../../schemas";
import { testUser } from "../fixtures";

const endpoint = `*${USERS_API_ROUTE}`;

export function mockGetUsersSuccessApi(list: User[]) {
	server.use(
		http.get(endpoint, () => {
			return HttpResponse.json(list, { status: SUCCESS_STATUS_CODE });
		}),
	);
}
export function mockGetUsersFailureApi() {
	server.use(
		http.get(endpoint, () => {
			return HttpResponse.json(CANNOT_LOAD_USERS_ERROR_MESSAGE, {
				status: INTERNAL_SERVER_ERROR_STATUS_CODE,
			});
		}),
	);
}

export function mockUpsertUserSuccessApi() {
	return server.use(
		http.put(endpoint, async ({ request }) => {
			const body = await request.json();
			return HttpResponse.json(body, { status: SUCCESS_STATUS_CODE });
		}),
	);
}
export function mockUpsertUserFailureApi() {
	return server.use(
		http.put(endpoint, () => {
			return HttpResponse.json(CANNOT_UPSERT_USER_ERROR_MESSAGE, {
				status: BAD_REQUEST_STATUS_CODE,
			});
		}),
	);
}

export function mockDeleteUserSuccessApi() {
	return server.use(
		http.delete(`${endpoint}/:id`, () => {
			return HttpResponse.json(testUser, { status: SUCCESS_STATUS_CODE });
		}),
	);
}
