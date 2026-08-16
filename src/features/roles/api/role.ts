import { z } from "zod";
import { createAxiosInstance } from "../../../shared/api/instance";
import { type Role, roleSchema } from "../../../shared/schemas";

const axios = createAxiosInstance("/api/v1/roles");

export async function getAllRolesApi() {
	const response = await axios<Role[]>({
		method: "get",
	});

	return z.array(roleSchema).parse(response.data);
}
