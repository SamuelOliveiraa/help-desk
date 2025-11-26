import type { Ticket } from "./tickets";

export interface Service {
	id: string;
	title: string;
	value: number;
	status: boolean;
	tickets?: Ticket[];
}

export interface SubService {
	id: string;
	title: string;
	value: number;
	tickets?: Ticket[]; // opcional para evitar loop infinito
}
