import { Role } from "@/generated/prisma";
import { requireAuth } from "@/lib/auth/requireAuth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Lista todos os usuarios por role
export async function GET(
  req: NextRequest,
  { params }: { params: { role: string } }
) {
  try {
    // Faz todas as verificações necessarias do token
    const authUser = await requireAuth(req);
    if (authUser instanceof NextResponse) return authUser;

    // Se passou em todas as verificacoes, pode buscar o usuario
    const role = params.role as Role;

    // Verificar se role existe
    if (!role) {
      return NextResponse.json(
        { message: "Role é obrigatória" },
        { status: 400 }
      );
    }

    // Somente o admin pode pesquisar um usuario, o user/tecnico so pode ver seu proprio usuario/conta
    if (authUser.role !== "admin") {
      return NextResponse.json(
        {
          message: "Acesso negado"
        },
        { status: 403 }
      );
    }

    // Converto a string role para o Enum do banco e valido se esta certo
    if (!Object.values(Role).includes(role as Role)) {
      return NextResponse.json({ message: "Role Invalida" }, { status: 400 });
    }

    const users = await prisma.user.findMany({
      where: { role: role as Role },
      select: {
        id: true,
        avatar: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        workingHours: true
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
