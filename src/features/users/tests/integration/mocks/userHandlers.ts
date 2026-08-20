import { HttpResponse, http } from "msw";
import {
	BAD_REQUEST_STATUS_CODE,
	INTERNAL_SERVER_ERROR_STATUS_CODE,
	SUCCESS_STATUS_CODE,
} from "../../../../../shared/constants";
import { server } from "../../../../../shared/tests/vitest.setup";
import {
	CANNOT_LOAD_USERS_ERROR_MESSAGE,
	CANNOT_UPSERT_USER_ERROR_MESSAGE,
	USERS_API_ROUTE,
} from "../../../constants";
import type { User } from "../../../schemas";

const endpoint = `*${USERS_API_ROUTE}`;
const defaultUser = {
	_id: "user-id",
	email: "test@example.com",
	username: "testadmin",
	role: "admin-role-id",
	systemManaged: false,
};

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
			const body = (await request.json()) as Partial<User>;
			return HttpResponse.json(
				{
					...body,
					_id: body._id ?? "created-user-id",
					systemManaged: body.systemManaged ?? false,
				},
				{ status: SUCCESS_STATUS_CODE },
			);
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
			return HttpResponse.json(defaultUser, { status: SUCCESS_STATUS_CODE });
		}),
	);
}
