import axios from "axios";
import { LOGIN_PATH } from "../../features/auth/constants";
import { NEW_TOKENS_API_ROUTE } from "../constants";
import { refreshTokensApi } from "./token";

export function createAxiosInstance(path: string) {
	const instance = axios.create({
		baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}${path}`,
		withCredentials: true,
	});

	instance.interceptors.response.use(
		(response) => response,
		async (error) => {
			const config = error.config;
			if (error.response?.status === 401 && !config.retry) {
				await refreshTokensApi();
				config.retry = true;
				return instance(config);
			}

			if (
				config.retry ||
				error.response?.config?.url?.includes(NEW_TOKENS_API_ROUTE)
			) {
				window.location.assign(LOGIN_PATH);
			}

			return Promise.reject(error);
		},
	);

	return instance;
}
