"use server";

import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/requireAuth";
import { prisma } from "@/lib/prisma";
import type { Service } from "@/types/services";

// Lista todos os serviços do sistema
export async function GET(req: NextRequest) {
	try {
		// Faz todas as verificações necessarias do token
		const authUser = await requireAuth(req);
		if (authUser instanceof NextResponse) return authUser;

		// Se passou em todas as verificacoes, pode buscar os serviços
		const services = await prisma.service.findMany();

		return NextResponse.json(services);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Erro interno de servidor, tente novamente mais tarde." },
			{ status: 500 },
		);
	}
}

// Cria um serviço
export async function POST(req: NextRequest) {
	try {
		// Faz todas as verificações necessarias do token
		const authUser = await requireAuth(req);
		if (authUser instanceof NextResponse) return authUser;

		// Se passou em todas as verificacoes, pode buscar os servicos
		const {
			title,
			value,
			status,
		}: {
			title: string;
			value: number;
			status: boolean;
		} = await req.json();

		// Verificar se o serviço ja existe
		const existingService = await prisma.service.findFirst({
			where: {
				title: {
					equals: title.toLowerCase(),
				},
			},
		});

		if (existingService) {
			return NextResponse.json(
				{ message: "Servico já existe, por favor crie serviços únicos." },
				{ status: 400 },
			);
		}

		// Verificar se o limite de usuários para este tipo de role foi atingido.
		const currentServiceCount = await prisma.service.count();
		if (currentServiceCount >= 7) {
			return NextResponse.json(
				{
					message:
						"Você atingiu o limite de serviços para o seu plano. Por favor, contate o suporte ou o administrador para aumentar o limite.",
				},
				{ status: 403 },
			);
		}

		const newService = await prisma.service.create({
			data: {
				title,
				value,
				status,
			},
		});

		return NextResponse.json(
			{
				service: {
					id: newService.id,
					title: newService.title,
					value: newService.value,
					status: newService.status,
				},
				message: "Serviço criado com sucesso!",
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Erro interno de servidor, por favor tente novamente." },
			{ status: 500 },
		);
	}
}

// Atualiza algumas informação do servico
export async function PUT(req: NextRequest) {
	try {
		// Faz todas as verificações necessarias do token
		const userAuth = await requireAuth(req);
		if (userAuth instanceof NextResponse) return userAuth;

		const { id, title, value, status }: Service = await req.json();

		// Verificar se o serviço ja existe
		const existingService = await prisma.service.findFirst({
			where: { id },
		});

		if (!existingService) {
			return NextResponse.json(
				{ message: "Servico não existe, por favor tente novamente." },
				{ status: 400 },
			);
		}

		// Se passou em todas as validações pode atualizar o usuario
		await prisma.service.update({
			where: { id },
			data: {
				title: title ?? existingService.title,
				value: value ?? existingService.value,
				status: status !== undefined ? status : existingService.status,
			},
		});

		return NextResponse.json(
			{
				message: "Serviço atualizado com sucesso!",
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Erro ao atualizar serviço" },
			{ status: 500 },
		);
	}
}
