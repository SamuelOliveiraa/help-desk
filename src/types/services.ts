import type { Ticket } from "./tickets";

export interface Service {
	id: number;
	title: string;
	value: number;
	status: boolean;
	tickets?: Ticket[];
}

export interface SubService {
	id: number;
	title: string;
	value: number;
	tickets?: Ticket[]; // opcional para evitar loop infinito
}
