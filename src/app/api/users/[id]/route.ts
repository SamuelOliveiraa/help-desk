import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth/requireAuth"
import { prisma } from "@/lib/prisma"

// Pega o usuario conforme o ID informado.
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Faz todas as verificações necessarias do token
    const authUser = await requireAuth(req)
    if (authUser instanceof NextResponse) return authUser

    // Se passou em todas as verificacoes, pode buscar o usuario
    const { id } = await params
    const userId = Number(id)

    // Se o ID não existir retorna
    if (Number.isNaN(userId)) {
      return NextResponse.json({ message: "ID Inválido" }, { status: 400 })
    }

    // Somente o admin pode pesquisar um usuario, o user/tecnico so pode ver seu proprio usuario/conta
    if (authUser.role !== "admin" && authUser.id !== userId) {
      return NextResponse.json(
        {
          message: "Acesso negado! Você não tem permissão para pesquisar usuários.",
        },
        { status: 403 },
      )
    }

    // Busca o usuario no DB
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    // Se o usuario não existir retorna
    if (!user) {
      return NextResponse.json({ message: "Usuario não encontrado" }, { status: 404 })
    }

    // Remove senha antes de retornar
    const { password: _password, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Erro interno de servidor, por favor tente novamente." },
      { status: 500 },
    )
  }
}

// Deleta o usuario conforme o ID informado.
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Faz todas as verificações necessarias do token
    const authUser = await requireAuth(req)
    if (authUser instanceof NextResponse) return authUser

    // Se passou em todas as verificacoes, pode excluir o usuario
    const { id } = await params
    const userId = Number(id)

    // Se o ID não existir retorna
    if (Number.isNaN(userId)) {
      return NextResponse.json({ message: "ID Inválido" }, { status: 400 })
    }

    // Somente o admin pode excluir um usuario usuario/conta
    if (authUser.role !== "admin") {
      return NextResponse.json(
        {
          message: "Acesso negado! Você não tem permissão para excluir usuários.",
        },
        { status: 403 },
      )
    }

    // Busca o usuario no DB
    const user = await prisma.user.delete({
      where: { id: userId },
    })

    return NextResponse.json(
      {
        user,
        message: `Usuario "${user.name}" excluído com sucesso!`,
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
