// src/pages/TutorsPage.tsx
import { useEffect, useState } from "react";
import {
  getTutors,
  createTutor,
  updateTutor,
  deleteTutor,
  TutorDTO,
} from "../../services/tutorService";

export default function TutorsPage() {
  const [tutors, setTutors] = useState<TutorDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<TutorDTO>({
    nome: "",
    email: "",
    telefone: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadData() {
    try {
      setLoading(true);
      const data = await getTutors();
      setTutors(data);
    } catch (err) {
      setError("Erro ao carregar tutors.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingId) {
        await updateTutor(editingId, form);
      } else {
        await createTutor(form);
      }

      setForm({ nome: "", email: "", telefone: "" });
      setEditingId(null);
      loadData();
    } catch {
      setError("Erro ao salvar tutor.");
    }
  }

  function handleEdit(tutor: TutorDTO) {
    setEditingId(tutor.id!);
    setForm({
      nome: tutor.nome,
      email: tutor.email,
      telefone: tutor.telefone ?? "",
    });
  }

  async function handleDelete(id: string) {
    if (!confirm("Deseja realmente excluir este tutor?")) return;

    try {
      await deleteTutor(id);
      loadData();
    } catch {
      setError("Erro ao excluir tutor.");
    }
  }

  if (loading) return <p>Carregando tutors...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tutores</h1>

      {/* Formulário */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          required
        />

        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          placeholder="Telefone"
          value={form.telefone}
          onChange={(e) => setForm({ ...form, telefone: e.target.value })}
        />

        <button type="submit">
          {editingId ? "Atualizar Tutor" : "Cadastrar Tutor"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ nome: "", email: "", telefone: "" });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Lista */}
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tutors.map((t) => (
            <tr key={t.id}>
              <td>{t.nome}</td>
              <td>{t.email}</td>
              <td>{t.telefone ?? "-"}</td>
              <td>
                <button onClick={() => handleEdit(t)}>Editar</button>
                <button onClick={() => handleDelete(t.id!)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
