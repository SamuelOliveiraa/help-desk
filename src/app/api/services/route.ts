"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Lista todos os serviços do sistema
export async function GET(req: NextRequest) {
  try {
    // Faz todas as verificações necessarias do token
    const authUser = await requireAuth(req, "admin");
    if (authUser instanceof NextResponse) return authUser;

    // Se passou em todas as verificacoes, pode buscar os serviços
    const services = await prisma.service.findMany();

    return NextResponse.json(services);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno de servidor, tente novamente mais tarde." },
      { status: 500 }
    );
  }
}

// Cria um serviço
export async function POST(req: NextRequest) {
  try {
    // Faz todas as verificações necessarias do token
    const authUser = await requireAuth(req);
    if (authUser instanceof NextResponse) return authUser;

    // Se passou em todas as verificacoes, pode buscar os usuarios
    const {
      title,
      value,
      status
    }: {
      title: string;
      value: number;
      status: boolean;
    } = await req.json();

    // Verificar se o serviço ja existe
    const existingService = await prisma.service.findFirst({
      where: {
        title: {
          equals: title.toLowerCase()
        }
      }
    });

    if (existingService) {
      return NextResponse.json(
        { message: "Servico já existe, por favor crie serviços únicos." },
        { status: 400 }
      );
    }

    const newService = await prisma.service.create({
      data: {
        title,
        value,
        status
      }
    });

    return NextResponse.json(
      {
        service: {
          id: newService.id,
          title: newService.title,
          value: newService.value,
          status: newService.status
        },
        message: "Serviço criado com sucesso!"
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
