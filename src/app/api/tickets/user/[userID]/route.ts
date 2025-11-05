import { type NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth/requireAuth"
import prisma from "@/lib/prisma"

// Pega os tickets conforme o ID do usuario informado.
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Faz todas as verificações necessarias do token
    const authUser = await requireAuth(req)
    if (authUser instanceof NextResponse) return authUser

    // Se passou em todas as verificacoes, pode buscar os tickets
    const { id } = await params
    const userIDParams = Number(id)

    // Se o ID não existir retorna
    if (Number.isNaN(userIDParams)) {
      return NextResponse.json({ message: "ID Inválido" }, { status: 400 })
    }

    const tickets = await prisma.ticket.findMany({
      where: { userID: userIDParams },
      orderBy: { publicID: "desc" },
      include: {
        service: true,
      },
    })

    if (!tickets.length) {
      return NextResponse.json(
        { message: "Nenhum chamado localizado para este usuário." },
        { status: 404 },
      )
    }

    return NextResponse.json(tickets, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Erro interno de servidor, por favor tente novamente." },
      { status: 500 },
    )
  }
}
