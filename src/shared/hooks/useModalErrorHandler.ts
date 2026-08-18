import useAlertStore from "../store/useAlertStore";
import { parseError } from "../utilities/parseError";

export default function useModalErrorHandler() {
	const addModalAlert = useAlertStore((state) => state.addModalAlert);

	return (err: unknown) => {
		addModalAlert({
			id: crypto.randomUUID(),
			variant: "danger",
			message: parseError(err),
		});
	};
}
