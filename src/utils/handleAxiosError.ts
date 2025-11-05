import { AxiosError } from "axios"

export function handleAxiosError(error: unknown, action: string): never {
  if (error instanceof AxiosError) {
    const message =
      error.response?.data?.message || error.message || `Erro desconhecido ao ${action}`
    throw new Error(message)
  }
  throw new Error(error instanceof Error ? error.message : `Erro ao ${action}`)
}
