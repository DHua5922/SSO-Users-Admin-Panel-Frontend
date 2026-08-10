import axios from "axios";

export function createAxiosInstance(path: string) {
	const instance = axios.create({
		baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}${path}`,
	});

	return instance;
}
