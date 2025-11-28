import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001", // json-server
});

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL ?? "http://localhost:3002", // mock-auth
});

// adiciona token automaticamente nas requisições para api
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// tratamento simples de 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      // opcional: redirecionar para login
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;