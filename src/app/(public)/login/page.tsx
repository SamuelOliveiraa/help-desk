"use client";

import Button from "@/components/Button";
import ContentContainer from "@/app/(public)/components/ContentContainer";
import InputForm from "@/components/InputForm";
import { loginUser } from "@/lib/api/users";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Container from "../components/Container";

type FormValues = {
	email: string;
	password: string;
};

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	async function handleSubmitForm(data: FormValues) {
		setLoading(true);
		try {
			const { message, token, user } = await loginUser(data);
			if (token) {
				router.push(`/dashboard/${user.role}`);
				toast.success(message);
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message);
			} else {
				toast.error(
					"Erro interno de servidor, por favor contate a equipe de suporte",
				);
			}
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
						<h2 className="text-xl font-bold">Acesse o portal</h2>
						<p className="text-gray-300 text-sm">
							Entre usando seu e-mail e senha cadastrados
						</p>
					</div>

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
					/>

					<InputForm
						isPassword={true}
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
						error={errors.password}
						helperText="A senha deve ter mais de 8 caracteres"
					/>

					<Button
						fullWidth
						variant="secondary"
						type="submit"
						loading={loading}
					>
						<span className="font-bold">Entrar</span>
					</Button>
				</form>
			</ContentContainer>

			<ContentContainer>
				<div>
					<h2 className="text-lg font-bold">Ainda não tem uma conta?</h2>

					<p className="text-gray-300 text-sm">Cadastre agora mesmo</p>
				</div>

				<Link href={"/register"}>
					<Button fullWidth>Criar Conta</Button>
				</Link>
			</ContentContainer>
		</Container>
	);
}
