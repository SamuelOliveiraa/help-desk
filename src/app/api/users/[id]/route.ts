import { requireAuth } from "@/lib/auth/requireAuth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";

// Pega o usuario conforme o ID informado.
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Faz todas as verificações necessarias do token
    const authUser = await requireAuth(req);
    if (authUser instanceof NextResponse) return authUser;

    // Se passou em todas as verificacoes, pode buscar o usuario
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const userId = Number(id);

    // Se o ID não existir retorna
    if (isNaN(userId)) {
      return NextResponse.json({ message: "ID Inválido" }, { status: 400 });
    }

    // Somente o admin pode pesquisar um usuario, o user/tecnico so pode ver seu proprio usuario/conta
    if (authUser.role !== "admin" && authUser.id !== userId) {
      return NextResponse.json(
        {
          message: "Acesso negado"
        },
        { status: 403 }
      );
    }

    // Busca o usuario no DB
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    // Se o usuario não existir retorna
    if (!user) {
      return NextResponse.json(
        { message: "Usuario não encontrado" },
        { status: 404 }
      );
    }

    // Remove senha antes de retornar
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno de servidor, por favor tente novamente." },
      { status: 500 }
    );
  }
}
