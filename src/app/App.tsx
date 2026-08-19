import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./providers/ThemeProvider";
import Routes from "./routes/Routes";

export default function App() {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</ThemeProvider>
	);
}
