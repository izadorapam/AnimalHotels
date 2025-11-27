import { createContext, useState } from "react";
import { User } from "../types/User";

interface AuthContextData {
  user: User | null;
  login: (email: string, senha: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function login(email: string, senha: string) {
    // Mock login
    setUser({ id: 1, email });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
