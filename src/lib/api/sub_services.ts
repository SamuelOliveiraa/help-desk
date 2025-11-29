import { authHeader } from "@/utils/auth";
import { handleAxiosError } from "@/utils/handleAxiosError";
import axios from "axios";

// DELETA o serviço adicional por ID
export async function deletesubService(ticketID: string, id: string) {
  try {
    if (!ticketID || !id) return null;

    const res = await axios.delete<{ message: string }>(
      `/api/sub_services/${id}`,
      {
        data: { ticketID },
        headers: await authHeader()
      }
    );

    return res.data;
  } catch (error) {
    handleAxiosError(error, "deletar o serviço");
    throw error;
  }
}
