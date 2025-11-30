import { requireAuth } from "@/lib/auth/requireAuth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Deleta o serviço adicional conforme o ID informado.
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
    const body = await req.json();
    const { ticketID } = body;

    // Se nenhum dos IDs existir retorna
    if (!ticketID || !id) {
      return NextResponse.json({ message: "ID Inválido" }, { status: 400 });
    }

    const ticketWithoutSubService = await prisma.ticket.update({
      where: { id: ticketID },
      data: {
        subService: {
          disconnect: { id: id },
        },
      },
    });

    if (!ticketWithoutSubService) {
      return NextResponse.json(
        {
          message:
            "Não é possivel excluir o serviço adicional, por favor tente novamente.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: `Serviço adicional excluído com sucesso!`,
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
