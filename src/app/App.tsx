import { BrowserRouter } from "react-router";
import { useTheme } from "./hooks/useTheme";
import Routes from "./routes/Routes";

export default function App() {
	useTheme();

	return (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	);
}
