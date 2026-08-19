import { MAIN_CONTENT_ID, SKIP_TO_MAIN_CONTENT_TEXT } from "../constants";

export default function SkipLink() {
	const focusMainContent = () => {
		document.getElementById(MAIN_CONTENT_ID)?.focus();
	};

	return (
		<a
			href={`#${MAIN_CONTENT_ID}`}
			className="fixed top-4 left-4 z-50 -translate-y-20 rounded bg-[var(--surface-color)] px-4 py-2 font-bold transition-transform focus:translate-y-0"
			onClick={focusMainContent}
		>
			{SKIP_TO_MAIN_CONTENT_TEXT}
		</a>
	);
}
