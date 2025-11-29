import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/requireAuth";
import prisma from "@/lib/prisma";

// Pega o ticket conforme o ID informado.
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
      where: { id }
    });

    if (!ticket) {
      return NextResponse.json(
        {
          message: "Nenhum chamado encontrado, por favor forneça um ID válido"
        },
        { status: 404 }
      );
    }

    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno de servidor, por favor tente novamente." },
      { status: 500 }
    );
  }
}
