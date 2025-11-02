export const TOKEN = "TOKEN_FIXO"
export const JWT_SECRET = process.env.JWT_SECRET || "supersecret"

export function isAuthenticated() {
  return !!TOKEN
}
