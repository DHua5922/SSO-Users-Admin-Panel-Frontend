import { zodResolver } from "@hookform/resolvers/zod";
import { type HTMLAttributes, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../shared/components/Button";
import Field from "../../../../shared/components/Field";
import {
	UPSERT_ROLE_FORM_DESCRIPTION_LABEL,
	UPSERT_ROLE_FORM_NAME_LABEL,
} from "../../constants/input";
import {
	type UpsertRoleFormData,
	upsertRoleFormDataSchema,
} from "../../schemas";

interface UpsertRoleFormProps
	extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
	isSubmitting: boolean;
	name: string;
	description: string;
	loadingButtonText: string;
	submitButtonText: string;
	onSubmit: (formValues: UpsertRoleFormData) => void;
}

interface UseFormValidationProps {
	name: string;
	description: string;
}

function useFormValidation({ name, description }: UseFormValidationProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UpsertRoleFormData>({
		resolver: zodResolver(upsertRoleFormDataSchema),
		defaultValues: {
			name,
			description,
		},
	});

	useEffect(() => {
		reset({
			name,
			description,
		});
	}, [name, description, reset]);

	return {
		register,
		handleSubmit,
		errors,
	};
}

export default function UpsertRoleForm({
	isSubmitting,
	name,
	description,
	loadingButtonText,
	submitButtonText,
	onSubmit,
	className = "",
	...props
}: UpsertRoleFormProps) {
	const formattedClassName = `flex flex-col gap-4 ${className}`.trim();

	const { register, handleSubmit, errors } = useFormValidation({
		name,
		description,
	});

	const nameInputId = "name-input";
	const descriptionInputId = "description-input";
	const nameErrorMessage = errors.name?.message || "";
	const descriptionErrorMessage = errors.description?.message || "";

	return (
		<form
			className={formattedClassName}
			onSubmit={handleSubmit(onSubmit)}
			{...props}
		>
			<Field
				label={UPSERT_ROLE_FORM_NAME_LABEL}
				htmlFor={nameInputId}
				required
				errorMessage={nameErrorMessage}
			>
				<input
					{...register("name")}
					id={nameInputId}
					aria-required="true"
					aria-invalid={Boolean(nameErrorMessage)}
					aria-describedby={
						nameErrorMessage ? `${nameInputId}-error` : undefined
					}
				/>
			</Field>

			<Field
				label={UPSERT_ROLE_FORM_DESCRIPTION_LABEL}
				htmlFor={descriptionInputId}
				errorMessage={descriptionErrorMessage}
			>
				<textarea
					{...register("description")}
					id={descriptionInputId}
					aria-invalid={Boolean(descriptionErrorMessage)}
					aria-describedby={
						descriptionErrorMessage ? `${descriptionInputId}-error` : undefined
					}
				/>
			</Field>

			<Button
				isLoading={isSubmitting}
				loadingText={loadingButtonText}
				type="submit"
			>
				{submitButtonText}
			</Button>
		</form>
	);
}
