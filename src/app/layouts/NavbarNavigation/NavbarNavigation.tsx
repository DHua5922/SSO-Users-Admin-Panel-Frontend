import { Menu as MenuComponent } from "@dhua5922/react-kit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import type { HTMLAttributes } from "react";
import { useNavigate } from "react-router";
import { logOutApi } from "../../../features/auth/api/auth";
import {
	CURRENT_USER_TOGGLE_ARIA_LABEL,
	LOGIN_PATH,
	LOGOUT_BUTTON_TEXT,
	ME_QUERY_KEY,
} from "../../../features/auth/constants";
import { ROLES_PATH } from "../../../features/roles/constants/general";
import { USERS_PATH } from "../../../features/users/constants/general";
import { HOME_PATH } from "../../../shared/constants";
import usePageErrorHandler from "../../../shared/hooks/usePageErrorHandler";
import styles from "./NavbarNavigation.module.css";

interface Props extends HTMLAttributes<HTMLUListElement> {
	username: string;
}

function useLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: logOutApi,
		onSuccess: async () => {
			queryClient.removeQueries({ queryKey: [ME_QUERY_KEY] });
			navigate(LOGIN_PATH);
		},
		onError: usePageErrorHandler(),
		retry: false,
	});

	return () => mutate();
}

export default function NavbarNavigation({ username, ...props }: Props) {
	const onLogOut = useLogout();

	return (
		<ul {...props}>
			<li>
				<a href={HOME_PATH}>Home</a>
			</li>

			<li>
				<a href={USERS_PATH}>Users</a>
			</li>

			<li>
				<a href={ROLES_PATH}>Roles</a>
			</li>

			<li>
				<MenuComponent>
					<MenuComponent.Toggle
						className="flex items-center gap-2 cursor-pointer"
						aria-label={CURRENT_USER_TOGGLE_ARIA_LABEL}
					>
						{username}
						<ChevronDown aria-hidden="true" />
					</MenuComponent.Toggle>

					<MenuComponent.Content className={styles["menu-content"]}>
						<MenuComponent.Item
							className={styles["menu-item"]}
							onClick={onLogOut}
						>
							{LOGOUT_BUTTON_TEXT}
						</MenuComponent.Item>
					</MenuComponent.Content>
				</MenuComponent>
			</li>
		</ul>
	);
}
