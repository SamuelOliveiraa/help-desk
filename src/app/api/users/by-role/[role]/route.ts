import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/requireAuth";
import { prisma } from "@/lib/prisma";
import { Role } from "@/generated/prisma";

// Lista todos os usuarios por role
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ role: string }> },
) {
  try {
    // Faz todas as verificações necessarias do token
    const authUser = await requireAuth(req, "admin");
    if (authUser instanceof NextResponse) return authUser;

    // Se passou em todas as verificacoes, pode buscar o usuario
    const { role } = await params;

    // Verificar se role existe
    if (!role) {
      return NextResponse.json(
        { message: "Campo role é obrigatório! Por favor, informe a role." },
        { status: 400 },
      );
    }

    // Converto a string role para o Enum do banco e valido se esta certo
    if (!Object.values(Role).includes(role as Role)) {
      return NextResponse.json(
        {
          message:
            "A role informada é inválida. Por favor, informe uma role válida.",
        },
        { status: 400 },
      );
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
        workingHours: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno de servidor, por favor tente novamente." },
      { status: 500 },
    );
  }
}
