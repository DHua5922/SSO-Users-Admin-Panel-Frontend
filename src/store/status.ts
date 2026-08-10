import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Alert } from "../types/status";

interface State {
	pageAlerts: Alert[];
}

interface Actions {
	addPageAlert: (alert: Alert) => void;
	removePageAlert: (id: string) => void;
}

const useStatusStore = create<State & Actions>()(
	devtools((set) => ({
		pageAlerts: [],
		addPageAlert: (alert) =>
			set((state) => ({ pageAlerts: [...state.pageAlerts, alert] })),
		removePageAlert: (id) =>
			set((state) => ({
				pageAlerts: state.pageAlerts.filter((alert) => alert.id !== id),
			})),
	})),
);

export default useStatusStore;
