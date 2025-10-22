import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { AxiosError } from "axios";
import { ArrowLeft, Eye, EyeClosed, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormValues = {
  password: string;
  newPassword: string;
};

export default function ChangePasswordDialog({
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

  // Quando o componente for desmontado, reseta o form
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="absolute right-0 bottom-10">
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md w-full min-h-[400px]" forceMount>
        <header className="flex items-center gap-2">
          <AlertDialogTrigger>
            <ArrowLeft className="text-gray-400 size-6" />
          </AlertDialogTrigger>

          <h2 className="font-bold text-xl flex-1">Alterar senha</h2>

          <AlertDialogTrigger>
            <X className="text-gray-400 size-4" />
          </AlertDialogTrigger>
        </header>
        <form className="flex flex-col gap-3 justify-between">
          <InputForm
            isPassword={true}
            inputID="actualPassword"
            label="Senha atual"
            placeholder="Digite sua senha atual"
            register={register("password", {
              required: "A senha é obrigatória",
              minLength: {
                value: 8,
                message: "A senha atual deve ter 8 ou mais caracteres"
              }
            })}
            error={errors.password}
          />

          <InputForm
            isPassword={true}
            inputID="newPassword"
            label="Nova senha"
            placeholder="Digite sua nova senha"
            register={register("newPassword", {
              required: "A senha é obrigatória",
              minLength: {
                value: 8,
                message: "A senha deve ter 8 ou mais caracteres"
              }
            })}
            error={errors.newPassword}
            helperText="Minimo de 8 digitos"
          />

          <Button
            fullWidth
            type="submit"
            onClick={handleSubmit(handleSubmitForm)}
          >
            Salvar
          </Button>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
