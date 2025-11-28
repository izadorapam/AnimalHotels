import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001",
});

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL ?? "http://localhost:3002",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;