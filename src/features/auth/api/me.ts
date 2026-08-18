import { createAxiosInstance } from "../../../shared/api/instance";
import { METHOD_GET } from "../../../shared/constants";
import { userSchema } from "../../users/schemas";
import { ME_API_ROUTE } from "../constants";

const meAxios = createAxiosInstance(ME_API_ROUTE);

export async function getMeApi() {
	const response = await meAxios({
		method: METHOD_GET,
	});
	return userSchema.parse(response.data);
}
