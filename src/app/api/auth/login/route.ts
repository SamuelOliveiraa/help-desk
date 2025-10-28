"use server";

import prisma from "@/lib/prisma";
import { JWT_SECRET } from "@/utils/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // verificar se o usuario existe
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      return NextResponse.json(
        {
          message:
            "Usuário não encontrado. Por favor, verifique o email ou cadastre-se."
        },
        { status: 404 }
      );
    }

    // Verificar se a senha esta correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Usuario e/ou senha incorreta" },
        { status: 404 }
      );
    }

    // Gerar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "3d" }
    );

    return NextResponse.json({
      token,
      user: { id: user.id, email: user.email, role: user.role },
      message: "Login realizado com sucesso!"
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno de servidor, por favor tente novamente." },
      { status: 500 }
    );
  }
}
