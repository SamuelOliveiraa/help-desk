"use client";

import Button from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateTicketStatus } from "@/lib/fetchers/tickets";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FinishTicketDialog({
  publicID,
  children,
}: {
  publicID: string;
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleFinishTicket() {
    // Implement the logic to finish the ticket here
    setLoading(true);
    try {
      const response = await updateTicketStatus(publicID, "finished");
      if (response) {
        router.back();
        toast.success(response?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md w-full flex flex-col space-y-1">
        <DialogHeader>
          <DialogTitle className="text-xl w-full truncate text-wrap">
            Deseja realmente encerrar o chamado {publicID}?
          </DialogTitle>
        </DialogHeader>
        <p className="text-base">
          Tem certeza que deseja encerrar este chamado? Esta ação é
          irreversível. Após o encerramento, o chamado não poderá ser reaberto.
        </p>

        <div className="flex gap-2">
          <DialogTrigger asChild>
            <Button fullWidth variant="secondary">
              Não
            </Button>
          </DialogTrigger>

          <Button fullWidth loading={loading} onClick={handleFinishTicket}>
            Sim
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
