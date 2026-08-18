import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@dhua5922/react-kit/style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.tsx";
import "../styles/main.css";
import ErrorBoundary from "./boundaries/ErrorBoundary";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundary>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<App />
			</QueryClientProvider>
		</ErrorBoundary>
	</StrictMode>,
);
