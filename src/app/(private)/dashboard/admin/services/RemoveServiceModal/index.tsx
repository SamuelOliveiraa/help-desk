import Button from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { AxiosError } from "axios";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputForm from "@/components/InputForm";
import { createService } from "@/lib/api/services";

export default function AddNewServiceModal({
  children,
  id
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-md w-full min-h-[350px] flex flex-col gap-5">
        <DialogHeader>
          <DialogTitle>Excluir Serviço - {}</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
