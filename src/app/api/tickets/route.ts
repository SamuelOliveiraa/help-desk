import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/requireAuth";
import prisma from "@/lib/prisma";
import type { Service, SubService } from "@/types/services";
import type { Status } from "@/types/tickets";
import { connect } from "http2";

// Lista todos os tickets do sistema
export async function GET(req: NextRequest) {
	try {
		// Faz todas as verificações necessarias do token
		const authUser = await requireAuth(req);
		if (authUser instanceof NextResponse) return authUser;

		// Se passou em todas as verificacoes, pode buscar os tickets
		const tickets = await prisma.ticket.findMany({
			include: {service: true, user: true}
		});

		return NextResponse.json(tickets);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Erro interno de servidor, tente novamente mais tarde." },
			{ status: 500 },
		);
	}
}

// Cria um novo ticket
export async function POST(req: NextRequest) {
	try {
		const {
			title,
			description,
			serviceID,
			userID,
			amount,
			service
		}: {
			title: string;
			description: string;
			serviceID: number;
			userID: number;
			amount: number;
			service: Service
		} = await req.json();

		const lastTicketOnDB = await prisma.ticket.findFirst({
			orderBy: { publicID: "desc" },
			select: { publicID: true },
		});

		const publicID = String(
			parseInt(lastTicketOnDB?.publicID || "0", 10) + 1,
		).padStart(6, "0");

		const newTicket = await prisma.ticket.create({
			data: {
				title,
				description,
				serviceID,
				status: 'open',
				publicID,
				userID,
				amount,
			},
		});

		return NextResponse.json(
			{
				ticket: {
					id: newTicket.id,
					title: newTicket.title,
					description: newTicket.description,
					status: newTicket.status,
					amount: newTicket.amount
				},
				message: "Chamado criado com sucesso!",
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

// Atualiza o status ou adiciona serviços ao ticket
export async function PATCH(req: NextRequest) {
	try {
		// Faz todas as verificações necessarias do token
		const userAuth = await requireAuth(req);
		if (userAuth instanceof NextResponse) return userAuth;

		const {
			id,
			status,
			subService,
		}: {
			id: number;
			status?: Status;
			subService?: SubService[];
		} = await req.json();

		// Verfica se o ID foi informado
		if (!id || typeof id !== "number") {
			return NextResponse.json(
				{
					message: "ID do chamado é inválido ou não foi informado.",
				},
				{ status: 400 },
			);
		}

		// Verificar se o ticket é valido
		const existingTicket = await prisma.ticket.findUnique({
			where: { id },
		});
		if (!existingTicket) {
			return NextResponse.json(
				{
					message: "Chamado informado não existe. Por favor, tente novamente.",
				},
				{ status: 400 },
			);
		}

		// Se nenhum dos dois campos veio, retornar erro
		const hasStatus = typeof status !== "undefined";
		const hasSubservice = Array.isArray(subService) && subService.length > 0;

		if (!hasSubservice && !hasStatus) {
			return NextResponse.json(
				{
					message:
						"É necessário informar ao menos o status ou o serviço adicional para atualização do chamado.",
				},
				{ status: 400 },
			);
		}

		const updateData: Parameters<typeof prisma.ticket.update>[0]["data"] = {};

		if (hasStatus) updateData.status = status;

		if (hasSubservice) {
			updateData.subService = {
				connect: subService.map((service) => ({ id: service.id })),
			};
		}

		// Se passou em todas as validações pode atualizar o ticket
		await prisma.ticket.update({
			where: { id },
			data: updateData,
		});

		return NextResponse.json(
			{
				message: "Chamado atualizado com sucesso!",
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Erro interno de servidor, por favor tente novamente." },
			{ status: 500 },
		);
	}
}
