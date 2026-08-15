import { HttpResponse, http } from "msw";
import { testUser } from "../../../../features/user/constants";
import type { User } from "../../../../features/user/schemas";
import {
	INTERNAL_SERVER_ERROR_STATUS_CODE,
	SUCCESS_STATUS_CODE,
} from "../../../../shared/constants";
import { server } from "../../../../shared/tests/vitest.setup";
import {
	CANNOT_LOAD_USERS_ERROR_MESSAGE,
	CANNOT_UPLOAD_USER_ERROR_MESSAGE,
} from "../../constants";

const endpoint = "*/api/v1/users";
const deleteEndpoint = `${endpoint}/:id`;

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
			return HttpResponse.json(CANNOT_UPLOAD_USER_ERROR_MESSAGE, {
				status: 400,
			});
		}),
	);
}

export function mockDeleteUserSuccessApi() {
	return server.use(
		http.delete(deleteEndpoint, ({ params }) => {
			return HttpResponse.json(
				{ ...testUser, id: params.id },
				{ status: SUCCESS_STATUS_CODE },
			);
		}),
	);
}
export function mockDeleteUserFailureApi() {
	return server.use(
		http.delete(deleteEndpoint, () => {
			return HttpResponse.json("Cannot delete user", {
				status: INTERNAL_SERVER_ERROR_STATUS_CODE,
			});
		}),
	);
}
