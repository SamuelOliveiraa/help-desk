"use client";

import Button from "@/components/Button";
import ContentContainer from "@/app/(public)/components/ContentContainer";
import InputForm from "@/components/InputForm";
import { Axios, AxiosError } from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { resetPasswordGetToken } from "@/lib/fetchers/reset_password";
import Container from "../../components/Container";

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordTokenPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [isValidingToken, setIsValidingToken] = useState(true);
  const { tokenID }: { tokenID: string } = useParams();
  const router = useRouter();

  const fetchTokenValidate = useCallback(async () => {
    setIsValidingToken(true);
    try {
      const passwordToken = await resetPasswordGetToken(tokenID);

      return !!passwordToken;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error(
          "Erro interno de servidor, por favor contate a equipe de suporte (front)",
        );
      }
      router.push("/login");
      return false;
    } finally {
      setIsValidingToken(false);
    }
  }, [router, tokenID]);

  async function handleSubmitForm(data: FormValues) {
    setLoading(true);
    try {
      const isValid = await fetchTokenValidate();
      if (isValid) {
        // const { message, tokenID } = await resetPasswordToken(data);
        // if (message && tokenID) {
        //   router.push(`/reset-password/${tokenID}`);
        //   toast.success(message);
        // }
        console.log(data);
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

  useEffect(() => {
    fetchTokenValidate();
  }, [fetchTokenValidate]);

  return (
    <Container>
      <ContentContainer>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Resetar a senha</h2>
            <p className="text-gray-300 text-sm">Informe sua nova senha</p>
          </div>

          <InputForm
            isPassword={true}
            inputID="password"
            label="Nova Senha"
            placeholder="Digite sua nova senha"
            register={register("password", {
              required: "A senha  é obrigatorio",
              minLength: {
                value: 8,
                message: "A senha deve ter mais de 8 caracteres",
              },
            })}
            error={errors.password}
            helperText="A senha deve ter mais de 8 caracteres"
          />

          <InputForm
            isPassword={true}
            inputID="confirmPassword"
            label="Confirmar nova senha"
            placeholder="Digite sua nova senha"
            register={register("confirmPassword", {
              required: "A confirmação da senha  é obrigatorio",
              validate: value => {
                if (value !== watch("password")) {
                  return "As senhas não conincidem.";
                }
              },
              minLength: {
                value: 8,
                message: "A senha deve ter mais de 8 caracteres",
              },
            })}
            error={errors.confirmPassword}
            helperText="A senha deve ter mais de 8 caracteres"
          />

          <Button
            fullWidth
            variant="secondary"
            type="submit"
            loading={loading}
            disabled={isValidingToken}
          >
            <span className="font-bold">Mudar senha</span>
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
