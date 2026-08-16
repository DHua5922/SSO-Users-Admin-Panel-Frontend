import { MoveRight } from "lucide-react";
import styles from "./index.module.css";
import type { ReactNode } from "react";

interface StatViewProps {
  label: string;
  value: number;
  isError: boolean;
  errorMessage?: string;
  isLoading: boolean;
  href: string;
  linkLabel: string;
}

const valueClassName = "text-5xl font-bold text-center";

export default function StatView({
  label,
  value,
  isError,
  errorMessage,
  isLoading,
  href,
  linkLabel,
}: StatViewProps) {
  const helperProps = {
    label,
    linkLabel,
    href,
  };

  if (isLoading)
    return (
      <Helper {...helperProps}>
        <div
          className="skeleton h-8"
          role="status"
          aria-label={`Loading ${label}`}
        />
      </Helper>
    );

  if (isError)
    return (
      <Helper {...helperProps}>
        <p className={`${valueClassName} text-xl! text-red-500`}>
          {errorMessage}
        </p>
      </Helper>
    );

  return (
    <Helper {...helperProps}>
      <p className={valueClassName}>{value}</p>
    </Helper>
  );
}

interface HelperProps {
  label: string;
  linkLabel: string;
  href: string;
  children: ReactNode;
}
function Helper({ label, linkLabel, href, children }: HelperProps) {
  return (
    <div className="card flex flex-col gap-6 p-4">
      <h3 className="text-xl">{label}</h3>

      {children}

      <div className="flex items-center justify-end gap-2">
        <a className={styles.link} href={href}>
          {linkLabel}
          <MoveRight size={20} />
        </a>
      </div>
    </div>
  );
}
