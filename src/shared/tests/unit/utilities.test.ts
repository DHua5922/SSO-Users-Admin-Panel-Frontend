import type { AxiosError } from "axios";
import { parseError } from "../../utilities";

test("should return error message from API error", () => {
	const errorMessage = "Unable to complete request.";
	const error = {
		message: "Request failed with status code 500",
		response: { data: errorMessage },
	} as AxiosError<string>;

	expect(parseError(error)).toBe(errorMessage);
});

test("should return error message from normal error", () => {
	const errorMessage = "Something went wrong.";

	expect(parseError(new Error(errorMessage))).toBe(errorMessage);
});
