import { z } from "zod";
import { createAxiosInstance } from "../../shared/api/instance";
import { type Role, roleSchema } from "../../shared/schemas";
import type { UpsertRoleFormData } from "./schemas";

const axios = createAxiosInstance("/api/v1/roles");

export async function getAllRolesApi() {
	const response = await axios<Role[]>({
		method: "get",
	});

	return z.array(roleSchema).parse(response.data);
}

export async function upsertRoleApi(
	data: UpsertRoleFormData & { _id: Role["_id"] },
) {
	const response = await axios<Role>({
		method: "put",
		data,
	});

	return roleSchema.parse(response.data);
}

export async function deleteRoleApi(roleId: Role["_id"]) {
	const response = await axios<Role>({
		method: "delete",
		url: `/${roleId}`,
	});

	return roleSchema.parse(response.data);
}
