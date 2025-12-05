import prisma from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Atualiza a senha do usuario
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "ID Inválido" }, { status: 400 });
    }

    const {
      password,
      confirmPassword,
    }: {
      password?: string;
      confirmPassword?: string;
    } = await req.json();

    if (!password || !confirmPassword || password !== confirmPassword) {
      return NextResponse.json(
        { message: "Senha inválida ou não coincidem." },
        { status: 400 },
      );
    }

    // Verificar se o usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          message: "Usuario informado não existe. Por favor, tente novamente.",
        },
        { status: 400 },
      );
    }

    const newPasswordHashed = await bcrypt.hash(password, 10);

    // Se passou em todas as validações pode atualizar a senha do usuario
    await prisma.user.update({
      where: { id },
      data: {
        password: newPasswordHashed,
      },
    });

    return NextResponse.json(
      {
        message: "Senha atualizada com sucesso!",
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
