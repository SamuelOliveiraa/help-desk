"use server"

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import type { JsonArray } from "@/generated/prisma/runtime/library"
import { requireAuth } from "@/lib/auth/requireAuth"
import { prisma } from "@/lib/prisma"
import type { Role, WorkingHours } from "@/types/user"
import { JWT_SECRET } from "@/utils/auth"

// Lista todos os usuarios do sistema
export async function GET(req: NextRequest) {
  try {
    // Faz todas as verificações necessarias do token
    const authUser = await requireAuth(req, "admin")
    if (authUser instanceof NextResponse) return authUser

    // Se passou em todas as verificacoes, pode buscar os usuarios
    const users = await prisma.user.findMany()

    // Remove senha antes de retornar
    const usersWithoutPassword = users.map(({ password: _password, ...rest }) => rest)

    return NextResponse.json(usersWithoutPassword)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Erro interno de servidor, tente novamente mais tarde." },
      { status: 500 },
    )
  }
}

// Cria um usuario, que por padrao é "user"
export async function POST(req: NextRequest) {
  try {
    // Se passou em todas as verificacoes, pode buscar os usuarios
    const {
      name,
      email,
      password,
      workingHours,
      role,
    }: {
      name: string
      email: string
      password: string
      workingHours: JsonArray
      role?: Role
    } = await req.json()

    if (!role) {
      return NextResponse.json(
        { message: "Role é obrigatório. Por favor, informe a role do usuário." },
        { status: 400 },
      )
    }

    // Verificar se o usuario ja existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    if (existingUser) {
      return NextResponse.json(
        {
          message: "E-mail informado já está sendo utilizado. Por favor, informe outro.",
        },
        { status: 400 },
      )
    }

    const roleLimits: Record<Role, number> = {
      admin: 1,
      user: 7,
      technician: 3,
    }

    // Verificar se o limite de usuários para este tipo de role foi atingido.
    const currentRoleCount = await prisma.user.count({
      where: { role },
    })
    if (currentRoleCount >= roleLimits[role]) {
      return NextResponse.json(
        {
          message: `Você atingiu o limite de usuários do tipo ${role} para o seu plano. Por favor, contate o suporte ou o administrador para aumentar o limite.`,
        },
        { status: 400 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
        workingHours,
      },
    })

    // Gerar JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "3d" },
    )

    return NextResponse.json(
      {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        message: "Usuário criado com sucesso!",
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

// Atualiza algumas informação do usuario
export async function PUT(req: NextRequest) {
  try {
    // Faz todas as verificações necessarias do token
    const userAuth = await requireAuth(req)
    if (userAuth instanceof NextResponse) return userAuth

    const {
      id,
      name,
      email,
      avatar,
      password,
      workingHours,
    }: {
      id: number
      name?: string
      email?: string
      avatar?: string
      password?: string
      workingHours?: WorkingHours[]
    } = await req.json()

    // Verificar se o email já existe
    const ifEmailsAlredyExists = await prisma.user.findUnique({
      where: { email },
    })
    if (ifEmailsAlredyExists && ifEmailsAlredyExists.id !== id) {
      return NextResponse.json(
        {
          message: "E-mail informado já está sendo utilizado. Por favor, informe outro.",
        },
        { status: 400 },
      )
    }

    // Verificar se o usuario é valido
    const existingUser = await prisma.user.findUnique({
      where: { id },
    })
    if (!existingUser) {
      return NextResponse.json(
        {
          message: "Usuario informado não existe. Por favor, tente novamente.",
        },
        { status: 400 },
      )
    }

    // Se passou em todas as validações pode atualizar o usuario
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: name || existingUser.name,
        email: email || existingUser.email,
        avatar: avatar || existingUser.avatar,
        password: password ? await bcrypt.hash(password, 10) : existingUser.password,
        workingHours: workingHours
          ? JSON.parse(JSON.stringify(workingHours))
          : existingUser.workingHours,
      },
    })

    return NextResponse.json(
      {
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
        },
        message: `Usuário "${updatedUser.name}" atualizado com sucesso!`,
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

// Atualiza a senha do usuario
export async function PATCH(req: NextRequest) {
  try {
    // Faz todas as verificações necessarias do token
    const userAuth = await requireAuth(req)
    if (userAuth instanceof NextResponse) return userAuth

    const {
      id,
      password,
      newPassword,
    }: {
      id: number
      password?: string
      newPassword?: string
    } = await req.json()

    // Verificar se o usuario é valido
    const existingUser = await prisma.user.findUnique({
      where: { id },
    })
    if (!existingUser) {
      return NextResponse.json(
        {
          message: "Usuario informado não existe. Por favor, tente novamente.",
        },
        { status: 400 },
      )
    }

    const ifPasswordIsCorrect = password && (await bcrypt.compare(password, existingUser.password))

    // Verificar se a senha atual está correta
    if (!ifPasswordIsCorrect) {
      return NextResponse.json(
        {
          message: "Senha informada não é válida. Por favor, tente novamente.",
        },
        { status: 400 },
      )
    }

    // Se passou em todas as validações pode atualizar a senha do usuario
    await prisma.user.update({
      where: { id },
      data: {
        password: newPassword ? await bcrypt.hash(newPassword, 10) : existingUser.password,
      },
    })

    return NextResponse.json(
      {
        message: "Senha atualizada com sucesso!",
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
