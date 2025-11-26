import type { Service, SubService } from "./services";
import type { User } from "./user";

export type Status = "open" | "finished" | "inProgress";

export interface Ticket {
	id: string;
	publicID: string;
	title: string;
	description: string;
	amount: number;
	status: Status;
	serviceID: string;
	service: Service;
	subServices: SubService[];
	userID: string;
	user: User;
	technicianID?: string;
	technician?: User;
	createdAt: string;
	updatedAt: string;
}
