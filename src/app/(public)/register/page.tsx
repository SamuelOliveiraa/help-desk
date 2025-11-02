"use client"

import { AxiosError } from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import Button from "@/components/Button"
import ContentContainer from "@/components/ContentContainer"
import InputForm from "@/components/InputForm"
import { createUser } from "@/lib/api/users"
import type { Role } from "@/types/user"

type FormValues = {
  name: string
  email: string
  password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function handleSubmitForm(data: FormValues) {
    setLoading(true)
    try {
      const newData = {
        ...data,
        redirectUser: true,
        workingHours: [],
        role: "user" as Role,
      }
      const { message, token, user } = await createUser(newData)
      if (token) {
        router.push(`/dashboard/${user.role}`)
      }
      toast.success(message)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else {
        toast.error("Erro interno de servidor, por favor contate a equipe de suporte")
      }
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-full bg-[url('/background.png')] bg-cover bg-center flex items-center justify-end md:overflow-hidden ">
      <div className="flex flex-1 max-w-2xl rounded-3xl bg-white h-full px-6 py-8 md:px-0 relative -bottom-10 md:items-center justify-center md:-bottom-4 md:-right-5 ">
        <div className="max-w-sm w-full flex flex-col gap-6 items-center">
          <Image alt="Logo do site HelpDesk" src={"/logo-help-desk.png"} width={130} height={130} />

          <ContentContainer>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSubmitForm)}>
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">Acesse o portal</h2>
                <p className="text-gray-300 text-sm">Entre usando seu e-mail e senha cadastrados</p>
              </div>

              <InputForm
                type="text"
                inputID="name"
                label="Nome"
                placeholder="Digite o nome completo"
                register={register("name", {
                  required: "O nome é obrigatorio",
                })}
                error={errors.name}
              />

              <InputForm
                inputID="email"
                label="E-mail"
                placeholder="Digite o e-mail completo"
                register={register("email", {
                  required: "O e-mail é obrigatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex padrão de e-mail
                    message: "Digite um e-mail válido",
                  },
                })}
                type="email"
                error={errors.email}
              />

              <InputForm
                inputID="password"
                label="Senha"
                placeholder="Digite sua senha"
                register={register("password", {
                  required: "A senha  é obrigatorio",
                  minLength: {
                    value: 8,
                    message: "A senha deve ter mais de 8 caracteres",
                  },
                })}
                type="password"
                error={errors.password}
                helperText="Minimo de 8 digitos"
              />

              <Button fullWidth type="submit" loading={loading} variant="secondary">
                <span className="font-bold">Cadastrar</span>
              </Button>
            </form>
          </ContentContainer>

          <ContentContainer>
            <div>
              <h2>Já tem uma conta?</h2>

              <p>Entre agora mesmo</p>
            </div>

            <Link href={"/login"}>
              <Button fullWidth>Acessar Conta</Button>
            </Link>
          </ContentContainer>
        </div>
      </div>
    </div>
  )
}
