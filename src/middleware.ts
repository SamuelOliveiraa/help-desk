import { Role } from "@/types/user";
import { JWTPayload, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { JWT_SECRET } from "./utils/auth";

const PUBLICK_PAGES = ["/login", "/register"];

export interface CustomJWTPayload extends JWTPayload {
  role: Role;
  id: string;
  email: string;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  const JWT_SECRET_CONVERTED = new TextEncoder().encode(JWT_SECRET);

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Paginas publicas
  if (PUBLICK_PAGES.includes(pathname)) {
    if (token) {
      try {
        const { payload } = (await jwtVerify(token, JWT_SECRET_CONVERTED)) as {
          payload: CustomJWTPayload;
        };
        return NextResponse.redirect(
          new URL(`/dashboard/${payload.role}`, req.url)
        );
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // sem token → redireciona para o login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = (await jwtVerify(token, JWT_SECRET_CONVERTED)) as {
      payload: CustomJWTPayload;
    };
    const role = payload.role;

    if (role === "admin" && !pathname.startsWith("/dashboard/admin")) {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }
    if (role === "user" && !pathname.startsWith("/dashboard/user")) {
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    }
    if (
      role === "technician" &&
      !pathname.startsWith("/dashboard/technician")
    ) {
      return NextResponse.redirect(new URL("/dashboard/technician", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    // Aplica o middleware em tudo, exceto:
    // - assets internos (_next)
    // - favicon
    // - arquivos estáticos
    // - rotas da API
    "/((?!_next/static|_next/image|favicon.ico|api/.*|.*\\.(?:png|jpg|jpeg|svg|ico|gif|webp)).*)"
  ]
};
