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
	const formattedClassName =
		`w-full max-w-[350px] m-auto shadow-lg flex flex-col p-8 gap-4 border border-gray-200 rounded-md ${className}`.trim();

	return (
		<form className={formattedClassName} {...props}>
			<h2 className="text-3xl text-center font-medium">Login</h2>

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
