import axios from "axios";
import { AUTH_BASE_API_ROUTE } from "../../features/auth/constants";
import { METHOD_POST, NEW_TOKENS_API_ROUTE } from "../constants";

export async function refreshTokensApi() {
	const response = await axios({
		method: METHOD_POST,
		url: `${import.meta.env.VITE_BACKEND_BASE_URL}${AUTH_BASE_API_ROUTE}${NEW_TOKENS_API_ROUTE}`,
		withCredentials: true,
	});
	return response.data;
}
