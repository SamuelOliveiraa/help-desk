import { getToken } from "./cookies";

export const TOKEN = "TOKEN_FIXO";
export const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export function isAuthenticated() {
	return !!TOKEN;
}

// Helper para cabeçalho de autenticação
export async function authHeader() {
	const token = await getToken();
	if (!token) throw new Error("Token não encontrado");
	return { Authorization: `Bearer ${token}` };
}
