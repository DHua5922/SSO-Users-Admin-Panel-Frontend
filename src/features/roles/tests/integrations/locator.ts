import {
	findButton,
	getButton,
} from "../../../../shared/tests/react-testing-library/locator";
import {
	ADD_ROLE_BUTTON_TEXT,
	CONFIRM_DELETE_ROLE_BUTTON_TEXT,
	DELETE_ROLE_BUTTON_ARIA_LABEL_PREFIX,
	EDIT_ROLE_BUTTON_ARIA_LABEL_PREFIX,
} from "../../constants/button";

export function getAddRoleButton(container?: HTMLElement) {
	return getButton(ADD_ROLE_BUTTON_TEXT, container);
}

export function findShowEditRoleModalButton(
	roleName: string,
	container?: HTMLElement,
) {
	return findButton(
		`${EDIT_ROLE_BUTTON_ARIA_LABEL_PREFIX} ${roleName}`,
		container,
	);
}
export function findShowDeleteRoleModalButton(
	roleName: string,
	container?: HTMLElement,
) {
	return findButton(
		`${DELETE_ROLE_BUTTON_ARIA_LABEL_PREFIX} ${roleName}`,
		container,
	);
}

export function getConfirmDeleteRoleButton(container?: HTMLElement) {
	return getButton(CONFIRM_DELETE_ROLE_BUTTON_TEXT, container);
}
