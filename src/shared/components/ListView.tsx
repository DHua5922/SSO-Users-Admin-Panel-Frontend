import { CircleX, List } from "lucide-react";

interface Props {
	isError: boolean;
	errorMessage: string;
	isEmpty: boolean;
	isLoading: boolean;
	loadingChildren: React.ReactNode;
	emptyListMessage: string;
	children: React.ReactNode;
}

const iconSize = 68;

export default function ListView({
	isError,
	errorMessage,
	isEmpty,
	emptyListMessage,
	isLoading,
	loadingChildren,
	children,
}: Props) {
	if (isLoading) {
		return loadingChildren;
	}

	if (isError) {
		return (
			<div className="list-message-container" role="alert">
				<CircleX aria-hidden="true" className="text-danger" size={iconSize} />
				<p className="list-message-text text-danger">{errorMessage}</p>
			</div>
		);
	}

	if (isEmpty) {
		return (
			<div className="list-message-container">
				<List aria-hidden="true" size={iconSize} />
				<p className="list-message-text text-gray-500">{emptyListMessage}</p>
			</div>
		);
	}

	return children;
}
