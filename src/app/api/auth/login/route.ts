"use server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { JWT_SECRET } from "@/utils/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // verificar se o usuario existe
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "Por favor, verifique o email/senha ou cadastre-se.",
        },
        { status: 401 },
      );
    }

    // Verificar se a senha esta correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Por favor, verifique o email/senha ou cadastre-se." },
        { status: 401 },
      );
    }

    // Gerar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "3d",
      },
    );

    return NextResponse.json({
      token,
      user: { id: user.id, email: user.email, role: user.role },
      message: "Login realizado com sucesso!",
    });
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
