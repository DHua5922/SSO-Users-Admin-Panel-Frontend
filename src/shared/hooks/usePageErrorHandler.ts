import useStatusStore from "../useStatusStore";
import { parseError } from "../utilities";

export default function usePageErrorHandler() {
	const addPageAlert = useStatusStore((state) => state.addPageAlert);

	return (err: unknown) => {
		addPageAlert({
			id: crypto.randomUUID(),
			variant: "danger",
			message: parseError(err),
		});
	};
}
