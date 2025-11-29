import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTutorById, updateTutor } from "../../services/tutorService";

export default function EditarTutor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTutor() {
      try {
        if (!id) return;

        const t = await getTutorById(id);
        setNome(t.nome);
        setEmail(t.email);
        setTelefone(t.telefone ?? "");
      } catch {
        alert("Erro ao carregar tutor.");
        navigate("/tutores");
      } finally {
        setLoading(false);
      }
    }

    loadTutor();
  }, [id, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;

    try {
      await updateTutor(id, { nome, email, telefone });
      navigate("/tutores");
    } catch (err: any) {
      alert(err.response?.data?.message ?? "Erro ao atualizar tutor");
    }
  }

  if (loading) return <p className="p-6">Carregando...</p>;

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">Editar Tutor</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label>Nome</label>
          <input
            className="border p-2 w-full rounded"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label>E-mail</label>
          <input
            className="border p-2 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Telefone</label>
          <input
            className="border p-2 w-full rounded"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
        >
          Atualizar
        </button>
      </form>
    </div>
  );
}
