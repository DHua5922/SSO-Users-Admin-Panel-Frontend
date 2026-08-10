import { useMutation } from "@tanstack/react-query";
import { type SubmitEvent, useState } from "react";
import { useNavigate } from "react-router";
import { logInApi } from "../api/auth";
import LoginForm from "../components/LoginForm";
import { paths } from "../constants";
import usePageErrorHandler from "../hooks/usePageErrorHandler";
import type { LoginInput } from "../schemas/auth";
import type { User } from "../schemas/user";
import useAuthStore from "../store/auth";

function useLoginForm() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const setMe = useAuthStore((state) => state.setMe);
	const handlePageError = usePageErrorHandler();

	const { isPending, mutate } = useMutation({
		mutationFn: (inputs: LoginInput) => logInApi(inputs),
		onSuccess: (me: User) => {
			setMe(me);
			navigate(paths.home);
		},
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
		<div className="">
			<LoginForm {...loginForm} />
		</div>
	);
}
