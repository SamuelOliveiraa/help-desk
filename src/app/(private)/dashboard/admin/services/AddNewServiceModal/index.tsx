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
import { createService, updateService } from "@/lib/api/services";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type FormValues = {
  title: string;
  value: number;
  status: string;
};

export default function AddNewServiceModal({
  children,
  onConfirm,
  id,
  title,
  value,
  status
}: {
  children: React.ReactNode;
  onConfirm: () => void;
  id?: number;
  title?: string;
  value?: number;
  status?: "true" | "false";
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      title,
      value,
      status
    }
  });

  async function handleSubmitForm(data: FormValues) {
    try {
      const formattedValue = parseFloat(
        data.value.toString().replace(/\./g, "").replace(",", ".")
      );
      const formattedStatus = data.status === "true" ? true : false;

      const payload = {
        ...data,
        value: formattedValue,
        status: formattedStatus
      };

      const dataBackend = id
        ? await updateService({ id, ...payload })
        : await createService(payload);

      if (dataBackend) {
        toast.success(dataBackend.message);
        reset();
        onConfirm();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error(
          "Erro interno de servidor, por favor contate a equipe de suporte"
        );
      }
    }
  }

  // Quando o componente for desmontado, reseta o form
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md w-full min-h-[350px] flex flex-col gap-5">
        <DialogHeader>
          <DialogTitle>
            {id ? `Editar Serviço "${title}"` : "Cadastro de Serviço"}
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
            placeholder="Nome do serviço"
            register={register("title", {
              required: "O titulo do serviço é obrigatorio"
            })}
            error={errors.title}
          />

          <InputForm
            type="text"
            inputID="value"
            label="Valor"
            placeholder="0,00"
            register={register("value", {
              required: "O valor do serviço é obrigatório",
              pattern: {
                value: /^\d{1,3}(\.\d{3})*(,\d{2})?$/, // aceita formato brasileiro: 1.234,56
                message: "Digite um valor válido (ex: 10,50 ou 1.234,99)"
              }
            })}
            error={errors.value}
          />

          <Controller
            name="status"
            control={control}
            rules={{ required: "O status é obrigatório" }}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value || status}
              >
                <SelectTrigger className="w-full" asChild>
                  <SelectValue placeholder="Selecione um Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="true">Ativo</SelectItem>
                    <SelectItem value="false">Inativo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}

          <Button fullWidth type="submit">
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
