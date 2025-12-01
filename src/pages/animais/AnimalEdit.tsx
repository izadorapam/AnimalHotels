import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Animal } from "../../types/Animal";
import AnimalForm from "../../components/forms/AnimalForm";
import { api } from "../../services/api";
import { animalService } from "../../services/animalService";

export default function AnimalEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [tutors, setTutors] = useState<any[]>([]);

  const loadAnimal = async () => {
    const res = await api.get(`/animals/${id}`); // <-- corrigido
    setAnimal(res.data);
  };

  const loadTutors = async () => {
    const res = await api.get("/tutors"); // <-- corrigido
    setTutors(res.data);
  };

  useEffect(() => {
    if (!id) return;
    loadAnimal();
    loadTutors();
  }, [id]);

const handleSubmit = async (data: Partial<Animal>) => {
  if (!id) return;           // <-- EVITA NaN
  await animalService.update(id, data);  // id já é string
  navigate("/animals");
};

  if (!animal) return <p className="p-4">Carregando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Animal</h1>

      <AnimalForm
        defaultValues={animal}
        onSubmit={handleSubmit}
        tutors={tutors}
      />
    </div>
  );
}
