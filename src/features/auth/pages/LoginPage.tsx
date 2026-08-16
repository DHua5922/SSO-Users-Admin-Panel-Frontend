import { useMutation } from "@tanstack/react-query";
import { type SubmitEvent, useState } from "react";
import { useNavigate } from "react-router";
import { HOME_PATH } from "../../../shared/constants";
import usePageErrorHandler from "../../../shared/hooks/usePageErrorHandler";
import { logInApi } from "../api/auth";
import LoginForm from "../components/LoginForm";

function useLoginForm() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handlePageError = usePageErrorHandler();

	const { isPending, mutate } = useMutation({
		mutationFn: logInApi,
		onSuccess: () => navigate(HOME_PATH),
		onError: handlePageError,
	});

	return {
		isLoading: isPending,
		email,
		onChangeEmail: setEmail,
		password,
		onChangePassword: setPassword,
		onSubmit: (e: SubmitEvent<HTMLFormElement>) => {
			e.preventDefault();
			mutate({ email, password });
		},
	};
}

export default function LoginPage() {
	const loginForm = useLoginForm();
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<LoginForm {...loginForm} />
		</div>
	);
}
