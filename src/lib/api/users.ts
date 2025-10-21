import { Role, User } from "@/types/user";
import { getToken, getUserByToken, saveToken } from "@/utils/cookies";
import axios, { AxiosError } from "axios";

//GET todos os usuarios
export async function getUsers(): Promise<User[]> {
  try {
    const res = await axios.get<User[]>("/api/users");
    return res.data;
  } catch (error: unknown) {
    console.error("Erro ao buscar usuarios: ", error);
    throw new Error(
      error instanceof Error ? error?.message : "Erro desconhecido"
    );
  }
}

// GET os usuarios pela role
export async function getUsersByRole(role: Role): Promise<User[] | null> {
  try {
    const token = await getToken();

    if (!role) return null;
    if (!token) return null;

    const res = await axios.get(`/api/users/by-role/${role}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
  } catch (error: unknown) {
    console.error("Erro ao buscar usuarios: ", error);
    throw new Error(
      error instanceof Error ? error?.message : "Erro desconhecido"
    );
  }
}
// POST criar usuario
export async function createUser(data: {
  name: string;
  email: string;
  role: Role;
  password: string;
}) {
  try {
    const res = await axios.post<{
      token: string;
      user: User;
      message: string;
    }>("/api/users", data);

    const { token, user, message } = res.data;

    saveToken(token);

    return { token, user, message };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw new Error(
        error instanceof Error ? error.message : "Erro desconhecido"
      );
    }
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
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw new Error(
        error instanceof Error ? error.message : "Erro desconhecido"
      );
    }
  }
}

// Pega o atual usuario que esta logado
export async function getCurrentUser() {
  try {
    const user = await getUserByToken();
    const token = await getToken();

    if (!user || !user.id) return null;

    const res = await axios.get(`/api/users/${user?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw new Error(
        error instanceof Error ? error.message : "Erro desconhecido"
      );
    }
  }
}
