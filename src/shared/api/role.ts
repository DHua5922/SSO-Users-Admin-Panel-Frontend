import { z } from "zod";
import { type Role, roleSchema } from "../schemas";
import { createAxiosInstance } from ".";

const axios = createAxiosInstance("/api/v1/roles");

export async function getAllRolesApi() {
	const response = await axios<Role[]>({
		method: "get",
	});

	return z.array(roleSchema).parse(response.data);
}
