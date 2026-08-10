import { HttpResponse, http } from "msw";
import { server } from "../../vitest.setup";

export function mockLoginSuccessApi() {
	server.use(
		http.post("*/api/v1/auth/login", () => {
			const sampleResponse = {
				_id: "2w3192hed1e",
				email: "admin@example.com",
				username: "admin",
				role: "admin",
			};
			return HttpResponse.json(sampleResponse, { status: 200 });
		}),
	);
}

export function mockLoginFailureApi() {
	server.use(
		http.post("*/api/v1/auth/login", () => {
			return HttpResponse.json("Invalid credentials", { status: 400 });
		}),
	);
}
