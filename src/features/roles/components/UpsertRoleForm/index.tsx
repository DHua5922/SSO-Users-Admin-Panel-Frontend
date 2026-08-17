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

interface Props extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
	isEditing: boolean;
	isSubmitting: boolean;
	name: string;
	description: string;
	submitButtonText: string;
	onSubmit: (formValues: UpsertRoleFormData) => void;
}

interface UseFormValidationProps {
	name: string;
	description: string;
	isSubmitting: boolean;
}

function useFormValidation({
	name,
	description,
	isSubmitting,
}: UseFormValidationProps) {
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
		isLoading: isSubmitting,
		register,
		handleSubmit,
		errors,
	};
}

export default function UpsertRoleForm({
	isEditing,
	isSubmitting,
	name,
	description,
	submitButtonText,
	onSubmit,
	className = "",
	...props
}: Props) {
	const formattedClassName =
		`grid grid-cols-1 gap-4 md:grid-cols-2 ${className}`.trim();

	const { isLoading, register, handleSubmit, errors } = useFormValidation({
		name,
		description,
		isSubmitting,
	});

	const nameInputId = "name-input";
	const descriptionInputId = "description-input";

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
				errorMessage={errors.name?.message}
			>
				<input {...register("name")} id={nameInputId} />
			</Field>

			<Field
				className="md:col-span-2"
				label={UPSERT_ROLE_FORM_DESCRIPTION_LABEL}
				htmlFor={descriptionInputId}
				errorMessage={errors.description?.message}
			>
				<input
					{...register("description")}
					id={descriptionInputId}
					type="textarea"
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
