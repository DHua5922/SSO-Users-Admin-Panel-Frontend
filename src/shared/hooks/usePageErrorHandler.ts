import { ApiError, DefaultError } from "js-ts-kit";
import useStatusStore from "../store/status";

export default function usePageErrorHandler() {
  const addPageAlert = useStatusStore((state) => state.addPageAlert);

  return (err: unknown) => {
    let errorMsg = "";

    if (ApiError.isApiError(err)) {
      errorMsg = ApiError.default(err);
    } else {
      errorMsg = DefaultError.message(err);
    }

    addPageAlert({
      id: crypto.randomUUID(),
      variant: "danger",
      message: errorMsg,
    });
  };
}
