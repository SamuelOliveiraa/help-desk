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
import { deleteService } from "@/lib/api/services";
import axios from "axios";

export default function RemoveServiceModal({
  children,
  id,
  title,
  onConfirm,
}: {
  children: React.ReactNode;
  id: string;
  title: string;
  onConfirm: () => void;
}) {
  const [openModal, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDeleteService() {
    try {
      setLoading(true);
      const response = await deleteService(id);
      if (response?.message) {
        onConfirm();
        toast.success(response?.message);
        setModalOpen(!openModal);
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={openModal} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md w-full flex flex-col gap-5">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Excluir Serviço {`"${title}"`}?
          </DialogTitle>
        </DialogHeader>
        <p className="text-base">
          Tem certeza que deseja excluir este serviço? Esta ação é irreversível.
          Após a exclusão, o serviço será excluido permanentemente.
        </p>

        <div className="flex gap-2">
          <DialogTrigger asChild>
            <Button fullWidth variant="secondary">
              Não
            </Button>
          </DialogTrigger>

          <Button fullWidth loading={loading} onClick={handleDeleteService}>
            Sim
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
