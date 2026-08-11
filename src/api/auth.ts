import { z } from "zod";
import { loginSchema } from "../schemas/auth";
import { userSchema } from "../schemas/user";
import { createAxiosInstance } from ".";

const authAxios = createAxiosInstance("/api/v1/auth");

export async function logInApi(data: z.infer<typeof loginSchema>) {
	const response = await authAxios({
		method: "POST",
		url: "/login",
		data: loginSchema.parse(data),
	});
	return userSchema.parse(response.data);
}

export async function refreshTokensApi() {
	const response = await authAxios({
		method: "POST",
		url: "/tokens/new",
	});
	return response.data;
}
