import { useMutation } from "@tanstack/react-query";
import { type SubmitEvent, useState } from "react";
import { useNavigate } from "react-router";
import { HOME_PATH } from "../../../shared/constants";
import usePageErrorHandler from "../../../shared/hooks/usePageErrorHandler";
import { logInApi, logInAsGuestApi } from "../api/auth";
import LoginForm from "../components/LoginForm";

function useLoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handlePageError = usePageErrorHandler();

	const loginMutation = useMutation({
		mutationFn: logInApi,
		onSuccess: () => navigate(HOME_PATH),
		onError: handlePageError,
	});
	const guestLoginMutation = useMutation({
		mutationFn: logInAsGuestApi,
		onSuccess: () => navigate(HOME_PATH),
		onError: handlePageError,
	});

	return {
		isLoading: loginMutation.isPending,
		isGuestLoginLoading: guestLoginMutation.isPending,
		onGuestLogin: () => guestLoginMutation.mutate(),
		email,
		onChangeEmail: setEmail,
		password,
		onChangePassword: setPassword,
		onSubmit: (e: SubmitEvent<HTMLFormElement>) => {
			e.preventDefault();
			loginMutation.mutate({ email, password });
		},
	};
}

export default function LoginPage() {
	const loginForm = useLoginPage();
	return (
		<div className="center flex-col h-screen">
			<LoginForm {...loginForm} />
		</div>
	);
}
