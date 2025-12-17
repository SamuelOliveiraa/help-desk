import { PasswordResetToken } from "@/types/passwordResetToken";
import { handleAxiosError } from "@/utils/client/handleAxiosError";
import axios, { AxiosError } from "axios";

// POST enviar e-mail com o token
export async function resetPasswordToken(data: { email: string }) {
  try {
    const res = await axios.post<{
      message: string;
      tokenID: string;
    }>("/api/auth/reset_password", data);

    return res.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      handleAxiosError(error, "resetar a senha");
    }
  }
}

// GET verificar se token é valido
export async function resetPasswordGetToken(id: string) {
  try {
    if (!id) return null;

    const res = await axios.get<{
      passwordResetToken: PasswordResetToken;
    }>(`/api/auth/reset_password/token/${id}`);

    return res.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      handleAxiosError(error, "verificar o token");
    }
  }
}

// Atualizar senha do usuário
export async function updateUserPassword(data: {
  id: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    if (!data.password || !data.confirmPassword) return null;

    const res = await axios.patch<{
      message: string;
    }>(`/api/auth/reset_password/user/${data.id}`, {
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    return res.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      handleAxiosError(error, "atualizar a senha");
    }
  }
}
