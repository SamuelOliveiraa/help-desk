import { Role } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");

    // Verificar se role existe
    if (!role) {
      return NextResponse.json(
        { message: "Role é obrigadoria" },
        { status: 400 }
      );
    }

    // Converto a string role para o Enum do banco e valido se esta certo
    if (!Object.values(Role).includes(role as Role)) {
      return NextResponse.json({ message: "Role Invalida" }, { status: 400 });
    }

    const users = await prisma.user.findMany({
      where: { role: role as Role }
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
