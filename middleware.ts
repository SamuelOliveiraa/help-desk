import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  /*  if (!TOKEN && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Se não tiver token, redireciona para login
  if (!TOKEN && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Se tiver token, deixa passar
  return NextResponse.next(); */

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"]
};
