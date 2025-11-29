import { authApi } from "./api";

export async function loginService(email: string, senha: string) {
  return authApi.post("/login", { email, password: senha });
}
