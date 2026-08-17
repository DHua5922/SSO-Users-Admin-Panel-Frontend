import { HttpResponse, http } from "msw";
import { SUCCESS_STATUS_CODE } from "../../../../shared/constants";
import type { Role } from "../../../../shared/schemas";
import { server } from "../../../../shared/tests/vitest.setup";
import { CANNOT_UPSERT_ROLE_ERROR_MESSAGE } from "../../constants/message";
import { testRoles } from "../fixtures";

const endpoint = "*/api/v1/roles";
const deleteEndpoint = `${endpoint}/:id`;

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
				status: 400,
			});
		}),
	);
}

export function mockDeleteRoleSuccessApi() {
	return server.use(
		http.delete(deleteEndpoint, ({ params }) => {
			return HttpResponse.json(
				{ ...testRoles[0], _id: params.id },
				{ status: SUCCESS_STATUS_CODE },
			);
		}),
	);
}
