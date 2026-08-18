import {
	findText,
	queryText,
} from "../../../../shared/tests/react-testing-library/locator";
import {
	INVALID_EMAIL_ERROR_MESSAGE,
	NO_MATCHING_PASSWORDS_ERROR_MESSAGE,
	REQUIRED_ROLE_ERROR_MESSAGE,
	REQUIRED_USERNAME_ERROR_MESSAGE,
} from "../../constants/message";

export function findUsernameErrorMessage() {
	return findText(REQUIRED_USERNAME_ERROR_MESSAGE);
}

export function findRoleErrorMessage() {
	return findText(REQUIRED_ROLE_ERROR_MESSAGE);
}

export function findEmailErrorMessage() {
	return findText(INVALID_EMAIL_ERROR_MESSAGE);
}

export function queryNoMatchingPasswordsErrorMessage() {
	return queryText(NO_MATCHING_PASSWORDS_ERROR_MESSAGE);
}
