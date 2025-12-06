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

export default function InProgressTicketDialog({
  publicID,
  children,
}: {
  publicID: string;
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleInProgressTicket() {
    // Implement the logic to finish the ticket here
    setLoading(true);
    try {
      const response = await updateTicketStatus(publicID, "inProgress");
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
            Deseja realmente iniciar o chamado {publicID}?
          </DialogTitle>
        </DialogHeader>
        <p className="text-base">
          Tem certeza que deseja iniciar este chamado? Após o início, o chamado
          não poderá ser transferido para outro técnico.
        </p>

        <div className="flex gap-2">
          <DialogTrigger asChild>
            <Button fullWidth variant="secondary">
              Não
            </Button>
          </DialogTrigger>

          <Button fullWidth loading={loading} onClick={handleInProgressTicket}>
            Sim
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
