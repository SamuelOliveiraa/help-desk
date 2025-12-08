import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth/requireAuth";
import prisma from "@/lib/db/prisma";
import { Status } from "@/types/tickets";

// Pega o ticket conforme o publicID informado.
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ publicID: string }> },
) {
  try {
    // Faz todas as verificações necessarias do token
    const authUser = await requireAuth(req);
    if (authUser instanceof NextResponse) return authUser;

    // Se passou em todas as verificacoes, pode buscar o ticket
    const { publicID } = await params;

    // Se o ID não existir retorna
    if (!publicID) {
      return NextResponse.json({ message: "ID Inválido" }, { status: 400 });
    }

    const ticket = await prisma.ticket.findUnique({
      where: { publicID },
      include: {
        user: true,
        technician: true,
        service: true,
        TicketSubService: { include: { subService: true } },
      },
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
  { params }: { params: Promise<{ publicID: string }> },
) {
  try {
    // Faz todas as verificações necessarias do token
    const authUser = await requireAuth(req);
    if (authUser instanceof NextResponse) return authUser;

    // Se passou em todas as verificacoes, pode buscar o ticket
    const { publicID } = await params;
    const { status }: { status: Status } = await req.json();

    // Se o ID não existir retorna
    if (!publicID) {
      return NextResponse.json({ message: "ID Inválido" }, { status: 400 });
    }

    if (!status) {
      return NextResponse.json(
        { message: "Status não informado" },
        { status: 400 },
      );
    }

    // Se o usuario não for técnico/admin retorna
    if (authUser.role === "user") {
      return NextResponse.json(
        { message: "Usuario não autorizado" },
        { status: 403 },
      );
    }

    const ticket = await prisma.ticket.update({
      where: { publicID },
      data: {
        status,
      },
    });

    if (!ticket) {
      return NextResponse.json(
        {
          message: "Erro ao alterar status do chamado",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: `Chamado ${status === "finished" ? "encerrado" : "iniciado"} com sucesso`,
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
