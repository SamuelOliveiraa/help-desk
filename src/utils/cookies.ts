import Cookies from "js-cookie";

export function saveToken(token: string) {
  // salva o token em cookie (pode definir expiracao e secure se quiser)
  Cookies.set("token", token, { expires: 3, sameSite: "lax", path: "/" }); // 3 dias
}
