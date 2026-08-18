import type { ComponentProps } from "react";
import Button from "../Button/Button";
import Modal from "./Modal";

interface Props extends ComponentProps<typeof Modal> {
	onClickDelete: () => void;
	question: string;
	heroText: string;
	isDeleting: boolean;
	loadingButtonText: string;
	deleteButtonText: string;
}

export default function DeleteConfirmationModal({
	onClickDelete,
	question,
	isDeleting,
	loadingButtonText,
	deleteButtonText,
	heroText,
	className = "",
	children,
	...props
}: Props) {
	const formattedClassName = `max-w-[600px]! ${className}`.trim();
	return (
		<Modal className={formattedClassName} {...props}>
			<p className="text-xl">{question}</p>

			<p className="text-xl text-danger my-6 font-bold text-center">
				{heroText}
			</p>

			<div className="text-center">
				<Button
					className="bg-red-700! text-white!"
					onClick={onClickDelete}
					isLoading={isDeleting}
					loadingText={loadingButtonText}
				>
					{deleteButtonText}
				</Button>
			</div>
		</Modal>
	);
}
