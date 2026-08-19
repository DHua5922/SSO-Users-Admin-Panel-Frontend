import { z } from "zod";
import { createAxiosInstance } from "../../shared/api/instance";
import { METHOD_DELETE, METHOD_GET, METHOD_PUT } from "../../shared/constants";
import { USERS_API_ROUTE } from "./constants";
import { type UpsertUser, type User, userSchema } from "./schemas";

const axios = createAxiosInstance(USERS_API_ROUTE);

export async function getUsersApi() {
	const response = await axios<User[]>({
		method: METHOD_GET,
	});

	return z.array(userSchema).parse(response.data);
}

export async function upsertUserApi(data: UpsertUser) {
	const response = await axios<User>({
		method: METHOD_PUT,
		data,
	});

	return userSchema.parse(response.data);
}

export async function deleteUserApi(userId: User["_id"]) {
	const response = await axios<User>({
		method: METHOD_DELETE,
		url: `/${userId}`,
	});

	return userSchema.parse(response.data);
}
