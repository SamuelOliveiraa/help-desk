import { type JWTPayload, jwtVerify } from "jose";
import { type NextRequest, NextResponse } from "next/server";
import type { Role } from "@/types/user";
import { JWT_SECRET } from "./utils/client/auth";

const JWT_SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

const PUBLIC_PAGES = [
  "/",
  "/privacy-policy",
  "/terms-of-use",
  "/login",
  "/register",
];

const AUTH_PAGES = ["/login", "/register", "/reset-password"];

export interface CustomJWTPayload extends JWTPayload {
  role: Role;
  id: string;
  email: string;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  const isPublicPage = PUBLIC_PAGES.includes(pathname);
  if (isPublicPage) {
    return NextResponse.next();
  }

  const isAuthPage =
    AUTH_PAGES.includes(pathname) || pathname.startsWith("/reset-password/");

  if (isAuthPage) {
    if (token) {
      try {
        const { payload } = (await jwtVerify(token, JWT_SECRET_KEY)) as {
          payload: CustomJWTPayload;
        };
        return NextResponse.redirect(
          new URL(`/dashboard/${payload.role}`, req.url),
        );
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const { payload } = (await jwtVerify(token, JWT_SECRET_KEY)) as {
      payload: CustomJWTPayload;
    };
    const role = payload.role;
    const isTicketDetails = pathname.startsWith("/dashboard/ticket");

    // Validação de acesso por Role
    const targetDashboard = `/dashboard/${role}`;
    const hasRoleAccess =
      pathname.startsWith(targetDashboard) || isTicketDetails;

    if (!hasRoleAccess) {
      return NextResponse.redirect(new URL(targetDashboard, req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("JWT Verification failed:", error);
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
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/.*|.*\\.(?:png|jpg|jpeg|svg|ico|gif|webp)).*)",
  ],
};
