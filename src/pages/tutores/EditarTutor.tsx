import React, { useEffect, useState } from "react";
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
    async function load() {
      if (!id) return;
      try {
        const t = await getTutorById(id);
        setNome(t.nome);
        setEmail(t.email);
        setTelefone(t.telefone ?? "");
      } catch {
        alert("Erro ao carregar tutor");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

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

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Editar Tutor</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Nome</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} className="block" />
        </div>
        <div className="mb-2">
          <label>E-mail</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="block" />
        </div>
        <div className="mb-2">
          <label>Telefone</label>
          <input value={telefone} onChange={(e) => setTelefone(e.target.value)} className="block" />
        </div>
        <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded">
          Atualizar
        </button>
      </form>
    </div>
  );
}
