import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import type { CustomJWTPayload } from "@/middleware";

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
	const token = Cookies.get("token");
	if (!token) return null;

	try {
		const payload = jwtDecode<CustomJWTPayload>(token);
		return payload;
	} catch (error) {
		console.error("Token Invalido: ", error);
		return null;
	}
}

// Retorna a role que existe no token
export function getTokenRole() {
	const token = Cookies.get("token");
	if (!token) return null;

	try {
		const payload = jwtDecode<CustomJWTPayload>(token);
		return payload.role;
	} catch (error) {
		console.error("Token inválido:", error);
		return null;
	}
}

// Deleta o token
export function deleteToken() {
	Cookies.remove("token", { path: "/" }); // o path precisa ser o mesmo usado ao salvar
}
