import { Role } from "@/types/user";
import { JWT_SECRET } from "@/utils/auth";
import { JWTPayload, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const PUBLICK_PAGES = ["/login", "/register"];

interface CustomJWTPayload extends JWTPayload {
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

  if (PUBLICK_PAGES.includes(pathname)) {
    if (token) {
      try {
        const { payload } = (await jwtVerify(token, JWT_SECRET_CONVERTED)) as {
          payload: CustomJWTPayload;
        };
        return NextResponse.redirect(
          new URL(`/dashboard/${payload.role}`, req.url)
        );
      } catch {}
    }
    return NextResponse.next();
  }

  // sem token → redireciona para o login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verificar token
    await jwtVerify(token, JWT_SECRET_CONVERTED);
    return NextResponse.next();
  } catch (err) {
    // Token invalido ou expirado
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    // Aplica o middleware em tudo, exceto:
    // - assets internos (_next)
    // - favicon
    // - arquivos do public (ex: .png, .jpg, .svg, .ico)
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|ico|gif|webp)).*)"
  ]
};
