import useAlertStore from "../store/useAlertStore";
import { parseError } from "../utilities/parseError";

export default function usePageErrorHandler() {
	const addPageAlert = useAlertStore((state) => state.addPageAlert);

	return (err: unknown) => {
		addPageAlert({
			id: crypto.randomUUID(),
			variant: "danger",
			message: parseError(err),
		});
	};
}
