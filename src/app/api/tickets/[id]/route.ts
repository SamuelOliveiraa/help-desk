import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth/requireAuth";
import prisma from "@/lib/db/prisma";

// Pega o ticket conforme o ID informado.
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Faz todas as verificações necessarias do token
    const authUser = await requireAuth(req);
    if (authUser instanceof NextResponse) return authUser;

    // Se passou em todas as verificacoes, pode buscar o ticket
    const { id } = await params;

    // Se o ID não existir retorna
    if (!id) {
      return NextResponse.json({ message: "ID Inválido" }, { status: 400 });
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      return NextResponse.json(
        {
          message: "Nenhum chamado encontrado, por favor forneça um ID válido",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno de servidor, por favor tente novamente." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const data: { title: string; value: number } = await req.json();

    if (!id || !data)
      return NextResponse.json({ message: "Dados inválidos" }, { status: 400 });

    const ticketBeforeUpdate = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticketBeforeUpdate) {
      return NextResponse.json(
        {
          message: "Nenhum chamado encontrado, por favor forneça um ID válido",
        },
        { status: 404 },
      );
    }

    const isSubServiceExists = await prisma.ticketSubService.findFirst({
      where: {
        ticketId: id,
        subService: {
          title: data.title,
        },
      },
    });

    if (isSubServiceExists) {
      return NextResponse.json(
        {
          message: "Serviço já adicionado ao chamado",
        },
        { status: 400 },
      );
    }

    const sub = await prisma.subService.upsert({
      where: { title: data.title },
      update: {},
      create: {
        title: data.title,
        value: data.value,
      },
    });

    await prisma.ticketSubService.create({
      data: {
        ticketId: id,
        subServiceId: sub.id,
      },
    });

    const newAmount = data.value + ticketBeforeUpdate.amount;

    const ticket = await prisma.ticket.update({
      where: { id },
      data: {
        amount: newAmount,
      },
      include: { TicketSubService: { include: { subService: true } } },
    });

    if (!ticket) {
      return NextResponse.json(
        { message: "Erro ao adicionar serviço adicional ao chamado" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Serviço adicional adicionado com sucesso" },
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
