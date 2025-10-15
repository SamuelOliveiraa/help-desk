import Button from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { deleteToken } from "@/utils/cookies";
import { useRouter } from "next/navigation";

export default function ProfileDialog({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  function handleLogOut() {
    deleteToken();
    router.replace("/login");
  }
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-96">
        <DialogHeader>
          <DialogTitle>Você tem certeza que deseja sair?</DialogTitle>
        </DialogHeader>
        <div className="flex w-full gap-4">
          <DialogTrigger asChild>
            <Button fullWidth>Não</Button>
          </DialogTrigger>
          <Button fullWidth variant="delete" onClick={handleLogOut}>
            Sim
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
