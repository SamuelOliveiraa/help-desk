import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { deleteToken } from "@/utils/cookies";

export default function ProfileDialog({
	children,
}: {
	children: React.ReactNode;
}) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function handleLogOut() {
		setLoading(true);
		try {
			deleteToken();
			router.replace("/login");
			toast.success("Sessão encerrada com sucesso! Até a próxima 👋");
		} catch (error) {
			console.log(error);
			toast.error("Ops! Não conseguimos encerrar sua sessão. Tente novamente.");

			setLoading(false);
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-96">
				<DialogHeader>
					<DialogTitle>Você tem certeza que deseja sair?</DialogTitle>
				</DialogHeader>
				<div className="flex w-full gap-4">
					<DialogTrigger asChild>
						<Button fullWidth>Não</Button>
					</DialogTrigger>
					<Button
						fullWidth
						variant="delete"
						onClick={handleLogOut}
						loading={loading}
					>
						Sim
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
