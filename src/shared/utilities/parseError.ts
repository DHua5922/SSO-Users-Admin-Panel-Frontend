import { ApiError, DefaultError } from "js-ts-kit";

export function parseError(error: unknown) {
	return ApiError.isApiError(error)
		? ApiError.default(error)
		: DefaultError.message(error);
}
