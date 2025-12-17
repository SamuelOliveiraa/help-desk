import axios from "axios";
import type { Status, Ticket } from "@/types/tickets";
import { authHeader } from "@/utils/client/auth";
import { getToken } from "@/utils/client/cookies";
import { handleAxiosError } from "@/utils/client/handleAxiosError";

// GET todos os tickets
export async function getAllTickets(): Promise<Ticket[] | null> {
  try {
    const res = await axios.get<Ticket[]>("/api/tickets", {
      headers: await authHeader(),
    });
    return res.data;
  } catch (error) {
    handleAxiosError(error, "pegar os chamados");
  }
}

// GET o ticket pelo ID
export async function getTicketByID(id: string): Promise<Ticket | null> {
  try {
    if (!id) return null;

    const res = await axios.get<Ticket>(`/api/tickets/${id}`, {
      headers: await authHeader(),
    });

    return res.data;
  } catch (error: unknown) {
    handleAxiosError(error, "pegar o chamado");
  }
}

// GET o ticket pelo publicID
export async function getTicketByPublicID(
  publicID: string,
): Promise<Ticket | null> {
  try {
    if (!publicID) return null;

    const res = await axios.get<Ticket>(`/api/tickets/publicID/${publicID}`, {
      headers: await authHeader(),
    });

    return res.data;
  } catch (error: unknown) {
    handleAxiosError(error, "pegar o chamado");
  }
}

// GET o ticket pelo ID do usuário
export async function getTicketByUserID(
  userID: string,
): Promise<Ticket[] | null> {
  try {
    if (!userID) return null;

    const res = await axios.get<Ticket[]>(`/api/tickets/user/${userID}`, {
      headers: await authHeader(),
    });

    return res.data;
  } catch (error: unknown) {
    handleAxiosError(error, "pegar o chamado");
  }
}

// POST Criar um ticket
export async function createTicket(data: {
  title: string;
  description: string;
  serviceID: string;
  userID: string;
  amount: number;
}) {
  try {
    const token = await getToken();
    if (!token) return null;

    const res = await axios.post("/api/tickets", data, {
      headers: await authHeader(),
    });

    const { message } = res.data;

    return { message };
  } catch (error: unknown) {
    handleAxiosError(error, "criar um chamado");
  }
}

// PATCH atualiza o status do ticket com base no publicID
export async function updateTicketStatus(
  publicID: string,
  status: Status,
): Promise<{ message: string } | null> {
  try {
    if (!publicID || !status) return null;

    const res = await axios.patch<{ message: string }>(
      `/api/tickets/publicID/${publicID}`,
      { status },
      {
        headers: await authHeader(),
      },
    );

    const { message } = res.data;

    return { message };
  } catch (error: unknown) {
    handleAxiosError(error, "atualizar um chamado");
  }
}

// PATCH adiciona um sub-serviço no ticket com base no id
export async function createSubServiceOnTicket(
  id: string,
  data: { title: string; value: number },
): Promise<{ message: string } | null> {
  try {
    if (!id || !data) return null;

    const res = await axios.patch<{ message: string }>(
      `/api/tickets/${id}`,
      data,
      {
        headers: await authHeader(),
      },
    );

    const { message } = res.data;

    return { message };
  } catch (error: unknown) {
    handleAxiosError(error, "atualizar um chamado");
  }
}
