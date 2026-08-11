import axios from "axios";

export async function refreshTokensApi() {
	const response = await axios({
		method: "POST",
		url: "/api/v1/auth/tokens/new",
	});
	return response.data;
}
