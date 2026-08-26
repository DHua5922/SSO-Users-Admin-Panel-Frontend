import { useNavigate } from "react-router";
import { Button } from "../../shared/components";
import { HOME_PATH } from "../../shared/constants";

export default function NotFoundPage() {
	const navigate = useNavigate();
	return (
		<div className="h-screen center flex-col gap-8">
			<h1 className="text-4xl font-bold text-dark">404 - Page Not Found</h1>
			<Button onClick={() => navigate(HOME_PATH)}>Go back to dashboard</Button>
		</div>
	);
}
