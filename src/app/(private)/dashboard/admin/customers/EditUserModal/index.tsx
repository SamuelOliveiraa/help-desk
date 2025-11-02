import { AxiosError } from "axios"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import Button from "@/components/Button"
import InputForm from "@/components/InputForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { updateUser } from "@/lib/api/users"

type FormValues = {
  name: string
  email: string
}

export default function EditUserModal({
  id,
  name,
  email,
  children,
  onConfirm,
}: {
  children: React.ReactNode
  onConfirm: () => void
  id: number
  name: string
  email: string
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name,
      email,
    },
  })

  async function handleSubmitForm(data: FormValues) {
    try {
      const editedUser = {
        ...data,
        id,
      }
      const response = await updateUser(editedUser)

      if (response) {
        toast.success(response.message)
        onConfirm()
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else {
        toast.error("Erro interno de servidor, por favor contate a equipe de suporte")
      }
    }
  }

  // Quando o componente for desmontado, reseta o form
  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md w-full min-h-[300px] flex flex-col gap-5">
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4 justify-between"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <InputForm
            type="text"
            inputID="name"
            label="Nome"
            placeholder="Nome"
            register={register("name", {
              required: "O nome do usuario é obrigatorio",
            })}
            error={errors.name}
          />

          <InputForm
            type="email"
            inputID="email"
            label="E-mail"
            placeholder="email@example.com"
            register={register("email", {
              required: "O email do usuario é obrigatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Digite um email válido",
              },
            })}
            error={errors.email}
          />

          <Button fullWidth type="submit">
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
