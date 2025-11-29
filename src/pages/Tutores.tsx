// src/pages/Tutores.tsx
import React, { useEffect, useState } from "react";
import { getTutors, deleteTutor, TutorDTO } from "../services/tutorService";
import { useNavigate } from "react-router-dom";

export default function Tutores() {
  const [tutores, setTutores] = useState<TutorDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await getTutors();
      setTutores(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar tutores");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id?: string | number) {
    if (!id) return;
    if (!confirm("Tem certeza que deseja excluir este tutor?")) return;
    try {
      await deleteTutor(id);
      setTutores((prev) => prev.filter((t) => String(t.id) !== String(id)));
    } catch (err: any) {
      alert(err.response?.data?.message ?? "Erro ao excluir tutor");
    }
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tutores</h1>
        <div>
            {/* 
              <button
                onClick={() => navigate("/tutores/novo")}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Novo Tutor
              </button>
              */}

        </div>
      </div>

      {loading && <p>Carregando tutores...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1 text-left">Nome</th>
              <th className="border px-2 py-1 text-left">E-mail</th>
              <th className="border px-2 py-1 text-left">Telefone</th>
              <th className="border px-2 py-1">Ações</th>
            </tr>
          </thead>
          <tbody>
            {tutores.map((t) => (
              <tr key={t.id}>
                <td className="border px-2 py-1">{t.nome}</td>
                <td className="border px-2 py-1">{t.email}</td>
                <td className="border px-2 py-1">{t.telefone ?? "-"}</td>
                <td className="border px-2 py-1 text-center space-x-2">
                  <button
                    onClick={() => navigate(`/tutores/${t.id}/editar`)}
                    className="px-2 py-1 rounded bg-yellow-500 text-white"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="px-2 py-1 rounded bg-red-600 text-white"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {tutores.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  Nenhum tutor encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
