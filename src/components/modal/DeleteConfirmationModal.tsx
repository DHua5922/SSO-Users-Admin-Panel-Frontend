import Button from "../Button";
import Modal from "./Modal";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Modal> {
  onClickDelete: () => void;
  question: string;
  heroText: string;
  isDeleting: boolean;
  deleteButtonText: string;
}

export default function DeleteConfirmationModal({
  onClickDelete,
  question,
  isDeleting,
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
          className="bg-red-500! text-white!"
          onClick={onClickDelete}
          isLoading={isDeleting}
        >
          {deleteButtonText}
        </Button>
      </div>
    </Modal>
  );
}
