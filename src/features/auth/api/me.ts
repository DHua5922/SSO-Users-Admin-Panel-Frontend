import { createAxiosInstance } from "../../../shared/api/instance";
import { userSchema } from "../../users/schemas";

const meAxios = createAxiosInstance("/api/v1/me");

export async function getMeApi() {
	const response = await meAxios({
		method: "get",
	});
	return userSchema.parse(response.data);
}
