import type { Role } from "../../schemas/role";
import {
  DEFAULT_ROLE_SELECT_OPTION,
  LOADING_ROLES_TEXT,
} from "../../constants";
import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLSelectElement> {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  list?: Role[];
}

export default function RoleSelect({
  isLoading,
  isError,
  errorMessage,
  list,
  ...props
}: Props) {
  if (isLoading) {
    return (
      <select>
        <option>{LOADING_ROLES_TEXT}</option>
      </select>
    );
  }

  if (isError) {
    return (
      <select>
        <option>{errorMessage}</option>
      </select>
    );
  }

  return (
    <select {...props}>
      <option value="">{DEFAULT_ROLE_SELECT_OPTION}</option>
      {list?.map((role) => (
        <option key={role._id} value={role._id}>
          {role.name}
        </option>
      ))}
    </select>
  );
}
