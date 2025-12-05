"use server";

import prisma from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

// Retorna o token conforme o tokenID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Se o id não existir retorna
    if (!id) {
      return NextResponse.json({ message: "ID Inválido" }, { status: 400 });
    }

    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { id },
    });

    if (
      !passwordResetToken ||
      passwordResetToken.usedAt ||
      new Date() > new Date(passwordResetToken.expiresAt)
    ) {
      return NextResponse.json(
        { message: "Token expirado ou inválido" },
        { status: 400 },
      );
    }

    return NextResponse.json({ passwordResetToken });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message:
          "Erro interno de servidor, por favor tente novamente. (backend)",
      },
      { status: 500 },
    );
  }
}
