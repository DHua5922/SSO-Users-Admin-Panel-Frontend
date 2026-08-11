import { userSchema } from "../schemas/user";
import { createAxiosInstance } from ".";

const meAxios = createAxiosInstance("/api/v1/me");

export async function getMeApi() {
	const response = await meAxios({
		method: "get",
	});
	return userSchema.parse(response.data);
}
