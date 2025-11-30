import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { getCurrentUser, updateUser } from "@/lib/api/users";
import type { User } from "@/types/user";
import ChangePasswordDialog from "../ChangePasswordDialog";

type FormValues = {
  name: string;
  email: string;
};

export default function ProfileDialog({
  children,
  onConfirm,
}: {
  children: React.ReactNode;
  onConfirm: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [openModal, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();

  async function handleSubmitForm(data: FormValues) {
    setLoading(true);
    try {
      const dataToSend = {
        id: user?.id,
        name: data.name,
        email: data.email,
        avatar: user?.avatar || "",
      };
      const id = user?.id;
      if (!id) return;

      const response = await updateUser(dataToSend);
      if (!response) return toast.error("Erro ao atualizar perfil");

      toast.success("Perfil atualizado com sucesso");
      onConfirm();
      setModalOpen(!openModal);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error(
          "Não foi possível atualizar o perfil, por favor contate a equipe de suporte",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  // Pega os dados do usuario atual
  useEffect(() => {
    getCurrentUser()
      .then(data => setUser(data))
      .catch(() => console.log("Deu erro"));

    return () => {
      reset();
    };
  }, [reset]);

  return (
    <Dialog open={openModal} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md w-full min-h-[400px]">
        <DialogHeader>
          <DialogTitle>Perfil</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-3 justify-between">
          <InputForm
            type="text"
            inputID="name"
            label="Nome"
            placeholder="Digite seu nome"
            register={register("name", {
              required: "O nome é obrigatorio",
            })}
            error={errors.name}
            defaultValue={user?.name}
          />

          <InputForm
            type="email"
            inputID="email"
            label="E-mail"
            placeholder="exemplo@mail.com"
            register={register("email", {
              required: "O e-mail é obrigatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex padrão de e-mail
                message: "Digite um e-mail válido",
              },
            })}
            error={errors.email}
            defaultValue={user?.email}
          />

          <InputForm
            disabled
            type="password"
            inputID="password"
            label="Senha"
            placeholder="*********"
            defaultValue={user?.name}
            helperText="A senha deve ter mais de 8 caracteres"
          >
            <ChangePasswordDialog id={user?.id}>Alterar</ChangePasswordDialog>
          </InputForm>

          <Button
            fullWidth
            type="submit"
            loading={loading}
            onClick={handleSubmit(handleSubmitForm)}
          >
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
