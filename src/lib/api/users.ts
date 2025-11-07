import axios from "axios";
import type { Role, UpdateUserType, User, WorkingHours } from "@/types/user";
import { authHeader } from "@/utils/auth";
import { getUserByToken, saveToken } from "@/utils/cookies";
import { handleAxiosError } from "@/utils/handleAxiosError";

// GET todos os usuarios
export async function getUsers(): Promise<User[]> {
	try {
		const res = await axios.get<User[]>("/api/users", {
			headers: await authHeader(),
		});
		return res.data;
	} catch (error) {
		handleAxiosError(error, "pegar todos os usuarios");
	}
}

// GET os usuarios pela role
export async function getUsersByRole(role: Role): Promise<User[] | null> {
	try {
		if (!role) return null;

		const res = await axios.get(`/api/users/by-role/${role}`, {
			headers: await authHeader(),
		});

		return res.data;
	} catch (error) {
		handleAxiosError(error, "pegar todos os usuarios");
	}
}

// GET os usuarios pelo ID
export async function getUsersByID(id: string): Promise<User | null> {
	try {
		if (!id) return null;

		const res = await axios.get(`/api/users/${id}`, {
			headers: await authHeader(),
		});

		return res.data;
	} catch (error) {
		handleAxiosError(error, "pegar o usuario");
	}
}

// POST criar usuario / Register do usuario
export async function createUser(data: {
	name: string;
	email: string;
	role: Role;
	password: string;
	workingHours: WorkingHours[];
	redirectUser?: boolean;
}) {
	try {
		const res = await axios.post<{
			token: string;
			user: User;
			message: string;
		}>("/api/users", data);

		const { token, user, message } = res.data;

		if (data.redirectUser) {
			saveToken(token);
		}

		return { token, user, message };
	} catch (error) {
		handleAxiosError(error, "criar o usuario");
	}
}

// Fazer login do usuario
export async function loginUser(data: { email: string; password: string }) {
	try {
		const { email, password } = data;

		const res = await axios.post<{
			token: string;
			user: User;
			message: string;
		}>("/api/auth/login", { email, password });

		saveToken(res.data.token);

		return res.data;
	} catch (error) {
		handleAxiosError(error, "fazer login do usuario");
	}
}

// Pega o atual usuario que esta logado
export async function getCurrentUser() {
	try {
		const user = await getUserByToken();

		if (!user || !user.id) return null;

		const res = await axios.get(`/api/users/${user?.id}`, {
			headers: await authHeader(),
		});

		return res.data;
	} catch (error) {
		handleAxiosError(error, "ppegar o usuario atual");
	}
}

// DELETA o usuario pelo ID
export async function deleteUser(id: number) {
	try {
		if (!id) return null;

		const res = await axios.delete<{ user: User; message: string }>(
			`/api/users/${id}`,
			{
				headers: await authHeader(),
			},
		);

		return res.data;
	} catch (error) {
		handleAxiosError(error, "deletar o usuario");
	}
}

// Atualiza o usuario pelo ID
export async function updateUser(
	data: UpdateUserType,
): Promise<{ user: User; message: string } | null> {
	try {
		if (!data.id) return null;

		const res = await axios.put<{ user: User; message: string }>(
			`/api/users`,
			data,
			{
				headers: await authHeader(),
			},
		);
		return res.data;
	} catch (error) {
		handleAxiosError(error, "atualizar o usuario");
	}
}

// Atualiza a senha do usuario
export async function updatePasswordUser(
	id: number,
	password: string,
	newPassword: string,
): Promise<{ message: string } | null> {
	try {
		if (!id) return null;

		const res = await axios.patch<{ message: string }>(
			`/api/users`,
			{ id, password, newPassword },
			{
				headers: await authHeader(),
			},
		);

		return res.data;
	} catch (error) {
		handleAxiosError(error, "atualizar a senha do usuario");
	}
}
