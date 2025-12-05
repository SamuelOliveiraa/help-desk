import { User } from "./user";

export interface PasswordResetToken {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  usedAt: Date;
  createdAt: Date;
  user: User;
}
