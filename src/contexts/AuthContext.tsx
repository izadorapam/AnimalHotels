import React, { createContext, useReducer, useCallback, useEffect, ReactNode } from "react";
import { api, authApi } from "../services/api";

export interface User {
  id: number | string;
  email: string;
  name?: string;
  nome?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "LOGIN_REQUEST" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "RESTORE_TOKEN"; payload: { user: User; token: string } };

const initialState: AuthState = { user: null, token: null, isLoading: false, error: null };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload.user, token: action.payload.token, isLoading: false, error: null };
    case "LOGIN_ERROR":
      return { ...state, isLoading: false, error: action.payload, user: null };
    case "LOGOUT":
      return { ...state, user: null, token: null };
    case "RESTORE_TOKEN":
      return { ...state, user: action.payload.user, token: action.payload.token };
    default:
      return state;
  }
}

export const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
} | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");
    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch({ type: "RESTORE_TOKEN", payload: { user: JSON.parse(user), token } });
    }
  }, []);

  const login = useCallback(async (email: string, senha: string) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const res = await authApi.post("/login", { email, senha });
      const { user, token } = res.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });
    } catch (err: any) {
      const message = err.response?.data?.message ?? "Erro ao fazer login";
      dispatch({ type: "LOGIN_ERROR", payload: message });
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    delete api.defaults.headers.common["Authorization"];
    dispatch({ type: "LOGOUT" });
  }, []);

  return <AuthContext.Provider value={{ state, login, logout }}>{children}</AuthContext.Provider>;
}