import { useEffect, useState } from "react";
import { animalService } from "../services/animalService";
import { Animal } from "../types/Animal";
import AnimalForm from "../components/forms/AnimalForm";
import { api } from "../services/api";

export default function Animais() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [tutors, setTutors] = useState<{ id: number | string; nome: string }[]>([]);
  const [editing, setEditing] = useState<Animal | null>(null);

  // Carrega animais
  const loadAnimals = async () => {
    const data = await animalService.getAll();
    setAnimals(data);
  };

  // Carrega tutores
  const loadTutors = async () => {
    const res = await api.get("/tutors");
    setTutors(res.data);
  };

  useEffect(() => {
    loadAnimals();
    loadTutors();
  }, []);

  const handleCreate = async (data: Partial<Animal>) => {
    await animalService.create(data);
    loadAnimals();
  };

  const handleUpdate = async (data: Partial<Animal>) => {
    if (!editing) return;
    await animalService.update(editing.id, data);
    setEditing(null);
    loadAnimals();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      await animalService.remove(id);
      loadAnimals();
    }
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Gerenciar Animais</h1>

      {/* FORMULÁRIO */}
      <div>
        <h2 className="text-xl mb-3">
          {editing ? "Editar Animal" : "Cadastrar Animal"}
        </h2>

        <AnimalForm
          defaultValues={editing || {}}
          onSubmit={editing ? handleUpdate : handleCreate}
          tutors={tutors}
        />
      </div>

      {/* LISTAGEM */}
      <div>
        <h2 className="text-xl mb-3">Lista de Animais</h2>

        <table className="w-full border-collapse">
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
                  {tutors.find((t) => t.id == a.tutorId)?.nome || "—"}
                </td>

                <td className="border p-2 flex gap-2 justify-center">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => setEditing(a)}
                  >
                    Editar
                  </button>

                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded"
                    onClick={() => handleDelete(a.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {animals.length === 0 && (
          <p className="mt-4 text-gray-500">Nenhum animal cadastrado.</p>
        )}
      </div>
    </div>
  );
}
