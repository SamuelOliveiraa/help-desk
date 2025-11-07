import axios from "axios";
import type { Service, SubService } from "@/types/services";
import type { Status, Ticket } from "@/types/tickets";
import { authHeader } from "@/utils/auth";
import { getToken } from "@/utils/cookies";
import { handleAxiosError } from "@/utils/handleAxiosError";

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

// GET todos os tickets baseado no status
export async function getTicketsByStatus(status: Status): Promise<Ticket[] | null> {
	try {
		const res = await axios.get<Ticket[]>("/api/tickets", {
			headers: await authHeader(),
		});
		
		const filteredList = res.data.filter((ticket) => ticket.status === status)

		return filteredList
	} catch (error) {
		handleAxiosError(error, "pegar os chamados");
	}
}

// GET o ticket pelo ID
export async function getTicketByID(id: number): Promise<Ticket[] | null> {
	try {
		if (!id) return null;

		const res = await axios.get<Ticket[]>(`/api/tickets/${id}`, {
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
	serviceID: number;
	userID: number;
	amount: number;
	service: Service
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

// PATCH atualiza o status ou os servicos adicionais do ticket
export async function updateTicket(
	id: number,
	status?: Status,
	subService?: SubService,
): Promise<{ message: string } | null> {
	try {
		if (!id) return null;

		const res = await axios.patch<{ message: string }>(
			`/api/tickets`,
			{ id, status, subService },
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
