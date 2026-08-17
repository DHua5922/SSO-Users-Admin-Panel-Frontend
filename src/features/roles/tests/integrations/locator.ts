import {
	findButton,
	getButton,
} from "../../../../shared/tests/react-testing-library/locator";
import {
	ADD_ROLE_BUTTON_TEXT,
	CONFIRM_DELETE_ROLE_BUTTON_TEXT,
} from "../../constants/button";

export function getAddRoleButton(container?: HTMLElement) {
	return getButton(ADD_ROLE_BUTTON_TEXT, container);
}

export function findShowEditRoleModalButton(
	roleName: string,
	container?: HTMLElement,
) {
	return findButton(`Edit role ${roleName}`, container);
}
export function findShowDeleteRoleModalButton(
	roleName: string,
	container?: HTMLElement,
) {
	return findButton(`Delete role ${roleName}`, container);
}

export function getConfirmDeleteRoleButton(container?: HTMLElement) {
	return getButton(CONFIRM_DELETE_ROLE_BUTTON_TEXT, container);
}
