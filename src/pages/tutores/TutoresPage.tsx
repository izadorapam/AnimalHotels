import { useEffect, useState } from "react";
import {
  getTutors,
  createTutor,
  updateTutor,
  deleteTutor,
  TutorDTO,
} from "../../services/tutorService";
import { PawPrint, Heart } from "lucide-react";

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

  if (loading)
    return <p className="text-center text-[#2C5F5D]">Carregando tutors...</p>;
  if (error)
    return <p className="text-center text-red-600 font-semibold">{error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#A8D8EA] via-[#B8E6D5] to-[#7DD3C0]">

      <div className="max-w-4xl mx-auto bg-white/95 shadow-2xl rounded-xl p-8 backdrop-blur-sm border border-white/20">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <PawPrint className="w-8 h-8 text-[#7DD3C0]" />
          <h1 className="text-xl font-semibold text-[#2C5F5D]">Gerenciar Tutores</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-10">

          <div className="flex flex-col">
            <input
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              required
              className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg border border-[#B8E6D5] 
                         placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#7DD3C0]"
            />
          </div>

          <div className="flex flex-col">
            <input
              placeholder="Digite o seu email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg border border-[#B8E6D5] 
                         placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#7DD3C0]"
            />
          </div>

          <div className="flex flex-col">
            <input
              placeholder="Digite seu telefone"
              value={form.telefone}
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
              className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg border border-[#B8E6D5] 
                         placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#7DD3C0]"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#7DD3C0] to-[#A8D8EA] 
                         hover:opacity-90 transition shadow-md"
            >
              {editingId ? "Atualizar Tutor" : "Cadastrar Tutor"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ nome: "", email: "", telefone: "" });
                }}
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* List */}
        <table className="w-full text-left border-collapse overflow-hidden rounded-lg shadow-md">
          <thead>
            <tr className="bg-[#7DD3C0] text-white">
              <th className="p-3">Nome</th>
              <th className="p-3">Email</th>
              <th className="p-3">Telefone</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>

          <tbody>
            {tutors.map((t) => (
              <tr
                key={t.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="p-3 text-[#2C5F5D]">{t.nome}</td>
                <td className="p-3 text-[#2C5F5D]">{t.email}</td>
                <td className="p-3 text-[#2C5F5D]">{t.telefone ?? "-"}</td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(t)}
                    className="px-3 py-1 bg-[#A8D8EA] text-[#2C5F5D] rounded-lg hover:opacity-90"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(t.id!)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 text-center text-[#5A9B94]">
          Cuidando com carinho <Heart className="inline w-4 h-4 text-[#7DD3C0]" />
        </div>
      </div>
    </div>
  );
}
