import {
	findSearchBox,
	getLabel,
} from "../../../../shared/tests/react-testing-library/locator";
import {
	SEARCH_ROLES_ARIA_LABEL,
	UPSERT_ROLE_FORM_DESCRIPTION_LABEL,
	UPSERT_ROLE_FORM_NAME_LABEL,
} from "../../constants/input";

export function getNameLabel(container?: HTMLElement) {
	return getLabel(UPSERT_ROLE_FORM_NAME_LABEL, container);
}
export function getDescriptionLabel(container?: HTMLElement) {
	return getLabel(UPSERT_ROLE_FORM_DESCRIPTION_LABEL, container);
}

export function findSearchBar() {
	return findSearchBox(SEARCH_ROLES_ARIA_LABEL);
}
