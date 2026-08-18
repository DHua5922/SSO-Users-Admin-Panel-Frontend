import useStatusStore from "../useStatusStore";
import { parseError } from "../utilities";

export default function useModalErrorHandler() {
	const addModalAlert = useStatusStore((state) => state.addModalAlert);

	return (err: unknown) => {
		addModalAlert({
			id: crypto.randomUUID(),
			variant: "danger",
			message: parseError(err),
		});
	};
}
