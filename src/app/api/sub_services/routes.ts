import { requireAuth } from "@/lib/server/auth/requireAuth";
import prisma from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

// Cria um serviço adicional
export async function POST(req: NextRequest) {
  try {
    // Faz todas as verificações necessarias do token
    const authUser = await requireAuth(req);
    if (authUser instanceof NextResponse) return authUser;

    // Se passou em todas as verificacoes, pode tentar criar os serviço adicional
    const {
      title,
      value,
    }: {
      title: string;
      value: string;
    } = await req.json();

    if (!title || !value) {
      return NextResponse.json(
        {
          message:
            "Por favor, informe o titulo e/ou o valor do serviço adicional.",
        },
        {
          status: 404,
        },
      );
    }

    // Verificar se o serviço adicional ja existe
    const existingSubService = await prisma.subService.findFirst({
      where: {
        title: {
          equals: title.toLowerCase(),
        },
      },
    });

    if (existingSubService) {
      return NextResponse.json(
        {
          message:
            "Servico adicional já existe, por favor crie serviços únicos.",
        },
        { status: 400 },
      );
    }

    const newService = await prisma.subService.create({
      data: {
        title,
        value,
      },
    });

    return NextResponse.json(
      {
        service: {
          id: newService.id,
          title: newService.title,
          value: newService.value,
        },
        message: "Serviço adicional criado com sucesso!",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno de servidor, por favor tente novamente." },
      { status: 500 },
    );
  }
}
