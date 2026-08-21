import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Alert } from "../types";

interface Store {
	pageAlerts: Alert[];
	modalAlerts: Alert[];
	addPageAlert: (alert: Alert) => void;
	removePageAlert: (id: string) => void;
	addModalAlert: (alert: Alert) => void;
	removeModalAlert: (id: string) => void;
	clearModalAlerts: () => void;
}

const useAlertStore = create<Store>()(
	devtools((set) => ({
		pageAlerts: [],
		modalAlerts: [],
		addPageAlert: (alert) =>
			set((state) => ({ pageAlerts: [...state.pageAlerts, alert] })),
		removePageAlert: (id) =>
			set((state) => ({
				pageAlerts: state.pageAlerts.filter((alert) => alert.id !== id),
			})),
		addModalAlert: (alert) =>
			set((state) => ({ modalAlerts: [...state.modalAlerts, alert] })),
		removeModalAlert: (id) =>
			set((state) => ({
				modalAlerts: state.modalAlerts.filter((alert) => alert.id !== id),
			})),
		clearModalAlerts: () => set({ modalAlerts: [] }),
	})),
);

export default useAlertStore;
