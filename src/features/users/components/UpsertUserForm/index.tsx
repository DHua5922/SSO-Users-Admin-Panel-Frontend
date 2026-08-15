import { zodResolver } from "@hookform/resolvers/zod";
import { type HTMLAttributes, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../shared/components/Button";
import Field from "../../../../shared/components/Field";
import type { Role } from "../../../../shared/schemas";
import RoleSelect from "../../../roles/components/RoleSelect";
import { type UpsertUserFormData, upsertUserFormSchema } from "../../schemas";

interface Props extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
	isEditing: boolean;
	isSubmitting: boolean;
	email: string;
	username: string;
	role: string;
	submitButtonText: string;
	onSubmit: (formValues: UpsertUserFormData) => void;
	roleSelectProps: {
		isLoading: boolean;
		isError: boolean;
		errorMessage?: string;
		list: Role[];
	};
}

interface UseFormValidationProps {
	username: string;
	email: string;
	role: string;
	isSubmitting: boolean;
	isLoadingRoles: boolean;
}

function useFormValidation({
	username,
	email,
	role,
	isSubmitting,
	isLoadingRoles,
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
			role,
			password: "",
			confirmPassword: "",
		},
	});

	const isLoading = isSubmitting || isLoadingRoles;

	useEffect(() => {
		reset({
			username,
			email,
			role,
			password: "",
			confirmPassword: "",
		});
	}, [username, email, role, reset]);

	return {
		isLoading,
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
	role,
	submitButtonText,
	onSubmit,
	className = "",
	roleSelectProps,
	...props
}: Props) {
	const formattedClassName =
		`grid grid-cols-1 gap-4 md:grid-cols-2 ${className}`.trim();

	const { isLoading, register, handleSubmit, errors } = useFormValidation({
		username,
		email,
		role,
		isSubmitting,
		isLoadingRoles: roleSelectProps.isLoading,
	});

	const usernameInputId = "username-input";
	const emailInputId = "email-input";
	const roleSelectId = "role-select";
	const passwordInputId = "password-input";
	const confirmPasswordInputId = "confirm-password-input";

	return (
		<form
			className={formattedClassName}
			onSubmit={handleSubmit(onSubmit)}
			{...props}
		>
			<Field
				label="Username"
				htmlFor={usernameInputId}
				required
				errorMessage={errors.username?.message}
			>
				<input {...register("username")} id={usernameInputId} />
			</Field>

			<Field
				label="Role"
				htmlFor={roleSelectId}
				required
				errorMessage={errors.role?.message}
			>
				<RoleSelect
					{...register("role")}
					id={roleSelectId}
					{...roleSelectProps}
				/>
			</Field>

			<Field
				className="md:col-span-2"
				label="Email"
				htmlFor={emailInputId}
				required
				errorMessage={errors.email?.message}
			>
				<input {...register("email")} id={emailInputId} type="email" />
			</Field>

			<Field
				label="Password"
				required={!isEditing}
				errorMessage={errors.password?.message}
				htmlFor={passwordInputId}
			>
				<input {...register("password")} id={passwordInputId} type="password" />
			</Field>

			<Field
				label="Confirm Password"
				required={!isEditing}
				errorMessage={errors.confirmPassword?.message}
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
				isLoading={isLoading}
				loadingText={submitButtonText}
				type="submit"
			>
				{submitButtonText}
			</Button>
		</form>
	);
}
