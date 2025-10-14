import { Category, SubCategory } from "./categories";
import { User } from "./user";

export type Status = "open" | "finished" | "inProgress";

export interface Ticket {
  id: number;
  publicID: number;
  title: string;
  description: string;
  status: Status;
  categoryID: number;
  category: Category;
  subCategories: SubCategory[];
  userID: number;
  user: User;
  technicianID?: number;
  technician?: User;
  createdAt: string;
  updatedAt: string;
}
