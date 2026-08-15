import type { HTMLAttributes } from "react";
import { LOGIN_TEXT } from "../../constants";
import Button from "../Button";
import Field from "../Field";

interface Props extends HTMLAttributes<HTMLFormElement> {
  isLoading: boolean;
  email: string;
  onChangeEmail: (email: string) => void;
  password: string;
  onChangePassword: (password: string) => void;
}

export default function LoginForm({
  isLoading,
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

      <Field label="Email" htmlFor={emailInputId} required>
        <input
          id={emailInputId}
          type="email"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
        />
      </Field>

      <Field label="Password" htmlFor={passwordInputId} required>
        <input
          id={passwordInputId}
          type="password"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
        />
      </Field>

      <Button isLoading={isLoading} loadingText="Logging in..." type="submit">
        {LOGIN_TEXT}
      </Button>
    </form>
  );
}
