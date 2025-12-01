import { api } from "./api";
import { Animal } from "../types/Animal";

export const animalService = {
  getAll: async (): Promise<Animal[]> => {
    const res = await api.get("/animals");
    return res.data;
  },

  getById: async (id: string): Promise<Animal> => {
    const res = await api.get(`/animals/${id}`);
    return res.data;
  },

  create: async (animal: Partial<Animal>): Promise<Animal> => {
    const res = await api.post("/animals", animal);
    return res.data;
  },

  update: async (id: string, data: Partial<Animal>): Promise<Animal> => {
    const res = await api.patch(`/animals/${id}`, data);
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/animals/${id}`);
  },
};
