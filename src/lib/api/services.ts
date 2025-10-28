import { Service } from "@/types/services";
import { getToken } from "@/utils/cookies";
import axios, { AxiosError } from "axios";

// GET todos os serviços
export async function getServices(): Promise<Service[] | null> {
  try {
    const token = await getToken();
    if (!token) return null;

    const res = await axios.get<Service[]>("/api/services", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error: unknown) {
    console.error("Erro ao buscar servicos: ", error);
    throw new Error(
      error instanceof Error ? error?.message : `Erro desconhecido: ${error}`
    );
  }
}

// GET todos os serviços por ID
export async function getServicesByID(id: string): Promise<Service | null> {
  try {
    const token = await getToken();

    if (!id) return null;
    if (!token) return null;

    const res = await axios.get<Service>(`/api/services/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
  } catch (error: unknown) {
    console.error("Erro ao buscar servicos: ", error);
    throw new Error(
      error instanceof Error ? error?.message : "Erro desconhecido"
    );
  }
}

// DELETA o serviço por ID
export async function deleteService(id: number) {
  try {
    const token = await getToken();

    if (!id) return null;
    if (!token) return null;

    const res = await axios.delete<{ service: Service; message: string }>(
      `/api/services/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return res.data;
  } catch (error: unknown) {
    console.error("Erro ao buscar servicos: ", error);
    throw new Error(
      error instanceof Error ? error?.message : "Erro desconhecido"
    );
  }
}

// POST criar Servico
export async function createService(data: {
  title: string;
  value: number;
  status: boolean;
}) {
  try {
    const token = await getToken();
    if (!token) return null;

    const res = await axios.post<{
      service: Service;
      message: string;
    }>("/api/services", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
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

// Atualiza o serviço pelo ID
export async function updateService(
  data: Service
): Promise<{ message: string } | null> {
  try {
    const token = await getToken();

    if (!data.id) return null;
    if (!token) return null;

    const res = await axios.put<{ message: string }>(`/api/services`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
  } catch (error: unknown) {
    console.error("Erro ao buscar servicos: ", error);
    throw new Error(
      error instanceof Error ? error?.message : "Erro desconhecido"
    );
  }
}
