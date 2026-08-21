import { HttpResponse, http } from "msw";
import {
	BAD_REQUEST_STATUS_CODE,
	INTERNAL_SERVER_ERROR_STATUS_CODE,
	SUCCESS_STATUS_CODE,
} from "../../../../shared/constants";
import { server } from "../../../../shared/tests/vitest.setup";
import {
	CANNOT_LOAD_ROLES_ERROR_MESSAGE,
	CANNOT_UPSERT_ROLE_ERROR_MESSAGE,
	ROLES_API_ROUTE,
} from "../../constants";
import type { Role } from "../../schemas";

const endpoint = `*${ROLES_API_ROUTE}`;
const defaultRole = {
	_id: "admin-role-id",
	name: "admin",
	description: "Administrator role",
	systemManaged: false,
};

export function mockGetRolesSuccessApi(list: Role[] = [defaultRole]) {
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

export function mockUpsertRoleSuccessApi() {
	return server.use(
		http.put(endpoint, async ({ request }) => {
			const body = (await request.json()) as Partial<Role>;
			return HttpResponse.json(
				{
					...body,
					_id: body._id ?? "created-role-id",
					systemManaged: body.systemManaged ?? false,
				},
				{ status: SUCCESS_STATUS_CODE },
			);
		}),
	);
}

export function mockUpsertRoleFailureApi() {
	return server.use(
		http.put(endpoint, () => {
			return HttpResponse.json(CANNOT_UPSERT_ROLE_ERROR_MESSAGE, {
				status: BAD_REQUEST_STATUS_CODE,
			});
		}),
	);
}

export function mockDeleteRoleSuccessApi() {
	return server.use(
		http.delete(`${endpoint}/:id`, ({ params }) => {
			return HttpResponse.json(
				{ ...defaultRole, _id: params.id },
				{ status: SUCCESS_STATUS_CODE },
			);
		}),
	);
}
