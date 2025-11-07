"use client";

import Button from "@/components/Button";
import ContentContainer from "@/components/ContentContainer";
import InputForm from "@/components/InputForm";
import { loginUser } from "@/lib/api/users";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
		<div className="w-full h-full bg-[url('/background.png')] bg-cover bg-center flex items-center justify-end overflow-hidden ">
			<div className="flex flex-1 max-w-2xl rounded-3xl bg-white h-full px-6 py-8 md:px-0 relative -bottom-10 md:items-center justify-center md:-bottom-4 md:-right-5 ">
				<div className="max-w-sm w-full flex flex-col gap-6 items-center">
					<Image
						alt="Logo do site HelpDesk"
						src={"/logo-help-desk.png"}
						width={170}
						height={170}
					/>

					<ContentContainer>
						<form
							className="flex flex-col gap-4"
							onSubmit={handleSubmit(handleSubmitForm)}
						>
							<div className="flex flex-col gap-2">
								<h2>Acesse o portal</h2>
								<p>Entre usando seu e-mail e senha cadastrados</p>
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
							<h2>Ainda não tem uma conta?</h2>

							<p>Cadastre agora mesmo</p>
						</div>

						<Link href={"/register"}>
							<Button fullWidth>Criar Conta</Button>
						</Link>
					</ContentContainer>
				</div>
			</div>
		</div>
	);
}
