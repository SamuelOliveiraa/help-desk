"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import { prisma } from "@/lib/prisma";
import { JWT_SECRET } from "@/utils/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/types/user";
import { JsonArray } from "@/generated/prisma/runtime/library";

// Lista todos os usuarios do sistema
export async function GET(req: NextRequest) {
  try {
    // Faz todas as verificações necessarias do token
    const authUser = await requireAuth(req, "admin");
    if (authUser instanceof NextResponse) return authUser;

    // Se passou em todas as verificacoes, pode buscar os usuarios
    const users = await prisma.user.findMany();

    // Remove senha antes de retornar
    const usersWithoutPassword = users.map(({ password, ...rest }) => rest);

    return NextResponse.json(usersWithoutPassword);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno de servidor, tente novamente mais tarde." },
      { status: 500 }
    );
  }
}

// Cria um usuario, que por padrao é "user"
export async function POST(req: NextRequest) {
  try {
    // Faz todas as verificações necessarias do token
    /*     const user = await requireAuth(req);
    if (user instanceof NextResponse) return user; */

    // Se passou em todas as verificacoes, pode buscar os usuarios
    const {
      name,
      email,
      password,
      workingHours,
      role
    }: {
      name: string;
      email: string;
      password: string;
      workingHours: JsonArray;
      role?: Role;
    } = await req.json();

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
        role,
        workingHours
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
