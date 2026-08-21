import { zodResolver } from "@hookform/resolvers/zod";
import { type HTMLAttributes, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../shared/components/Button/Button";
import Field from "../../../shared/components/Field";
import RoleSelect from "../../roles/components/RoleSelect";
import type { Role } from "../../roles/schemas";
import {
	UPSERT_USER_FORM_CONFIRM_PASSWORD_LABEL,
	UPSERT_USER_FORM_EMAIL_LABEL,
	UPSERT_USER_FORM_PASSWORD_LABEL,
	UPSERT_USER_FORM_ROLE_LABEL,
	UPSERT_USER_FORM_USERNAME_LABEL,
} from "../constants";
import {
	createUpsertUserFormSchema,
	type UpsertUserFormData,
} from "../schemas";

interface UpsertUserFormProps
	extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
	isEditing: boolean;
	isSubmitting: boolean;
	email: string;
	username: string;
	initialRole: string;
	loadingButtonText: string;
	submitButtonText: string;
	onSubmit: (formValues: UpsertUserFormData) => void;
	roleSelect: {
		isLoading: boolean;
		isError: boolean;
		errorMessage: string;
		list: Role[];
	};
}

interface UseFormValidationProps {
	username: string;
	email: string;
	initialRole: string;
	isEditing: boolean;
}

function useFormValidation({
	username,
	email,
	initialRole,
	isEditing,
}: UseFormValidationProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UpsertUserFormData>({
		resolver: zodResolver(createUpsertUserFormSchema(isEditing)),
		defaultValues: {
			username,
			email,
			role: initialRole,
			password: "",
			confirmPassword: "",
		},
	});

	useEffect(() => {
		reset({
			username,
			email,
			role: initialRole,
			password: "",
			confirmPassword: "",
		});
	}, [username, email, initialRole, reset]);

	return {
		register,
		handleSubmit,
		errors,
	};
}

export default function UpsertUserForm({
	isEditing,
	isSubmitting,
	email,
	username,
	initialRole,
	loadingButtonText,
	submitButtonText,
	onSubmit,
	className = "",
	roleSelect,
	...props
}: UpsertUserFormProps) {
	const formattedClassName =
		`grid grid-cols-1 gap-4 md:grid-cols-2 ${className}`.trim();

	const { register, handleSubmit, errors } = useFormValidation({
		username,
		email,
		initialRole,
		isEditing,
	});

	const usernameInputId = "username-input";
	const emailInputId = "email-input";
	const roleSelectId = "role-select";
	const passwordInputId = "password-input";
	const confirmPasswordInputId = "confirm-password-input";
	const usernameErrorMessage = errors.username?.message || "";
	const roleErrorMessage = roleSelect.isError
		? roleSelect.errorMessage
		: errors.role?.message || "";
	const emailErrorMessage = errors.email?.message || "";
	const passwordErrorMessage = errors.password?.message || "";
	const confirmPasswordErrorMessage = errors.confirmPassword?.message || "";

	const areRolesUnavailable =
		roleSelect.isLoading || roleSelect.isError || roleSelect.list.length === 0;

	return (
		<form
			className={formattedClassName}
			onSubmit={handleSubmit(onSubmit)}
			{...props}
		>
			<Field
				label={UPSERT_USER_FORM_USERNAME_LABEL}
				htmlFor={usernameInputId}
				required
				errorMessage={usernameErrorMessage}
			>
				<input
					{...register("username")}
					id={usernameInputId}
					aria-required="true"
					aria-invalid={Boolean(usernameErrorMessage)}
					aria-describedby={
						usernameErrorMessage ? `${usernameInputId}-error` : undefined
					}
				/>
			</Field>

			<Field
				label={UPSERT_USER_FORM_ROLE_LABEL}
				htmlFor={roleSelectId}
				required
				errorMessage={roleErrorMessage}
			>
				<RoleSelect
					{...register("role")}
					id={roleSelectId}
					aria-required="true"
					aria-invalid={Boolean(roleErrorMessage)}
					aria-describedby={
						roleErrorMessage ? `${roleSelectId}-error` : undefined
					}
					isLoading={roleSelect.isLoading}
					list={roleSelect.list}
					disabled={roleSelect.isError || roleSelect.list.length === 0}
				/>
			</Field>

			<Field
				className="md:col-span-2"
				label={UPSERT_USER_FORM_EMAIL_LABEL}
				htmlFor={emailInputId}
				required
				errorMessage={emailErrorMessage}
			>
				<input
					{...register("email")}
					id={emailInputId}
					type="email"
					aria-required="true"
					aria-invalid={Boolean(emailErrorMessage)}
					aria-describedby={
						emailErrorMessage ? `${emailInputId}-error` : undefined
					}
				/>
			</Field>

			<Field
				label={UPSERT_USER_FORM_PASSWORD_LABEL}
				required={!isEditing}
				errorMessage={passwordErrorMessage}
				htmlFor={passwordInputId}
			>
				<input
					{...register("password")}
					id={passwordInputId}
					type="password"
					aria-invalid={Boolean(passwordErrorMessage)}
					aria-describedby={
						passwordErrorMessage ? `${passwordInputId}-error` : undefined
					}
				/>
			</Field>

			<Field
				label={UPSERT_USER_FORM_CONFIRM_PASSWORD_LABEL}
				required={!isEditing}
				errorMessage={confirmPasswordErrorMessage}
				htmlFor={confirmPasswordInputId}
			>
				<input
					{...register("confirmPassword")}
					id={confirmPasswordInputId}
					type="password"
					aria-invalid={Boolean(confirmPasswordErrorMessage)}
					aria-describedby={
						confirmPasswordErrorMessage
							? `${confirmPasswordInputId}-error`
							: undefined
					}
				/>
			</Field>

			<Button
				className="md:col-span-2"
				isLoading={isSubmitting}
				loadingText={loadingButtonText}
				disabled={areRolesUnavailable}
				type="submit"
			>
				{submitButtonText}
			</Button>
		</form>
	);
}
