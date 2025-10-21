import { CustomJWTPayload } from "@/middleware";
import { jwtVerify } from "jose";
import Cookies from "js-cookie";
import { JWT_SECRET } from "./auth";

// Salva o token em cookies
export function saveToken(token: string) {
  Cookies.set("token", token, { expires: 3, sameSite: "lax", path: "/" });
}

// Retorna o token
export async function getToken() {
  const token = Cookies.get("token");
  return token || null;
}

// Retorna o token
export async function getUserByToken() {
  const JWT_SECRET_CONVERTED = new TextEncoder().encode(JWT_SECRET);
  const token = Cookies.get("token");

  if (!token) return null;

  try {
    const { payload } = (await jwtVerify(token, JWT_SECRET_CONVERTED)) as {
      payload: CustomJWTPayload;
    };

    return payload;
  } catch (error) {
    console.error("Token Invalido: ", error);
    return null;
  }
}

// Retorna a role que existe no token
export async function getTokenRole() {
  const JWT_SECRET_CONVERTED = new TextEncoder().encode(JWT_SECRET);
  const token = Cookies.get("token");

  if (!token) return null;

  try {
    const { payload } = (await jwtVerify(token, JWT_SECRET_CONVERTED)) as {
      payload: CustomJWTPayload;
    };

    return payload.role;
  } catch (error) {
    console.error("Token Invalido: ", error);
    return null;
  }
}

// Deleta o token
export function deleteToken() {
  Cookies.remove("token", { path: "/" }); // o path precisa ser o mesmo usado ao salvar
}
