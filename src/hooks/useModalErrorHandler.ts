import { ApiError, DefaultError } from "js-ts-kit";
import useStatusStore from "../store/status";

export default function useModalErrorHandler() {
  const addModalAlert = useStatusStore((state) => state.addModalAlert);

  return (err: unknown) => {
    let errorMsg = "";

    if (ApiError.isApiError(err)) {
      errorMsg = ApiError.default(err);
    } else {
      errorMsg = DefaultError.message(err);
    }

    addModalAlert({
      id: crypto.randomUUID(),
      variant: "danger",
      message: errorMsg,
    });
  };
}
