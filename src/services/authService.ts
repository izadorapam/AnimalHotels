import { api } from "./api";

export async function loginService(email: string, senha: string) {
  return api.post("/login", { email, senha });
}
