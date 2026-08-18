import { Component, type PropsWithChildren } from "react";
import Button from "../../shared/components/Button";

interface State {
	error: Error | null;
}

// see https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary for more information on error boundaries
export default class ErrorBoundary extends Component<PropsWithChildren, State> {
	state: State = { error: null };

	static getDerivedStateFromError(error: Error): State {
		return { error };
	}

	resetErrorBoundary = () => {
		this.setState({ error: null });
	};

	render() {
		if (this.state.error) {
			return (
				<ErrorFallback
					error={this.state.error}
					resetErrorBoundary={this.resetErrorBoundary}
				/>
			);
		}

		return this.props.children;
	}
}

interface ErrorFallbackProps {
	error: Error;
	resetErrorBoundary: () => void;
}
function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
	return (
		<main className="h-screen center flex-col gap-8">
			<h1 className="text-4xl font-bold">Something went wrong</h1>

			<p className="text-2xl">{error.message}</p>

			<Button onClick={resetErrorBoundary}>Try again</Button>
		</main>
	);
}
