import { z } from "zod";
import { createAxiosInstance } from "../../shared/api/instance";
import { METHOD_DELETE, METHOD_GET, METHOD_PUT } from "../../shared/constants";
import { type Role, roleSchema } from "../../shared/schemas";
import { ROLES_API_ROUTE } from "./constants/general";
import type { UpsertRoleFormData } from "./schemas";

const axios = createAxiosInstance(ROLES_API_ROUTE);

export async function getAllRolesApi() {
	const response = await axios<Role[]>({
		method: METHOD_GET,
	});

	return z.array(roleSchema).parse(response.data);
}

export async function upsertRoleApi(
	data: UpsertRoleFormData & { _id: Role["_id"] },
) {
	const response = await axios<Role>({
		method: METHOD_PUT,
		data,
	});

	return roleSchema.parse(response.data);
}

export async function deleteRoleApi(roleId: Role["_id"]) {
	const response = await axios<Role>({
		method: METHOD_DELETE,
		url: `/${roleId}`,
	});

	return roleSchema.parse(response.data);
}
