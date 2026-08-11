import axios from "axios";
import { refreshTokensApi } from "./auth";

export function createAxiosInstance(path: string) {
	const instance = axios.create({
		baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}${path}`,
		withCredentials: true,
	});

	instance.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (error.response?.status === 401 && !error.retry) {
				await refreshTokensApi();
				error.retry = true;
				return instance(error.config);
			} else if (error.response.url?.includes("/api/v1/auth/tokens/new")) {
				window.location.href = "/login";
			}
			return Promise.reject(error);
		},
	);

	return instance;
}
