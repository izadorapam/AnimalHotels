import { api } from "./api";
import { Animal } from "../types/Animal";

export const animalService = {
  getAll: async (): Promise<Animal[]> => {
    const res = await api.get("/animais");
    return res.data;
  },

  getById: async (id: number): Promise<Animal> => {
    const res = await api.get(`/animais/${id}`);
    return res.data;
  },

  create: async (animal: Partial<Animal>): Promise<Animal> => {
    const res = await api.post("/animais", animal);
    return res.data;
  },

  update: async (id: number, data: Partial<Animal>): Promise<Animal> => {
    const res = await api.patch(`/animais/${id}`, data);
    return res.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/animais/${id}`);
  },
};
