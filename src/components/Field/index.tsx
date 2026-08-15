import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  errorMessage?: string;
}

export default function Field({
  label,
  htmlFor,
  required,
  errorMessage,
  className = "",
  children,
  ...props
}: Props) {
	const formattedClassName = `flex flex-col gap-2 ${className}`.trim();

  return (
    <div className={formattedClassName} {...props}>
      <label htmlFor={htmlFor}>
        {label}
        {required && <span className="text-danger">{" *"}</span>}
      </label>

      {children}

      {errorMessage && <span className="text-danger">{errorMessage}</span>}
    </div>
  );
}
