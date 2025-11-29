import React from "react";
import { useNavigate } from "react-router-dom";
import { createTutor } from "../../services/tutorService";
import { useState } from "react";

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
    <div className="p-6">
      <h1 className="text-xl mb-4">Novo Tutor</h1>
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
        <button type="submit" disabled={loading} className="px-3 py-1 bg-blue-600 text-white rounded">
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
