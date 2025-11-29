import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTutor } from "../../services/tutorService";

export default function NovoTutor() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await createTutor({ nome, email, telefone });
      navigate("/tutores");
    } catch (err: any) {
      alert(err.response?.data?.message ?? "Erro ao criar tutor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">Novo Tutor</h1>

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
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
