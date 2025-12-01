import { useEffect, useState } from "react";
import { Animal } from "../../types/Animal";
import { api } from "../../services/api";
import { Link } from "react-router-dom";

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
        const res = await api.get("/animals"); // <-- corrigido
        setAnimals(res.data);
        loadTutors();
      } catch (err) {
        console.error("ERRO AO CARREGAR ANIMAls:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Animals</h1>

        <Link to="/animals/novo">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            + Novo Animal
          </button>
        </Link>
      </div>

      <table className="w-full border-collapse bg-white shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Espécie</th>
            <th className="border p-2">Raça</th>
            <th className="border p-2">Idade</th>
            <th className="border p-2">Tutor</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>

        <tbody>
          {animals.map((a) => (
            <tr key={a.id} className="text-center">
              <td className="border p-2">{a.id}</td>
              <td className="border p-2">{a.nome}</td>
              <td className="border p-2">{a.especie}</td>
              <td className="border p-2">{a.raca}</td>
              <td className="border p-2">{a.idade}</td>

              <td className="border p-2">
                {tutors.find((t) => t.id == a.tutorId)?.nome ?? "—"}
              </td>

              <td className="border p-2 flex gap-2 justify-center">
                <Link to={`/animals/${a.id}`}>
                  <button className="px-3 py-1 bg-yellow-500 text-white rounded">
                    Editar
                  </button>
                </Link>

                <button
                  className="px-3 py-1 bg-red-600 text-white rounded"
                  onClick={() => handleDelete(String(a.id))}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {animals.length === 0 && (
        <p className="text-gray-600 mt-4 text-center">
          Nenhum animal cadastrado.
        </p>
      )}
    </div>
  );
}
