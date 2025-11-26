"use server";

import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Role } from "@/types/user";
import { JWT_SECRET } from "@/utils/auth";

interface TokenPayload extends JwtPayload {
	id: string;
	email: string;
	role: Role;
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
	return new Promise((resolve) => {
		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err || !decoded) return resolve(null);
			resolve(decoded as TokenPayload);
		});
	});
}
