import axios from "axios";
import { LOGIN_PATH } from "../../features/auth/constants";
import { refreshTokensApi } from "./token";

let refreshTokensPromise: ReturnType<typeof refreshTokensApi> | null = null;

export function createAxiosInstance(path: string) {
	const instance = axios.create({
		baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}${path}`,
		withCredentials: true,
	});

	instance.interceptors.response.use(
		(response) => response,
		async (error) => {
			const config = error.config;
			if (error.response?.status === 401 && config && !config.retry) {
				config.retry = true;

				try {
					await refreshTokensOnce();
				} catch (refreshError) {
					redirectToLogin();
					return Promise.reject(refreshError);
				}

				return instance(config);
			}

			if (config?.retry) {
				redirectToLogin();
			}

			return Promise.reject(error);
		},
	);

	return instance;
}

async function refreshTokensOnce() {
	if (refreshTokensPromise) {
		await refreshTokensPromise;
		return;
	}

	refreshTokensPromise = refreshTokensApi();

	try {
		await refreshTokensPromise;
	} finally {
		refreshTokensPromise = null;
	}
}

function redirectToLogin() {
	if (window.location.pathname !== LOGIN_PATH) {
		window.location.assign(LOGIN_PATH);
	}
}
