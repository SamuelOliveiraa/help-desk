import { Ticket } from "./tickets";

export interface Category {
  id: number;
  title: string;
  value: number;
  status: boolean;
  tickets?: Ticket[]; // opcional para evitar loop infinito
}

export interface SubCategory {
  id: number;
  title: string;
  value: number;
  tickets?: Ticket[]; // opcional para evitar loop infinito
}
