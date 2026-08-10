import type { HTMLAttributes, InputHTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
	label?: string;
	required?: boolean;
	inputProps: InputHTMLAttributes<HTMLInputElement>;
}

export default function Field({
	label,
	required,
	inputProps,
	className = "",
	...props
}: Props) {
	return (
		<div className={`flex flex-col gap-4 ${className}`} {...props}>
			<label htmlFor={inputProps.id}>
				{label}
				{required && <span className="text-red-500">{" *"}</span>}
			</label>

			<input {...inputProps} />
		</div>
	);
}
