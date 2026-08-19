import { useNavigate } from "react-router";
import Button from "../../shared/components/Button/Button";

export default function NotFoundPage() {
	const navigate = useNavigate();
	return (
		<div className="h-screen center flex-col gap-8">
			<h1 className="text-4xl font-bold text-dark">404 - Page Not Found</h1>
			<Button onClick={() => navigate(-1)}>Back</Button>
		</div>
	);
}
