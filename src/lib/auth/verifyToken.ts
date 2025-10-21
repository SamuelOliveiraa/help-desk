"use server";

import { Role } from "@/types/user";
import { JWT_SECRET } from "@/utils/auth";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  id: number;
  email: string;
  role: Role;
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  return new Promise(resolve => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err || !decoded) return resolve(null);
      resolve(decoded as TokenPayload);
    });
  });
}
