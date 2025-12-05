import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth/requireAuth";
import prisma from "@/lib/db/prisma";
import type { Service, SubService } from "@/types/services";
import type { Status } from "@/types/tickets";
import { connect } from "http2";

// Lista todos os tickets do sistema
export async function GET(req: NextRequest) {
  try {
    // Faz todas as verificações necessarias do token
    const authUser = await requireAuth(req);
    if (authUser instanceof NextResponse) return authUser;

    // Se passou em todas as verificacoes, pode buscar os tickets
    const tickets = await prisma.ticket.findMany({
      include: { service: true, user: true, technician: true },
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno de servidor, tente novamente mais tarde." },
      { status: 500 },
    );
  }
}

// Cria um novo ticket
export async function POST(req: NextRequest) {
  try {
    const {
      title,
      description,
      serviceID,
      userID,
      amount,
    }: {
      title: string;
      description: string;
      serviceID: string;
      userID: string;
      amount: number;
    } = await req.json();

    // Verifica se os valores passados existem
    if (!title || !description || !serviceID || !userID) {
      return NextResponse.json(
        {
          message:
            "Alguns campos obrigatóriosnão foram informados. Por favor verifique.",
        },
        { status: 400 },
      );
    }

    // Verifica se o Serviço informado existe.
    const serviceExists = await prisma.service.findUnique({
      where: { id: serviceID },
    });
    if (!serviceExists) {
      return NextResponse.json(
        { message: "Serviço informado não existe." },
        { status: 404 },
      );
    }

    // Pegar o publicID do ultimo chamado no banco
    const lastTicketOnDB = await prisma.ticket.findFirst({
      orderBy: { publicID: "desc" },
      select: { publicID: true },
    });

    // Cria o publicID do chamado
    const publicID = String(
      parseInt(lastTicketOnDB?.publicID || "0", 10) + 1,
    ).padStart(6, "0");

    // Ordena os tecnicos com os seus chamados abertos
    const technicians = await prisma.user.findMany({
      where: { role: "technician" },
      orderBy: { id: "asc" },
      select: { id: true, name: true },
    });

    // Caso nenhum tecnico exista, retorna.
    if (technicians.length === 0) {
      return NextResponse.json(
        {
          message:
            "Nenhum técnico localizado. Por favor entre em contato com o administrador. ",
        },
        { status: 404 },
      );
    }

    const lastTicket = await prisma.ticket.findFirst({
      where: { technicianID: { not: null } },
      orderBy: { id: "desc" },
      select: { technicianID: true },
    });

    let nextTechnician;

    if (!lastTicket) {
      // Se não há tickets anteriores, começa pelo primeiro técnico
      nextTechnician = technicians[0];
    } else {
      // Econtra o índice do ultimo tecnico
      const lastIndex = technicians.findIndex(
        technician => technician.id === lastTicket.technicianID,
      );

      // define o proximo recnico (volta ao inicio se chegou ao final)
      const nextIndex = (lastIndex + 1) % technicians.length;
      nextTechnician = technicians[nextIndex];
    }

    if (!nextTechnician) {
      return NextResponse.json(
        {
          message:
            "Não foi possível encontrar um técnico disponível no momento.",
        },
        { status: 503 },
      );
    }

    // Cria o novo chamado
    const newTicket = await prisma.ticket.create({
      data: {
        title,
        description,
        status: "open",
        amount,
        publicID,
        service: { connect: { id: serviceID } },
        user: { connect: { id: userID } },
        technician: { connect: { id: nextTechnician.id } },
      },
    });

    return NextResponse.json(
      {
        ticket: {
          id: newTicket.id,
          title: newTicket.title,
          description: newTicket.description,
          status: newTicket.status,
          amount: newTicket.amount,
        },
        message: "Chamado criado com sucesso!",
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

// Atualiza o status ou adiciona serviços ao ticket
export async function PATCH(req: NextRequest) {
  try {
    // Faz todas as verificações necessarias do token
    const userAuth = await requireAuth(req);
    if (userAuth instanceof NextResponse) return userAuth;

    const {
      id,
      status,
      subService,
    }: {
      id: string;
      status?: Status;
      subService?: SubService[];
    } = await req.json();

    // Verfica se o ID foi informado
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        {
          message: "ID do chamado é inválido ou não foi informado.",
        },
        { status: 400 },
      );
    }

    // Verificar se o ticket é valido
    const existingTicket = await prisma.ticket.findUnique({
      where: { id },
    });
    if (!existingTicket) {
      return NextResponse.json(
        {
          message: "Chamado informado não existe. Por favor, tente novamente.",
        },
        { status: 400 },
      );
    }

    // Se nenhum dos dois campos veio, retornar erro
    const hasStatus = typeof status !== "undefined";
    const hasSubservice = Array.isArray(subService) && subService.length > 0;

    if (!hasSubservice && !hasStatus) {
      return NextResponse.json(
        {
          message:
            "É necessário informar ao menos o status ou o serviço adicional para atualização do chamado.",
        },
        { status: 400 },
      );
    }

    const updateData: Parameters<typeof prisma.ticket.update>[0]["data"] = {};

    if (hasStatus) updateData.status = status;

    if (hasSubservice) {
      updateData.subService = {
        connect: subService.map(service => ({ id: service.id })),
      };
    }

    // Se passou em todas as validações pode atualizar o ticket
    await prisma.ticket.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: "Chamado atualizado com sucesso!",
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
