import Button from "@/components/Button";
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

  const [passwordView, setPasswordView] = useState(true);
  const [newPasswordView, setNewPasswordView] = useState(true);

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

  function toggleNewPasswordView() {
    setNewPasswordView(!newPasswordView);
  }

  function togglePasswordView() {
    setPasswordView(!passwordView);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>

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
          <div className="flex flex-col-reverse gap-2">
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}

            <div className="flex relative ">
              <input
                id="actualPassword"
                {...register("password", {
                  required: "A senha é obrigatorio",
                  minLength: {
                    value: 8,
                    message: "A senha atual tem 8 ou mais caracteres"
                  }
                })}
                className={`peer outline-none border-b border-gray-400/20 pb-2 focus:border-blue-400 flex-1 pr-7 ${
                  errors.password && "border-red-500 focus:border-red-500"
                }`}
                type={passwordView ? "password" : "text"}
                placeholder="Digite sua senha atual"
              />
              {passwordView ? (
                <EyeClosed
                  className="absolute right-0"
                  onClick={togglePasswordView}
                />
              ) : (
                <Eye
                  className="absolute right-0"
                  onClick={togglePasswordView}
                />
              )}
            </div>

            <label
              htmlFor="actualPassword"
              className={`text-gray-300 peer-focus:text-blue-400 ${
                errors.password && " text-red-500 peer-focus:text-red-500"
              }`}
            >
              Senha atual
            </label>
          </div>

          <div className="flex flex-col-reverse gap-2">
            {errors.newPassword && (
              <span className="text-sm text-red-500">
                {errors.newPassword.message}
              </span>
            )}
            {!errors.newPassword && (
              <span className="text-sm text-gray-400 italic">
                Minimo de 8 digitos
              </span>
            )}

            <div className="flex relative">
              <input
                id="newPassword"
                {...register("newPassword", {
                  required: "A nova senha é obrigatorio",
                  minLength: {
                    value: 8,
                    message: "A nova senha deve ter mais de 8 caracteres"
                  }
                })}
                className={`peer outline-none border-b border-gray-400/20 pb-2 focus:border-blue-400 flex-1 pr-7 ${
                  errors.newPassword && "border-red-500 focus:border-red-500"
                }`}
                type={newPasswordView ? "password" : "text"}
                placeholder="Digite sua nova senha"
              />
              {newPasswordView ? (
                <EyeClosed
                  className="absolute right-0"
                  onClick={toggleNewPasswordView}
                />
              ) : (
                <Eye
                  className="absolute right-0"
                  onClick={toggleNewPasswordView}
                />
              )}
            </div>

            <label
              htmlFor="newPassword"
              className={`text-gray-300 peer-focus:text-blue-400 ${
                errors.newPassword && " text-red-500 peer-focus:text-red-500"
              }`}
            >
              Nova senha
            </label>
          </div>

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
