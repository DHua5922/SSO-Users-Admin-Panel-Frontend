import { z } from "zod";
import { createAxiosInstance } from "../../../shared/api/instance";
import { METHOD_POST } from "../../../shared/constants";
import { userSchema } from "../../users/schemas";
import {
	AUTH_BASE_API_ROUTE,
	GUEST_LOGIN_PATH,
	LOGIN_PATH,
} from "../constants";

const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(1),
});

const authAxios = createAxiosInstance(AUTH_BASE_API_ROUTE);

export async function logInApi(data: z.infer<typeof loginSchema>) {
	const response = await authAxios({
		method: METHOD_POST,
		url: LOGIN_PATH,
		data: loginSchema.parse(data),
	});
	return userSchema.parse(response.data);
}

export async function logInAsGuestApi() {
	const response = await authAxios({
		method: METHOD_POST,
		url: GUEST_LOGIN_PATH,
	});
	return userSchema.parse(response.data);
}

export async function logOutApi() {
	const response = await authAxios({
		method: METHOD_POST,
		url: "/logout",
	});
	return response.data;
}
