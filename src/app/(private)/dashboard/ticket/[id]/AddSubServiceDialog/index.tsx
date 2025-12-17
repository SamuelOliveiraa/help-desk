import { AxiosError } from "axios";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createSubServiceOnTicket } from "@/lib/fetchers/tickets";

type FormValues = {
  title: string;
  value: string;
};

export default function AddSubServiceDialog({
  children,
  onConfirm,
  id,
  title,
  value,
}: {
  children: React.ReactNode;
  onConfirm: () => void;
  id?: string;
  title?: string;
  value?: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title,
      value,
    },
  });
  const [loading, setLoading] = useState(false);
  const [openModal, setModalOpen] = useState(false);

  async function handleSubmitForm(data: FormValues) {
    try {
      setLoading(true);

      const formattedValue = parseFloat(
        data.value.toString().replace(/\./g, "").replace(",", "."),
      );

      const payload = {
        ...data,
        value: formattedValue,
      };

      if (!id) return null;

      const response = await createSubServiceOnTicket(id, payload);

      if (response) {
        toast.success(response.message);
        if (!id) {
          reset();
        }
        onConfirm();
        setModalOpen(!openModal);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error(
          "Erro interno de servidor, por favor contate a equipe de suporte",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={openModal} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md w-full min-h-[300px] flex flex-col space-y-2">
        <DialogHeader>
          <DialogTitle className="w-full truncate">
            Serviço Adicional
          </DialogTitle>
        </DialogHeader>

        <form
          className="flex flex-col gap-4 justify-between"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <InputForm
            type="text"
            inputID="title"
            label="Título"
            placeholder="Nome do serviço adicional"
            register={register("title", {
              required: "O titulo do serviço adicional é obrigatorio",
            })}
            error={errors.title}
          />

          <InputForm
            type="text"
            inputID="value"
            label="Valor"
            placeholder="0,00"
            register={register("value", {
              required: "O valor do serviço adicional é obrigatório",
              pattern: {
                value: /^\d{1,3}(\.\d{3})*(,\d{2})?$/, // aceita formato brasileiro: 1.234,56
                message: "Digite um valor válido (ex: 10,50 ou 1.234,99)",
              },
              validate: value => {
                const numeric = parseFloat(
                  value.replace(/\./g, "").replace(",", "."),
                );

                if (numeric > 10000) {
                  return "O valor deve ser menor que R$ 10.000,00";
                }
              },
            })}
            error={errors.value}
          />

          <Button fullWidth type="submit" loading={loading}>
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
