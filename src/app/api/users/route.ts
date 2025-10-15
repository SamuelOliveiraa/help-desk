"use server";

import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { JWT_SECRET } from "@/utils/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    // Verifico se o authHeader realmente veio
    if (!authHeader) {
      return NextResponse.json(
        { message: "Token não fornecido" },
        { status: 401 }
      );
    }

    // Removo o Bearer do token
    const token = authHeader.replace("Bearer ", "");
    const user = await verifyToken(token);

    // Apos verificar o token, vejo se é valido
    if (!user) {
      return NextResponse.json({ message: "Token invalido" }, { status: 401 });
    }

    // Verifico se o usuario tem permissão para acessar
    if (user.role !== "admin") {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
    }

    // Se passou em todas as verificacoes, pode buscar os usuarios
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    // Verificar se o usuario ja existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Usuario já existe" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role
      }
    });

    // Gerar JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "3d" }
    );

    return NextResponse.json(
      {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        },
        message: "Usuário criado com sucesso!"
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
