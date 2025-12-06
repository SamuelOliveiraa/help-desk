import axios, { AxiosError } from "axios";
import type { Service } from "@/types/services";
import { authHeader } from "@/utils/client/auth";
import { handleAxiosError } from "@/utils/client/handleAxiosError";

// GET todos os serviços
export async function getServices(): Promise<Service[] | null> {
  try {
    const res = await axios.get<Service[]>("/api/services", {
      headers: await authHeader(),
    });

    return res.data;
  } catch (error) {
    handleAxiosError(error, "pegar todos os serviços");
  }
}

// GET todos os serviços Ativos
export async function getAllServicesActives(): Promise<Service[] | null> {
  try {
    const res = await axios.get<Service[]>("/api/services", {
      headers: await authHeader(),
    });

    const servicesFiltered = res.data.filter(
      service => service.status === true,
    );

    return servicesFiltered;
  } catch (error) {
    handleAxiosError(error, "pegar todos os serviços");
  }
}

// GET todos os serviços por ID
export async function getServicesByID(id: string): Promise<Service | null> {
  try {
    if (!id) return null;

    const res = await axios.get<Service>(`/api/services/${id}`, {
      headers: await authHeader(),
    });

    return res.data;
  } catch (error) {
    handleAxiosError(error, "pegar o serviço");
  }
}

// DELETA o serviço por ID
export async function deleteService(id: string) {
  try {
    if (!id) return null;

    const res = await axios.delete<{ service: Service; message: string }>(
      `/api/services/${id}`,
      {
        headers: await authHeader(),
      },
    );

    return res.data;
  } catch (error) {
    handleAxiosError(error, "deletar o serviço");
    throw error;
  }
}

// POST criar Servico
export async function createService(data: {
  title: string;
  value: string;
  status: boolean;
}) {
  try {
    const res = await axios.post<{
      service: Service;
      message: string;
    }>("/api/services", data, {
      headers: await authHeader(),
    });

    return res.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      handleAxiosError(error, "criar o serviço");
    }
  }
}

// Atualiza o serviço pelo ID
export async function updateService(
  data: Service,
): Promise<{ message: string } | null> {
  try {
    if (!data.id) return null;

    const res = await axios.put<{ message: string }>(`/api/services`, data, {
      headers: await authHeader(),
    });

    return res.data;
  } catch (error: unknown) {
    handleAxiosError(error, "atualizar o serviço");
  }
}
