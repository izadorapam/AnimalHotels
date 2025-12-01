import { useEffect, useState } from "react";
import { Animal } from "../../types/Animal";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import { PawPrint, Edit, Trash2, Plus } from "lucide-react";

export default function AnimalPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [tutors, setTutors] = useState<any[]>([]);

  const loadAnimals = async () => {
    const res = await api.get("/animals");
    setAnimals(res.data);
  };

  const loadTutors = async () => {
    try {
      const res = await api.get("/tutors");
      setTutors(res.data);
    } catch (err) {
      console.error("ERRO AO CARREGAR TUTORES:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      await api.delete(`/animals/${id}`);
      loadAnimals();
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/animals");
        setAnimals(res.data);
        loadTutors();
      } catch (err) {
        console.error("ERRO AO CARREGAR ANIMAIS:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#A8D8EA] via-[#B8E6D5] to-[#7DD3C0] flex flex-col items-center">

      {/* CARD */}
      <div className="w-full max-w-5xl bg-white/95 backdrop-blur-sm shadow-2xl rounded-xl p-8 border border-white/20">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <PawPrint className="w-7 h-7 text-[#7DD3C0]" />
            <h1 className="text-xl font-semibold text-[#2C5F5D]">Lista de Animais</h1>
          </div>

          <Link to="/animals/novo">
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#7DD3C0] to-[#A8D8EA] hover:from-[#6BC2AF] hover:to-[#97C7D9] text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300">
              <Plus className="w-4 h-4" />
              Novo Animal
            </button>
          </Link>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-lg shadow-md border border-gray-200">
          <table className="w-full border-collapse">
            <thead className="bg-[#E6F6F4] text-[#2C5F5D]">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Nome</th>
                <th className="p-3 text-left">Espécie</th>
                <th className="p-3 text-left">Raça</th>
                <th className="p-3 text-left">Idade</th>
                <th className="p-3 text-left">Tutor</th>
                <th className="p-3 text-center">Ações</th>
              </tr>
            </thead>

            <tbody>
  {animals.map((a, index) => (
    <tr
      key={a.id}
      className={`${
        index % 2 === 0 ? "bg-white" : "bg-gray-50"
      } hover:bg-[#F1FBF9] transition`}
    >
      <td className="p-3 text-[#2C5F5D]">{a.id}</td>
      <td className="p-3 text-[#2C5F5D]">{a.nome}</td>
      <td className="p-3 text-[#2C5F5D]">{a.especie}</td>
      <td className="p-3 text-[#2C5F5D]">{a.raca}</td>
      <td className="p-3 text-[#2C5F5D]">{a.idade}</td>

      <td className="p-3 text-[#2C5F5D]">
        {tutors.find((t) => t.id == a.tutorId)?.nome ?? "—"}
      </td>

      <td className="p-3 flex gap-3 justify-center">
        <Link to={`/animals/${a.id}`}>
          <button className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-white rounded-lg shadow hover:bg-yellow-500 transition">
            <Edit className="w-4 h-4" /> Editar
          </button>
        </Link>

        <button
          onClick={() => handleDelete(String(a.id))}
          className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
        >
          <Trash2 className="w-4 h-4" /> Excluir
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>

        {animals.length === 0 && (
          <p className="text-gray-600 mt-6 text-center">
            Nenhum animal cadastrado.
          </p>
        )}
      </div>
    </div>
  );
}
