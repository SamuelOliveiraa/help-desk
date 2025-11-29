import { AxiosError } from "axios";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { updatePasswordUser } from "@/lib/api/users";

type FormValues = {
  password: string;
  newPassword: string;
};

export default function ChangePasswordDialog({
  children,
  id
}: {
  children: React.ReactNode;
  id?: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>();
  const [openModal, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmitForm(data: FormValues) {
    setLoading(true);
    try {
      if (!id) return;
      const response = await updatePasswordUser(
        id,
        data.password,
        data.newPassword
      );

      if (response?.message) {
        toast.success(response.message);
        setModalOpen(!openModal);
      }
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
    <AlertDialog open={openModal} onOpenChange={setModalOpen}>
      <AlertDialogTrigger className="absolute right-0 bottom-10">
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md w-full min-h-[400px]" forceMount>
        <header className="flex items-center gap-2">
          <AlertDialogTrigger asChild>
            <ArrowLeft className="text-gray-400 size-6 cursor-pointer" />
          </AlertDialogTrigger>

          <AlertDialogTitle className="font-bold text-xl flex-1">
            Alterar senha
          </AlertDialogTitle>

          <AlertDialogTrigger asChild>
            <X className="text-gray-400 size-4 cursor-pointer" />
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
            loading={loading}
            onClick={handleSubmit(handleSubmitForm)}
          >
            Salvar
          </Button>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
