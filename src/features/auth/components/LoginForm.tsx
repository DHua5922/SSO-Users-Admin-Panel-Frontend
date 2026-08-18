import type { HTMLAttributes } from "react";
import Button from "../../../shared/components/Button/Button";
import Field from "../../../shared/components/Field";
import {
	GUEST_LOGIN_LOADING_TEXT,
	GUEST_LOGIN_TEXT,
	LOGIN_EMAIL_INPUT_LABEL,
	LOGIN_LOADING_TEXT,
	LOGIN_PASSWORD_INPUT_LABEL,
	LOGIN_TEXT,
} from "../constants";

interface Props extends HTMLAttributes<HTMLFormElement> {
	isLoading: boolean;
	isGuestLoginLoading: boolean;
	onGuestLogin: () => void;
	email: string;
	onChangeEmail: (email: string) => void;
	password: string;
	onChangePassword: (password: string) => void;
}

export default function LoginForm({
	isLoading,
	isGuestLoginLoading,
	onGuestLogin,
	email,
	onChangeEmail,
	password,
	onChangePassword,
	className = "",
	...props
}: Props) {
	const formattedClassName =
		`w-full max-w-[350px] m-auto shadow-lg flex flex-col p-8 gap-4 border border-gray-200 rounded-md ${className}`.trim();

	const emailInputId = "email-input";
	const passwordInputId = "password-input";

	return (
		<form className={formattedClassName} {...props}>
			<h2 className="text-3xl text-center font-medium">{LOGIN_TEXT}</h2>

			<Field label={LOGIN_EMAIL_INPUT_LABEL} htmlFor={emailInputId} required>
				<input
					id={emailInputId}
					type="email"
					aria-required="true"
					value={email}
					onChange={(e) => onChangeEmail(e.target.value)}
				/>
			</Field>

			<Field
				label={LOGIN_PASSWORD_INPUT_LABEL}
				htmlFor={passwordInputId}
				required
			>
				<input
					id={passwordInputId}
					type="password"
					value={password}
					onChange={(e) => onChangePassword(e.target.value)}
				/>
			</Field>

			<Button
				isLoading={isLoading}
				loadingText={LOGIN_LOADING_TEXT}
				type="submit"
				disabled={isGuestLoginLoading}
			>
				{LOGIN_TEXT}
			</Button>

			<Button
				isLoading={isGuestLoginLoading}
				loadingText={GUEST_LOGIN_LOADING_TEXT}
				type="button"
				disabled={isLoading}
				onClick={onGuestLogin}
			>
				{GUEST_LOGIN_TEXT}
			</Button>
		</form>
	);
}
