import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/requireAuth";
import { prisma } from "@/lib/prisma";

// Pega o serviço conforme o ID informado.
export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		// Faz todas as verificações necessarias do token
		const authUser = await requireAuth(req);
		if (authUser instanceof NextResponse) return authUser;

		// Se passou em todas as verificacoes, pode buscar o serviço
		const { id } = await params;
		const serviceId = Number(id);

		// Se o ID não existir retorna
		if (isNaN(serviceId)) {
			return NextResponse.json({ message: "ID Inválido" }, { status: 400 });
		}

		// Somente o admin pode pesquisar um serviço,
		if (authUser.role !== "admin") {
			return NextResponse.json(
				{
					message:
						"Acesso negado! Você não tem permissão para pesquisar serviços.",
				},
				{ status: 403 },
			);
		}

		// Busca o servico no DB
		const service = await prisma.service.findUnique({
			where: { id: serviceId },
		});

		// Se o serviço não existir retorna
		if (!service) {
			return NextResponse.json(
				{ message: "Serviço não localizado" },
				{ status: 404 },
			);
		}

		return NextResponse.json(service);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Erro interno de servidor, por favor tente novamente." },
			{ status: 500 },
		);
	}
}

// Deleta o serviço conforme o ID informado.
export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		// Faz todas as verificações necessarias do token
		const authUser = await requireAuth(req);
		if (authUser instanceof NextResponse) return authUser;

		// Se passou em todas as verificacoes, pode deletar o serviço
		const { id } = await params;
		const serviceId = Number(id);

		// Se o ID não existir retorna
		if (isNaN(serviceId)) {
			return NextResponse.json({ message: "ID Inválido" }, { status: 400 });
		}
		
		const tickets = await prisma.ticket.findFirst({
			where: {serviceID: serviceId}
		})

		if(tickets){
			return NextResponse.json(
				{
					message:
						"Não é possivel excluir o serviço, existem chamados em aberto usando este serviço.",
				},
				{ status: 400 },
			);
		}


		// Somente o admin pode excluir um serviço,
		if (authUser.role !== "admin") {
			return NextResponse.json(
				{
					message:
						"Acesso negado! Você não tem permissão para excluir serviços.",
				},
				{ status: 403 },
			);
		}

		// Busca o servico no DB
		const service = await prisma.service.delete({
			where: { id: serviceId },
		});

		return NextResponse.json(
			{
				service,
				message: `Serviço "${service.title}" excluído com sucesso!`,
			},
			{ status: 201 },
		);
	} catch (error: unknown) {
		console.error(error);

		return NextResponse.json(
			{ message: "Erro interno de servidor, por favor tente novamente." },
			{ status: 500 },
		);
	}
}
