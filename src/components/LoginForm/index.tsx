import type { HTMLAttributes } from "react";
import Button from "../Button";
import Field from "../Field";

interface Props extends HTMLAttributes<HTMLFormElement> {
	isLoading: boolean;
	email: string;
	onChangeEmail: (email: string) => void;
	password: string;
	onChangePassword: (password: string) => void;
}

export default function LoginForm({
	isLoading,
	email,
	onChangeEmail,
	password,
	onChangePassword,
	className = "",
	...props
}: Props) {
	const formattedClassName = `flex flex-col gap-4 ${className}`.trim();

	return (
		<form className={formattedClassName} {...props}>
			<h2 className="text-2xl font-bold">Login</h2>

			<Field
				label="Email"
				required
				inputProps={{
					id: "email-input",
					type: "email",
					value: email,
					onChange: (e) => onChangeEmail(e.target.value),
				}}
			/>

			<Field
				label="Password"
				required
				inputProps={{
					id: "password-input",
					type: "password",
					value: password,
					onChange: (e) => onChangePassword(e.target.value),
				}}
			/>

			<Button isLoading={isLoading} loadingText="Logging in..." type="submit">
				Login
			</Button>
		</form>
	);
}
