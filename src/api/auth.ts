import { type LoginInput, loginSchema } from "../schemas/auth";
import { userSchema } from "../schemas/user";
import { createAxiosInstance } from ".";

const authAxios = createAxiosInstance("/api/v1/auth");

export async function logInApi(data: LoginInput) {
	const response = await authAxios({
		method: "POST",
		url: "/login",
		data: loginSchema.parse(data),
	});
	return userSchema.parse(response.data);
}
