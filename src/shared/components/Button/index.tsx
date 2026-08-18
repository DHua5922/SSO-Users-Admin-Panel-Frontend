import type { ButtonHTMLAttributes } from "react";
import { LOADING_TEXT } from "../../constants";
import styles from "./index.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	loadingText?: string;
}

export default function Button({
	children,
	className = "",
	isLoading,
	loadingText = LOADING_TEXT,
	disabled,
	...props
}: Props) {
	const formattedClassName = `${styles.container} ${className}`.trim();
	return (
		<button
			disabled={isLoading || disabled}
			className={formattedClassName}
			{...props}
		>
			{isLoading ? loadingText : children}
		</button>
	);
}
