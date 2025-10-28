import { Service, SubService } from "./services";
import { User } from "./user";

export type Status = "open" | "finished" | "inProgress";

export interface Ticket {
  id: number;
  publicID: number;
  title: string;
  description: string;
  status: Status;
  serviceID: number;
  service: Service;
  subServices: SubService[];
  userID: number;
  user: User;
  technicianID?: number;
  technician?: User;
  createdAt: string;
  updatedAt: string;
}
