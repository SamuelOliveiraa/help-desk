import { type NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth/requireAuth"
import prisma from "@/lib/prisma"
import type { SubService } from "@/types/services"
import type { Status } from "@/types/tickets"

// Lista todos os tickets do sistema
export async function GET(req: NextRequest) {
  try {
    // Faz todas as verificações necessarias do token
    const authUser = await requireAuth(req)
    if (authUser instanceof NextResponse) return authUser

    // Se passou em todas as verificacoes, pode buscar os tickets
    const tickets = await prisma.ticket.findMany()

    return NextResponse.json(tickets)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Erro interno de servidor, tente novamente mais tarde." },
      { status: 500 },
    )
  }
}

// Cria um novo ticket
export async function POST(req: NextRequest) {
  try {
    const {
      title,
      description,
      status,
      serviceID,
      userID,
    }: {
      title: string
      description: string
      status: Status
      serviceID: number
      userID: number
    } = await req.json()

    const lastTicketOnDB = await prisma.ticket.findFirst({
      orderBy: { publicID: "desc" },
      select: { publicID: true },
    })

    const publicID = String(parseInt(lastTicketOnDB?.publicID || "0", 10) + 1).padStart(6, "0")

    const newTicket = await prisma.ticket.create({
      data: {
        title,
        description,
        serviceID,
        status,
        publicID,
        userID,
      },
    })

    return NextResponse.json(
      {
        ticket: {
          id: newTicket.id,
          title: newTicket.title,
          description: newTicket.description,
          status: newTicket.status,
        },
        message: "Chamado criado com sucesso!",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Erro interno de servidor, por favor tente novamente." },
      { status: 500 },
    )
  }
}

// Atualiza o status ou adicionar serviços ao ticket
export async function PATCH(req: NextRequest) {
  try {
    // Faz todas as verificações necessarias do token
    const userAuth = await requireAuth(req)
    if (userAuth instanceof NextResponse) return userAuth

    const {
      id,
      status,
      subService,
    }: {
      id: number
      status?: Status
      subService?: SubService[]
    } = await req.json()

    // Verificar se o ticket é valido
    const existingTicket = await prisma.ticket.findUnique({
      where: { id },
    })
    if (!existingTicket) {
      return NextResponse.json(
        {
          message: "Chamado informado não existe. Por favor, tente novamente.",
        },
        { status: 400 },
      )
    }

    const updateData: Parameters<typeof prisma.ticket.update>[0]["data"] = {}

    if (status) updateData.status = status

    if (subService && subService.length > 0) {
      updateData.subService = {
        connect: subService.map((service) => ({ id: service.id })),
      }
    }

    // Se passou em todas as validações pode atualizar o ticket
    await prisma.ticket.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(
      {
        message: "Chamado atualizado com sucesso!",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Erro interno de servidor, por favor tente novamente." },
      { status: 500 },
    )
  }
}
