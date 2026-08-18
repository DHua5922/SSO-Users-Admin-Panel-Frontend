import type { HTMLAttributes } from "react";
import { REQUIRED_FIELD_ACCESSIBLE_TEXT } from "../../constants";

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
			{label && (
				<label htmlFor={htmlFor}>
					{label}
					{required && (
						<>
							<span aria-hidden="true" className="text-danger">
								{" *"}
							</span>
							<span className="sr-only">
								{` ${REQUIRED_FIELD_ACCESSIBLE_TEXT}`}
							</span>
						</>
					)}
				</label>
			)}

			{children}

			{errorMessage && (
				<span
					id={htmlFor ? `${htmlFor}-error` : undefined}
					className="text-danger"
				>
					{errorMessage}
				</span>
			)}
		</div>
	);
}
