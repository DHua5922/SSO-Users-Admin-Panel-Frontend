import type { AxiosError } from "axios";
import { ApiError, DefaultError } from "js-ts-kit";

export function parseError(error: AxiosError | Error) {
	return ApiError.isApiError(error)
		? ApiError.default(error)
		: DefaultError.message(error);
}
