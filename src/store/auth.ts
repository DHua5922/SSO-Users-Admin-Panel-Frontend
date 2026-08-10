import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
	me: {
		_id: string;
		email: string;
		username: string;
	};
}

interface Actions {
	setMe: (me: State["me"]) => void;
}

const useAuthStore = create<State & Actions>()(
	devtools((set) => ({
		me: {
			_id: "",
			email: "",
			username: "",
		},
		setMe: (me) => set({ me }),
	})),
);

export default useAuthStore;
