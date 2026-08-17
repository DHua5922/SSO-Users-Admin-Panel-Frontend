import { zodResolver } from "@hookform/resolvers/zod";
import { type HTMLAttributes, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../shared/components/Button";
import Field from "../../../../shared/components/Field";
import type { Role } from "../../../../shared/schemas";
import RoleSelect from "../../../roles/components/RoleSelect";
import {
	UPSERT_USER_FORM_CONFIRM_PASSWORD_LABEL,
	UPSERT_USER_FORM_EMAIL_LABEL,
	UPSERT_USER_FORM_PASSWORD_LABEL,
	UPSERT_USER_FORM_ROLE_LABEL,
	UPSERT_USER_FORM_USERNAME_LABEL,
} from "../../constants/input";
import { type UpsertUserFormData, upsertUserFormSchema } from "../../schemas";

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
}

function useFormValidation({
	username,
	email,
	initialRole,
}: UseFormValidationProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UpsertUserFormData>({
		resolver: zodResolver(upsertUserFormSchema),
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
	});

	const usernameInputId = "username-input";
	const emailInputId = "email-input";
	const roleSelectId = "role-select";
	const passwordInputId = "password-input";
	const confirmPasswordInputId = "confirm-password-input";

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
				errorMessage={errors.username?.message || ""}
			>
				<input {...register("username")} id={usernameInputId} />
			</Field>

			<Field
				label={UPSERT_USER_FORM_ROLE_LABEL}
				htmlFor={roleSelectId}
				required
				errorMessage={
					roleSelect.isError
						? roleSelect.errorMessage
						: errors.role?.message || ""
				}
			>
				<RoleSelect
					{...register("role")}
					id={roleSelectId}
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
				errorMessage={errors.email?.message || ""}
			>
				<input {...register("email")} id={emailInputId} type="email" />
			</Field>

			<Field
				label={UPSERT_USER_FORM_PASSWORD_LABEL}
				required={!isEditing}
				errorMessage={errors.password?.message || ""}
				htmlFor={passwordInputId}
			>
				<input {...register("password")} id={passwordInputId} type="password" />
			</Field>

			<Field
				label={UPSERT_USER_FORM_CONFIRM_PASSWORD_LABEL}
				required={!isEditing}
				errorMessage={errors.confirmPassword?.message || ""}
				htmlFor={confirmPasswordInputId}
			>
				<input
					{...register("confirmPassword")}
					id={confirmPasswordInputId}
					type="password"
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
