"use client";

import Button from "@/components/Button";
import ContentContainer from "@/app/(public)/components/ContentContainer";
import InputForm from "@/components/InputForm";
import { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Container from "../components/Container";
import { resetPasswordToken } from "@/lib/fetchers/reset_password";

type FormValues = {
  email: string;
};

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  async function handleSubmitForm(data: FormValues) {
    setLoading(true);
    try {
      const { message, tokenID } = await resetPasswordToken(data);
      if (message && tokenID) {
        toast.success(message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        console.log("error: ", error);
        toast.error(
          "Erro interno de servidor, por favor contate a equipe de suporte (front)",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <ContentContainer>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Esqueceu sua senha?</h2>
            <p className="text-gray-300 text-sm">
              Informe o e-mail associado à sua conta para enviarmos o link de
              recuperação.
            </p>
          </div>

          <InputForm
            type="email"
            inputID="email"
            label="E-mail"
            placeholder="exemplo@mail.com"
            register={register("email", {
              required: "O e-mail é obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex padrão de e-mail
                message: "Digite um e-mail válido",
              },
            })}
            error={errors.email}
          />

          <Button fullWidth variant="secondary" type="submit" loading={loading}>
            <span className="font-bold">Enviar código</span>
          </Button>
        </form>
      </ContentContainer>

      <ContentContainer>
        <div>
          <h2 className="text-lg font-bold">Ainda não possui uma conta?</h2>

          <p className="text-gray-300 text-sm">Crie a sua agora mesmo.</p>
        </div>

        <Link href={"/register"}>
          <Button fullWidth>Criar Conta</Button>
        </Link>
      </ContentContainer>
    </Container>
  );
}
