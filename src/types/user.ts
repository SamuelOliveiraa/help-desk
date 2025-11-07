export type Role = "admin" | "user" | "technician";

export interface User {
	id: number;
	avatar?: string | null;
	name: string;
	email: string;
	password: string;
	role: Role;
	workingHours: WorkingHours[]; // array vazio se não for technician
	createdAt: string; // string pois vem do JSON
}

export interface UpdateUserType {
	id?: number;
	avatar?: string | null;
	name?: string;
	email?: string;
	password?: string;
	workingHours?: WorkingHours[]; // array vazio se não for technician
}

export interface WorkingHours {
	id: number;
	time: string; // ex: "07:00"
	active: boolean;
}
