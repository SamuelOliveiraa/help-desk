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
          <div className="flex flex-col-reverse gap-2">
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}

            <input
              id="name"
              {...register("name", {
                required: "O nome é obrigatorio"
              })}
              className={`peer outline-none border-b border-gray-400/20 pb-2 focus:border-blue-400 ${
                errors.name && "border-red-500 focus:border-red-500"
              }`}
              type="text"
              defaultValue={user?.name}
            />

            <label
              htmlFor="name"
              className={`text-gray-300 peer-focus:text-blue-400 ${
                errors.name && " text-red-500 peer-focus:text-red-500"
              }`}
            >
              Nome
            </label>
          </div>

          <div className="flex flex-col-reverse gap-2">
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}

            <input
              id="email"
              {...register("email", {
                required: "O e-mail é obrigatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex padrão de e-mail
                  message: "Digite um e-mail válido"
                }
              })}
              className={`peer outline-none border-b border-gray-400/20 pb-2 focus:border-blue-400 ${
                errors.email && "border-red-500 focus:border-red-500"
              }`}
              type="email"
              defaultValue={user?.email}
            />

            <label
              htmlFor="email"
              className={`text-gray-300 peer-focus:text-blue-400 ${
                errors.email && " text-red-500 peer-focus:text-red-500"
              }`}
            >
              E-mail
            </label>
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-300">
              Senha
            </label>
            <div className="flex w-full border-b border-gray-400/20 pb-2 items-center">
              <input
                type="password"
                id="password"
                className="outline-none flex-1 disabled:bg-transparent"
                value={user?.name}
                disabled
              />
              <ChangePasswordDialog>Alterar</ChangePasswordDialog>
            </div>
          </div>

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
