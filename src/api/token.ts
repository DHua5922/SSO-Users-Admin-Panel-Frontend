import axios from "axios";

export async function refreshTokensApi() {
  const response = await axios({
    method: "POST",
    url: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/auth/tokens/new`,
	withCredentials: true,
  });
  return response.data;
}
