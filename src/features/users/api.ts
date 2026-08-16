import { z } from "zod";
import { createAxiosInstance } from "../../shared/api/instance";
import { type UpsertUser, type User, userSchema } from "./schemas";

const axios = createAxiosInstance("/api/v1/users");

export async function getUsersApi() {
	const response = await axios<User[]>({
		method: "get",
	});

	return z.array(userSchema).parse(response.data);
}

export async function upsertUserApi(data: UpsertUser) {
	const response = await axios<User>({
		method: "put",
		data,
	});

	return userSchema.parse(response.data);
}

export async function deleteUserApi(userId: User["_id"]) {
	const response = await axios<User>({
		method: "delete",
		url: `/${userId}`,
	});

	return userSchema.parse(response.data);
}
