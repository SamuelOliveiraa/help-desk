import Button from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { deleteUser } from "@/lib/api/users";

import { useState } from "react";
import toast from "react-hot-toast";

export default function RemoveUserModal({
  children,
  id,
  name,
  onConfirm
}: {
  children: React.ReactNode;
  id: number;
  name: string;
  onConfirm: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDeleteUser() {
    setLoading(true);
    try {
      const response = await deleteUser(id);
      if (response?.message) {
        toast.success(response?.message);
        onConfirm();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-md w-full flex flex-col gap-5">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Excluir Usuario {`"${name}"`}?
          </DialogTitle>
        </DialogHeader>
        <p className="text-base">
          Tem certeza que deseja excluir este usuario? Esta ação é irreversível.
          Após a exclusão, o usuario sera excluido permanentemente.
        </p>

        <div className="flex gap-2">
          <DialogTrigger asChild>
            <Button fullWidth variant="secondary">
              Não
            </Button>
          </DialogTrigger>

          <DialogTrigger asChild>
            <Button
              fullWidth
              loading={loading}
              variant="delete"
              onClick={handleDeleteUser}
            >
              Sim
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}
