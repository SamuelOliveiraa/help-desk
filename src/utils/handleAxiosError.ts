import axios, { AxiosError } from "axios";

export function handleAxiosError(error: unknown, action: string): never {
	if (axios.isAxiosError(error)) {
		throw error
	}
	throw new Error(error instanceof Error ? error.message : `Erro ao ${action}`);
}


// import axios from "axios";

// export function handleAxiosError(error: unknown, action: string): never {
//     if (axios.isAxiosError(error)) {
//         const message =
//             error.response?.data?.message ||
//             error.message ||
//             `Erro desconhecido ao ${action}`;
//         throw new Error(message);
//     }

//     // fallback
//     throw new Error(
//         error instanceof Error ? error.message : `Erro ao ${action}`,
//     );
// }