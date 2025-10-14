import { Role, User } from "@/types/user";
import { saveToken } from "@/utils/cookies";
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

// POST criar usuario
export async function createUser(data: {
  name: string;
  email: string;
  role: Role;
  password: string;
}) {
  try {
    const res = await axios.post<{ token: string; user: User }>(
      "/api/users",
      data
    );
    const { token, user } = res.data;

    saveToken(token);

    return user;
  } catch (error: unknown) {
    /*  console.error("Erro ao criar usuario: ", error);
    throw new Error(
      error instanceof Error ? error?.message : "Erro desconhecido"
    ); */
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
