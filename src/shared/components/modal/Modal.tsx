import { Modal as DefaultModal } from "@dhua5922/react-kit";
import { type ComponentProps, useId } from "react";
import { useShallow } from "zustand/react/shallow";
import useStatusStore from "../../store/status";
import Alerts from "../alert/Alerts";

interface Props extends ComponentProps<typeof DefaultModal> {
  title: string;
}

export default function Modal({
  title,
  children,
  className = "",
  ...props
}: Props) {
  const { modalAlerts, removeModalAlert } = useStatusStore(
    useShallow((state) => ({
      modalAlerts: state.modalAlerts,
      removeModalAlert: state.removeModalAlert,
    })),
  );

  const formattedClassName = `max-w-[700px]! ${className}`.trim();

  const titleId = useId();

  return (
    <DefaultModal
      {...props}
      className={formattedClassName}
      aria-labelledby={titleId}
    >
      <DefaultModal.Header>
        <DefaultModal.Title id={titleId}>{title}</DefaultModal.Title>

        <DefaultModal.CloseButton />
      </DefaultModal.Header>

      <DefaultModal.Body>
        <Alerts
          className="static mx-auto translate-none"
          list={modalAlerts}
          onRemoveAlert={removeModalAlert}
        />

        {children}
      </DefaultModal.Body>
    </DefaultModal>
  );
}
