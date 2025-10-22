import Button from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { getCurrentUser } from "@/lib/api/users";
import { User } from "@/types/user";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ChangePasswordDialog from "../ChangePasswordDialog";
import InputForm from "@/components/InputForm";

type FormValues = {
  name: string;
  email: string;
};

export default function ProfileDialog({
  children
}: {
  children: React.ReactNode;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmitForm(data: FormValues) {
    setLoading(true);
    try {
      /* const { message, token, user } = await loginUser(data);
      if (token) {
        router.push(`/dashboard/${user.role}`);
        toast.success(message);
      } */
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error(
          "Erro interno de servidor, por favor contate a equipe de suporte"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  // Pega os dados do usuario atual
  const [user, setUser] = useState<User>();
  useEffect(() => {
    getCurrentUser()
      .then(data => setUser(data))
      .catch(() => console.log("Deu erro"));
  }, []);

  // Quando o componente for desmontado, reseta o form
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
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
              required: "O nome é obrigatorio"
            })}
            error={errors.name}
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
                message: "Digite um e-mail válido"
              }
            })}
            error={errors.email}
          />

          <InputForm
            disabled
            type="password"
            inputID="password"
            label="Senha"
            placeholder="*********"
            helperText="A senha deve ter mais de 8 caracteres"
          >
            <ChangePasswordDialog>Alterar</ChangePasswordDialog>
          </InputForm>

          <Button
            fullWidth
            type="submit"
            onClick={handleSubmit(handleSubmitForm)}
          >
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
