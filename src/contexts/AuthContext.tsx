import { createContext, useReducer, useCallback, ReactNode } from "react";
import { api } from "../services/api";

export interface User {
  id: string;
  email: string;
  nome: string;
}

export interface AuthState {
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

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        error: null,
      };
    case "LOGIN_ERROR":
      return { ...state, isLoading: false, error: action.payload, user: null };
    case "LOGOUT":
      return { ...state, user: null, token: null };
    case "RESTORE_TOKEN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
}

export const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  register: (email: string, nome: string, senha: string) => Promise<void>;
} | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restaurar token do localStorage ao montar
  const restoreToken = useCallback(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");
    if (token && user) {
      try {
        dispatch({
          type: "RESTORE_TOKEN",
          payload: { user: JSON.parse(user), token },
        });
      } catch (error) {
        console.error("Erro ao restaurar token:", error);
      }
    }
  }, []);

  // Executar ao montar o componente
  if (!state.token && !state.isLoading) {
    restoreToken();
  }

  const login = useCallback(async (email: string, senha: string) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const response = await api.post("/login", { email, senha });
      const { user, token } = response.data;

      // Persistir no localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));

      // Adicionar token ao header padrão
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, token },
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Erro ao fazer login";
      dispatch({ type: "LOGIN_ERROR", payload: errorMessage });
      throw new Error(errorMessage);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    delete api.defaults.headers.common["Authorization"];
    dispatch({ type: "LOGOUT" });
  }, []);

  const register = useCallback(
    async (email: string, nome: string, senha: string) => {
      dispatch({ type: "LOGIN_REQUEST" });
      try {
        const response = await api.post("/register", {
          email,
          nome,
          senha,
        });
        const { user, token } = response.data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", JSON.stringify(user));

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user, token },
        });
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Erro ao registrar";
        dispatch({ type: "LOGIN_ERROR", payload: errorMessage });
        throw new Error(errorMessage);
      }
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}