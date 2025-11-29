// src/services/tutorService.ts
import api from "./api";

export interface TutorDTO {
  id?: number | string;
  nome: string;
  email: string;
  telefone?: string;
  userId?: number | string;
}

export async function getTutors() {
  const res = await api.get<TutorDTO[]>("/tutors");
  return res.data;
}

export async function getTutorById(id: string | number) {
  const res = await api.get<TutorDTO>(`/tutors/${id}`);
  return res.data;
}

export async function createTutor(payload: TutorDTO) {
  const res = await api.post<TutorDTO>("/tutors", payload);
  return res.data;
}

export async function updateTutor(id: string | number, payload: Partial<TutorDTO>) {
  const res = await api.put<TutorDTO>(`/tutors/${id}`, payload);
  return res.data;
}

export async function deleteTutor(id: string | number) {
  const res = await api.delete(`/tutors/${id}`);
  return res.data;
}
