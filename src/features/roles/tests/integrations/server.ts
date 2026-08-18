import { HttpResponse, http } from "msw";
import {
	BAD_REQUEST_STATUS_CODE,
	SUCCESS_STATUS_CODE,
} from "../../../../shared/constants";
import type { Role } from "../../../../shared/schemas";
import { server } from "../../../../shared/tests/vitest.setup";
import { ROLES_API_ROUTE } from "../../constants/general";
import { CANNOT_UPSERT_ROLE_ERROR_MESSAGE } from "../../constants/message";
import { testRoles } from "../fixtures";

const endpoint = `*${ROLES_API_ROUTE}`;

export function mockUpsertRoleSuccessApi() {
	return server.use(
		http.put(endpoint, async ({ request }) => {
			const body = (await request.json()) as Partial<Role>;
			return HttpResponse.json(body, { status: SUCCESS_STATUS_CODE });
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
				{ ...testRoles[0], _id: params.id },
				{ status: SUCCESS_STATUS_CODE },
			);
		}),
	);
}
