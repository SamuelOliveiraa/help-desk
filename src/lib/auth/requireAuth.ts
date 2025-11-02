import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./verifyToken"

export async function requireAuth(req: NextRequest, requiredRole?: string) {
  const authHeader = req.headers.get("authorization")

  // Verifico se o authHeader realmente veio
  if (!authHeader) {
    return NextResponse.json({ message: "Token não informado" }, { status: 401 })
  }

  // Removo o Bearer do token
  const token = authHeader.replace("Bearer ", "")
  const user = await verifyToken(token)

  // Apos verificar o token, vejo se ele existe
  if (!user) {
    return NextResponse.json({ message: "Token invalido" }, { status: 401 })
  }

  // Verifico se o usuario tem permissão para acessar
  if (requiredRole && user.role !== requiredRole) {
    return NextResponse.json({ message: "Acesso negado" }, { status: 403 })
  }

  // Se tudo Ok, retorno o user
  return user
}
