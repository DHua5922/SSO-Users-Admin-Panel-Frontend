import { Menu as MenuComponent } from "@dhua5922/react-kit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import type { HTMLAttributes } from "react";
import { useNavigate } from "react-router";
import { logOutApi } from "../../api/auth";
import {
	LOGOUT_BUTTON_TEXT,
	ME_QUERY_KEY,
	paths,
	USER_MENU_TOGGLE_ARIA_LABEL,
} from "../../constants";
import usePageErrorHandler from "../../hooks/usePageErrorHandler";

interface Props extends HTMLAttributes<HTMLUListElement> {
	username: string;
}

function useLinks() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: logOutApi,
		onSuccess: async () => {
			queryClient.removeQueries({ queryKey: [ME_QUERY_KEY] });
			navigate(paths.login);
		},
		onError: usePageErrorHandler(),
		retry: false,
	});

	return () => mutate();
}

export default function NavbarLinks({ username, ...props }: Props) {
	const onLogOut = useLinks();

	return (
    <ul {...props}>
      <li>
        <a href={paths.home}>Home</a>
      </li>

      <li>
        <a href={paths.users}>Users</a>
      </li>

      <li>
        <MenuComponent>
          <MenuComponent.Toggle
            className="flex items-center gap-2 cursor-pointer"
            aria-label={USER_MENU_TOGGLE_ARIA_LABEL}
          >
            {username}
            <ChevronDown />
          </MenuComponent.Toggle>

          <MenuComponent.Content>
            <MenuComponent.Item onClick={onLogOut}>
              {LOGOUT_BUTTON_TEXT}
            </MenuComponent.Item>
          </MenuComponent.Content>
        </MenuComponent>
      </li>
    </ul>
  );
}
